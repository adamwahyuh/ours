import React, { useState, useEffect, useRef, useMemo } from "react";
import { Play, Pause } from "lucide-react";

interface WaveformPlayerProps {
  audioSrc: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  barCount?: number;
  className?: string;

  onPlay?: (audio: HTMLAudioElement) => void;
}

export default function WaveformPlayer({ audioSrc, title, width = "100%", height = 56, barCount = 48, className = "", onPlay }: WaveformPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const src = "/ours" + audioSrc

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Gentle, organic-looking bar shape (stable between renders)
  const barHeights = useMemo(
    () =>
      Array.from(
        { length: barCount },
        (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45))
      ),
    [barCount]
  );

  useEffect(() => {
    const audio = new Audio(src);

    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);

      audio.pause();
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      // Beritahu parent bahwa audio ini mau dimainkan
      onPlay?.(audio);

      try {
        await audio.play();
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    } else {
      audio.pause();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const audio = audioRef.current;

    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    audio.currentTime = (clickX / rect.width) * audio.duration;
  };

  const playedBars = Math.round((progress / 100) * barCount);
  const [song, artist] = (title ?? "").split(" - ");

  return (
    <div
      className={`group relative flex items-center gap-4 sm:gap-5 rounded-2xl border px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-md transition-all duration-500 ${
        isPlaying
          ? "border-gold/50 bg-wine-800/50 shadow-[0_0_40px_-8px_rgba(242,184,198,0.45)]"
          : "border-champagne/15 bg-wine-950/30 hover:border-champagne/30 hover:bg-wine-900/40"
      } ${className}`}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      {/* Vinyl record with play button as its label */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="relative flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
      >
        <span
          className={`absolute inset-0 rounded-full shadow-lg shadow-black/50 animate-spin-slow ${isPlaying ? "" : "[animation-play-state:paused]"}`}
          style={{
            background:
              "repeating-radial-gradient(circle at center, #140308 0px, #140308 2px, #2a0a13 3px, #140308 4px)",
          }}
        >
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0deg,rgba(255,255,255,0.12)_40deg,transparent_80deg,transparent_180deg,rgba(255,255,255,0.08)_220deg,transparent_260deg)]" />
        </span>
        <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-gradient-to-br from-blush to-rosewood text-paper shadow-inner transition-transform duration-300 group-hover:scale-110">
          {isPlaying ? (
            <Pause className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" fill="currentColor" />
          )}
        </span>
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {title && (
          <div className="flex items-baseline gap-2 truncate">
            <span className="truncate font-serif text-lg sm:text-xl italic text-champagne">{song}</span>
            {artist && (
              <span className="truncate text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-blush/70">
                {artist}
              </span>
            )}
          </div>
        )}

        <div
          className="relative flex items-center gap-[2px] sm:gap-[3px] cursor-pointer"
          style={{ height: typeof height === "number" ? `${height}px` : height }}
          onClick={handleSeek}
        >
          {barHeights.map((h, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-colors duration-200 ${
                idx < playedBars
                  ? "bg-gradient-to-t from-rosewood via-blush to-champagne"
                  : "bg-champagne/20"
              }`}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
