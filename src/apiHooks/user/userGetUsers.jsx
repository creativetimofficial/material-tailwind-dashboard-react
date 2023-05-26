import useAxios from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useGetUsers = (setUsers) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data, status } = await api.get("/user");
      if (status === 200) {
        setUsers(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return { loading, fetchUsers };
};

export default useGetUsers;
