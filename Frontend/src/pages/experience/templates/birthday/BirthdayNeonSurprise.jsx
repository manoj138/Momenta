import React, { useState, useEffect } from "react";
import { useApp } from "../../../../context/AppContext";
import { Sparkles, Calendar, MapPin, Gift as RevealBox, MessageSquare, CheckCircle2 } from "lucide-react";
import { guestService } from "../../../../services/guestService";
import TemplateControls from "../../../../components/common/TemplateControls";

const translations = {
  mr: {
    invited: "तुम्ही आमंत्रित आहात!",
    ordinal: "वा",
    celebrationLabel: "सोहळा",
    birthdayPerson: "वाढदिवसाची व्यक्ती",
    defaultMessage: "निऑन लाईट्स, अप्रतिम संगीत आणि छान संगतीच्या सोहळ्यात आमच्यात सामील व्हा.",
    partyDate: "पार्टीची तारीख",
    locationVenue: "समारंभाचे ठिकाण",
    unlockReveal: "गुप्त सरप्राईज उघडा",
    clickBelow: "पार्टीचे सरप्राईज पाहण्यासाठी खाली क्लिक करा.",
    revealButton: "सरप्राईज संदेश उघडा",
    defaultSurprise: "गुप्त माहिती लवकरच प्रसिद्ध केली जाईल...",
    rsvpAttendance: "उपस्थिती नोंदवा (RSVP)",
    yourName: "तुमचे नाव",
    enterName: "नाव टाका",
    wishesGreeting: "शुभेच्छा संदेश",
    defaultWish: "वाढदिवसाच्या खूप खूप शुभेच्छा!",
    submitRsvp: "आरएसव्हीपी सबमिट करा",
    guestConfirmed: "उपस्थिती निश्चित झाली!",
    wishPosted: "तुमचा शुभेच्छा संदेश बोर्डवर पोस्ट केला आहे.",
    greetingsBoard: "शुभेच्छा बोर्ड",
    friend: "मित्र",
  },
  en: {
    invited: "You Are Invited!",
    ordinal: "th",
    celebrationLabel: "Celebration",
    birthdayPerson: "Birthday Person",
    defaultMessage: "Join us for a night of neon lights, awesome beats, and great company.",
    partyDate: "Party Date",
    locationVenue: "Location Venue",
    unlockReveal: "Unlock Secret Reveal",
    clickBelow: "Click below to open the party surprise announcement box.",
    revealButton: "Reveal Secret message",
    defaultSurprise: "Shh... Surprise location and instructions go here!",
    rsvpAttendance: "RSVP Attendance",
    yourName: "Your Name",
    enterName: "Enter guest name",
    wishesGreeting: "Wishes Greeting",
    defaultWish: "Have an awesome birthday party!",
    submitRsvp: "SUBMIT RSVP",
    guestConfirmed: "Guest Confirmed!",
    wishPosted: "Your wish has been posted to the wall wall registry.",
    greetingsBoard: "Greetings Board",
    friend: "Friend",
  }
};

