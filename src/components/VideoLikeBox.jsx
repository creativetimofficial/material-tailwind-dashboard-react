// src/components/VideoLikeBox.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';

export default function VideoLikeBox({ videoId, refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchLikes = async () => {
    if (!videoId || videoId === ':videoId') return;
    setLoading(true);
    try {
      const res = await axios.get(`${BaseUrl}/video-like/${videoId}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const usersList = Array.isArray(res.data.data)
        ? res.data.data
        : res.data?.users || [];

      setUsers(usersList);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách like:', err);
      setError('Không thể lấy danh sách người like.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [videoId, refreshKey]);

  return (
    <div className="mt-2 px-3 py-2 bg-gray-50 rounded border border-blue-100">
      <p className="text-sm font-semibold text-gray-700">Người đã like:</p>
      {loading ? (
        <span className="text-xs italic text-gray-400">Đang tải...</span>
      ) : error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : users.length === 0 ? (
        <span className="text-xs italic text-gray-400">Chưa có ai like</span>
      ) : (
        <ul className="list-disc pl-4 text-sm text-gray-800">
          {users.map((user, idx) => (
            <li key={idx}>
              {user.fullName || user.username || 'Ẩn danh'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
