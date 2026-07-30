import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../../../context/AppContext";
import { Sparkles, ArrowRight, RotateCcw, Camera, Heart, ChevronLeft, Mic, Lock, KeyRound } from "lucide-react";
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
    backBtn: "Back",
    passcodeTitle: "खाजगी सरप्राईज अनलॉकिंग...",
    enterPinLabel: "४-अंकी सिक्रेट पिन प्रविष्ट करा",
    unlockBtn: "अनलॉक करा",
    wrongPinMsg: "गलत पिन! कृपया पुन्हा प्रयत्न करा ❌",
    scratchInstruction: "बोटाने किंवा माऊसने स्क्रॅच करा 🪙",
    scratchedUnlocked: "वाह! सरप्राईज उघडले! 🎉",
    makeWishTitle: "MAKE A WISH & BLOW OUT THE CANDLES! 🎂",
    blowInstructions: "मायक्रोफोनमध्ये फुंकर मारा 🎤 किंवा मेणबत्तीवर टॅप करा!",
    candlesBlownText: "तुमची इच्छा नक्की पूर्ण होईल! 🎉✨",
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
    backBtn: "Back",
    passcodeTitle: "Private Surprise Unlocking...",
    enterPinLabel: "Enter 4-digit Secret PIN",
    unlockBtn: "Unlock Experience",
    wrongPinMsg: "Wrong Secret PIN! Try again ❌",
    scratchInstruction: "Scratch with your finger or mouse 🪙",
    scratchedUnlocked: "Yay! Surprise Unlocked! 🎉",
    makeWishTitle: "MAKE A WISH & BLOW OUT THE CANDLES! 🎂",
    blowInstructions: "Breathe into your mic 🎤 or tap the candle flame!",
    candlesBlownText: "May all your wishes come true! 🎉✨",
  }
};

// Image Asset Paths from public/birthday/birthday love
const ASSETS = {
  puppyRose: encodeURI("/birthday/birthday love/It's Nearly Valentine's Day, And This Puppy Is So Ready For It!.png"),
  angryPuppy: encodeURI("/birthday/birthday love/angry puppy.png"),
  flowerBouquet: encodeURI("/birthday/birthday love/buke.png"),
  partyCakePuppy: encodeURI("/birthday/birthday love/Party Pup_ Adorable Puppy Celebrating with Birthday Cake!.png"),
  pinkEnvelope: encodeURI("/birthday/birthday love/Pink Valentines Clipart - Romantic Love Art for Celebrations.png"),
  coquetteLollipop: encodeURI("/birthday/birthday love/Download premium png of PNG Coquette red lollipop confectionery furniture sweets_ by Ning about coquette, pink coquette png, coquette png, coquette pink, and coquette aesthetic 14797369.png"),
  stickerGif: encodeURI("/birthday/birthday love/Post by @lovelysticker · 8 images.gif"),
  cake: encodeURI("/birthday/birthday love/birthday_cake_transparent copy.png")
};

