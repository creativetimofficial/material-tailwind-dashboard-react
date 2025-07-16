import React, {useEffect} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import VideoFarmById from "./pages/dashboard/VideoFarms/VideoById";
import VideoLikeList from "./pages/dashboard/VideoFarms/VideoLikeList";
import PostDetail from "./pages/dashboard/post/PostDetail";
import CommentPostbyId from "./pages/dashboard/AdminCommentPost/CommentPostbyId";
import CommentPostbyIdPost from "./pages/dashboard/AdminCommentPost/CommentPostbyIdPost";
import CommentPostByIdUser from "./pages/dashboard/AdminCommentPost/CommentPostByIdUser";
import FarmDetail from "./pages/dashboard/farm/FarmDetail";
import { Farms } from "./pages/dashboard/farm/farms";
import UserDetail from "./pages/dashboard/user/UserDetail";
import VideoById from "./pages/dashboard/VideoFarms/VideoById";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/sign-in");
    }

    const handleUnload = () => {
      if (performance.getEntriesByType("navigation")[0].type !== "reload") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("apiBaseUrl");
    }
    };

    window.addEventListener("beforeunload", handleUnload);


    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    }
  }, [navigate]);

  return (
 <Routes>
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="VideoFarmById/:farmId" element={<VideoFarmById />} />
        <Route path="video-like/:videoId" element={<VideoLikeList />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="CommentPostbyId/:id" element={<CommentPostbyId />} />
        <Route path="CommentPostbyIdPost/:postId" element={<CommentPostbyIdPost />} />
        <Route path="CommentPostByIdUser/:id" element={<CommentPostByIdUser />} />
        <Route path="VideoFarms/VideoById/:id" element={<VideoById />} />
        <Route path="users/:id" element={<UserDetail />} />
        {/* <Route path="/dashboard/users/:id" element={<UserDetail />} /> */}
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/admin/Farms" element={<Farms />} />
      <Route path="/admin/farms/:id" element={<FarmDetail />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />

    </Routes>
  );
}

 

  

 
export default App;