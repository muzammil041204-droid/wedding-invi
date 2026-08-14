import { useEffect, useRef, useState, useCallback } from "react";

interface MusicToggleProps {
  autoPlay?: boolean;
}

export function MusicToggle({ autoPlay = false }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userToggled = useRef(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Handle autoPlay on initial entrance only if user hasn't manually interacted
  useEffect(() => {
    if (autoPlay && audioRef.current && !userToggled.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay audio blocked or failed:", err);
        });
    }
  }, [autoPlay]);

  const toggle = useCallback(() => {
    userToggled.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying || !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play failed:", err);
        });
    }
  }, [isPlaying]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      className="text-xs sm:text-sm font-medium tracking-wider uppercase fixed bottom-6 left-6 z-50 flex h-11 cursor-pointer items-center gap-3 bg-ivory/90 px-4 text-warmgray backdrop-blur-[6px] transition-colors duration-500 hover:text-champagne focus-visible:text-champagne focus-visible:outline-none rounded-full border border-hairline shadow-md"
    >
      <span
        aria-hidden="true"
        className={`text-base leading-none ${isPlaying ? "text-champagne animate-pulse" : "text-warmgray"}`}
      >
        ♪
      </span>
      <span className="hidden sm:inline">{isPlaying ? "Music on" : "Music off"}</span>
    </button>
  );
}