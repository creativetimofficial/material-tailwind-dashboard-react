import useAxios from "@/apiConfig/axiosInstance";
import { useEffect } from "react";
import useLogout from "./useLogout";
const useVerifyUser = (user1, setuser) => {
  const api = useAxios();
  const logout = useLogout();

  const route = user1?.role === "admin" ? "/verify-admin" : "/verify";

  const verifyUser = async () => {
    try {
      // const { data, status } = await api.get(route);
      const { data, status } = await api.get("/verify");
      if (status === 200) {
        setuser(data);
      }
    } catch (e) {
      console.log(e);
      console.log("object");
      setuser();
      logout();
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
};

export default useVerifyUser;
