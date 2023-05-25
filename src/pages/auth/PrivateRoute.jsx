import { Route, Navigate } from "react-router-dom";
// import { useUserContext } from "../../contexts/UserContext";

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user?._id && <Element />}
      {!user?._id && <Navigate to="/auth/sign-in" replace />}

      {/* user?._id ? <Element /> : <Navigate to="/login" replace />; */}
    </>
  );
};
export default PrivateRoute;
const token = localStorage.getItem("user");

<Route path="/admin" element={<SignInAdmin />} />;
{
  /* <Route path="/admin/register" element={<SignUpAdmin />} /> */
}
