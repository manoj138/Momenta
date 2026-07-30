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
import BirthdayCinematicLove from "./templates/birthday/BirthdayCinematicLove";
import BirthdayBelatedApology from "./templates/birthday/BirthdayBelatedApology";

const ExperienceViewer = () => {
  const { slug } = useParams();
  const { experiences: contextExperiences } = useApp();
  
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Listen for storage changes from the editor tab for real-time live preview updates
    const handleStorageChange = (e) => {
      console.log("Storage event listener triggered. Key changed:", e.key);
      if (e.key === "momenta_preview_data" && slug === "preview" && isMounted) {
        try {
          const parsed = JSON.parse(e.newValue);
          console.log("Parsed real-time sync preview data:", parsed);
          setExperience({
            slug: "preview",
            templateId: parsed.templateId,
            data: parsed.data,
            clientName: parsed.clientName,
            status: "published",
            is_published: true
          });
        } catch (err) {
          console.warn("Failed to parse storage sync update:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const fetchExperience = async () => {
      if (slug === "preview") {
        try {
          const localData = localStorage.getItem("momenta_preview_data");
          console.log("Fetching preview data on mount. Value:", localData);
          if (localData && isMounted) {
            const parsed = JSON.parse(localData);
            console.log("Parsed mount preview data:", parsed);
            setExperience({
              slug: "preview",
              templateId: parsed.templateId,
              data: parsed.data,
              clientName: parsed.clientName,
              status: "published",
              is_published: true
            });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Failed to load preview data:", e);
        }
      }

      // Check if it is a template demo slug and load statically
      const demoTemplates = {
        "wedding-animated-demo": {
          templateId: "wedding-animated",
          clientName: "Rahul & Priya",
          data: {}
        },
        "wedding-animated": {
          templateId: "wedding-animated",
          clientName: "Rahul & Priya",
          data: {}
        },
        "royal-gold-demo": {
          templateId: "wedding-royal-gold",
          clientName: "Rahul & Priya",
          data: {}
        },
        "wedding-royal-gold": {
          templateId: "wedding-royal-gold",
          clientName: "Rahul & Priya",
          data: {}
        },
        "neon-surprise-demo": {
          templateId: "birthday-neon-surprise",
          clientName: "Sneha Shinde",
          data: {}
        },
        "birthday-neon-surprise": {
          templateId: "birthday-neon-surprise",
          clientName: "Sneha Shinde",
          data: {}
        },
        "birthday-cinematic-demo": {
          templateId: "birthday-cinematic-love",
          clientName: "Sneha Shinde",
          data: {
            personName: "Sneha Shinde",
            age: 25,
            eventDate: "Saturday, October 18",
            eventTime: "7:00 PM Onwards",
            venueName: "Skyline Lounge, Royal Park",
            venueAddress: "123 Elegance Road, Sector 5",
            secretReveal: "Join us for cake cutting and special announcement!",
            description: "Join us for an elegant evening of cinematic storytelling, celebration, and love."
          }
        },
        "birthday-cinematic-love": {
          templateId: "birthday-cinematic-love",
          clientName: "Sneha Shinde",
          data: {
            personName: "Sneha Shinde",
            age: 25,
            eventDate: "Saturday, October 18",
            eventTime: "7:00 PM Onwards",
            venueName: "Skyline Lounge, Royal Park",
            venueAddress: "123 Elegance Road, Sector 5",
            secretReveal: "Join us for cake cutting and special announcement!",
            description: "Join us for an elegant evening of cinematic storytelling, celebration, and love."
          }
        },
        "birthday-belated-apology": {
          templateId: "birthday-belated-apology",
          clientName: "Sneha Shinde",
          data: {
            personName: "Sneha",
            petName: "Cutie",
            lateReason: "Finding the perfect words for someone as special as you took a little extra time! ✨",
            letterText: "Dearest Sneha,\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Belated Birthday to my favorite person in the world! 💖",
            favNotification: "BETTER LATE THAN NEVER — YOU ARE MY FAVORITE PERSON 💖",
            stayCute: "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨",
            iloveYou: "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖"
          }
        },
        "vinit-dada-birthday": {
          templateId: "birthday-belated-apology",
          clientName: "Vinit Dada",
          data: {
            personName: "Vinit Dada",
            petName: "Cutie",
            lateReason: "Finding the perfect words for someone as special as you took a little extra time! ✨",
            letterText: "Dearest Vinit Dada,\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Belated Birthday to my favorite person in the world! 💖",
            favNotification: "BETTER LATE THAN NEVER — YOU ARE MY FAVORITE PERSON 💖",
            stayCute: "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨",
            iloveYou: "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖"
          }
        },
        "belated-apology-demo": {
          templateId: "birthday-belated-apology",
          clientName: "Sneha Shinde",
          data: {
            personName: "Sneha",
            petName: "Cutie",
            lateReason: "Finding the perfect words for someone as special as you took a little extra time! ✨",
            letterText: "Dearest Sneha,\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Belated Birthday to my favorite person in the world! 💖",
            favNotification: "BETTER LATE THAN NEVER — YOU ARE MY FAVORITE PERSON 💖",
            stayCute: "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨",
            iloveYou: "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖"
          }
        }
      };

      // Helper to detect template from form data fields & slug
      const detectTemplateFromData = (data = {}, s = "") => {
        const lower = s.toLowerCase();

        // 1. Check explicit fields in form data first!
        if (
          data.lateReason ||
          data.late_reason ||
          data.stayCute ||
          data.stay_cute ||
          data.iloveYou ||
          data.ilove_you ||
          data.scratchMessage ||
          data.scratchTitle ||
          data.letterText ||
          data.petName ||
          data.photo1 ||
          data.bgMusic
        ) {
          return "birthday-belated-apology";
        }

        if (data.groomName || data.groom_name || data.brideName || data.bride_name) {
          return "wedding-royal-gold";
        }

        if (data.secretReveal || data.secret_reveal || data.venueAddress || data.venue_address) {
          return "birthday-cinematic-love";
        }

        // 2. Keyword check on slug
        if (lower.includes("apology") || lower.includes("belated")) {
          return "birthday-belated-apology";
        }
        if (lower.includes("neon")) {
          return "birthday-neon-surprise";
        }
        if (lower.includes("wedding") || lower.includes("royal") || lower.includes("marriage")) {
          return "wedding-royal-gold";
        }
        if (lower.includes("animated")) {
          return "wedding-animated";
        }

        return "birthday-belated-apology";
      };

      // 1. TOP PRIORITY: Smart Backend Fetch with Retry Loop for Render Cold Starts
      let attempts = 0;
      let expData = null;

      while (attempts < 3 && !expData && isMounted) {
        try {
          attempts++;
          const res = await experienceService.getBySlug(slug);
          const raw = res?.data || res;
          if (raw && (raw.slug || raw.data)) {
            expData = raw.data || raw;
            break;
          }
        } catch (err) {
          if (err?.response?.status === 404) {
            console.warn(`API lookup returned 404 for slug: "${slug}". Proceeding to local/smart fallback.`);
            break; // Immediately break on 404 Not Found (no redundant retries)
          }
          console.warn(`API lookup attempt ${attempts} failed for slug: ${slug}`, err);
          if (attempts < 3) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }

      if (isMounted && expData) {
        const resolvedTemplateId =
          detectTemplateFromData(expData.data || expData, slug) ||
          expData.template_slug ||
          expData.templateId ||
          expData.template_id ||
          expData.template?.slug ||
          expData.componentName ||
          expData.template?.component_name;

        setExperience({
          ...expData,
          templateId: resolvedTemplateId,
          componentName: expData.template?.component_name || expData.componentName,
          status: expData.is_published !== false ? "published" : "draft",
          is_published: expData.is_published !== false
        });
        setLoading(false);
        return;
      }

      // 2. SECOND PRIORITY: Context & LocalStorage Fallbacks
      let foundLocal = contextExperiences.find(
        (e) => (e.slug || "").toLowerCase() === (slug || "").toLowerCase()
      );

      if (!foundLocal) {
        try {
          const storedExps = localStorage.getItem("momenta_local_experiences");
          if (storedExps) {
            const parsedList = JSON.parse(storedExps);
            foundLocal = parsedList.find(
              (e) => (e.slug || "").toLowerCase() === (slug || "").toLowerCase()
            );
          }
        } catch (e) {
          console.warn("Failed to parse local stored experiences:", e);
        }
      }

      if (isMounted && foundLocal) {
        const resolvedTemplateId = detectTemplateFromData(foundLocal.data || foundLocal, slug);

        setExperience({
          ...foundLocal,
          templateId: resolvedTemplateId,
          status: "published",
          is_published: true
        });
        setLoading(false);
        return;
      }

      // 3. THIRD PRIORITY: Explicit Demo Templates (only for demo slugs or if DB/local is null)
      if (demoTemplates[slug]) {
        const demo = demoTemplates[slug];
        setExperience({
          slug: slug,
          templateId: demo.templateId,
          data: demo.data,
          clientName: demo.clientName,
          status: "published",
          is_published: true
        });
        setLoading(false);
        return;
      }

      // 4. FOURTH PRIORITY: Smart Dynamic Experience Generator
      if (isMounted) {
        const nameWords = (slug || "")
          .split("-")
          .filter((w) => !["birthday", "wedding", "apology", "belated", "cinematic", "neon", "demo", "e"].includes(w.toLowerCase()))
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
        
        const extractedName = nameWords.length > 0 ? nameWords.join(" ") : "Special One";
        const inferredTemplateId = detectTemplateFromData({}, slug);

        setExperience({
          slug: slug,
          templateId: inferredTemplateId,
          clientName: extractedName,
          status: "published",
          is_published: true,
          data: {
            personName: extractedName,
            petName: "Cutie",
            lateReason: "Finding the perfect words for someone as special as you took a little extra time! ✨",
            stayCute: "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨",
            iloveYou: "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖"
          }
        });
        setLoading(false);
      }
    };

    fetchExperience();
    return () => { 
      isMounted = false;
      window.removeEventListener("storage", handleStorageChange);
    };
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
    if (tId === "birthday-cinematic" || tId === "birthday-cinematic-love" || cName === "BirthdayCinematicLove") {
      return <BirthdayCinematicLove data={experience.data} isDemo={false} />;
    }
    if (tId === "birthday-belated-apology" || cName === "BirthdayBelatedApology") {
      return <BirthdayBelatedApology data={experience.data} isDemo={false} />;
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
