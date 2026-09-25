import { Heart, Sparkles, Diamond } from "lucide-react";

interface RomanticDividerProps {
  variant?: "heart" | "sparkle" | "minimal";
  className?: string;
}

export default function Devider({variant = "heart",className = "", }: RomanticDividerProps) {
  return (
        <div className={`flex items-center justify-center w-full py-8 opacity-85 hover:opacity-100 transition-opacity duration-500 ${className}`}>

            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#fdf0d5]/30 to-[#fdf0d5]/80 rounded-full" />

            <div className="mx-4 flex items-center justify-center">
                {variant === "heart" && (
                <Heart
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#fdf0d5] fill-[#fdf0d5]/20 drop-shadow-[0_0_12px_rgba(253,240,213,0.8)] animate-pulse"
                />
                )}
                
                {variant === "sparkle" && (
                <Sparkles
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#fdf0d5] drop-shadow-[0_0_10px_rgba(253,240,213,0.9)]"
                />
                )}

                {variant === "minimal" && (
                <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fdf0d5] shadow-[0_0_8px_rgba(253,240,213,0.8)]" />
                    <Diamond
                    size={12}
                    className="text-[#fdf0d5] fill-[#fdf0d5] shadow-[0_0_10px_rgba(253,240,213,0.8)]"
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#fdf0d5] shadow-[0_0_8px_rgba(253,240,213,0.8)]" />
                </div>
                )}
            </div>

            {/* Garis Kanan - Memudar dari warna #fdf0d5 ke transparan */}
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#fdf0d5]/30 to-[#fdf0d5]/80 rounded-full" />
        </div>
    );
}