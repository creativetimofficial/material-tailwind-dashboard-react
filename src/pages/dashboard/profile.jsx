import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";
import { AddUserModal } from "@/widgets/layout/AddUserModal";
import { EditUserModal } from "@/widgets/layout/EditUserModal";

export function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ekleme ve Düzenleme Modalları için state'ler
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Düzenleme modalını açan fonksiyon
  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setOpenEditModal(true);
  };
  // Düzenleme modalını kapatan fonksiyon
  const handleCloseEditModal = () => {
    setCurrentUser(null);
    setOpenEditModal(false);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/Users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Kullanıcı verileri yüklenirken bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ekleme, silme veya güncelleme sonrası listeyi yeniden çek
  const handleDataChange = () => {
    fetchUsers();
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`'${userName}' adlı kullanıcıyı silmek istediğinizden emin misiniz?`)) {
      try {
        await apiClient.delete(`/Users/${userId}`);
        handleDataChange(); // Silme sonrası listeyi yenile
      } catch (err) {
        alert("Kullanıcı silinirken bir hata oluştu.");
        console.error(err);
      }
    }
  };

  if (loading) return <div className="mt-12 text-center"><Typography>Kullanıcılar Yükleniyor...</Typography></div>;
  if (error) return <div className="mt-12 text-center"><Typography color="red">{error}</Typography></div>;

  return (
      <>
        <AddUserModal open={openAddModal} handleOpen={handleCloseAddModal} onUserAdded={handleDataChange} />
        <EditUserModal open={openEditModal} handleOpen={handleCloseEditModal} userToEdit={currentUser} onUserUpdated={handleDataChange} />

        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex justify-between items-center">
              <Typography variant="h6" color="white">Kullanıcılar</Typography>
              <Button size="sm" className="bg-green-700 text-white hover:bg-green-800" onClick={handleOpenAddModal}>
                Kullanıcı Ekle
              </Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                <tr>
                  {["Tam Ad", "Plaka", "Telefon", "İşlem"].map((el) => (
                      <th key={el} className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "İşlem" ? "text-right" : ""}`}>
                        <Typography variant="small" className="font-bold uppercase text-blue-gray-400">{el}</Typography>
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
                        <Typography className="text-xs font-normal text-blue-gray-500">{user.licensePlate}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-normal text-blue-gray-500">{user.phoneNumber}</Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 text-right">
                        {/* 3. Düzenle butonunun onClick olayı güncellendi */}
                        <Button size="sm" variant="text" color="blue" onClick={() => handleOpenEditModal(user)}>Düzenle</Button>
                        {/* 4. Buton boyutu `xs`'den `sm`'ye çevrildi */}
                        <Button size="sm" variant="text" color="red" onClick={() => handleDeleteUser(user.id, user.fullName)}>Sil</Button>
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