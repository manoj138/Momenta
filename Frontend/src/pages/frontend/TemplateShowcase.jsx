import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Eye, ArrowRight, Sparkles } from "lucide-react";
import AnimatedCard from "../../components/common/AnimatedCard";
import Button from "../../components/common/Button";

// Import template components
import WeddingRoyalGold from "../experience/templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "../experience/templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "../experience/templates/birthday/BirthdayNeonSurprise";
import BirthdayCinematicLove from "../experience/templates/birthday/BirthdayCinematicLove";

const TemplateShowcase = () => {
  const { templates, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

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
      case "wedding-royal-gold":
        return <WeddingRoyalGold data={mockData} isDemo={true} />;
      case "wedding-animated-demo":
      case "wedding-animated":
        return <WeddingAnimated data={mockData} isDemo={true} />;
      case "neon-surprise-demo":
      case "birthday-neon-surprise":
        return <BirthdayNeonSurprise data={mockData} isDemo={true} />;
      case "birthday-cinematic-demo":
      case "birthday-cinematic-love":
      case "birthday-cinematic":
        return <BirthdayCinematicLove data={mockData} isDemo={true} />;
      default:
        return null;
    }
  };

  const handleCategorySelect = (catId) => {
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  const rawFiltered = (activeCategory === "all"
    ? templates
    : templates.filter(t => t.category === activeCategory)
  ).filter(t => t.status === "published");

  const filteredTemplates = [];
  const seenIds = new Set();
  rawFiltered.forEach((t) => {
    const key = t.componentName || t.demoSlug || t.slug || t.id;
    if (!seenIds.has(key)) {
      seenIds.add(key);
      filteredTemplates.push(t);
    }
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen py-16 relative overflow-hidden transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1 bg-slate-200/60 dark:bg-white/5 border border-gray-300 dark:border-white/10 px-3 py-1 rounded-full text-xs text-brand-650 dark:text-brand-400 font-semibold">
            <Sparkles size={12} />
            <span>Interactive Template Library</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">Discover Premium Designs</h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm">Select an animated design theme for your celebration. All templates can be customized with your details, photographs, and audio tracks.</p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          <button
            onClick={() => handleCategorySelect("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/10"
                : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300"
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
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/40 rounded-2xl border border-gray-200 dark:border-white/5 max-w-md mx-auto shadow-premium">
            <p className="text-slate-500 dark:text-gray-400 mb-4">No templates found in this category yet.</p>
            <Link to="/enquiry">
              <Button variant="primary" className="cursor-pointer">Request Custom Design</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((tpl) => (
              <AnimatedCard key={tpl.id} className="group bg-white dark:bg-slate-900/40 border-gray-200 dark:border-white/5 p-0 flex flex-col h-full overflow-hidden shadow-premium">
                {/* Phone Container Box with Center Alignment */}
                <div className="w-full h-[340px] bg-slate-100 dark:bg-slate-950/60 border-b border-gray-200 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                  <div 
                    style={{
                      width: "375px",
                      height: "660px",
                      transform: "scale(0.48)",
                      transformOrigin: "center center"
                    }}
                    className="border-[10px] border-slate-900 dark:border-slate-800 rounded-[44px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-white dark:bg-slate-900 overflow-hidden relative flex flex-col shrink-0 transition-colors duration-300"
                  >
                    {/* Speaker & Camera notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-slate-900 dark:bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
                      <span className="w-10 h-1 bg-slate-700 rounded-full" />
                    </div>

                    {/* Native Viewport */}
                    <div className="flex-1 overflow-y-auto no-scrollbar h-full w-full pointer-events-none select-none">
                      {renderCardPreview(tpl.demoSlug)}
                    </div>

                    {/* Hover Overlay with Live Preview */}
                    <div 
                      onClick={() => window.open(`/e/${tpl.demoSlug}`, "_blank")}
                      className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-40 backdrop-blur-[2px] pointer-events-auto"
                    >
                      <Button className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl cursor-pointer border-0">
                        <Eye size={14} />
                        <span>Live Preview Demo</span>
                      </Button>
                    </div>
                  </div>

                  <span className="absolute top-3 left-3 bg-brand-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md z-45">
                    {categories.find(c => c.id === tpl.category)?.name || tpl.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">{tpl.name}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed">{tpl.description}</p>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200 dark:border-white/5 flex items-center justify-between mt-4">
                    <a href={`/e/${tpl.demoSlug || tpl.id}`} target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold text-xs flex items-center gap-1">
                      <span>Full Screen Preview</span>
                      <ArrowRight size={14} />
                    </a>
                    <Link to={`/enquiry?template=${tpl.id}`}>
                      <Button variant="outline" size="sm" className="bg-slate-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-205 cursor-pointer text-xs">
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
