import { BaseUrl } from '@/ipconfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export const CommentPostbyId = () => {
    const [commentDetail,setCommentDetail]=useState()
        const [loading, setLoading] = useState(true)
      const tokenUser = localStorage.getItem('token');
    const {id}=useParams()
   const getCommentById=async()=>{
try {
    const res= await axios.get(`${BaseUrl}/admin-comment-post/${id}`,
        {headers:{Authorization:`Bearer ${tokenUser}` }})
  if(res.status===200){
setCommentDetail(res.data)
  }

} catch (error) {
    console.log("Lỗi nè",error)
    setLoading(false)
}
    }
console.log("data nè",commentDetail)

    useEffect(()=>{
getCommentById()
    },[])
    setLoading(false)
  return (
    <div>


    </div>
  )
}

export default CommentPostbyId