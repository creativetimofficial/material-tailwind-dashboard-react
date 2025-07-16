import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Avatar,
  Chip,
  Dialog,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import PostDetailDialog from "./PostDetail";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api-ndolv2.nongdanonline.cc";

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [filterUserId, setFilterUserId] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterSortLikes, setFilterSortLikes] = useState("");
  const [filterSortComments, setFilterSortComments] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchAllUsers  = async () => {
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
        console.log(`Trang ${page} raw json:`, json);

        if (res.ok && Array.isArray(json.data)) {
          const usersPage = json.data;
          console.log(`Trang ${page} trả về:`, usersPage);
          allUsers = allUsers.concat(usersPage);
          totalPages = json.totalPages || 1; 
          page++;
      } else {
          console.warn("Danh sách users không hợp lệ:", json);
          break;
      } 
      } while (page <= totalPages);
        setUsers(allUsers);
      } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: postsPerPage,
    });


    if (filterUserId) queryParams.append("userId", filterUserId);
    if (filterTitle) queryParams.append("title", filterTitle);
    if (filterStatus === "true") queryParams.append("status", true);
    else if (filterStatus === "false") queryParams.append("status", false);
    if (filterSortLikes) queryParams.append("sortLikes", filterSortLikes);
    if (filterSortComments) queryParams.append("sortComments", filterSortComments);
    if (filterTag) queryParams.append("tags", filterTag);

    try {
      const res = await fetch(
        `${BASE_URL}/admin-post-feed?${queryParams.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        const fetchPosts = json.data || [];
        const postsWithComments = await Promise.all(
        fetchPosts.map(async (post) => {
          try {
            const commentRes = await fetch(
              `${BASE_URL}/admin-comment-post/post/${post.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const commentJson = await commentRes.json();
            if (commentRes.ok) {
              const comments = commentJson.comments || [];
              let totalReplies = 0;
              comments.forEach((c) => {
                totalReplies += c.replies?.length || 0;
              });
              return {
                ...post,
                commentCount: comments.length + totalReplies,
              };
            } else {
              console.warn("Không lấy được comment cho post:", post.id);
              return { ...post, commentCount: 0 };
            }
          } catch (err) {
            console.error("Fetch comment error:", err);
            return { ...post, commentCount: 0 };
          }
        })
      );
        setPosts(postsWithComments);
        setTotalPages(json.totalPages || 1);
      } else {
        console.error("API lỗi:", json.message);
        alert("Không lấy được dữ liệu: " + json.message);
      }
    } catch (err) {
      console.error("Fetch posts error:", err);
      alert("Không thể lấy danh sách bài viết: " + err.message);
    }

    setLoading(false);
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchPosts();
  };

  useEffect(() => {
    fetchAllUsers();
    fetchPosts();
  }, [currentPage]);

  const findUser = (id) => users.find((u) => u.id === id);

  const handleEditClick = (post) => {
    setSelectedPost({
      ...post,
      tagsInput: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    });
    setOpenEdit(true);
  };

  const updatePost = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        title: selectedPost.title,
        description: selectedPost.description,
        status: Boolean(selectedPost.status),
        tags: (selectedPost.tagsInput || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        images: selectedPost.images,
        authorId: selectedPost.authorId,
      };


      const res = await fetch(
        `${BASE_URL}/admin-post-feed/${selectedPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (res.ok) {
        alert("Cập nhật thành công!");

        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === selectedPost.id
              ? {
                  ...p,
                  title: selectedPost.title,
                  description: selectedPost.description,
                  tags: selectedPost.tagsInput
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== ""),
                  status: selectedPost.status,
                  images: selectedPost.images,
                }
              : p
          )
        );
        setSelectedPost(null);
        setOpenEdit(false);
      } else {
        console.error("PUT lỗi:", json);
        alert(json.message || "Cập nhật thất bại");
      }
    } catch (err) {
      console.error("PUT error:", err);
      alert("Lỗi kết nối server khi cập nhật");
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xoá bài post này?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/admin-post-feed/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Xoá thành công!");
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        const json = await res.json();
        alert(json.message || "Xoá thất bại");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Không thể kết nối tới server");
    }
  };

  return (
    <div className="p-4">
  <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
    Danh sách bài post
  </Typography>

  {/* Bộ lọc */}
  <div className="flex justify-start items-center flex-wrap gap-3 mb-4">
  {/* Tiêu đề */}
  <div className="h-10">
    <Input
      label=" "
      placeholder="Tiêu đề"
      value={filterTitle}
      onChange={(e) => setFilterTitle(e.target.value)}
      className="w-[180px]"
      containerProps={{ className: "min-w-0" }}
    />
  </div>

  {/* Trạng thái */}
  <select
    className="h-10 border border-gray-300 rounded px-2 text-sm text-gray-700"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="">Tất cả trạng thái</option>
    <option value="true">Đang hoạt động</option>
    <option value="false">Đã ẩn</option>
  </select>

  {/* Sắp xếp like */}
  <select
    className="h-10 border border-gray-300 rounded px-2 text-sm text-gray-700"
    value={filterSortLikes}
    onChange={(e) => setFilterSortLikes(e.target.value)}
  >
    <option value="">Không sắp xếp</option>
    <option value="asc">Like tăng dần</option>
    <option value="desc">Like giảm dần</option>
  </select>

  {/* Nút lọc */}
  <Button
    color="blue"
    size="sm"
    className="h-10 px-4"
    onClick={handleFilter}
  >
    Tìm kiếm
  </Button>
</div>


  {/* Table */}
  {loading ? (
    <Typography>Đang tải dữ liệu...</Typography>
  ) : (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Tiêu đề</th>
            <th className="p-3 border">Mô tả</th>
            <th className="p-3 border">Tags</th>
            <th className="p-3 border">Hình</th>
            <th className="p-3 border">Tác giả</th>
            <th className="p-3 border text-center">Like</th>
            <th className="p-3 border text-center">Bình luận</th>
            <th className="p-3 border text-center">Trạng thái</th>
            <th className="p-3 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const author = findUser(post.authorId);
            return (
              <tr
                key={post.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => {
                  setSelectedPostId(post.id);
                  setIsDetailOpen(true);
                }}
              >
                <td className="p-3 border">{post.title}</td>
                <td className="p-3 border max-w-xs">
                  <p className="line-clamp-2 text-sm leading-snug break-words">
                    {post.description?.length > 50
                      ? post.description.slice(0, 50) + "..."
                      : post.description || "Không có mô tả"}
                  </p>
                </td>
                <td className="p-3 border">
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="px-2 py-1 text-xs bg-gray-200 rounded">
                        {post.tags[0]}
                      </div>
                      {post.tags.length > 1 && (
                        <span className="text-xs text-gray-500">
                          +{post.tags.length - 1}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-3 border">
                  {post.images?.length > 0 ? (
                    <img
                      src={`${BASE_URL}${post.images[0]}`}
                      alt="Hình ảnh"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Không có</span>
                  )}
                </td>
                <td className="p-3 border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{author?.fullName || "Không rõ"}</span>
                  </div>
                </td>
                <td className="p-3 border text-center">{post.like}</td>
                <td className="p-3 border text-center">{post.commentCount ?? 0}</td>
                <td className="p-3 border text-center">
                  <Chip
                    value={post.status ? "Đang hoạt động" : "Đã ẩn"}
                    color={post.status ? "green" : "red"}
                    size="sm"
                  />
                </td>
                <td className="p-3 border text-center">
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <IconButton variant="text"><EllipsisVerticalIcon className="h-5 w-5" /></IconButton>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(post);
                        }}
                      >
                        Sửa
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post.id);
                        }}
                        className="text-red-500"
                      >
                        Xoá
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            );
          })}
          {posts.length === 0 && (
            <tr>
              <td colSpan="9" className="p-3 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Dialog open={openEdit} handler={() => setOpenEdit(false)} size="md">
        <div className="p-4">
          <Typography variant="h6" className="mb-4">
            Chỉnh sửa bài viết
          </Typography>

          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tác giả
              </label>
              <Input
                value={(() => {
                  const author = users.find((u) => u.id === selectedPost?.authorId);
                  return author?.fullName || "Không rõ";
                })()}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Tiêu đề */}
            <Input
              label="Tiêu đề"
              value={selectedPost?.title || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }
            />

            {/* Mô tả */}
            <Input
              label="Mô tả"
              value={selectedPost?.description || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, description: e.target.value })
              }
            />

            {/* Tags */}
            <Input
              label="Tags (phân cách bằng dấu phẩy)"
              value={selectedPost?.tagsInput || ""}
              onChange={(e) =>
                setSelectedPost({ ...selectedPost, tagsInput: e.target.value })
              }
            />

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={selectedPost?.status ? "true" : "false"}
                onChange={(e) =>
                  setSelectedPost({
                    ...selectedPost,
                    status: e.target.value === "true",
                  })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="true">Đang hoạt động</option>
                <option value="false">Đã ẩn</option>
              </select>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-2 mt-4">
            <Button color="red" onClick={() => setOpenEdit(false)}>
              Hủy
            </Button>
            <Button
              color="green"
              onClick={() => {
                updatePost();
              }}
            >
              Lưu
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          size="sm"
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Trang trước
        </Button>
        <Typography variant="small" className="text-gray-600">
          Trang {currentPage} / {totalPages}
        </Typography>
        <Button
          size="sm"
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Trang sau
        </Button>
      </div>
    </div>
  )}

  <PostDetailDialog
  postId={selectedPostId}
  open={isDetailOpen}
  onClose={() => setIsDetailOpen(false)}
/>
</div>

  );
}

export default PostList;
