import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useUpdateStatus = () => {
  const api = useAxios();
  const updateStatus = async (payload) => {
    const { _id, status } = payload;
    if (!_id || !status) {
      toast.error("Please Select Status");
      return;
    }
    try {
      const { data, status } = await api.post("/update-status", payload);
      if (status === 200) {
        toast.success(data?.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return updateStatus;
};

export default useUpdateStatus;
