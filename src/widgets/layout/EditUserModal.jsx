import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Typography } from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";
import { toast } from 'react-toastify';

export function EditUserModal({ open, handleOpen, userToEdit, onUserUpdated }) {
    // Sadece Swagger'da istenen ve formda olan alanlar
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "", // Sadece ekranda göstermek için, göndermeyeceğiz
        password: "",
        confirmPassword: ""
    });

    const notifyError = (msg) => {
        toast.error(msg, {
            className: "border-l-4 border-red-500 bg-white shadow-xl rounded-lg",
            bodyClassName: "text-blue-gray-800 font-medium text-sm",
            icon: "❌"
        });
    };

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                fullName: userToEdit.fullName || "",
                userName: userToEdit.userName || "",
                password: "",
                confirmPassword: ""
            });
        }
    }, [userToEdit]);

    const handleSubmit = async () => {
        // Şifrelerden biri girilmişse Frontend kontrolü
        if (formData.password || formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                notifyError("Şifreler uyuşmuyor!");
                return;
            }
            if (formData.password.length < 6) {
                notifyError("Şifre en az 6 karakter olmalıdır.");
                return;
            }
        }

        // --- PAYLOAD HAZIRLIĞI (SWAGGER'A GÖRE) ---
        // ID zaten URL'de (/Users/{id}) gidiyor, body'ye koymaya gerek yok.
        // UserName Swagger'da yok, o yüzden onu da çıkardık.
        const payload = {
            fullName: formData.fullName
        };

        // Eğer şifre kutusu doluysa, password VE confirmPassword alanlarını ekle
        // Swagger modelinde confirmPassword olduğu için onu da göndermeliyiz!
        if (formData.password && formData.password.trim() !== "") {
            payload.password = formData.password;
            payload.confirmPassword = formData.confirmPassword;
        }

        try {
            await apiClient.put(`/Users/${userToEdit.id}`, payload);

            toast.success("Kullanıcı güncellendi!");
            onUserUpdated();
            handleOpen();
        } catch (err) {
            console.error(err);
            // Hata mesajını yakalama
            const backendMsg = err.response?.data?.errors
                ? JSON.stringify(err.response.data.errors) // Validation hatası dönerse
                : (err.response?.data?.message || "Güncelleme başarısız.");

            notifyError(backendMsg);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm" className="rounded-xl border border-blue-gray-50 shadow-2xl">
            <DialogHeader className="text-blue-gray-900 font-bold px-6 pt-6 uppercase tracking-wider text-sm">
                Kullanıcı Düzenle
            </DialogHeader>
            <DialogBody divider className="flex flex-col gap-6 py-8 px-6">

                {/* Ad Soyad */}
                <div className="flex flex-col gap-1">
                    <Typography variant="small" color="blue-gray" className="font-semibold ml-1">Tam Ad</Typography>
                    <Input
                        label="Ad Soyad"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        size="lg"
                    />
                </div>

                {/* Kullanıcı Adı (Salt Okunur) */}
                <div className="flex flex-col gap-1 opacity-70">
                    <Typography variant="small" color="blue-gray" className="font-semibold ml-1 text-xs">Kullanıcı Adı (Değiştirilemez)</Typography>
                    <Input
                        label="Kullanıcı Adı"
                        value={formData.userName}
                        disabled
                        className="!bg-blue-gray-50/50 cursor-not-allowed"
                        size="lg"
                    />
                </div>

                {/* Şifre Bölümü */}
                <div className="bg-blue-gray-50/30 p-4 rounded-xl border border-dashed border-blue-gray-200 flex flex-col gap-4">
                    <Typography variant="small" className="font-bold text-blue-gray-600 flex items-center gap-2">
                        <span>🔐</span> Şifre İşlemleri
                    </Typography>
                    <Typography variant="small" className="text-[10px] text-blue-gray-400 -mt-3 italic">
                        Şifreyi değiştirmeyecekseniz boş bırakın.
                    </Typography>

                    <Input
                        label="Yeni Şifre"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        size="lg"
                    />
                    <Input
                        label="Yeni Şifre Tekrar"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        size="lg"
                    />
                </div>
            </DialogBody>
            <DialogFooter className="gap-3 px-6 pb-6">
                <Button variant="text" color="red" onClick={handleOpen} className="normal-case font-bold py-2">
                    İptal
                </Button>
                <Button variant="gradient" color="blue" onClick={handleSubmit} className="normal-case font-bold shadow-blue-500/20 py-2">
                    Güncelle
                </Button>
            </DialogFooter>
        </Dialog>
    );
}