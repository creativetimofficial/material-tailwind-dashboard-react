import useAxios from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
const useLogin = () => {
  const { setuser } = useUserContext();
  const api = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data, status } = await api.post("/login", credentials);
      if (status === 200) {
        // Store the token in local storage or session storage
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        setuser(data?.user);
        toast.success(data?.message);
        navigate("/"); // Navigate to the dashboard or desired page after successful login
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
