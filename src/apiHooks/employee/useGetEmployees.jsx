import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetEmployees = () => {
  const api = useAxios();

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get("/employee");
      if (status === 200) {
        setdata(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchEmployees, data };
};

export default useGetEmployees;
