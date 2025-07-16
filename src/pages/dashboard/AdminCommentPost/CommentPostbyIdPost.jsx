import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BaseUrl } from '@/ipconfig'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Audio } from 'react-loader-spinner'
import { Typography } from '@material-tailwind/react'
export const CommentPostbyIdPost = () => {

    const [CommentByIdPost,setCommentByIdPost]=useState([])
     const [loading, setLoading] = useState(true)
    const tokenUser = localStorage.getItem('token');
    const [editCommentIndex, setEditCommentIndex] = useState(null);
    const [editComment, setEditComment] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [post, setPost] = useState("");


    const {postId}=useParams()
   const getCommentById=async()=>{
try {
    const res= await axios.get(`${BaseUrl}/admin-comment-post/post/${postId}`,
        {headers:{Authorization:`Bearer ${tokenUser}` }})
  if(res.status===200){
   setCommentByIdPost(res.data)

  }

} catch (error) {
    console.log("Lỗi nè",error)
    setLoading(false)
}
    }
const handleEditComment=async(comment,index)=>{
  // console.log(comment)
  setEditComment(comment)
  setEditCommentIndex(index);
setEditContent(comment.comment)
}

const callPost=async()=>{
try {

 const res = await axios.get(`${BaseUrl}/admin-post-feed/${postId}`, {
      headers: { Authorization: `Bearer ${tokenUser}` }
    });

if(res.status===200){
setPost(res.data)
// setTotalPages(res.data.totalPages)
 setLoading(false) 
}
} catch (error) {
    console.log("Lỗi nè",error)
    setLoading(false)
}

}

console.log(post)
    const handleUpdateComment=async()=>{
try {
    const res= await axios.put(`${BaseUrl}/admin-comment-post/${postId}/comment/${editCommentIndex}`,
       { comment: editContent },
        {headers:{Authorization:`Bearer ${tokenUser}` }})
  if(res.status===200){
setEditComment(null);
      getCommentById();
  }

} catch (error) {
    alert("Lỗi khi cập nhật bình luận");
    setLoading(false)
}
    }

   const handleDeleteComment=async(comment,index)=>{
try {
    const res= await axios.delete(`${BaseUrl}/admin-comment-post/${postId}/comment/${index}`,
       { data: { status: false },
        headers:{Authorization:`Bearer ${tokenUser}` }})
  if(res.status===200){
      getCommentById();
      alert("Xóa thành công")
  }

} catch (error) {
    alert("Lỗi khi xóa bình luận");
    setLoading(false)
}
    }


// console.log("data nè",CommentByIdPost.comments.length)

    useEffect(()=>{
getCommentById()
callPost()
    setLoading(false)

    },[])

  return (
  <div className="max-w-2xl mx-auto p-4">
     <Typography variant="h5" color="blue-gray" className="font-semibold mb-4">
            Quản lý Bình luận
          </Typography>
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      </div>
    ) : (
      <div>
        <div className="border bg-white rounded-lg shadow p-4 mb-6">
          <div className="mb-2 text-gray-700 font-semibold">
            Bài viết: <span className="font-normal">{post.title}</span>
          </div>
          <div className="mb-2 text-gray-700">
            Ngày đăng: <span className="font-medium">{CommentByIdPost.createdAt ? new Date(CommentByIdPost.createdAt).toLocaleDateString() : ""}</span>
          </div>
          <div className="mb-2 text-gray-700">
            Chỉnh sửa: <span className="font-medium">{CommentByIdPost.updatedAt ? new Date(CommentByIdPost.updatedAt).toLocaleDateString() : ""}</span>
          </div>
          {CommentByIdPost.content && (
            <div className="mt-2 text-base text-gray-800 border-t pt-2">
              {CommentByIdPost.content}
            </div>
          )}
        </div>
{editComment && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <h2 className="font-bold mb-2">Sửa bình luận</h2>
      <textarea
        className="w-full border rounded p-2 mb-4"
        value={editContent}
        onChange={e => setEditContent(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => setEditComment(null)}
        >
          Hủy
        </button>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={handleUpdateComment}
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
)}
        {CommentByIdPost && Array.isArray(CommentByIdPost.comments) && CommentByIdPost.comments.length > 0 ? (
          CommentByIdPost.comments.map((item,index) =>  {
            return(
<div
              key={index}
              className="border rounded-lg bg-gray-50 p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={
                    item.userId.avatar?.startsWith('http')
                      ? item.userId.avatar
                      : `${BaseUrl}${item.userId.avatar}`
                  }
                  alt=""
                  className="w-8 h-8 rounded-full border"
                />
                <span className="font-semibold text-gray-800">{item.userId?.fullName}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                </span>
              </div>
     <div className="ml-auto flex gap-2">
      <button
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs shadow transition"
        onClick={() => handleEditComment(item, index)}
      >
        Sửa
      </button>
      <button
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs shadow transition"
        onClick={() => handleDeleteComment(item, index)}
      >
        Xóa
      </button>
    </div>
              <div className="ml-11 text-gray-700 mb-2">{item.comment}</div>
              
              {item.replies && item.replies.length > 0 && (
                <div className="ml-11 mt-2 border-l-2 border-blue-200 pl-4">
                  {item.replies.map((rep) => (
                    <div
                      key={rep._id}
                      className="flex items-start gap-2 text-sm text-gray-700 mb-2"
                    >
                      <img
                        src={
                          rep.userId?.avatar?.startsWith('http')
                            ? rep.userId.avatar
                            : `${BaseUrl}${rep.userId?.avatar || ''}`
                        }
                        alt=""
                        className="w-6 h-6 rounded-full border"
                      />
                      <div>
                        <span className="font-semibold text-gray-700">{rep.userId?.fullName}:</span>
                        <span className="ml-1">{rep.comment}</span>
                        <span className="ml-2 text-xs text-gray-400">
                          {rep.createdAt ? new Date(rep.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            )
})
        ) : (
          <div className="text-center text-gray-500">Không có dữ liệu</div>
        )}
      </div>

      
    )}
         
  </div>
)
  
}

export default CommentPostbyIdPost

 