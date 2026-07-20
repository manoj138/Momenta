import React, { useState, useEffect, useRef, useMemo } from "react";
import { Heart, Calendar, MapPin, Clock, ArrowDown, Volume2, VolumeX, Music, Sparkles, Utensils, Sun } from "lucide-react";
import PremiumAudioPlayer from "../../../../components/common/PremiumAudioPlayer";
import InteractiveMap from "../../../../components/common/InteractiveMap";

// Intricate Golden Indian Wedding Floral Corner Motif
const FloralCorner = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    className={`w-28 h-28 md:w-36 md:h-36 text-amber-400/75 pointer-events-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
  >
    {/* Intricate floral swirly paths matching traditional design */}
    <path d="M 10,10 C 25,10 45,20 50,35 C 55,50 35,65 20,55 C 10,45 15,30 25,35 C 35,40 38,52 30,58 C 24,62 16,56 18,48 C 20,40 30,35 40,42" />
    <path d="M 10,10 C 10,25 20,45 35,50 C 50,55 65,35 55,20 C 45,10 30,15 35,25 C 40,35 52,38 58,30 C 62,24 56,16 48,18 C 40,20 35,30 42,40" />
    {/* Flower heads at terminals */}
    <circle cx="72" cy="22" r="3.5" fill="currentColor" />
    <path d="M 72,17 C 75,13 80,15 78,20 C 76,25 69,24 72,17 Z" fill="currentColor" />
    <path d="M 76,22 C 81,25 79,30 74,28 C 69,26 70,19 76,22 Z" fill="currentColor" />
    <circle cx="22" cy="72" r="3.5" fill="currentColor" />
    <path d="M 17,72 C 13,75 15,80 20,78 C 25,76 24,69 17,72 Z" fill="currentColor" />
    <path d="M 22,76 C 25,81 30,79 28,74 C 26,69 19,70 22,76 Z" fill="currentColor" />
    {/* Inner decorative frame line accent */}
    <path d="M 0,2 C 15,2 25,12 25,27 L 25,80" strokeWidth="0.8" strokeDasharray="2,2" />
    <path d="M 2,0 C 2,15 12,25 27,25 L 80,25" strokeWidth="0.8" strokeDasharray="2,2" />
    {/* Elegant details and dots */}
    <circle cx="50" cy="8" r="1.5" fill="currentColor" />
    <circle cx="62" cy="12" r="1.5" fill="currentColor" />
    <circle cx="8" cy="50" r="1.5" fill="currentColor" />
    <circle cx="12" cy="62" r="1.5" fill="currentColor" />
  </svg>
);

// Canvas-based Transparent & Amber Tinted Namaste Hands Component using user asset (/comman/namaskarm hand.png)
const TransparentNamasteImage = ({ className = "h-20 sm:h-24 w-auto mx-auto" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/comman/namaskarm hand.png";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 3x HD Retina Pixel Scaling for crisp high-DPI rendering
      const scale = 3;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If pixel is near white (R, G, B all > 210), set alpha to transparent
        if (r > 210 && g > 210 && b > 210) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", imageRendering: "-webkit-optimize-contrast" }}
    />
  );
};

// Canvas-based Transparent Sanai & Dholak Players Component (/wedding/Sanai dhol vadhk.png)
const TransparentSanaiVadhak = ({ className = "h-32 sm:h-40 md:h-44 w-auto mx-auto" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = "/wedding/Sanai dhol vadhk.png";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scale = 2;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If pixel is near white (R, G, B all > 230), set alpha to transparent
        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        animation: isVisible
          ? "sanaiVadhakEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards, sanaiMusicalSway 4s ease-in-out 0.8s infinite"
          : "none",
        opacity: isVisible ? 1 : 0,
      }}
      className="inline-block"
    >
      <canvas
        ref={canvasRef}
        className={className}
        style={{ display: "block", imageRendering: "-webkit-optimize-contrast" }}
      />
    </div>
  );
};

// Next-Level Animated Countdown Card (Mechanical 3D Unfold & Flip Board)
const AnimatedCountdownCard = ({ timeLeft, t, fontClasses }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        animation: isVisible ? "cardUnfold3D 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
        opacity: isVisible ? 1 : 0,
      }}
      className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 text-center shadow-xl"
    >
      <Clock
        style={{
          animation: isVisible ? "clockSpin 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
        }}
        className="text-amber-400 mx-auto mb-2"
        size={26}
      />
      <h3 className={`text-xs uppercase font-bold tracking-widest text-amber-300 mb-4 ${fontClasses.body}`}>{t.celebrationIn}</h3>
      
      <div className={`grid grid-cols-4 gap-2 ${fontClasses.body}`}>
        {[
          { val: timeLeft.days, label: t.days, delay: "0.1s" },
          { val: timeLeft.hours, label: t.hours, delay: "0.2s" },
          { val: timeLeft.minutes, label: t.mins, delay: "0.3s" },
          { val: timeLeft.seconds, label: t.secs, delay: "0.4s" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              animation: isVisible ? `boxFlipDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${item.delay} forwards` : "none",
              opacity: isVisible ? 1 : 0,
            }}
            className="bg-[#310202] p-2.5 rounded-xl border border-amber-500/20 shadow-md"
          >
            <span className="block text-xl font-bold text-amber-200">{item.val}</span>
            <span className="text-[9px] uppercase tracking-wider text-amber-400/70">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Next-Level Animated Greetings Card (Royal Pranam & Border Draw)
const AnimatedGreetingsCard = ({ t, getWelcomeMessage, getFamilyDetails, fontClasses }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        animation: isVisible ? "cardUnfold3D 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
        opacity: isVisible ? 1 : 0,
      }}
      className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-8 text-center shadow-xl space-y-4"
    >
      <div
        style={{
          animation: isVisible ? "namastePranam 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none",
        }}
      >
        <TransparentNamasteImage className="h-20 sm:h-24 w-auto mx-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]" />
      </div>

      <h3 className={`text-lg font-bold text-amber-100 ${fontClasses.heading}`}>{t.greetings}</h3>
      <p className={`text-sm text-amber-200 leading-relaxed ${fontClasses.body}`}>
        {getWelcomeMessage() || t.defaultWelcomeMsg}
      </p>
      
      {getFamilyDetails() && (
        <div className="pt-4 border-t border-amber-500/15 text-xs relative">
          <div
            style={{
              animation: isVisible ? "borderDraw 0.8s ease-out 0.4s forwards" : "none",
              transformOrigin: "center",
            }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
          />
          <span className={`block text-amber-600 font-bold uppercase tracking-wider mb-1 ${fontClasses.body}`}>{t.withLoveFrom}</span>
          <span className={`text-amber-100 font-bold ${fontClasses.heading}`}>{getFamilyDetails()}</span>
        </div>
      )}
    </div>
  );
};

// Groom Illustration using public assets (no circular frame, balanced height with scale)
const GroomIllustration = () => (
  <img
    src="/wedding/groom.png"
    alt="Groom"
    className="h-[340px] sm:h-[400px] md:h-[460px] object-contain scale-[1.55] origin-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
  />
);

// Bride Illustration using public assets (no circular frame, balanced height with scale)
const BrideIllustration = () => (
  <img
    src="/wedding/bride.png"
    alt="Bride"
    className="h-[340px] sm:h-[400px] md:h-[460px] object-contain scale-[1.55] origin-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
  />
);

// Individual Scroll-Triggered Timeline Item using Intersection Observer
const AnimatedTimelineItem = ({ event, idx, fontClasses, getEventIcon }) => {
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = idx % 2 === 0;

  return (
    <div
      ref={itemRef}
      style={{
        animation: isVisible ? `${isEven ? "slideFromRight" : "slideFromLeft"} 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards` : "none",
        opacity: isVisible ? 1 : 0,
      }}
      className="relative pl-10 group transition-all duration-300"
    >
      {/* Event Node Dot/Icon */}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#310202] border border-amber-400/50 flex items-center justify-center shadow-md z-10 group-hover:scale-110 group-hover:border-amber-300 transition-all duration-300">
        {getEventIcon(event.title)}
      </div>

      {/* Event Details Card */}
      <div className="bg-[#310202]/60 border border-amber-500/15 rounded-2xl p-4 space-y-1.5 group-hover:bg-[#310202]/90 group-hover:border-amber-400/40 transition-all duration-300 shadow-md">
        <h4 className={`text-sm font-bold text-amber-100 group-hover:text-amber-300 transition-colors duration-300 ${fontClasses.heading}`}>
          {event.title}
        </h4>
        
        <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs font-semibold text-amber-400 ${fontClasses.body}`}>
          {event.date && (
            <span>{event.date}</span>
          )}
          {event.date && event.time && (
            <span className="hidden sm:inline text-amber-500/50">•</span>
          )}
          {event.time && (
            <span className="text-amber-300/90">{event.time}</span>
          )}
        </div>

        {event.venue && (
          <p className={`text-xs text-amber-200/80 font-semibold mt-1 ${fontClasses.body}`}>
            📍 {event.venue}
          </p>
        )}

        {event.address && (
          <p className={`text-[11px] text-amber-200/50 leading-relaxed pl-4 ${fontClasses.body}`}>
            {event.address}
          </p>
        )}
      </div>
    </div>
  );
};

