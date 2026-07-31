import React, { useState, useEffect } from "react";
import { useApp } from "../../../../context/AppContext";
import { Heart, Calendar, MapPin, CheckCircle2, MessageSquare } from "lucide-react";
import { guestService } from "../../../../services/guestService";
import TemplateControls from "../../../../components/common/TemplateControls";

const translations = {
  mr: {
    invitationTitle: "लग्न पत्रिका",
    saveTheDate: "निमंत्रण",
    openInvitation: "निमंत्रण उघडा",
    envelopeMessage: "डिजिटल सुवर्ण पाकीट उघडण्यासाठी आणि तपशील पाहण्यासाठी खाली क्लिक करा.",
    and: "आणि",
    celebrationDetails: "समारंभाचे तपशील",
    whereAndWhen: "कधी आणि कुठे",
    getLocationMap: "नकाशावर पाहा",
    confirmAttendance: "उपस्थिती निश्चित करा",
    willYouAttend: "आपण उपस्थित राहणार का?",
    yourName: "तुमचे नाव",
    enterName: "नाव टाका",
    numberOfGuests: "पाहुण्यांची संख्या",
    attendancePreference: "उपस्थिती पर्याय",
    yesAttend: "होय, मी उपस्थित राहीन",
    noAttend: "नाही, मी येऊ शकणार नाही",
    sendGreeting: "शुभेच्छा संदेश पाठवा",
    congratsPlaceholder: "वधू-वरांना शुभेच्छा संदेश पाठवा...",
    submitRsvp: "आरएसव्हीपी सबमिट करा",
    rsvpSubmitted: "आरएसव्हीपी सबमिट केले गेले!",
    rsvpSuccessMsg: "उपस्थिती निश्चित केल्याबद्दल धन्यवाद. आम्ही सोहळ्यात तुमची वाट पाहत आहोत.",
    changeResponse: "उत्तर बदला",
    weddingRegistry: "शुभेच्छा भिंत",
    greetingsAndWishes: "शुभेच्छा आणि आशीर्वाद",
    attending: "उपस्थित राहणार",
    declined: "येणार नाही",
    guest: "पाहुणा",
    guests: "पाहुणे",
    days: "दिवस",
    hours: "तास",
    mins: "मिनिटे",
    secs: "सेकंड",
  },
  en: {
    invitationTitle: "Wedding Invitation",
    saveTheDate: "Save The Date",
    openInvitation: "OPEN INVITATION",
    envelopeMessage: "Click below to open the virtual golden envelope and reveal the details.",
    and: "and",
    celebrationDetails: "Celebration Details",
    whereAndWhen: "Where & When",
    getLocationMap: "GET LOCATION MAP",
    confirmAttendance: "Confirm Attendance",
    willYouAttend: "Will You Attend?",
    yourName: "Your Name",
    enterName: "Enter guest name",
    numberOfGuests: "Number of Guests",
    attendancePreference: "Attendance Preference",
    yesAttend: "Yes, I will attend",
    noAttend: "Sorry, I cannot attend",
    sendGreeting: "Send a Greeting Message",
    congratsPlaceholder: "Congratulations to the couple...",
    submitRsvp: "SUBMIT RSVP",
    rsvpSubmitted: "RSVP Submitted!",
    rsvpSuccessMsg: "Thank you for confirming your response. We look forward to celebrating with you.",
    changeResponse: "Change Response",
    weddingRegistry: "Wedding Registry",
    greetingsAndWishes: "Greetings & Wishes",
    attending: "Attending",
    declined: "Declined",
    guest: "Guest",
    guests: "Guests",
    days: "Days",
    hours: "Hours",
    mins: "Mins",
    secs: "Secs",
  }
};

