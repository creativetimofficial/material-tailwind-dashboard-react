import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { Typography, Button, Input } from '@material-tailwind/react';

const fetchAllVideosWithStats = async () => {
  const token = localStorage.getItem('token');
  let page = 1;
  let totalPages = 1;
  let allVideos = [];

  while (page <= totalPages) {
    const res = await axios.get(`${BaseUrl}/admin-video-farm?limit=100&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    totalPages = res.data.totalPages || 1;

    const videos = res.data.data || [];

    const videosWithStats = await Promise.all(
      videos.map(async (video) => {
        try {
          const [likeRes, commentRes] = await Promise.all([
            axios.get(`${BaseUrl}/video-like/${video._id}/users`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BaseUrl}/video-comment/${video._id}/comments`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

     const commentCount = Array.isArray(commentRes.data)
  ? commentRes.data.reduce(
      (total, cmt) =>
        total +
        1 +
        (Array.isArray(cmt.replies) ? cmt.replies.length : 0),
      0
    )
  : Array.isArray(commentRes.data.comments)
    ? commentRes.data.comments.reduce(
        (total, cmt) =>
          total +
          1 +
          (Array.isArray(cmt.replies) ? cmt.replies.length : 0),
        0
      )
    : commentRes.data.total ?? 0;
          return {
            ...video,
            likeCount: likeRes.data.total || 0,
            commentCount,
          };
        } catch (error) {
          return { ...video, likeCount: 0, commentCount: 0 };
        }
      })
    );

    allVideos = [...allVideos, ...videosWithStats];
    page++;
  }

  return allVideos;
};

export const ListVideo = () => {
  const navigate = useNavigate();
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetchAllVideosWithStats()
      .then((videos) => {
        setAllVideos(videos);
      })
      .catch(err => console.error("Lỗi khi tải video:", err))
      .finally(() => setLoading(false));
  }, []);

 const filteredVideos = useMemo(() => {
  const filtered = filterStatus
    ? allVideos.filter(v => v.status === filterStatus)
    : allVideos;

  const searched = filtered.filter(v =>
    v.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    v.playlistName?.toLowerCase().includes(searchText.toLowerCase())
  );

 
  return searched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}, [allVideos, filterStatus, searchText]);

  const totalPages = Math.ceil(filteredVideos.length / limit);
  const paginatedVideos = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredVideos.slice(start, start + limit);
  }, [filteredVideos, page]);


const [statusList, setStatusList] = useState([]);
const [hasFetchedAllStatuses, setHasFetchedAllStatuses] = useState(false);

const fetchAllStatuses = async () => {
  const token = localStorage.getItem('token');
  let page = 1;
  let totalPages = 1;
  const statuses = new Set();

  while (page <= totalPages) {
    const res = await axios.get(`${BaseUrl}/admin-video-farm?limit=100&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    totalPages = res.data.totalPages || 1;

    (res.data.data || []).forEach(video => {
      if (video.status) {
        statuses.add(video.status);
      }
    });

    page++;
  }

  return Array.from(statuses);
};

const handleOpenStatusFilter = async () => {
  if (!hasFetchedAllStatuses) {
    const statuses = await fetchAllStatuses();
    setStatusList(statuses);
    setHasFetchedAllStatuses(true);
  }
};


  const gotoVideoById = (id) => {
    navigate(`/dashboard/VideoFarms/VideoById/${id}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h5" color="blue-gray" className="font-semibold mb-4">
        Quản lý Video
      </Typography>

      <div className="flex justify-end mb-4 gap-2">
        <Input
          type="text"
          placeholder="Tìm kiếm video..."
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
            setPage(1);
          }}
        />
     <select
  onClick={handleOpenStatusFilter} 
  className="border rounded px-3 py-1"
  value={filterStatus}
  onChange={(e) => {
    setFilterStatus(e.target.value);
    setPage(1);
  }}
>
  <option value="">Tất cả</option>
  {statusList.map((status) => (
    <option key={status} value={status}>{status}</option>
  ))}
</select>

      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-40">
          <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" />
        </div>
      ) : paginatedVideos.length === 0 ? (
        <span className="text-gray-500">Không có video nào.</span>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="border-t">
                <th className="p-2 text-left text-xs font-semibold">Tiêu đề</th>
                <th className="p-2 text-left text-xs font-semibold">Danh sách phát</th>
                <th className="p-2 text-left text-xs font-semibold">Farm</th>
                <th className="p-2 text-left text-xs font-semibold">Ngày đăng</th>
                <th className="p-2 text-left text-xs font-semibold">Người đăng</th>
                <th className="p-2 text-left text-xs font-semibold">Email</th>
                <th className="p-2 text-left text-xs font-semibold">Like</th>
                <th className="p-2 text-left text-xs font-semibold">Bình luận</th>
                <th className="p-2 text-left text-xs font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVideos.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => gotoVideoById(item._id)}>
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.playlistName}</td>
                  <td className="p-2">{item.farmId?.name}</td>
                  <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{item.uploadedBy?.fullName}</td>
                  <td className="p-2">{item.uploadedBy?.email}</td>
                  <td className="p-2">{item.likeCount || 0}</td>
                  <td className="p-2">{item.commentCount || 0}</td>
                  <td className="p-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          size="sm"
          variant="outlined"
          disabled={page <= 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Trang trước
        </Button>
        <span>Trang {page} / {totalPages}</span>
        <Button
          size="sm"
          variant="outlined"
          disabled={page >= totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default ListVideo;
