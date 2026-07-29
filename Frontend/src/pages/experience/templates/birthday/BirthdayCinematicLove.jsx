import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../../../context/AppContext";
import { Sparkles, Calendar, MapPin, Gift, MessageSquare, Check, Music, Volume2, VolumeX } from "lucide-react";
import { guestService } from "../../../../services/guestService";
import TemplateControls from "../../../../components/common/TemplateControls";

const translations = {
  mr: {
    invited: "तुम्ही आमंत्रित आहात!",
    ordinal: "वा",
    celebrationLabel: "सोहळा",
    birthdayPerson: "वाढदिवसाची व्यक्ती",
    defaultMessage: "आठवणींचा हा गोड प्रवास आणि वाढदिवसाचा भव्य सोहळा साजरा करण्यासाठी आमच्यात सामील व्हा.",
    partyDate: "तारीख व वेळ",
    locationVenue: "समारंभाचे ठिकाण",
    unlockReveal: "जादूचा गिफ्ट बॉक्स उघडा",
    clickBelow: "सरप्राईज संदेश आणि खास माहिती पाहण्यासाठी खालील गिफ्टवर क्लिक करा.",
    revealButton: "गिफ्ट बॉक्स उघडा",
    defaultSurprise: "पार्टीमध्ये एक खास सरप्राईज डान्स आणि केक कटिंग असणार आहे!",
    rsvpAttendance: "उपस्थिती निश्चित करा (RSVP)",
    yourName: "तुमचे नाव",
    enterName: "नाव टाका",
    wishesGreeting: "शुभेच्छा संदेश",
    defaultWish: "वाढदिवसाच्या खूप खूप शुभेच्छा!",
    submitRsvp: "उपस्थिती नोंदवा",
    guestConfirmed: "तुमची उपस्थिती नोंदवली गेली आहे!",
    wishPosted: "तुमचा शुभेच्छा संदेश बोर्डवर पोस्ट केला आहे.",
    greetingsBoard: "शुभेच्छा भिंत (Guest Book)",
    friend: "मित्र",
    loadingText: "आठवणींचा पेटारा उघडत आहे..."
  },
  en: {
    invited: "You Are Invited!",
    ordinal: "th",
    celebrationLabel: "Celebration",
    birthdayPerson: "Birthday Person",
    defaultMessage: "Join us for an elegant evening of cinematic storytelling, celebration, and love.",
    partyDate: "Date & Time",
    locationVenue: "Location Venue",
    unlockReveal: "Open Virtual Gift Box",
    clickBelow: "Click on the gift box below to reveal a special announcement and instructions.",
    revealButton: "Unbox Surprise",
    defaultSurprise: "Join us for a special cake-cutting ceremony and an evening of music!",
    rsvpAttendance: "RSVP Attendance",
    yourName: "Your Name",
    enterName: "Enter guest name",
    wishesGreeting: "Wishes Greeting",
    defaultWish: "Have an amazing birthday celebration!",
    submitRsvp: "Confirm Attendance",
    guestConfirmed: "Thank you for confirming your attendance!",
    wishPosted: "Your warm wish has been posted to the registry.",
    greetingsBoard: "Wishes Board (Guest Book)",
    friend: "Friend",
    loadingText: "Unlocking Cinematic Memories..."
  }
};

const getAgeImage = (ageVal, genderVal = "", personName = "") => {
  const age = parseInt(ageVal) || 1;
  const combinedStr = `${genderVal} ${personName}`.toLowerCase();
  
  const isGirl = combinedStr.includes("girl") || 
                 combinedStr.includes("female") || 
                 combinedStr.includes("woman") || 
                 combinedStr.includes("lady") || 
                 combinedStr.includes("priya") || 
                 combinedStr.includes("ananya") || 
                 combinedStr.includes("riya") || 
                 combinedStr.includes("sneha") || 
                 combinedStr.includes("pooja") || 
                 combinedStr.includes("neha");

  if (age <= 5) {
    return isGirl ? "/birthday/birthday baby girl.png" : "/birthday/birthday baby boy.png";
  } else if (age <= 12) {
    return isGirl ? "/birthday/birthday kid girl.png" : "/birthday/birthday kid boy.png";
  } else if (age <= 19) {
    return isGirl ? "/birthday/birthday teen girl.png" : "/birthday/birthday teen boy.png";
  } else {
    return isGirl ? "/birthday/birthday adult woman.png" : "/birthday/birthday adult man.png";
  }
};

