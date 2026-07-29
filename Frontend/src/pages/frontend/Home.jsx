import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Sparkles, Gift, Flame, Send, ArrowRight, CheckCircle2, Music, Smartphone, Globe, Eye, Home as HomeIcon } from "lucide-react";
import AnimatedCard from "../../components/common/AnimatedCard";
import Button from "../../components/common/Button";
import { useApp } from "../../context/AppContext";

// Import Templates for native mockup rendering
import WeddingRoyalGold from "../experience/templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "../experience/templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "../experience/templates/birthday/BirthdayNeonSurprise";

const Home = () => {
  const showcaseItems = [
    {
      id: "hero",
      name: "Turn Your Special Moments Into Animated Digital Experiences",
      desc: "No boring PDF files. We create interactive, responsive, animated digital invitations and memory walls with countdowns, music playback, location mapping, and live RSVP.",
      isHero: true,
      tag: "Premium Interactive Card Platform",
      gradient: "from-slate-100 via-slate-200 dark:from-slate-900 dark:via-slate-950",
      glow: "from-brand-500/40 via-indigo-500/35 to-purple-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Templates</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Create Experience
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "wedding",
      name: "Cinematic Wedding Invitations",
      desc: "Traditional, luxury, and cinematic designs. Features live guest RSVP registries, virtual envelope opening, couple timeline story walls, schedule trackers, and interactive location navigation maps.",
      tag: "Royal Gold Invitation Theme",
      image: "/landing page images/wedding.png",
      gradient: "from-pink-500/20 via-amber-500/5 dark:from-pink-950/60 dark:via-amber-900/30",
      glow: "from-amber-500/50 via-rose-500/40 to-yellow-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=wedding">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Themes</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry?template=wedding-royal-gold">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Choose Wedding
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "birthday",
      name: "Fun Birthday Surprises",
      desc: "Vibrant and glowing celebration layouts. Features automated music loops, confetti pops on visitor arrival, image slide grids, and a customized neon wishes comments wall.",
      tag: "Neon Surprise Reveal Theme",
      image: "/landing page images/birthday.png",
      gradient: "from-purple-500/20 via-indigo-500/5 dark:from-purple-950/60 dark:via-indigo-950/40",
      glow: "from-purple-500/50 via-pink-500/40 to-indigo-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=birthday">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Themes</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry?template=birthday-neon-surprise">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Choose Birthday
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "proposal",
      name: "Romantic Proposals & RSVP",
      desc: "Express love in a beautiful storybook style. Features chronologically mapped relationship paths, sweet heart-shaped collage grids, and interactive 'Yes/No' prompts.",
      tag: "Sweet Proposal Reveal Theme",
      image: "/landing page images/proposal.png",
      gradient: "from-pink-500/25 via-rose-500/5 dark:from-pink-900/60 dark:via-pink-950/40",
      glow: "from-pink-500/55 via-rose-500/40 to-red-400/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=proposal">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Themes</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry?template=proposal-romantic">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Choose Proposal
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "anniversary",
      name: "Anniversary Timeline Cards",
      desc: "Celebrate years of togetherness. Add timeline highlights, background music player blocks, sliding image displays, event timings, maps, and instant guest wishes lists.",
      tag: "Anniversary Love Timeline Theme",
      image: "/landing page images/anivarsary.png",
      gradient: "from-rose-500/20 via-purple-500/10 dark:from-rose-950/60 dark:via-purple-950/40",
      glow: "from-rose-600/50 via-purple-600/40 to-pink-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=anniversary">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Themes</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry?template=anniversary-timeline">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Choose Anniversary
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "surprise",
      name: "Surprise Gift Reveals",
      desc: "Mystery countdown clocks and virtual present boxes. Features virtual present boxes that guests tap to reveal custom cards, video links, or special event announcements.",
      tag: "Envelope Reveal Theme",
      image: "/landing page images/surprise.png",
      gradient: "from-teal-500/20 via-emerald-500/5 dark:from-teal-950/60 dark:via-emerald-950/40",
      glow: "from-teal-500/50 via-emerald-500/40 to-cyan-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=surprise">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Themes</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry?template=surprise-reveal">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Choose Surprise
            </Button>
          </Link>
        </div>
      )
    },
    {
      id: "vastu",
      name: "Vastu Shanti / New Home",
      desc: "Premium digital invitations for house warmings, new car arrivals, poojas, and office openings. Modern templates to share with family on WhatsApp and social media.",
      tag: "Modern Vastu Shanti Theme",
      image: "/landing page images/invitation for new home new car vastu shanti.png",
      gradient: "from-blue-500/20 via-orange-500/5 dark:from-blue-950/60 dark:via-orange-950/20",
      glow: "from-amber-500/50 via-orange-500/40 to-blue-500/35",
      buttons: (
        <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=company">
            <Button variant="primary" className="flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-500/20 border-0 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              <span>Explore Vastu</span>
              <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/enquiry">
            <Button variant="outline" className="bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold">
              Send Enquiry
            </Button>
          </Link>
        </div>
      )
    }
  ];

  const navigate = useNavigate();
  const { templates } = useApp();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isAnimatingRef = useRef(false);
  const touchStartY = useRef(0);

  const handleTemplateClick = (category, demoSlug) => {
    const tpl = templates.find(t => t.demoSlug === demoSlug);
    if (tpl && tpl.previewUrl) {
      window.open(tpl.previewUrl, "_blank");
    } else {
      window.open(`/e/${demoSlug}`, "_blank");
    }
  };

  const renderCardPreview = (demoSlug) => {
    const mockData = {
      brideName: "Priya",
      groomName: "Rahul",
      weddingDate: "2026-11-20",
      weddingTime: "11:30 AM",
      venueName: "Maratha Durbar Hall",
      venueAddress: "JM Road, Shivajinagar, Pune",
      personName: "Sneha Shinde",
      age: 25,
      birthdayDate: "2026-08-15",
      venue: "Sky Lounge, Kothrud",
      message: "Join me as I celebrate 25 years of awesome!",
    };

    switch (demoSlug) {
      case "royal-gold-demo":
      case "wedding-royal-gold":
        return <WeddingRoyalGold data={mockData} isDemo={true} />;
      case "wedding-animated-demo":
      case "wedding-animated":
        return <WeddingAnimated data={mockData} isDemo={true} />;
      case "neon-surprise-demo":
      case "birthday-neon-surprise":
        return <BirthdayNeonSurprise data={mockData} isDemo={true} />;
      default:
        return null;
    }
  };

  // Manage body overflow based on lock state
  useEffect(() => {
    if (isUnlocked) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0); // Always snap back to top when locked
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isUnlocked]);

  // Capture Mouse Wheel Scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      // If page is unlocked and scrolled down, allow normal browser scrolling
      if (isUnlocked && window.scrollY > 0) {
        return;
      }

      // If scrolled to top and scroll up, lock back
      if (isUnlocked && window.scrollY === 0 && e.deltaY < 0) {
        setIsUnlocked(false);
        e.preventDefault();
        return;
      }

      // If locked, handle slide transitions
      if (!isUnlocked) {
        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        if (e.deltaY > 0) {
          // Scroll Down -> Next Slide
          if (activeIndex < showcaseItems.length - 1) {
            e.preventDefault();
            isAnimatingRef.current = true;
            setActiveIndex((prev) => prev + 1);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 600);
          } else {
            // Reached last slide, unlock the page!
            setIsUnlocked(true);
          }
        } else if (e.deltaY < 0) {
          // Scroll Up -> Previous Slide
          if (activeIndex > 0) {
            e.preventDefault();
            isAnimatingRef.current = true;
            setActiveIndex((prev) => prev - 1);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 600);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, isUnlocked]);

  // Capture Touch Swipe Gestures for Mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isUnlocked && window.scrollY > 0) {
        return;
      }

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchEndY; // Positive is swipe up (scroll down)

      if (!isUnlocked && Math.abs(deltaY) > 8) {
        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        if (deltaY > 25) {
          // Swipe Up -> Next Slide
          if (activeIndex < showcaseItems.length - 1) {
            e.preventDefault();
            isAnimatingRef.current = true;
            setActiveIndex((prev) => prev + 1);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 600);
          } else {
            setIsUnlocked(true);
          }
        } else if (deltaY < -25) {
          // Swipe Down -> Previous Slide
          if (activeIndex > 0) {
            e.preventDefault();
            isAnimatingRef.current = true;
            setActiveIndex((prev) => prev - 1);
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 600);
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeIndex, isUnlocked]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-500/5 dark:bg-brand-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px] pointer-events-none" />

      {/* Pinned Hero & Showcase Section */}
      <section 
        style={{ 
          height: isUnlocked ? "auto" : "calc(100vh - 72px)", 
          overflow: isUnlocked ? "visible" : "hidden" 
        }} 
        className="relative"
      >
        <div style={{ height: "calc(100vh - 72px)" }} className="w-full flex items-center overflow-hidden">
          
          <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-2 sm:gap-6 lg:gap-12 relative z-10 pt-1 sm:pt-4 lg:py-0">
            
            {/* LEFT SIDE: Morphing Hero Text (Maintains exactly same font sizes and structure) */}
            <div className="flex-1 relative h-[160px] xs:h-[180px] sm:h-[210px] lg:h-[340px] flex items-center w-full">
              {showcaseItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 w-full h-full flex flex-col justify-center space-y-1.5 sm:space-y-4 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="hidden sm:inline-flex self-start items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <Sparkles size={12} />
                      <span>{item.tag}</span>
                    </div>

                    <h1 className="leading-snug sm:leading-tight">
                      {item.isHero ? (
                        <span className="flex flex-col space-y-0.5 sm:space-y-1">
                          <span className="text-xs xs:text-sm sm:text-2xl font-bold text-slate-700 dark:text-gray-300">
                            Turn Your Special Moments Into
                          </span>
                          <span className="text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-brand-600 via-indigo-650 to-pink-600 dark:from-brand-400 dark:via-indigo-400 dark:to-pink-400">
                            Animated Digital Experiences
                          </span>
                        </span>
                      ) : (
                        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-brand-600 via-indigo-650 to-pink-600 dark:from-brand-400 dark:via-indigo-400 dark:to-pink-400">
                          {item.name}
                        </span>
                      )}
                    </h1>

                    <p className="text-slate-650 dark:text-gray-400 text-[11px] sm:text-base md:text-lg max-w-xl line-clamp-2 sm:line-clamp-none">
                      {item.desc}
                    </p>

                    {/* Desktop Only Buttons */}
                    <div className="hidden lg:block pt-1 sm:pt-2">
                      {item.buttons}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE: Responsive Mockup frame + Mobile Only Buttons below frame */}
            <div className="flex-1 flex flex-col items-center justify-center w-full relative mt-4 sm:mt-6 lg:mt-0">
              {/* Dynamic Ambient Glow matching the active slide theme */}
              <div className={`absolute inset-[-10%] bg-gradient-to-tr ${showcaseItems[activeIndex]?.glow || "from-brand-500/40 to-pink-500/40"} rounded-full blur-[70px] sm:blur-[110px] opacity-80 transition-all duration-1000 ease-in-out pointer-events-none`} />
              
              <div className="w-[240px] xs:w-[260px] sm:w-[290px] lg:w-[310px] h-[420px] xs:h-[450px] sm:h-[500px] lg:h-[580px] border-[6px] sm:border-[8px] lg:border-[10px] border-slate-900 rounded-[28px] sm:rounded-[34px] lg:rounded-[38px] shadow-[0_25px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden relative bg-slate-900 flex flex-col transition-all duration-300">
                {/* Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-3.5 sm:h-5 bg-slate-900 rounded-b-2xl z-50" />
                
                {/* Stacked contents inside the phone mockup */}
                <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                  {showcaseItems.map((item, index) => {
                    const isActive = index === activeIndex;
                    const isPrevious = index < activeIndex;

                    return (
                      <div
                        key={item.id}
                        className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center select-none transition-all duration-700 ease-in-out ${
                          isActive
                            ? "opacity-100 translate-x-0 scale-100 rotate-0 z-20"
                            : isPrevious
                            ? "opacity-0 -translate-x-full scale-90 -rotate-6 pointer-events-none z-10"
                            : "opacity-0 translate-x-full scale-90 rotate-6 pointer-events-none z-10"
                        }`}
                      >
                        {item.isHero ? (
                          /* Original Live Preview Mockup Screen */
                          <div className="w-full h-full bg-cream-50 flex flex-col p-3 sm:p-4 pt-6 sm:pt-8 text-center text-slate-800">
                            <div className="flex-1 flex flex-col justify-center items-center py-4 sm:py-6 border border-amber-200/40 rounded-2xl bg-amber-50/10 shadow-xs">
                              <Heart className="text-amber-600 animate-pulse mb-2 sm:mb-3" size={28} />
                              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold mb-1">Save The Date</span>
                              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-1">Rahul & Priya</h3>
                              <div className="w-10 sm:w-12 h-[1px] bg-amber-300 my-1.5 sm:my-2" />
                              <p className="text-[9px] sm:text-[10px] text-amber-900 max-w-[160px] sm:max-w-[180px] mb-3 sm:mb-4">Are getting married. Please join us to celebrate our love.</p>
                              <div className="bg-amber-900 text-amber-100 text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold mb-3 sm:mb-4">
                                Nov 20, 2026
                              </div>
                              <div className="flex items-center gap-1 bg-amber-100/60 px-2.5 py-1 rounded-xl border border-amber-200/50">
                                <Music className="text-amber-800 animate-spin" size={10} style={{ animationDuration: '3s' }} />
                                <span className="text-[8px] sm:text-[9px] font-bold text-amber-900">Background Tune Playing</span>
                              </div>
                            </div>
                            <div className="mt-3 sm:mt-4 bg-white/60 backdrop-blur-sm border border-slate-200/50 p-2 sm:p-2.5 rounded-xl shadow-xs">
                              <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-slate-700">
                                <span>RSVP Status</span>
                                <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">122 Attending</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Category Illustration Image Slide-in */
                          <div className="w-full h-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                            <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} to-white dark:to-slate-950 pointer-events-none z-0 opacity-85`} />
                            
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain relative z-10 p-3 sm:p-4"
                            />

                            {item.id === "proposal" && (
                              <div className="absolute inset-0 flex justify-center items-start pt-12 sm:pt-16 z-20 pointer-events-none">
                                <Heart className="text-pink-500 fill-pink-500/40 animate-pulse drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" size={32} />
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent p-4 sm:p-5 z-20">
                              <span className="text-[9px] sm:text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-0.5 block">{item.tag}</span>
                              <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white font-serif">{item.name}</h4>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Only Buttons Positioned Below Phone Mockup with Clear Top Margin */}
              <div className="block lg:hidden mt-4 sm:mt-6 w-full relative z-30 flex justify-center">
                {showcaseItems[activeIndex]?.buttons}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Render the remaining page contents ONLY when the showcase is unlocked */}
      {isUnlocked && (
        <>
          {/* Featured Templates Preview Section */}
          <section className="py-12 sm:py-20 relative z-10 bg-slate-100/50 dark:bg-slate-900/30 border-t border-gray-200 dark:border-white/5 overflow-hidden">
            {/* Background Ambient Glow Orbs floating way behind the cards in the section background */}
            <div className="absolute top-[-10%] left-[-5%] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full bg-gradient-to-br from-amber-500/20 via-rose-500/15 to-purple-500/15 blur-[140px] opacity-75 dark:opacity-50 pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full bg-gradient-to-tl from-indigo-500/20 via-brand-500/15 to-pink-500/15 blur-[140px] opacity-75 dark:opacity-50 pointer-events-none z-0" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>Interactive Live Mockups</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
                  Featured Templates
                </h2>
                <p className="text-slate-650 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                  Explore our live interactive templates on mobile frames. Click preview to experience full screen.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-6xl mx-auto">
                {templates
                  .filter((tpl) => ["royal-gold-demo", "wedding-animated-demo", "neon-surprise-demo"].includes(tpl.demoSlug))
                  .map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleTemplateClick(tpl.category, tpl.demoSlug)}
                      className="group bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Phone Container Box with Center Alignment */}
                      <div className="w-full h-[400px] sm:h-[500px] flex items-center justify-center relative overflow-hidden mb-2">
                        <div 
                          style={{
                            transformOrigin: "center center"
                          }}
                          className="w-[310px] sm:w-[375px] h-[540px] sm:h-[660px] scale-[0.66] sm:scale-[0.74] border-[10px] sm:border-[12px] border-slate-900 rounded-[38px] sm:rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] bg-white dark:bg-slate-900 overflow-hidden relative flex flex-col shrink-0 group-hover:border-brand-500 transition-colors duration-300"
                        >
                          {/* Speaker & Camera notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-5 sm:h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                            <span className="w-10 sm:w-12 h-1 bg-slate-750 rounded-full mb-1" />
                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-800 rounded-full mb-1 ml-2.5 sm:ml-3" />
                          </div>

                          {/* Viewport Content */}
                          <div className="flex-1 overflow-y-auto no-scrollbar h-full w-full pointer-events-none select-none preview-frame-content">
                            {renderCardPreview(tpl.demoSlug)}
                          </div>

                          {/* Hover Overlay with Preview Trigger */}
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-40 backdrop-blur-[2px]">
                            <Button 
                              variant="primary" 
                              size="sm"
                              className="flex items-center gap-1.5 shadow-xl font-bold rounded-full px-5 py-2.5 text-xs pointer-events-auto"
                            >
                              <Eye size={14} />
                              <span>Live Preview</span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Template Details below mobile mockup */}
                      <div className="w-full text-center space-y-2">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-md">
                          {tpl.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                          {tpl.name}
                        </h3>
                        <p className="text-slate-500 dark:text-gray-400 text-xs line-clamp-2 px-2">
                          {tpl.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Platform Concept Info */}
          <section className="bg-slate-100/80 dark:bg-slate-900/60 border-y border-gray-200 dark:border-white/5 py-20 relative z-10">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Why Momenta Experiences?</h2>
                <p className="text-slate-650 dark:text-gray-400">Traditional invites are lost in chats. Momenta experiences are remembered forever.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedCard className="bg-white dark:bg-slate-900/40 border border-gray-150 dark:border-white/5 shadow-premium">
                  <Smartphone className="text-brand-500 dark:text-brand-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Mobile Friendly First</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Every template matches perfectly to mobile viewports, enabling fast touch interactions and messaging-app sharing.</p>
                </AnimatedCard>
                <AnimatedCard className="bg-white dark:bg-slate-900/40 border border-gray-150 dark:border-white/5 shadow-premium">
                  <Music className="text-indigo-600 dark:text-indigo-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">Background Music & Media</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Add background tunes, image galleries, and countdowns that build emotional anticipation for your guests.</p>
                </AnimatedCard>
                <AnimatedCard className="bg-white dark:bg-slate-900/40 border border-gray-150 dark:border-white/5 shadow-premium">
                  <Globe className="text-pink-650 dark:text-pink-400 mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">No Installs, Just Web</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">Simple URL link that guests can open instantly in any browser. Works on WhatsApp, Instagram, and SMS.</p>
                </AnimatedCard>
              </div>
            </div>
          </section>

          {/* Showcase Callout */}
          <section className="bg-linear-to-r from-brand-600 to-indigo-650 py-16 relative z-10 text-center text-white">
            <div className="container mx-auto px-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight">Ready to create a memorable interactive digital card?</h2>
              <p className="text-brand-100 max-w-lg mx-auto">Fill the inquiry form, select a template theme, and our experience admin will craft your layout instantly.</p>
              <div className="pt-2">
                <Link to="/enquiry">
                  <Button className="bg-white !text-black hover:bg-gray-100 shadow-xl cursor-pointer font-bold px-8 py-3 rounded-full border-0">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
