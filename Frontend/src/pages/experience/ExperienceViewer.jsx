import React from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Sparkles } from "lucide-react";
import Button from "../../components/common/Button";

// Import Templates
import WeddingRoyalGold from "./templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "./templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "./templates/birthday/BirthdayNeonSurprise";

const ExperienceViewer = () => {
  const { slug } = useParams();
  const { experiences } = useApp();

  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <Sparkles size={44} className="text-brand-500 mb-4 animate-spin" style={{ animationDuration: '6s' }} />
        <h2 className="text-2xl font-bold mb-1">Experience Not Found</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-xs">The invitation card link path you entered does not exist or has expired.</p>
        <Link to="/">
          <Button variant="primary" className="cursor-pointer text-xs">Back to Website</Button>
        </Link>
      </div>
    );
  }

  if (experience.status !== "published") {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <h2 className="text-2xl font-bold mb-1">Work In Progress</h2>
        <p className="text-gray-400 text-sm mb-6 max-w-xs">This experience is currently in draft mode and is not visible publicly.</p>
        <Link to="/">
          <Button variant="primary" className="cursor-pointer text-xs">Go to Home</Button>
        </Link>
      </div>
    );
  }

  // Resolve template components
  const renderTemplate = () => {
    switch (experience.templateId) {
      case "wedding-royal-gold":
      case "wedding-modern-minimal":
        return <WeddingRoyalGold data={experience.data} isDemo={false} />;
      case "wedding-animated":
        return <WeddingAnimated data={experience.data} isDemo={false} />;
      case "birthday-neon-surprise":
        return <BirthdayNeonSurprise data={experience.data} isDemo={false} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-slate-800 bg-amber-50">
            <h3 className="text-xl font-bold font-serif mb-1">{experience.clientName}</h3>
            <p className="text-xs text-slate-650 max-w-xs">Unsupported template format: {experience.templateId}</p>
          </div>
        );
    }
  };

  return <>{renderTemplate()}</>;
};

export default ExperienceViewer;
