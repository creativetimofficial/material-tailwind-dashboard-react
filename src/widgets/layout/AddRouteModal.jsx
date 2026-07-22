import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
} from "@material-tailwind/react";
// TOAST ENTEGRASYONU
import { toast } from 'react-toastify'; 
import apiClient from "../../api/axiosConfig.js";

export function AddRouteModal({ open, handleOpen, onRouteAdded }) {
    const [routeName, setRouteName] = useState("");
    const [localError, setLocalError] = useState(""); // Hata mesajını local'de tutuyoruz

    const clearForm = () => {
        setRouteName("");
        setLocalError("");
    };

    const handleClose = () => {
        clearForm();
        handleOpen();
    };

    const handleSubmit = async () => {
        if (!routeName.trim()) {
            setLocalError("Güzergah adı boş olamaz.");
            toast.error("Güzergah adı boş olamaz."); // Toast ile de bildir
            return;
        }

        try {
            const response = await apiClient.post("/admin/routes", { routeName });
            
            // Standart alert yerine BAŞARI TOAST'ı göster
            toast.success(`${routeName} başarıyla eklendi!`, { position: "top-right" });
            
            onRouteAdded(response.data); // Ana listeyi yenile
            handleClose(); 
        } catch (err) {
            console.error("Güzergah eklenirken hata:", err);
            
            // Backend'den gelen spesifik hata mesajını çek ve TOAST ile göster
            const apiError = err.response?.data?.message || err.response?.data?.error || "Bir hata oluştu.";
            setLocalError(apiError);
            toast.error(apiError);
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Yeni Güzergah Ekle</DialogHeader>
            <DialogBody divider>
                {/* Local hata gösterimi için typography */}
                {localError && <Typography color="red" variant="small" className="mb-2">{localError}</Typography>}
                <Input
                    label="Güzergah Adı *"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    error={!!localError} // Hata varsa input'u kırmızı yap
                />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleClose} className="mr-1">
                    <span>İptal</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>
                    <span>Kaydet</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}