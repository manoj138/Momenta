import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../../../context/AppContext";
import { Sparkles, ArrowRight, RotateCcw, Camera, Heart, ChevronLeft } from "lucide-react";
import { guestService } from "../../../../services/guestService";
import TemplateControls from "../../../../components/common/TemplateControls";

const translations = {
  mr: {
    heyHeader: "HEY!!",
    madeSomething: "मी तुमच्यासाठी एक खास सरप्राईज बनवलंय",
    wantToSee: "तुम्हाला ते बघायला आवडेल का?",
    yesBtn: "Yes",
    noBtn: "No",
    howDareYou: "तुझी हिम्मत कशी झाली नाही म्हणायची! 😤",
    goBackBtn: "Go back",
    goodGirl: "That's a good Gurlll 🌻",
    clickToContinue: "Click",
    happyBirthdayTitle: "HAPPY BIRTHDAY BBG ❤️",
    favNotification: "YOU ARE MY FAVORITE NOTIFICATION 💖",
    stayCute: "STAY CUTE, STAY HAPPY, STAY MINE 💖",
    nextBtn: "Next",
    tapToOpen: "Tap here To open",
    hereSurprise: "Here's a surprise for you!!!",
    tapHere: "Tap here",
    letterText: "You are seen, you are heard, and you are loved, no matter what. If you ever feel unloved, remember that my love for you is boundless and endless!",
    clickHereBtn: "Click here",
    virtualHug: "Here is virtual hug for you",
    iloveYou: "I LOVE YOU ❤️",
    meanToMe: "You don't know how much you mean to me",
    loadingText: "आठवणींचा पेटारा उघडत आहे...",
    backBtn: "Back"
  },
  en: {
    heyHeader: "HEY!!",
    madeSomething: "I made something for you",
    wantToSee: "Do you want to see?",
    yesBtn: "Yes",
    noBtn: "No",
    howDareYou: "HOW DARE YOU 😤",
    goBackBtn: "Go back",
    goodGirl: "That's a good Gurlll 🌻",
    clickToContinue: "Click",
    happyBirthdayTitle: "HAPPY BIRTHDAY BBG ❤️",
    favNotification: "YOU ARE MY FAVORITE NOTIFICATION 💖",
    stayCute: "STAY CUTE, STAY HAPPY, STAY MINE 💖",
    nextBtn: "Next",
    tapToOpen: "Tap here To open",
    hereSurprise: "Here's a surprise for you!!!",
    tapHere: "Tap here",
    letterText: "You are seen, you are heard, and you are loved, no matter what. If you ever feel unloved, remember that my love for you is boundless and endless!",
    clickHereBtn: "Click here",
    virtualHug: "Here is virtual hug for you",
    iloveYou: "I LOVE YOU ❤️",
    meanToMe: "You don't know how much you mean to me",
    loadingText: "Unlocking Birthday Wishes...",
    backBtn: "Back"
  }
};

// Exact Image Asset Paths from public/birthday/birthday love - 100% Unique & Step-Wise
const ASSETS = {
  puppyRose: encodeURI("/birthday/birthday love/It's Nearly Valentine's Day, And This Puppy Is So Ready For It!.png"),
  angryPuppy: encodeURI("/birthday/birthday love/angry puppy.png"),
  flowerBouquet: encodeURI("/birthday/birthday love/buke.png"),
  partyCakePuppy: encodeURI("/birthday/birthday love/Party Pup_ Adorable Puppy Celebrating with Birthday Cake!.png"),
  pinkEnvelope: encodeURI("/birthday/birthday love/Pink Valentines Clipart - Romantic Love Art for Celebrations.png"),
  coquetteLollipop: encodeURI("/birthday/birthday love/Download premium png of PNG Coquette red lollipop confectionery furniture sweets_ by Ning about coquette, pink coquette png, coquette png, coquette pink, and coquette aesthetic 14797369.png"),
  stickerGif: encodeURI("/birthday/birthday love/Post by @lovelysticker · 8 images.gif"),
  cake: encodeURI("/birthday/birthday love/cake.png")
};

