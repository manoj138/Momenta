import React from "react";

/**
 * StatusBadge component to render status pills across tables and card items.
 * 
 * @param {string} status - Current status text (e.g. "published", "draft", "Active", "New", "Completed")
 * @param {string} [variant] - Explicit color scheme ('emerald'|'amber'|'blue'|'purple'|'red'|'slate')
 */
const StatusBadge = ({ status, variant }) => {
  const getBadgeStyle = (val, customVariant) => {
    if (customVariant) {
      const variants = {
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        red: "bg-red-500/10 text-red-400 border-red-500/20",
        slate: "bg-slate-500/10 text-slate-400 border-slate-500/20"
      };
      return variants[customVariant] || variants.slate;
    }

    const lower = String(val || "").toLowerCase();
    if (lower === "published" || lower === "active" || lower === "completed" || lower === "approved") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
    if (lower === "draft" || lower === "pending" || lower === "new") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
    if (lower === "in progress" || lower === "processing") {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    if (lower === "inactive" || lower === "rejected" || lower === "cancelled") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }
    return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold border inline-flex items-center gap-1.5 ${getBadgeStyle(
        status,
        variant
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
};

export default StatusBadge;
