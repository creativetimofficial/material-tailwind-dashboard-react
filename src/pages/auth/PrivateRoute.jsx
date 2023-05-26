import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.role);
  return (
    <>
      {user && <Element />}
      {!user && <Navigate to="/login" replace />}
    </>
  );
};
export default PrivateRoute;
