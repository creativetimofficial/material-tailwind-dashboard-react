import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";
import useAxios from "@/apiConfig/axiosInstance";

const useRegisterAdmin = () => {
  const api = useAxios();

  const login = useLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerAdmin = async (adminData) => {
    setLoading(true);
    setError(null);

    try {
      const { email, password } = adminData;
      const response = await api.post("/register-admin", adminData);
      if (response.status === 201) {
        toast.success("Admin registered successfully");
        login({ email, password });
      }
    } catch (error) {
      setError(error.response.data.message || "Registration failed");
      toast.error(error.response.data.message || "Registration failed");
    }

    setLoading(false);
  };

  return registerAdmin;
};

export default useRegisterAdmin;
