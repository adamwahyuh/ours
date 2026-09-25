import React, { useState } from "react";

interface ButtonProps {
    label?: string;
    no?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonRunAway({ label = "Ayo", no = false, onClick }: ButtonProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (no) {
            e.preventDefault();

            setIsShaking(true);

            // Acak posisi baru
            const randomX = Math.floor(Math.random() * 300) - 150;
            const randomY = Math.floor(Math.random() * 300) - 150;
            setPosition({ x: randomX, y: randomY });

            setTimeout(() => {
                setIsShaking(false);
            }, 200);
        } else if (onClick) {
            onClick(e);
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes clickShake {
                        0% { transform: translate(${position.x}px, ${position.y}px) rotate(0deg); }
                        25% { transform: translate(${position.x - 5}px, ${position.y + 3}px) rotate(-5deg); }
                        50% { transform: translate(${position.x + 5}px, ${position.y - 3}px) rotate(5deg); }
                        75% { transform: translate(${position.x - 3}px, ${position.y - 2}px) rotate(-3deg); }
                        100% { transform: translate(${position.x}px, ${position.y}px) rotate(0deg); }
                    }
                    .animate-shake {
                        animation: clickShake 0.2s ease-in-out;
                    }
                `}
            </style>

            <button
                onClick={handleClick}
                style={
                    no
                        ? { transform: `translate(${position.x}px, ${position.y}px)` }
                        : {}
                }
                className={`group relative inline-flex items-center gap-3 bg-[#fdf0d5] text-[#780000] font-extrabold text-lg py-3.5 px-9 rounded-full border-2 border-[#fdf0d5] shadow-[0_6px_0_#4a0000] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_9px_0_#4a0000] hover:bg-white active:translate-y-1.5 active:shadow-none ${
                    no
                        ? `duration-200 ease-in-out relative z-50 ${isShaking ? "animate-shake" : ""}`
                        : "duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
                }`}
            >
                {label}
            </button>
        </>
    );
}

export default ButtonRunAway;