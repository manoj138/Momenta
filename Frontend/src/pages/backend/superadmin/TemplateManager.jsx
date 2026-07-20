import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

// Import Templates for native mockup rendering in Super Admin
import WeddingRoyalGold from "../../experience/templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "../../experience/templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "../../experience/templates/birthday/BirthdayNeonSurprise";

const TemplateManager = () => {
  const { templates, categories, updateTemplate } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");

  const handleToggleStatus = (id, currentStatus) => {
    updateTemplate(id, { status: currentStatus === "published" ? "draft" : "published" });
  };

  const filteredTemplates = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const renderCardPreview = (demoSlug) => {
    const mockData = {
      brideName: "Priya",
      groomName: "Rahul",
      weddingDate: "2026-11-20",
      weddingTime: "11:30 AM",
      venueName: "Maratha Durbar Hall",
      venueAddress: "JM Road, Shivajinagar, Pune",
      personName: "Sneha Shinde",
      age: 25,
      birthdayDate: "2026-08-15",
      venue: "Sky Lounge, Kothrud",
      message: "Join me as I celebrate 25 years of awesome!",
    };

    switch (demoSlug) {
      case "royal-gold-demo":
        return <WeddingRoyalGold data={mockData} isDemo={true} />;
      case "wedding-animated-demo":
        return <WeddingAnimated data={mockData} isDemo={true} />;
      case "neon-surprise-demo":
        return <BirthdayNeonSurprise data={mockData} isDemo={true} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-slate-900 text-gray-400 text-xs">
            <span>{demoSlug}</span>
          </div>
        );
    }
  };

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
              {/* Compact Mobile Phone Mockup Header */}
              <div className="relative w-full h-[360px] bg-slate-950/80 border-b border-white/5 flex items-center justify-center p-2 overflow-hidden group">
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-40 bg-brand-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md">
                  {categories.find(c => c.id === tpl.category)?.name || tpl.category}
                </div>

                {/* Status Badge */}
                <span className={`absolute top-3 right-3 z-40 text-[9px] uppercase px-2 py-0.5 rounded-md font-bold ${
                  tpl.status === "published" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}>
                  {tpl.status}
                </span>

                {/* Scaled Physical Phone Mockup Container */}
                <div 
                  style={{
                    width: "375px",
                    height: "660px",
                    transform: "scale(0.52)",
                    transformOrigin: "center center"
                  }}
                  className="border-[10px] border-slate-800 rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900 overflow-hidden relative flex flex-col shrink-0 group-hover:border-brand-500 transition-colors duration-300"
                >
                  {/* Speaker & Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
                    <span className="w-10 h-1 bg-slate-700 rounded-full" />
                  </div>

                  {/* Native Viewport */}
                  <div className="flex-1 overflow-y-auto no-scrollbar h-full w-full pointer-events-none select-none">
                    {renderCardPreview(tpl.demoSlug)}
                  </div>

                  {/* Hover Overlay with Direct New Tab Link */}
                  <div 
                    onClick={() => window.open(tpl.previewUrl || `/e/${tpl.demoSlug}`, "_blank")}
                    className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-40 backdrop-blur-[2px]"
                  >
                    <button className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl cursor-pointer">
                      <Eye size={14} />
                      <span>Live Preview</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">{tpl.name}</h4>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{tpl.description}</p>
                  <div className="text-[10px] text-gray-500 font-mono">Direct Link: {tpl.previewUrl || `/e/${tpl.demoSlug}`}</div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(tpl.previewUrl || `/e/${tpl.demoSlug}`, "_blank")}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Preview Demo Directly"
                    >
                      <Eye size={12} />
                      <span>Demo</span>
                    </button>

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