const BirthdayCinematicLove = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  
  // Story Step State Machine: 0 to 8
  const [storyStep, setStoryStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([0]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isLocketOpen, setIsLocketOpen] = useState(false);

  // 3D Perspective Tilt & Cursor Spotlight State
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Language & Font settings
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;

  // Background Image Preloading Hook (Preloads ALL assets into memory for instant step transitions)
  useEffect(() => {
    Object.values(ASSETS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Navigation Helpers (Step Forward & Back History Stack)
  const goToStep = (nextStep) => {
    setStoryStep(nextStep);
    setStepHistory((prev) => [...prev, nextStep]);
  };

  const handleGoBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop();
      const prevStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setStoryStep(prevStep);
    } else {
      setStoryStep(0);
    }
  };

  // Mouse / Touch 3D Tilt & Interactive Cursor Spotlight Tracking
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientY / innerHeight) - 0.5) * -8;
    const y = ((clientX / innerWidth) - 0.5) * 8;
    setCardTilt({ x, y });
    setMousePos({ x: clientX, y: clientY });
  };

  // 1. 0-100 Loader simulation
  useEffect(() => {
    let interval = null;
    if (!loadingDone) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoadingDone(true), 400);
            return 100;
          }
          return prev + Math.floor(Math.random() * 12) + 4;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [loadingDone]);

  // Synchronize language if data changes
  useEffect(() => {
    if (data.language) {
      setCurrentLang(data.language);
    }
  }, [data.language]);

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === "mr" ? "en" : "mr"));
  };

  const getPersonName = () => {
    const raw = data.personName || "BBG";
    if (lang === "mr") {
      if (raw.toLowerCase() === "sneha shinde") return "स्नेहा";
      if (raw.toLowerCase() === "priya") return "प्रिया";
      if (raw.toLowerCase() === "rahul") return "राहुल";
      return raw;
    }
    return raw;
  };

  // Canvas Real-Time Fireworks & Heart Rain System
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);
  const heartParticles = useRef([]);

  // Upgraded Fireworks Rockets & Golden Sparkle Explosions
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ["#ffd700", "#f472b6", "#ec4899", "#3b82f6", "#ffffff", "#fbbf24", "#e11d48"];
    
    // Launch 3 simultaneous Firework Rockets from bottom
    for (let rocket = 0; rocket < 3; rocket++) {
      const startX = (canvas.width / 4) * (rocket + 1);
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 14 + 4;
        confettiParticles.current.push({
          x: startX,
          y: canvas.height * 0.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.008,
          isSparkle: Math.random() > 0.5
        });
      }
    }
  };

  useEffect(() => {
    if (!loadingDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize rising heart sparkles
    for (let i = 0; i < 35; i++) {
      heartParticles.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 16 + 10,
        speedY: Math.random() * 1.6 + 0.6,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.7 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Rising Heart Particles
      heartParticles.current.forEach((h) => {
        h.y -= h.speedY;
        h.x += h.speedX;
        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.globalAlpha = h.alpha;
        ctx.font = `${h.size}px sans-serif`;
        ctx.fillText("❤️", h.x, h.y);
        ctx.restore();
      });

      // 2. Draw Fireworks Burst
      confettiParticles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.alpha -= p.decay;
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0 || p.y > canvas.height) {
          confettiParticles.current.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadingDone]);

  const getPhotos = () => {
    if (data.gallery && data.gallery.length > 0) return data.gallery;
    return [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800"
    ];
  };

  const photos = getPhotos();

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#c2395d] text-slate-900 select-none overflow-hidden font-sans flex flex-col items-center justify-center p-2.5 sm:p-5 perspective-1000"
    >
      
      {/* Background Deep Pink Striped Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `linear-gradient(90deg, #c2395d 0px, #c2395d 12px, #b23052 12px, #b23052 24px)`
        }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full blur-3xl opacity-30 bg-radial from-pink-300 via-amber-200 to-transparent transition-all duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* 1. Cinematic Ambient Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-10 pointer-events-none"
      />

      {/* 2. Premium Intro Loader with Dual Energy Rings */}
      {!loadingDone && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#b83854] transition-opacity duration-500">
          <div className="space-y-6 text-center max-w-sm px-6">
            
            {/* Dual Spinning Energy Rings */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full border-2 border-pink-200 animate-reverse-spin" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl animate-pulse">
                <span className="font-fredoka text-2xl sm:text-3xl font-bold text-white">
                  {(data.personName || "B").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            
            <h2 className="text-xs uppercase tracking-[0.25em] text-pink-200 font-semibold font-fredoka">
              {t.loadingText}
            </h2>

            <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {String(loadingProgress).padStart(3, "0")}%
            </div>

            <div className="w-full h-[4px] bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-300 via-pink-200 to-white transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Reusable Template Controls */}
      <TemplateControls
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        audioUrl={data.bgMusic || "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"}
        bgClass="bg-[#8b233a]/80 backdrop-blur-md"
        textClass="text-pink-200"
        hoverClass="hover:text-white hover:scale-105 hover:bg-[#a62b46]"
        borderClass="border-pink-300/30"
      />

      {/* MAIN FULL-SCREEN ORGANIC WAVY CONTAINER (100% Fixed & Uniform Container Dimensions) */}
      <div 
        className={`relative z-20 w-full max-w-3xl h-[480px] xs:h-[530px] sm:h-[580px] md:h-[610px] max-h-[85vh] overflow-hidden bg-[#f8f4f1] text-slate-800 p-4 xs:p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-500 shadow-[0_35px_80px_rgba(0,0,0,0.45)] ${loadingDone ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{
          transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
          borderRadius: `clamp(30px, 6vw, 60px) clamp(80px, 18vw, 240px) clamp(40px, 8vw, 80px) clamp(70px, 15vw, 200px) / clamp(60px, 12vw, 180px) clamp(35px, 6vw, 80px) clamp(80px, 16vw, 220px) clamp(30px, 5vw, 60px)`,
          backgroundImage: `radial-gradient(#e2d9d2 1.2px, transparent 1.2px)`,
          backgroundSize: `24px 24px`
        }}
      >

        {/* FLOATING BACK BUTTON (When storyStep > 0) */}
        {storyStep > 0 && (
          <button
            onClick={handleGoBack}
            className="absolute top-3 left-3 sm:top-5 sm:left-5 z-40 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#c2395d] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1 text-xs sm:text-sm font-bold font-fredoka border border-pink-200"
          >
            <ChevronLeft size={18} />
            <span>{t.backBtn}</span>
          </button>
        )}
        
        {/* ========================================================= */}
        {/* STEP 0: INITIAL TEASER SCREEN                             */}
        {/* ========================================================= */}
        {storyStep === 0 && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-between animate-fade-in gap-4 sm:gap-6 my-auto py-1">
            
            {/* Left Text Content Deck */}
            <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-4 text-center md:text-left z-20">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl font-extrabold text-[#c2395d] uppercase tracking-tight font-fredoka drop-shadow-sm leading-tight">
                {t.heyHeader}
              </h1>

              <div className="space-y-0.5 sm:space-y-1">
                <p className="font-kalam font-bold text-xl xs:text-2xl sm:text-3xl text-slate-800">
                  {t.madeSomething}
                </p>
                <p className="font-sacramento text-2xl xs:text-3xl sm:text-4xl text-slate-700 font-bold">
                  {t.wantToSee}
                </p>
              </div>

              {/* Pill Buttons with Magnetic Shimmer FX */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 sm:pt-4 font-fredoka">
                <button
                  onClick={() => goToStep(2)}
                  className="relative overflow-hidden px-7 xs:px-9 sm:px-11 py-2.5 xs:py-3 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg sm:text-xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 hover:-rotate-3 active:scale-95 transition-all cursor-pointer border-2 border-white/30 group"
                >
                  <span className="relative z-10"><u className="decoration-white underline-offset-4">{t.yesBtn}</u></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                <button
                  onClick={() => goToStep(1)}
                  className="relative overflow-hidden px-7 xs:px-9 sm:px-11 py-2.5 xs:py-3 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg sm:text-xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 hover:rotate-3 active:scale-95 transition-all cursor-pointer border-2 border-white/30 group"
                >
                  <span className="relative z-10"><u className="decoration-white underline-offset-4">{t.noBtn}</u></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>

            </div>

            {/* Right Puppy Mascot: puppyRose */}
            <div className="w-40 xs:w-52 sm:w-72 h-40 xs:h-52 sm:h-72 z-10 animate-float flex-shrink-0">
              <img 
                src={ASSETS.puppyRose} 
                alt="Cute Puppy with Rose" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday baby boy.png";
                }}
              />
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: ANGRY TEASE SCREEN                                */}
        {/* ========================================================= */}
        {storyStep === 1 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-wobble-card my-auto py-1">
            
            <div className="relative w-44 xs:w-56 sm:w-72 h-44 xs:h-56 sm:h-72 my-1">
              <img 
                src={ASSETS.angryPuppy} 
                alt="Angry Puppy" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] animate-pulse"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ASSETS.stickerGif;
                }}
              />
              <span className="absolute top-0 right-2 text-3xl xs:text-5xl animate-bounce">💢</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold tracking-tight text-[#c2395d] uppercase font-fredoka leading-tight">
              {t.howDareYou}
            </h1>

            <button
              onClick={handleGoBack}
              className="px-8 xs:px-10 sm:px-12 py-3 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-base xs:text-lg sm:text-xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka"
            >
              <RotateCcw size={20} className="animate-spin-slow" />
              <span><u className="decoration-white underline-offset-4">{t.goBackBtn}</u></span>
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: PRAISE SCREEN                                     */}
        {/* ========================================================= */}
        {storyStep === 2 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <div className="relative w-48 xs:w-60 sm:w-76 h-48 xs:h-60 sm:h-76 my-1 animate-float">
              <img 
                src={ASSETS.flowerBouquet} 
                alt="Puppy with Flower Bouquet" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ASSETS.puppyRose;
                }}
              />
              <span className="absolute bottom-2 right-2 text-3xl xs:text-4xl animate-bounce">💋🌻</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.goodGirl}
            </h1>

            <button
              onClick={() => {
                goToStep(3);
                triggerConfetti();
              }}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka animate-glow-ring"
            >
              <span><u className="decoration-white underline-offset-4">{t.clickToContinue}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: MAIN REVEAL CARD (Fireworks Particle Launch)      */}
        {/* ========================================================= */}
        {storyStep === 3 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <div className="relative w-48 xs:w-60 sm:w-76 h-48 xs:h-60 sm:h-76 my-1 animate-float">
              <img 
                src={ASSETS.partyCakePuppy} 
                alt="Party Pup with Cake" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday adult woman.png";
                }}
              />
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold tracking-tight text-[#c2395d] uppercase leading-none font-fredoka drop-shadow-md">
              HAPPY BIRTHDAY {getPersonName()} ❤️
            </h1>

            <div className="space-y-1 text-xs xs:text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide font-fredoka">
              <p className="text-[#a83650] animate-pulse">{t.favNotification}</p>
              <p>{t.stayCute}</p>
            </div>

            <button
              onClick={() => goToStep(4)}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka animate-glow-ring"
            >
              <span><u className="decoration-white underline-offset-4">{t.nextBtn}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: PINK ENVELOPE SCREEN                              */}
        {/* ========================================================= */}
        {storyStep === 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <div 
              onClick={() => {
                setIsEnvelopeOpened(true);
                setTimeout(() => {
                  goToStep(5);
                  triggerConfetti();
                }, 700);
              }}
              className="w-full max-w-lg flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className={`w-56 xs:w-72 sm:w-88 h-48 xs:h-60 sm:h-72 my-1 relative transition-all duration-700 ${isEnvelopeOpened ? "scale-125 rotate-12 opacity-80" : "group-hover:scale-105"}`}>
                <img 
                  src={ASSETS.pinkEnvelope} 
                  alt="Pink Romantic Envelope" 
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                />
              </div>

              <h3 className="text-3xl xs:text-4xl sm:text-5xl font-sacramento font-bold text-[#c2395d] underline decoration-pink-400 decoration-2 underline-offset-8 mt-2 animate-bounce">
                {t.tapToOpen}
              </h3>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: GIFT BOX SCREEN (Fireworks Launch)                */}
        {/* ========================================================= */}
        {storyStep === 5 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 relative animate-fade-in my-auto py-1">
            
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.hereSurprise}
            </h1>

            <div 
              onClick={() => {
                goToStep(6);
                triggerConfetti();
              }}
              className="relative w-56 xs:w-68 sm:w-80 h-56 xs:h-68 sm:h-80 my-1 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-full h-full p-2 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <img 
                  src={ASSETS.coquetteLollipop} 
                  alt="Surprise Gift Sweets" 
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] animate-float"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ASSETS.pinkEnvelope;
                  }}
                />
              </div>

              <div className="absolute -bottom-2 sm:-bottom-3 right-2 sm:right-4 bg-[#a83650] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-1.5 rounded-full shadow-[0_10px_20px_rgba(168,54,80,0.4)] flex items-center gap-2 animate-pulse font-fredoka">
                <span>{t.tapHere}</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="w-full flex justify-end pt-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative animate-bounce">
                <img 
                  src={ASSETS.flowerBouquet} 
                  alt="Flower Bouquet Mascot" 
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: LETTER WITH 3D GOLDEN LOCKET                      */}
        {/* ========================================================= */}
        {storyStep === 6 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <div className="w-full bg-pink-50 border-2 border-pink-200 rounded-3xl p-4 sm:p-8 space-y-4 text-center relative shadow-inner">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto -mt-10 sm:-mt-14 drop-shadow-lg animate-float">
                <img 
                  src={ASSETS.flowerBouquet} 
                  alt="Flower Bouquet Mascot" 
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-slate-800 font-kalam text-base xs:text-lg sm:text-2xl leading-relaxed px-1 font-bold">
                "{data.message || t.letterText}"
              </p>

              {/* Interactive 3D Golden Locket Hinge Opening */}
              <div 
                onClick={() => setIsLocketOpen(!isLocketOpen)}
                className="flex items-center justify-center gap-3 sm:gap-5 pt-1 cursor-pointer group"
              >
                <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full border-4 border-amber-300 overflow-hidden shadow-lg transform transition-all duration-700 locket-hinge-left ${isLocketOpen ? "-rotate-45 scale-110" : "rotate-0"} bg-pink-200 p-0.5`}>
                  <img src={photos[0]} alt="Locket Photo 1" loading="eager" className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-125" />
                </div>
                <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full border-4 border-amber-300 overflow-hidden shadow-lg transform transition-all duration-700 locket-hinge-right ${isLocketOpen ? "rotate-45 scale-110" : "rotate-0"} bg-pink-200 p-0.5`}>
                  <img src={photos[1] || photos[0]} alt="Locket Photo 2" loading="eager" className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-125" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end pt-1">
              <button
                onClick={() => goToStep(7)}
                className="px-7 sm:px-9 py-2.5 sm:py-3 bg-[#a83650] hover:bg-[#8e2b42] text-white text-sm sm:text-base font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border-2 border-white/30 font-fredoka animate-glow-ring"
              >
                <Camera size={16} />
                <span><u className="decoration-white underline-offset-4">{t.clickHereBtn}</u></span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: VIRTUAL HUG SCREEN                                */}
        {/* ========================================================= */}
        {storyStep === 7 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.virtualHug}
            </h1>

            <div className="relative w-52 xs:w-64 sm:w-80 h-52 xs:h-64 sm:h-80 my-1 animate-float">
              <img 
                src={ASSETS.stickerGif} 
                alt="Virtual Hug Bears GIF" 
                loading="eager"
                fetchpriority="high"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ASSETS.puppyRose;
                }}
              />
            </div>

            <button
              onClick={() => {
                goToStep(8);
                triggerConfetti();
              }}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka animate-glow-ring"
            >
              <span><u className="decoration-white underline-offset-4">{t.nextBtn}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 8: POLAROIDS & CAKE WALL (Grand Fireworks Finale)    */}
        {/* ========================================================= */}
        {storyStep === 8 && (
          <div className="w-full h-full flex flex-col justify-between space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            
            <div className="w-full h-[2px] bg-slate-400 relative top-2 sm:top-3 left-0 right-0 z-0" />

            {/* Swaying Pendulum Wind Polaroids on Wire */}
            <div className="w-full grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 pt-2 sm:pt-3 relative z-10">
              {photos.slice(0, 3).map((src, idx) => (
                <div key={idx} className="bg-white p-1.5 xs:p-2 sm:p-3 pb-5 xs:pb-6 sm:pb-8 rounded-lg shadow-xl border border-slate-200 transform hover:scale-110 transition-transform relative animate-pendulum" style={{ animationDelay: `${idx * 0.5}s` }}>
                  <div className="w-3 sm:w-4 h-4 sm:h-5 bg-sky-500 rounded-xs mx-auto -mt-3.5 sm:-mt-5 mb-1 shadow-md" />
                  <div className="w-full h-20 xs:h-28 sm:h-36 bg-slate-100 rounded overflow-hidden">
                    <img src={src} alt="Polaroid Memory" loading="eager" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-2 sm:pt-4 px-1 gap-3">
              <div className="w-20 h-20 sm:w-32 sm:h-32 relative animate-float flex-shrink-0">
                <img 
                  src={ASSETS.cake} 
                  alt="Birthday Cake" 
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ASSETS.partyCakePuppy;
                  }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xl sm:text-2xl animate-flame">🕯️</span>
              </div>

              <div className="text-center sm:text-right space-y-0.5 sm:space-y-1 flex-1 pl-0 sm:pl-3">
                <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold text-[#c2395d] tracking-wider uppercase font-fredoka drop-shadow-sm">
                  {t.iloveYou}
                </h1>
                <p className="text-slate-700 font-kalam text-xs xs:text-sm sm:text-xl font-bold">
                  "{t.meanToMe}"
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* CINEMATIC FOOTER SIGN-OFF */}
      <footer className="w-full pt-3 sm:pt-5 text-center text-[10px] text-pink-200 uppercase tracking-widest relative z-20 font-fredoka">
        <p>© {new Date().getFullYear()} Momenta. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default BirthdayCinematicLove;