// Helper to select birthday character image based on person's age & gender (Boy/Girl/Man/Woman)
const getAgeImage = (ageVal, genderVal = "", personName = "") => {
  const age = parseInt(ageVal) || 1;
  const combinedStr = `${genderVal} ${personName}`.toLowerCase();
  
  // Detect female/girl keywords
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

const BirthdayNeonSurprise = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  const [isRevealed, setIsRevealed] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Language & Font resolution
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;
  
  const fontClasses = lang === "mr" ? {
    heading: "font-['Yatra_One']",
    body: "font-['Tiro_Devanagari_Marathi']",
    ageFont: "font-['Kalam']",
  } : {
    heading: "font-sans",
    body: "font-sans",
    ageFont: "font-['Kaushan_Script']",
  };

  // Synchronize language state if data changes
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
    } else {
      if (raw === "स्नेहा शिंदे") return "Sneha Shinde";
      return raw;
    }
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
      message: guestMessage,
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
  };

  return (
    <div className={`bg-slate-950 text-white min-h-screen relative select-none pb-16 overflow-x-hidden ${fontClasses.body}`}>
      {/* Reusable Template Controls (Language Switcher & Music Trigger) */}
      <TemplateControls
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        audioUrl={data.bgMusic}
        bgClass="bg-slate-900/80 backdrop-blur-md"
        textClass="text-pink-500"
        hoverClass="hover:text-pink-400 hover:scale-105 hover:bg-slate-800"
        borderClass="border-pink-500/30"
      />

      {/* Cyber Glow Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Invitation */}
      <section className="container mx-auto px-6 py-16 flex flex-col items-center text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/35 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles size={14} />
          <span>{t.invited}</span>
        </div>

        <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight ${fontClasses.heading}`}>
          {getPersonName()} <br />
          <span className={`block text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-500 font-black uppercase text-glow mt-2 mb-0 ${fontClasses.ageFont}`}>
            {data.age || "25"}{t.ordinal}
          </span>
          <span className="block text-3xl md:text-5xl text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500 font-black uppercase text-glow mt-[-8px] sm:mt-[-16px] md:mt-[-24px]">
            {t.celebrationLabel}
          </span>
        </h1>

        {/* Age-Based Birthday Character Illustration */}
        <div className="my-2 relative group">
          <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-500" />
          <img
            src={getAgeImage(data.age, data.gender, data.personName)}
            onError={(e) => {
              e.target.src = "/birthday/birthday baby boy.png";
            }}
            alt="Birthday Person Character"
            className="h-72 sm:h-88 md:h-[380px] w-auto mx-auto object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(236,72,153,0.35)] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        </div>

        <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          "{data.message || t.defaultMessage}"
        </p>

        {/* Date / Time */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm">
          {data.birthdayDate && (
            <div className="w-full bg-slate-900 border border-pink-500/20 p-4 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.05)]">
              <Calendar className="text-pink-500 shrink-0" size={24} />
              <div className="text-left space-y-0.5">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.partyDate}</span>
                <span className="text-sm font-bold">{new Date(data.birthdayDate).toLocaleDateString(undefined, { dateStyle: "long" })}</span>
              </div>
            </div>
          )}

          {data.venue && (
            <div className="w-full bg-slate-900 border border-cyan-500/20 p-4 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
              <MapPin className="text-cyan-500 shrink-0" size={24} />
              <div className="text-left space-y-0.5">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.locationVenue}</span>
                <span className="text-sm font-bold truncate max-w-[160px] block">{data.venue}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Secret Surprise Reveal Block */}
      <section className="max-w-md mx-auto px-6 py-8 relative z-10 text-center">
        <div className="bg-slate-900 border border-purple-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/25 rounded-xl flex items-center justify-center text-purple-400 mx-auto">
            <RevealBox size={24} />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-lg text-white">{t.unlockReveal}</h3>
            <p className="text-xs text-gray-400">{t.clickBelow}</p>
          </div>

          {isRevealed ? (
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-300 text-xs font-bold leading-relaxed animate-pulse">
              {data.surpriseMessage || t.defaultSurprise}
            </div>
          ) : (
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-xs tracking-wider py-3 rounded-xl cursor-pointer shadow-md transition-all uppercase"
            >
              {t.revealButton}
            </button>
          )}
        </div>
      </section>

      {/* RSVP RSVP */}
      <section className="max-w-md mx-auto px-6 py-8 relative z-10 text-center">
        <div className="bg-slate-900 border border-white/5 p-6 md:p-8 rounded-3xl space-y-6 text-left">
          <h3 className="font-bold text-lg text-brand-400">{t.rsvpAttendance}</h3>

          {rsvpSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="font-bold text-white">{t.guestConfirmed}</h4>
              <p className="text-xs text-gray-500">{t.wishPosted}</p>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="font-semibold text-gray-400 block mb-1">{t.yourName}</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t.enterName}
                  className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-400 block mb-1">{t.wishesGreeting}</label>
                <textarea
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder={t.defaultWish}
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
              >
                {t.submitRsvp}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Birthday wall comments */}
      {data.rsvpList && data.rsvpList.length > 0 && (
        <section className="max-w-md mx-auto px-6 py-8 relative z-10 text-center space-y-4">
          <h3 className="font-bold text-base text-pink-400 flex items-center justify-center gap-1.5">
            <MessageSquare size={16} />
            <span>{t.greetingsBoard}</span>
          </h3>

          <div className="grid grid-cols-1 gap-3 text-left font-sans text-xs">
            {data.rsvpList.map((rsvp, idx) => (
              <div key={idx} className="p-4 bg-slate-900 border border-white/5 rounded-2xl space-y-1.5 shadow-md">
                <div className="flex justify-between items-center text-cyan-400 font-bold">
                  <span>{rsvp.name}</span>
                  <span className="text-[8px] bg-cyan-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">{t.friend}</span>
                </div>
                {rsvp.message && <p className="text-gray-400 italic">"{rsvp.message}"</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BirthdayNeonSurprise;
