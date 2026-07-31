import React, { useState, useEffect, useRef } from "react";
import { Heart, Mail, Sparkles, Volume2, VolumeX, Lock, Unlock, ArrowRight, RefreshCw, Smile, Gift, Award, Music, Stars, Flame, Compass } from "lucide-react";

// ==========================================
// CUSTOM RICH SVG VECTOR GRAPHICS
// ==========================================
const CrownSvg = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M2 19H22V21H2V19ZM2 17L5 7L9 12L12 4L15 12L19 7L22 17H2Z" fill="url(#goldCrownGrad)" />
    <circle cx="5" cy="6" r="1.5" fill="#FFF" />
    <circle cx="12" cy="3" r="1.5" fill="#FFF" />
    <circle cx="19" cy="6" r="1.5" fill="#FFF" />
  </svg>
);

const CakeSvg = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cakeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="50%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#9F1239" />
      </linearGradient>
      <linearGradient id="icingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <filter id="flameGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Base Layer */}
    <rect x="8" y="38" width="48" height="20" rx="4" fill="url(#cakeBodyGrad)" />
    <path d="M8 44C12 47 16 44 20 47C24 44 28 47 32 44C36 47 40 44 44 47C48 44 52 47 56 44V38H8V44Z" fill="url(#icingGrad)" />
    {/* Top Layer */}
    <rect x="14" y="24" width="36" height="15" rx="3" fill="#BE123C" />
    <path d="M14 29C18 31 22 29 26 31C30 29 34 31 38 29C42 31 46 29 50 29V24H14V29Z" fill="#FCD34D" />
    {/* Candles */}
    <rect x="22" y="14" width="3" height="10" rx="1" fill="#60A5FA" />
    <rect x="31" y="12" width="3" height="12" rx="1" fill="#F472B6" />
    <rect x="40" y="14" width="3" height="10" rx="1" fill="#34D399" />
    {/* Flickering Flames */}
    <circle cx="23.5" cy="11" r="3" fill="#F59E0B" filter="url(#flameGlow)" className="animate-pulse" />
    <circle cx="32.5" cy="9" r="3.5" fill="#EF4444" filter="url(#flameGlow)" className="animate-ping" />
    <circle cx="41.5" cy="11" r="3" fill="#F59E0B" filter="url(#flameGlow)" className="animate-pulse" />
  </svg>
);

const GiftBoxSvg = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="10" y="26" width="44" height="30" rx="4" fill="url(#boxGrad)" />
    <rect x="6" y="20" width="52" height="8" rx="2" fill="#7C3AED" />
    {/* Ribbons */}
    <rect x="28" y="20" width="8" height="36" fill="url(#ribbonGrad)" />
    <rect x="6" y="22" width="52" height="4" fill="url(#ribbonGrad)" opacity="0.4" />
    {/* Ribbon Bow */}
    <path d="M32 20C26 12 16 14 22 20Z" fill="url(#ribbonGrad)" />
    <path d="M32 20C38 12 48 14 42 20Z" fill="url(#ribbonGrad)" />
    <circle cx="32" cy="20" r="3" fill="#FFF" />
  </svg>
);

const ClockSvg = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: "18s" }} />
    <circle cx="32" cy="32" r="24" fill="#0F172A" stroke="#F43F5E" strokeWidth="2" />
    <line x1="32" y1="32" x2="32" y2="16" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="32" x2="44" y2="32" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="32" r="3" fill="#FFF" />
  </svg>
);

