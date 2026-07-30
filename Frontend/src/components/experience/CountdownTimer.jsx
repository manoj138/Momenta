import React, { useState, useEffect } from "react";

/**
 * CountdownTimer component for live event countdowns.
 * 
 * @param {string|Date} targetDate - Target event date string or Date object
 * @param {string} [title="Counting down to the special day"] - Title header
 */
const CountdownTimer = ({ targetDate, title = "Counting down to the special day" }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="p-6 bg-pink-500/10 border border-pink-500/20 rounded-3xl text-center animate-fade-in">
        <span className="text-xl font-bold text-pink-400">🎉 Today is the Big Day! Celebrate & Enjoy! 🥳</span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-4 text-center">
      {title && <p className="text-xs uppercase tracking-widest text-pink-400 font-bold">{title}</p>}
      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="p-3 md:p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center shadow-lg"
          >
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
