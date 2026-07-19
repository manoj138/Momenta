import React from "react";
import Asidebar from "../pages/backend/Asidebar";
import Navbar from "../pages/backend/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-white font-sans">
      {/* Sidebar */}
      <Asidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-slate-950">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;