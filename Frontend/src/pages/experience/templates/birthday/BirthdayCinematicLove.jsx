import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../../../context/AppContext";
import { Sparkles, ArrowRight, RotateCcw, Camera, Heart } from "lucide-react";
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
    loadingText: "आठवणींचा पेटारा उघडत आहे..."
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
    loadingText: "Unlocking Birthday Wishes..."
  }
};

// Exact Image Asset Paths from public/birthday/birthday love
const ASSETS = {
  puppyRose: encodeURI("/birthday/birthday love/It's Nearly Valentine's Day, And This Puppy Is So Ready For It!.png"),
  partyCakePuppy: encodeURI("/birthday/birthday love/Party Pup_ Adorable Puppy Celebrating with Birthday Cake!.png"),
  pinkEnvelope: encodeURI("/birthday/birthday love/Pink Valentines Clipart - Romantic Love Art for Celebrations.png"),
  stickerGif: encodeURI("/birthday/birthday love/Post by @lovelysticker · 8 images.gif"),
  coquetteLollipop: encodeURI("/birthday/birthday love/Download premium png of PNG Coquette red lollipop confectionery furniture sweets_ by Ning about coquette, pink coquette png, coquette png, coquette pink, and coquette aesthetic 14797369.png"),
  cake: encodeURI("/birthday/birthday love/cake.png")
};

