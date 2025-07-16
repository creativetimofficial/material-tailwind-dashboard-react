  import React, { useEffect, useState } from "react";
  import {
    Typography,
    Button,
    Avatar,
    Chip,
    Dialog,
    DialogHeader,
    DialogBody,
  } from "@material-tailwind/react";
  import { Audio } from "react-loader-spinner";

  const BASE_URL = "https://api-ndolv2.nongdanonline.cc";

  export default function PostDetailDialog({ postId, open, onClose }) {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [likeUsers, setLikeUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [likeDialogOpen, setLikeDialogOpen] = useState(false); 

    const token = localStorage.getItem("token");

    const fetchPost = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin-post-feed/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        if (res.ok) {
          setPost(json);
        } else {
          alert(json.message || "Không thể lấy bài viết");
        }
      } catch (err) {
        console.error("Fetch post error:", err);
        alert("Lỗi khi lấy dữ liệu bài viết");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin-comment-post/post/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) {
          setComments(Array.isArray(json.comments) ? json.comments : []);
        }
      } catch (err) {
        console.error("Fetch comments error:", err);
      } finally {
        setCommentLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        let allUsers = [];
        let page = 1;
        let totalPages = 1;
      do {
        const res = await fetch(`${BASE_URL}/admin-users?page=${page}&limit=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        console.log(`User page ${page}:`, json);
        if (res.ok && Array.isArray(json.data)) {
          allUsers = allUsers.concat(json.data);
          totalPages = json.totalPages || 1; 
          page++;
        } else {
          console.warn("Danh sách users không hợp lệ:", json); 
          break;
        }
      } while (page <= totalPages);
      console.log(" All users loaded:", allUsers); 
      setUsers(allUsers); 
      } catch (err) {
        console.error("Fetch users error:", err);
        setUsers([])
      }
    };

    const fetchLikeUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/post-feed/${postId}/likes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && Array.isArray(json.users)) {
        setLikeUsers(json.users);
      } else {
        setLikeUsers([]);
      }
    } catch (err) {
      console.error("Fetch like users error:", err);
      setLikeUsers([]);
    }
  };

    useEffect(() => {
      if (open) {
        setPost(null);
        setComments([]);
        fetchPost();
        fetchComments();
        fetchUsers();
        setShowComments(false);
      }
    }, [postId, open]);

    const findUser = (userId) =>
      users.find((u) => u.id === userId) || null;

    const formatDateTime = (dateString) => {
      if (!dateString) return "Không rõ";
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN");
    };

    return (
      <Dialog open={open} handler={onClose} size="xl">
        <DialogHeader className="flex justify-between">
          <Typography variant="h5">Chi tiết bài viết</Typography>
          <Button size="sm" onClick={onClose}>
            Đóng
          </Button>
        </DialogHeader>

        <DialogBody className="max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Audio height="80" width="80" color="green" ariaLabel="loading" />
            </div>
          ) : !post ? (
            <Typography className="text-center">
              Không tìm thấy bài viết
            </Typography>
          ) : (
            <>
              {/* Tiêu đề */}
              <Typography variant="h4" className="font-bold mb-2 text-black-800">
                {post.title}
              </Typography>

              {/* Ngày tạo và cập nhật */}
              <div className="text-sm text-gray-600 mb-4">
                <p><b>Ngày tạo:</b> {formatDateTime(post.createdAt)}</p>
                <p><b>Cập nhật gần nhất:</b> {formatDateTime(post.updatedAt)}</p>
              </div>

              {/* Tác giả */}
              <div className="flex items-center gap-3 mb-4">
                <Typography className="font-semibold text-gray-700">Tác giả:</Typography>
                <Avatar
                  src={
                    findUser(post.authorId)?.avatar?.startsWith("http")
                      ? findUser(post.authorId).avatar
                      : `${BASE_URL}${findUser(post.authorId)?.avatar || ""}`
                  }
                  alt={findUser(post.authorId)?.fullName}
                />
                <Typography>{findUser(post.authorId)?.fullName || "Không rõ"}</Typography>
              </div>

              {/* Mô tả */}
              <Typography className="mb-3">
                <b>Mô tả:</b> {post.description}
              </Typography>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                <Typography className="font-semibold text-gray-700">Tags:</Typography>
                {post.tags?.map((tag, idx) => (
                  <Chip key={idx} value={tag} color="blue-gray" size="sm" />
                ))}
              </div>

              {/* Hình ảnh */}
              <div className="mb-2 font-semibold text-gray-700">Hình ảnh:</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {post.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${BASE_URL}${img}`}
                    alt={`img-${idx}`}
                    className="w-full h-40 object-cover rounded shadow"
                  />
                ))}
              </div>

              <div className="flex gap-3 items-center mb-4">
                <div className="flex items-center gap-2">
                  <Typography className="font-semibold">Trạng thái:</Typography>
                  <Chip
                    value={post.status ? "Hoạt động" : "Ẩn"}
                    color={post.status ? "green" : "red"}
                    size="sm"
                  />
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => {fetchLikeUsers(); setLikeDialogOpen(true)}}>
                  <Typography className="font-semibold">Lượt thích:</Typography>
                  <Chip value={post.like || 0} color="blue" size="sm" />
                </div>
              </div>

              {/* Bình luận */}
              <div className="border-t pt-4 mt-6">
                <div
                  className="cursor-pointer mb-2"
                  onClick={() => setShowComments(!showComments)}
                >
                  <Typography variant="h5" className="text-blue-800">
                    Bình luận ({comments.length + comments.reduce((total, cmt) => total + (cmt.replies?.length || 0), 0)})
                  </Typography>
                  {showComments && (
                    <>
                      {commentLoading ? (
                        <Typography>Đang tải bình luận...</Typography>
                      ) : comments.length > 0 ? (
                        comments.map((cmt) => (
                          <div key={cmt._id} className="border-b py-3 flex items-start gap-3">
                            <Avatar
                              src={
                                cmt.userId?.avatar?.startsWith("http")
                                  ? cmt.userId.avatar
                                  : `${BASE_URL}${cmt.userId?.avatar || ""}`
                              }
                              alt={cmt.userId?.fullName}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <Typography className="font-medium">
                                  {cmt.userId?.fullName || "Ẩn danh"}
                                </Typography>
                              </div>
                              <Typography className="text-gray-700">{cmt.comment}</Typography>

                              {/* Replies */}
                              {cmt.replies?.length > 0 && (
                                <div className="ml-4 mt-2 border-l-2 pl-2 border-blue-200">
                                  {cmt.replies.map((rep) => (
                                    <div key={rep._id} className="flex items-start gap-2 mt-1">
                                      <Avatar
                                        src={
                                          rep.userId?.avatar?.startsWith("http")
                                            ? rep.userId.avatar
                                            : `${BASE_URL}${rep.userId?.avatar || ""}`
                                        }
                                        alt={rep.userId?.fullName}
                                        size="xs"
                                      />
                                      <div className="flex-1">
                                        <div className="flex justify-between">
                                          <Typography className="font-semibold">
                                            {rep.userId?.fullName || "Ẩn danh"}:
                                          </Typography>
                                        </div>
                                        <Typography className="text-sm">{rep.comment}</Typography>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <Typography>Không có bình luận</Typography>
                      )}
                    </>
                  )}
                </div>
              </div>

              <Dialog open={likeDialogOpen} handler={() => setLikeDialogOpen(false)} size="sm">
                <DialogHeader className="flex justify-between">
                  <Typography variant="h5">Người đã thích</Typography>
                  <Button size="sm" onClick={() => setLikeDialogOpen(false)}>Đóng</Button>
                </DialogHeader>
                <DialogBody className="max-h-[60vh] overflow-y-auto">
                  {likeUsers.length > 0 ? (
                    likeUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 mb-2">
                        <Avatar
                          src={
                            user.avatar?.startsWith("http")
                              ? user.avatar
                              : `${BASE_URL}${user.avatar || ""}`
                          }
                          alt={user.fullName}
                        />
                        <Typography>{user.fullName}</Typography>
                      </div>
                    ))
                  ) : (
                    <Typography>Không có ai thích bài viết này.</Typography>
                  )}
                </DialogBody>
              </Dialog>
            </>
          )}
        </DialogBody>
        
      </Dialog>
    );
  }
