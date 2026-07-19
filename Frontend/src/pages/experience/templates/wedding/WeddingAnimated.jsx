import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../../../context/AppContext";
import { Heart, Calendar, MapPin, Music, Send, CheckCircle2, MessageSquare, Clock, ArrowDown, Volume2, VolumeX } from "lucide-react";
import PremiumAudioPlayer from "../../../../components/common/PremiumAudioPlayer";

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

// Groom Illustration using public assets (no circular frame, balanced height)
const GroomIllustration = () => (
  <img
    src="/wedding/groom.png"
    alt="Groom"
    className="h-[260px] md:h-[340px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
  />
);

// Bride Illustration using public assets (no circular frame, balanced height)
const BrideIllustration = () => (
  <img
    src="/wedding/bride.png"
    alt="Bride"
    className="h-[260px] md:h-[340px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
  />
);

const WeddingAnimated = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  const containerRef = useRef(null);

  // Animation Control States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Audio Control States
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioUrl = data.bgMusic || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // RSVP Form States
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState("attending");
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

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

  // RSVP Form submission
  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const rsvpObj = {
      name: guestName,
      count: Number(guestCount),
      status: rsvpStatus,
      message: guestMessage,
    };

    if (!isDemo && data.slug) {
      addRSVPToExperience(data.slug, rsvpObj);
    }
    setRsvpSubmitted(true);
  };

  // Sub-progress mapping for two-stage scroll animation:
  // Stage 1: Welcome text fades out from progress 0 to 0.3
  const welcomeOpacity = Math.max(0, 1 - (scrollProgress / 0.3));

  // Stage 2: Bride & Groom slide in from progress 0.3 to 1.0
  const slideProgress = scrollProgress < 0.3 ? 0 : (scrollProgress - 0.3) / 0.7;
  const coupleOpacity = Math.min(1, slideProgress / 0.15);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: isUnlocked ? "auto" : "hidden",
        height: "100%",
      }}
      className="w-full bg-[#6b0606] text-amber-100 font-serif relative scroll-smooth flex flex-col overflow-x-hidden selection:bg-amber-500 selection:text-[#6b0606]"
    >
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
      <div className="w-full h-full min-h-screen shrink-0 relative flex flex-col justify-between items-center p-6 pb-12">
        
        {/* Welcome Section (Centered absolutely in the viewport) */}
        <div
          style={{
            opacity: welcomeOpacity,
            display: welcomeOpacity > 0 ? "flex" : "none",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10 transition-all duration-350"
        >
          <div className="space-y-4">
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
        <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden my-4 mt-20">
          
          {/* Groom Container (slides from right to 3.5vw relative to center) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${35 - 31.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute"
          >
            <GroomIllustration />
          </div>

          {/* Bride Container (slides from left to -3.5vw relative to center) */}
          <div
            style={{
              transition: "transform 0.25s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease",
              transform: `translateX(${-35 + 31.5 * slideProgress}vw)`,
              opacity: coupleOpacity,
            }}
            className="absolute"
          >
            <BrideIllustration />
          </div>

          {/* Meeting Hearts effect */}
          <div
            style={{
              transition: "opacity 0.5s ease, transform 0.5s ease",
              opacity: slideProgress >= 0.95 ? 1 : 0,
              transform: `scale(${slideProgress >= 0.95 ? 1 : 0.5})`,
            }}
            className="absolute z-30 animate-ping text-amber-400"
          >
            <Heart fill="currentColor" size={28} />
          </div>
        </div>

        {/* Revealed Names Section (Positioned stable BELOW the couple) */}
        <div className="w-full max-w-sm flex flex-col items-center justify-center min-h-[140px] mb-4 z-20">
          <div
            style={{
              transition: "opacity 0.6s ease, transform 0.6s ease",
              opacity: slideProgress >= 0.95 ? 1 : 0,
              transform: `translateY(${slideProgress >= 0.95 ? 0 : 15}px)`,
            }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-amber-100 border-b border-amber-400/25 pb-2 px-8 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {data.groomName || "Rahul"} & {data.brideName || "Priya"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
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

          {/* 4. RSVP Submission Form */}
          <div className="bg-[#4d0404]/95 border border-amber-500/25 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="text-center">
              <MessageSquare className="text-amber-700 mx-auto mb-1.5" size={24} />
              <h3 className="text-lg font-bold text-amber-900 font-serif">Will You Join Us?</h3>
              <p className="text-xs text-amber-700/80">Please register your attendance registry</p>
            </div>

            {rsvpSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="text-emerald-400 mx-auto" size={28} />
                <h4 className="text-sm font-bold text-emerald-300">Attendance Registered!</h4>
                <p className="text-xs text-emerald-400/80">Thank you for sharing your love with us.</p>
              </div>
            ) : (
              <form onSubmit={handleRSVPSubmit} className="space-y-3.5 text-xs text-amber-100">
                <div className="space-y-1">
                  <label className="block font-bold text-amber-300">Your Name / कुटुंबियांचे नाव</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full px-3 py-2 border border-amber-500/20 rounded-xl bg-[#310202] focus:outline-none focus:border-amber-400 font-serif text-amber-100 placeholder:text-amber-200/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-amber-300">Total Guests</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-500/20 rounded-xl bg-[#310202] focus:outline-none focus:border-amber-400 text-amber-100"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-[#310202]">
                          {num} {num === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-amber-300">RSVP Status</label>
                    <select
                      value={rsvpStatus}
                      onChange={(e) => setRsvpStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-500/20 rounded-xl bg-[#310202] focus:outline-none focus:border-amber-400 text-amber-100"
                    >
                      <option value="attending" className="bg-[#310202]">Attending</option>
                      <option value="maybe" className="bg-[#310202]">Maybe</option>
                      <option value="declined" className="bg-[#310202]">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-amber-300">Wishes Message (Optional)</label>
                  <textarea
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Send your warm blessings..."
                    rows={3}
                    className="w-full px-3 py-2 border border-amber-500/20 rounded-xl bg-[#310202] focus:outline-none focus:border-amber-600 font-serif resize-none text-amber-100 placeholder:text-amber-200/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-[#540303] rounded-xl font-black flex items-center justify-center gap-1.5 shadow-md hover:scale-101 transition-all cursor-pointer border-0 text-xs"
                >
                  <Send size={12} />
                  <span>Submit RSVP</span>
                </button>
              </form>
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