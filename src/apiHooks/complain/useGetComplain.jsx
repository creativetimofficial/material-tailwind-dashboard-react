import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetComplain = (setComplains, admin) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const fetchComplains = async (id) => {
    const route = admin
      ? `/all-complains/${id ? id : ""}`
      : `/complain/${id ? id : ""}`;
    try {
      // const { data, status } = await api.get(`/complain/${id ? id : ""}`);
      const { data, status } = await api.get(route);
      if (status === 200) {
        console.log(data, "Complains From Hook");
        setComplains(data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchComplains };
};

export default useGetComplain;
