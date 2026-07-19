import React, { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";

const DevicePreviewMock = ({ children }) => {
  const [device, setDevice] = useState("mobile"); // Default to mobile for cards

  return (
    <div className="flex flex-col h-full border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        
        {/* Toggle Switches */}
        <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              device === "mobile"
                ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
          
          <button
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              device === "desktop"
                ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
        </div>

        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Device Body Viewport */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
        {device === "mobile" ? (
          /* Mobile Phone Mockup */
          <div className="w-[375px] h-[780px] border-[12px] border-slate-900 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-white dark:bg-slate-900 overflow-hidden relative flex flex-col">
            {/* Speaker & Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
              <span className="w-12 h-1 bg-slate-750 rounded-full mb-1" />
              <span className="w-2.5 h-2.5 bg-slate-800 rounded-full mb-1 ml-3" />
            </div>
            {/* Viewport Content */}
            <div className="flex-1 overflow-auto h-full w-full">
              {children}
            </div>
          </div>
        ) : (
          /* Desktop Browser Mockup */
          <div className="w-full max-w-5xl h-[780px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-premium overflow-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicePreviewMock;
