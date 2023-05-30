import { useState } from "react";
import { toast } from "react-hot-toast";
import useLogin from "./useLogin";
import useAxios from "@/apiConfig/axiosInstance";

const useRegister = (show) => {
  const api = useAxios();

  const login = useLogin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData, signin) => {
    setLoading(true);
    setError(null);

    try {
      const { phoneNumber, password } = userData;
      const response = await api.post("/new-register", userData);
      if (response.status === 200) {
        toast.success("Registered successfully");
        if (signin) {
          return login({ phoneNumber, password });
        }
        if (show) {
          return show((o) => !o);
        }
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  return registerUser;
};

export default useRegister;
