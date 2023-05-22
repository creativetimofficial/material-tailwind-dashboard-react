import api from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetComplain = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const { data, status } = await api.get("/complain");
        console.log("API response:", data);
        if (status === 200) {
          setComplains(data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message);
        setLoading(false);
      }
    };

    fetchComplains();
  }, []);

  return { complains, loading };
};

export default useGetComplain;
