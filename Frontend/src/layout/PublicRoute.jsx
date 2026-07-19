import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();

  if (user) {
    // Redirect to appropriate admin or creator dashboard depending on role
    if (user.role === "super_admin") {
      return <Navigate to="/superadmin" replace />;
    } else {
      return <Navigate to="/creator" replace />;
    }
  }

  // If not authenticated, render the child routes (like Login)
  return <Outlet />;
};

export default PublicRoute;
