import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TemplateControls = ({
  currentLang,
  onToggleLanguage,
  audioUrl,
  // Customizable design styles matching individual templates
  bgClass = "bg-amber-500",
  textClass = "text-[#540303]",
  hoverClass = "hover:bg-amber-400 hover:scale-105",
  borderClass = "border-amber-300/30",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      setIsPlaying(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio playback blocked:", err));
    }
  };

  const handleLangClick = (e) => {
    e.stopPropagation();
    if (onToggleLanguage) {
      onToggleLanguage();
    }
  };

  return (
    <>
      {/* Floating Language Switcher */}
      {onToggleLanguage && (
        <button
          onClick={handleLangClick}
          className={`absolute top-6 left-6 z-50 w-9 h-9 rounded-full ${bgClass} ${textClass} shadow-lg cursor-pointer ${hoverClass} transition-all border ${borderClass} flex items-center justify-center font-sans font-bold text-xs`}
          title="Toggle Language / भाषा बदला"
        >
          {currentLang === "mr" ? "EN" : "म"}
        </button>
      )}

      {/* Floating Audio Trigger */}
      {audioUrl && (
        <button
          onClick={toggleMusic}
          className={`absolute top-6 right-6 z-50 p-2.5 rounded-full ${bgClass} ${textClass} shadow-lg cursor-pointer ${hoverClass} transition-all border ${borderClass} flex items-center justify-center`}
          title="Toggle Music"
        >
          {isPlaying ? (
            <Volume2 size={16} className="animate-bounce" />
          ) : (
            <VolumeX size={16} />
          )}
        </button>
      )}
    </>
  );
};

export default TemplateControls;
