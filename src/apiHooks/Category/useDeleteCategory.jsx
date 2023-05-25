import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useDeleteCategory = ({ updater }) => {
  const api = useAxios();

  const deleteCategory = async (id, route) => {
    console.log(id);

    try {
      const { data, status } = await api.delete(`/${route}/${id}`);
      if (status === 200) {
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
