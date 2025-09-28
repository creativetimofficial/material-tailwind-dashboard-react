import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import apiClient from "../../api/axiosConfig.js";
import { AddRouteModal } from "@/widgets/layout/AddRouteModal";
import { EditRouteModal } from "@/widgets/layout/EditRouteModal"; // 1. Edit modal'ı import et

export function Notifications() {
  const [routes, setRoutes] = useState([]);

  // "Ekle" modalı için state'ler
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setAddModalOpen(!addModalOpen);

  // 2. "Düzenle" modalı için yeni state'ler
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null); // Düzenlenecek güzergahı tutar

  // Düzenleme modal'ını açan fonksiyon
  const handleOpenEditModal = (route) => {
    setCurrentRoute(route);
    setEditModalOpen(true);
  };

  // Düzenleme modal'ını kapatan fonksiyon
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentRoute(null);
  };

  // Güzergah listesini API'den çeken ana fonksiyon
  const fetchRoutes = async () => {
    try {
      const response = await apiClient.get("/admin/routes");
      setRoutes(response.data);
    } catch (error) {
      console.error("Güzergahları çekerken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Ekleme, silme veya güncelleme sonrası listeyi yeniden çekmek için
  const handleDataChange = () => {
    fetchRoutes();
  };

  const handleDelete = async (routeId) => {
    if (window.confirm("Bu güzergahı silmek istediğinizden emin misiniz?")) {
      try {
        await apiClient.delete(`/admin/routes/${routeId}`);
        handleDataChange(); // Silme sonrası listeyi yenile
      } catch (error) {
        console.error("Güzergah silinirken hata oluştu:", error);
      }
    }
  };

  return (
      <>
        <AddRouteModal
            open={addModalOpen}
            handleOpen={handleOpenAddModal}
            onRouteAdded={handleDataChange}
        />

        {/* 3. Yeni düzenleme modalını sayfaya ekle */}
        <EditRouteModal
            open={editModalOpen}
            handleOpen={handleCloseEditModal}
            routeToEdit={currentRoute}
            onRouteUpdated={handleDataChange}
        />

        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
          <Card>
            <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 p-6 flex justify-between items-center"
            >
              <Typography variant="h6" color="white">
                Güzergahlar
              </Typography>
              <Button
                  size="sm"
                  className="bg-green-700 text-white hover:bg-green-800"
                  onClick={handleOpenAddModal}
              >
                Güzergah Ekle
              </Button>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[400px] table-auto">
                <thead>
                <tr>
                  {["Güzergah", "İşlem"].map((el) => (
                      <th key={el} className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "İşlem" ? "text-right" : ""}`}>
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {routes.map((route) => (
                    <tr key={route.id}>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {route.routeName}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50 text-right space-x-1">
                        {/* 4. Düzenle butonunun onClick olayını güncelle */}
                        <Button
                            size="sm"
                            variant="text"
                            color="blue"
                            onClick={() => handleOpenEditModal(route)}
                        >
                          Düzenle
                        </Button>
                        <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => handleDelete(route.id)}
                        >
                          Sil
                        </Button>
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

export default Notifications;