// Translation Dictionary for Marathi & English
const translations = {
  mr: {
    invitationTitle: "निमंत्रणपत्रिका",
    welcome: "स्वागतम्",
    welcomeSubtitle: "प्रेम आणि एकत्वाच्या उत्सवात",
    gettingMarried: "यांचा शुभविवाह",
    loveQuote: "\"\u0926\u094b\u0928 \u0939\u0943\u0926\u092f\u0947, \u090f\u0915 \u0938\u0941\u0902\u0926\u0930 \u092a\u094d\u0930\u0935\u093e\u0938, \u0906\u0923\u093f \u090f\u0915\u0924\u094d\u0930 \u0932\u093f\u0939\u093f\u0932\u0947 \u091c\u093e\u0923\u093e\u0930\u0947 \u0906\u092f\u0941\u0937\u094d\u092f...\"",
    scrollDown: "खाली स्क्रोल करा",
    celebrationIn: "सोहळा सुरू होण्यास",
    days: "दिवस",
    hours: "तास",
    mins: "मिनिटे",
    secs: "सेकंद",
    greetings: "शुभेच्छा",
    defaultWelcomeMsg: "नव्या स्वप्नांसह, नव्या आशांसह, आम्ही आपल्या उपस्थितीच्या सन्मानाची विनंती करतो.",
    withLoveFrom: "प्रेमपूर्वक",
    eventTimeline: "कार्यक्रम पत्रिका",
    eventTimelineSub: "सोहळ्याचे वेळापत्रक",
    ceremonyDetails: "समारंभ तपशील",
    time: "वेळ",
    navigateMaps: "नकाशावर शोधा",
    poweredBy: "सादरकर्ता",
    haldiTitle: "हळदी समारंभ",
    sangeetTitle: "मेहंदी व संगीत",
    weddingTitle: "शुभ विवाह",
    receptionTitle: "स्वागत समारंभ",
  },
  en: {
    invitationTitle: "WEDDING INVITATION",
    welcome: "WELCOME",
    welcomeSubtitle: "To the Celebration of Love & Togetherness",
    gettingMarried: "Are Getting Married",
    loveQuote: "\"Two hearts, one beautiful journey, and a lifetime of love waiting to be written together.\"",
    scrollDown: "Scroll Down",
    celebrationIn: "Celebration Starts In",
    days: "Days",
    hours: "Hours",
    mins: "Mins",
    secs: "Secs",
    greetings: "Greetings",
    defaultWelcomeMsg: "With new dreams, new hopes, and a new desire, we request the honor of your presence to witness the celebration of our union.",
    withLoveFrom: "With Love From",
    eventTimeline: "Event Timeline",
    eventTimelineSub: "Celebration Schedule",
    ceremonyDetails: "Ceremony Details",
    time: "Time",
    navigateMaps: "Navigate with Maps",
    poweredBy: "Powered By",
    haldiTitle: "Haldi Ceremony",
    sangeetTitle: "Sangeet & Mehendi",
    weddingTitle: "Wedding Ceremony",
    receptionTitle: "Reception",
  },
};

