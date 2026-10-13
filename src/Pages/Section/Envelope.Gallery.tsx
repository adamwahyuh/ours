import { motion } from 'motion/react';

import Envelope from "../../Components/Envelope/Envelope";
import Title from "../../Components/Texts/Title";
import Subtitle from '../../Components/Texts/Subtitle';
import Devider from '../../Components/Devider/Devider';

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
} as const;

interface envelopeProps {
    data : any
}

export default function EnvelopeSection({ data }: envelopeProps){
    const letter = data.envelopeContent;

    return (
        <div className="relative w-full px-4 py-16 flex flex-col items-center justify-center">
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="flex flex-col items-center text-center gap-2"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-gold/80 font-sans">
                            <span className="h-px w-8 bg-gold/40" />
                            <span>{data.subtitle}</span>
                            <span className="h-px w-8 bg-gold/40" />
                        </div>

                        <Title text={data.title} />
                        <Devider className="!py-3" />
                        <Subtitle text={data.subtitle2} />
                    </motion.div>

                    <motion.div
                        className="relative flex items-center justify-center w-full"
                        variants={itemVariants}
                    >
                        <Envelope
                            message={
                                <div className="flex flex-col text-left font-serif text-ink">
                                    <div className="mb-6 flex items-center justify-between border-b border-rosewood/20 pb-3 text-[11px] font-sans tracking-[0.25em] text-rosewood/80 uppercase">
                                        <span>{letter.header.left}</span>
                                        <span>{letter.header.right}</span>
                                    </div>

                                    <h2 className="mb-4 font-windsong text-4xl sm:text-5xl text-rosewood leading-tight">
                                        {letter.body.title}
                                    </h2>

                                    {letter.body.messages.map((msg : string, idx : number) => (
                                        <p
                                            key={idx}
                                            className={`text-lg sm:text-xl leading-[32px] text-ink/90 ${idx === 0 ? 'first-letter:float-left first-letter:mr-2 first-letter:font-windsong first-letter:text-6xl first-letter:leading-[0.9] first-letter:text-rosewood' : 'mt-4'}`}
                                        >
                                            {msg}
                                        </p>
                                    ))}

                                    <div className="mt-10 border-t border-rosewood/20 pt-4 flex items-end justify-between">
                                        <div className="text-[10px] font-sans tracking-[0.25em] text-rosewood/60 uppercase">
                                            {letter.footer.left}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-windsong text-4xl text-rosewood leading-tight">
                                                {letter.footer.right.up}
                                            </span>
                                            <span className="text-sm font-serif text-ink/60 italic">
                                                {letter.footer.right.down}
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
