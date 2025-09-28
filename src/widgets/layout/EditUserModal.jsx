import React, { useState, useEffect } from "react";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography,
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";

export function EditUserModal({ open, handleOpen, userToEdit, onUserUpdated }) {
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");


    useEffect(() => {
        if (userToEdit) {
            setFormData({
                fullName: userToEdit.fullName || "",
                userName: userToEdit.userName || "",
                password: "",
                confirmPassword: "",
            });
            setError("");
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setError("");
        handleOpen();
    };

    const handleSubmit = async () => {

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError("Girilen şifreler uyuşmuyor.");
            return;
        }


        const payload = {
            fullName: formData.fullName,
            userName: formData.userName,
        };
        if (formData.password) {
            payload.password = formData.password;
            payload.confirmPassword = formData.confirmPassword;
        }

        try {
            await apiClient.put(`/Users/${userToEdit.id}`, payload);
            alert("Kullanıcı başarıyla güncellendi!");
            onUserUpdated();
            handleClose();
        } catch (err) {
            console.error("Kullanıcı güncellenirken hata:", err);

            setError(err.response?.data?.title || err.response?.data || "Bir hata oluştu.");
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Kullanıcıyı Düzenle: {userToEdit?.fullName}</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input
                    label="Tam Ad *"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <Input
                    label="Kullanıcı Adı *"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                />
                <hr />
                <Typography variant="small" color="blue-gray" className="-mb-3">
                    Şifreyi Değiştirmek İstemiyorsanız Boş Bırakın
                </Typography>
                <Input
                    label="Yeni Şifre"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                <Input
                    label="Yeni Şifre Tekrar"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
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