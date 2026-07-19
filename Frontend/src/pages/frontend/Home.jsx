import React from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Gift, Flame, Send, ArrowRight, CheckCircle2, Music, Smartphone, Globe, Eye } from "lucide-react";
import AnimatedCard from "../../components/common/AnimatedCard";
import Button from "../../components/common/Button";

const Home = () => {
  const categories = [
    { id: "wedding", name: "Wedding", desc: "Cinematic, traditional & luxury invitations.", icon: <Heart className="text-pink-500" size={24} /> },
    { id: "birthday", name: "Birthday", desc: "Fun, playful, & neon reveal designs.", icon: <Sparkles className="text-yellow-500" size={24} /> },
    { id: "proposal", name: "Proposal", desc: "Romantic storybook animations.", icon: <Flame className="text-red-500" size={24} /> },
    { id: "anniversary", name: "Anniversary", desc: "Interactive timelines of love.", icon: <Gift className="text-indigo-500" size={24} /> },
    { id: "surprise", name: "Surprise", desc: "Mystery countdowns & instant reveals.", icon: <Send className="text-teal-500" size={24} /> },
    { id: "company", name: "Company", desc: "Clean corporate invites & launch events.", icon: <Globe className="text-blue-500" size={24} /> },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-semibold text-brand-400">
            <Sparkles size={14} />
            <span>Premium Interactive Card Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Turn Your Special Moments Into <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-400 via-indigo-400 to-pink-400">
              Animated Digital Experiences
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
            No boring PDF files. We create interactive, responsive, animated digital invitations and memory walls with countdowns, music playback, location mapping, and live RSVP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/templates">
              <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20">
                <span>Explore Templates</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/enquiry">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 cursor-pointer">
                Create Your Experience
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Phone Preview Mock in Hero */}
        <div className="flex-1 flex justify-center w-full relative">
          <div className="absolute inset-0 bg-linear-to-tr from-brand-500/20 to-pink-500/20 rounded-full blur-[100px] opacity-60 pointer-events-none" />
          <div className="w-[310px] h-[580px] border-[10px] border-slate-900 rounded-[38px] shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden relative bg-cream-50 flex flex-col animate-float">
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-50" />
            
            {/* Embedded Mini-Demo Screen */}
            <div className="flex-1 overflow-auto h-full w-full bg-amber-50/20 relative flex flex-col p-4 pt-8 text-center text-slate-800">
              <div className="flex-1 flex flex-col justify-center items-center py-6 border border-amber-200/40 rounded-2xl bg-amber-50/10 shadow-sm">
                <Heart className="text-amber-600 animate-pulse mb-3" size={32} />
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold mb-1">Save The Date</span>
                <h3 className="font-serif text-2xl font-bold text-amber-950 mb-1">Rahul & Priya</h3>
                <div className="w-12 h-[1px] bg-amber-300 my-2" />
                <p className="text-[10px] text-amber-900 max-w-[180px] mb-4">Are getting married. Please join us to celebrate our love.</p>
                <div className="bg-amber-900 text-amber-100 text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold mb-4">
                  Nov 20, 2026
                </div>
                <div className="flex items-center gap-1.5 bg-amber-100/60 px-3 py-1.5 rounded-xl border border-amber-200/50">
                  <Music className="text-amber-800 animate-spin" size={10} style={{ animationDuration: '3s' }} />
                  <span className="text-[9px] font-bold text-amber-900">Background Tune Playing</span>
                </div>
              </div>
              <div className="mt-4 bg-white/60 backdrop-blur-sm border border-slate-200/50 p-2.5 rounded-xl shadow-xs">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                  <span>RSVP Status</span>
                  <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">122 Attending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Concept Info */}
      <section className="bg-slate-900/60 border-y border-white/5 py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Momenta Experiences?</h2>
            <p className="text-gray-400">Traditional invites are lost in chats. Momenta experiences are remembered forever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard className="bg-slate-900/40">
              <Smartphone className="text-brand-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Mobile Friendly First</h3>
              <p className="text-gray-400 text-sm">Every template matches perfectly to mobile viewports, enabling fast touch interactions and messaging-app sharing.</p>
            </AnimatedCard>
            <AnimatedCard className="bg-slate-900/40">
              <Music className="text-indigo-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Background Music & Media</h3>
              <p className="text-gray-400 text-sm">Add background tunes, image galleries, and countdowns that build emotional anticipation for your guests.</p>
            </AnimatedCard>
            <AnimatedCard className="bg-slate-900/40">
              <Globe className="text-pink-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">No Installs, Just Web</h3>
              <p className="text-gray-400 text-sm">Simple URL link that guests can open instantly in any browser. Works on WhatsApp, Instagram, and SMS.</p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Experiences For Every Milestone</h2>
          <p className="text-gray-400">Choose a category matching your upcoming event to explore customizable layouts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link key={cat.id} to={`/templates?category=${cat.id}`} className="block">
              <AnimatedCard className="bg-slate-900/20 border-white/5 hover:border-brand-500/40 flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-white group-hover:text-brand-400 transition-colors">{cat.name}</h4>
                  <p className="text-gray-400 text-xs">{cat.desc}</p>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Showcase Callout */}
      <section className="bg-linear-to-r from-brand-600 to-indigo-600 py-16 relative z-10 text-center">
        <div className="container mx-auto px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">Ready to create a memorable interactive digital card?</h2>
          <p className="text-brand-100 max-w-lg mx-auto">Fill the inquiry form, select a template theme, and our experience admin will craft your layout instantly.</p>
          <div className="pt-2">
            <Link to="/enquiry">
              <Button className="bg-white text-brand-700 hover:bg-gray-100 shadow-xl cursor-pointer font-bold px-8 py-3 rounded-full">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
