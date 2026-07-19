import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login
    return <Navigate to="/login" replace />;
  }

  // Check role-based permission scope
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect back to landing
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
