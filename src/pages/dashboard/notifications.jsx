import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
// TOAST ENTEGRASYONU
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import apiClient from "../../api/axiosConfig.js";
import { AddRouteModal } from "@/widgets/layout/AddRouteModal";
import { EditRouteModal } from "@/widgets/layout/EditRouteModal";

export function Notifications() {
  const [routes, setRoutes] = useState([]);

  // Modal State'leri
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setAddModalOpen(!addModalOpen);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);

  const handleOpenEditModal = (route) => {
    setCurrentRoute(route);
    setEditModalOpen(true);
  };

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
      // Hata durumunda Toast bildirimi
      toast.error("Güzergahlar yüklenirken bir sorun oluştu.");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Ekleme, silme veya güncelleme sonrası listeyi yeniden çekmek için
  const handleDataChange = (message) => {
    fetchRoutes();
    // Ekleme/Düzenleme modal'ları kendi başarı toast'larını göstersin
    // Silme işlemi için burası tetiklenecek
    if(message) {
        toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };
  


  const handleDeleteToast = (routeId, routeName) => {

    toast.warn(
      <div className="flex flex-col">
        <p className="text-sm font-bold">
          **{routeName}** güzergahını silmek istediğinize emin misiniz?
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <Button 
            size="sm"
            color="red" 
            onClick={() => confirmDelete(routeId, routeName)}
            className="text-[10px] py-1 px-2"
          >
            Evet, Sil
          </Button>
          <Button 
            size="sm"
            variant="outlined" 
            color="white" 
            onClick={() => toast.dismiss()}
            className="text-[10px] py-1 px-2"
          >
            Hayır
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };
  
  const confirmDelete = async (routeId, routeName) => {
    toast.dismiss(); // Onay Toast'ını kapat

    try {
      await apiClient.delete(`/admin/routes/${routeId}`);
      
      // Başarı Toast'ı ve ardından veriyi yenile
      handleDataChange(`${routeName} başarıyla silindi.`);

    } catch (error) {
      console.error("Güzergah silinirken hata oluştu:", error);
      toast.error("Güzergah silinirken bir hata oluştu.");
    }
  };

return (
    <>
      {/* Toast Container'ı ekledik */}
      <ToastContainer />
      
      {/* Modal bileşenleri */}
      <AddRouteModal
          open={addModalOpen}
          handleOpen={handleOpenAddModal}
          onRouteAdded={fetchRoutes} 
      />
      <EditRouteModal
          open={editModalOpen}
          handleOpen={handleCloseEditModal}
          routeToEdit={currentRoute}
          onRouteUpdated={fetchRoutes} 
      />

      {/* ANA KAPSAYICI DIV
        - mx-auto ve max-w-screen-lg kaldırıldı.
        - h-full (dikey) ve flex (varsayılan genişlik) ile alanı dolduracak.
      */}
      <div className="mt-12 mb-8 flex flex-col gap-8 h-full">
        
        {/* Kartın da "h-full" olması gerekiyor */}
        <Card className="h-full">
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
                      onClick={() => handleDeleteToast(route.id, route.routeName)}
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