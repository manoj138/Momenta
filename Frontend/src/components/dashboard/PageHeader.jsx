import React from "react";
import { ArrowLeft } from "lucide-react";

/**
 * PageHeader component for dashboard pages.
 * 
 * @param {string} title - Page title
 * @param {string} [subtitle] - Page description / subtitle
 * @param {Function} [onBack] - Optional back button handler
 * @param {string} [badge] - Optional top badge / category tag
 * @param {React.ReactNode} [actions] - Action buttons to show on the right side
 */
const PageHeader = ({ title, subtitle, onBack, badge, actions }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-colors cursor-pointer"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          {badge && (
            <span className="text-xs text-brand-400 font-bold uppercase tracking-wider block mb-1">
              {badge}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
};

export default PageHeader;
