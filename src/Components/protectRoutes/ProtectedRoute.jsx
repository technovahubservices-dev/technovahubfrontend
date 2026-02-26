import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const loginAt = Number(localStorage.getItem("adminLoginAt") || 0);
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
  const isExpired = !loginAt || Date.now() - loginAt > THREE_DAYS_MS;

  if (!token || isExpired) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoginAt");
    return <Navigate to="/adminlogin" replace />;
  }
  return children;
};

export default ProtectedRoute;
