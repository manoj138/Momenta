import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    // Unauthenticated -> Redirect to Home Page
    return <Navigate to="/" replace />;
  }

  // Normalize roles check (e.g. superadmin or super_admin)
  const normalizedUserRole = user.role === "super_admin" ? "superadmin" : user.role;
  const isAuthorized = allowedRoles.length === 0 || 
                       allowedRoles.includes(normalizedUserRole) || 
                       allowedRoles.includes(user.role);

  if (!isAuthorized) {
    // 403 Access Denied Screen
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 animate-bounce">
          <ShieldAlert size={36} />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">403 - Access Denied</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
          You do not have administrative permissions to view this area. Your current role is <span className="text-brand-400 font-bold uppercase">{user.role}</span>.
        </p>
        <Link to={normalizedUserRole === "superadmin" ? "/superadmin" : "/creator"}>
          <Button variant="primary" className="flex items-center gap-2 cursor-pointer text-xs">
            <ArrowLeft size={16} />
            <span>Return to Your Workspace</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
