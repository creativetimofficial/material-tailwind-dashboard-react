import React, { useState, useEffect } from "react";
import {
    Card, CardHeader, CardBody, Typography, Button, Input, Chip
} from "@material-tailwind/react";
import { UserCircleIcon, TruckIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import apiClient from "../../api/axiosConfig.js";

const HUB_URL = "https://75ymkt.com/hubs/queue";

const formatPlate = (plate) => {
    if (!plate) return "";
    const clean = plate.replace(/\s/g, "").toUpperCase();
    const match = clean.match(/^(\d{2})([A-Z]+)(\d+)$/);
    return match ? `${match[1]} ${match[2]} ${match[3]}` : clean;
};

export function MyProfile() {
    const [userInfo, setUserInfo] = useState(null);
    const [queueStatus, setQueueStatus] = useState([]); // [{routeName, position, total}]
    const [loading, setLoading] = useState(true);
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });
    const [saving, setSaving] = useState(false);

    const fetchMyInfo = async () => {
        try {
            const res = await apiClient.get("/Users/me");
            setUserInfo(res.data);
        } catch {
            toast.error("Bilgiler yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    const fetchQueueStatus = async (licensePlate) => {
        if (!licensePlate || licensePlate === "-") return;
        try {
            const res = await apiClient.get("/queues/all");
            const cleanMyPlate = licensePlate.replace(/\s/g, "").toUpperCase();

            const statuses = [];
            for (const route of res.data) {
                const idx = route.queuedVehicles.findIndex(
                    v => v.licensePlate.replace(/\s/g, "").toUpperCase() === cleanMyPlate
                );
                if (idx !== -1) {
                    statuses.push({
                        routeName: route.routeName,
                        position: idx + 1,
                        total: route.queuedVehicles.length,
                    });
                }
            }
            setQueueStatus(statuses);
        } catch {
            // Sessizce geç
        }
    };

    useEffect(() => {
        fetchMyInfo();
    }, []);

    useEffect(() => {
        if (!userInfo?.licensePlate) return;

        fetchQueueStatus(userInfo.licensePlate);

        // SignalR — sıra değişince otomatik güncelle
        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.None)
            .build();

        connection.start().then(() => {
            connection.on("ReceiveQueueUpdate", () => {
                fetchQueueStatus(userInfo.licensePlate);
            });
        }).catch(() => {});

        return () => connection.stop();
    }, [userInfo]);

    const handlePasswordChange = async () => {
        if (!passwords.currentPassword || !passwords.password || !passwords.confirmPassword) {
            toast.error("Lütfen tüm şifre alanlarını doldurun.");
            return;
        }
        if (passwords.password !== passwords.confirmPassword) {
            toast.error("Yeni şifreler eşleşmiyor.");
            return;
        }
        if (passwords.password.length < 6) {
            toast.error("Şifre en az 6 karakter olmalıdır.");
            return;
        }
        setSaving(true);
        try {
            await apiClient.post("/Users/change-my-password", {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.password,
                confirmNewPassword: passwords.confirmPassword,
            });
            toast.success("Şifre başarıyla güncellendi!");
            setPasswords({ currentPassword: "", password: "", confirmPassword: "" });
        } catch (e) {
            toast.error(e.response?.data?.message || "Şifre güncellenemedi.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-12 flex justify-center">
                <Typography>Yükleniyor...</Typography>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="mt-12 flex justify-center">
                <Typography color="red">Kullanıcı bilgisi alınamadı.</Typography>
            </div>
        );
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-8 max-w-2xl mx-auto">

            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex items-center gap-4">
                    <TruckIcon className="h-8 w-8 text-white opacity-80" />
                    <div>
                        <Typography variant="h6" color="white">Sıra Durumum</Typography>
                        <Typography variant="small" color="white" className="opacity-70 font-normal">
                            Gerçek zamanlı güncellenir
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="px-6 pb-6">
                    {!userInfo.licensePlate || userInfo.licensePlate === "-" ? (
                        <Typography className="text-blue-gray-400 italic text-sm text-center py-4">
                            Atanmış araç olmadığı için sıra durumu görüntülenemiyor.
                        </Typography>
                    ) : queueStatus.length === 0 ? (
                        <Typography className="text-blue-gray-400 italic text-sm text-center py-4">
                            Şu an hiçbir güzergah sırasında değilsiniz.
                        </Typography>
                    ) : (
                        <table className="w-full table-auto">
                            <thead>
                            <tr>
                                {["Güzergah", "Sıra No", "Toplam Araç", "Durum"].map(h => (
                                    <th key={h} className="border-b border-blue-gray-50 py-3 px-4 text-left">
                                        <Typography variant="small" className="font-bold uppercase text-blue-gray-400 text-xs">
                                            {h}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {queueStatus.map((s, i) => (
                                <tr key={i} className="hover:bg-blue-gray-50/50 transition-colors">
                                    <td className="py-3 px-4 border-b border-blue-gray-50">
                                        <Typography className="text-sm font-semibold text-blue-gray-700">
                                            {s.routeName}
                                        </Typography>
                                    </td>
                                    <td className="py-3 px-4 border-b border-blue-gray-50">
                                        <Typography className="text-2xl font-bold text-gray-800">
                                            {s.position}
                                        </Typography>
                                    </td>
                                    <td className="py-3 px-4 border-b border-blue-gray-50">
                                        <Typography className="text-sm text-blue-gray-500">
                                            {s.total} araç
                                        </Typography>
                                    </td>
                                    <td className="py-3 px-4 border-b border-blue-gray-50">
                                        {s.position === 1 ? (
                                            <Chip variant="gradient" color="green" value="Sıradaki" className="w-max text-xs" />
                                        ) : s.position <= 3 ? (
                                            <Chip variant="gradient" color="amber" value="Yaklaşıyor" className="w-max text-xs" />
                                        ) : (
                                            <Chip variant="ghost" color="blue-gray" value="Bekliyor" className="w-max text-xs" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>



            {/* Kişisel Bilgiler */}
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex items-center gap-4">
                    <UserCircleIcon className="h-8 w-8 text-white opacity-80" />
                    <Typography variant="h6" color="white">Kişisel Bilgilerim</Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-6 px-6 pb-6">
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-blue-gray-400 uppercase text-xs tracking-wide">
                            Ad Soyad
                        </Typography>
                        <Typography variant="h6" className="text-blue-gray-800">
                            {userInfo.fullName || "-"}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-blue-gray-400 uppercase text-xs tracking-wide">
                            Kullanıcı Adı
                        </Typography>
                        <Typography className="text-blue-gray-700">
                            {userInfo.userName || "-"}
                        </Typography>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-blue-gray-400 uppercase text-xs tracking-wide">
                            Araç Plakası
                        </Typography>
                        {userInfo.licensePlate && userInfo.licensePlate !== "-" ? (
                            <Chip
                                variant="ghost"
                                color="blue"
                                value={formatPlate(userInfo.licensePlate)}
                                className="w-max font-bold text-sm"
                            />
                        ) : (
                            <Typography className="text-blue-gray-400 italic text-sm">
                                Atanmış araç yok
                            </Typography>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Sıra Durumu */}


            {/* Şifre Değiştir */}
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-4 p-6">
                    <Typography variant="h6" color="white">Şifre Değiştir</Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-5 px-6 pb-6">
                    <Input
                        label="Mevcut Şifre"
                        type="password"
                        value={passwords.currentPassword}
                        onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
                        autoComplete="current-password"
                    />
                    <Input
                        label="Yeni Şifre"
                        type="password"
                        value={passwords.password}
                        onChange={e => setPasswords(p => ({ ...p, password: e.target.value }))}
                        autoComplete="new-password"
                    />
                    <Input
                        label="Yeni Şifre Tekrar"
                        type="password"
                        value={passwords.confirmPassword}
                        onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                        autoComplete="new-password"
                    />
                    <Button
                        variant="gradient"
                        color="gray"
                        onClick={handlePasswordChange}
                        disabled={saving}
                        className="mt-2"
                    >
                        {saving ? "Kaydediliyor..." : "Şifreyi Güncelle"}
                    </Button>
                </CardBody>
            </Card>

        </div>
    );
}

export default MyProfile;