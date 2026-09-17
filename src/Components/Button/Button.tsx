import React, { useState } from "react";

// Mendefinisikan tipe data untuk props
interface ButtonProps {
    label?: string;
    no?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ label = "Ayo", no = false, onClick }: ButtonProps) {
    // Menambahkan tipe data { x: number, y: number } pada state
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleHover = () => {
        if (no) {
            const randomX = Math.floor(Math.random() * 300) - 150;
            const randomY = Math.floor(Math.random() * 300) - 150;
            setPosition({ x: randomX, y: randomY });
        }
    };

    return (
        <button
            onMouseEnter={handleHover}
            onClick={no ? (e) => e.preventDefault() : onClick}
            style={
                no
                    ? { transform: `translate(${position.x}px, ${position.y}px)` }
                    : {}
            }
            className={`bg-[#fdf0d5] text-[#780000] font-semibold py-3 px-8 rounded-full shadow-md transition-all active:scale-95 ${
                no
                    ? "duration-100 ease-in-out relative z-500"
                    : "duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
            }`}
        >
            {label}
        </button>
    );
}

export default Button;