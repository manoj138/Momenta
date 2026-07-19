import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const TemplateManager = () => {
  const { templates, categories, updateTemplate } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");

  const handleToggleStatus = (id, currentStatus) => {
    updateTemplate(id, { status: currentStatus === "published" ? "draft" : "published" });
  };

  const filteredTemplates = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Template Catalog</h1>
          <p className="text-gray-400 text-sm">Upload, review, configure design parameters and status options of digital themes.</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-500/10"
              : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-brand-600 border-brand-500 text-white shadow-md shadow-brand-500/10"
                : "bg-slate-900 border-white/5 hover:border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-white/5 rounded-2xl max-w-md mx-auto">
          <p className="text-gray-400">No templates found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => (
            <div key={tpl.id} className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-500/30 transition-all duration-300">
              {/* Image header */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-850">
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-brand-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md">
                  {categories.find(c => c.id === tpl.category)?.name || tpl.category}
                </div>
                <span className={`absolute top-3 right-3 text-[9px] uppercase px-2 py-0.5 rounded-md font-bold ${
                  tpl.status === "published" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}>
                  {tpl.status}
                </span>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">{tpl.name}</h4>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{tpl.description}</p>
                  <div className="text-[10px] text-gray-500 font-mono">Demo: /templates/{tpl.category}/{tpl.demoSlug}</div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <Link to={`/templates/${tpl.category}/${tpl.demoSlug}`} target="_blank">
                      <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]" title="Preview Demo">
                        <Eye size={12} />
                        <span>Demo</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleToggleStatus(tpl.id, tpl.status)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Toggle Status"
                    >
                      <span>Status</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
