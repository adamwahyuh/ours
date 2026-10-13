import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';

interface EnvelopeProps {
    message?: React.ReactNode;
}

function Envelope({
    message = (
        <div className="pt-2">
            <h2 className="mb-4 font-serif text-3xl font-semibold italic text-ink">
                Hello ❤️️
            </h2>
            <p className="font-serif text-lg leading-[32px] text-ink/80">
                Ini adalah pesan rahasia yang tersembunyi di dalam amplop.
            </p>
        </div>
    ),
}: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Tunggu flap kebuka + surat naik, baru modal muncul
        setTimeout(() => {
            setShowModal(true);
        }, 1300);
    };

    const handleClose = () => {
        setShowModal(false);

        // Tunggu modal hilang, baru amplop nutup lagi
        setTimeout(() => {
            setIsOpen(false);
        }, 400);
    };

    useEffect(() => {
        if (!showModal) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = original;
            window.removeEventListener('keydown', onKey);
        };
    }, [showModal]);

    return (
        <>
            <div className="p-4">
                <motion.div
                    className="relative h-[220px] w-[320px] sm:h-[300px] sm:w-[460px]"
                    style={{ perspective: '1500px' }}
                    animate={isOpen ? { y: 0 } : { y: [0, -8, 0] }}
                    transition={isOpen ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {/* Warm glow behind */}
                    <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-blush/20 blur-3xl" />
                    {/* Shadow below */}
                    <div className="absolute -bottom-10 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-black/40 blur-2xl" />

                    {/* Letter sliding out */}
                    <motion.div
                        className="absolute left-1/2 top-4 z-10 h-[80%] w-[86%] -translate-x-1/2 rounded-sm border border-petal bg-paper p-6 shadow-xl"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(#fff8f1 0px, #fff8f1 27px, #f3d6dc 28px)',
                        }}
                        initial={false}
                        animate={
                            isOpen
                                ? { y: -190, opacity: 1, scale: 1 }
                                : { y: 40, opacity: 0, scale: 0.95 }
                        }
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: isOpen ? 0.35 : 0 }}
                    >
                        <div className="mt-1 text-center font-windsong text-3xl text-rosewood">
                            for you
                        </div>
                    </motion.div>

                    {/* Envelope body */}
                    <div className="absolute bottom-0 left-0 z-20 h-full w-full overflow-hidden rounded-lg bg-gradient-to-b from-[#f7d3db] to-[#eebac6] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]">
                        <div
                            className="absolute bottom-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#e6a3b4] to-[#f0c3ce]"
                            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                        />
                        <div
                            className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#e6a3b4] to-[#f3cbd5]"
                            style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
                        />
                        <div
                            className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#f2c0cc] to-[#f7d3db]"
                            style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }}
                        />
                        {/* Gold foil edge */}
                        <div className="pointer-events-none absolute inset-1.5 rounded-md border border-gold/60" />
                        {/* Tiny hand-drawn hearts */}
                        <span className="absolute bottom-4 left-5 font-windsong text-2xl text-rosewood/70">with love</span>
                        <Heart className="absolute bottom-5 right-6 h-4 w-4 fill-rosewood/40 text-rosewood/60" />
                    </div>

                    {/* Flap */}
                    <motion.div
                        className="absolute left-0 top-0 z-30 w-full origin-top"
                        initial={false}
                        animate={{ rotateX: isOpen ? -180 : 0, zIndex: isOpen ? 5 : 30 }}
                        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                        style={{
                            height: '55%',
                            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                            background: 'linear-gradient(165deg, #fbe1e7 0%, #ebb2c0 100%)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                    </motion.div>

                    {/* Wax seal */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.button
                                type="button"
                                onClick={handleOpen}
                                aria-label="Buka surat"
                                className="absolute left-1/2 top-[47%] z-40 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_6px_18px_rgba(60,0,15,0.7),inset_0_-4px_10px_rgba(0,0,0,0.35),inset_0_3px_6px_rgba(255,255,255,0.25)]"
                                style={{
                                    background: 'radial-gradient(circle at 35% 30%, #c2405f, #8e1b38 50%, #4a0a1c 100%)',
                                    borderRadius: '48% 52% 50% 50% / 52% 48% 52% 48%',
                                }}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.06, 1] }}
                                exit={{ scale: 0, opacity: 0, rotate: 30 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                whileHover={{ scale: 1.15, rotate: 6 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="absolute inset-2 rounded-full border border-[#e9a0b2]/30" />
                                <Heart className="h-6 w-6 sm:h-7 sm:w-7 fill-[#f6c9d4]/80 text-[#f6c9d4] drop-shadow" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {!isOpen && (
                    <p className="mt-10 text-center font-serif text-sm italic tracking-widest text-champagne/60 animate-pulse">
                        tap the seal
                    </p>
                )}
            </div>

            {createPortal(
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-wine-950/80 p-4 sm:p-6 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                        >
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rosewood/25 blur-[120px]" />

                            <motion.div
                                className="relative flex max-h-[86vh] w-full max-w-xl flex-col rounded-md bg-paper shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] ring-1 ring-gold/40"
                                initial={{ opacity: 0, y: 60, rotate: -3, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 30, rotate: 2, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Washi tape */}
                                <div className="pointer-events-none absolute -top-3 left-1/2 z-20 h-7 w-28 -translate-x-1/2 rotate-2 bg-blush/70 shadow-sm" />

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Tutup"
                                    className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-petal/60 text-rosewood transition-colors hover:bg-petal"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                <div
                                    className="overflow-y-auto rounded-md px-6 pb-12 pt-14 sm:px-10"
                                    style={{
                                        backgroundImage:
                                            'repeating-linear-gradient(transparent, transparent 31px, #f3d6dc 31px, #f3d6dc 32px)',
                                        backgroundAttachment: 'local',
                                    }}
                                >
                                    {/* Margin line, like real letter paper */}
                                    <div className="pointer-events-none absolute bottom-0 left-4 top-0 w-px bg-rosewood/20 sm:left-7" />
                                    <div className="relative z-10">{message}</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}

export default Envelope;
