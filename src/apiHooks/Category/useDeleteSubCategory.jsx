import React from "react";
import { toast } from "react-hot-toast";
import useAxios from "@/apiConfig/axiosInstance";
const useDeleteSubCategory = (updater) => {
  const api = useAxios();

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