const ApologyEmojiSvg = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="emojiBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="apologyHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="100%" stopColor="#E11D48" />
      </linearGradient>
      <filter id="emojiGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Outer Glowing Dashed Ring */}
    <circle cx="50" cy="50" r="45" stroke="#F43F5E" strokeWidth="2" strokeDasharray="6 4" className="animate-spin" style={{ animationDuration: "14s" }} opacity="0.7" />
    
    {/* Main Face Circle */}
    <circle cx="50" cy="50" r="38" fill="url(#emojiBodyGrad)" filter="url(#emojiGlowShadow)" />
    
    {/* Big Pleading Glossy Eyes */}
    {/* Left Eye */}
    <ellipse cx="37" cy="44" rx="7" ry="9" fill="#1E293B" />
    <ellipse cx="35" cy="41" rx="3" ry="4" fill="#FFFFFF" />
    <circle cx="39" cy="47" r="1.5" fill="#FFFFFF" />
    
    {/* Right Eye */}
    <ellipse cx="63" cy="44" rx="7" ry="9" fill="#1E293B" />
    <ellipse cx="61" cy="41" rx="3" ry="4" fill="#FFFFFF" />
    <circle cx="65" cy="47" r="1.5" fill="#FFFFFF" />
    
    {/* Cute Pouting Sad Mouth */}
    <path d="M 40 64 Q 50 56 60 64" stroke="#7C2D12" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    
    {/* Rosy Cheeks */}
    <ellipse cx="27" cy="53" rx="5" ry="3" fill="#F43F5E" opacity="0.6" />
    <ellipse cx="73" cy="53" rx="5" ry="3" fill="#F43F5E" opacity="0.6" />
    
    {/* Floating Animated Heart Badge */}
    <g className="animate-bounce">
      <path d="M 74 24 C 74 20 68 16 63 21 C 58 16 52 20 52 24 C 52 31 63 37 63 37 C 63 37 74 31 74 24 Z" fill="url(#apologyHeartGrad)" />
    </g>
    
    {/* Sparkles */}
    <circle cx="20" cy="28" r="2" fill="#FCD34D" className="animate-ping" />
    <circle cx="82" cy="68" r="2" fill="#F43F5E" className="animate-pulse" />
  </svg>
);

