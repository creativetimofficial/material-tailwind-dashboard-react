import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Typography,
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";

export function AddVehicleModal({ open, handleOpen, onVehicleAdded }) {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        licensePlate: "",
        driverName: "",
        phoneNumber: "",
        appUserId: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            // DEĞİŞİKLİK: Backend'de oluşturduğumuz yeni ve filtrelenmiş endpoint'i kullanıyoruz.
            apiClient.get("/Users/without-vehicle")
                .then(response => {
                    setUsers(response.data);
                })
                .catch(err => {
                    console.error("Kullanıcılar çekilirken hata oluştu:", err);
                    setError("Atanabilir kullanıcı listesi yüklenemedi.");
                });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, appUserId: value }));
    };

    const clearForm = () => {
        setFormData({ licensePlate: "", driverName: "", phoneNumber: "", appUserId: "" });
        setError("");
    };

    const handleClose = () => {
        clearForm();
        handleOpen();
    }

    const handleSubmit = async () => {
        if (!formData.licensePlate || !formData.appUserId) {
            setError("Plaka ve Kullanıcı alanları zorunludur.");
            return;
        }
        try {
            await apiClient.post("/admin/vehicles", formData);
            alert("Araç başarıyla eklendi!");
            onVehicleAdded();
            handleClose();
        } catch (err) {
            setError(err.response?.data || "Bir hata oluştu.");
        }
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Yeni Araç Ekle</DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
                {error && <Typography color="red" variant="small">{error}</Typography>}
                <Input label="Plaka *" name="licensePlate" value={formData.licensePlate} onChange={handleChange} />
                <Select label="Kullanıcı Seçiniz *" name="appUserId" onChange={handleSelectChange} value={formData.appUserId}>
                    {users.length > 0 ? (
                        users.map(user => <Option key={user.id} value={user.id}>{user.fullName}</Option>)
                    ) : ( <Option disabled>Atanabilir kullanıcı bulunamadı</Option> )}
                </Select>
                <Input label="Şoför Adı (Opsiyonel)" name="driverName" value={formData.driverName} onChange={handleChange} />
                <Input label="Telefon Numarası (Opsiyonel)" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleClose} className="mr-1"><span>İptal</span></Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}><span>Kaydet</span></Button>
            </DialogFooter>
        </Dialog>
    );
}