import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetComplain = () => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [complains, setcomplains] = useState([]);

  const [pending, setpending] = useState(0);

  const fetchComplains = async (id = {}) => {
    const query = id ? `/complain/${id}` : "/complain";
    setLoading(true);
    try {
      const { data, status } = await api.post("/get-complain", id);
      if (status === 200) {
        data?.complains?.reverse();
        setcomplains(data?.complains);
        setpending(data?.pending);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchComplains, pending, complains };
};

export default useGetComplain;
