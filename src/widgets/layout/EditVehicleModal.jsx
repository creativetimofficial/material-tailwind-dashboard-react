import React, { useState, useEffect } from "react";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Checkbox, Typography
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";

export function EditVehicleModal({ open, handleOpen, onVehicleUpdated, vehicleToEdit }) {
    const [formData, setFormData] = useState({
        licensePlate: "",
        isActive: true,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (vehicleToEdit) {
            setFormData({
                licensePlate: vehicleToEdit.licensePlate || "",
                isActive: vehicleToEdit.isActive,
            });
        } else {
            setFormData({ licensePlate: "", isActive: true });
            setError("");
        }
    }, [vehicleToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async () => {
        if (!formData.licensePlate) { setError("Plaka alanı zorunludur."); return; }
        if (!vehicleToEdit) return;
        try {
            await apiClient.put(`/admin/vehicles/${vehicleToEdit.id}`, {
                licensePlate: formData.licensePlate,
                isActive: formData.isActive,
                appUserId: vehicleToEdit.appUserId ?? null,
            });
            alert("Araç başarıyla güncellendi!");
            onVehicleUpdated();
            handleOpen();
        } catch (err) {
            setError(err.response?.data?.message || "Güncelleme sırasında bir hata oluştu.");
        }
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Aracı Düzenle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input label="Plaka *" name="licensePlate" value={formData.licensePlate} onChange={handleChange} />
                <Checkbox
                    label="Aktif"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">İptal</Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>Kaydet</Button>
            </DialogFooter>
        </Dialog>
    );
}