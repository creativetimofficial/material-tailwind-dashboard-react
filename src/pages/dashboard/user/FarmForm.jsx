import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const serviceOptions = [
  { label: "Bán trực tiếp", value: "direct_selling" },
  { label: "Bán thức ăn", value: "feed_selling" },
  { label: "Phối trộn thức ăn", value: "custom_feed_blending" },
  { label: "Dịch vụ sơ chế", value: "processing_service" },
  { label: "Dịch vụ lưu kho", value: "storage_service" },
  { label: "Dịch vụ vận chuyển", value: "transport_service" },
  { label: "Dịch vụ khác", value: "other_services" },
];

const featureOptions = [
  { label: "Mô hình aquaponic", value: "aquaponic_model" },
  { label: "Chứng nhận VietGAP", value: "viet_gap_cert" },
  { label: "Chứng nhận hữu cơ", value: "organic_cert" },
  { label: "Nông trại thông minh", value: "smart_farm" },
  { label: "Tự động hóa", value: "automation" },
  { label: "Sử dụng IoT", value: "iot_enabled" },
];

function FarmForm({ open, onClose, initialData, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    tags: [],
    province: "",
    district: "",
    ward: "",
    street: "",
    location: "",
    area: "",
    cultivatedArea: "",
    phone: "",
    zalo: "",
    description: "",
    services: [],
    features: [],
    ownerInfo: { name: "" },
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          ...initialData,
          tags: initialData.tags || [],
          services: initialData.services || [],
          features: initialData.features || [],
          ownerInfo: { name: initialData.ownerInfo?.name || "" },
          status: initialData.status || "pending",
        });
      } else {
        setForm({
          name: "",
          code: "",
          tags: [],
          province: "",
          district: "",
          ward: "",
          street: "",
          location: "",
          area: "",
          cultivatedArea: "",
          phone: "",
          zalo: "",
          description: "",
          services: [],
          features: [],
          ownerInfo: { name: "" },
          status: "pending",
        });
      }
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ownerInfo.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        ownerInfo: { ...prev.ownerInfo, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags,
      };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} size="xl" handler={onClose}>
      <DialogHeader>{initialData ? "Chỉnh sửa Nông trại" : "Tạo Nông trại Mới"}</DialogHeader>
      <DialogBody className="max-h-[80vh] overflow-y-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Tên nông trại" name="name" value={form.name} onChange={handleChange} />
          <Input label="Mã nông trại" name="code" value={form.code} onChange={handleChange} />
          <div>
            <label className="block mb-1 text-gray-700">Tags</label>
            <CreatableSelect
              isMulti
              value={(form.tags || []).map((t) => ({ label: t, value: t }))}
              onChange={(selected) =>
                setForm((prev) => ({
                  ...prev,
                  tags: selected.map((item) => item.value),
                }))
              }
              placeholder="Nhập tag và nhấn Enter..."
            />
          </div>
          <Input label="Tỉnh/Thành phố" name="province" value={form.province} onChange={handleChange} />
          <Input label="Quận/Huyện" name="district" value={form.district} onChange={handleChange} />
          <Input label="Phường/Xã" name="ward" value={form.ward} onChange={handleChange} />
          <Input label="Đường" name="street" value={form.street} onChange={handleChange} />
          <Input label="Vị trí tổng quát" name="location" value={form.location} onChange={handleChange} />
          <Input label="Tổng diện tích (m²)" name="area" value={form.area} onChange={handleChange} />
          <Input label="Đất canh tác (m²)" name="cultivatedArea" value={form.cultivatedArea} onChange={handleChange} />
          <Input label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Zalo" name="zalo" value={form.zalo} onChange={handleChange} />
          <Input
            label="Chủ sở hữu"
            name="ownerInfo.name"
            value={form.ownerInfo.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Dịch vụ</label>
            <Select
              isMulti
              options={serviceOptions}
              value={serviceOptions.filter((opt) => form.services.includes(opt.value))}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, services: selected.map((s) => s.value) }))
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Tính năng</label>
            <Select
              isMulti
              options={featureOptions}
              value={featureOptions.filter((opt) => form.features.includes(opt.value))}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, features: selected.map((f) => f.value) }))
              }
            />
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} disabled={loading}>
          Huỷ
        </Button>
        <Button color="blue" onClick={handleSubmit} disabled={loading}>
          {initialData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default FarmForm;
