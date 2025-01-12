// src/pages/NotFound.jsx
import { useAuth } from "@/hooks/Auth";
import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  const {account} = useAuth()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to={account ? "/dashboard/home" : "/"} className="text-blue-500">Go to Home</Link>
    </div>
  );
}

export default NotFound;