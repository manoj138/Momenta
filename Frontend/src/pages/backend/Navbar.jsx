import React from "react";
import { User, Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../../components/common/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-300 print:hidden 
      bg-slate-900 border-b border-white/5 px-6 py-3.5 
      flex justify-between items-center shadow-premium">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        <h2 className="text-base font-extrabold tracking-tight text-white">
          <span className="text-gradient capitalize">{(user?.role === "super_admin" || user?.role === "superadmin") ? "Super Admin Panel" : "Creator Panel"}</span>
        </h2>
      </div>

      {/* Right side: Actions + User Profile */}
      <div className="flex items-center gap-6">
        <ThemeToggle />

        {/* User Profile Section */}
        <div className="flex items-center gap-3 pl-2 group relative">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-semibold text-white leading-tight">
              {user?.name || "Admin"}
            </span>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              {(user?.role === "super_admin" || user?.role === "superadmin") ? "Super Administrator" : "Experience Creator"}
            </span>
          </div>
          
          {/* Avatar */}
          <div className="relative p-[2px] rounded-full bg-linear-to-tr from-brand-500 to-indigo-500 shadow-md">
            <div className="w-8 h-8 bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
              <User size={16} className="text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;