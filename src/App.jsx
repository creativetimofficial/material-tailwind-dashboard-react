import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { SignIn, SignUp } from "./pages/auth";
import { useUserContext } from "./context/UserContext";
import SignInAdmin from "./pages/auth/admin/LoginAdmin";
function App() {
  // const { user } = useUserContext();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Toaster />
      <Routes>
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/"
          element={<Navigate to={user?._id ? "/dashboard/" : "/login"} />}
        />
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route path="/admin" element={<SignInAdmin />} />
      </Routes>
    </>
  );
}

export default App;
