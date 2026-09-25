import { motion } from 'motion/react';

import Envelope from "../../Components/Envelope/Envelope";
import Title from "../../Components/Texts/Title";
import Subtitle from '../../Components/Texts/Subtitle';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
};

interface envelopeProps {
    data : any
}

export default function EnvelopeSection({ data }: envelopeProps){
    return (
        <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden px-4 flex flex-col items-center justify-center">
                
                {/* Visual Ambient Glow  */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[130px]" />
                <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-rose-500/10 blur-[100px]" />


                {/* Konten Utama dengan Staggered Animation */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div
                        className="flex flex-col items-center text-center gap-3"
                        variants={itemVariants}
                    >
                        {/* Sub-header Vintage */}
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e8d5c4]/80 font-sans">
                            <span className="h-[1px] w-6 bg-[#e8d5c4]/30" />
                            <span>{data.subtitle}</span>
                            <span className="h-[1px] w-6 bg-[#e8d5c4]/30" />
                        </div>

                        <Title text={data.title} />

                        <Subtitle text={data.subtitle2} />
                    </motion.div>

                    {/* Envelope Section dengan Ambient Pedestal */}
                    <motion.div
                        className="relative my-2 flex items-center justify-center w-full"
                        variants={itemVariants}
                    >
                        <Envelope
                            message={
                                <div className="flex flex-col text-left font-serif text-[#2a221b] px-1 sm:px-2">
                                    {/* Header Surat Vintage */}
                                    <div className="mb-6 flex items-center justify-between border-b border-[#d8c3b0]/60 pb-3 text-[11px] font-sans tracking-widest text-[#8c7355] uppercase">
                                        <span>{data.envelopeContent.header.left}</span>
                                        <span>{data.envelopeContent.header.right}</span>
                                    </div>

                                    {/* Judul Surat */}
                                    <h2 className="mb-4 text-2xl sm:text-3xl font-bold italic text-[#1c140d] tracking-tight">
                                        {data.envelopeContent.body.title}
                                    </h2>

                                    {/* Isi Pesan Surat */}
                                    {data.envelopeContent.body.messages.map((msg : string, idx : number) => {
                                        return(
                                            <p className={`text-base sm:text-lg leading-[32px] text-[#4a3b2c] font-serif ${idx > 0 ? 'mt-4' : ''}`}>
                                                {msg}
                                            </p>
                                        )
                                    })}

                                    {/* Footer / Tanda Tangan Surat */}
                                    <div className="mt-8 border-t border-[#d8c3b0]/60 pt-4 flex items-end justify-between">
                                        <div className="text-[10px] font-sans tracking-widest text-[#a08a72] uppercase">
                                            {data.envelopeContent.footer.left}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-serif italic text-base text-[#7c3a3a] font-semibold">
                                                {data.envelopeContent.footer.right.up}
                                            </span>
                                            <span className="text-xs font-serif text-[#665343] italic">
                                                {data.envelopeContent.footer.right.down}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </motion.div>

                </motion.div>
            </div>
    )
}