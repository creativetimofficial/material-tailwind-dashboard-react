import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useAddCategory = ({ updater, setshow, setname }) => {
  const api = useAxios();
  // ==========================
  const addCategory = async (name) => {
    try {
      const { data, status } = await api.post("/category", { name });
      if (status === 200) {
        toast.success("Successfully Category Added");
        setname("");
        setshow(false);
        updater((o) => !o);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  // ======================
  return addCategory;
};

export default useAddCategory;
