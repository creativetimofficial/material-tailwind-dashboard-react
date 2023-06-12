import useAxios from "@/apiConfig/axiosInstance";
import axios from "axios";
import React, { useState } from "react";

const useSearchUser = () => {
  const api = useAxios();
  const [users, setusers] = useState([]);

  const searchUser = async (search) => {
    try {
      const { data, status } = await api.get(`/users/${search}`);
      if (status === 200) {
        // console.log(data);
        setusers(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { searchUser, users };
};

export default useSearchUser;
