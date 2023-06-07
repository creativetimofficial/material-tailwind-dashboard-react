import useAxios from "../../apiConfig/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useGetComplainee = (userId) => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [complainee, setComplainee] = useState([]);

  const fetchComplainee = async () => {
    try {
      const query = { userId };
      const { data, status } = await api.post("/user", query);
      if (status === 200) {
        setComplainee(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchComplainee();
    }
  }, [userId]);

  return { loading, complainee };
};

export default useGetComplainee;