const BirthdayCinematicLove = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  
  // Story Step State Machine: 0 to 9
  const [storyStep, setStoryStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([0]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isLocketOpen, setIsLocketOpen] = useState(false);

  // Passcode Lock State
  const secretPasscode = String(data.passcode || data.secretPin || "");
  const [isPasscodeLocked, setIsPasscodeLocked] = useState(!!secretPasscode);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Scratch Card State (Step 5)
  const [isScratched, setIsScratched] = useState(false);
  const scratchCanvasRef = useRef(null);

  // Blow Candle Interactive State (Step 8)
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);

  // 3D Tilt & Cursor Spotlight Refs
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const mouseAnimFrame = useRef(null);

  // Language settings
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;

  // Preload Images
  useEffect(() => {
    Object.values(ASSETS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Navigation Helpers
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

  // 3D Tilt & Spotlight Tracking
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    if (mouseAnimFrame.current) return;

    mouseAnimFrame.current = requestAnimationFrame(() => {
      mouseAnimFrame.current = null;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      if (cardRef.current) {
        const x = ((clientY / innerHeight) - 0.5) * -8;
        const y = ((clientX / innerWidth) - 0.5) * 8;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`;
      }
    });
  };

  // Click Heart Burst Handler
  const handleGlobalClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hearts = ["❤️", "💖", "💕", "✨", "🌸"];
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      confettiParticles.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        r: Math.random() * 8 + 14,
        color: hearts[Math.floor(Math.random() * hearts.length)],
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        isEmojiHeart: true
      });
    }
  };

  // Loader simulation
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

  // Canvas Fireworks & Particle System
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);
  const heartParticles = useRef([]);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ["#ffd700", "#f472b6", "#ec4899", "#3b82f6", "#ffffff", "#fbbf24", "#e11d48"];
    
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

      const particles = confettiParticles.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.isEmojiHeart ? 0.08 : 0.25;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.isEmojiHeart) {
          ctx.font = `${p.r}px sans-serif`;
          ctx.fillText(p.color, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadingDone]);

  // Scratch Card Canvas Overlay Hook (Step 5)
  useEffect(() => {
    if (storyStep !== 5 || isScratched) return;
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const w = (canvas.width = canvas.offsetWidth || 260);
    const h = (canvas.height = canvas.offsetHeight || 260);

    // Fill Canvas with metallic pink gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#f472b6");
    grad.addColorStop(0.5, "#ec4899");
    grad.addColorStop(1, "#be185d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Scratch Text Overlay
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🪙 " + (t.scratchInstruction || "Scratch Me!"), w / 2, h / 2);

    let isDrawing = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Check scratched percentage
      const imgData = ctx.getImageData(0, 0, w, h);
      let cleared = 0;
      for (let i = 3; i < imgData.data.length; i += 16) {
        if (imgData.data[i] === 0) cleared++;
      }
      if (cleared / (imgData.data.length / 16) > 0.4) {
        setIsScratched(true);
        triggerConfetti();
      }
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onStart = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const onMove = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const onEnd = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", onStart);
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    canvas.addEventListener("touchstart", onStart, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);

    return () => {
      canvas.removeEventListener("mousedown", onStart);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      canvas.removeEventListener("touchstart", onStart);
      canvas.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [storyStep, isScratched, t.scratchInstruction]);

  // Blow Candle Microphone Listener Hook (Step 8)
  useEffect(() => {
    if (storyStep !== 8 || isCandleBlown) return;

    let animId = null;

    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        setIsListeningMic(true);

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;

          // If blow intensity is high
          if (average > 42) {
            handleBlowCandles();
            return;
          }
          animId = requestAnimationFrame(checkVolume);
        };
        checkVolume();
      } catch (err) {
        console.warn("Microphone access not granted or unavailable for blow feature:", err);
        setIsListeningMic(false);
      }
    };

    startMic();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [storyStep, isCandleBlown]);

  const handleBlowCandles = () => {
    if (isCandleBlown) return;
    setIsCandleBlown(true);
    triggerConfetti();
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin.trim() === secretPasscode.trim()) {
      setIsPasscodeLocked(false);
      setPinError(false);
      triggerConfetti();
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1200);
    }
  };

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
      onClick={handleGlobalClick}
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
        ref={spotlightRef}
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full blur-3xl opacity-30 bg-radial from-pink-300 via-amber-200 to-transparent top-0 left-0 will-change-transform"
        style={{ transform: `translate3d(-1000px, -1000px, 0)` }}
      />

      {/* 1. Cinematic Ambient Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-10 pointer-events-none"
      />

      {/* 2. Premium Intro Loader */}
      {!loadingDone && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#b83854] transition-opacity duration-500">
          <div className="space-y-6 text-center max-w-sm px-6">
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

      {/* Secret Passcode Gate Modal */}
      {loadingDone && isPasscodeLocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <form
            onSubmit={handlePinSubmit}
            className={`w-full max-w-sm bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-3xl text-center space-y-6 shadow-2xl text-white ${
              pinError ? "animate-bounce border-red-500" : ""
            }`}
          >
            <div className="p-4 bg-pink-500/10 rounded-2xl w-16 h-16 mx-auto flex items-center justify-center text-pink-400 border border-pink-500/20">
              <KeyRound size={32} />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-fredoka">{t.passcodeTitle}</h3>
              <p className="text-xs text-gray-400 font-medium">{t.enterPinLabel}</p>
            </div>

            <input
              type="password"
              maxLength={6}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-3xl font-mono tracking-[0.5em] py-3 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500"
              autoFocus
            />

            {pinError && (
              <p className="text-xs text-red-400 font-bold animate-pulse">{t.wrongPinMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-pink-600/30 cursor-pointer font-fredoka"
            >
              {t.unlockBtn}
            </button>
          </form>
        </div>
      )}

      {/* Template Controls */}
      <TemplateControls
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        audioUrl={data.bgMusic || "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"}
        bgClass="bg-[#8b233a]/80 backdrop-blur-md"
        textClass="text-pink-200"
        hoverClass="hover:text-white hover:scale-105 hover:bg-[#a62b46]"
        borderClass="border-pink-300/30"
      />

      {/* MAIN FULL-SCREEN ORGANIC CONTAINER */}
      <div 
        ref={cardRef}
        className={`relative z-20 w-full max-w-3xl h-[480px] xs:h-[530px] sm:h-[580px] md:h-[610px] max-h-[85vh] overflow-hidden bg-[#f8f4f1] text-slate-800 p-4 xs:p-6 sm:p-8 flex flex-col items-center justify-center transition-transform duration-300 ease-out shadow-[0_35px_80px_rgba(0,0,0,0.45)] will-change-transform ${loadingDone && !isPasscodeLocked ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{
          borderRadius: `clamp(30px, 6vw, 60px) clamp(80px, 18vw, 240px) clamp(40px, 8vw, 80px) clamp(70px, 15vw, 200px) / clamp(60px, 12vw, 180px) clamp(35px, 6vw, 80px) clamp(80px, 16vw, 220px) clamp(30px, 5vw, 60px)`,
          backgroundImage: `radial-gradient(#e2d9d2 1.2px, transparent 1.2px)`,
          backgroundSize: `24px 24px`
        }}
      >

        {/* FLOATING BACK BUTTON */}
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

              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 sm:pt-4 font-fredoka">
                <button
                  onClick={() => goToStep(2)}
                  className="relative overflow-hidden px-7 xs:px-9 sm:px-11 py-2.5 xs:py-3 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg sm:text-xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 hover:-rotate-3 active:scale-95 transition-all cursor-pointer border-2 border-white/30 group"
                >
                  <span className="relative z-10"><u className="decoration-white underline-offset-4">{t.yesBtn}</u></span>
                </button>
                <button
                  onClick={() => goToStep(1)}
                  className="relative overflow-hidden px-7 xs:px-9 sm:px-11 py-2.5 xs:py-3 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg sm:text-xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 hover:rotate-3 active:scale-95 transition-all cursor-pointer border-2 border-white/30 group"
                >
                  <span className="relative z-10"><u className="decoration-white underline-offset-4">{t.noBtn}</u></span>
                </button>
              </div>
            </div>

            <div className="w-40 xs:w-52 sm:w-72 h-40 xs:h-52 sm:h-72 z-10 animate-float flex-shrink-0">
              <img 
                src={ASSETS.puppyRose} 
                alt="Cute Puppy with Rose" 
                loading="eager"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
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
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] animate-pulse"
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
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
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
        {/* STEP 3: MAIN REVEAL CARD                                  */}
        {/* ========================================================= */}
        {storyStep === 3 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            <div className="relative w-48 xs:w-60 sm:w-76 h-48 xs:h-60 sm:h-76 my-1 animate-float">
              <img 
                src={ASSETS.partyCakePuppy} 
                alt="Party Pup with Cake" 
                loading="eager"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
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
        {/* STEP 4: UNIFIED SEAMLESS ENVELOPE & SLIDING LETTER CARD   */}
        {/* ========================================================= */}
        {storyStep === 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center relative animate-fade-in my-auto py-1 overflow-visible">
            <div 
              onClick={() => {
                if (!isEnvelopeOpened) {
                  setIsEnvelopeOpened(true);
                  triggerConfetti();
                }
              }}
              className={`relative w-full max-w-lg h-[410px] xs:h-[450px] sm:h-[490px] flex flex-col items-center justify-center transition-all ${
                !isEnvelopeOpened ? "cursor-pointer group" : ""
              }`}
            >
              {/* 0. Top Teaser Header & Mascot (Fills top empty space when closed) */}
              <div 
                className={`absolute top-4 sm:top-7 inset-x-0 mx-auto flex flex-col items-center justify-center space-y-1 transition-all duration-500 z-10 ${
                  isEnvelopeOpened 
                    ? "opacity-0 -translate-y-6 scale-90 pointer-events-none" 
                    : "opacity-100 translate-y-0 scale-100 animate-float"
                }`}
              >
                <div className="flex items-center justify-center gap-2 px-4">
                  <span className="text-xl sm:text-2xl animate-bounce">✨</span>
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl font-sacramento font-bold text-[#c2395d] drop-shadow-sm text-center">
                    {t.hereSurprise}
                  </h2>
                  <span className="text-xl sm:text-2xl animate-bounce delay-150">✨</span>
                </div>
              </div>

              {/* 1. Open Pink Envelope Back Flap Wall + Animated Top Flap (z-0) */}
              <div className="absolute bottom-16 sm:bottom-20 z-0 w-64 xs:w-72 sm:w-84 transition-transform duration-500 group-hover:scale-105">
                <svg className="w-full h-auto drop-shadow-md" viewBox="0 0 300 220" fill="none">
                  {/* Envelope Interior Back Wall */}
                  <rect x="0" y="90" width="300" height="130" fill="#f4a7bb" rx="10" />
                  
                  {/* Animated Top Flap (Flips 180deg from down to up) */}
                  <g 
                    style={{ 
                      transformOrigin: "150px 90px", 
                      transform: isEnvelopeOpened ? "rotateX(180deg)" : "rotateX(0deg)", 
                      transition: "transform 0.7s ease-in-out" 
                    }}
                  >
                    <polygon points="0,90 150,180 300,90" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
                  </g>
                </svg>

                {/* Heart Seal (fades out on open) */}
                <div 
                  className={`absolute top-[61%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-rose-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-lg transition-all duration-300 z-10 ${
                    isEnvelopeOpened ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100 animate-pulse"
                  }`}
                >
                  💖
                </div>
              </div>

              {/* 2. White Paper Letter Card Emerging UP from Envelope Cavity (z-20) */}
              <div 
                className={`absolute z-20 w-56 xs:w-64 sm:w-76 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xl text-center flex flex-col items-center justify-between transition-all duration-700 ease-out ${
                  isEnvelopeOpened 
                    ? "bottom-24 sm:bottom-28 -translate-y-8 sm:-translate-y-12 opacity-100 scale-100 pointer-events-auto delay-300" 
                    : "bottom-16 sm:bottom-20 translate-y-6 opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Top-Left Pink Ribbon & Puppy Mascot */}
                <div className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 z-30 flex flex-col items-center pointer-events-none">
                  {/* Pink Ribbon Bow */}
                  <div className="w-8 sm:w-10 h-8 sm:h-10 text-pink-400 font-bold text-2xl animate-pulse">
                    🎀
                  </div>
                  {/* Cute Puppy Mascot */}
                  <div className="w-14 h-14 sm:w-18 sm:h-18 -mt-3 filter drop-shadow-md">
                    <img 
                      src={ASSETS.flowerBouquet} 
                      alt="Puppy Ribbon Mascot" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Styled Handwritten Message */}
                <div className="space-y-0.5 pt-1 pb-3 px-2 font-kalam text-slate-900 text-xs xs:text-sm sm:text-base font-bold leading-snug">
                  <p>You are seen, you are</p>
                  <p>heard, and you are</p>
                  <p>loved, no matter what.</p>
                  <p>If you ever feel</p>
                  <p>unloved, remember</p>
                  <p>that my love for you is</p>
                  <p className="text-base sm:text-lg pt-0.5">
                    <span className="text-pink-400 font-extrabold">boundless</span>{" "}
                    and{" "}
                    <span className="text-slate-900 font-extrabold">endless!</span>
                  </p>
                </div>
              </div>

              {/* 3. Open Pink Envelope Front Pocket (z-30) */}
              <div className="absolute bottom-16 sm:bottom-20 z-30 w-64 xs:w-72 sm:w-84 pointer-events-none">
                <svg className="w-full h-auto filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)]" viewBox="0 0 300 130" fill="none">
                  {/* Left Envelope Pocket Fold */}
                  <polygon points="0,0 145,65 0,130" fill="#f4a7bb" opacity="0.9" />
                  {/* Right Envelope Pocket Fold */}
                  <polygon points="300,0 155,65 300,130" fill="#f4a7bb" opacity="0.9" />
                  {/* Bottom Triangular Pocket V-Fold */}
                  <polygon points="0,130 150,55 300,130" fill="#f472b6" stroke="#f43f5e" strokeWidth="1.5" />
                </svg>
              </div>

              {/* 4. Tap Prompt (Positioned cleanly at absolute bottom-2 with zero overlap) */}
              <h3 
                className={`absolute bottom-2 sm:bottom-3 z-40 text-3xl xs:text-4xl sm:text-5xl font-sacramento font-bold text-[#c2395d] underline decoration-pink-400 decoration-2 underline-offset-8 transition-all duration-500 ${
                  isEnvelopeOpened ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100 animate-bounce"
                }`}
              >
                {t.tapToOpen}
              </h3>

              {/* 5. Bottom-Right Action Button: "Click here 📷" (Visible when opened) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(5);
                }}
                className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-4 z-40 px-3.5 py-2 rounded-2xl bg-white/95 hover:bg-white text-slate-800 text-xs sm:text-sm font-extrabold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 border border-pink-200 group font-fredoka animate-glow-ring ${
                  isEnvelopeOpened 
                    ? "opacity-100 scale-100 pointer-events-auto delay-700 duration-500" 
                    : "opacity-0 scale-90 pointer-events-none"
                }`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-pink-500/10 text-pink-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                  📷
                </div>
                <span><u className="decoration-pink-400 underline-offset-4 font-sacramento text-lg sm:text-xl text-[#c2395d]">Click here</u></span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: VIRTUAL HUG SCREEN                                */}
        {/* ========================================================= */}
        {storyStep === 5 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl font-sacramento font-bold text-[#c2395d]">
              {t.virtualHug}
            </h1>

            <div className="relative w-52 xs:w-64 sm:w-80 h-52 xs:h-64 sm:h-80 my-1 animate-float">
              <img 
                src={ASSETS.stickerGif} 
                alt="Virtual Hug Bears GIF" 
                loading="eager"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
              />
            </div>

            <button
              onClick={() => {
                goToStep(6);
              }}
              className="px-10 xs:px-12 sm:px-16 py-3 sm:py-4 bg-[#a83650] hover:bg-[#8e2b42] text-white text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/30 flex items-center gap-2 font-fredoka animate-glow-ring"
            >
              <span><u className="decoration-white underline-offset-4">{t.nextBtn}</u></span>
              <ArrowRight size={22} />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: DEDICATED BLOW CANDLES INTERACTIVE SCREEN          */}
        {/* ========================================================= */}
        {storyStep === 6 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 animate-fade-in my-auto pt-8 sm:pt-10 pb-1 px-4">
            {/* Header with clear padding from top-left Back button */}
            <div className="space-y-1 max-w-md px-6 sm:px-10">
              <h1 className="text-lg xs:text-xl sm:text-3xl font-extrabold text-[#c2395d] font-fredoka uppercase leading-tight">
                {t.makeWishTitle}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-600 font-semibold font-fredoka flex items-center justify-center gap-1.5">
                <Mic size={14} className={isListeningMic ? "text-pink-500 animate-pulse" : "text-gray-400"} />
                <span>{t.blowInstructions}</span>
              </p>
            </div>

            {/* Giant Birthday Cake with Burning/Extinguished Candles */}
            <div 
              onClick={handleBlowCandles}
              className="relative w-48 xs:w-56 sm:w-68 h-48 xs:h-56 sm:h-68 my-1 flex flex-col items-center justify-center cursor-pointer group"
            >
              {/* Cake image with mix-blend-multiply to remove white background */}
              <img 
                src={ASSETS.cake} 
                alt="Birthday Cake" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform mix-blend-multiply"
              />

              {/* Single Central High-Contrast Birthday Candle Overlay */}
              <div className="absolute top-[14%] sm:top-[16%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-end h-16 sm:h-20 cursor-pointer">
                {!isCandleBlown ? (
                  <>
                    {/* Glowing Flickering Flame */}
                    <div className="w-4 sm:w-5 h-6 sm:h-7 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_18px_#f97316,#0_0_35px_#f59e0b] animate-pulse relative flex items-center justify-center">
                      <div className="w-1.5 h-2.5 bg-white rounded-full opacity-90 animate-ping" />
                    </div>
                    {/* Wick */}
                    <div className="w-0.5 h-2 bg-slate-900 mx-auto" />
                  </>
                ) : (
                  <>
                    {/* Extinguished Smoke FX */}
                    <div className="text-base sm:text-lg animate-bounce text-slate-400">💨</div>
                    {/* Burnt Wick */}
                    <div className="w-1 h-2 bg-slate-950 mx-auto rounded-xs shadow-inner" />
                  </>
                )}

                {/* Striped 3D Candle Body Stick */}
                <div 
                  className={`w-4 sm:w-5 h-9 sm:h-11 rounded-sm border-2 border-white/90 shadow-xl relative overflow-hidden ${
                    isCandleBlown ? "bg-gradient-to-b from-gray-400 to-slate-600" : "bg-gradient-to-b from-pink-500 via-red-500 to-rose-600"
                  }`}
                >
                  <div 
                    className="absolute inset-0 opacity-40" 
                    style={{
                      backgroundImage: `linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 50%, #ffffff 50%, #ffffff 75%, transparent 75%)`,
                      backgroundSize: `10px 10px`
                    }}
                  />
                </div>
              </div>
            </div>

            {isCandleBlown ? (
              <div className="space-y-3 animate-fade-in">
                <p className="text-xs sm:text-sm font-bold text-pink-600 uppercase tracking-wider font-fredoka animate-pulse">
                  {t.candlesBlownText}
                </p>
                <button
                  onClick={() => {
                    goToStep(7);
                    triggerConfetti();
                  }}
                  className="px-8 sm:px-12 py-2.5 sm:py-3.5 bg-[#a83650] hover:bg-[#8e2b42] text-white text-base sm:text-lg font-bold rounded-full shadow-[0_10px_25px_rgba(168,54,80,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer font-fredoka flex items-center gap-2 mx-auto border-2 border-white/30 animate-glow-ring"
                >
                  <span>{t.nextBtn}</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              <div className="p-2.5 px-4 bg-pink-100/90 rounded-2xl border border-pink-300 text-[11px] sm:text-xs text-pink-700 font-bold font-fredoka animate-pulse">
                👇 Tap the candles or blow into mic to extinguish!
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 7: POLAROIDS & CAKE WALL (Grand Finale)               */}
        {/* ========================================================= */}
        {storyStep === 7 && (
          <div className="w-full h-full flex flex-col justify-between space-y-4 sm:space-y-6 animate-fade-in my-auto py-1">
            <div className="w-full h-[2px] bg-slate-400 relative top-2 sm:top-3 left-0 right-0 z-0" />

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
                  className="w-full h-full object-contain filter drop-shadow-lg mix-blend-multiply"
                />
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
