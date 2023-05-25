import useAxios from "@/apiConfig/axiosInstance";
import { useEffect } from "react";
const useVerifyUser = (user1, setuser) => {
  const api = useAxios();
  // const user = JSON.parse(localStorage.getItem("user"));

  const route = user1?.role === "admin" ? "/verify-admin" : "/verify";

  const verifyUser = async () => {
    try {
      const { data, status } = await api.get(route);
      if (status === 200) {
        setuser(data);
      }
    } catch (e) {
      console.log(e);
      setuser();
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
};

export default useVerifyUser;
