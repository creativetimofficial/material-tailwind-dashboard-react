import React, { useState, useEffect, useMemo } from "react";
import {
    Typography, Card, CardHeader, CardBody, Button, Select, Option, List, ListItem,
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";

export function QueueManagementPage() {
    // --- STATE TANIMLAMALARI ---
    const [routes, setRoutes] = useState([]); // Tüm güzergahların listesi (sol panel)
    const [allVehicles, setAllVehicles] = useState([]); // Tüm araçların listesi (dropdown için)
    const [selectedRoute, setSelectedRoute] = useState(null); // Seçili olan güzergah
    const [queuedVehicles, setQueuedVehicles] = useState([]); // Seçili güzergahın sırasındaki araçlar
    const [vehicleToAdd, setVehicleToAdd] = useState(""); // Dropdown'dan seçilen araç ID'si
    const [loadingQueue, setLoadingQueue] = useState(false); // Sıra yüklenirken gösterilecek spinner için

    // --- VERİ ÇEKME İŞLEMLERİ ---

    // 1. Bileşen ilk yüklendiğinde tüm güzergahları ve tüm araçları çek
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const routesPromise = apiClient.get("/admin/routes");
                const vehiclesPromise = apiClient.get("/admin/vehicles");

                const [routesResponse, vehiclesResponse] = await Promise.all([routesPromise, vehiclesPromise]);

                setRoutes(routesResponse.data);
                setAllVehicles(vehiclesResponse.data);
            } catch (error) {
                console.error("Ana veriler çekilirken hata oluştu:", error);
            }
        };
        fetchInitialData();
    }, []);

    // 2. Bir güzergah seçildiğinde, o güzergahın sırasını API'den çek
    useEffect(() => {
        if (selectedRoute) {
            setLoadingQueue(true);
            const fetchQueue = async () => {
                try {
                    const response = await apiClient.get(`/routes/${selectedRoute.id}/queue`);
                    setQueuedVehicles(response.data);
                } catch (error) {
                    console.error(`Sıra çekilirken hata (Güzergah ID: ${selectedRoute.id}):`, error);
                    setQueuedVehicles([]); // Hata durumunda listeyi boşalt
                } finally {
                    setLoadingQueue(false);
                }
            };
            fetchQueue();
        }
    }, [selectedRoute]); // selectedRoute her değiştiğinde bu blok çalışır

    // --- FONKSİYONLAR ---

    const handleAddVehicleToQueue = async () => {
        if (!vehicleToAdd || !selectedRoute) {
            alert("Lütfen bir araç seçin.");
            return;
        }
        try {
            await apiClient.post(`/routes/${selectedRoute.id}/queue`, { vehicleId: vehicleToAdd });
            // Başarılı ekleme sonrası sırayı anında güncelle (Refetch)
            const response = await apiClient.get(`/routes/${selectedRoute.id}/queue`);
            setQueuedVehicles(response.data);
            setVehicleToAdd(""); // Dropdown'ı temizle
        } catch (error) {
            console.error("Sıraya araç eklenirken hata:", error);
            alert(error.response?.data || "Araç sıraya eklenemedi.");
        }
    };

    const handleRemoveVehicleFromQueue = async (vehicleId) => {
        if (window.confirm("Bu aracı sıradan çıkarmak istediğinizden emin misiniz?")) {
            try {
                await apiClient.delete(`/routes/${selectedRoute.id}/queue/${vehicleId}`);
                // Başarılı silme sonrası sırayı anında güncelle (Refetch)
                const response = await apiClient.get(`/routes/${selectedRoute.id}/queue`);
                setQueuedVehicles(response.data);
            } catch (error) {
                console.error("Araç sıradan çıkarılırken hata:", error);
                alert("Araç sıradan çıkarılamadı.");
            }
        }
    };

    // KULLANICI DENEYİMİ İYİLEŞTİRMESİ: Mevcut sırada olan araçları, ekleme dropdown'ında gösterme.
    const availableVehicles = useMemo(() => {
        const queuedVehicleIds = new Set(queuedVehicles.map(v => v.id));
        return allVehicles.filter(v => !queuedVehicleIds.has(v.id));
    }, [allVehicles, queuedVehicles]);

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Güzergah Sıra Yönetimi
                    </Typography>
                </CardHeader>
                <CardBody className="p-6 flex flex-col lg:flex-row gap-8">
                    {/* SOL PANEL: Güzergah Listesi */}
                    <div className="lg:w-1/3">
                        <Typography variant="h6" color="blue-gray" className="mb-4">Güzergah Seçin</Typography>
                        <Card className="w-full border">
                            <List>
                                {routes.map(route => (
                                    <ListItem
                                        key={route.id}
                                        onClick={() => setSelectedRoute(route)}
                                        selected={selectedRoute?.id === route.id}
                                    >
                                        {route.routeName}
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </div>

                    {/* SAĞ PANEL: Sıra ve Ekleme Formu */}
                    <div className="lg:w-2/3">
                        {!selectedRoute ? (
                            <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                                <Typography color="blue-gray">Lütfen bir güzergah seçin</Typography>
                            </div>
                        ) : (
                            <div>
                                {/* Sıradaki Araçlar Tablosu */}
                                <Typography variant="h6" color="blue-gray" className="mb-4">
                                    Sıradaki Araçlar: {selectedRoute.routeName}
                                </Typography>
                                <div className="overflow-x-auto border rounded-lg mb-8">
                                    <table className="w-full min-w-[500px] table-auto">
                                        <thead>
                                        <tr>
                                            {["Sıra", "Plaka", "Şoför", "İşlem"].map(el => (
                                                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                                    <Typography variant="small" className="font-bold uppercase text-blue-gray-400">{el}</Typography>
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {loadingQueue ? (
                                            <tr><td colSpan="4" className="text-center p-4">Yükleniyor...</td></tr>
                                        ) : (
                                            queuedVehicles.map((vehicle, index) => (
                                                <tr key={vehicle.id}>
                                                    <td className="py-3 px-5 border-b"><Typography className="font-semibold">#{index + 1}</Typography></td>
                                                    <td className="py-3 px-5 border-b">{vehicle.licensePlate}</td>
                                                    <td className="py-3 px-5 border-b">{vehicle.userFullName}</td>
                                                    <td className="py-3 px-5 border-b">
                                                        <Button color="red" size="sm" variant="text" onClick={() => handleRemoveVehicleFromQueue(vehicle.id)}>
                                                            Çıkar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Sıraya Araç Ekleme Formu */}
                                <div className="flex items-end gap-4">
                                    <div className="flex-grow">
                                        <Select label="Sıraya Eklenecek Aracı Seçin" value={vehicleToAdd} onChange={(val) => setVehicleToAdd(val)}>
                                            {availableVehicles.map(vehicle => (
                                                <Option key={vehicle.id} value={String(vehicle.id)}>
                                                    {vehicle.licensePlate} ({vehicle.userFullName})
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Button onClick={handleAddVehicleToQueue}>Sıraya Ekle</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default QueueManagementPage;