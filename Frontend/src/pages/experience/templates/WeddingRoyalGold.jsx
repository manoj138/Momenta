import React, { useState, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { Heart, Calendar, MapPin, Music, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";
import PremiumAudioPlayer from "../../../components/common/PremiumAudioPlayer";

const WeddingRoyalGold = ({ data = {}, isDemo = false }) => {
  const { addRSVPToExperience } = useApp();
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(isDemo); // Skip envelope in studio demo
  
  // RSVP Form States
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState("attending");
  const [guestMessage, setGuestMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

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
      <div className="fixed inset-0 bg-stone-900 z-50 flex items-center justify-center p-6 text-center select-none">
        <div className="max-w-md w-full bg-[#fdfaf2] border-4 border-amber-600 rounded-3xl p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-double">
          <div className="w-16 h-16 bg-amber-100 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-700 mx-auto animate-bounce">
            <Heart size={30} fill="currentColor" />
          </div>
          <div className="space-y-3 font-serif">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block">Wedding Invitation</span>
            <h2 className="text-3xl font-extrabold text-amber-950">
              {data.brideName || "Bride"} <span className="text-amber-600">&amp;</span> {data.groomName || "Groom"}
            </h2>
            <p className="text-xs text-amber-900/70 max-w-xs mx-auto">Click below to open the virtual golden envelope and reveal the details.</p>
          </div>
          <button
            onClick={() => setIsOpenEnvelope(true)}
            className="bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold tracking-widest px-8 py-3 rounded-full cursor-pointer transition-all shadow-lg hover:scale-105"
          >
            OPEN INVITATION
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcf9f2] text-stone-950 min-h-screen relative font-sans overflow-x-hidden selection:bg-amber-100 pb-16">
      {/* Background audio */}
      {data.bgMusic && <PremiumAudioPlayer audioUrl={data.bgMusic} />}

      {/* Hero Cover Card */}
      <section className="min-h-screen flex flex-col justify-center items-center p-6 text-center border-b border-amber-150 relative">
        {/* Double Gold Line Border */}
        <div className="absolute inset-4 md:inset-8 border border-amber-500/20 pointer-events-none rounded-2xl" />
        <div className="absolute inset-5 md:inset-9 border border-amber-500/35 pointer-events-none rounded-2xl" />

        <div className="max-w-xl mx-auto space-y-8 relative z-10 font-serif">
          <div className="w-10 h-10 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-600 mx-auto">
            <Heart size={18} fill="currentColor" />
          </div>
          
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800">Save The Date</span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-950 leading-tight">
            {data.brideName || "Bride"} <br />
            <span className="text-2xl md:text-3xl text-amber-600 block my-2 font-light italic">and</span>
            {data.groomName || "Groom"}
          </h1>

          <p className="text-sm font-sans text-stone-600 max-w-xs mx-auto italic">
            "{data.welcomeMessage || "We invite you to share our joy as we begin our new life together."}"
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
              { label: "Days", val: timeLeft.days },
              { label: "Hours", val: timeLeft.hours },
              { label: "Mins", val: timeLeft.minutes },
              { label: "Secs", val: timeLeft.seconds },
            ].map((t, idx) => (
              <div key={idx} className="bg-amber-100/50 border border-amber-200/40 p-2.5 rounded-xl shadow-xs">
                <span className="block text-lg font-bold text-amber-900">{String(t.val).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-700 font-bold">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue & Event Details */}
      <section className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8 font-serif">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-800">Celebration Details</span>
        <h2 className="text-3xl font-extrabold text-amber-950">Where &amp; When</h2>
        
        <div className="bg-white/60 border border-amber-200/40 p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 mx-auto">
            <MapPin size={22} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-amber-950">{data.venueName || "Venue Name"}</h4>
            <p className="text-sm font-sans text-stone-600 max-w-md mx-auto leading-relaxed">{data.venueAddress || "Complete Address Details"}</p>
          </div>

          {data.mapsLink && (
            <div className="pt-2">
              <a
                href={data.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold text-xs tracking-wider px-5 py-2.5 rounded-full cursor-pointer transition-all shadow-md"
              >
                <span>GET LOCATION MAP</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* RSVP Section */}
      <section className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 font-serif">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-800">Confirm Attendance</span>
        <h2 className="text-3xl font-extrabold text-amber-950">Will You Attend?</h2>

        <div className="bg-white border border-amber-200/40 p-6 md:p-8 rounded-3xl shadow-sm text-left">
          {rsvpSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold text-amber-950">RSVP Submitted!</h4>
              <p className="text-xs text-stone-500">Thank you for confirming your response. We look forward to celebrating with you.</p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="text-xs font-bold text-amber-800 underline hover:text-amber-950 mt-2 bg-transparent border-0 cursor-pointer"
              >
                Change Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-750 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter guest name"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-750 block mb-1">Number of Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-750 block mb-1">Attendance Preference</label>
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
                    Yes, I will attend
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
                    Sorry, I cannot attend
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-750 block mb-1">Send a Greeting Message</label>
                <textarea
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Congratulations to the couple..."
                  rows={3}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white font-serif font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
              >
                SUBMIT RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wishes Wall Wall */}
      {data.rsvpList && data.rsvpList.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8 font-serif">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-800">Wedding Registry</span>
          <h2 className="text-3xl font-extrabold text-amber-950 flex items-center justify-center gap-1.5">
            <MessageSquare size={22} className="text-amber-700" />
            <span>Greetings &amp; Wishes</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans text-xs">
            {data.rsvpList.map((rsvp, idx) => (
              <div key={idx} className="p-4 bg-white border border-amber-100 rounded-2xl space-y-2 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-950">{rsvp.name}</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold capitalize ${
                    rsvp.status === "attending" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    {rsvp.status === "attending" ? "Attending" : "Declined"}
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
