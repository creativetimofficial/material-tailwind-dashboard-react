import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useDeleteWorker = (getWorkers) => {
  const api = useAxios();

  const deleteWorker = async (id) => {
    try {
      const { data, status } = await api.delete(`/worker/${id}`);
      if (status === 200) {
        // updater((o) => !o);
        toast.success(data?.message);
        getWorkers();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return deleteWorker;
};

export default useDeleteWorker;