const BirthdayCinematicLove = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  
  // Story Step State Machine: 0 to 8
  const [storyStep, setStoryStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isLocketOpen, setIsLocketOpen] = useState(false);

  // Language & Font settings
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;

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

  // Canvas Particle System
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ["#d4af37", "#f5e6ca", "#e8c5c8", "#b76e79", "#f472b6", "#ec4899", "#3b82f6"];
    for (let i = 0; i < 150; i++) {
      confettiParticles.current.push({
        x: canvas.width / 2,
        y: canvas.height - 20,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 22 - 6,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005
      });
    }
  };

  useEffect(() => {
    if (!loadingDone || storyStep < 3) return;
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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
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
  }, [loadingDone, storyStep]);

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
    <div className="relative min-h-screen bg-[#c2395d] text-slate-900 select-none overflow-x-hidden font-sans flex flex-col items-center justify-center p-2.5 sm:p-6">
      
      {/* Background Deep Pink Striped Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `linear-gradient(90deg, #c2395d 0px, #c2395d 12px, #b23052 12px, #b23052 24px)`
        }}
      />

      {/* 1. Cinematic Ambient Canvas Overlay */}
      {storyStep >= 3 && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-10 pointer-events-none"
        />
      )}

      {/* Floating Hearts Ambient Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-pink-300/40 animate-float"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + (i * 17) % 80}%`,
              animationDelay: `${i * 0.7}s`,
              fontSize: `${18 + i * 5}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* 2. Premium Intro Loader */}
      {!loadingDone && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#b83854] transition-opacity duration-500">
          <div className="space-y-6 text-center max-w-sm px-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border border-pink-300 flex items-center justify-center shadow-2xl animate-pulse">
              <span className="font-fredoka text-2xl sm:text-3xl font-bold text-white">
                {(data.personName || "B").charAt(0).toUpperCase()}
              </span>
            </div>
            
            <h2 className="text-xs uppercase tracking-[0.25em] text-pink-200 font-semibold font-fredoka">
              {t.loadingText}
            </h2>

            <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {String(loadingProgress).padStart(3, "0")}%
            </div>

            <div className="w-full h-[4px] bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-out"
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

      {/* MAIN FULL-SCREEN ORGANIC WAVY CONTAINER (100% Fully Responsive Layout) */}
      <div 
        className={`relative z-20 w-full max-w-4xl min-h-[75vh] sm:min-h-[85vh] max-h-[92vh] overflow-y-auto no-scrollbar bg-[#f8f4f1] text-slate-800 p-4 xs:p-6 sm:p-12 flex flex-col justify-between transition-all duration-700 shadow-[0_30px_70px_rgba(0,0,0,0.4)] ${loadingDone ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{
          borderRadius: `clamp(30px, 6vw, 60px) clamp(80px, 18vw, 240px) clamp(40px, 8vw, 80px) clamp(70px, 15vw, 200px) / clamp(60px, 12vw, 180px) clamp(35px, 6vw, 80px) clamp(80px, 16vw, 220px) clamp(30px, 5vw, 60px)`,
          backgroundImage: `radial-gradient(#e2d9d2 1px, transparent 1px)`,
          backgroundSize: `24px 24px`
        }}
      >
        
        {/* ========================================================= */}
        {/* STEP 0: INITIAL TEASER SCREEN (Matching Reference Screenshot 1) */}
        {/* ========================================================= */}
        {storyStep === 0 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col sm:flex-row items-center sm:items-start justify-between relative animate-fade-in gap-4">
            
            {/* Left & Center Text Content Deck */}
            <div className="flex-1 flex flex-col justify-center space-y-2 sm:space-y-4 max-w-lg pt-2 sm:pt-10 z-20 text-center sm:text-left">
              <h1 className="text-4xl xs:text-5xl sm:text-7xl font-extrabold text-[#c2395d] uppercase tracking-tight font-fredoka drop-shadow-sm leading-tight">
                {t.heyHeader}
              </h1>

              <div className="space-y-1">
                <p className="font-kalam font-bold text-xl xs:text-2xl sm:text-4xl text-slate-800">
                  {t.madeSomething}
                </p>
                <p className="font-sacramento text-2xl xs:text-3xl sm:text-5xl text-slate-700 font-bold">
                  {t.wantToSee}
                </p>
              </div>

              {/* Pill Buttons */}
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6 font-fredoka">
                <button
                  onClick={() => setStoryStep(2)}
                  className="px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-lg hover:scale-110 hover:-rotate-2 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
                >
                  <u className="decoration-white underline-offset-4">{t.yesBtn}</u>
                </button>
                <button
                  onClick={() => setStoryStep(1)}
                  className="px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-lg hover:scale-110 hover:rotate-2 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
                >
                  <u className="decoration-white underline-offset-4">{t.noBtn}</u>
                </button>
              </div>

            </div>

            {/* Top Right Puppy Mascot - Responsive scaling */}
            <div className="relative sm:absolute sm:top-0 sm:right-4 w-36 h-36 xs:w-48 xs:h-48 sm:w-64 sm:h-64 z-10 animate-float flex-shrink-0">
              <img 
                src={ASSETS.puppyRose} 
                alt="Cute Puppy with Rose" 
                className="w-full h-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday baby boy.png";
                }}
              />
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: ANGRY TEASE SCREEN (HOW DARE YOU 😤)               */}
        {/* ========================================================= */}
        {storyStep === 1 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-wobble-card">
            
            <div className="relative w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 my-1">
              <img 
                src={ASSETS.stickerGif} 
                alt="Angry Puppy" 
                className="w-full h-full object-contain filter drop-shadow-xl animate-pulse"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday kid boy.png";
                }}
              />
              <span className="absolute top-0 right-2 text-3xl xs:text-5xl animate-bounce">💢</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold tracking-tight text-[#c2395d] uppercase font-fredoka leading-tight">
              {t.howDareYou}
            </h1>

            <button
              onClick={() => setStoryStep(0)}
              className="px-8 xs:px-10 sm:px-12 py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-base xs:text-lg sm:text-xl font-bold rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka"
            >
              <RotateCcw size={18} className="animate-spin-slow" />
              <span><u className="decoration-white underline-offset-4">{t.goBackBtn}</u></span>
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: PRAISE SCREEN (That's a good Gurlll 🌻)           */}
        {/* ========================================================= */}
        {storyStep === 2 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
            
            <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 my-1 animate-float">
              <img 
                src={ASSETS.puppyRose} 
                alt="Puppy with Kiss Marks" 
                className="w-full h-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday teen girl.png";
                }}
              />
              <span className="absolute bottom-2 right-2 text-3xl xs:text-4xl animate-bounce">💋🌻</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.goodGirl}
            </h1>

            <button
              onClick={() => {
                setStoryStep(3);
                triggerConfetti();
              }}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka"
            >
              <span><u className="decoration-white underline-offset-4">{t.clickToContinue}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: MAIN HAPPY BIRTHDAY REVEAL CARD                    */}
        {/* ========================================================= */}
        {storyStep === 3 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
            
            <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 my-1 animate-float">
              <img 
                src={ASSETS.partyCakePuppy} 
                alt="Party Pup with Cake" 
                className="w-full h-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/birthday/birthday adult woman.png";
                }}
              />
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-extrabold tracking-tight text-[#c2395d] uppercase leading-none font-fredoka drop-shadow-md">
              HAPPY BIRTHDAY {getPersonName()} ❤️
            </h1>

            <div className="space-y-1 sm:space-y-2 text-xs xs:text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide font-fredoka">
              <p className="text-[#a83650] animate-pulse">{t.favNotification}</p>
              <p>{t.stayCute}</p>
            </div>

            <button
              onClick={() => setStoryStep(4)}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka"
            >
              <span><u className="decoration-white underline-offset-4">{t.nextBtn}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: DIGITAL PINK ENVELOPE SCREEN (3D Unfolding Flip)   */}
        {/* ========================================================= */}
        {storyStep === 4 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
            
            <div 
              onClick={() => {
                setIsEnvelopeOpened(true);
                setTimeout(() => {
                  setStoryStep(5);
                  triggerConfetti();
                }, 700);
              }}
              className="w-full max-w-md flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className={`w-60 xs:w-72 sm:w-96 h-52 xs:h-64 sm:h-80 my-2 relative transition-all duration-700 ${isEnvelopeOpened ? "scale-125 rotate-12 opacity-80" : "group-hover:scale-105"}`}>
                <img 
                  src={ASSETS.pinkEnvelope} 
                  alt="Pink Romantic Envelope" 
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>

              <h3 className="text-3xl xs:text-4xl sm:text-5xl font-sacramento font-bold text-[#c2395d] underline decoration-pink-400 decoration-2 underline-offset-8 mt-2 animate-bounce">
                {t.tapToOpen}
              </h3>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: SURPRISE GIFT BOX SCREEN ("Here's a surprise...")  */}
        {/* ========================================================= */}
        {storyStep === 5 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 relative animate-fade-in">
            
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.hereSurprise}
            </h1>

            <div 
              onClick={() => {
                setStoryStep(6);
                triggerConfetti();
              }}
              className="relative w-56 xs:w-64 sm:w-80 h-56 xs:h-64 sm:h-80 my-1 sm:my-2 flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-full h-full p-2 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <img 
                  src={ASSETS.coquetteLollipop} 
                  alt="Surprise Gift Sweets" 
                  className="w-full h-full object-contain filter drop-shadow-2xl animate-float"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ASSETS.pinkEnvelope;
                  }}
                />
              </div>

              <div className="absolute -bottom-3 sm:-bottom-4 right-2 sm:right-4 bg-[#a83650] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 animate-pulse font-fredoka">
                <span>{t.tapHere}</span>
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="w-full flex justify-end pt-1 sm:pt-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 relative animate-bounce">
                <img 
                  src={ASSETS.partyCakePuppy} 
                  alt="Party Puppy Mascot" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: HEARTFELT LETTER WITH GOLDEN LOCKET               */}
        {/* ========================================================= */}
        {storyStep === 6 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
            
            <div className="w-full bg-pink-50 border-2 border-pink-200 rounded-3xl p-4 xs:p-6 sm:p-10 space-y-4 sm:space-y-6 text-center relative shadow-inner">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto -mt-10 sm:-mt-14 drop-shadow-lg animate-float">
                <img 
                  src={ASSETS.puppyRose} 
                  alt="Puppy with Flower" 
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-slate-800 font-kalam text-base xs:text-lg sm:text-2xl leading-relaxed px-1 sm:px-2 font-bold">
                "{data.message || t.letterText}"
              </p>

              {/* Interactive 3D Locket Opening */}
              <div 
                onClick={() => setIsLocketOpen(!isLocketOpen)}
                className="flex items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2 cursor-pointer group"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-300 overflow-hidden shadow-lg transform transition-all duration-700 ${isLocketOpen ? "rotate-0 scale-110" : "-rotate-12 group-hover:rotate-0"} bg-pink-200 p-0.5`}>
                  <img src={photos[0]} alt="Locket Photo 1" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-300 overflow-hidden shadow-lg transform transition-all duration-700 ${isLocketOpen ? "rotate-0 scale-110" : "rotate-12 group-hover:rotate-0"} bg-pink-200 p-0.5`}>
                  <img src={photos[1] || photos[0]} alt="Locket Photo 2" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end pt-1 sm:pt-2">
              <button
                onClick={() => setStoryStep(7)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#a83650] hover:bg-[#8e2b42] text-white text-sm sm:text-base font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border-2 border-white/30 font-fredoka"
              >
                <Camera size={16} />
                <span><u className="decoration-white underline-offset-4">{t.clickHereBtn}</u></span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: VIRTUAL HUG SCREEN (Here is virtual hug for you)   */}
        {/* ========================================================= */}
        {storyStep === 7 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in">
            
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.virtualHug}
            </h1>

            <div className="relative w-56 xs:w-64 sm:w-80 h-56 xs:h-64 sm:h-80 my-1 animate-float">
              <img 
                src={ASSETS.stickerGif} 
                alt="Virtual Hug Bears" 
                className="w-full h-full object-contain filter drop-shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = ASSETS.puppyRose;
                }}
              />
            </div>

            <button
              onClick={() => {
                setStoryStep(8);
                triggerConfetti();
              }}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka"
            >
              <span><u className="decoration-white underline-offset-4">{t.nextBtn}</u></span>
              <ArrowRight size={22} />
            </button>

          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 8: HANGING POLAROIDS, CAKE & "I LOVE YOU" WALL        */}
        {/* ========================================================= */}
        {storyStep === 8 && (
          <div className="w-full h-full min-h-[55vh] sm:min-h-[60vh] flex flex-col justify-between space-y-6 sm:space-y-8 animate-fade-in">
            
            <div className="w-full h-[2px] bg-slate-400 relative top-3 sm:top-4 left-0 right-0 z-0" />

            {/* Swaying Polaroids on Wire */}
            <div className="w-full grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 pt-3 sm:pt-4 relative z-10">
              {photos.slice(0, 3).map((src, idx) => (
                <div key={idx} className="bg-white p-2 xs:p-2.5 sm:p-3.5 pb-6 xs:pb-8 sm:pb-10 rounded-lg shadow-xl border border-slate-200 transform hover:scale-110 transition-transform relative animate-sway" style={{ animationDelay: `${idx * 0.4}s` }}>
                  <div className="w-3 sm:w-4 h-4 sm:h-6 bg-sky-500 rounded-xs mx-auto -mt-4 sm:-mt-6 mb-1 shadow-md" />
                  <div className="w-full h-20 xs:h-28 sm:h-40 bg-slate-100 rounded overflow-hidden">
                    <img src={src} alt="Polaroid Memory" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-4 sm:pt-6 px-1 sm:px-2 gap-4">
              {/* Cake with Flickering Flame Candle effect */}
              <div className="w-20 h-20 sm:w-36 sm:h-36 relative animate-float flex-shrink-0">
                <img 
                  src={ASSETS.cake} 
                  alt="Birthday Cake" 
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ASSETS.partyCakePuppy;
                  }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xl sm:text-2xl animate-flame">🕯️</span>
              </div>

              <div className="text-center sm:text-right space-y-1 sm:space-y-2 flex-1 pl-0 sm:pl-4">
                <h1 className="text-3xl xs:text-4xl sm:text-7xl font-extrabold text-[#c2395d] tracking-wider uppercase font-fredoka drop-shadow-sm">
                  {t.iloveYou}
                </h1>
                <p className="text-slate-700 font-kalam text-sm xs:text-base sm:text-2xl font-bold">
                  "{t.meanToMe}"
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* CINEMATIC FOOTER SIGN-OFF */}
      <footer className="w-full pt-4 sm:pt-6 text-center text-[10px] text-pink-200 uppercase tracking-widest relative z-20 font-fredoka">
        <p>© {new Date().getFullYear()} Momenta. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default BirthdayCinematicLove;
