import React from "react";

const AnimatedCard = ({ children, className = "", delay = "" }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 p-6 shadow-premium transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:border-brand-500/30 ${className}`}
      style={delay ? { animationDelay: delay } : {}}
    >
      {/* Decorative Glow Layer */}
      <div className="absolute -inset-px bg-linear-to-r from-brand-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      {children}
    </div>
  );
};

export default AnimatedCard;
