import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Eye, ArrowRight, Sparkles } from "lucide-react";
import AnimatedCard from "../../components/common/AnimatedCard";
import Button from "../../components/common/Button";

const TemplateShowcase = () => {
  const { templates, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleCategorySelect = (catId) => {
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const filteredTemplates = activeCategory === "all"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-brand-400">
            <Sparkles size={12} />
            <span>Interactive Template Library</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">Discover Premium Designs</h1>
          <p className="text-gray-400">Select an animated design theme for your celebration. All templates can be customized with your details, photographs, and audio tracks.</p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          <button
            onClick={() => handleCategorySelect("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/10"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
            }`}
          >
            All Themes
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-white/5 max-w-md mx-auto">
            <p className="text-gray-400 mb-4">No templates found in this category yet.</p>
            <Link to="/enquiry">
              <Button variant="primary" className="cursor-pointer">Request Custom Design</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((tpl) => (
              <AnimatedCard key={tpl.id} className="bg-slate-900/40 border-white/5 p-0 flex flex-col h-full overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-850">
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Link to={`/templates/${tpl.category}/${tpl.demoSlug}`} className="w-full">
                      <Button className="w-full bg-white text-slate-900 hover:bg-gray-100 flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold py-2 rounded-lg">
                        <Eye size={14} />
                        <span>Live Preview Demo</span>
                      </Button>
                    </Link>
                  </div>
                  <span className="absolute top-3 left-3 bg-brand-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md">
                    {categories.find(c => c.id === tpl.category)?.name || tpl.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">{tpl.name}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{tpl.description}</p>
                  </div>
                  
                  <div className="pt-5 border-t border-white/5 flex items-center justify-between mt-4">
                    <Link to={`/templates/${tpl.category}/${tpl.demoSlug}`} className="text-brand-400 hover:text-brand-300 font-semibold text-xs flex items-center gap-1">
                      <span>View Specifications</span>
                      <ArrowRight size={12} />
                    </Link>
                    <Link to={`/enquiry?template=${tpl.id}`}>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white cursor-pointer text-xs">
                        Use Theme
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateShowcase;
