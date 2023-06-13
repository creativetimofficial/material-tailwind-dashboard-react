import useAxios from "@/apiConfig/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetFeedback = () => {
  const api = useAxios();

  const [loading, setLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get("/review");
      if (status === 200) {
        console.log(data, "From Hook");
        setFeedbackList(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch feedback.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return { loading, feedbackList };
};

export default useGetFeedback;
