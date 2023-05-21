import api from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useDeleteCategory = ({ updater }) => {
  const deleteCategory = async (id, route) => {
    console.log(id);

    try {
      const { data, status } = await api.delete(`/${route}/${id}`);
      if (status === 200) {
        console.log(data);
        toast.success("Successfully Deleted Category");
        updater((o) => !o);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return deleteCategory;
};

export default useDeleteCategory;
