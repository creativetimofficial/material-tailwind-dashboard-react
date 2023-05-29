import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetComplain = (setComplains, admin) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [pending, setpending] = useState(0);

  const fetchComplains = async (id) => {
    const route = admin
      ? `/all-complains/${id ? id : ""}`
      : `/complain/${id ? id : ""}`;

    try {
      // const { data, status } = await api.get(`/complain/${id ? id : ""}`);
      const { data, status } = await api.get(route);
      if (status === 200) {
        setComplains(data?.complains);
        setpending(data?.pending);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchComplains, pending };
};

export default useGetComplain;
