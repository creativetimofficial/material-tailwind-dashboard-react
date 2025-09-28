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
import apiClient from "../../api/axiosConfig.js";

export function AddRouteModal({ open, handleOpen, onRouteAdded }) {
    const [routeName, setRouteName] = useState("");
    const [error, setError] = useState("");

    const clearForm = () => {
        setRouteName("");
        setError("");
    };

    const handleClose = () => {
        clearForm();
        handleOpen();
    };

    const handleSubmit = async () => {
        if (!routeName.trim()) {
            setError("Güzergah adı boş olamaz.");
            return;
        }

        try {
            // CreateRouteDto'ya uygun şekilde { "routeName": "değer" } gönderiyoruz
            const response = await apiClient.post("/admin/routes", { routeName });
            alert("Güzergah başarıyla eklendi!");
            onRouteAdded(response.data); // Ana listeyi anında güncellemek için
            handleClose(); // Formu temizle ve modal'ı kapat
        } catch (err) {
            console.error("Güzergah eklenirken hata:", err);
            // Backend'den gelen "Bu rota adı zaten mevcut." gibi hataları göster
            setError(err.response?.data || "Bir hata oluştu.");
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Yeni Güzergah Ekle</DialogHeader>
            <DialogBody divider>
                {error && <Typography color="red" variant="small" className="mb-2">{error}</Typography>}
                <Input
                    label="Güzergah Adı *"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    error={!!error} // Hata varsa input'u kırmızı yap
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