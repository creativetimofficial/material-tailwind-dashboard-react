import React, { useState, useEffect } from "react";
import {
    Typography,
    Card,
    Spinner,
    Button,
    CardHeader,
    CardBody
} from "@material-tailwind/react";
import { InformationCircleIcon, PaperAirplaneIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig.js";
import { toast } from 'react-toastify';

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

function DispatchVehicleCard({ vehicle, index, onSendToEnd, query }) {
    const isFirstThree = index < 3;
    const cardBgColor = isFirstThree ? "bg-green-100" : "bg-blue-gray-50/70";
    const textColor = isFirstThree ? "text-green-900" : "text-blue-gray-700";
    const borderColor = isFirstThree ? "border-green-300" : "border-transparent";
    const isMatch = query.trim() && vehicle.licensePlate.toLowerCase().includes(query.toLowerCase());

    return (
        <div className={`p-1.5 rounded-md ${cardBgColor} shadow-sm flex items-center justify-between border ${isMatch ? "border-yellow-400 ring-1 ring-yellow-300" : borderColor}`}>
            <div className="flex items-center gap-2">
                <Typography className={`font-bold text-md ${textColor}`}>#{index + 1}</Typography>
                <Typography variant="small" className="font-bold text-blue-gray-800 leading-tight">
                    <HighlightedPlate plate={vehicle.licensePlate} query={query} />
                </Typography>
            </div>
            <Button size="sm" variant="gradient" color="blue-gray" onClick={onSendToEnd} className="flex-shrink-0 flex items-center gap-2">
                <PaperAirplaneIcon className="h-4 w-4" />
                Gönder
            </Button>
        </div>
    );
}

function RouteColumn({ route, onSendToEnd }) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filtered = search.trim()
        ? route.queuedVehicles.filter(v =>
            v.licensePlate.toLowerCase().includes(search.toLowerCase())
        )
        : route.queuedVehicles;

    const getOriginalIndex = (vehicleId) =>
        route.queuedVehicles.findIndex(v => v.id === vehicleId);

    return (
        <div className="w-full md:w-80 flex-shrink-0">
            <Card className="flex flex-col h-full shadow-lg border border-gray-200 bg-white">
                {/* HEADER — orijinal tasarım korundu, butona "Tüm Araçları Görüntüle" eklendi */}
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="m-4 p-4 flex flex-col gap-3 rounded-lg flex-shrink-0"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1 overflow-hidden">
                            <Typography variant="h6" color="white" className="truncate" title={route.routeName}>
                                {route.routeName}
                            </Typography>
                            <Typography variant="small" color="white" className="opacity-80">
                                {route.queuedVehicles.length} Araç
                            </Typography>
                        </div>
                    </div>
                    {/* Orijinal tasarımdaki "Tüm Araçları Görüntüle" butonu */}
                    <Button
                        size="sm"
                        variant="outlined"
                        className="w-full flex items-center justify-center gap-2 border-white/40 text-white hover:bg-white/10 normal-case"
                        onClick={() => navigate(`/anasayfa/ozel-gorev/${route.routeId}`, {
                            state: { routeName: route.routeName }
                        })}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Tüm Araçları Görüntüle
                    </Button>
                </CardHeader>

                {/* ARAMA ÇUBUĞU — header ile liste arasına eklendi */}
                <div className="px-4 pb-2 flex-shrink-0">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Plaka ara..."
                            className="w-full pl-9 pr-8 py-1.5 text-sm rounded-lg border border-blue-gray-200 bg-blue-gray-50/50 focus:outline-none focus:border-blue-gray-400 focus:bg-white transition-colors placeholder-blue-gray-300"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-gray-400 hover:text-blue-gray-600 text-xs font-bold leading-none"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    {search && (
                        <Typography variant="small" className="text-xs text-blue-gray-400 mt-1 pl-1">
                            {filtered.length} sonuç
                        </Typography>
                    )}
                </div>

                <CardBody className="p-4 pt-2 flex-grow overflow-y-auto">
                    {filtered.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {filtered.map((vehicle) => {
                                const originalIndex = getOriginalIndex(vehicle.id);
                                return (
                                    <DispatchVehicleCard
                                        key={vehicle.id}
                                        vehicle={vehicle}
                                        index={originalIndex}
                                        query={search}
                                        onSendToEnd={() => onSendToEnd(route.routeId, vehicle.id, vehicle.licensePlate)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-blue-gray-400">
                            <InformationCircleIcon className="w-12 h-12 mb-2" />
                            <Typography variant="small" className="font-semibold">
                                {search ? "Araç bulunamadı" : "Sırada Araç Yok !"}
                            </Typography>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

export function DispatchPage() {
    const [routesWithQueues, setRoutesWithQueues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllQueues = async () => {
        try {
            const response = await apiClient.get("/queues/all");
            setRoutesWithQueues(response.data);
        } catch (err) {
            setError("Sıra verileri yüklenirken bir hata oluştu.");
            console.error(err);
        } finally {
            if (loading) setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllQueues();
    }, []);

    const handleSendToEnd = async (routeId, vehicleId, licensePlate) => {
        if (window.confirm(`'${licensePlate}' plakalı aracı sıranın sonuna göndermek istediğinizden emin misiniz?`)) {
            try {
                await apiClient.post(`/routes/${routeId}/queue/move-to-end`, { vehicleId });
                toast.info(`'${licensePlate}' plakalı araç sıranın sonuna gönderildi.`);
                fetchAllQueues();
            } catch (error) {
                console.error("Araç sona gönderilirken hata:", error);
                toast.error("İşlem sırasında bir hata oluştu.");
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner className="h-16 w-16" /></div>;
    }

    if (error) {
        return <Typography color="red" className="mt-12 text-center">{error}</Typography>;
    }

    return (
        <div className="mt-6 md:mt-12">
            <div className="flex flex-col md:flex-row gap-6 pb-4 md:h-[calc(100vh-80px)] md:overflow-x-auto md:overflow-y-hidden">
                {routesWithQueues.map(route => (
                    <RouteColumn
                        key={route.routeId}
                        route={route}
                        onSendToEnd={handleSendToEnd}
                    />
                ))}
            </div>
        </div>
    );
}

export default DispatchPage;