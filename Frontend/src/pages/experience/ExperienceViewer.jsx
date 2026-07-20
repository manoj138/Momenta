import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Sparkles, Loader2 } from "lucide-react";
import Button from "../../components/common/Button";
import { experienceService } from "../../services/experienceService";

// Import Templates
import WeddingRoyalGold from "./templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "./templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "./templates/birthday/BirthdayNeonSurprise";

const ExperienceViewer = () => {
  const { slug } = useParams();
  const { experiences: contextExperiences } = useApp();
  
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchExperience = async () => {
      try {
        const res = await experienceService.getBySlug(slug);
        if (isMounted && res.status && res.data) {
          setExperience({
            ...res.data,
            templateId: res.data.template?.slug || res.data.template_id,
            componentName: res.data.template?.component_name,
            status: res.data.is_published ? "published" : "draft"
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("API lookup failed, checking local context fallback:", err);
      }

      // Context Fallback
      if (isMounted) {
        const foundLocal = contextExperiences.find((e) => e.slug === slug);
        setExperience(foundLocal || null);
        setLoading(false);
      }
    };

    fetchExperience();
    return () => { isMounted = false; };
  }, [slug, contextExperiences]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
        <Loader2 size={40} className="text-brand-500 mb-4 animate-spin" />
        <p className="text-gray-400 text-sm">Loading Experience...</p>
      </div>
    );
  }

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

  if (experience.status !== "published" && !experience.is_published) {
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

  // Resolve template components dynamically
  const renderTemplate = () => {
    const tId = experience.templateId || experience.template?.slug;
    const cName = experience.componentName || experience.template?.component_name;

    if (tId === "birthday-neon-surprise" || cName === "BirthdayNeonSurprise") {
      return <BirthdayNeonSurprise data={experience.data} isDemo={false} />;
    }
    if (tId === "wedding-animated" || cName === "WeddingAnimated") {
      return <WeddingAnimated data={experience.data} isDemo={false} />;
    }
    if (tId === "wedding-royal-gold" || tId === "wedding-modern-minimal" || cName === "WeddingRoyalGold") {
      return <WeddingRoyalGold data={experience.data} isDemo={false} />;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-slate-800 bg-amber-50">
        <h3 className="text-xl font-bold font-serif mb-1">{experience.clientName || experience.title}</h3>
        <p className="text-xs text-slate-655 max-w-xs">Template format: {tId || cName}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col overflow-x-hidden">
      {renderTemplate()}
    </div>
  );
};

export default ExperienceViewer;
