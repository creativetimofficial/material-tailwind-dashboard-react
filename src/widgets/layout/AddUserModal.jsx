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

export function AddUserModal({ open, handleOpen, onUserAdded }) {
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const clearForm = () => {
        setFormData({ fullName: "", userName: "", password: "", confirmPassword: "" });
        setError("");
    };

    const handleClose = () => {
        clearForm();
        handleOpen();
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.userName || !formData.password) {
            setError("Tüm zorunlu alanları doldurunuz.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Şifreler uyuşmuyor.");
            return;
        }

        try {
            await apiClient.post("/Users", formData);
            alert("Kullanıcı başarıyla eklendi!");

            // Başarılı ekleme sonrası ana sayfadaki listeyi yenilemesi için sinyal gönderiyoruz.
            onUserAdded();

            handleClose();
        } catch (err) {
            console.error("Kullanıcı eklenirken hata:", err);
            setError(err.response?.data || "Bir hata oluştu.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Yeni Kullanıcı Ekle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input label="Tam Ad *" name="fullName" value={formData.fullName} onChange={handleChange} />
                <Input label="Kullanıcı Adı *" name="userName" value={formData.userName} onChange={handleChange} />
                <Input label="Şifre *" name="password" type="password" value={formData.password} onChange={handleChange} />
                <Input label="Şifre Tekrar *" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
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