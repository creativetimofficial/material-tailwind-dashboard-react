import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Token yoksa login sayfasına yönlendir
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
