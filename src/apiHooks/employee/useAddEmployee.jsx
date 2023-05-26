import React from "react";
import { toast } from "react-hot-toast";
import useAxios from "@/apiConfig/axiosInstance";
const useAddEmployee = (setupdater, show) => {
  const api = useAxios();
  const addEmployee = async (e) => {
    try {
      const { data, status } = await api.post("/employee", e);
      if (status === 200) {
        console.log(data);
        toast.success(data?.message);
        show(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return addEmployee;
};

export default useAddEmployee;
