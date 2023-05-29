import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
  // const { setuser } = useUserContext();
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // setuser();
    nav("/login");
  };
  return logout;
};

export default useLogout;
