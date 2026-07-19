import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";

const PremiumAudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play when URL changes, but note browser blockages
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback block by browser policy", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] group transition-all duration-300 hover:scale-105">
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Wave Animation */}
      <div className="flex items-end gap-[3px] h-6 px-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-[3px] bg-brand-500 rounded-full transition-all duration-300 ${
              isPlaying ? "animate-pulse" : "h-1"
            }`}
            style={{
              height: isPlaying ? `${Math.floor(Math.random() * 16) + 8}px` : "4px",
              animationDuration: `${0.5 + i * 0.15}s`,
              animationIterationCount: "infinite"
            }}
          />
        ))}
      </div>

      {/* Control Buttons */}
      <button
        onClick={togglePlay}
        className="p-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-all duration-200 focus:outline-none cursor-pointer"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all duration-200 focus:outline-none cursor-pointer"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

export default PremiumAudioPlayer;
