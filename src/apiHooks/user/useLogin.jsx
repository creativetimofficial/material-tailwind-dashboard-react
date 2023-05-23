import api from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/login", credentials);
      if (response.status === 200) {
        // Assuming the API response includes a token
        const { token } = response.data;
        // Store the token in local storage or session storage
        localStorage.setItem("token", token);
        toast.success("Login successful");
        navigate("/dashboard/home"); // Navigate to the dashboard or desired page after successful login
      }
    } catch (error) {
      setError(error.response.data.message || "Login failed");
      toast.error(error.response.data.message || "Login failed");
    }

    setLoading(false);
  };

  return loginUser;
};

export default useLogin;
