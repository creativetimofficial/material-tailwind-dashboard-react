import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "@/apiConfig/axiosInstance";
const useGetCategory = () => {
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
