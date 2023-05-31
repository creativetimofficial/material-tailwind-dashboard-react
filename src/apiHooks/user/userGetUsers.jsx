import useAxios from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useGetUsers = () => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [users, setusers] = useState([]);

  const fetchUsers = async (query) => {
    try {
      const { data, status } = await api.post("/get-user", query);
      if (status === 200) {
        setusers(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchUsers, users };
};

export default useGetUsers;
