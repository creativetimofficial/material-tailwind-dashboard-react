import { Route, Navigate } from "react-router-dom";
// import { useUserContext } from "../../contexts/UserContext";

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
 const user = JSON.parse(localStorage.getItem("user"));
 //  console.log(user, "User From Private Route Component");
 return (
  <>
   {1===1 && <Element />}
   {1===0 && <Navigate to="/auth/sign-in" replace />}

   {/* user?._id ? <Element /> : <Navigate to="/login" replace />; */}
  </>
 );
};
export default PrivateRoute;
