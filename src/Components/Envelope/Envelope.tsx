import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EnvelopeProps {
    message?: React.ReactNode;
}

function Envelope({
    message = (
        <div className="pt-2">
            <h2 className="mb-4 font-serif text-3xl font-bold italic text-[#2c241b]">
                Hello ❤️️
            </h2>
            <p className="font-serif text-lg leading-[32px] text-[#4a3f32]">
                Ini adalah pesan rahasia yang tersembunyi di dalam amplop.
                Terima kasih sudah membukanya! Semoga harimu menyenangkan
                dan selalu dipenuhi dengan senyuman.
            </p>
            <p className="mt-8 font-serif text-lg italic text-[#4a3f32] text-right">
                - Dari seseorang yang peduli
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
        }, 1200);
    };

    const handleClose = () => {
        setShowModal(false);

        // Tunggu modal hilang, baru amplop nutup lagi
        setTimeout(() => {
            setIsOpen(false);
        }, 400);
    };

    return (
        <>
            {/* Bagian Amplop */}
            <div className="p-4">
                <div
                    className="relative h-[240px] w-[340px] sm:h-[320px] sm:w-[480px]"
                    style={{ perspective: '1500px' }}
                >
                    {/* Bayangan di bawah amplop*/}
                    <div className="absolute -bottom-8 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-black/20 blur-2xl" />

                    {/* Miniatur Surat yang keluar dari amplop */}
                    <motion.div
                        className="absolute left-1/2 top-4 z-10 h-[80%] w-[85%] -translate-x-1/2 rounded-sm border border-[#e2d5bd] bg-[#fffdf7] p-6 shadow-xl"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(#fffdf7 0px, #fffdf7 27px, #e8dfc9 28px)',
                        }}
                        initial={false}
                        animate={
                            isOpen
                                ? { y: -200, opacity: 1, scale: 1 }
                                : { y: 40, opacity: 0, scale: 0.95 }
                        }
                        transition={{
                            duration: 0.85,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <div className="mt-2 text-center text-sm uppercase tracking-widest text-[#b5a488] opacity-80">
                            A special letter
                        </div>
                    </motion.div>

                    {/* Badan amplop (belakang) */}
                    <div className="absolute bottom-0 left-0 z-20 h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#e7c9a0] to-[#dcb98c] shadow-[0_20px_40px_-15px_rgba(80,50,20,0.5)]">
                        {/* Lipatan kiri */}
                        <div
                            className="absolute bottom-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#cf9d62] to-[#d9b487]"
                            style={{
                                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                            }}
                        />
                        {/* Lipatan kanan */}
                        <div
                            className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#cf9d62] to-[#e0c096]"
                            style={{
                                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                            }}
                        />
                        {/* Lipatan bawah */}
                        <div
                            className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-[#ebc38d] to-[#e7c9a0]"
                            style={{
                                clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)',
                            }}
                        />
                        {/* Garis tepi untuk kesan 3D */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
                    </div>

                    {/* Flap atas (Tutup Amplop) */}
                    <motion.div
                        className="absolute left-0 top-0 z-30 w-full origin-top"
                        initial={false}
                        animate={{ rotateX: isOpen ? -180 : 0 }}
                        transition={{
                            duration: 0.7,
                            ease: [0.65, 0, 0.35, 1],
                        }}
                        style={{
                            height: '55%',
                            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                            background:
                                'linear-gradient(160deg, #f2ddb8 0%, #e3c396 100%)',
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                         {/* Highlight tepi tutup amplop */}
                         <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                    </motion.div>

                    {/* Wax seal (Stempel Lilin) */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.button
                                type="button"
                                onClick={handleOpen}
                                aria-label="Buka surat"
                                className="cursor-pointer absolute left-1/2 top-[47%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-[#f5dbdb] shadow-[0_5px_15px_rgba(150,40,40,0.6),inset_0_-3px_8px_rgba(0,0,0,0.3)]"
                                style={{
                                    background:
                                        'radial-gradient(circle at 35% 30%, #f46b6b, #c94848 50%, #8b1e1e 100%)',
                                }}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.05, 1] }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ♥
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal isi surat */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    >
                        <motion.div
                            // Desain Kertas Utama (diberi batas tinggi max 85vh)
                            className="relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-sm bg-[#fcfaf5] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                            // Animasi muncul seperti kertas jatuh
                            initial={{ opacity: 0, y: 50, rotate: -3, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, rotate: 2, scale: 0.95 }}
                            transition={{
                                type: 'spring',
                                stiffness: 250,
                                damping: 25,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Efek Selotip (Tape) di atas kertas */}
                            <div 
                                className="pointer-events-none absolute -top-3 left-1/2 z-20 h-8 w-28 -translate-x-1/2 rotate-1 bg-white/40 backdrop-blur-md shadow-sm"
                                style={{ 
                                    border: '1px solid rgba(255,255,255,0.4)', 
                                    borderLeft: '2px dotted rgba(255,255,255,0.6)', 
                                    borderRight: '2px dotted rgba(255,255,255,0.6)' 
                                }} 
                            />

                            {/* Tombol Tutup (tetap melayang di posisi kanan atas) */}
                            <button
                                type="button"
                                onClick={handleClose}
                                aria-label="Tutup"
                                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-2xl text-gray-500 transition-colors hover:bg-black/10 hover:text-gray-800"
                            >
                                ×
                            </button>

                            {/* Container Konten yang Bisa Di-scroll */}
                            <div
                                className="overflow-y-auto px-6 sm:px-8 pb-12 pt-16 rounded-sm"
                                style={{
                                    // Garis-garis buku tulis
                                    backgroundImage:
                                        'repeating-linear-gradient(transparent, transparent 31px, #e2d5bd 31px, #e2d5bd 32px)',
                                    backgroundAttachment: 'local',
                                }}
                            >
                                <div className="relative z-10">
                                    {message}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Envelope;