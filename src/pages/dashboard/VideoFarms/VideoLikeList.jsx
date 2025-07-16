import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';
import { Audio } from 'react-loader-spinner';

export default function VideoLikeList({ openLike, handleCloseLike, videoId }) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getLikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BaseUrl}/video-like/${videoId}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(res.data?.users || []);
    } catch (error) {
      console.error('Lỗi lấy danh sách Like:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (openLike && videoId) getLikes();
  }, [openLike, videoId]);

  if (!openLike) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={handleCloseLike}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Danh sách người đã Like</h1>
        {loading ? (
          <div className="flex justify-center">
            <Audio height="60" width="60" radius="9" color="green" ariaLabel="loading" />
          </div>
        ) : likes.length === 0 ? (
          <p className="text-gray-500">Chưa có ai Like video này.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {likes.map((user, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={
                    user.avatar
                      ? `${BaseUrl}${user.avatar}`
                      : "https://via.placeholder.com/50x50.png?text=User"
                  }
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <span className="font-medium truncate text-gray-800">{user.fullName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}