const WeddingRoyalGold = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(isDemo); // Skip envelope in studio demo
  
  // RSVP Form States
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState("attending");
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Language & Font resolution
  const [currentLang, setCurrentLang] = useState(data.language || "en");
  const lang = currentLang;
  const t = translations[lang] || translations.en;
  
  const fontClasses = lang === "mr" ? {
    heading: "font-['Yatra_One']",
    body: "font-['Tiro_Devanagari_Marathi']",
  } : {
    heading: "font-serif",
    body: "font-serif",
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

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const eventDate = data.weddingDate ? new Date(data.weddingDate) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // Default 30 days out

  useEffect(() => {
    const calculateTime = () => {
      const difference = +eventDate - +new Date();
      let tempTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      if (difference > 0) {
        tempTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(tempTime);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.weddingDate]);

  const getGroomName = () => {
    const raw = data.groomName || "Groom";
    if (lang === "mr") {
      if (raw.toLowerCase() === "rahul") return "राहुल";
      return raw;
    }
    return raw;
  };

  const getBrideName = () => {
    const raw = data.brideName || "Priya";
    if (lang === "mr") {
      if (raw.toLowerCase() === "priya") return "प्रिया";
      return raw;
    }
    return raw;
  };

  const getVenueName = () => {
    const raw = data.venueName || "Venue Name";
    if (lang === "mr") {
      if (raw.toLowerCase() === "maratha durbar hall") return "मराठा दरबार हॉल";
      return raw;
    }
    return raw;
  };

  const getVenueAddress = () => {
    const raw = data.venueAddress || "Complete Address Details";
    if (lang === "mr") {
      if (raw.toLowerCase().includes("jm road") || raw.toLowerCase().includes("shivajinagar")) {
        return "जे. एम. रोड, शिवाजीनगर, पुणे";
      }
      return raw;
    }
    return raw;
  };

  const getWelcomeMessage = () => {
    const raw = data.welcomeMessage || "We invite you to share our joy as we begin our new life together.";
    if (lang === "mr") {
      if (raw.includes("We invite you to share our joy")) {
        return "आम्ही आमच्या नवीन आयुष्याची सुरुवात करत असताना, आमचा आनंद द्विगुणित करण्यासाठी तुम्हाला आमंत्रित करतो.";
      }
      return raw;
    }
    return raw;
  };

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const rsvpObj = {
      name: guestName,
      count: Number(guestCount),
      status: rsvpStatus,
      message: guestMessage,
    };

    try {
      await guestService.submitRsvp({
        experience_id: data._id || data.dbId || data.id || data.slug,
        guest_name: guestName,
        attending_status: rsvpStatus,
        guest_count: Number(guestCount),
        notes: guestMessage
      });
    } catch (err) {
      console.warn("Failed to submit RSVP to backend API:", err);
    }

    if (!isDemo && data.slug) {
      addRSVPToExperience(data.slug, rsvpObj);
    }
    
    // Optimistic UI updates
    if (data.rsvpList) {
      data.rsvpList.push(rsvpObj);
    } else {
      data.rsvpList = [rsvpObj];
    }

    setGuestName("");
    setGuestMessage("");
    setRsvpSubmitted(true);
  };

  // Render Gold Envelope Overlay
  if (!isOpenEnvelope) {
    return (
      <div className={`fixed inset-0 bg-stone-900 z-50 flex items-center justify-center p-6 text-center select-none ${fontClasses.body}`}>
        {/* Floating Language Switcher only on Cover Envelope */}
        <button
          onClick={toggleLanguage}
          className="absolute top-6 left-6 z-50 w-9 h-9 rounded-full bg-amber-800 text-stone-100 shadow-lg cursor-pointer hover:bg-amber-900 hover:scale-105 transition-all border border-amber-700/30 flex items-center justify-center font-sans font-bold text-xs"
          title="Toggle Language / भाषा बदला"
        >
          {currentLang === "mr" ? "EN" : "म"}
        </button>

        <div className="max-w-md w-full bg-[#fdfaf2] border-4 border-amber-600 rounded-3xl p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-double">
          <div className="w-16 h-16 bg-amber-100 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-700 mx-auto animate-bounce">
            <Heart size={30} fill="currentColor" />
          </div>
          <div className="space-y-3 font-serif">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">{t.invitationTitle}</span>
            <h2 className={`text-3xl font-extrabold text-amber-950 ${fontClasses.heading}`}>
              {getBrideName()} <span className="text-amber-600">{t.and}</span> {getGroomName()}
            </h2>
            <p className="text-xs text-amber-900/70 max-w-xs mx-auto">{t.envelopeMessage}</p>
          </div>
          <button
            onClick={() => setIsOpenEnvelope(true)}
            className="bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold tracking-widest px-8 py-3 rounded-full cursor-pointer transition-all shadow-lg hover:scale-105 border-0"
          >
            {t.openInvitation}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-[#fcf9f2] text-stone-950 min-h-screen relative overflow-x-hidden selection:bg-amber-100 pb-16 ${fontClasses.body}`}>
      {/* Reusable Template Controls (Language Switcher & Music Trigger) */}
      <TemplateControls
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        audioUrl={data.bgMusic}
        bgClass="bg-amber-800"
        textClass="text-stone-100"
        hoverClass="hover:bg-amber-900 hover:scale-105"
        borderClass="border-amber-700/30"
      />

      {/* Hero Cover Card */}
      <section className="min-h-screen flex flex-col justify-center items-center p-6 text-center border-b border-amber-150 relative">
        {/* Double Gold Line Border */}
        <div className="absolute inset-4 md:inset-8 border border-amber-500/20 pointer-events-none rounded-2xl" />
        <div className="absolute inset-5 md:inset-9 border border-amber-500/35 pointer-events-none rounded-2xl" />

        <div className="max-w-xl mx-auto space-y-8 relative z-10 font-serif">
          <div className="w-10 h-10 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-600 mx-auto">
            <Heart size={18} fill="currentColor" />
          </div>
          
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800">{t.saveTheDate}</span>
          
          <h1 className={`text-4xl md:text-6xl font-extrabold text-amber-950 leading-tight ${fontClasses.heading}`}>
            {getBrideName()} <br />
            <span className="text-2xl md:text-3xl text-amber-600 block my-2 font-light italic">{t.and}</span>
            {getGroomName()}
          </h1>

          <p className="text-sm font-sans text-stone-600 max-w-xs mx-auto italic">
            "{getWelcomeMessage()}"
          </p>

          <div className="w-24 h-[1px] bg-amber-400 mx-auto" />

          {/* Date info block */}
          {data.weddingDate && (
            <div className="space-y-1">
              <span className="block text-lg font-bold text-amber-950 uppercase tracking-wider">
                {new Date(data.weddingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="block text-xs font-semibold text-amber-700 uppercase tracking-widest">
                Timing: {data.weddingTime || "11:30 AM"}
              </span>
            </div>
          )}

          {/* Countdown timer */}
          <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto pt-4 font-sans">
            {[
              { label: t.days, val: timeLeft.days },
              { label: t.hours, val: timeLeft.hours },
              { label: t.mins, val: timeLeft.minutes },
              { label: t.secs, val: timeLeft.seconds },
            ].map((tVal, idx) => (
              <div key={idx} className="bg-amber-100/50 border border-amber-200/40 p-2.5 rounded-xl shadow-xs">
                <span className="block text-lg font-bold text-amber-900">{String(tVal.val).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-700 font-bold">{tVal.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Event Details */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8 font-serif">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-800">{t.celebrationDetails}</span>
        <h2 className={`text-3xl font-extrabold text-amber-950 ${fontClasses.heading}`}>{t.whereAndWhen}</h2>
        
        <div className="bg-white/60 border border-amber-200/40 p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 mx-auto">
            <MapPin size={22} />
          </div>
          <div className="space-y-2 text-center">
            <h4 className={`text-xl font-bold text-amber-950 ${fontClasses.heading}`}>{getVenueName()}</h4>
            <p className="text-sm font-sans text-stone-600 max-w-md mx-auto leading-relaxed">{getVenueAddress()}</p>
          </div>

          {data.mapsLink && (
            <div className="pt-2">
              <a
                href={data.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold text-xs tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-md border-0"
              >
                <span>{t.getLocationMap}</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* RSVP Section */}
      <section className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 font-serif">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-800">{t.confirmAttendance}</span>
        <h2 className={`text-3xl font-extrabold text-amber-950 ${fontClasses.heading}`}>{t.willYouAttend}</h2>

        <div className="bg-white border border-amber-200/40 p-6 md:p-8 rounded-3xl shadow-sm text-left">
          {rsvpSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h4 className={`text-lg font-bold text-amber-950 ${fontClasses.heading}`}>{t.rsvpSubmitted}</h4>
              <p className="text-xs text-stone-500">{t.rsvpSuccessMsg}</p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-xs font-bold text-amber-800 underline hover:text-amber-950 mt-2 bg-transparent border-0 cursor-pointer"
              >
                {t.changeResponse}
              </button>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-750 block mb-1">{t.yourName}</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t.enterName}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-750 block mb-1">{t.numberOfGuests}</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs text-stone-700 font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? t.guest : t.guests}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-750 block mb-1">{t.attendancePreference}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpStatus("attending")}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      rsvpStatus === "attending"
                        ? "bg-amber-800 border-amber-800 text-white shadow-sm"
                        : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {t.yesAttend}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpStatus("declined")}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      rsvpStatus === "declined"
                        ? "bg-amber-800 border-amber-800 text-white shadow-sm"
                        : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {t.noAttend}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-750 block mb-1">{t.sendGreeting}</label>
                <textarea
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder={t.congratsPlaceholder}
                  rows={3}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md border-0"
              >
                {t.submitRsvp}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wishes Wall */}
      {data.rsvpList && data.rsvpList.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 font-serif">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800">{t.weddingRegistry}</span>
          <h2 className={`text-3xl font-extrabold text-amber-950 flex items-center justify-center gap-1.5 ${fontClasses.heading}`}>
            <MessageSquare size={22} className="text-amber-700" />
            <span>{t.greetingsAndWishes}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans text-xs">
            {data.rsvpList.map((rsvp, idx) => (
              <div key={idx} className="p-4 bg-white border border-amber-100 rounded-2xl space-y-2 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-950">{rsvp.name}</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold capitalize ${
                    rsvp.status === "attending" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    {rsvp.status === "attending" ? t.attending : t.declined}
                  </span>
                </div>
                {rsvp.message && <p className="text-stone-600 italic">"{rsvp.message}"</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default WeddingRoyalGold;
