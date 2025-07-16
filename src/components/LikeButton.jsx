// src/components/LikeButton.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';
import { useNavigate } from 'react-router-dom';

export default function LikeButton({ videoId }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLikeToggle = async () => {
    if (!videoId || !token) return;
    setLoading(true);

    try {
      if (liked) {
        // ✅ GỌI API UNLIKE CHUẨN BE
        await axios.post(
          `${BaseUrl}/video-like/${videoId}/unlike`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // ✅ GỌI API LIKE CHUẨN BE
        await axios.post(
          `${BaseUrl}/video-like/${videoId}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Toggle trạng thái
      setLiked(!liked);
    } catch (error) {
      console.error('Lỗi khi Like/Unlike video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewLikes = () => {
    // Điều hướng đến trang hiển thị danh sách users đã Like
    navigate(`/dashboard/video-like/${videoId}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleLikeToggle}
        disabled={loading}
        className={`px-3 py-1 rounded text-white text-sm font-semibold shadow ${
          liked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {loading ? '...' : liked ? 'Bỏ Like' : 'Like'}
      </button>

      <button
        onClick={handleViewLikes}
        className="px-3 py-1 rounded text-blue-700 bg-blue-100 hover:bg-blue-200 text-sm font-semibold shadow"
      >
        👥 Xem Like
      </button>
    </div>
  );
}
