import React from "react";
import api from "@/apiConfig/axiosInstance";
import { toast } from "react-hot-toast";
const useDeleteSubCategory = (updater) => {
  const deleteSubCategory = async (id, route) => {
    try {
      const { data, status } = await api.delete(`/${route}/${id}`);
      if (status === 200) {
        updater((o) => !o);
        toast.success(data?.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return deleteSubCategory;
};

export default useDeleteSubCategory;
