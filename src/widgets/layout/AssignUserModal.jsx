import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import apiClient from "../../api/axiosConfig.js";

export function AssignUserModal({ open, handleOpen, vehicle, onAssigned }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedUserId(vehicle?.appUserId || "");
            apiClient
                .get("/Users")
                .then((r) => setUsers(r.data || []))
                .catch(() => toast.error("Kullanıcı listesi yüklenemedi."));
        }
    }, [open, vehicle]);

    const handleSubmit = async () => {
        if (!selectedUserId) {
            toast.error("Lütfen bir kullanıcı seçin.");
            return;
        }
        setLoading(true);
        try {
            await apiClient.patch(`/admin/vehicles/${vehicle.id}/assign-user`, {
                appUserId: selectedUserId,
            });
            toast.success("Kullanıcı ataması güncellendi.");
            onAssigned();
            handleOpen();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Atama yapılamadı.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm">
            <DialogHeader>
                <div className="flex flex-col gap-1">
                    <Typography variant="h6">Kullanıcı Ata / Değiştir</Typography>
                    {vehicle && (
                        <Typography variant="small" className="text-blue-gray-400 font-normal">
                            Araç: <span className="font-semibold text-blue-gray-700">{vehicle.licensePlate}</span>
                        </Typography>
                    )}
                </div>
            </DialogHeader>

            <DialogBody divider className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {users.length === 0 ? (
                    <Typography variant="small" className="text-center text-blue-gray-400 py-4">
                        Kullanıcı bulunamadı.
                    </Typography>
                ) : (
                    users.map((u) => {
                        const isSelected = selectedUserId === u.id;
                        return (
                            <div
                                key={u.id}
                                onClick={() => setSelectedUserId(u.id)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-all
                                    ${isSelected
                                    ? "border-gray-800 bg-gray-800 text-white"
                                    : "border-blue-gray-100 hover:bg-blue-gray-50 text-blue-gray-700"
                                }`}
                            >
                                <div className="flex flex-col">
                                    <Typography variant="small" className={`font-semibold ${isSelected ? "text-white" : ""}`}>
                                        {u.fullName}
                                    </Typography>
                                    {u.phoneNumber && (
                                        <Typography variant="small" className={`text-xs ${isSelected ? "text-gray-300" : "text-blue-gray-400"}`}>
                                            {u.phoneNumber}
                                        </Typography>
                                    )}
                                </div>
                                {isSelected && (
                                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-gray-800" />
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </DialogBody>

            <DialogFooter className="gap-2">
                <Button variant="text" color="blue-gray" onClick={handleOpen}>
                    İptal
                </Button>
                <Button
                    variant="gradient"
                    color="gray"
                    onClick={handleSubmit}
                    disabled={loading || !selectedUserId}
                >
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}