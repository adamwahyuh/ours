// Ambient romance: drifting rose petals, a few rising hearts, and twinkling lights
function Petal({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
            <defs>
                <radialGradient id="petal-grad" cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#ffd6df" />
                    <stop offset="55%" stopColor="#e88aa3" />
                    <stop offset="100%" stopColor="#a8385a" />
                </radialGradient>
            </defs>
            <path
                d="M12 2C7 5 4 9.5 5.5 14.5 7 19.5 12 22 12 22s5-2.5 6.5-7.5C20 9.5 17 5 12 2Z"
                fill="url(#petal-grad)"
            />
        </svg>
    );
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Generated once per page load so the layout stays stable across re-renders
const petals =
    Array.from({ length: 16 }, () => ({
        left: `${rand(0, 100)}%`,
        size: rand(10, 22),
        duration: `${rand(11, 22)}s`,
        delay: `${rand(-20, 0)}s`,
        drift: `${rand(-80, 80)}px`,
        opacity: rand(0.45, 0.85),
        blur: Math.random() > 0.7,
    }));

const hearts =
    Array.from({ length: 6 }, () => ({
        left: `${rand(5, 95)}%`,
        size: rand(14, 34),
        duration: `${rand(14, 24)}s`,
        delay: `${rand(-24, 0)}s`,
    }));

const sparkles =
    Array.from({ length: 28 }, () => ({
        top: `${rand(0, 100)}%`,
        left: `${rand(0, 100)}%`,
        size: rand(2, 4),
        delay: `${rand(0, 4)}s`,
    }));

export default function FloatingHearts() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
            {sparkles.map((s, i) => (
                <span
                    key={`s${i}`}
                    className="absolute rounded-full bg-champagne animate-twinkle shadow-[0_0_8px_2px_rgba(246,227,195,0.6)]"
                    style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
                />
            ))}

            {petals.map((p, i) => (
                <div
                    key={`p${i}`}
                    className={`absolute top-0 animate-petal-fall ${p.blur ? "blur-[1.5px]" : ""}`}
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: p.delay,
                        ["--petal-duration" as string]: p.duration,
                        ["--petal-drift" as string]: p.drift,
                        ["--petal-opacity" as string]: p.opacity,
                    }}
                >
                    <Petal className="w-full h-full" />
                </div>
            ))}

            {hearts.map((h, i) => (
                <div
                    key={`h${i}`}
                    className="absolute bottom-0 text-blush/40 select-none [animation:rise_linear_infinite]"
                    style={{
                        left: h.left,
                        fontSize: h.size,
                        animationDuration: h.duration,
                        animationDelay: h.delay,
                    }}
                >
                    ♥
                </div>
            ))}

            <style>{`
                @keyframes rise {
                    0% { transform: translateY(10vh) translateX(0) scale(0.8); opacity: 0; }
                    15% { opacity: 0.7; }
                    50% { transform: translateY(-50vh) translateX(20px) scale(1); }
                    85% { opacity: 0.5; }
                    100% { transform: translateY(-115vh) translateX(-20px) scale(1.1); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
