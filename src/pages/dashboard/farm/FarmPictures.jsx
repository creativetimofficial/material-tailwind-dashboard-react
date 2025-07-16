import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";

const BASE_URL = "https://api-ndolv2.nongdanonline.cc";
const getOpts = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default function FarmPictures({ farmId }) {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingPic, setEditingPic] = useState(null);
  const [editingDes, setEditingDes] = useState("");
  const [editingFile, setEditingFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [adding, setAdding] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newDes, setNewDes] = useState("");

  useEffect(() => {
    if (!farmId) return;

    const fetchPictures = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/farm-pictures/${farmId}`, getOpts());
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setPictures(list);
      } catch (err) {
        if (err.response?.status === 404) {
          setPictures([]);
        } else {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [farmId]);

  const handleAdd = async () => {
    if (!newImage) {
      alert("Vui lòng chọn file ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);
    formData.append("description", newDes);

    try {
      await axios.post(`${BASE_URL}/farm-pictures/${farmId}`, formData, {
        ...getOpts(),
        headers: {
          ...getOpts().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Thêm ảnh thành công");
      setAdding(false);
      setNewImage(null);
      setNewDes("");

      const res = await axios.get(`${BASE_URL}/farm-pictures/${farmId}`, getOpts());
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPictures(list);
    } catch (err) {
      alert("Lỗi thêm ảnh: " + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("description", editingDes);
    if (editingFile) {
      formData.append("image", editingFile);
    }

    try {
      await axios.put(`${BASE_URL}/farm-pictures/update/${editingPic._id}`, formData, {
        ...getOpts(),
        headers: {
          ...getOpts().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await axios.get(`${BASE_URL}/farm-pictures/${farmId}`, getOpts());
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPictures(list);

      alert("Cập nhật ảnh thành công!");
      setEditingPic(null);
      setEditingFile(null);
    } catch (err) {
      alert("Lỗi cập nhật: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/farm-pictures/${id}`, getOpts());
      setPictures((prev) => prev.filter((pic) => pic._id !== id));
      alert("Xoá ảnh thành công!");
      setConfirmDelete(null);
    } catch (err) {
      alert("Lỗi xoá: " + (err.response?.data?.message || err.message));
    }
  };

  const getImgSrc = (p) => {
    if (p.avatarPath) return `${BASE_URL}${p.avatarPath}`;
    if (p.imageUrl) return `${BASE_URL}${p.imageUrl}`;
    if (p.path) return `${BASE_URL}/${p.path}`;
    if (p.fileUrl) return p.fileUrl;
    if (p.url) return p.url;
    return "";
  };

  if (loading) return <Typography>Đang tải ảnh...</Typography>;
  if (error) return <Typography color="red">Lỗi: {error}</Typography>;

  if (pictures.length === 0 && !adding)
    return (
      <>
        <Typography>Farm này chưa có ảnh nào!</Typography>
        <Button className="mt-2" color="green" onClick={() => setAdding(true)}>
          + Thêm ảnh
        </Button>
      </>
    );

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <Typography variant="h6">Ảnh của farm</Typography>
        <Button color="green" onClick={() => setAdding(true)}>
          + Thêm ảnh
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {pictures.map((pic) => (
          <div
            key={pic._id}
            className="relative group border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={getImgSrc(pic)}
              alt={pic.description}
              className="w-full h-32 object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <Typography
              variant="small"
              className="text-center py-2 text-xs bg-white"
            >
              {pic.description || "Ảnh farm"}
            </Typography>
            <div
              className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40
               opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Button
                size="sm"
                className="bg-white text-blue-600 font-semibold px-4 py-1 text-xs rounded shadow"
                onClick={() => {
                  setEditingPic(pic);
                  setEditingDes(pic.description || "");
                }}
              >
                Sửa
              </Button>
              <Button
                size="sm"
                className="bg-white text-red-600 font-semibold px-4 py-1 text-xs rounded shadow"
                onClick={() => setConfirmDelete(pic._id)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog sửa ảnh */}
      {editingPic && (
        <Dialog open={true} handler={() => setEditingPic(null)} size="sm">
          <DialogHeader>Sửa ảnh</DialogHeader>
          <DialogBody className="space-y-4">
            <Input
              label="Mô tả"
              value={editingDes}
              onChange={(e) => setEditingDes(e.target.value)}
            />
            <Input
              type="file"
              label="Chọn ảnh mới (tùy chọn)"
              onChange={(e) => setEditingFile(e.target.files[0])}
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" onClick={() => setEditingPic(null)}>
              Hủy
            </Button>
            <Button color="blue" onClick={handleUpdate}>
              Lưu
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* Dialog xác nhận xoá */}
      {confirmDelete && (
        <Dialog open={true} handler={() => setConfirmDelete(null)} size="xs">
          <DialogHeader>Xóa ảnh</DialogHeader>
          <DialogBody>
            Bạn có chắc chắn muốn xóa ảnh này? Thao tác không thể hoàn tác.
          </DialogBody>
          <DialogFooter>
            <Button variant="text" onClick={() => setConfirmDelete(null)}>
              Hủy
            </Button>
            <Button color="red" onClick={() => handleDelete(confirmDelete)}>
              Xóa
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* Dialog thêm ảnh mới */}
      {adding && (
        <Dialog open={true} handler={() => setAdding(false)} size="sm">
          <DialogHeader>Thêm ảnh mới</DialogHeader>
          <DialogBody className="space-y-4">
            <Input
              type="file"
              label="Chọn ảnh"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <Input
              label="Mô tả"
              value={newDes}
              onChange={(e) => setNewDes(e.target.value)}
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" onClick={() => setAdding(false)}>
              Hủy
            </Button>
            <Button color="green" onClick={handleAdd}>
              Thêm
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}
