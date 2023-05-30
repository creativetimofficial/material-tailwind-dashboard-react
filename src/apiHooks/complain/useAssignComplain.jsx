import useAxios from "@/apiConfig/axiosInstance";
import React from "react";
import { toast } from "react-hot-toast";

const useAssignComplain = (fetchComplains) => {
  const api = useAxios();
  const assignComplain = async (ids) => {
    const { _id, worker } = ids;
    if (!_id || !worker) {
      return toast.error("Please Select First");
    }
    try {
      const { data, status } = await api.post("/assign", ids);
      if (status === 200) {
        toast.success(data?.message);
        fetchComplains();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return assignComplain;
};

export default useAssignComplain;