const BirthdayCinematicLove = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  // Active photo in the polaroid slider
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Language & Font settings
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;
  
  const fontClasses = lang === "mr" ? {
    heading: "font-['Kalam']",
    body: "font-sans",
    romantic: "font-['Yellowtail']"
  } : {
    heading: "font-['Kaushan_Script']",
    body: "font-sans",
    romantic: "font-['Yellowtail']"
  };

  // 1. 0-100 Loader simulation
  useEffect(() => {
    let interval = null;
    if (!loadingDone) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoadingDone(true), 600);
            return 100;
          }
          return prev + Math.floor(Math.random() * 8) + 2;
        });
      }, 80);
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
    const raw = data.personName || "Birthday Person";
    if (lang === "mr") {
      if (raw.toLowerCase() === "sneha shinde") return "स्नेहा शिंदे";
      if (raw.toLowerCase() === "priya") return "प्रिया";
      if (raw.toLowerCase() === "rahul") return "राहुल";
      return raw;
    }
    return raw;
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    try {
      await guestService.submitWish({
        experience_id: data.id || 1,
        guest_name: guestName,
        message: guestMessage || t.defaultWish
      });
    } catch (err) {
      console.warn("Failed to submit wish to backend API:", err);
    }

    const rsvpObj = {
      name: guestName,
      status: "attending",
      message: guestMessage || t.defaultWish,
    };

    if (!isDemo && data.slug) {
      addRSVPToExperience(data.slug, rsvpObj);
    }

    if (data.rsvpList) {
      data.rsvpList.push(rsvpObj);
    } else {
      data.rsvpList = [rsvpObj];
    }

    setGuestName("");
    setGuestMessage("");
    setRsvpSubmitted(true);
    triggerConfetti();
  };

  // Canvas Particle & Balloon Pop System
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);
  const floatingBalloons = useRef([]);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const colors = ["#d4af37", "#f5e6ca", "#e8c5c8", "#b76e79", "#3b82f6", "#10b981"];
    for (let i = 0; i < 150; i++) {
      confettiParticles.current.push({
        x: canvas.width / 2,
        y: canvas.height - 20,
        vx: (Math.random() - 0.5) * 15,
        vy: -Math.random() * 20 - 5,
        r: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005
      });
    }
  };

  // Ambient Floating Particles & Balloons Loop
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

    // Initialize floating balloons
    floatingBalloons.current = [];
    const colors = ["#b76e79", "#d4af37", "#a78bfa", "#f472b6", "#67e8f9"];
    for (let i = 0; i < 10; i++) {
      floatingBalloons.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 300,
        vy: -Math.random() * 1.5 - 0.5,
        r: Math.random() * 18 + 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        wiggle: Math.random() * 100,
        wiggleSpeed: Math.random() * 0.02 + 0.005,
        popped: false
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update confetti particles
      confettiParticles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
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

      // 2. Draw and update floating balloons
      floatingBalloons.current.forEach((b) => {
        if (b.popped) return;
        b.y += b.vy;
        b.wiggle += b.wiggleSpeed;
        const currentX = b.x + Math.sin(b.wiggle) * 15;

        // Reset if balloon floats off the top
        if (b.y < -50) {
          b.y = canvas.height + 50;
          b.x = Math.random() * canvas.width;
        }

        // Draw balloon string
        ctx.beginPath();
        ctx.moveTo(currentX, b.y + b.r);
        ctx.quadraticCurveTo(currentX - 5, b.y + b.r + 15, currentX, b.y + b.r + 30);
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw balloon body
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(currentX - b.r/3, b.y - b.r/3, b.r/10, currentX, b.y, b.r);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
        grad.addColorStop(1, b.color);
        ctx.fillStyle = grad;
        ctx.fill();

        // Balloon knot triangle
        ctx.beginPath();
        ctx.moveTo(currentX, b.y + b.r - 2);
        ctx.lineTo(currentX - 4, b.y + b.r + 4);
        ctx.lineTo(currentX + 4, b.y + b.r + 4);
        ctx.closePath();
        ctx.fillStyle = b.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadingDone]);

  // Handle balloon click/tap interaction
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    floatingBalloons.current.forEach((b) => {
      if (b.popped) return;
      const currentX = b.x + Math.sin(b.wiggle) * 15;
      const dist = Math.hypot(clickX - currentX, clickY - b.y);
      if (dist < b.r + 10) {
        b.popped = true;
        // Trigger small burst at balloon center
        const colors = ["#d4af37", "#f5e6ca", "#e8c5c8"];
        for (let i = 0; i < 20; i++) {
          confettiParticles.current.push({
            x: currentX,
            y: b.y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            r: Math.random() * 3 + 2,
            color: b.color,
            alpha: 1,
            decay: Math.random() * 0.03 + 0.01
          });
        }
        // Respawn balloon after 3 seconds
        setTimeout(() => {
          b.popped = false;
          b.y = canvas.height + 50;
          b.x = Math.random() * canvas.width;
        }, 3000);
      }
    });
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
    <div className={`relative min-h-screen bg-slate-950 text-slate-100 select-none overflow-x-hidden font-sans pb-16`}>
      
      {/* 1. Cinematic Ambient Canvas Particle Overlay */}
      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        className="fixed inset-0 z-10 pointer-events-auto cursor-pointer"
      />

      {/* 2. Premium 0-100 Intro Loader */}
      {!loadingDone && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500">
          <div className="space-y-6 text-center max-w-sm px-6">
            {/* Elegant glowing monogram */}
            <div className="relative w-20 h-20 mx-auto rounded-full border border-gold-glow flex items-center justify-center shadow-premium animate-pulse">
              <span className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-amber-500">
                {(data.personName || "B").charAt(0).toUpperCase()}
              </span>
            </div>
            
            <h2 className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
              {t.loadingText}
            </h2>

            {/* Custom Monospace Percentage Loader */}
            <div className="font-mono text-5xl font-extrabold tracking-tight text-white/80">
              {String(loadingProgress).padStart(3, "0")}%
            </div>

            {/* Frosty Progress Bar */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-amber-400 via-rose-400 to-pink-500 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Reusable Template Controls (Language Switcher & Music Trigger) */}
      <TemplateControls
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        audioUrl={data.bgMusic || "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"}
        bgClass="bg-slate-900/60 backdrop-blur-md"
        textClass="text-amber-400"
        hoverClass="hover:text-amber-300 hover:scale-105 hover:bg-slate-800"
        borderClass="border-amber-500/20"
      />

      {/* 3. Main Premium Cinematic Content */}
      <div className={`relative z-20 transition-all duration-1000 ${loadingDone ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12"}`}>
        
        {/* HERO TITLE DECK */}
        <section className="container mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 shadow-[0_0_15px_rgba(212,175,87,0.15)] animate-bounce">
            <Sparkles size={13} />
            <span>{t.invited}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none uppercase">
            <span className="block text-xl sm:text-2xl tracking-[0.2em] font-medium text-gray-400 capitalize mb-4">
              Celebrating The Life of
            </span>
            <span className="block text-gradient font-extrabold pb-2">
              {getPersonName()}
            </span>
            <span className={`block text-8xl sm:text-9xl md:text-[11rem] leading-none text-white/95 font-bold font-serif my-2 tracking-tighter filter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]`}>
              {data.age || "25"}{t.ordinal}
            </span>
            <span className={`block text-3xl sm:text-5xl font-light text-amber-400 font-serif tracking-[0.1em] lowercase mt-[-10px]`}>
              {t.celebrationLabel}
            </span>
          </h1>

          <p className="max-w-md mx-auto text-gray-400 text-sm leading-relaxed tracking-wide pt-4">
            {data.description || t.defaultMessage}
          </p>
        </section>

        {/* 4. MEMORIES PARALLAX TIMELINE */}
        <section className="container mx-auto px-6 py-20 relative max-w-xl">
          <div className="absolute top-0 bottom-0 left-[21px] w-[1px] bg-linear-to-b from-amber-500/60 via-rose-500/40 to-slate-800" />
          
          <h2 className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-bold mb-12 pl-12">
            The Journey So Far
          </h2>

          <div className="space-y-12">
            {/* Timeline nodes */}
            {[
              { year: "The Beginnings", title: "Pure Joy & Sweet Innocence", desc: "Where the journey started. Every smile brought warmth and light into the world." },
              { year: "Growing Up", title: "Learning, Loving, Laughing", desc: "Building dreams, making lifelong friends, and creating unforgettable memories along the way." },
              { year: "This Milestone", title: "Stronger, Wiser, Radiant", desc: "Embracing the beauty of today. Ready to welcome a new year of endless opportunities." }
            ].map((node, index) => (
              <div key={index} className="flex gap-6 relative group">
                {/* Node Dot */}
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-500/80 flex items-center justify-center shadow-lg shrink-0 relative z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                </div>
                
                {/* Memory details */}
                <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-2 hover:border-amber-500/30 transition-all duration-300 flex-1 shadow-premium">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    {node.year}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {node.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 3D POLAROID GALLERY DECK */}
        <section className="container mx-auto px-6 py-16 flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-bold mb-8">
            Memory Polaroid Cards
          </h2>

          <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center overflow-hidden">
            {photos.map((src, index) => {
              const isActive = index === activePhotoIndex;
              // Simple stack layers rotation and offsets
              const offset = (index - activePhotoIndex) * 8;
              const rotate = (index - activePhotoIndex) * 4;
              const scale = 1 - Math.abs(index - activePhotoIndex) * 0.05;
              const zIndex = 30 - Math.abs(index - activePhotoIndex);

              return (
                <div
                  key={index}
                  onClick={() => setActivePhotoIndex(index)}
                  className="absolute w-72 bg-white text-slate-900 p-4 pb-12 rounded-xl shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
                  style={{
                    transform: `translateY(${offset}px) rotate(${rotate}deg) scale(${scale})`,
                    zIndex: zIndex,
                    opacity: Math.abs(index - activePhotoIndex) > 2 ? 0 : 1,
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  <div className="w-full h-56 bg-slate-100 rounded-lg overflow-hidden relative">
                    <img src={src} alt="Polaroid Memory" className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-4 text-center">
                    <span className="font-serif text-lg tracking-tight text-slate-800 font-semibold italic">
                      Memories Together
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple controls */}
          <div className="flex gap-3 mt-4 z-30">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePhotoIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activePhotoIndex ? "bg-amber-400" : "bg-slate-700"}`}
              />
            ))}
          </div>
        </section>

        {/* 6. INVITATION & ADDRESS BLOCK */}
        <section className="container mx-auto px-6 py-16 max-w-md">
          <div className="bg-slate-900/60 backdrop-blur-lg border border-white/5 p-8 rounded-3xl space-y-6 text-center shadow-premium relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-xl">
              <Calendar size={20} className="text-white" />
            </div>

            <h3 className="text-xl font-bold pt-2">{t.partyDate}</h3>
            
            <div className="space-y-1 text-sm">
              <p className="text-white font-semibold">{data.eventDate || "Saturday, October 18"}</p>
              <p className="text-gray-400">{data.eventTime || "7:00 PM Onwards"}</p>
            </div>

            <div className="border-t border-white/5 pt-4">
              <div className="flex justify-center text-amber-400 mb-2">
                <MapPin size={22} />
              </div>
              <h4 className="text-base font-bold text-white">{t.locationVenue}</h4>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto mt-1">
                {data.venueName || "Skyline Lounge, Royal Park"}<br />
                {data.venueAddress || "123 Elegance Road, Sector 5"}
              </p>
            </div>
          </div>
        </section>

        {/* 7. VIRTUAL GIFT BOX UNBOXING */}
        <section className="container mx-auto px-6 py-16 flex flex-col items-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-bold mb-4">
            {t.unlockReveal}
          </h2>
          <p className="text-center text-gray-400 text-xs max-w-xs mb-8">
            {t.clickBelow}
          </p>

          <div 
            onClick={() => {
              setIsGiftOpened(!isGiftOpened);
              if (!isGiftOpened) triggerConfetti();
            }}
            className="w-48 h-48 bg-slate-900 border border-white/5 rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-amber-500/30 transition-all duration-300 shadow-premium group relative overflow-hidden"
          >
            {/* Floating glowing aura */}
            <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {!isGiftOpened ? (
              <div className="text-center space-y-4 animate-bounce">
                <div className="p-4 bg-amber-500/10 rounded-full text-amber-400 flex items-center justify-center">
                  <Gift size={32} />
                </div>
                <span className="text-xs font-bold text-amber-400">{t.revealButton}</span>
              </div>
            ) : (
              <div className="text-center space-y-3 animate-fade-in">
                <Check className="text-emerald-400 mx-auto" size={28} />
                <p className="text-xs text-gray-300 leading-relaxed max-w-[150px] mx-auto">
                  {data.secretReveal || t.defaultSurprise}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 8. INTERACTIVE RSVP FORM */}
        <section className="container mx-auto px-6 py-16 max-w-md">
          <div className="bg-slate-900/60 backdrop-blur-lg border border-white/5 p-8 rounded-3xl space-y-6 shadow-premium relative">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <MessageSquare size={18} className="text-amber-400" />
              <span>{t.rsvpAttendance}</span>
            </h3>

            {!rsvpSubmitted ? (
              <form onSubmit={handleRSVPSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.enterName}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                    {t.wishesGreeting}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={t.defaultWish}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    className="w-full p-3.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3.5 bg-linear-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95 transition-all"
                >
                  {t.submitRsvp}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <Check size={22} />
                </div>
                <h4 className="text-sm font-bold text-white">{t.guestConfirmed}</h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {t.wishPosted}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 9. GUESTBOOK WISHES BOARD */}
        {((data.rsvpList && data.rsvpList.length > 0) || isDemo) && (
          <section className="container mx-auto px-6 py-16 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-bold text-center mb-8">
              {t.greetingsBoard}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
              {(data.rsvpList || [
                { name: "John Doe", message: "Wishing you a cinematic and elegant birthday party!" },
                { name: "Sarah Connor", message: "Can't wait to celebrate with the skyline background!" }
              ]).map((wish, index) => (
                <div key={index} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl space-y-2 hover:border-amber-500/20 transition-all duration-300 shadow-premium">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{wish.name}</span>
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">{t.friend}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed italic">
                    "{wish.message || t.defaultWish}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. CINEMATIC FOOTER SIGN-OFF */}
        <footer className="container mx-auto px-6 pt-16 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5">
          <p>© {new Date().getFullYear()} Momenta. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default BirthdayCinematicLove;
