import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Audio } from "react-loader-spinner";

const API_URL = "https://api-ndolv2.nongdanonline.cc/answers";
const FILE_BASE_URL = "https://api-ndolv2.nongdanonline.cc";
let token = localStorage.getItem("token");

// Auto-refresh token
const fetchWithAuth = async (url, options = {}) => {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    const refreshToken = localStorage.getItem("refreshToken");
    const refreshRes = await fetch(
      "https://api-ndolv2.nongdanonline.cc/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();
      localStorage.setItem("token", refreshData.accessToken);
      token = refreshData.accessToken;
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      throw new Error("Vui lòng đăng nhập lại!");
    }
  }

  return res;
};

export function AnswersTable() {
  const [questionAnFarmId, setQuestionAndFarmId] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({
    farmId: "",
    questionId: "",
    selectedOptions: [],
    otherText: "",
    uploadedFiles: [],
  });
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAnswers = async () => {
    try {
      const res = await fetchWithAuth(API_URL);
      const data = await res.json();
      setAnswers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const getFarmandQuestion = async () => {
    try {
      const response = await Promise.all(
        answers.map(async (item) => {
          try {
            const resQ = await axios.get(
              `https://api-ndolv2.nongdanonline.cc/admin-questions/${item.questionId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const resF = await axios.get(
              `https://api-ndolv2.nongdanonline.cc/adminfarms/${item.farmId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return { ...item, question: resQ.data, farm: resF.data };
          } catch {
            return { ...item };
          }
        })
      );
      setQuestionAndFarmId(response);
    } catch (err) {
      setQuestionAndFarmId([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  useEffect(() => {
    if (answers.length > 0) getFarmandQuestion();
  }, [answers]);

  const openForm = (data = null) => {
    setForm({
      farmId: data?.farmId || "",
      questionId: data?.questionId || "",
      selectedOptions: data?.selectedOptions || [],
      otherText: data?.otherText || "",
      uploadedFiles: data?.uploadedFiles || [],
    });
    setEditData(data);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.farmId || !form.questionId) {
      alert("Vui lòng nhập đủ Farm ID và Question ID");
      return;
    }

    try {
      const res = await fetchWithAuth(`${API_URL}/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmId: form.farmId,
          answers: [
            {
              questionId: form.questionId,
              selectedOptions: form.selectedOptions,
              otherText: form.otherText,
              uploadedFiles: form.uploadedFiles,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Không thể lưu dữ liệu");

      setOpen(false);
      setEditData(null);
      fetchAnswers();
    } catch (err) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    try {
      const res = await fetchWithAuth(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Không thể xoá dữ liệu");
      fetchAnswers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await fetchWithAuth(`${API_URL}/upload-image`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setForm((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, result.path],
      }));
    } catch (err) {
      alert(`Upload lỗi: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const filteredData = questionAnFarmId.filter((item) => {
    const farmName = item.farm?.name?.toLowerCase() || "";
    const questionText = item.question?.text?.toLowerCase() || "";
    const selected = item.selectedOptions?.join(", ").toLowerCase() || "";

    const matchSearch =
      farmName.includes(searchText.toLowerCase()) ||
      questionText.includes(searchText.toLowerCase());

    const matchFilter =
      !filterOption || selected.includes(filterOption.toLowerCase());

    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Danh sách câu trả lời</Typography>
        <Button color="green" onClick={() => openForm()}>
          Thêm mới
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <Input
          label="Tìm kiếm câu hỏi hoặc farm"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo đáp án</label>
  <select
    value={filterOption}
    onChange={(e) => {
      setFilterOption(e.target.value);
      setCurrentPage(1);
    }}
    style={{ width: '50%' , height:'50%' }}
    className="border rounded px-3 py-2"
  >
    <option value="">Tất cả</option>
    {[...new Set(questionAnFarmId.flatMap((item) => item.selectedOptions || []))].map((opt, idx) => (
      <option key={idx} value={opt}>
        {opt}
      </option>
    ))}
  </select>
</div>



      {loading ? (
        <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" />
      ) : (
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Farm</th>
              <th className="px-4 py-3 text-left">Câu hỏi</th>
              <th className="px-4 py-3 text-left">Đáp án chọn</th>
              <th className="px-4 py-3 text-left">Khác</th>
              <th className="px-4 py-3 text-left">Tệp đính kèm</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-3">{item.farm?.name || <i className="text-gray-400">chưa có</i>}</td>
                <td className="px-4 py-3">{item.question?.text || <i className="text-gray-400">chưa có</i>}</td>
                <td className="px-4 py-3">{item.selectedOptions?.join(", ") || "—"}</td>
                <td className="px-4 py-3">{item.otherText || "—"}</td>
                <td className="px-4 py-3">
                  {item.uploadedFiles?.length > 0
                    ? item.uploadedFiles.map((file, i) => (
                        <a
                          key={i}
                          href={`${FILE_BASE_URL}${file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline block"
                        >
                          File {i + 1}
                        </a>
                      ))
                    : "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <IconButton variant="text">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </IconButton>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem onClick={() => openForm(item)}>Sửa</MenuItem>
                      <MenuItem
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        Xoá
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Trang trước
        </Button>
        <span className="text-sm font-medium">
          Trang {currentPage} / {totalPages || 1}
        </span>
        <Button
          variant="outlined"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Trang sau
        </Button>
      </div>

      {/* Dialog Form */}
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>{editData ? "Chỉnh sửa" : "Thêm mới"} câu trả lời</DialogHeader>
        <DialogBody className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Farm ID" value={form.farmId} onChange={(e) => setForm({ ...form, farmId: e.target.value })} />
          <Input label="Question ID" value={form.questionId} onChange={(e) => setForm({ ...form, questionId: e.target.value })} />
          <div className="max-w-sm">
            <Input
              label="Selected Options (cách nhau bằng dấu phẩy)"
              value={form.selectedOptions.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  selectedOptions: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>

          <Input label="Other Text" value={form.otherText} onChange={(e) => setForm({ ...form, otherText: e.target.value })} />
          <Input type="file" onChange={handleUploadImage} />
          {uploading && <span className="text-sm text-gray-500">Đang tải lên...</span>}
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" onClick={() => setOpen(false)}>Huỷ</Button>
          <Button color="blue" onClick={handleSubmit}>{editData ? "Cập nhật" : "Tạo mới"}</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AnswersTable;
