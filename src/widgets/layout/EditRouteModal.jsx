import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";

export function EditRouteModal({ open, handleOpen, routeToEdit, onRouteUpdated }) {
    const [formData, setFormData] = useState({
        routeName: "",
        isActive: true,
    });
    const [error, setError] = useState("");

    // Modal'a düzenlenecek güzergah bilgisi geldiğinde formu doldur
    useEffect(() => {
        if (routeToEdit) {
            setFormData({
                routeName: routeToEdit.routeName,
                isActive: routeToEdit.isActive,
            });
            setError("");
        }
    }, [routeToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const clearForm = () => {
        setFormData({ routeName: "", isActive: true });
        setError("");
    };

    const handleClose = () => {
        clearForm();
        handleOpen();
    };

    const handleSubmit = async () => {
        if (!formData.routeName.trim()) {
            setError("Güzergah adı boş olamaz.");
            return;
        }

        try {
            // PUT isteği ile güzergahı güncelle
            await apiClient.put(`/admin/routes/${routeToEdit.id}`, formData);
            alert("Güzergah başarıyla güncellendi!");
            onRouteUpdated(); // Ana listeyi yenilemesi için sinyal gönder
            handleClose();
        } catch (err) {
            console.error("Güzergah güncellenirken hata:", err);
            setError(err.response?.data || "Bir hata oluştu.");
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Güzergahı Düzenle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input
                    label="Güzergah Adı *"
                    name="routeName"
                    value={formData.routeName}
                    onChange={handleChange}
                />
                <Checkbox
                    label="Aktif mi?"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                    <span>İptal</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>
                    <span>Güncelle</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}