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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Templates</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
              Create Your Experience
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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=wedding">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Wedding Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry?template=wedding-royal-gold">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=birthday">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Birthday Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry?template=birthday-neon-surprise">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=proposal">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Proposal Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry?template=proposal-romantic">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
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
      gradient: "from-indigo-500/20 via-blue-500/5 dark:from-indigo-950/60 dark:via-blue-950/40",
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=anniversary">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Anniversary Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry?template=anniversary-timeline">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=surprise">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Surprise Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry?template=surprise-reveal">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
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
      buttons: (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/templates?category=company">
            <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-500/20 border-0">
              <span>Explore Vastu Themes</span>
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/enquiry">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-slate-200/80 dark:bg-white/5 border-gray-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/10 cursor-pointer">
              Send Enquiry Form
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
    window.open(`/e/${demoSlug}`, "_blank");
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
        return <WeddingRoyalGold data={mockData} isDemo={true} />;
      case "wedding-animated-demo":
        return <WeddingAnimated data={mockData} isDemo={true} />;
      case "neon-surprise-demo":
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

      if (!isUnlocked && Math.abs(deltaY) > 10) {
        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        if (deltaY > 40) {
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
        } else if (deltaY < -40) {
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
          
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
            
            {/* LEFT SIDE: Morphing Hero Text (Maintains exactly same font sizes and structure) */}
            <div className="flex-1 relative h-[380px] md:h-[340px] flex items-center">
              {showcaseItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 w-full h-full flex flex-col justify-center space-y-6 transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 backdrop-blur-md text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <Sparkles size={14} />
                      <span>{item.tag}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                      {item.isHero ? (
                        <>
                          Turn Your Special Moments Into <br />
                          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 via-indigo-650 to-pink-600 dark:from-brand-400 dark:via-indigo-400 dark:to-pink-400">
                            Animated Digital Experiences
                          </span>
                        </>
                      ) : (
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-600 via-indigo-650 to-pink-600 dark:from-brand-400 dark:via-indigo-400 dark:to-pink-400">
                          {item.name}
                        </span>
                      )}
                    </h1>

                    <p className="text-slate-650 dark:text-gray-400 text-lg max-w-xl">
                      {item.desc}
                    </p>

                    <div className="pt-2">
                      {item.buttons}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SIDE: Mockup frame displaying preview screen or category image slide-in */}
            <div className="flex-1 flex justify-center w-full relative">
              <div className="absolute inset-0 bg-linear-to-tr from-brand-500/20 to-pink-500/20 rounded-full blur-[100px] opacity-60 pointer-events-none" />
              
              <div className="w-[310px] h-[580px] border-[10px] border-slate-900 rounded-[38px] shadow-[0_35px_80px_rgba(0,0,0,0.22)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden relative bg-slate-900 flex flex-col">
                {/* Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-50" />
                
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
                          <div className="w-full h-full bg-cream-50 flex flex-col p-4 pt-8 text-center text-slate-800">
                            <div className="flex-1 flex flex-col justify-center items-center py-6 border border-amber-200/40 rounded-2xl bg-amber-50/10 shadow-xs">
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
                        ) : (
                          /* Category Illustration Image Slide-in with themed gradient background */
                          <div className="w-full h-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                            {/* Themed background gradient glow */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} to-white dark:to-slate-950 pointer-events-none z-0 opacity-85`} />
                            
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain relative z-10 p-4"
                            />

                            {/* Floating pulsating heart icon on Proposal slide */}
                            {item.id === "proposal" && (
                              <div className="absolute inset-0 flex justify-center items-start pt-16 z-20 pointer-events-none">
                                <Heart className="text-pink-500 fill-pink-500/40 animate-pulse drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" size={36} />
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent p-5 z-20">
                              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-1">{item.tag}</span>
                              <h4 className="text-base font-bold text-slate-800 dark:text-white font-serif">{item.name}</h4>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Render the remaining page contents ONLY when the showcase is unlocked */}
      {isUnlocked && (
        <>
          {/* Featured Templates Preview Section */}
          <section className="py-20 relative z-10 bg-slate-100/50 dark:bg-slate-900/30 border-t border-gray-200 dark:border-white/5">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                  <Sparkles size={14} />
                  <span>Interactive Live Mockups</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Featured Templates
                </h2>
                <p className="text-slate-650 dark:text-gray-400 text-base max-w-xl mx-auto">
                  Explore our live interactive templates on mobile frames. Click preview to experience full screen.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {templates
                  .filter((tpl) => ["royal-gold-demo", "wedding-animated-demo", "neon-surprise-demo"].includes(tpl.demoSlug))
                  .map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => handleTemplateClick(tpl.category, tpl.demoSlug)}
                      className="group bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Phone Container Box with Center Alignment */}
                      <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden mb-2">
                        {/* Scaled 375px x 660px Physical Phone Mockup (DevicePreviewMock standard) */}
                        <div 
                          style={{
                            width: "375px",
                            height: "660px",
                            transform: "scale(0.74)",
                            transformOrigin: "center center"
                          }}
                          className="border-[12px] border-slate-900 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] bg-white dark:bg-slate-900 overflow-hidden relative flex flex-col shrink-0 group-hover:border-brand-500 transition-colors duration-300"
                        >
                          {/* Speaker & Camera notch */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
                            <span className="w-12 h-1 bg-slate-750 rounded-full mb-1" />
                            <span className="w-2.5 h-2.5 bg-slate-800 rounded-full mb-1 ml-3" />
                          </div>

                          {/* Viewport Content */}
                          <div className="flex-1 overflow-y-auto no-scrollbar h-full w-full pointer-events-none select-none">
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
                  <Button className="bg-white text-brand-700 hover:bg-gray-100 shadow-xl cursor-pointer font-bold px-8 py-3 rounded-full border-0">
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
