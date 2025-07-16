// src/components/LikeButton.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '@/ipconfig';
import { useNavigate } from 'react-router-dom';
export default function LikeButton({ videoId,onOpenLike }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
    const [videoLike,setVideoLike]=useState([])

const getLikeVideo = async()=>{
  try {
    const res= await axios.get(`${BaseUrl}/video-like/${videoId}/users`,{headers:{Authorization: `Bearer ${token}`}})
if(res.status===200){
setVideoLike(res.data)
setLoading(false)
}
  } catch (error) {
    console.log("Lỗi nè:",error)
        setLoading(false)

  }
}

  // const handleLikeToggle = async () => {
  //   if (!videoId || !token) return;
  //   setLoading(true);

  //   try {
  //     const url = liked
  //       ? `${BaseUrl}/video-like/${videoId}/unlike`
  //       : `${BaseUrl}/video-like/${videoId}/like`;

  //     await axios.post(url, {}, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setLiked(!liked);
  //   } catch (error) {
  //     console.error('Lỗi khi Like/Unlike video:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleViewLikes = () => {
    navigate(`/dashboard/video-like/${videoId}`);
  };
useEffect(()=>{
getLikeVideo()
},[])
  return (
    <div className="flex gap-2">
      {/* <button
        onClick={handleLikeToggle}
        disabled={loading}
        className={`px-3 py-1 rounded text-white text-sm font-semibold shadow ${
          liked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {loading ? '...' : liked ? 'Bỏ Like' : 'Like'}
      </button> */}

      <button
      onClick={e => onOpenLike(e, videoId)}

      className="px-3 py-1 rounded text-blue-700 bg-blue-100 hover:bg-blue-200 text-sm font-semibold shadow"
      >
      {videoLike.total} Lượt thích
      </button>
    </div>
  );
}
