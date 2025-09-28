import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";
import { AddVehicleModal } from "@/widgets/layout/AddVehicleModal";
import { EditVehicleModal } from "@/widgets/layout/EditVehicleModal";

export function Tables() {
  const [vehicles, setVehicles] = useState([]);

  // "Ekle" modalı için state'ler
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setAddModalOpen(!addModalOpen);

  // "Düzenle" modalı için state'ler
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null); // Düzenlenecek aracı tutar

  // Düzenleme modal'ını açan fonksiyon
  const handleOpenEditModal = (vehicle) => {
    setCurrentVehicle(vehicle); // Hangi aracın düzenleneceğini state'e ata
    setEditModalOpen(true);   // Modal'ı aç
  };

  // Düzenleme modal'ını kapatan fonksiyon
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentVehicle(null); // Modal kapanınca seçili aracı temizle
  }

  // Araç listesini API'den çeken ana fonksiyon
  const fetchVehicles = async () => {
    try {
      const response = await apiClient.get("/admin/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Araçlar çekilirken bir hata oluştu:", error);
    }
  };

  // Bileşen ilk yüklendiğinde araçları çek
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Ekleme, silme veya güncelleme sonrası listeyi yeniden çekmek için
  const handleDataChange = () => {
    fetchVehicles();
  };

  // Araç silme fonksiyonu
  const handleDelete = async (id) => {
    if (window.confirm("Bu aracı silmek istediğinizden emin misiniz?")) {
      try {
        await apiClient.delete(`/admin/vehicles/${id}`);
        handleDataChange(); // Silme sonrası listeyi yenile
      } catch (error) {
        alert("Araç silinirken bir sorun oluştu.");
        console.error("Araç silinirken hata:", error);
      }
    }
  };

  return (
      <>
        <AddVehicleModal
            open={addModalOpen}
            handleOpen={handleOpenAddModal}
            onVehicleAdded={handleDataChange}
        />

        <EditVehicleModal
            open={editModalOpen}
            handleOpen={handleCloseEditModal}
            onVehicleUpdated={handleDataChange}
            vehicleToEdit={currentVehicle}
        />

        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex justify-between items-center">
              <Typography variant="h6" color="white">Araçlar</Typography>
              <Button size="sm" className="bg-green-700 text-white" onClick={handleOpenAddModal}>Araç Ekle</Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                <tr>
                  {["Plaka", "Şoför Adı", "Telefon", "İşlem"].map((el) => (
                      <th key={el} className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "İşlem" ? "text-right" : ""}`}>
                        <Typography variant="small" className="font-bold uppercase text-blue-gray-400">{el}</Typography>
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle, key) => {
                  const className = `py-3 px-5 ${key === vehicles.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (
                      <tr key={vehicle.id}>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">{vehicle.licensePlate}</Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">{vehicle.userFullName}</Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">{vehicle.phoneNumber || "-"}</Typography>
                        </td>
                        <td className={`${className} text-right`}>
                          <Button color="blue" size="sm" variant="text" onClick={() => handleOpenEditModal(vehicle)}>
                            Düzenle
                          </Button>
                          <Button color="red" size="sm" variant="text" onClick={() => handleDelete(vehicle.id)}>
                            Sil
                          </Button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </>
  );
}

export default Tables;