import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetEmployees = (setEmployees) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const { data, status } = await api.get("/employee");
      if (status === 200) {
        setEmployees(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchEmployees };
};

export default useGetEmployees;
