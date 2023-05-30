import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useAddWorker = (show) => {
  const api = useAxios();
  const addWorker = async (e) => {
    try {
      const { data, status } = await api.post("/new-worker", e);
      if (status === 200) {
        toast.success(data?.message);
        show((o) => !o);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return addWorker;
};

export default useAddWorker;
