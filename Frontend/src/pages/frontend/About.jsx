import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Trophy, Heart, ShieldCheck, HeartHandshake } from "lucide-react";
import Button from "../../components/common/Button";
import { cmsService } from "../../services/cmsService";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    cmsService.getByKey('about_page')
      .then(res => {
        if (isMounted && res.status && res.data) {
          setAboutData(res.data.content);
        }
      })
      .catch(err => console.warn("Using default about page fallback", err));

    return () => { isMounted = false; };
  }, []);

  const title = aboutData?.title || "Reimagining Special Celebrations for the Modern Web";
  const subtitle = aboutData?.subtitle || "We craft immersive, interactive digital experiences that turn traditional invitations into unforgettable memories.";
  const mission = aboutData?.mission || "In a digital age, invitations should be more than static images or plain PDF files. We want to make invites feel like a dynamic narrative that builds anticipation, shares beautiful photography, loops background music, collects RSVP attendance statistics instantly, and maps venues in real time.";
  const stats = aboutData?.stats || [
    { number: "100%", label: "PREMIUM QUALITY" },
    { number: "10K+", label: "WISHES SENT" },
    { number: "Safe", label: "PRIVATE LINKS" },
    { number: "99%", label: "HAPPY COUPLES" }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen py-20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 space-y-16">
        
        {/* Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-205 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full text-xs text-brand-650 dark:text-brand-400 font-semibold">
            <Sparkles size={12} />
            <span>Our Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white dark:bg-slate-900/40 border border-gray-200 dark:border-white/5 rounded-3xl p-8 md:p-10 shadow-premium">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-600 to-indigo-650 dark:from-brand-400 dark:to-indigo-400">Our Vision & Mission</h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
              {mission}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-white/5 border border-gray-150 dark:border-white/5 rounded-2xl text-center space-y-1">
                {idx === 0 && <Trophy className="text-yellow-500 mx-auto" size={24} />}
                {idx === 1 && <Heart className="text-pink-500 mx-auto" size={24} />}
                {idx === 2 && <ShieldCheck className="text-emerald-500 mx-auto" size={24} />}
                {idx === 3 && <HeartHandshake className="text-teal-500 mx-auto" size={24} />}
                <span className="block text-xl font-bold">{s.number}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h3 className="text-xl font-bold">Join the digital celebration movement.</h3>
          <div className="flex justify-center gap-4">
            <Link to="/templates">
              <Button variant="primary" className="cursor-pointer">Explore All Templates</Button>
            </Link>
            <Link to="/enquiry">
              <Button variant="outline" className="cursor-pointer">Custom Request</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
