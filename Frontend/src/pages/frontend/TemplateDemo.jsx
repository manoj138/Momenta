import React from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import DevicePreviewMock from "../../components/common/DevicePreviewMock";
import Button from "../../components/common/Button";

// Import template components
import WeddingRoyalGold from "../experience/templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "../experience/templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "../experience/templates/birthday/BirthdayNeonSurprise";

const TemplateDemo = () => {
  const { category, slug } = useParams();
  const { templates, experiences } = useApp();

  // Find template by demoSlug
  const template = templates.find((t) => t.demoSlug === slug);

  // Find the corresponding demo experience data
  const demoExp = experiences.find((e) => e.slug === slug);

  if (!template) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors">
        <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
        <p className="text-slate-500 dark:text-gray-400 mb-6">The template demo path you are looking for does not exist.</p>
        <Link to="/templates">
          <Button variant="primary" className="cursor-pointer">Back to Showcase</Button>
        </Link>
      </div>
    );
  }

  // Render the actual animated template depending on template ID
  const renderTemplatePreview = () => {
    const mockData = demoExp ? demoExp.data : {};
    
    switch (template.id) {
      case "wedding-royal-gold":
      case "wedding-modern-minimal":
        return <WeddingRoyalGold data={mockData} isDemo={true} />;
      case "wedding-animated":
        return <WeddingAnimated data={mockData} isDemo={true} />;
      case "birthday-neon-surprise":
        return <BirthdayNeonSurprise data={mockData} isDemo={true} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-800 bg-amber-50">
            <Sparkles size={40} className="text-amber-600 mb-3" />
            <h3 className="text-xl font-bold font-serif mb-1">{template.name}</h3>
            <p className="text-xs text-slate-650 max-w-xs">{template.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen py-10 relative overflow-hidden transition-colors duration-300">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col">
        {/* Header Breadcrumbs & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link to="/templates" className="p-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-xl transition-all cursor-pointer shadow-sm">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider">
                <span>{category} template</span>
                <span>•</span>
                <span className="text-green-500 dark:text-green-400 flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-ping" />
                  <span>Live Demo</span>
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold">{template.name}</h1>
            </div>
          </div>
          
          <Link to={`/enquiry?template=${template.id}`}>
            <Button variant="primary" className="flex items-center gap-1.5 shadow-lg shadow-brand-500/10 cursor-pointer">
              <Send size={16} />
              <span>Request This Design</span>
            </Button>
          </Link>
        </div>

        {/* Device Preview Section */}
        <div className="flex-1 min-h-[600px] h-[800px]">
          <DevicePreviewMock>
            {renderTemplatePreview()}
          </DevicePreviewMock>
        </div>
      </div>
    </div>
  );
};

export default TemplateDemo;
