import React from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * ConfirmDeleteModal for dangerous deletion actions.
 * 
 * @param {boolean} isOpen - Controls visibility
 * @param {Function} onClose - Close handler
 * @param {Function} onConfirm - Execution handler
 * @param {string} title - Title of the modal
 * @param {string} message - Warning message
 * @param {boolean} [loading] - Loading state for async action
 */
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title = "Confirm Deletion", message = "Are you sure you want to delete this item? This action cannot be undone.", loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
            <AlertTriangle size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/20 cursor-pointer flex items-center gap-2"
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
