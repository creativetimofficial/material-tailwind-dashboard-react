import useAxios from "@/apiConfig/axiosInstance";
import { useEffect } from "react";
const useVerifyUser = (setuser) => {
  const api = useAxios();

  const verifyUser = async () => {
    try {
      const { data, status } = await api.get("/verify");
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
