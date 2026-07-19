import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Trophy, Heart, ShieldCheck, HeartHandshake } from "lucide-react";
import Button from "../../components/common/Button";

const About = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 space-y-16">
        
        {/* Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-400">
            <Sparkles size={12} />
            <span>Our Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">About Momenta</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            We are a creative engineering platform helping people build premium interactive, media-rich animated digital cards for weddings, birthdays, proposals, anniversaries, and corporate events.
          </p>
        </div>

        {/* Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-400 to-indigo-400">Our Vision</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              In a digital age, invitations should be more than static images or plain PDF files. We want to make invites feel like a dynamic narrative that builds anticipation, shares beautiful photography, loops background music, collects RSVP attendance statistics instantly, and maps venues in real time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl text-center space-y-1">
              <Trophy className="text-yellow-500 mx-auto" size={24} />
              <span className="block text-xl font-bold">100%</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Premium Quality</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-center space-y-1">
              <Heart className="text-pink-500 mx-auto" size={24} />
              <span className="block text-xl font-bold">10K+</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Wishes Sent</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-center space-y-1">
              <ShieldCheck className="text-emerald-500 mx-auto" size={24} />
              <span className="block text-xl font-bold">Safe</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Private Links</span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl text-center space-y-1">
              <HeartHandshake className="text-teal-500 mx-auto" size={24} />
              <span className="block text-xl font-bold">99%</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase">Happy Couples</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h3 className="text-xl font-bold">Join the digital celebration movement.</h3>
          <div className="flex justify-center gap-4">
            <Link to="/templates">
              <Button variant="primary" className="cursor-pointer px-6">Explore Themes</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white cursor-pointer px-6">Contact Us</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