const BirthdayBelatedApology = ({ data = {}, isDemo = false }) => {
  let parsedData = data || {};
  if (typeof parsedData === "string") {
    try {
      parsedData = JSON.parse(parsedData);
    } catch (e) {}
  }

  // Dynamic fields with fallback values
  const personName = parsedData.personName || parsedData.person_name || "Sneha";
  const petName = parsedData.petName || parsedData.pet_name || "Cutie";
  const secretPin = parsedData.secretPin || parsedData.secret_pin || "";
  const lateReason = parsedData.lateReason || parsedData.late_reason || "Finding the perfect words for someone as special as you took a little extra time! ✨";
  const letterText = parsedData.letterText || parsedData.letter_text || parsedData.letter || 
    `Dearest ${personName},\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Birthday to my favorite person in the world! 💖`;
  
  const favNotification = parsedData.favNotification || parsedData.fav_notification || "A SPECIAL SURPRISE CRAFTED FOR YOU 💖";
  const stayCute = parsedData.stayCute || parsedData.stay_cute || "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨";
  const iloveYou = parsedData.iloveYou || parsedData.ilove_you || "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖";
  const meanToMe = parsedData.meanToMe || parsedData.mean_to_me || "Finding the perfect words took a little extra time, but my wishes for you are timeless. ❤️";
  const scratchTitle = parsedData.scratchTitle || parsedData.scratch_title || "SURPRISE GIFT COUPON 🎁";
  const scratchMessage = parsedData.scratchMessage || parsedData.scratch_message || "I know I was a bit late, but you'll always be my #1! Enjoy your special week 🎉✨";
  const musicUrl = parsedData.bgMusic || parsedData.musicUrl || parsedData.music_url || "https://assets.mixkit.co/music/preview/mixkit-romantic-sunburst-241.mp3";

  // Default Unsplash fallbacks
  const defaultPhoto1 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80";
  const defaultPhoto2 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
  const defaultPhoto3 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80";
  const defaultPhoto4 = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";
  const defaultPhoto5 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80";

  // 5 Photos
  const photo1 = parsedData.photo1 || parsedData.photo_1 || defaultPhoto1;
  const photo2 = parsedData.photo2 || parsedData.photo_2 || defaultPhoto2;
  const photo3 = parsedData.photo3 || parsedData.photo_3 || defaultPhoto3;
  const photo4 = parsedData.photo4 || parsedData.photo_4 || defaultPhoto4;
  const photo5 = parsedData.photo5 || parsedData.photo_5 || defaultPhoto5;

  // App States
  const [currentStep, setCurrentStep] = useState(secretPin ? 0 : 1);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!isDemo);
  const [letterOpen, setLetterOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isScratched, setIsScratched] = useState(false);

  const audioRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const fireworksCanvasRef = useRef(null);
  const scratchCanvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Audio Playback
  useEffect(() => {
    if (audioRef.current && !isDemo) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isDemo]);

  // Unlock Audio Playback on First User Interaction (Touch / Click) for Mobile Browsers
  useEffect(() => {
    if (isDemo) return;
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [isDemo]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Background Stardust Floating Particle Canvas Effect
  useEffect(() => {
    if (!bgCanvasRef.current) return;
    const canvas = bgCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];
    for (let i = 0; i < 75; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? "#F59E0B" : "#F43F5E",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // PIN Verification
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === secretPin) {
      setPinError(false);
      setCurrentStep(1);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
  };

  // Dodging "Still a little mad!" Button (Mobile Bounded)
  const handleNoHover = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxOffset = isMobile ? 80 : 180;
    const randomX = (Math.random() - 0.5) * maxOffset;
    const randomY = (Math.random() - 0.5) * (maxOffset * 0.7);
    setNoButtonPos({ x: randomX, y: randomY });
  };

  // Interactive Scratch Canvas Logic (Step 4)
  useEffect(() => {
    if (currentStep !== 4 || !scratchCanvasRef.current) return;
    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Fill with metallic gold foil texture
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#F59E0B");
    gradient.addColorStop(0.5, "#FCD34D");
    gradient.addColorStop(1, "#D97706");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch instruction text on gold foil
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#78350F";
    ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH WITH MOUSE OR FINGER TO REVEAL ✨", canvas.width / 2, canvas.height / 2);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const scratch = (e) => {
      if (!isDrawing.current) return;
      if (e.touches && e.cancelable) {
        e.preventDefault();
      }
      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      setIsScratched(true);
    };

    const startScratch = (e) => {
      isDrawing.current = true;
      scratch(e);
    };

    const stopScratch = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopScratch);
    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", stopScratch);

    return () => {
      canvas.removeEventListener("mousedown", startScratch);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopScratch);
      canvas.removeEventListener("touchstart", startScratch);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopScratch);
    };
  }, [currentStep]);

  const handleInstantReveal = () => {
    if (scratchCanvasRef.current) {
      const ctx = scratchCanvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, scratchCanvasRef.current.width, scratchCanvasRef.current.height);
      setIsScratched(true);
    }
  };

  // Canvas Fireworks Effect on Step 6
  useEffect(() => {
    if (currentStep !== 6 || !fireworksCanvasRef.current) return;
    const canvas = fireworksCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const colors = ["#F43F5E", "#8B5CF6", "#F59E0B", "#EC4899", "#3B82F6", "#10B981"];

    for (let i = 0; i < 110; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      if (particles.some((p) => p.alpha > 0)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentStep]);

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-white font-sans overflow-hidden select-none flex flex-col justify-between">
      {/* Background Music Audio Element */}
      {!isDemo && <audio ref={audioRef} src={musicUrl} loop />}

      {/* Floating Animated Stardust Background Canvas */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Radial Lighting Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />

      {/* Floating Top Right Audio Toggle Button */}
      {!isDemo && (
        <button
          onClick={toggleAudio}
          className="fixed top-5 right-5 z-50 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800/90 border border-white/15 text-amber-300 transition-all cursor-pointer shadow-2xl backdrop-blur-md hover:scale-110"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      {/* STEP 0: Secret PIN Lock Vault */}
      {currentStep === 0 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900/85 border border-amber-500/30 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Secret Birthday Vault</h2>
              <p className="text-xs text-gray-400">Enter the 4-digit passcode to unlock your surprise.</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="• • • •"
                className={`w-full text-center text-3xl font-mono tracking-[0.5em] px-4 py-3 bg-slate-950 border ${
                  pinError ? "border-red-500 animate-shake" : "border-amber-400/30"
                } rounded-xl text-amber-300 focus:outline-none focus:border-amber-400 shadow-inner transition-all`}
              />
              {pinError && <p className="text-xs text-red-400 font-medium">Incorrect passcode. Try again! 🤫</p>}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm rounded-xl shadow-xl hover:brightness-110 transition-all cursor-pointer"
              >
                Unlock Surprise Gift
              </button>
            </form>
          </div>
        </main>
      )}

      {/* STEP 1: Main Hero Screen with SVG Crown, Avatar & Animated SVG Cake */}
      {currentStep === 1 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-2xl mx-auto">
          {/* Birthday Person Photo Avatar with SVG Crown */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-amber-400 p-1 shadow-[0_0_40px_rgba(245,158,11,0.4)] overflow-hidden bg-slate-950 transition-transform hover:scale-105">
                <img src={photo1} alt={personName} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 drop-shadow-md animate-bounce">
                <CrownSvg className="w-8 h-8" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={14} className="text-amber-400" />
              <span>Birthday Special for {personName}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 leading-tight drop-shadow-lg">
              Happy Birthday, {personName}! ✨
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto font-serif italic">
              "{lateReason}"
            </p>
          </div>

          {/* Dual SVG Cake & Animated SVG Clock Cards */}
          <div className="flex flex-wrap items-center justify-center gap-6 my-3">
            {/* Glowing 3D Vector SVG Cake Card */}
            <div className="w-36 h-36 rounded-3xl bg-slate-900/90 border border-amber-500/40 p-2 shadow-[0_0_35px_rgba(245,158,11,0.25)] backdrop-blur-xl flex flex-col items-center justify-center relative group hover:scale-105 transition-all">
              <CakeSvg className="w-16 h-16 mb-1 drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]" />
              <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest font-mono">Special Cake</span>
            </div>

            {/* Interactive Animated SVG Clock Card */}
            <div className="w-36 h-36 rounded-3xl bg-slate-900/90 border border-amber-500/30 p-2 shadow-[0_0_35px_rgba(245,158,11,0.25)] backdrop-blur-xl flex flex-col items-center justify-center relative group hover:scale-105 transition-all">
              <ClockSvg className="w-16 h-16 mb-1" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Better Late</span>
              <span className="text-xs font-bold text-amber-300">Than Never</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-extrabold text-sm rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group border border-white/10"
          >
            <span>Open Your Birthday Surprise</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </main>
      )}

      {/* STEP 2: Forgiveness Quiz with Colorful Big SVG Apology Illustration */}
      {currentStep === 2 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-md mx-auto">
          {/* Colorful Big SVG Apology Vector Illustration */}
          <div className="relative group flex justify-center items-center my-2">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
            <ApologyEmojiSvg className="w-32 h-32 md:w-36 md:h-36 drop-shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-transform hover:scale-110 cursor-pointer" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Are you mad at me for being a little late, {personName}? 🥺
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Be honest! A heartwarming birthday surprise is waiting for you inside.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative min-h-[100px]">
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-full shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>No, all is forgiven! 💕</span>
            </button>

            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: "all 0.2s ease-out"
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold text-xs rounded-full border border-white/10 transition-all cursor-pointer"
            >
              Still a little mad 😤
            </button>
          </div>
        </main>
      )}

      {/* STEP 3: 5-Photo 3D Memory Gallery */}
      {currentStep === 3 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-5xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Memories That Last Forever</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">5 Special Moments With You 📸</h2>
          </div>

          {/* 3D Scattered Overlapping Mosaic Collage */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-2 md:gap-0 w-full my-4 sm:my-6 relative py-2 sm:py-4">
            {/* Photo 1 */}
            <div className="relative group bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl text-slate-900 rotate-[-4deg] sm:rotate-[-8deg] -translate-y-1 sm:-translate-y-2 hover:rotate-0 hover:scale-110 sm:hover:scale-125 hover:z-30 transition-all duration-300 w-36 sm:w-44 md:w-48 shrink-0 cursor-pointer border border-amber-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                <Heart size={12} className="text-white fill-white" />
              </div>
              <img
                src={photo1}
                alt="Memory 1"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto1; }}
                className="w-full h-36 sm:h-48 object-cover rounded-xl mb-2 shadow-inner"
              />
              <p className="font-serif italic text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight">"Timeless Smile ✨"</p>
            </div>

            {/* Photo 2 */}
            <div className="relative group bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl text-slate-900 rotate-[-2deg] sm:rotate-[-3deg] translate-y-1 md:-ml-6 hover:rotate-0 hover:scale-110 sm:hover:scale-125 hover:z-30 transition-all duration-300 w-36 sm:w-44 md:w-48 shrink-0 cursor-pointer border border-amber-200 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center shadow-md">
                <Sparkles size={12} className="text-white" />
              </div>
              <img
                src={photo2}
                alt="Memory 2"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto2; }}
                className="w-full h-36 sm:h-48 object-cover rounded-xl mb-2 shadow-inner"
              />
              <p className="font-serif italic text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight">"Favorite Adventures 💖"</p>
            </div>

            {/* Photo 3 (Hero Center) */}
            <div className="relative group bg-white p-3 sm:p-3.5 rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] text-slate-900 rotate-[0deg] -translate-y-2 sm:-translate-y-4 scale-105 sm:scale-110 md:-ml-6 z-20 hover:scale-115 sm:hover:scale-130 hover:z-40 transition-all duration-300 w-40 sm:w-48 md:w-52 shrink-0 cursor-pointer border-2 border-amber-400">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Award size={14} className="text-white" />
              </div>
              <img
                src={photo3}
                alt="Memory 3"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto3; }}
                className="w-full h-40 sm:h-52 object-cover rounded-xl mb-2 shadow-inner"
              />
              <p className="font-serif italic text-[11px] sm:text-xs font-black text-rose-600 tracking-tight">"Warmth & Laughter 🌟"</p>
            </div>

            {/* Photo 4 */}
            <div className="relative group bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl text-slate-900 rotate-[2deg] sm:rotate-[4deg] translate-y-1 md:-ml-6 hover:rotate-0 hover:scale-110 sm:hover:scale-125 hover:z-30 transition-all duration-300 w-36 sm:w-44 md:w-48 shrink-0 cursor-pointer border border-amber-200 z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                <Smile size={12} className="text-white" />
              </div>
              <img
                src={photo4}
                alt="Memory 4"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto4; }}
                className="w-full h-36 sm:h-48 object-cover rounded-xl mb-2 shadow-inner"
              />
              <p className="font-serif italic text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight">"Unforgettable Joy 🥳"</p>
            </div>

            {/* Photo 5 */}
            <div className="relative group bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl text-slate-900 rotate-[4deg] sm:rotate-[9deg] -translate-y-1 md:-ml-6 hover:rotate-0 hover:scale-110 sm:hover:scale-125 hover:z-30 transition-all duration-300 w-36 sm:w-44 md:w-48 shrink-0 cursor-pointer border border-amber-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                <Heart size={12} className="text-white fill-white" />
              </div>
              <img
                src={photo5}
                alt="Memory 5"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultPhoto5; }}
                className="w-full h-36 sm:h-48 object-cover rounded-lg mb-2 shadow-inner"
              />
              <p className="font-serif italic text-[11px] sm:text-xs font-extrabold text-slate-800 tracking-tight">"Pure Magic Together 💖"</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(4)}
            className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold text-sm rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-white/10"
          >
            <span>Scratch Your Surprise Coupon</span>
            <GiftBoxSvg className="w-5 h-5" />
          </button>
        </main>
      )}

      {/* STEP 4: Interactive Scratch Card Surprise with SVG Gift Box */}
      {currentStep === 4 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Secret Gift Coupon</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Scratch To Reveal Your Gift 🎁</h2>
          </div>

          {/* Scratch Container */}
          <div className="relative w-full h-56 bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center p-6 text-center">
            {/* Hidden Message Behind Scratch Layer */}
            <div className="space-y-2 z-10 px-4">
              <GiftBoxSvg className="w-12 h-12 mx-auto animate-bounce" />
              <h3 className="text-sm font-extrabold text-amber-300 uppercase tracking-widest font-mono">
                {scratchTitle}
              </h3>
              <p className="text-white font-serif italic text-xs md:text-sm leading-relaxed">
                "{scratchMessage}"
              </p>
            </div>

            {/* Canvas Foil Overlay */}
            <canvas ref={scratchCanvasRef} className="absolute inset-0 z-20 cursor-crosshair touch-none" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={handleInstantReveal}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 text-xs font-semibold rounded-full cursor-pointer transition-all"
            >
              Instant Reveal Scratch 🪄
            </button>

            <button
              onClick={() => setCurrentStep(5)}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-sm rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Read Birthday Letter</span>
              <Mail size={16} />
            </button>
          </div>
        </main>
      )}

      {/* STEP 5: Clean 3D Royal Wax-Sealed Virtual Letter Envelope */}
      {currentStep === 5 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Heartfelt Message & Love</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">A Letter Written Just For You ✉️</h2>
          </div>

          {/* Envelope Card Container */}
          <div
            onClick={() => setLetterOpen(!letterOpen)}
            className={`w-full p-8 rounded-3xl border transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-2xl relative overflow-hidden ${
              letterOpen
                ? "bg-slate-900/95 border-amber-500/50 text-left shadow-[0_0_60px_rgba(245,158,11,0.25)]"
                : "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-amber-400/30 hover:border-amber-400 text-center hover:scale-[1.02]"
            }`}
          >
            {!letterOpen ? (
              <div className="py-8 space-y-6 flex flex-col items-center">
                {/* Royal Wax Seal Icon */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 to-amber-500 p-1 shadow-[0_0_40px_rgba(244,63,94,0.4)] flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center text-amber-300 border border-amber-300/40">
                    <Mail size={32} className="text-rose-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">To {personName} 💕</span>
                  <h3 className="text-xl font-extrabold text-white">Tap Seal to Open Letter</h3>
                  <p className="text-xs text-gray-400">Unfold your special birthday message inside.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header with Recipient Name & Heart */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-amber-300">Dearest {personName} 💕</h4>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Birthday Special</span>
                  </div>
                  <Heart size={22} className="text-rose-500 fill-rose-500 animate-pulse" />
                </div>

                <p className="text-slate-200 text-xs md:text-sm leading-relaxed whitespace-pre-line font-serif italic">
                  {letterText}
                </p>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-right">
                  <span className="text-[11px] font-mono text-amber-400">🎂 Happy Birthday!</span>
                  <span className="text-xs font-extrabold text-purple-300">With All My Love ❤️</span>
                </div>
              </div>
            )}
          </div>

          {letterOpen && (
            <button
              onClick={() => setCurrentStep(6)}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-sm rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-white/10"
            >
              <span>Grand Finale Wish 🎉</span>
              <Sparkles size={16} />
            </button>
          )}
        </main>
      )}

      {/* STEP 6: Grand Finale Celebration Fireworks with SVG Cake & Crown Avatar */}
      {currentStep === 6 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-xl mx-auto">
          {/* Fireworks Canvas Background */}
          <canvas ref={fireworksCanvasRef} className="absolute inset-0 pointer-events-none z-10" />

          <div className="relative z-20 space-y-5">
            {/* Birthday Person Avatar Photo with Crown & SVG Cake Card */}
            <div className="flex items-center justify-center gap-4 mx-auto">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full border-4 border-amber-400 p-0.5 shadow-[0_0_40px_rgba(245,158,11,0.5)] overflow-hidden bg-slate-950 animate-pulse">
                  <img src={photo1} alt={personName} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <CrownSvg className="w-6 h-6" />
                </div>
              </div>

              <div className="w-20 h-20 rounded-2xl border-2 border-rose-500/40 p-1 shadow-[0_0_35px_rgba(244,63,94,0.4)] overflow-hidden bg-slate-900/90 backdrop-blur-md flex items-center justify-center animate-bounce">
                <CakeSvg className="w-14 h-14" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 font-mono">{stayCute}</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 drop-shadow-xl">
                {iloveYou}
              </h1>
              <p className="text-slate-300 text-sm italic font-serif max-w-md mx-auto">
                "{meanToMe}"
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold rounded-full text-gray-300 transition-all cursor-pointer flex items-center gap-2 mx-auto shadow-lg"
              >
                <RefreshCw size={14} />
                <span>Replay Experience</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Background Audio Player */}
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      {/* Clean Floating Footer Branding (No Dark Bar) */}
      <footer className="relative z-20 text-center py-4 text-[10px] text-gray-400/60 tracking-widest uppercase">
        Crafted with love on <span className="text-amber-400/80 font-bold">Momenta</span>
      </footer>
    </div>
  );
};

export default BirthdayBelatedApology;
