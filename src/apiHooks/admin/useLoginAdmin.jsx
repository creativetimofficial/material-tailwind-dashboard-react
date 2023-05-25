import useAxios from "@/apiConfig/axiosInstance";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
const useLoginAdmin = () => {
  const { setuser } = useUserContext();
  const api = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginAdmin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data, status } = await api.post("/login-admin", credentials);
      if (status === 200) {
        // Store the token in local storage or session storage
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
        setuser(data?.user);
        toast.success(data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Login failed");
      // toast.error(error?.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return loginAdmin;
};

export default useLoginAdmin;
