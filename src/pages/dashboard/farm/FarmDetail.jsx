import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/outline";

const BASE_URL = "https://api-ndolv2.nongdanonline.cc";

const Info = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <Typography className="text-sm font-medium text-gray-800">{label}</Typography>
    <Typography className="text-sm text-blue-gray-700">
      {value !== null && value !== undefined && value !== "" ? value : "—"}
    </Typography>
  </div>
);

const mapToLabel = (arr, options) => {
  if (!arr || arr.length === 0) return "—";
  const values = typeof arr === "string" ? arr.split(",").map((v) => v.trim()) : arr;
  return values.map((v) => options.find((o) => o.value === v)?.label || v).join(", ");
};

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

export default function FarmDetail({ open, onClose, farmId }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [farm, setFarm] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const [showChanges, setShowChanges] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingAnswers, setLoadingAnswers] = useState(true);

  const getOpts = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const fetchDetail = async () => {
    if (!farmId) return;
    try {
      const res = await axios.get(`${BASE_URL}/adminfarms/${farmId}`, getOpts());
      setFarm(res.data?.data || res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setFarm(null);
    }
  };

  const fetchImages = async () => {
    try {
      const [farmRes, imageRes] = await Promise.all([
        axios.get(`${BASE_URL}/adminfarms/${farmId}`, getOpts()),
        axios.get(`${BASE_URL}/farm-pictures/${farmId}`, getOpts()),
      ]);

      const user = farmRes.data?.data?.ownerInfo;
      const farmImages = imageRes.data?.data || [];

      const avatarImage = user?.avatar
        ? [{ url: user.avatar, isAvatar: true }]
        : [];

      setImages([...avatarImage, ...farmImages]);
    } catch (err) {
      console.error("Lỗi ảnh:", err);
    }
  };

  const fetchFarmVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin-video-farm/farm/${farmId}`, getOpts());
      setVideos(res.data?.data || []);
      setVideoCount((res.data?.data || []).length);
    } catch (err) {
      console.error("Lỗi video:", err);
      setVideos([]);
      setVideoCount(0);
    }
  };

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin-questions?limit=100`, getOpts());
      setQuestions(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.error("Lỗi câu hỏi:", err);
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const fetchAnswers = async () => {
    setLoadingAnswers(true);
    try {
      const res = await axios.get(`${BASE_URL}/answers/by-farm/${farmId}`, getOpts());
      setAnswers(res.data || []);
    } catch (err) {
      console.error("Lỗi câu trả lời:", err);
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleToggleChanges = async () => {
    if (!showChanges) {
      await fetchQuestions();
      await fetchAnswers();
    }
    setShowChanges(!showChanges);
  };

  useEffect(() => {
    if (open && farmId) {
      fetchDetail();
      fetchImages();
      fetchFarmVideos();
    }
  }, [open, farmId]);

  if (!open) return null;

  return (
    <div className="p-4 bg-white rounded-md shadow-md" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <div className="max-w-6xl mx-auto space-y-6">
        {error && <Typography color="red">{error}</Typography>}

        {!farm ? (
          <Typography color="red">Không tìm thấy dữ liệu</Typography>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Info label="Chủ sở hữu" value={farm.ownerInfo?.name} />
              <Info label="Tên nông trại" value={farm.name} />
              <Info label="Mã nông trại" value={farm.code} />
              <Info label="Tags" value={(farm.tags || []).join(", ")} />
              <Info label="Trạng thái" value={
                farm.status === "pending" ? "Chờ duyệt" :
                farm.status === "active" ? "Đang hoạt động" : "Đã khóa"
              } />
              <Info label="Tỉnh/Thành phố" value={farm.province} />
              <Info label="Quận/Huyện" value={farm.district} />
              <Info label="Phường/Xã" value={farm.ward} />
              <Info label="Đường" value={farm.street} />
              <Info label="Vị trí tổng quát" value={farm.location} />
              <Info label="Tổng diện tích (m²)" value={farm.area} />
              <Info label="Đất canh tác (m²)" value={farm.cultivatedArea} />
              <Info label="Dịch vụ" value={mapToLabel(farm.services, serviceOptions)} />
              <Info label="Tính năng" value={mapToLabel(farm.features, featureOptions)} />
              <Info label="Số điện thoại" value={farm.phone} />
              <Info label="Zalo" value={farm.zalo} />
              <Info label="Số video nông trại" value={videoCount} />
            </div>

            {farm.description && (
              <div>
                <Typography variant="h6" className="mb-2 text-blue-gray-900">Mô tả</Typography>
                <Typography className="text-sm text-blue-gray-700 whitespace-pre-wrap">
                  {farm.description}
                </Typography>
              </div>
            )}
                  
                  {/* hình ảnh chó */}
            <div>
              <Typography variant="h6" className="mb-2 text-blue-gray-900">Hình ảnh</Typography>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={`${BASE_URL}${post.images[0]}`}
                        alt={img.isAvatar ? "Ảnh" : `Ảnh ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg border shadow-sm"
                      />
                      {img.isAvatar && (
                        <Typography className="text-xs text-center text-gray-600 mt-1">Ảnh</Typography>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Typography className="text-sm italic text-gray-500">Chưa có hình ảnh</Typography>
              )}
            </div>

            <div className="mt-6">
              <Typography variant="h6" className="mb-2 text-blue-gray-900">Danh sách video</Typography>
              {videos.length > 0 ? (
                <div className="border border-gray-200 rounded-md max-h-[400px] overflow-y-auto">
                  <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="border px-3 py-2">#</th>
                        <th className="border px-3 py-2">Tiêu đề</th>
                        <th className="border px-3 py-2">Người đăng</th>
                        <th className="border px-3 py-2">Ngày đăng</th>
                        <th className="border px-3 py-2">Trạng thái</th>
                        <th className="border px-3 py-2">Xem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((video, idx) => (
                        <tr key={video._id || idx} className="hover:bg-gray-50">
                          <td className="border px-3 py-2">{idx + 1}</td>
                          <td className="border px-3 py-2">{video.title}</td>
                          <td className="border px-3 py-2">{video.uploadedBy?.fullName || video.uploadedBy?.name || "—"}</td>
                          <td className="border px-3 py-2">{new Date(video.createdAt).toLocaleDateString()}</td>
                          <td className="border px-3 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${video.status === "active" ? "text-green-700 bg-green-100"
                              : video.status === "pending" ? "text-yellow-700 bg-yellow-100"
                              : video.status === "deleted" ? "text-red-700 bg-red-100"
                              : "text-gray-700 bg-gray-100"}`}>
                            {video.status === "uploaded"
                              ? "uploaded"
                              : video.status === "pending"
                              ? "pending"
                              : video.status === "deleted"
                              ? "deleted"
                              : video.status === "failed"
                              ? "failed"
                              : "lổi video"}
                          </span>
                        </td>

                          <td className="border px-3 py-2">
                            <Button
                              variant="text"
                              size="sm"
                              color="blue"
                              onClick={() => setSelectedVideo(video)}
                              className="flex items-center gap-1"
                            >
                              <PlayIcon className="h-4 w-4" />
                              Xem
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Typography className="text-sm italic text-gray-500">Chưa có video nào</Typography>
              )}
            </div>

<Dialog open={!!selectedVideo} handler={() => setSelectedVideo(null)} size="lg">
  <DialogHeader>{selectedVideo?.title || "Xem video"}</DialogHeader>

  <DialogBody divider className="flex justify-center">
  {selectedVideo ? (() => {
    const videoSrc = selectedVideo.localFilePath?.startsWith("http")
      ? selectedVideo.localFilePath
      : selectedVideo.localFilePath
      ? `${BASE_URL}${selectedVideo.localFilePath}`
      : selectedVideo.youtubeLink?.endsWith(".mp4")
      ? selectedVideo.youtubeLink
      : null;

    if (videoSrc) {
      return (
        <video
          controls
          className="max-h-[70vh] w-full rounded shadow"
        >
          <source src={videoSrc} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ phát video.
        </video>
      );
    }

    if (selectedVideo.youtubeLink) {
      const youtubeId = selectedVideo.youtubeLink.match(/(?:v=|\/embed\/|\.be\/)([^\s&?]+)/)?.[1];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-[360px] rounded shadow w-full"
        ></iframe>
      );
    }

      return <Typography className="text-red-500">Không tìm thấy video.</Typography>;
  })() : (
    <Typography className="text-red-500">Không tìm thấy video.</Typography>
  )}
</DialogBody>


  <DialogFooter>
    <Button color="blue" onClick={() => setSelectedVideo(null)}>
      Đóng
    </Button>
  </DialogFooter>
</Dialog>



            <div className="mt-6">
              <Button onClick={handleToggleChanges} color="blue" variant="outlined" size="sm">
                Xem câu hỏi và trả lời
              </Button>
            </div>

            <Dialog open={showChanges} handler={handleToggleChanges} size="lg">
              <DialogHeader>Danh sách câu hỏi và câu trả lời</DialogHeader>
              <DialogBody className="space-y-4 max-h-[70vh] overflow-y-auto">
                {loadingQuestions || loadingAnswers ? (
                  <Typography className="text-sm text-blue-500">Đang tải dữ liệu...</Typography>
                ) : questions.length === 0 ? (
                  <Typography className="text-sm text-gray-500 italic">Không có câu hỏi nào.</Typography>
                ) : (
                  questions.map((q, idx) => {
                    const match = answers.find((a) => a.question?._id === q._id);
                    const ans = match?.answer;
                    return (
                      <div key={q._id} className="border p-3 rounded-lg bg-gray-50">
                        <Typography className="text-sm font-semibold text-gray-800">
                          {idx + 1}. {q.text}
                        </Typography>
                        {ans ? (
                          <div className="mt-1 space-y-1 text-sm text-blue-gray-700">
                            {ans.selectedOptions?.length > 0 && <div>Chọn: {ans.selectedOptions.join(", ")}</div>}
                            {ans.otherText && <div>Khác: {ans.otherText}</div>}
                            {ans.uploadedFiles?.length > 0 && (
                              <div className="space-y-1">
                                {ans.uploadedFiles.map((f, i) => (
                                  <a key={i} href={f} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block">
                                    File {i + 1}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Typography className="text-sm text-red-500 italic mt-1">
                            Chưa có câu trả lời
                          </Typography>
                        )}
                      </div>
                    );
                  })
                )}
              </DialogBody>
              <DialogFooter>
                <Button color="blue" onClick={handleToggleChanges}>Đóng</Button>
              </DialogFooter>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
