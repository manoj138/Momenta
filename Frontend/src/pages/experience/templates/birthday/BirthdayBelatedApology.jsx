import React, { useState, useEffect, useRef } from "react";
import { Heart, Clock, Mail, Sparkles, Volume2, VolumeX, Lock, Unlock, ArrowRight, RefreshCw, Smile, Gift, Award, Music, Layers } from "lucide-react";

const BirthdayBelatedApology = ({ data = {}, isDemo = false }) => {
  // Dynamic fields with fallback values
  const personName = data.personName || data.person_name || "Sneha";
  const petName = data.petName || data.pet_name || "Cutie";
  const secretPin = data.secretPin || data.secret_pin || "";
  const lateReason = data.lateReason || data.late_reason || "Finding the perfect words for someone as special as you took a little extra time! ✨";
  const letterText = data.letterText || data.letter_text || data.letter || 
    `Dearest ${personName},\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Belated Birthday to my favorite person in the world! 💖`;
  
  const favNotification = data.favNotification || data.fav_notification || "BETTER LATE THAN NEVER — YOU ARE MY FAVORITE PERSON 💖";
  const stayCute = data.stayCute || data.stay_cute || "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨";
  const iloveYou = data.iloveYou || data.ilove_you || "BEST WISHES ALWAYS ❤️";
  const meanToMe = data.meanToMe || data.mean_to_me || "You don't know how much you mean to me.";
  const scratchTitle = data.scratchTitle || data.scratch_title || "SORRY BHAI / BESTIE! 🥺❤️";
  const scratchMessage = data.scratchMessage || data.scratch_message || "I know I was a bit late, but you'll always be my #1! Enjoy your special week 🎉✨";
  const musicUrl = data.bgMusic || data.musicUrl || data.music_url || "https://assets.mixkit.co/music/preview/mixkit-romantic-sunburst-241.mp3";

  // 5 Photos resolution
  const photo1 = data.photo1 || data.photo_1 || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80";
  const photo2 = data.photo2 || data.photo_2 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80";
  const photo3 = data.photo3 || data.photo_3 || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80";
  const photo4 = data.photo4 || data.photo_4 || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";
  const photo5 = data.photo5 || data.photo_5 || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80";

  // App States
  const [currentStep, setCurrentStep] = useState(secretPin ? 0 : 1);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!isDemo);
  const [letterOpen, setLetterOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isScratched, setIsScratched] = useState(false);

  const audioRef = useRef(null);
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

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

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

  // Dodging "Yes, still mad!" Button
  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 150;
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
    ctx.font = "bold 14px sans-serif";
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
      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
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
    const colors = ["#F43F5E", "#8B5CF6", "#F59E0B", "#EC4899", "#3B82F6"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
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
        ctx.shadowBlur = 10;
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

      {/* Floating Animated Particle Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />

      {/* Top Floating Control Bar */}
      <header className="relative z-30 flex justify-between items-center px-6 py-4 backdrop-blur-md bg-slate-900/40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Belated Birthday Special</span>
        </div>
        {!isDemo && (
          <button
            onClick={toggleAudio}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-rose-300 transition-all cursor-pointer shadow-lg"
            title={isPlaying ? "Mute Music" : "Play Music"}
          >
            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        )}
      </header>

      {/* STEP 0: Secret PIN Lock Screen */}
      {currentStep === 0 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900/80 border border-white/15 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Secret Birthday Vault</h2>
              <p className="text-xs text-gray-400">Enter the 4-digit passcode to unlock your belated birthday surprise.</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder="• • • •"
                className={`w-full text-center text-3xl font-mono tracking-[0.5em] px-4 py-3 bg-slate-950 border ${
                  pinError ? "border-red-500 animate-shake" : "border-white/20"
                } rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all`}
              />
              {pinError && <p className="text-xs text-red-400 font-medium">Incorrect passcode. Try again! 🤫</p>}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                Unlock Gift Card
              </button>
            </form>
          </div>
        </main>
      )}

      {/* STEP 1: Time Rewind Clock & Apology Teaser */}
      {currentStep === 1 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-xl mx-auto">
          {/* Notification Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold animate-bounce">
            <Sparkles size={14} />
            <span>{favNotification}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400 leading-tight">
              I Know I'm A Little Late...
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {lateReason}
            </p>
          </div>

          {/* Interactive Animated Clock Illustration */}
          <div className="relative w-40 h-40 flex items-center justify-center my-4">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 animate-spin" style={{ animationDuration: "20s" }} />
            <div className="w-28 h-28 rounded-full bg-slate-900/90 border border-white/20 flex flex-col items-center justify-center text-amber-400 shadow-2xl backdrop-blur-md">
              <Clock size={36} className="mb-1 text-rose-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Better Late</span>
              <span className="text-xs font-bold text-amber-300">Than Never</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="px-8 py-3.5 bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-extrabold text-sm rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>Open Your Belated Surprise</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </main>
      )}

      {/* STEP 2: Cute "Are You Still Mad At Me?" Forgiveness Quiz */}
      {currentStep === 2 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <Smile size={40} className="animate-bounce" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Are you mad at me for being late? 🥺
            </h2>
            <p className="text-xs text-gray-400">
              Be honest! But remember... I have a heart-warming surprise waiting for you inside!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full relative min-h-[100px]">
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>No, I forgive you! 💕</span>
            </button>

            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: "all 0.2s ease-out"
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold text-xs rounded-full border border-white/10 transition-all cursor-pointer"
            >
              Yes, super mad! 😤
            </button>
          </div>
        </main>
      )}

      {/* STEP 3: 5-Photo 3D Memory Gallery */}
      {currentStep === 3 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-5xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">Memories That Never Expire</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">5 Special Moments With You 📸</h2>
          </div>

          {/* 5-Photo 3D Polaroid Reel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full my-4">
            <div className="bg-white p-2.5 rounded-xl shadow-2xl text-slate-900 rotate-[-4deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src={photo1} alt="Memory 1" className="w-full h-44 object-cover rounded-lg mb-2" />
              <p className="font-serif italic text-[11px] font-bold text-slate-800">"Timeless Smile ✨"</p>
            </div>

            <div className="bg-white p-2.5 rounded-xl shadow-2xl text-slate-900 rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src={photo2} alt="Memory 2" className="w-full h-44 object-cover rounded-lg mb-2" />
              <p className="font-serif italic text-[11px] font-bold text-slate-800">"Favorite Adventures 💖"</p>
            </div>

            <div className="bg-white p-2.5 rounded-xl shadow-2xl text-slate-900 rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src={photo3} alt="Memory 3" className="w-full h-44 object-cover rounded-lg mb-2" />
              <p className="font-serif italic text-[11px] font-bold text-slate-800">"Warmth & Laughter 🌟"</p>
            </div>

            <div className="bg-white p-2.5 rounded-xl shadow-2xl text-slate-900 rotate-[4deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src={photo4} alt="Memory 4" className="w-full h-44 object-cover rounded-lg mb-2" />
              <p className="font-serif italic text-[11px] font-bold text-slate-800">"Unforgettable Joy 🥳"</p>
            </div>

            <div className="bg-white p-2.5 rounded-xl shadow-2xl text-slate-900 rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
              <img src={photo5} alt="Memory 5" className="w-full h-44 object-cover rounded-lg mb-2" />
              <p className="font-serif italic text-[11px] font-bold text-slate-800">"Pure Magic Together 💖"</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(4)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-bold text-sm rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Scratch Your Surprise Coupon</span>
            <Gift size={16} />
          </button>
        </main>
      )}

      {/* STEP 4: Interactive Scratch Card Surprise */}
      {currentStep === 4 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Special Secret Gift</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Scratch To Reveal Your Coupon 🎁</h2>
          </div>

          {/* Scratch Container */}
          <div className="relative w-full h-56 bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center">
            {/* Hidden Message Behind Scratch Layer */}
            <div className="space-y-2 z-10 px-4">
              <Gift size={32} className="mx-auto text-amber-400 animate-bounce" />
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

      {/* STEP 5: Wax-Sealed Virtual Letter Envelope */}
      {currentStep === 5 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-lg mx-auto">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Heartfelt Apology & Love</span>
            <h2 className="text-2xl font-extrabold text-white">A Letter Written Just For You ✉️</h2>
          </div>

          <div
            onClick={() => setLetterOpen(!letterOpen)}
            className={`w-full p-8 rounded-3xl border transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-xl relative overflow-hidden ${
              letterOpen
                ? "bg-slate-900/95 border-amber-500/40 text-left"
                : "bg-gradient-to-br from-slate-900 to-purple-950 border-white/20 hover:border-amber-400 text-center"
            }`}
          >
            {!letterOpen ? (
              <div className="py-8 space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-amber-300 animate-pulse">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-300">Tap Wax Seal to Open Letter</h3>
                  <p className="text-xs text-gray-400 mt-1">Unfold the special belated birthday message inside.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-amber-400 font-mono">To {personName}</span>
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                </div>
                <p className="text-slate-200 text-xs md:text-sm leading-relaxed whitespace-pre-line font-serif italic">
                  {letterText}
                </p>
                <div className="pt-2 text-right">
                  <span className="text-xs font-bold text-purple-300">With All My Love ❤️</span>
                </div>
              </div>
            )}
          </div>

          {letterOpen && (
            <button
              onClick={() => setCurrentStep(6)}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-sm rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Grand Finale Wish 🎉</span>
              <Sparkles size={16} />
            </button>
          )}
        </main>
      )}

      {/* STEP 6: Grand Finale Celebration Fireworks */}
      {currentStep === 6 && (
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-xl mx-auto">
          {/* Fireworks Canvas Background */}
          <canvas ref={fireworksCanvasRef} className="absolute inset-0 pointer-events-none z-10" />

          <div className="relative z-20 space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-1 shadow-2xl animate-bounce">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-300">
                <Award size={40} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 font-mono">{stayCute}</span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400">
                {iloveYou}
              </h1>
              <p className="text-slate-300 text-sm italic font-serif max-w-md mx-auto">
                "{meanToMe}"
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold rounded-full text-gray-300 transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={14} />
                <span>Replay Experience</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer Branding */}
      <footer className="relative z-20 text-center py-4 text-[10px] text-gray-500 tracking-wider uppercase border-t border-white/5">
        Crafted with love on <span className="text-brand-400 font-bold">Momenta</span>
      </footer>
    </div>
  );
};

export default BirthdayBelatedApology;
