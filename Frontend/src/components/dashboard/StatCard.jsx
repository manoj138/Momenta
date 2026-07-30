import React from "react";
import { Link } from "react-router-dom";

/**
 * StatCard component for displaying key statistics across Dashboards.
 * 
 * @param {string} label - Title of the statistic
 * @param {string|number} value - Numerical or text value
 * @param {React.ReactNode} icon - Lucide icon or visual indicator
 * @param {string} [path] - Optional route URL to make the card clickable
 * @param {string} [badgeText] - Optional badge text (e.g. "+12%")
 * @param {string} [badgeColor] - Badge color styling class
 */
const StatCard = ({ label, value, icon, path, badgeText, badgeColor = "bg-emerald-500/10 text-emerald-400" }) => {
  const content = (
    <div className="p-5 rounded-2xl bg-slate-900 border border-white/5 shadow-md flex items-center justify-between hover:border-brand-500/30 transition-all duration-300 group">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white">{value}</span>
          {badgeText && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeColor}`}>
              {badgeText}
            </span>
          )}
        </div>
      </div>
      {icon && (
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-brand-500/10 transition-colors">
          {icon}
        </div>
      )}
    </div>
  );

  if (path) {
    return <Link to={path}>{content}</Link>;
  }

  return content;
};

export default StatCard;
