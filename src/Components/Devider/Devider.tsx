import { Heart, Sparkles } from "lucide-react";

interface RomanticDividerProps {
  variant?: "heart" | "sparkle" | "minimal";
  className?: string;
}

export default function Devider({ variant = "heart", className = "" }: RomanticDividerProps) {
  return (
        <div className={`flex items-center justify-center w-full max-w-md mx-auto py-6 ${className}`} aria-hidden>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/80" />
            <span className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold/70" />

            <div className="mx-2 flex items-center justify-center">
                {variant === "heart" && (
                    <Heart
                        size={20}
                        strokeWidth={1.25}
                        className="text-blush fill-blush/30 drop-shadow-[0_0_10px_rgba(242,184,198,0.9)] animate-heartbeat"
                    />
                )}
                {variant === "sparkle" && (
                    <Sparkles size={20} strokeWidth={1.25} className="text-gold drop-shadow-[0_0_10px_rgba(226,191,134,0.9)]" />
                )}
                {variant === "minimal" && <span className="h-2 w-2 rounded-full bg-blush shadow-[0_0_10px_rgba(242,184,198,0.9)]" />}
            </div>

            <span className="mx-2 h-1.5 w-1.5 rotate-45 bg-gold/70" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/80" />
        </div>
    );
}
