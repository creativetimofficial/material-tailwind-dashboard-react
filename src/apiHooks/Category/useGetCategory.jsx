import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetCategory = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getCatogery();
  }, []);

  const getCatogery = async () => {
    setloading(true);
    try {
      const { data, status } = await axios.get(
        "http://localhost:1000/category"
      );
      //   const { data, status } = await axios.get("/category");
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
