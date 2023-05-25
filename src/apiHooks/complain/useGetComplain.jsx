import api from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetComplain = (setComplains) => {
  const [loading, setLoading] = useState(false);

    const fetchComplains = async (id) => {
      console.log('Fethc Complain Function is calling')
      try {
        const { data, status } = await api.get(`/complain/${id ? id : ""}`);
        console.log("API response:", data);
        if (status === 200) {
          setComplains(data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message);
        setLoading(false);
      }
    };

    

  return {  loading,fetchComplains };
};

export default useGetComplain;
