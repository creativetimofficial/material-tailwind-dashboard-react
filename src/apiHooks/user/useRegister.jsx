import api from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";

const useRegister = () => {
  const login=useLogin()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      console.log(userData);
      const {email,password} = userData
      const response = await api.post("/register", userData);
      if (response.status === 201) {
        toast.success("User registered successfully");
        // navigate("/login"); 
        login({email,password})
      }
    } catch (error) {
      setError(error.response.data.message || "Registration failed");
      toast.error(error.response.data.message || "Registration failed");
    }

    setLoading(false);
  };

  return registerUser;
};

export default useRegister;
