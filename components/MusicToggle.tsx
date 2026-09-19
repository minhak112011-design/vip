"use client";

import { Music, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio("/music/love.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "none";

    const handleError = () => setAvailable(false);
    audio.addEventListener("error", handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []);

  if (!available) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay / play was blocked by the browser — quietly do nothing.
      setAvailable(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
      aria-pressed={playing}
      className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-white/85 backdrop-blur
                 shadow-soft border border-blush-100 flex items-center justify-center
                 text-blush-500 hover:scale-105 active:scale-95 transition-transform
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-200"
    >
      {playing ? (
        <Volume2 size={18} />
      ) : (
        <Music size={18} className="opacity-70" />
      )}
    </button>
  );
}
