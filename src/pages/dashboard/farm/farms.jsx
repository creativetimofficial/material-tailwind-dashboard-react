import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Typography,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";

import FarmForm from "../user/FarmForm";
import FarmDetail from "./FarmDetail";

const BASE_URL = "https://api-ndolv2.nongdanonline.cc";
const getOpts = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export function Farms() {
  const [farms, setFarms] = useState([]);
  const [allFarms, setAllFarms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingFarmId, setDeletingFarmId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch tất cả nông trại (client lọc)
  const fetchFarms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/adminfarms`, {
        ...getOpts(),
        params: {
          limit: 10000, // lấy tất cả
        },
      });
      const farms = res.data?.data || [];
      setAllFarms(farms);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFarm = async (data) => {
    try {
      await axios.post(`${BASE_URL}/adminfarms`, data, getOpts());
      await fetchFarms();
      alert("Tạo farm thành công!");
    } catch (err) {
      alert("Lỗi thêm: " + (err.response?.data?.message || err.message));
    }
  };

  const editFarm = async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/adminfarms/${id}`, data, getOpts());
      await fetchFarms();
    } catch (err) {
      alert("Lỗi sửa: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteFarm = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/adminfarms/${id}`, getOpts());
      await fetchFarms();
    } catch (err) {
      alert("Lỗi xoá: " + (err.response?.data?.message || err.message));
    }
  };

  const changeStatus = async (id, action) => {
    const actionMap = {
      activate: "kích hoạt",
      deactivate: "khóa",
    };

    if (!window.confirm(`Bạn có chắc chắn muốn ${actionMap[action] || action} farm này không?`)) return;

    try {
      await axios.patch(`${BASE_URL}/adminfarms/${id}/${action}`, null, getOpts());
      await fetchFarms();
    } catch (err) {
      alert(`Lỗi ${actionMap[action] || action}: ` + (err.response?.data?.message || err.message));
    }
  };

  const handleOpenDetail = (id) => {
    setSelectedFarmId(id);
    setOpenDetail(true);
  };

  // ✅ Lọc client-side
  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = allFarms
      .filter((farm) => (tab === "all" || farm.status === tab))
      .filter((farm) => {
        return (
          farm.name?.toLowerCase().includes(keyword) ||
          farm.code?.toLowerCase().includes(keyword) ||
          farm.ownerInfo?.name?.toLowerCase().includes(keyword) ||
          farm.phone?.toLowerCase().includes(keyword) ||
          farm.location?.toLowerCase().includes(keyword) ||
          farm.province?.toLowerCase().includes(keyword) ||
          farm.district?.toLowerCase().includes(keyword) ||
          farm.ward?.toLowerCase().includes(keyword) ||
          farm.street?.toLowerCase().includes(keyword) ||
          String(farm.area).includes(keyword)
        );
      });
    setFarms(filtered);
    setCurrentPage(1);
  }, [search, tab, allFarms]);

  useEffect(() => {
    fetchFarms();
  }, []);

  const paginatedFarms = farms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(farms.length / itemsPerPage);

  return (
    <>
      <div className="p-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold mb-4">
          Quản lý nông trại
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            label="Tìm kiếm theo tên, mã, chủ sở hữu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-2"
          />
          <Button onClick={fetchFarms} className="w-full md:w-fit bg-black text-white">
            TẢI LẠI
          </Button>
        </div>

        <div className="mb-4">
          <Tabs value={tab}>
            <TabsHeader className="flex-nowrap overflow-x-auto whitespace-nowrap gap-2">
              <Tab value="all" onClick={() => setTab("all")}>Tất cả</Tab>
              <Tab value="pending" onClick={() => setTab("pending")}>Chờ duyệt</Tab>
              <Tab value="active" onClick={() => setTab("active")}>Đang hoạt động</Tab>
              <Tab value="inactive" onClick={() => setTab("inactive")}>Đã khoá</Tab>
            </TabsHeader>
          </Tabs>
        </div>

        {loading ? (
          <Typography className="text-indigo-500">Đang tải dữ liệu...</Typography>
        ) : error ? (
          <Typography color="red">Lỗi: {error}</Typography>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] table-auto text-base">
              <thead>
                <tr className="bg-blue-gray-50 text-blue-gray-700 text-sm">
                  <th className="px-2 py-2 font-semibold uppercase">Tên</th>
                  <th className="px-2 py-2 font-semibold uppercase">Mã</th>
                  <th className="px-2 py-2 font-semibold uppercase">Chủ sở hữu</th>
                  <th className="px-2 py-2 font-semibold uppercase">SĐT</th>
                  <th className="px-2 py-2 font-semibold uppercase">Địa chỉ</th>
                  <th className="px-2 py-2 font-semibold uppercase">Diện tích</th>
                  <th className="px-2 py-2 font-semibold uppercase">Trạng thái</th>
                  <th className="px-2 py-2 font-semibold uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFarms.map((farm) => (
                  <tr
                    key={farm._id}
                    className="border-b hover:bg-indigo-50 transition text-base cursor-pointer"
                    onClick={() => handleOpenDetail(farm._id)}
                  >
                    <td className="px-2 py-2">{farm.name}</td>
                    <td className="px-2 py-2">{farm.code}</td>
                    <td className="px-2 py-2">{farm.ownerInfo?.name || "—"}</td>
                    <td className="px-2 py-2">{farm.phone || "—"}</td>
                    <td className="px-2 py-2">{farm.location}</td>
                    <td className="px-2 py-2">{farm.area} m²</td>
                    <td className="px-2 py-2">
                      <Chip
                        value={
                          farm.status === "pending"
                            ? "Chờ duyệt"
                            : farm.status === "active"
                            ? "Đang hoạt động"
                            : "Đã khóa"
                        }
                        color={
                          farm.status === "pending"
                            ? "amber"
                            : farm.status === "inactive"
                            ? "red"
                            : "teal"
                        }
                        size="sm"
                      />
                    </td>
                    <td className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                      <Menu
                        open={openMenuId === farm._id}
                        handler={() =>
                          setOpenMenuId(openMenuId === farm._id ? null : farm._id)
                        }
                        allowHover={false}
                        placement="left-start"
                      >
                        <MenuHandler>
                          <Button
                            size="sm"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 p-2 min-w-[36px]"
                          >
                            •••
                          </Button>
                        </MenuHandler>
                        <MenuList className="z-[999] p-2 min-w-[140px]">
                          <MenuItem
                            onClick={() => {
                              setEditingFarm(farm);
                              setOpenForm(true);
                              setOpenMenuId(null);
                            }}
                          >
                            Sửa
                          </MenuItem>
                          <MenuItem
                            className="text-red-500 font-semibold"
                            onClick={() => {
                              setDeletingFarmId(farm._id);
                              setDeleteConfirmOpen(true);
                              setOpenMenuId(null);
                            }}
                          >
                            Xoá
                          </MenuItem>
                          {farm.status === "pending" && (
                            <>
                              <MenuItem onClick={() => { changeStatus(farm._id, "activate"); setOpenMenuId(null); }}>Duyệt</MenuItem>
                              <MenuItem onClick={() => { changeStatus(farm._id, "deactivate"); setOpenMenuId(null); }}>Từ chối</MenuItem>
                            </>
                          )}
                          {farm.status === "active" && (
                            <MenuItem onClick={() => { changeStatus(farm._id, "deactivate"); setOpenMenuId(null); }}>Khóa</MenuItem>
                          )}
                          {farm.status === "inactive" && (
                            <MenuItem onClick={() => { changeStatus(farm._id, "activate"); setOpenMenuId(null); }}>Mở khóa</MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4 text-sm">
                <Button
                  size="sm"
                  variant="outlined"
                  className="rounded-md px-4 py-1"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <span className={currentPage === 1 ? "text-gray-400 font-semibold" : "font-semibold"}>
                    TRANG TRƯỚC
                  </span>
                </Button>

                <Typography variant="small" className="text-black font-medium">
                  Trang {currentPage} / {totalPages}
                </Typography>

                <Button
                  size="sm"
                  variant="outlined"
                  className="rounded-md px-4 py-1"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <span className={currentPage === totalPages ? "text-gray-400 font-semibold" : "font-semibold"}>
                    TRANG SAU
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form tạo/sửa */}
      <FarmForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingFarm(null);
        }}
        initialData={editingFarm}
        onSubmit={(data) => {
          if (editingFarm) editFarm(editingFarm._id, data);
          else addFarm(data);
        }}
      />

      {/* Chi tiết nông trại */}
      <Dialog open={openDetail} size="xl" handler={setOpenDetail} dismiss={{ outsidePress: false }}>
        <DialogHeader className="justify-between">
          Chi tiết nông trại
          <IconButton variant="text" onClick={() => setOpenDetail(false)} className="ml-auto">✕</IconButton>
        </DialogHeader>
        <DialogBody className="p-4">
          <FarmDetail open={openDetail} onClose={() => setOpenDetail(false)} farmId={selectedFarmId} />
        </DialogBody>
      </Dialog>

      {/* Xác nhận xoá */}
      <Dialog open={deleteConfirmOpen} handler={setDeleteConfirmOpen} size="sm">
        <DialogHeader>Xác nhận xoá</DialogHeader>
        <DialogBody>
          Bạn có chắc chắn muốn xoá nông trại này? Hành động này không thể hoàn tác.
        </DialogBody>
        <div className="flex justify-end gap-2 p-4">
          <Button color="gray" onClick={() => setDeleteConfirmOpen(false)}>Huỷ</Button>
          <Button color="red" onClick={() => { deleteFarm(deletingFarmId); setDeleteConfirmOpen(false); }}>Xoá</Button>
        </div>
      </Dialog>
    </>
  );
}

export default Farms;
