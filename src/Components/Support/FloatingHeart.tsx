import { motion } from "motion/react";
export default function FloatingHearts() {
    const hearts = [
        { id: 1, size: 'text-2xl', left: '10%', duration: 12, delay: 0 },
        { id: 2, size: 'text-5xl', left: '25%', duration: 15, delay: 2 },
        { id: 3, size: 'text-4lg', left: '75%', duration: 10, delay: 1 },
        { id: 4, size: 'text-6xl', left: '88%', duration: 14, delay: 4 },
        { id: 5, size: 'text-9xl', left: '50%', duration: 16, delay: 3 },
    ];

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className={`absolute bottom-[-10%] ${heart.size} text-rose-300/60 select-none`}
                    style={{ left: heart.left }}
                    animate={{
                        y: ['0vh', '-110vh'],
                        x: ['0px', '25px', '-25px', '0px'],
                        opacity: [0, 0.8, 0.8, 0],
                        rotate: [0, 45, -45, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'easeInOut',
                    }}
                >
                    ♥
                </motion.div>
            ))}
        </div>
    );
}