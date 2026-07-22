import React, { useState, useEffect, useRef } from "react";
import {
  Card, CardHeader, CardBody, Typography, Button, Chip, Tooltip
} from "@material-tailwind/react";
import {
  ExclamationTriangleIcon, ArchiveBoxXMarkIcon, EyeSlashIcon, MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import apiClient from "../../api/axiosConfig.js";
import { AddVehicleModal } from "@/widgets/layout/AddVehicleModal";
import { EditVehicleModal } from "@/widgets/layout/EditVehicleModal";
import { AssignUserModal } from "@/widgets/layout/AssignUserModal";

const toTitleCase = (str) =>
    !str ? "-" : str.toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export function Tables() {
  const [vehicles, setVehicles] = useState([]);
  const [idleVehicles, setIdleVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);

  const rowRefs = useRef({});

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleOpenAddModal = () => setAddModalOpen(!addModalOpen);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const handleOpenEditModal = (vehicle) => { setCurrentVehicle(vehicle); setEditModalOpen(true); };
  const handleCloseEditModal = () => { setEditModalOpen(false); setCurrentVehicle(null); };

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [vehicleToAssign, setVehicleToAssign] = useState(null);
  const handleOpenAssignModal = (vehicle) => { setVehicleToAssign(vehicle); setAssignModalOpen(true); };
  const handleCloseAssignModal = () => { setAssignModalOpen(false); setVehicleToAssign(null); };

  const fetchVehicles = async () => {
    try {
      const response = await apiClient.get("/admin/vehicles");
      setVehicles(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Araç listesi yüklenemedi.");
    }
  };

  const fetchIdleVehicles = async () => {
    try {
      const response = await apiClient.get("/admin/vehicles/idle-warnings?days=7");
      setIdleVehicles(response.data || []);
    } catch (error) {
      console.error("Uyarı verisi çekilemedi:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchIdleVehicles();
  }, []);

  const handleDataChange = (message) => {
    fetchVehicles();
    fetchIdleVehicles();
    if (message) toast.success(message, { position: "top-right", autoClose: 3000 });
  };

  const handleSetPassive = async (vehicle) => {
    try {
      await apiClient.patch(`/admin/vehicles/${vehicle.id}/set-active`, { isActive: false });
      toast.info(`${vehicle.licensePlate} pasife alındı.`);
      setIdleVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      fetchVehicles();
    } catch {
      toast.error("İşlem başarısız.");
    }
  };

  const handleIgnoreWarning = (vehicleId) => {
    setIdleVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    toast.success("Uyarı listeden kaldırıldı.", { autoClose: 1000 });
  };

  const unassignUser = async (vehicle) => {
    if (!vehicle.appUserId) {
      toast.info("Bu araçta zaten atanmış kullanıcı yok.");
      return;
    }
    try {
      await apiClient.patch(`/admin/vehicles/${vehicle.id}/assign-user`, { appUserId: null });
      handleDataChange(`${vehicle.licensePlate} aracından kullanıcı ataması kaldırıldı.`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Atama kaldırılamadı.");
    }
  };

  const handleDeleteToast = (id, plaka) => {
    toast.warn(
        <div className="flex flex-col">
          <p className="text-sm font-bold">{plaka} silinsin mi?</p>
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" color="red" onClick={() => confirmDelete(id, plaka)} className="py-1 px-2">Evet</Button>
            <Button size="sm" variant="text" color="white" onClick={() => toast.dismiss()} className="py-1 px-2">Hayır</Button>
          </div>
        </div>,
        { position: "top-center", autoClose: false, closeOnClick: false }
    );
  };

  const confirmDelete = async (id, plaka) => {
    toast.dismiss();
    try {
      await apiClient.delete(`/admin/vehicles/${id}`);
      handleDataChange(`${plaka} silindi.`);
    } catch {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const normalizePlate = (plate) => (plate || "").replace(/\s/g, "").toUpperCase();

  const handleSearch = () => {
    const query = normalizePlate(searchQuery);
    if (!query) return;

    const found = vehicles.find(v => normalizePlate(v.licensePlate).includes(query));
    if (found) {
      setHighlightedId(found.id);
      setTimeout(() => {
        const el = rowRefs.current[found.id];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      setTimeout(() => setHighlightedId(null), 3000);
    } else {
      toast.error(`"${searchQuery}" plakalı araç bulunamadı.`, { autoClose: 2000 });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
      <>
        <ToastContainer />

        <AddVehicleModal
            open={addModalOpen}
            handleOpen={handleOpenAddModal}
            onVehicleAdded={() => handleDataChange()}
        />
        <EditVehicleModal
            open={editModalOpen}
            handleOpen={handleCloseEditModal}
            onVehicleUpdated={() => handleDataChange()}
            vehicleToEdit={currentVehicle}
        />
        <AssignUserModal
            open={assignModalOpen}
            handleOpen={handleCloseAssignModal}
            vehicle={vehicleToAssign}
            onAssigned={() => handleDataChange()}
        />

        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex justify-between items-center">
              <Typography variant="h6" color="white">Araç Listesi</Typography>
              <div className="flex items-center gap-3">
                {/* PLAKA ARAMA */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value.toUpperCase());
                        setHighlightedId(null);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Plaka ara..."
                      className="pl-8 pr-7 py-1.5 text-sm rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-colors w-44 font-mono"
                  />
                  {searchQuery && (
                      <button
                          onClick={() => { setSearchQuery(""); setHighlightedId(null); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs font-bold leading-none"
                      >
                        ✕
                      </button>
                  )}
                </div>
                <Button
                    size="sm" color="white" variant="text"
                    className="flex items-center gap-2 border border-white/20 hover:bg-white/10"
                    onClick={handleSearch}
                >
                  Ara
                </Button>
                <Button
                    size="sm" color="white" variant="text"
                    className="flex items-center gap-2 border border-white/20 hover:bg-white/10"
                    onClick={handleOpenAddModal}
                >
                  + Yeni Ekle
                </Button>
              </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[860px] table-auto">
                <thead>
                <tr>
                  {["Plaka", "Kullanıcı Adı", "Telefon", "Durum", "İşlem"].map((el) => (
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
                {vehicles.map((vehicle, key) => {
                  const isHighlighted = vehicle.id === highlightedId;
                  const rowClass = `py-3 px-5 ${key === vehicles.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  const displayName = vehicle.userFullName && vehicle.userFullName !== "Atanmadı"
                      ? toTitleCase(vehicle.userFullName)
                      : vehicle.driverName && vehicle.driverName !== "Atanmadı"
                          ? toTitleCase(vehicle.driverName)
                          : null;

                  return (
                      <tr
                          key={vehicle.id}
                          ref={el => rowRefs.current[vehicle.id] = el}
                          className={`transition-colors duration-300 ${
                              isHighlighted ? "bg-blue-gray-50" : "hover:bg-blue-gray-50/50"
                          }`}
                      >
                        <td className={rowClass}>
                          <div className="flex items-center gap-2">
                            {/* Subtle gösterge: sadece bulununca küçük nokta */}
                            {isHighlighted && (
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-gray-500 flex-shrink-0" />
                            )}
                            <Typography className="text-sm font-semibold text-blue-gray-600">
                              {vehicle.licensePlate}
                            </Typography>
                          </div>
                        </td>
                        <td className={rowClass}>
                          {displayName ? (
                              <Typography className="text-xs font-normal text-blue-gray-700">
                                {displayName}
                              </Typography>
                          ) : (
                              <Typography className="text-xs font-normal text-blue-gray-300 italic">
                                Atanmadı
                              </Typography>
                          )}
                        </td>
                        <td className={rowClass}>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {vehicle.phoneNumber || "-"}
                          </Typography>
                        </td>
                        <td className={rowClass}>
                          <Chip
                              variant="ghost" size="sm"
                              value={vehicle.isActive ? "Aktif" : "Pasif"}
                              color={vehicle.isActive ? "green" : "blue-gray"}
                              className="w-max font-bold"
                          />
                        </td>
                        <td className={`${rowClass} text-right`}>
                          <div className="flex justify-end items-center gap-1 flex-wrap">
                            <Button size="sm" variant="text" color="blue" onClick={() => handleOpenEditModal(vehicle)}>
                              Düzenle
                            </Button>
                            <Button size="sm" variant="text" color="green" onClick={() => handleOpenAssignModal(vehicle)}>
                              Kullanıcı Ata
                            </Button>
                            <Button
                                size="sm" variant="text" color="amber"
                                onClick={() => unassignUser(vehicle)}
                                disabled={!vehicle.appUserId}
                            >
                              Kaldır
                            </Button>
                            <Button size="sm" variant="text" color="red" onClick={() => handleDeleteToast(vehicle.id, vehicle.licensePlate)}>
                              Sil
                            </Button>
                          </div>
                        </td>
                      </tr>
                  );
                })}
                {vehicles.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-blue-gray-400">
                        Kayıtlı araç bulunamadı.
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </CardBody>
          </Card>

          {idleVehicles.length > 0 && (
              <Card>
                <CardHeader variant="gradient" color="gray" className="mb-4 p-6 flex items-center gap-4">
                  <ExclamationTriangleIcon className="h-6 w-6 text-white opacity-80" />
                  <div>
                    <Typography variant="h6" color="white">Hareketsiz Araçlar</Typography>
                    <Typography variant="small" color="white" className="opacity-70 font-normal">
                      Son 7 gündür işlem görmeyen araçlar.
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                    <tr>
                      {["Plaka", "Kullanıcı Adı", "Telefon", "Aksiyon"].map((el) => (
                          <th
                              key={el}
                              className={`border-b border-blue-gray-50 py-3 px-5 text-left ${el === "Aksiyon" ? "text-right" : ""}`}
                          >
                            <Typography variant="small" className="font-bold uppercase text-blue-gray-400">
                              {el}
                            </Typography>
                          </th>
                      ))}
                    </tr>
                    </thead>
                    <tbody>
                    {idleVehicles.map((vehicle, key) => {
                      const rowClass = `py-3 px-5 ${key === idleVehicles.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                      const displayName = vehicle.userFullName && vehicle.userFullName !== "Atanmadı"
                          ? toTitleCase(vehicle.userFullName)
                          : vehicle.driverName && vehicle.driverName !== "Atanmadı"
                              ? toTitleCase(vehicle.driverName)
                              : null;

                      return (
                          <tr key={`idle-${vehicle.id}`} className="hover:bg-blue-gray-50/50 transition-colors">
                            <td className={rowClass}>
                              <Typography className="text-sm font-semibold text-blue-gray-600">
                                {vehicle.licensePlate}
                              </Typography>
                            </td>
                            <td className={rowClass}>
                              {displayName ? (
                                  <Typography className="text-xs font-normal text-blue-gray-700">{displayName}</Typography>
                              ) : (
                                  <Typography className="text-xs font-normal text-blue-gray-300 italic">Atanmadı</Typography>
                              )}
                            </td>
                            <td className={rowClass}>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {vehicle.phoneNumber || "-"}
                              </Typography>
                            </td>
                            <td className={`${rowClass} text-right`}>
                              <div className="flex justify-end items-center gap-2">
                                <Tooltip content="Aracı Pasife Al">
                                  <Button size="sm" color="red" variant="text" className="flex items-center gap-2" onClick={() => handleSetPassive(vehicle)}>
                                    <ArchiveBoxXMarkIcon className="h-4 w-4" /> Pasife Al
                                  </Button>
                                </Tooltip>
                                <Tooltip content="Uyarıyı Listeden Kaldır">
                                  <Button size="sm" variant="text" color="blue-gray" className="flex items-center gap-2" onClick={() => handleIgnoreWarning(vehicle.id)}>
                                    <EyeSlashIcon className="h-4 w-4" /> Gizle
                                  </Button>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
          )}
        </div>
      </>
  );
}

export default Tables;