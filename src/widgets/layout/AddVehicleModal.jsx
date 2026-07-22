import React, { useState, useEffect } from "react";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter,
    Input, Select, Option, Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import apiClient from "../../api/axiosConfig.js";

const TURKISH_PLATE_REGEX = /^(\d{2})\s*([A-Z]{1,3})\s*(\d{1,4})$/;

export function AddVehicleModal({ open, handleOpen, onVehicleAdded }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            apiClient.get("/Users")
                .then(r => { setUsers(r.data || []); setError(""); })
                .catch(() => toast.error("Kullanıcı listesi yüklenemedi."));
        } else {
            setLicensePlate("");
            setSelectedUserId("");
            setError("");
        }
    }, [open]);

    const handleSubmit = async () => {
        const plate = licensePlate.trim().toUpperCase();
        if (!plate) { toast.error("Plaka zorunludur."); return; }
        if (!TURKISH_PLATE_REGEX.test(plate)) {
            toast.error("Plaka formatı uygun değil. Örn: 34 ABC 123"); return;
        }
        try {
            await apiClient.post("/admin/vehicles", {
                licensePlate: plate.replace(/\s+/g, ""),
                appUserId: selectedUserId || null,
            });
            toast.success(`'${plate}' plakalı araç eklendi!`);
            onVehicleAdded?.();
            handleOpen();
        } catch (err) {
            const msg = err?.response?.data?.message || "Araç eklenirken hata oluştu.";
            toast.error(msg);
            setError(msg);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Yeni Araç Ekle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input
                    label="Plaka *"
                    value={licensePlate}
                    onChange={e => setLicensePlate(e.target.value.toUpperCase())}
                    placeholder="34 ABC 123"
                />
                <Select
                    label="Kullanıcı Ataması (Opsiyonel)"
                    value={selectedUserId}
                    onChange={val => setSelectedUserId(val || "")}
                >
                    <Option value="">— Atama Yapma —</Option>
                    {users.map(u => (
                        <Option key={u.id} value={u.id}>
                            {u.fullName}{u.phoneNumber ? ` (${u.phoneNumber})` : ""}
                        </Option>
                    ))}
                </Select>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">İptal</Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>Kaydet</Button>
            </DialogFooter>
        </Dialog>
    );
}