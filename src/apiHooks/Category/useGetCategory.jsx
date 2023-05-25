import React, { useEffect, useState } from "react";
import useAxios from "@/apiConfig/axiosInstance";
const useGetCategory = () => {
  const api = useAxios();

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const getCatogery = async () => {
    setloading(true);
    try {
      const { data, status } = await api.get("/category");
      if (status === 200) {
        setdata(data);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };
  return { getCatogery, loading, data };
};

export default useGetCategory;
