import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog, DialogHeader, DialogBody, DialogFooter,
  Card, Input, Button, Typography, Spinner,
} from "@material-tailwind/react";

const BASE = "https://api-ndolv2.nongdanonline.cc/video-comment";
const token = () => localStorage.getItem("token");

const fetchComments = (videoId) =>
  axios
    .get(`${BASE}/${videoId}/comments`, {
      headers: { Authorization: `Bearer ${token()}` },
    })
    .then((r) => r.data);

const addComment = (videoId, body) =>
  axios.post(`${BASE}/${videoId}/comment`, body, {
    headers: { Authorization: `Bearer ${token()}` },
  });

const replyComment = (videoId, commentIndex, body) =>
  axios.post(`${BASE}/${videoId}/comment/${commentIndex}/reply`, body, {
    headers: { Authorization: `Bearer ${token()}` },
  });

const hideComment = (videoId, commentIndex) =>
  axios.delete(`${BASE}/${videoId}/comment/${commentIndex}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

const hideReply = (videoId, commentIndex, replyIndex) =>
  axios.delete(`${BASE}/${videoId}/comment/${commentIndex}/reply/${replyIndex}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export default function CommentVideo({ open, onClose, videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyBox, setReplyBox] = useState({ commentIndex: null, text: "" }); 
  const load = () => {
    if (!videoId) return;
    setLoading(true);
    fetchComments(videoId)
      .then(setComments)
      .catch((err) => console.error("Lỗi khi fetch comments:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (open) load();
  }, [open, videoId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Bạn chưa nhập bình luận!");
      return;
    }
    try {
      await addComment(videoId, { comment: newComment });
      setNewComment("");
      load();
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err.response?.data || err);
      alert("Không thể gửi bình luận.");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyBox.text.trim()) {
      alert("Bạn chưa nhập phản hồi!");
      return;
    }
    try {
      await replyComment(videoId, replyBox.commentIndex, { comment: replyBox.text }); 
      setReplyBox({ commentIndex: null, text: "" });
      load();
    } catch (err) {
      console.error("Lỗi khi gửi phản hồi:", err.response?.data || err);
      alert("Không thể gửi phản hồi.");
    }
  };

  const handleHideComment = async (commentIndex) => { 
    if (!window.confirm("Bạn có chắc muốn ẩn bình luận này?")) return;
    try {
      await hideComment(videoId, commentIndex);
      load();
    } catch (err) {
      console.error("Lỗi khi ẩn bình luận:", err.response?.data || err);
      alert("Không thể ẩn bình luận.");
    }
  };

  const handleHideReply = async (commentIndex, replyIndex) => { 
    if (!window.confirm("Bạn có chắc muốn ẩn phản hồi này?")) return;
    try {
      await hideReply(videoId, commentIndex, replyIndex);
      load();
    } catch (err) {
      console.error("Lỗi khi ẩn phản hồi:", err.response?.data || err);
      alert("Không thể ẩn phản hồi.");
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="lg">
      <DialogHeader>Bình luận video</DialogHeader>

      <DialogBody className="h-[70vh] overflow-y-auto">
        {/* Form nhập bình luận */}
        <Card shadow={false} className="p-4 bg-gray-50">
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              label="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" color="blue">
              Gửi
            </Button>
          </form>
        </Card>

        {/* Danh sách */}
        {loading ? (
          <div className="flex justify-center pt-8">
            <Spinner />
          </div>
        ) : comments.length === 0 ? (
          <Typography className="text-center mt-6" color="gray">
            Chưa có bình luận.
          </Typography>
        ) : (
          <ul className="mt-6 space-y-3">
            {comments.map((c, i) => (
              <li key={i} className="bg-white p-3 rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <Typography className="font-medium">
                      {c.userId?.fullName || "Ẩn danh"}
                    </Typography>
                    <Typography>{c.comment}</Typography>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => setReplyBox({ commentIndex: c.index, text: "" })} 
                    >
                      Trả lời
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      color="red"
                      onClick={() =>{console.log("Hide comment index:", i, "Comment:", c); handleHideComment(c.index)}} 
                    >
                      Ẩn
                    </Button>
                  </div>
                </div>

                {replyBox.commentIndex === c.index && ( 
                  <form onSubmit={handleReply} className="flex gap-2 mt-2">
                    <Input
                      size="sm"
                      label="Phản hồi..."
                      value={replyBox.text}
                      onChange={(e) =>
                        setReplyBox((prev) => ({ ...prev, text: e.target.value }))
                      }
                      className="flex-1"
                    />
                    <Button size="sm" type="submit" color="blue">
                      Gửi
                    </Button>
                  </form>
                )}

                {c.replies?.map((r, j) => (
                  <div
                    key={j}
                    className="ml-4 mt-2 p-2 bg-gray-100 rounded text-sm"
                  >
                    <div className="flex justify-between">
                      <span>
                        <span className="font-medium">{r.userId?.fullName || "Ẩn danh"}: </span>
                        {r.comment}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="text"
                          onClick={() => setReplyBox({ commentIndex: i, text: "" })} 
                        >
                          Trả lời
                        </Button>
                        <Button
                          size="sm"
                          variant="text"
                          color="red"
                          onClick={() => {console.log("Hide reply index (backend):", c.index, "reply index (backend):", r.index);
                            handleHideReply(c.index, r.index)}} 
                        >
                          Ẩn
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </DialogBody>

      <DialogFooter>
        <Button color="blue" onClick={onClose}>
          Đóng
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
