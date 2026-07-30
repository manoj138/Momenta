import React from "react";
import { Sparkles, Eye, Edit3 } from "lucide-react";

/**
 * TemplateCard component for showcasing templates in public catalog & homepage grid.
 * 
 * @param {Object} template - Template object metadata
 * @param {Function} [onPreview] - Click handler for live preview
 * @param {Function} [onCustomize] - Click handler for customization
 */
const TemplateCard = ({ template, onPreview, onCustomize }) => {
  if (!template) return null;

  const { name, category, thumbnail, isPremium, price = "Free" } = template;

  return (
    <div className="group relative bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col">
      {/* Thumbnail area */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-gray-600">
            <Sparkles size={32} />
          </div>
        )}

        {/* Badge tag */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
            {category}
          </span>
          {isPremium && (
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PRO
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="text-xs text-gray-400 font-semibold">{price}</span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/5">
          {onPreview && (
            <button
              onClick={() => onPreview(template)}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye size={14} />
              <span>Preview</span>
            </button>
          )}
          {onCustomize && (
            <button
              onClick={() => onCustomize(template)}
              className="px-3 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-brand-600/20"
            >
              <Edit3 size={14} />
              <span>Use Theme</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
