import React from "react";
import Asidebar from "../pages/backend/Asidebar";
import Navbar from "../pages/backend/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="admin-console flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Sidebar */}
      <Asidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;