import React, { useState } from "react";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography, Select, Option,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import apiClient from "../../api/axiosConfig.js";

export function AddUserModal({ open, handleOpen, onUserAdded }) {
    const [formData, setFormData] = useState({
        fullName: "", userName: "", password: "", confirmPassword: "", phoneNumber: "", role: "User",
    });
    const [error, setError] = useState("");

    const clearForm = () => {
        setFormData({ fullName: "", userName: "", password: "", confirmPassword: "", phoneNumber: "", role: "User" });
        setError("");
    };

    const handleClose = () => { clearForm(); handleOpen(); };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.userName || !formData.password || !formData.confirmPassword) {
            const msg = "Zorunlu alanları doldurunuz.";
            setError(msg); toast.error(msg); return;
        }
        if (formData.password !== formData.confirmPassword) {
            const msg = "Şifreler eşleşmiyor.";
            setError(msg); toast.error(msg); return;
        }
        try {
            await apiClient.post("/Users", {
                fullName: formData.fullName,
                userName: formData.userName,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phoneNumber: formData.phoneNumber?.trim() || null,
                roles: [formData.role || "User"],
            });
            onUserAdded();
            handleClose();
        } catch (err) {
            const msg = err.response?.status === 409
                ? `'${formData.userName}' zaten kayıtlı.`
                : (err.response?.data?.message || err.response?.data || "Kullanıcı eklenirken hata oluştu.");
            setError(msg); toast.error(msg);
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Yeni Kullanıcı Ekle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input label="Tam Ad *" name="fullName" value={formData.fullName} onChange={handleChange} autoComplete="off" />
                <Input label="Kullanıcı Adı *" name="userName" value={formData.userName} onChange={handleChange} autoComplete="off" />
                <Input label="Telefon Numarası" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="5551234567" />
                <Select label="Rol" value={formData.role} onChange={(val) => setFormData(prev => ({ ...prev, role: val }))}>
                    <Option value="User">Kullanıcı</Option>
                    <Option value="Muhasebeci">Muhasebeci</Option>
                    <Option value="Admin">Admin</Option>
                </Select>
                <Input label="Şifre *" name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
                <Input label="Şifre Tekrar *" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleClose} className="mr-1">İptal</Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>Kaydet</Button>
            </DialogFooter>
        </Dialog>
    );
}