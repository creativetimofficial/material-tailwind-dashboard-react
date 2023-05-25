import { useUserContext } from "@/context/UserContext";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
  // const { user } = useUserContext();

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user && <Element />}
      {!user && <Navigate to="/login" replace />}

      {/* user?._id ? <Element /> : <Navigate to="/login" replace />; */}
    </>
  );
};
export default PrivateRoute;
