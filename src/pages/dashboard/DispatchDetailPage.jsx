// src/pages/dashboard/DispatchDetailPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Spinner, Card, CardHeader, CardBody } from "@material-tailwind/react";
import { ArrowLeftIcon, PaperAirplaneIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import apiClient from "../../api/axiosConfig.js";
import { toast } from "react-toastify";
import { HubConnectionBuilder, HttpTransportType, LogLevel } from "@microsoft/signalr";

const HUB_URL = "https://75ymkt.com/hubs/queue";

function HighlightedPlate({ plate, query }) {
    if (!query.trim()) return <span>{plate}</span>;
    const idx = plate.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <span>{plate}</span>;
    return (
        <span>
            {plate.slice(0, idx)}
            <mark className="bg-yellow-300 text-black rounded px-0.5">{plate.slice(idx, idx + query.length)}</mark>
            {plate.slice(idx + query.length)}
        </span>
    );
}

export default function DispatchDetailPage() {
    const { routeId } = useParams();
    const navigate = useNavigate();
    const [routeName, setRouteName] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const connectionRef = useRef(null);
    const containerRef = useRef(null);
    const [colCount, setColCount] = useState(4);

    useEffect(() => {
        const calculate = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const cols = Math.max(1, Math.floor(containerWidth / 260));
            setColCount(cols);
        };
        calculate();
        window.addEventListener("resize", calculate);
        return () => window.removeEventListener("resize", calculate);
    }, [loading]);

    const fetchData = async () => {
        try {
            const [routesRes, queueRes] = await Promise.all([
                apiClient.get("/admin/routes"),
                apiClient.get(`/routes/${routeId}/queue`),
            ]);
            const found = routesRes.data.find(r => String(r.id) === String(routeId));
            setRouteName(found?.routeName || "Güzergah");
            setVehicles(queueRes.data);
        } catch (err) {
            console.error(err);
            toast.error("Veri yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        if (connectionRef.current) return;
        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        connectionRef.current = connection;
        connection.start()
            .then(() => connection.on("ReceiveQueueUpdate", fetchData))
            .catch(console.error);
        return () => {
            connectionRef.current?.stop();
            connectionRef.current = null;
        };
    }, [routeId]);

    const handleSendToEnd = async (vehicleId, licensePlate) => {
        if (!window.confirm(`'${licensePlate}' aracını sıranın sonuna göndermek istiyor musunuz?`)) return;
        try {
            await apiClient.post(`/routes/${routeId}/queue/move-to-end`, { vehicleId });
            toast.success(`${licensePlate} sıranın sonuna gönderildi.`);
            fetchData();
        } catch {
            toast.error("İşlem başarısız.");
        }
    };

    // Arama filtrelenmiş liste — orijinal index'i koruyarak
    const filteredVehicles = search.trim()
        ? vehicles
            .map((v, i) => ({ ...v, originalIndex: i }))
            .filter(v => v.licensePlate.toLowerCase().includes(search.toLowerCase()))
        : vehicles.map((v, i) => ({ ...v, originalIndex: i }));

    // Sütun hesabı filtrelenmiş listeye göre
    const rowsPerCol = Math.ceil(filteredVehicles.length / colCount);
    const columns = Array.from({ length: colCount }, (_, ci) =>
        filteredVehicles.slice(ci * rowsPerCol, ci * rowsPerCol + rowsPerCol)
    ).filter(col => col.length > 0);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <Spinner className="h-12 w-12" />
        </div>
    );

    return (
        <div className="mt-6 mb-4 flex flex-col gap-4 h-[calc(100vh-80px)]">

            {/* ÜST BAR */}
            <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Geri
                    </Button>
                    <div>
                        <Typography variant="h5" color="blue-gray" className="font-bold leading-none">
                            {routeName}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal mt-0.5">
                            {vehicles.length} araç sırada
                            {search && ` · ${filteredVehicles.length} sonuç gösteriliyor`}
                        </Typography>
                    </div>
                </div>
            </div>

            {/* TEK ÇERÇEVE */}
            <Card className="flex-grow overflow-hidden flex flex-col">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="m-4 mb-0 p-4 rounded-lg flex-shrink-0"
                >
                    <div className="flex items-center justify-between gap-4">
                        <Typography variant="h6" color="white">
                            Sıradaki Araçlar — {routeName}
                        </Typography>

                        {/* ARAMA ÇUBUĞU — header içine sağa yerleştirildi */}
                        <div className="relative w-56">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Plaka ara..."
                                className="w-full pl-9 pr-8 py-1.5 text-sm rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-colors"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs font-bold leading-none"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardBody
                    ref={containerRef}
                    className="flex-grow overflow-hidden p-4"
                >
                    {vehicles.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-blue-gray-400">
                            <Typography variant="h6">
                                Bu güzergahta sırada araç bulunmuyor.
                            </Typography>
                        </div>
                    ) : filteredVehicles.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-blue-gray-400">
                            <Typography variant="h6">
                                "{search}" ile eşleşen araç bulunamadı.
                            </Typography>
                        </div>
                    ) : (
                        <div
                            className="grid h-full gap-x-4"
                            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                        >
                            {columns.map((colVehicles, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="flex flex-col gap-0 border-r border-blue-gray-50 last:border-r-0 overflow-hidden"
                                >
                                    {colVehicles.map((vehicle) => (
                                        <div
                                            key={vehicle.id}
                                            className={`flex items-center justify-between px-2 border-b border-blue-gray-50 hover:bg-blue-gray-50/50 transition-colors flex-1 ${
                                                search && vehicle.licensePlate.toLowerCase().includes(search.toLowerCase())
                                                    ? "bg-yellow-50"
                                                    : ""
                                            }`}
                                        >
                                            {/* Numara + Plaka */}
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-xs font-black text-blue-gray-300 w-6 text-right shrink-0 font-mono">
                                                    {String(vehicle.originalIndex + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-mono font-bold text-sm text-blue-gray-800 tracking-wider uppercase truncate">
                                                    <HighlightedPlate plate={vehicle.licensePlate} query={search} />
                                                </span>
                                            </div>

                                            {/* Gönder */}
                                            <Button
                                                size="sm"
                                                variant="text"
                                                color="blue-gray"
                                                className="flex items-center gap-1 shrink-0 py-1 px-2 text-xs normal-case"
                                                onClick={() => handleSendToEnd(vehicle.id, vehicle.licensePlate)}
                                            >
                                                <PaperAirplaneIcon className="h-3 w-3" />
                                                Gönder
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}