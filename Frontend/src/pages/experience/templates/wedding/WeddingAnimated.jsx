import React, { useState, useEffect, useRef } from "react";
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

// Groom Illustration using public assets (no circular frame, balanced height with scale)
const GroomIllustration = () => (
  <img
    src="/wedding/groom.png"
    alt="Groom"
    className="h-[180px] md:h-[240px] object-contain scale-[1.2] origin-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
  />
);

// Bride Illustration using public assets (no circular frame, balanced height with scale)
const BrideIllustration = () => (
  <img
    src="/wedding/bride.png"
    alt="Bride"
    className="h-[180px] md:h-[240px] object-contain scale-[1.2] origin-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
  />
);

const WeddingAnimated = ({ data = {}, isDemo = false }) => {
  const containerRef = useRef(null);

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
        title: "हळदी समारंभ (Haldi Ceremony)",
        date: prevDateFormatted,
        time: "सकाळी ०९:०० वाजता",
        venue: "वधू / वराच्या निवासस्थानी",
        address: "आपल्या घरी आणि कौटुंबिक वातावरणात",
        icon: "sun",
      },
      {
        title: "मेहंदी व संगीत (Sangeet Ceremony)",
        date: prevDateFormatted,
        time: "संध्याकाळी ०६:०० वाजता",
        venue: data.venueName || "मराठा दरबार हॉल",
        address: data.venueAddress || "JM Road, Shivajinagar, Pune",
        icon: "music",
      },
      {
        title: "शुभ विवाह (Wedding Ceremony)",
        date: mainDateFormatted,
        time: data.weddingTime || "सकाळी ११:३० वाजता",
        venue: data.venueName || "मराठा दरबार हॉल",
        address: data.venueAddress || "JM Road, Shivajinagar, Pune",
        icon: "heart",
      },
      {
        title: "स्वागत समारंभ (Reception)",
        date: mainDateFormatted,
        time: "संध्याकाळी ०७:०० वाजता",
        venue: data.venueName || "मराठा दरबार हॉल",
        address: data.venueAddress || "JM Road, Shivajinagar, Pune",
        icon: "utensils",
      },
    ];
  })();

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const eventDate = data.weddingDate ? new Date(data.weddingDate) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 45); // Default 45 days out

  // Handle countdown tick
  useEffect(() => {
    const calculateTime = () => {
      const difference = +eventDate - +new Date();
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
  }, [eventDate]);

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
        height: "100%",
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
      `}</style>

      {/* Background Floral Gold Ornament Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#fcd34d_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Gold Frame Lines around the screen viewport */}
      <div className="absolute inset-4 border border-amber-400/25 pointer-events-none rounded-2xl z-20" />

      {/* Golden Corner Floral Ornaments */}
      <FloralCorner className="absolute top-4 right-4 rotate-90 z-20" />
      <FloralCorner className="absolute bottom-4 left-4 -rotate-90 z-20" />

      {/* Floating Audio Trigger */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-amber-500 text-[#540303] shadow-lg cursor-pointer hover:bg-amber-400 hover:scale-105 transition-all border border-amber-300/30"
        title="Toggle Music"
      >
        {isPlaying ? <Volume2 size={16} className="animate-bounce" /> : <VolumeX size={16} />}
      </button>

      {/* STAGE 1: The Pinned Meeting Animation Fold */}
      <div className="w-full h-full shrink-0 relative flex flex-col justify-between items-center p-6 pb-12">
        
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

            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 border-y border-amber-400/30 py-1.5 px-6">
              निमंत्रणपत्रिका
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-amber-100 mt-2 leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              WELCOME
            </h2>
            <p className="text-xs text-amber-200/85 italic">
              To the Celebration of Love & Togetherness
            </p>
          </div>
        </div>

        {/* Meeting Illustrative Zone (Flex element in the middle of Stage 1) */}
        <div className="flex-1 w-full flex items-center justify-center relative my-4 mt-20">
          
          {/* Groom Container (slides from right to 1.5vw relative to center) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${35 - 32.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute bottom-0"
          >
            <GroomIllustration />
          </div>

          {/* Bride Container (slides from left to -1.5vw relative to center) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${-35 + 32.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute bottom-0"
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
            className="absolute bottom-[100px] md:bottom-[220px] z-30 text-amber-400 flex items-center justify-center"
          >
           
            <Heart fill="currentColor" size={26} className="absolute animate-ping opacity-75" />
          </div>
        </div>

        {/* Revealed Names Section (Positioned stable BELOW the couple) */}
        <div className="w-full max-w-md flex flex-col items-center justify-center min-h-[140px] mb-4 z-20">
          <div
            style={{
              transition: "opacity 0.6s ease, transform 0.6s ease",
              opacity: slideProgress >= 0.95 ? 1 : 0,
              transform: `translateY(${slideProgress >= 0.95 ? 0 : 15}px)`,
            }}
            className="text-center space-y-3"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-amber-100 border-b border-amber-400/25 pb-2 px-4 sm:px-8 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {data.groomName || "Rahul"} & {data.brideName || "Priya"}
            </h1>
            
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-300/90 font-serif mt-2 animate-pulse" style={{ animationDuration: '4s' }}>
              Are Getting Married
            </p>
            
            <p className="text-[10px] sm:text-[11px] text-amber-200/75 italic font-serif max-w-[280px] mx-auto leading-relaxed">
              "Two hearts, one beautiful journey, and a lifetime of love waiting to be written together."
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest pt-1">
              <Calendar size={14} className="text-amber-400" />
              <span>{data.weddingDate || "Nov 20, 2026"}</span>
            </div>
          </div>
        </div>

        {/* Navigation Indicator Row */}
        <div className="h-12 flex items-center justify-center mb-6 z-20">
          {!isUnlocked && (
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-widest flex flex-col items-center gap-1.5 animate-bounce">
              <span>Scroll Down</span>
              <ArrowDown size={12} className="text-amber-400" />
            </div>
          )}
        </div>

      </div>

      {/* STAGE 2: Unlocked Invitation Contents */}
      {isUnlocked && (
        <div className="w-full flex-1 flex flex-col space-y-12 py-12 px-6 max-w-md mx-auto z-10 relative">

          {/* 1. Saved The Date Countdown Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 text-center shadow-xl">
            <Clock className="text-amber-400 mx-auto mb-2" size={24} />
            <h3 className="text-xs uppercase font-bold tracking-widest text-amber-300 mb-4">Celebration Starts In</h3>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#310202] p-2.5 rounded-xl border border-amber-500/15">
                <span className="block text-xl font-bold text-amber-200">{timeLeft.days}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400/70">Days</span>
              </div>
              <div className="bg-[#310202] p-2.5 rounded-xl border border-amber-500/15">
                <span className="block text-xl font-bold text-amber-200">{timeLeft.hours}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400/70">Hours</span>
              </div>
              <div className="bg-[#310202] p-2.5 rounded-xl border border-amber-500/15">
                <span className="block text-xl font-bold text-amber-200">{timeLeft.minutes}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400/70">Mins</span>
              </div>
              <div className="bg-[#310202] p-2.5 rounded-xl border border-amber-500/15">
                <span className="block text-xl font-bold text-amber-200">{timeLeft.seconds}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400/70">Secs</span>
              </div>
            </div>
          </div>

          {/* 2. Welcome Message Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-8 text-center shadow-xl space-y-4">
            <Heart className="text-amber-400 fill-amber-400/5 mx-auto" size={24} />
            <h3 className="text-lg font-bold text-amber-100 font-serif">Greetings</h3>
            <p className="text-sm text-amber-200 leading-relaxed font-serif">
              {data.welcomeMessage ||
                "With new dreams, new hopes, and a new desire, we request the honor of your presence to witness the celebration of our union."}
            </p>
            {data.familyDetails && (
              <div className="pt-4 border-t border-amber-500/15 text-xs">
                <span className="block text-amber-600 font-bold uppercase tracking-wider mb-1">With Love From</span>
                <span className="text-amber-100 font-bold font-serif">{data.familyDetails}</span>
              </div>
            )}
          </div>

          {/* 2.5 Multi-Event Timeline Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="text-center space-y-1">
              <Sparkles className="text-amber-400 mx-auto" size={24} />
              <h3 className="text-lg font-bold text-amber-100 font-serif">कार्यक्रम पत्रिका</h3>
              <p className="text-[10px] uppercase tracking-widest text-amber-400/80">Event Timeline</p>
            </div>

            <div className="relative pl-2 space-y-6">
              {/* Vertical line connecting timeline events */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-amber-500/50 via-amber-500/30 to-amber-500/10 pointer-events-none" />

              {parsedEvents.map((event, idx) => (
                <div key={idx} className="relative pl-10 group transition-all duration-300">
                  {/* Event Node Dot/Icon */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#310202] border border-amber-500/40 flex items-center justify-center shadow-md z-10 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {getEventIcon(event.title)}
                  </div>

                  {/* Event Details Card */}
                  <div className="bg-[#310202]/50 border border-amber-500/10 rounded-2xl p-4 space-y-1.5 group-hover:bg-[#310202]/80 group-hover:border-amber-500/30 transition-all duration-300">
                    <h4 className="text-sm font-bold text-amber-100 group-hover:text-amber-300 transition-colors duration-300">
                      {event.title}
                    </h4>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs font-semibold text-amber-400">
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
                      <p className="text-xs text-amber-200/80 font-serif font-semibold mt-1">
                        📍 {event.venue}
                      </p>
                    )}

                    {event.address && (
                      <p className="text-[11px] text-amber-200/50 font-serif leading-relaxed pl-4">
                        {event.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Ceremony Details Card */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 shadow-xl text-center space-y-4">
            <MapPin className="text-amber-400 mx-auto" size={24} />
            <h3 className="text-lg font-bold text-amber-100 font-serif">Ceremony Details</h3>
            
            <div className="space-y-1 text-sm text-amber-200">
              <p className="font-bold text-amber-300">Time: {data.weddingTime || "11:30 AM onwards"}</p>
              <p className="font-serif mt-1 font-semibold">{data.venueName || "Maratha Durbar Hall"}</p>
              <p className="text-xs text-amber-300/80 font-serif px-4">
                {data.venueAddress || "JM Road, Shivajinagar, Pune"}
              </p>
            </div>

            <div className="pt-2 border-t border-amber-500/10 mt-4">
              <InteractiveMap
                destinationAddress={data.venueAddress || "JM Road, Shivajinagar, Pune"}
                destinationName={data.venueName || "Maratha Durbar Hall"}
              />
            </div>

            {data.mapsLink && (
              <div className="pt-2">
                <a
                  href={data.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#540303] rounded-full text-xs font-black transition-all shadow-md cursor-pointer border-0"
                >
                  <MapPin size={12} />
                  <span>Navigate with Maps</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer Logo */}
          <div className="text-center pt-8 space-y-1">
            <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300/40">Powered By</span>
            <h4 className="text-xs font-bold text-amber-200 tracking-wider">Momenta Experiences</h4>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeddingAnimated;