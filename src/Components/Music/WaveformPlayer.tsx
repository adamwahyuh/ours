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

export default function WaveformPlayer({ audioSrc, title, width = "100%", height = 96, barCount = 48, className = "", onPlay }: WaveformPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  audioSrc = "/birthday" + audioSrc

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const barHeights = useMemo(
    () =>
      Array.from(
        { length: barCount },
        () => 0.25 + Math.random() * 0.75
      ),
    [barCount]
  );

  useEffect(() => {
    const audio = new Audio(audioSrc);

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

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

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
  }, [audioSrc]);

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

  const handleSeek = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const audio = audioRef.current;

    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const seekTime =
      (clickX / rect.width) * audio.duration;

    audio.currentTime = seekTime;
  };

  const playedBars = Math.round(
    (progress / 100) * barCount
  );

  return (
    <div
      className={`flex flex-col items-center gap-3 sm:gap-4 ${className}`}
      style={{
        width:
          typeof width === "number"
            ? `${width}px`
            : width,
      }}
    >
      {title && (
        <span className="w-full text-left text-[#fdf0d5]/90 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold">
          {title}
        </span>
      )}

      <div className="flex items-center gap-3 sm:gap-4 w-full">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="cursor-pointer flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-[#fdf0d5] shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/35 hover:bg-black/30 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#fdf0d5]/40"
        >
          {isPlaying ? (
            <Pause
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
            />
          ) : (
            <Play
              className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1"
              fill="currentColor"
            />
          )}
        </button>

        <div
          className="relative flex-1 flex items-center gap-[2px] sm:gap-[3px] cursor-pointer"
          style={{
            height:
              typeof height === "number"
                ? `${height}px`
                : height,
          }}
          onClick={handleSeek}
        >
          {barHeights.map((h, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-colors duration-150 ${
                idx < playedBars
                  ? "bg-[#fdf0d5]"
                  : "bg-white/30"
              }`}
              style={{
                height: `${h * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}