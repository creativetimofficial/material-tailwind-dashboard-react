import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";

const useGetWorker = () => {
  const api = useAxios();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const getWorkers = async () => {
    setloading(true);
    try {
      const { data, status } = await api.get("/worker");
      if (status === 200) {
        setdata(data);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
      setloading(false);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return { getWorkers, data, loading };
};

export default useGetWorker;
