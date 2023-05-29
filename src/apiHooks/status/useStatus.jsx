import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useStatus = () => {
  const api = useAxios();

  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const { data, status } = await api.get("/status");
        if (status === 200) {
          setStatuses(data);
          setLoading(true);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to retrieve statuses");
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  return statuses;
  //   return { statuses, loading };
};

export default useStatus;
