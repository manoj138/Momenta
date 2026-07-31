import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

/**
 * BackgroundAudioPlayer component for romantic / celebratory template experiences.
 * 
 * @param {string} audioUrl - URL of the audio track
 * @param {boolean} [autoPlay=false] - Whether to attempt autoplay on user gesture
 * @param {string} [position="bottom-right"] - Button positioning ('bottom-right' | 'top-right' | 'bottom-left' | 'top-left')
 */
const BackgroundAudioPlayer = ({ audioUrl, autoPlay = false, position = "top-right" }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio autoplay blocked by browser policy:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setHasInteracted(true);
    setIsPlaying((prev) => !prev);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-right":
        return "bottom-6 right-6";
      case "top-left":
        return "top-6 left-6";
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
      default:
        return "top-6 right-6";
    }
  };

  if (!audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <button
        onClick={togglePlay}
        className={`fixed ${getPositionClasses()} z-50 p-3.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer flex items-center justify-center`}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label="Toggle Audio"
      >
        {/* Animated ambient glow ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping pointer-events-none" />
        )}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-white" />
          )}
        </div>
      </button>
    </>
  );
};

export default BackgroundAudioPlayer;
