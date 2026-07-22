import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import apiClient from "../../api/axiosConfig.js";
import { AddUserModal } from "@/widgets/layout/AddUserModal";
import { EditUserModal } from "@/widgets/layout/EditUserModal";

export function Profile() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleOpenEditModal = (user) => {
        setCurrentUser(user);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setCurrentUser(null);
        setOpenEditModal(false);
    };

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setUserToDelete(null);
        setOpenDeleteModal(false);
    };

    const extractApiError = (err, fallback) => {
        const data = err?.response?.data;
        if (!data) return fallback;

        if (typeof data === "string") return data;
        if (data?.title) return data.title;
        if (data?.message) return data.message;

        // ValidationProblemDetails vb.
        if (data?.errors && typeof data.errors === "object") {
            const firstKey = Object.keys(data.errors)[0];
            if (firstKey && Array.isArray(data.errors[firstKey]) && data.errors[firstKey][0]) {
                return data.errors[firstKey][0];
            }
        }

        return fallback;
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get("/Users");
            setUsers(response.data || []);
            setError(null);
        } catch (err) {
            console.error("Kullanıcı listesi hatası:", err);
            setError(extractApiError(err, "Kullanıcı verileri yüklenirken bir hata oluştu."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDataChange = async (message) => {
        await fetchUsers();
        if (message) toast.success(message);
    };

    const onUserAddedCallback = async () => {
        await handleDataChange("Kullanıcı başarıyla eklendi.");
    };

    const onUserUpdatedCallback = async () => {
        await handleDataChange("Kullanıcı bilgileri güncellendi.");
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await apiClient.delete(`/Users/${userToDelete.id}`);
            await handleDataChange(`'${userToDelete.fullName}' adlı kullanıcı silindi.`);
            handleCloseDeleteModal();
        } catch (err) {
            console.error("Silme hatası:", err);
            toast.error(extractApiError(err, "Silme işlemi başarısız oldu."));
            handleCloseDeleteModal();
        }
    };

    if (loading) {
        return (
            <div className="mt-12 text-center">
                <Typography>Kullanıcılar Yükleniyor...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-12 text-center">
                <Typography color="red">{error}</Typography>
            </div>
        );
    }

    return (
        <>
            <AddUserModal
                open={openAddModal}
                handleOpen={handleCloseAddModal}
                onUserAdded={onUserAddedCallback}
                requireFullName={true} // backend artık FullName istiyor
            />

            <EditUserModal
                open={openEditModal}
                handleOpen={handleCloseEditModal}
                userToEdit={currentUser}
                onUserUpdated={onUserUpdatedCallback}
            />

            <Dialog open={openDeleteModal} handler={handleCloseDeleteModal} size="xs">
                <DialogHeader>Silme Onayı</DialogHeader>
                <DialogBody divider>
                    {userToDelete && (
                        <Typography>
                            <span className="font-bold">{userToDelete.fullName}</span> adlı kullanıcıyı silmek istediğinizden emin misiniz?
                            <br />
                            <br />
                        </Typography>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="blue-gray" onClick={handleCloseDeleteModal} className="mr-1">
                        İptal
                    </Button>
                    <Button variant="gradient" color="red" onClick={confirmDelete}>
                        Evet, Sil
                    </Button>
                </DialogFooter>
            </Dialog>

            <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card>
                    <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex justify-between items-center">
                        <Typography variant="h6" color="white">
                            Kullanıcılar
                        </Typography>
                        <Button size="sm" className="bg-green-700 text-white hover:bg-green-800" onClick={handleOpenAddModal}>
                            Kullanıcı Ekle
                        </Button>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                            <tr>
                                {["Tam Ad", "Plaka", "Telefon", "İşlem"].map((el) => (
                                    <th
                                        key={el}
                                        className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "İşlem" ? "text-right" : ""}`}
                                    >
                                        <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <Typography className="text-sm font-semibold text-blue-gray-600">{user.fullName}</Typography>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <Typography className="text-xs font-normal text-blue-gray-500">{user.licensePlate || "-"}</Typography>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <Typography className="text-xs font-normal text-blue-gray-500">{user.phoneNumber || "-"}</Typography>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50 text-right">
                                        <div className="flex justify-end items-center gap-4">
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue"
                                                className="font-semibold uppercase text-xs cursor-pointer hover:underline"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenEditModal(user);
                                                }}
                                            >
                                                Düzenle
                                            </Typography>

                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="red"
                                                className="font-semibold uppercase text-xs cursor-pointer hover:underline"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenDeleteModal(user);
                                                }}
                                            >
                                                Sil
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Profile;