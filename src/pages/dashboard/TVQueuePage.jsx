import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../api/axiosConfig";
import { HubConnectionBuilder, HttpTransportType, LogLevel, HubConnectionState } from '@microsoft/signalr';
import { useSearchParams } from "react-router-dom";

const TVQueuePage = () => {
  const [searchParams] = useSearchParams();
  const singleRouteId = searchParams.get("routeId");

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const connectionRef = useRef(null);
  const isConnectingRef = useRef(false);

  const HUB_URL = "https://75ymkt.com/hubs/queue";

  const formatLicensePlate = (plate) => {
    if (!plate) return "";
    const cleanPlate = plate.replace(/\s/g, "").toUpperCase();
    const regex = /^(\d{2})([A-Z]+)(\d+)$/;
    const match = cleanPlate.match(regex);
    if (match) return `${match[1]} ${match[2]} ${match[3]}`;
    return cleanPlate;
  };

  const fetchData = async () => {
    try {
      const routesRes = await apiClient.get("/admin/routes");
      let routes = routesRes.data;

      if (singleRouteId) {
        routes = routes.filter(r => String(r.id) === String(singleRouteId));
      }

      if (!routes || routes.length === 0) {
        setData([]);
        setLoading(false);
        return;
      }

      const fullData = await Promise.all(
          routes.map(async (route) => {
            try {
              const queueRes = await apiClient.get(`/routes/${route.id}/queue`);
              return {
                routeName: route.routeName,
                vehicles: queueRes.data.map((v) => ({ plate: v.licensePlate })),
              };
            } catch (err) {
              return { routeName: route.routeName, vehicles: [] };
            }
          })
      );
      setData(fullData);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const startSignalR = async () => {
    if (isConnectingRef.current) return;
    if (connectionRef.current?.state === HubConnectionState.Connected) return;

    isConnectingRef.current = true;

    const connection = new HubConnectionBuilder()
        .withUrl(HUB_URL, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(LogLevel.Warning)
        .build();

    connection.onclose(() => {
      isConnectingRef.current = false;
    });

    connection.onreconnected(() => {
      console.log("🟢 TV SignalR yeniden bağlandı!");
      fetchData();
    });

    connectionRef.current = connection;

    try {
      await connection.start();
      console.log("🟢 TV Ekranı: SignalR Bağlandı!");
      connection.on("ReceiveQueueUpdate", () => {
        fetchData();
      });
    } catch (err) {
      console.error("🔴 TV SignalR Bağlantı Hatası:", err?.message);
      connectionRef.current = null;
    } finally {
      isConnectingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();
    startSignalR();

    const dataTimer = setInterval(fetchData, 30000);
    const clockTimer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      const conn = connectionRef.current;
      if (conn && conn.state !== HubConnectionState.Disconnected) {
        conn.stop().catch(() => {});
      }
      connectionRef.current = null;
      isConnectingRef.current = false;
      clearInterval(dataTimer);
      clearInterval(clockTimer);
    };
  }, []);

  useEffect(() => {
    if (!singleRouteId && data.length > 2) {
      const slideTimer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % data.length);
      }, 60000);
      return () => clearInterval(slideTimer);
    } else {
      setCurrentIndex(0);
    }
  }, [data.length, singleRouteId]);

  const getVisibleRoutes = () => {
    if (data.length === 0) return [];
    if (singleRouteId) return data;
    if (data.length <= 2) return data;
    return [
      data[currentIndex % data.length],
      data[(currentIndex + 1) % data.length]
    ];
  };

  const currentRoutes = getVisibleRoutes();

  if (loading && data.length === 0) {
    return (
        <div className="h-screen w-screen bg-[#F1F5F9] flex items-center justify-center">
          <span className="text-slate-400 font-bold animate-pulse text-xl">SİSTEM YÜKLENİYOR...</span>
        </div>
    );
  }

  return (
      <div className="h-screen w-screen bg-[#E2E8F0] text-[#334155] overflow-hidden flex flex-col p-3 font-sans">
        <div className="flex justify-between items-center px-6 py-3 bg-[#475569] rounded-xl mb-3 shadow-md shrink-0 border-b-2 border-[#334155]">
          <div className="flex items-center gap-4">
            <div className="bg-[#64748B] text-white w-12 h-12 flex items-center justify-center rounded-lg font-black text-2xl shadow-inner border border-white/10">
              75
            </div>
            <h1 className="text-lg font-black tracking-widest text-white uppercase antialiased">ARAÇ TAKİP SİSTEMİ</h1>
          </div>

          <div className="flex items-center gap-6 text-white text-right">
            <div className="flex flex-col leading-none">
              <span className="text-xl font-mono font-black tracking-tighter">
                {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </span>
              <span className="text-xs font-bold text-[#BDB2A7] mt-1 uppercase tracking-widest">
                {time.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className={`grid ${singleRouteId ? "grid-cols-1" : "grid-cols-2"} gap-5 flex-grow overflow-hidden`}>
          {currentRoutes.map((route, idx) => (
              <div key={`${currentIndex}-${idx}`} className="flex flex-col bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden h-full">
                <div className="bg-slate-50 p-4 shrink-0 flex justify-between items-center border-b border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00BFA5] w-2.5 h-6 rounded-full"></div>
                    <h2 className="text-xl font-extrabold text-[#1E293B] uppercase tracking-tight antialiased">
                      {route.routeName}
                    </h2>
                  </div>
                  <span className="text-xs font-black bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md border border-indigo-100 uppercase tracking-wide">
                    {route.vehicles.length} ARAÇ
                  </span>
                </div>

                <div className="p-2 grid grid-cols-4 gap-x-2 h-full overflow-hidden bg-[#FDFCFB]">
                  {[0, 1, 2, 3].map((colIndex) => (
                      <div key={colIndex} className="flex flex-col h-full">
                        {Array.from({ length: 25 }).map((_, rowIndex) => {
                          const vehicleIndex = colIndex * 25 + rowIndex;
                          const vehicle = route.vehicles && route.vehicles[vehicleIndex];
                          if (vehicleIndex >= 100) return null;

                          return (
                              <div
                                  key={vehicleIndex}
                                  className={`flex-1 flex items-center gap-1.5 px-2 transition-all duration-300 ${vehicle ? "bg-[#F1F5F9] rounded border border-slate-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : "border-b border-transparent"}`}
                              >
                                <span className="text-[12px] font-black text-slate-400 w-5 text-right shrink-0 font-mono tracking-tighter">
                                  {String(vehicleIndex + 1).padStart(2, '0')}
                                </span>
                                <span className={`font-mono text-[14px] truncate leading-none antialiased ${vehicle ? "font-black text-[#1E293B] tracking-widest uppercase drop-shadow-sm" : "invisible"}`}>
                                  {vehicle ? formatLicensePlate(vehicle.plate) : ""}
                                </span>
                              </div>
                          );
                        })}
                      </div>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default TVQueuePage;