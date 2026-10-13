import React, { useState } from "react";

interface ButtonProps {
    label?: string;
    no?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonRunAway({ label = "Ayo", no = false, onClick }: ButtonProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (no) {
            e.preventDefault();

            // Acak posisi baru
            const randomX = Math.floor(Math.random() * 300) - 150;
            const randomY = Math.floor(Math.random() * 300) - 150;
            setPosition({ x: randomX, y: randomY });
        } else if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            onClick={handleClick}
            style={no ? { transform: `translate(${position.x}px, ${position.y}px)` } : {}}
            className="relative z-50 inline-flex items-center rounded-full border border-champagne/40 bg-wine-950/30 px-8 py-3.5 font-serif text-lg italic text-champagne/80 backdrop-blur-sm transition-all duration-300 ease-out hover:border-champagne/70 hover:text-champagne"
        >
            {label}
        </button>
    );
}

export default ButtonRunAway;
