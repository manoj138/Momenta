import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Layers,
  Palette,
  Users,
  FileText,
  Globe,
  LogOut,
  Sparkles
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Asidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Define links based on user role
  const getLinks = () => {
    if (user?.role === "super_admin") {
      return [
        { to: "/superadmin", label: "Dashboard", icon: <Home size={20} /> },
        { to: "/superadmin/categories", label: "Category Schemas", icon: <Layers size={20} /> },
        { to: "/superadmin/templates", label: "Design Templates", icon: <Palette size={20} /> },
        { to: "/superadmin/admins", label: "Admins & Creators", icon: <Users size={20} /> },
        { to: "/superadmin/enquiries", label: "Client Enquiries", icon: <FileText size={20} /> },
        { to: "/superadmin/experiences", label: "Active Links", icon: <Globe size={20} /> },
      ];
    } else {
      return [
        { to: "/creator", label: "Dashboard Studio", icon: <Home size={20} /> },
      ];
    }
  };

  const links = getLinks();

  return (
    <div
      className={`h-screen relative transition-all duration-500 ease-in-out print:hidden border-r border-white/5 ${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900 text-white shadow-premium flex flex-col justify-between`}
    >
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 mb-4">
          <div className={`flex items-center gap-2 transition-opacity duration-300 ${!isOpen ? "opacity-0 invisible" : "opacity-100 visible"}`}>
            <Sparkles className="text-brand-500" size={20} />
            <h1 className="font-bold tracking-tight text-gradient text-lg">
              Momenta Console
            </h1>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-205 focus:outline-none cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MENU */}
        <nav className="mt-4 px-3">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                    isActive(link.to) 
                      ? "bg-brand-500/10 border border-brand-500/20 text-brand-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <div className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive(link.to) ? "text-brand-400" : ""}`}>
                    {link.icon}
                  </div>
                  <span className={`font-semibold text-xs transition-all duration-200 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={20} />
          <span className={`font-semibold text-xs transition-all duration-200 ${!isOpen && "opacity-0 translate-x-4 pointer-events-none"}`}>
            Logout Session
          </span>
        </button>
      </div>
    </div>
  );
};

export default Asidebar;