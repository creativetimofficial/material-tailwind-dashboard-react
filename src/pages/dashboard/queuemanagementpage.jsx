// src/pages/dashboard/queuemanagementpage.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
    Typography, Card, CardHeader, CardBody,
    Button, Select, Option, List, ListItem, Input
} from "@material-tailwind/react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// ❌ CSS import YOK - uyumsuz olduğu için kaldırıldı
import apiClient from "@/api/axiosConfig";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";

const HUB_URL = "https://75ymkt.com/hubs/queue";

// --- Plaka Normalize Yardımcı Fonksiyonu ---
const normalizePlate = (plate) => {
    if (!plate) return "";
    return plate.replace(/\s+/g, "").toUpperCase();
};

// --- Sürüklenebilir Satır ---
function SortableRow({ vehicle, index, onRemove, isHighlighted }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: vehicle.id });

    // CSS import yerine manuel transform string
    const transformStr = transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX ?? 1}) scaleY(${transform.scaleY ?? 1})`
        : undefined;

    const style = {
        transform: transformStr,
        // Renk geçişinin yumuşak olması için transition eklendi
        transition: transition ? `${transition}, background-color 0.5s ease` : "background-color 0.5s ease",
        opacity: isDragging ? 0.5 : 1,
        // Gri parlama veya sürükleme rengi
        backgroundColor: isHighlighted ? "#e2e8f0" : (isDragging ? "#eff6ff" : "white"),
        position: "relative",
    };

    return (
        <tr id={`vehicle-row-${vehicle.id}`} ref={setNodeRef} style={style}>
            <td className="py-3 px-3 border-b w-10">
                <div
                    {...attributes}
                    {...listeners}
                    style={{
                        cursor: isDragging ? "grabbing" : "grab",
                        display: "inline-flex",
                        padding: "4px",
                        borderRadius: "4px",
                        userSelect: "none",
                    }}
                    title="Sürükleyerek sıra değiştir"
                >
                    {/* Hamburger ikonu - Heroicons olmadan */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#90a4ae"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </td>
            <td className="py-3 px-5 border-b font-semibold text-blue-gray-700">
                #{index + 1}
            </td>
            <td className="py-3 px-5 border-b">{vehicle.licensePlate}</td>
            <td className="py-3 px-5 border-b">{vehicle.userFullName || vehicle.driverName || "-"}</td>
            <td className="py-3 px-5 border-b">
                <Button color="red" size="sm" variant="text" onClick={() => onRemove(vehicle.id)}>
                    Çıkar
                </Button>
            </td>
        </tr>
    );
}

export function QueueManagementPage() {
    const [routes, setRoutes] = useState([]);
    const [allVehicles, setAllVehicles] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [queuedVehicles, setQueuedVehicles] = useState([]);
    const [vehicleToAdd, setVehicleToAdd] = useState("");
    const [loadingQueue, setLoadingQueue] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Arama için eklendi
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedId, setHighlightedId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Yanlışlıkla sürüklemeyi önlemek için 8px eşik
            activationConstraint: { distance: 8 },
        })
    );

    const fetchBaseData = async () => {
        try {
            const [routesRes, vehiclesRes] = await Promise.all([
                apiClient.get("/admin/routes"),
                apiClient.get("/admin/vehicles"),
            ]);
            setRoutes(routesRes.data);
            setAllVehicles(vehiclesRes.data);
        } catch (err) {
            console.error("Veri hatası:", err);
        }
    };

    const fetchQueueData = async () => {
        if (!selectedRoute) return;
        setLoadingQueue(true);
        try {
            const res = await apiClient.get(`/routes/${selectedRoute.id}/queue`);
            setQueuedVehicles(res.data);
        } catch {
            setQueuedVehicles([]);
        } finally {
            setLoadingQueue(false);
        }
    };

    useEffect(() => {
        fetchBaseData();
        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        connection.start().then(() => {
            connection.on("ReceiveQueueUpdate", fetchBaseData);
        }).catch(console.error);
        return () => connection.stop();
    }, []);

    useEffect(() => {
        fetchQueueData();
        setVehicleToAdd("");
        setSearchQuery(""); // Güzergah değişince aramayı sıfırla
        setHighlightedId(null);
    }, [selectedRoute]);

    // --- Arama Fonksiyonları Başlangıç ---
    const handleSearch = () => {
        const query = normalizePlate(searchQuery);
        if (!query) return;

        const found = queuedVehicles.find(v => normalizePlate(v.licensePlate).includes(query));
        if (found) {
            setHighlightedId(found.id);
            setTimeout(() => {
                // dnd-kit ref'leri ile çakışmamak için id bazlı scroll kullanıldı
                const el = document.getElementById(`vehicle-row-${found.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);
            setTimeout(() => setHighlightedId(null), 3000); // 3 saniye sonra parlamayı kaldır
        } else {
            toast.error(`"${searchQuery}" plakalı araç sırada bulunamadı.`, { autoClose: 2000 });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };
    // --- Arama Fonksiyonları Bitiş ---

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = queuedVehicles.findIndex((v) => v.id === active.id);
        const newIndex = queuedVehicles.findIndex((v) => v.id === over.id);
        const reordered = arrayMove(queuedVehicles, oldIndex, newIndex);

        setQueuedVehicles(reordered); // Optimistic update

        setIsSaving(true);
        try {
            await apiClient.post(`/routes/${selectedRoute.id}/queue/reorder`, {
                orderedVehicleIds: reordered.map((v) => v.id),
            });
            toast.success("Sıra güncellendi!", { autoClose: 1500 });
        } catch {
            toast.error("Sıra kaydedilemedi.");
            fetchQueueData(); // Hata varsa geri al
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddVehicleToQueue = async () => {
        if (!vehicleToAdd || !selectedRoute) return;
        try {
            await apiClient.post(`/routes/${selectedRoute.id}/queue`, {
                vehicleId: Number(vehicleToAdd),
            });
            setVehicleToAdd("");
            await fetchQueueData();
        } catch (err) {
            toast.error(err.response?.data || "Araç eklenemedi.");
        }
    };

    const handleRemoveVehicleFromQueue = async (vehicleId) => {
        if (!window.confirm("Bu aracı sıradan çıkarmak istediğinize emin misiniz?")) return;
        try {
            await apiClient.delete(`/routes/${selectedRoute.id}/queue/${vehicleId}`);
            await fetchQueueData();
        } catch {
            toast.error("Araç çıkarılamadı.");
        }
    };

    const availableVehicles = useMemo(() => {
        const queuedIds = new Set(queuedVehicles.map((v) => v.id));
        return allVehicles.filter((v) => !queuedIds.has(v.id) && v.isActive);
    }, [allVehicles, queuedVehicles]);

    const selectKey = selectedRoute
        ? `select-${selectedRoute.id}-${availableVehicles.length}`
        : "empty";

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">Güzergah Sıra Yönetimi</Typography>
                    <Typography variant="small" color="white" className="opacity-70 font-normal mt-1">
                        ☰ ikonuna basılı tutup sürükleyerek sıra değiştirebilirsiniz.
                    </Typography>
                </CardHeader>
                <CardBody className="p-6 flex flex-col lg:flex-row gap-8">

                    {/* SOL - Güzergah seçimi */}
                    <div className="lg:w-1/3">
                        <Typography variant="h6" color="blue-gray" className="mb-4">Güzergah Seçin</Typography>
                        <Card className="w-full border">
                            <List>
                                {routes.map((route) => (
                                    <ListItem
                                        key={route.id}
                                        onClick={() => setSelectedRoute(route)}
                                        selected={selectedRoute?.id === route.id}
                                        className="cursor-pointer"
                                    >
                                        {route.routeName}
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </div>

                    {/* SAĞ - Sıra tablosu */}
                    <div className="lg:w-2/3">
                        {!selectedRoute ? (
                            <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg p-12">
                                <Typography color="blue-gray">Lütfen soldan bir güzergah seçin</Typography>
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                    <Typography variant="h6" color="blue-gray">
                                        {selectedRoute.routeName} — {queuedVehicles.length} Araç
                                    </Typography>

                                    <div className="flex items-center gap-3">
                                        {isSaving && (
                                            <Typography variant="small" color="blue" className="animate-pulse font-semibold">
                                                ⏳ Kaydediliyor...
                                            </Typography>
                                        )}
                                        <div className="w-56">
                                            <Input
                                                label="Sırada Plaka Ara"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                icon={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 cursor-pointer text-blue-gray-500 hover:text-blue-500 transition-colors"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        onClick={handleSearch}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto border rounded-lg mb-8 max-h-[600px] overflow-y-auto">
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <table className="w-full min-w-[540px] table-auto">
                                            <thead className="sticky top-0 bg-white z-10">
                                            <tr>
                                                {["", "Sıra", "Plaka", "Şoför", "İşlem"].map((h) => (
                                                    <th key={h} className="border-b border-blue-gray-50 py-3 px-5 text-left bg-white">
                                                        <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                                                            {h}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <SortableContext
                                                items={queuedVehicles.map((v) => v.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                <tbody>
                                                {loadingQueue ? (
                                                    <tr>
                                                        <td colSpan={5} className="text-center p-6 text-blue-gray-400">
                                                            Yükleniyor...
                                                        </td>
                                                    </tr>
                                                ) : queuedVehicles.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="text-center p-6 text-blue-gray-400">
                                                            Bu güzergahta sırada araç yok.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    queuedVehicles.map((vehicle, index) => (
                                                        <SortableRow
                                                            key={vehicle.id}
                                                            vehicle={vehicle}
                                                            index={index}
                                                            onRemove={handleRemoveVehicleFromQueue}
                                                            isHighlighted={highlightedId === vehicle.id}
                                                        />
                                                    ))
                                                )}
                                                </tbody>
                                            </SortableContext>
                                        </table>
                                    </DndContext>
                                </div>

                                {/* Araç ekleme */}
                                <div className="flex items-end gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex-grow">
                                        <Select
                                            key={selectKey}
                                            label="Sıraya Eklenecek Aracı Seçin"
                                            value={vehicleToAdd}
                                            onChange={(val) => setVehicleToAdd(val)}
                                            animate={{ mount: { y: 0 }, unmount: { y: 0 } }}
                                            disabled={availableVehicles.length === 0}
                                        >
                                            {availableVehicles.map((vehicle) => (
                                                <Option key={vehicle.id} value={String(vehicle.id)}>
                                                    {vehicle.licensePlate} ({vehicle.driverName || vehicle.userFullName || "-"})
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Button onClick={handleAddVehicleToQueue} disabled={!vehicleToAdd}>
                                        Sıraya Ekle
                                    </Button>
                                </div>
                                {availableVehicles.length === 0 && (
                                    <Typography variant="small" color="gray" className="mt-2 text-center italic">
                                        * Eklenecek uygun (aktif) araç bulunamadı.
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default QueueManagementPage;