const WeddingAnimated = ({ data = {}, isDemo = false }) => {
  const containerRef = useRef(null);

  // Language & Font resolution
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;
  const fontClasses = lang === "mr" ? {
    heading: "font-['Yatra_One']",
    body: "font-['Tiro_Devanagari_Marathi']",
    quote: "font-['Kalam']",
  } : {
    heading: "font-serif",
    body: "font-serif",
    quote: "italic font-serif",
  };

  // Synchronize dynamic language state if data changes
  useEffect(() => {
    if (data.language) {
      setCurrentLang(data.language);
    }
  }, [data.language]);

  // Name translation helpers for seamless toggles
  const getGroomName = () => {
    const raw = data.groomName || "Rahul";
    if (lang === "mr") {
      if (raw.toLowerCase() === "rahul") return "राहुल";
      return raw;
    } else {
      if (raw === "राहुल") return "Rahul";
      return raw;
    }
  };

  const getBrideName = () => {
    const raw = data.brideName || "Priya";
    if (lang === "mr") {
      if (raw.toLowerCase() === "priya") return "प्रिया";
      return raw;
    } else {
      if (raw === "प्रिया") return "Priya";
      return raw;
    }
  };

  // Translation helpers for default values
  const getWelcomeMessage = () => {
    const raw = data.welcomeMessage || "";
    if (lang === "mr") {
      if (raw.includes("We request the honor of your presence") || raw.includes("request the honor of your presence")) {
        return t.defaultWelcomeMsg;
      }
      return raw;
    } else {
      if (raw.includes("नव्या स्वप्नांसह") || raw.includes("शुभ विवाह सोहळ्यास")) {
        return t.defaultWelcomeMsg;
      }
      return raw;
    }
  };

  const getFamilyDetails = () => {
    const raw = data.familyDetails || "";
    if (lang === "mr") {
      if (raw.toLowerCase().includes("deshmukh") && raw.toLowerCase().includes("patil")) {
        return "देशमुख आणि पाटील कुटुंब";
      }
      return raw;
    } else {
      if (raw.includes("देशमुख") && raw.includes("पाटील")) {
        return "Deshmukh & Patil Families";
      }
      return raw;
    }
  };

  const getVenueName = () => {
    const raw = data.venueName || "";
    if (lang === "mr") {
      if (raw.toLowerCase() === "maratha durbar hall") return "मराठा दरबार हॉल";
      return raw;
    } else {
      if (raw === "मराठा दरबार हॉल") return "Maratha Durbar Hall";
      return raw;
    }
  };

  const getVenueAddress = () => {
    const raw = data.venueAddress || "";
    if (lang === "mr") {
      if (raw.toLowerCase().includes("jm road") || raw.toLowerCase().includes("shivajinagar")) {
        return "जे. एम. रोड, शिवाजीनगर, पुणे";
      }
      return raw;
    } else {
      if (raw.includes("जे. एम. रोड") || raw.includes("शिवाजीनगर")) {
        return "JM Road, Shivajinagar, Pune";
      }
      return raw;
    }
  };

  // Animation Control States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Akshata Shower States
  const [showAkshata, setShowAkshata] = useState(false);
  const [akshataGrains, setAkshataGrains] = useState([]);

  // Audio Control States
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioUrl = data.bgMusic || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Helper to subtract days and format date
  const getPreDate = (dateStr, daysBefore) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      d.setDate(d.getDate() - daysBefore);
      return d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to map title or custom string to Lucide icon
  const getEventIcon = (title = "", iconHint = "") => {
    const hint = (iconHint || title).toLowerCase();

    if (hint.includes("haldi") || hint.includes("हळद") || hint.includes("sun") || hint.includes("morning")) {
      return <Sun className="text-amber-400" size={16} />;
    }
    if (hint.includes("sangeet") || hint.includes("संगीत") || hint.includes("music") || hint.includes("dj") || hint.includes("dance") || hint.includes("singing")) {
      return <Music className="text-amber-400 animate-pulse" size={16} style={{ animationDuration: "3s" }} />;
    }
    if (hint.includes("reception") || hint.includes("जेवण") || hint.includes("भोजन") || hint.includes("dinner") || hint.includes("lunch") || hint.includes("food") || hint.includes("feast")) {
      return <Utensils className="text-amber-400" size={16} />;
    }
    if (hint.includes("spark") || hint.includes("ring") || hint.includes("engagement") || hint.includes("साखरपुडा")) {
      return <Sparkles className="text-amber-400" size={16} />;
    }
    return <Heart className="text-amber-400 fill-amber-400/20" size={16} />;
  };

  // Main event list parser
  const parsedEvents = (() => {
    if (data.eventsList && data.eventsList.trim() !== "") {
      return data.eventsList.split(";;").map((eventStr) => {
        const parts = eventStr.split("|").map((p) => p.trim());
        return {
          title: parts[0] || "समारंभ",
          time: parts[1] || "",
          venue: parts[2] || "",
          address: parts[3] || "",
        };
      });
    }

    // Default Marathi Traditional Wedding Timeline Fallback
    const baseDateStr = data.weddingDate || "Nov 20, 2026";
    const prevDateFormatted = getPreDate(baseDateStr, 1);
    const mainDateFormatted = getPreDate(baseDateStr, 0);

    return [
      {
        title: `${t.haldiTitle}`,
        date: prevDateFormatted,
        time: lang === "mr" ? "सकाळी ०९:०० वाजता" : "9:00 AM",
        venue: lang === "mr" ? "वधू / वराच्या निवासस्थानी" : "Bride / Groom's Residence",
        address: lang === "mr" ? "आपल्या घरी आणि कौटुंबिक वातावरणात" : "At home in a family gathering",
        icon: "sun",
      },
      {
        title: `${t.sangeetTitle}`,
        date: prevDateFormatted,
        time: lang === "mr" ? "संध्याकाळी ०६:०० वाजता" : "6:00 PM",
        venue: getVenueName() || (lang === "mr" ? "मराठा दरबार हॉल" : "Maratha Durbar Hall"),
        address: getVenueAddress() || "JM Road, Shivajinagar, Pune",
        icon: "music",
      },
      {
        title: `${t.weddingTitle}`,
        date: mainDateFormatted,
        time: data.weddingTime || (lang === "mr" ? "सकाळी ११:३० वाजता" : "11:30 AM"),
        venue: getVenueName() || (lang === "mr" ? "मराठा दरबार हॉल" : "Maratha Durbar Hall"),
        address: getVenueAddress() || "JM Road, Shivajinagar, Pune",
        icon: "heart",
      },
      {
        title: `${t.receptionTitle}`,
        date: mainDateFormatted,
        time: lang === "mr" ? "संध्याकाळी ०७:०० वाजता" : "7:00 PM",
        venue: getVenueName() || (lang === "mr" ? "मराठा दरबार हॉल" : "Maratha Durbar Hall"),
        address: getVenueAddress() || "JM Road, Shivajinagar, Pune",
        icon: "utensils",
      },
    ];
  })();

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetTime = useMemo(() => {
    return data.weddingDate ? new Date(data.weddingDate).getTime() : Date.now() + 1000 * 60 * 60 * 24 * 45;
  }, [data.weddingDate]);

  // Handle countdown tick
  useEffect(() => {
    const calculateTime = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Handle custom scroll locking and kinetic scrollProgress tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isUnlocked) {
        if (container.scrollTop === 0 && e.deltaY < 0) {
          setIsUnlocked(false);
          e.preventDefault();
        } else {
          return;
        }
      }

      e.preventDefault();
      
      const sensitivity = 0.002; // Smooth cinematic progress rate
      const delta = e.deltaY * sensitivity;

      setScrollProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + delta));
        if (next >= 1) {
          setIsUnlocked(true);
        }
        return next;
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isUnlocked]);

  // Handle Swipe triggers for Mobile
  const touchStartY = useRef(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isUnlocked) {
        if (container.scrollTop === 0) {
          const currentY = e.touches[0].clientY;
          const deltaY = touchStartY.current - currentY;
          if (deltaY < 0) {
            setIsUnlocked(false);
            e.preventDefault();
          } else {
            return;
          }
        } else {
          return;
        }
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;

      e.preventDefault();
      const sensitivity = 0.003;
      const delta = deltaY * sensitivity;

      setScrollProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + delta));
        if (next >= 1) {
          setIsUnlocked(true);
        }
        return next;
      });
      touchStartY.current = currentY;
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isUnlocked]);

  // Audio Playback toggler
  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio block: " + err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === "mr" ? "en" : "mr"));
  };


  // Akshata colors: golden yellow, saffron, vermilion red, gulal pink, rice cream
  const akshataColors = ["#fcd34d", "#f59e0b", "#ef4444", "#ec4899", "#fef3c7"];

  // Sub-progress mapping for two-stage scroll animation:
  // Stage 1: Welcome text fades out from progress 0 to 0.3
  const welcomeOpacity = Math.max(0, 1 - (scrollProgress / 0.3));

  // Stage 2: Bride & Groom slide in from progress 0.3 to 1.0
  const slideProgress = scrollProgress < 0.3 ? 0 : (scrollProgress - 0.3) / 0.7;
  const coupleOpacity = Math.min(1, slideProgress / 0.15);

  // Generate akshata grains when couple meets
  useEffect(() => {
    if (slideProgress >= 0.95 && !showAkshata) {
      setShowAkshata(true);
      const grains = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,           // horizontal position %
        size: 3 + Math.random() * 5,          // grain size px
        delay: Math.random() * 3,             // stagger delay
        duration: 2.5 + Math.random() * 2.5,  // fall speed
        color: akshataColors[Math.floor(Math.random() * akshataColors.length)],
        sway: Math.random() > 0.5 ? "sway-left" : "sway-right",
        rotation: Math.floor(Math.random() * 360),
      }));
      setAkshataGrains(grains);
    } else if (slideProgress < 0.95 && showAkshata) {
      setShowAkshata(false);
      setAkshataGrains([]);
    }
  }, [slideProgress, showAkshata]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: isUnlocked ? "auto" : "hidden",
        minHeight: "100vh",
        height: isUnlocked ? "auto" : "100vh",
      }}
      className="w-full bg-[#6b0606] text-amber-100 font-serif relative scroll-smooth flex flex-col overflow-x-hidden select-none selection:bg-amber-500 selection:text-[#6b0606]"
    >
      {/* Akshata Shower CSS Keyframes */}
      <style>{`
        @keyframes akshata-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(calc(100vh + 20px)) rotate(720deg); opacity: 0; }
        }
        @keyframes sway-left {
          0%, 100% { margin-left: 0; }
          25% { margin-left: -15px; }
          75% { margin-left: 10px; }
        }
        @keyframes sway-right {
          0%, 100% { margin-left: 0; }
          25% { margin-left: 15px; }
          75% { margin-left: -10px; }
        }
        @keyframes slideFromRight {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromLeft {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes sanaiVadhakEntrance {
          0% { transform: scale(0.6) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes sanaiMusicalSway {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-2.5deg) translateY(-3px); }
          75% { transform: rotate(2.5deg) translateY(2px); }
        }
        @keyframes cardUnfold3D {
          0% { transform: translateY(35px) scale(0.96); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes clockSpin {
          0% { transform: rotate(-360deg) scale(0.6); opacity: 0; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes boxFlipDown {
          0% { transform: translateY(15px) scale(0.92); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes namastePranam {
          0% { transform: translateY(-20px) scale(0.7); opacity: 0; }
          40% { transform: translateY(8px) rotate(-5deg) scale(1.05); opacity: 1; }
          70% { transform: translateY(-4px) rotate(2deg) scale(0.98); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        }
        @keyframes borderDraw {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>

      {/* Background Floral Gold Ornament Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#fcd34d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Gold Frame Lines around the screen viewport */}
      <div className="absolute inset-4 border border-amber-400/25 pointer-events-none rounded-2xl z-20" />

      {/* Golden Corner Floral Ornaments */}
      <FloralCorner className="absolute top-4 right-4 rotate-90 z-20" />
      <FloralCorner className="absolute bottom-4 left-4 -rotate-90 z-20" />

      {/* Floating Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 left-6 z-50 w-9 h-9 rounded-full bg-amber-500 text-[#540303] shadow-lg cursor-pointer hover:bg-amber-400 hover:scale-105 transition-all border border-amber-300/30 flex items-center justify-center font-sans font-bold text-xs"
        title="Toggle Language / भाषा बदला"
      >
        {lang === "mr" ? "EN" : "म"}
      </button>

      {/* Floating Audio Trigger */}
      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-amber-500 text-[#540303] shadow-lg cursor-pointer hover:bg-amber-400 hover:scale-105 transition-all border border-amber-300/30"
        title="Toggle Music"
      >
        {isPlaying ? <Volume2 size={16} className="animate-bounce" /> : <VolumeX size={16} />}
      </button>

      {/* STAGE 1: The Pinned Meeting Animation Fold */}
      <div className="w-full min-h-screen h-screen shrink-0 relative flex flex-col justify-between items-center p-6 pb-12">
        
        {/* Akshata (Colored Rice) Shower Overlay - Full Stage 1 coverage */}
        {showAkshata && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-40">
            {akshataGrains.map((grain) => (
              <div
                key={grain.id}
                style={{
                  position: "absolute",
                  left: `${grain.left}%`,
                  top: "-10px",
                  width: `${grain.size}px`,
                  height: `${grain.size * 1.8}px`,
                  backgroundColor: grain.color,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  opacity: 0.85,
                  transform: `rotate(${grain.rotation}deg)`,
                  animation: `akshata-fall ${grain.duration}s ${grain.delay}s linear infinite, ${grain.sway} ${grain.duration * 0.8}s ${grain.delay}s ease-in-out infinite`,
                  boxShadow: `0 0 3px ${grain.color}60`,
                }}
              />
            ))}
          </div>
        )}

        {/* Welcome Section (Centered absolutely in the viewport) */}
        <div
          style={{
            opacity: welcomeOpacity,
            display: welcomeOpacity > 0 ? "flex" : "none",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10 transition-all duration-350"
        >
          <div className="space-y-4">
            {/* Rotating Ganesh Banner */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto mb-2">
              <img
                src="/wedding/back.png"
                alt="Mandala Background"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ animation: "spin 20s linear infinite" }}
              />
              <img
                src="/wedding/ganesh.png"
                alt="Ganesh"
                className="w-12 h-12 md:w-14 md:h-14 object-contain z-10 relative pointer-events-none"
              />
            </div>

            <span className={`text-[10px] uppercase font-bold tracking-widest text-amber-300 border-y border-amber-400/30 py-1.5 px-6 ${fontClasses.body}`}>
              {t.invitationTitle}
            </span>
            <h2 className={`text-5xl md:text-6xl font-extrabold text-amber-100 mt-2 leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${fontClasses.heading}`}>
              {t.welcome}
            </h2>
            <p className={`text-xs text-amber-200/85 ${fontClasses.quote}`}>
              {t.welcomeSubtitle}
            </p>
          </div>
        </div>

        {/* Meeting Illustrative Zone (Flex element in the middle of Stage 1) */}
        <div className="flex-1 w-full flex items-center justify-center relative my-2 mt-28 pt-12 sm:pt-16">
          
          {/* Groom Container (slides from right to 13.5vw relative to center for subtle side-by-side spacing) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${35 - 21.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute bottom-[-115px] sm:bottom-[-95px]"
          >
            <GroomIllustration />
          </div>

          {/* Bride Container (slides from left to -13.5vw relative to center for subtle side-by-side spacing) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${-35 + 21.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute bottom-[-115px] sm:bottom-[-95px]"
          >
            <BrideIllustration />
          </div>

          {/* Meeting Hearts effect (Above the couple's heads) */}
          <div
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
              opacity: slideProgress >= 0.95 ? 1 : 0,
              transform: `scale(${slideProgress >= 0.95 ? 1 : 0.5})`,
            }}
            className="absolute bottom-[300px] sm:bottom-[230px] md:bottom-[290px] z-30 text-amber-400 flex items-center justify-center"
          >
           
            <Heart fill="currentColor" size={26} className="absolute animate-ping opacity-75" />
          </div>
        </div>

        {/* Revealed Names Section (Positioned stable BELOW the couple) */}
        <div className="w-full max-w-md flex flex-col items-center justify-center min-h-[140px] mt-2 mb-2 z-20">
          <div
            style={{
              transition: "opacity 0.6s ease, transform 0.6s ease",
              opacity: slideProgress >= 0.95 ? 1 : 0,
              transform: `translateY(${slideProgress >= 0.95 ? 0 : 15}px)`,
            }}
            className="text-center space-y-3"
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-amber-100 border-b-2 border-amber-400/40 pb-3 px-2 sm:px-8 whitespace-nowrap drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)] tracking-wide leading-tight ${fontClasses.heading}`}>
              {getGroomName()} & {getBrideName()}
            </h1>
            
            <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-300/90 mt-2 animate-pulse ${fontClasses.body}`} style={{ animationDuration: '4s' }}>
              {t.gettingMarried}
            </p>
            
            <p className={`text-[10px] sm:text-[11px] text-amber-200/75 max-w-[280px] mx-auto leading-relaxed ${fontClasses.quote}`}>
              {t.loveQuote}
            </p>
            
            <div className={`flex items-center justify-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest pt-1 ${fontClasses.body}`}>
              <Calendar size={14} className="text-amber-400" />
              <span>{data.weddingDate || "Nov 20, 2026"}</span>
            </div>
          </div>
        </div>

        {/* Navigation Indicator Row */}
        <div className="h-10 flex items-center justify-center mb-2 z-20">
          {!isUnlocked && (
            <div className={`text-[10px] text-amber-300 font-bold uppercase tracking-widest flex flex-col items-center gap-1.5 animate-bounce ${fontClasses.body}`}>
              <span>{t.scrollDown}</span>
              <ArrowDown size={12} className="text-amber-400" />
            </div>
          )}
        </div>

      </div>

      {/* STAGE 2: Unlocked Invitation Contents */}
      {isUnlocked && (
        <div className="w-full flex-1 flex flex-col space-y-12 py-12 px-6 max-w-md mx-auto z-10 relative">

          {/* 1. Saved The Date Countdown Card */}
          <AnimatedCountdownCard
            timeLeft={timeLeft}
            t={t}
            fontClasses={fontClasses}
          />

          {/* 2. Welcome Message Card */}
          <AnimatedGreetingsCard
            t={t}
            getWelcomeMessage={getWelcomeMessage}
            getFamilyDetails={getFamilyDetails}
            fontClasses={fontClasses}
          />

          {/* 2.5 Multi-Event Timeline Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 shadow-xl space-y-6 overflow-hidden">
            <div className="text-center space-y-0.5">
              <TransparentSanaiVadhak className="h-32 sm:h-40 md:h-44 w-auto mx-auto object-contain -mt-2 -mb-4 sm:-mb-6 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />
              <h3 className={`text-lg font-bold text-amber-100 ${fontClasses.heading}`}>{t.eventTimeline}</h3>
              <p className={`text-[10px] uppercase tracking-widest text-amber-400/80 ${fontClasses.body}`}>{t.eventTimelineSub}</p>
            </div>

            <div className="relative pl-2 space-y-6">
              {/* Vertical line connecting timeline events */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-400/60 via-amber-500/40 to-amber-700/20 pointer-events-none" />

              {parsedEvents.map((event, idx) => (
                <AnimatedTimelineItem
                  key={idx}
                  event={event}
                  idx={idx}
                  fontClasses={fontClasses}
                  getEventIcon={getEventIcon}
                />
              ))}
            </div>
          </div>

          {/* 3. Ceremony Details Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <MapPin className="text-amber-400 mx-auto" size={24} />
            <h3 className={`text-lg font-bold text-amber-100 ${fontClasses.heading}`}>{t.ceremonyDetails}</h3>
            
            <div className={`space-y-1 text-sm text-amber-200 ${fontClasses.body}`}>
              <p className="font-bold text-amber-300">{t.time}: {data.weddingTime || (lang === "mr" ? "सकाळी ११:३० वाजता" : "11:30 AM onwards")}</p>
              <p className="mt-1 font-semibold">{getVenueName() || (lang === "mr" ? "मराठा दरबार हॉल" : "Maratha Durbar Hall")}</p>
              <p className="text-xs text-amber-300/80 px-4">
                {getVenueAddress() || "JM Road, Shivajinagar, Pune"}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-500/10 mt-4">
              <InteractiveMap
                destinationAddress={getVenueAddress() || "JM Road, Shivajinagar, Pune"}
                destinationName={getVenueName() || "Maratha Durbar Hall"}
              />
            </div>

            {data.mapsLink && (
              <div className="pt-2">
                <a
                  href={data.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#540303] rounded-full text-xs font-black transition-all shadow-md cursor-pointer border-0 ${fontClasses.body}`}
                >
                  <MapPin size={12} />
                  <span>{t.navigateMaps}</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer Logo */}
          <div className="text-center pt-8 space-y-1">
            <span className={`text-[9px] uppercase font-bold tracking-widest text-amber-300/40 ${fontClasses.body}`}>{t.poweredBy}</span>
            <h4 className={`text-xs font-bold text-amber-200 tracking-wider ${fontClasses.body}`}>Momenta Experiences</h4>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeddingAnimated;