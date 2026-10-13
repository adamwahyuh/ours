import { motion } from "motion/react"
import type { Variants } from "motion/react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import Polaroid from "../Components/Photo/Polaroid"
import Title from "../Components/Texts/Title"
import Layout from "../Components/Layout"
import ButtonRunAway from "../Components/Button/ButtonRunAway"
import FloatingHearts from "../Components/Support/FloatingHeart"
import { getContentFromSectionPage } from "../lib/content"
import Subtitle from "../Components/Texts/Subtitle"
import Devider from "../Components/Devider/Devider"

const homePageContent = getContentFromSectionPage("homePage", "homeSection")
const d = homePageContent.data

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.22,
            delayChildren: 0.2,
        },
    },
}

const riseVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
} as const

const polaroidVariants: Variants = {
    hidden: { opacity: 0, y: -80 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 90, damping: 12, delay: 0.9 + i * 0.2 },
    }),
}

// Resting tilt + y-offset so the photos follow the sag of the string
const hangs = [
    { rotation: -6, offset: 0 },
    { rotation: 3, offset: 28 },
    { rotation: -4, offset: 0 },
]

const bulbs = Array.from({ length: 11 }, (_, i) => i / 10)

export default function HomePage() {
    return (
        <Layout>
            <FloatingHearts />

            <motion.div
                className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 py-16"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center gap-2 text-center" variants={riseVariants}>
                    <Title text={d.title} />
                    <Devider className="!py-2" />
                    <Subtitle text={d.subtitle} />
                </motion.div>

                <motion.div className="flex flex-row flex-wrap items-center justify-center gap-5" variants={riseVariants}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                        <Link
                            to={"/happy-birthday"}
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rosewood via-[#c94f74] to-rosewood px-9 py-3.5 font-serif text-xl font-semibold tracking-wide text-paper shadow-[0_10px_30px_-6px_rgba(168,56,90,0.8),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-gold/50"
                        >
                            {/* Sheen sweep */}
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md transition-all duration-700 group-hover:left-[120%]" />
                            <Heart className="h-5 w-5 fill-paper/90 text-paper animate-heartbeat" />
                            <span>Open</span>
                            <span className="text-xl">🎁</span>
                        </Link>
                    </motion.div>

                    <ButtonRunAway label="Later" no={true} />
                </motion.div>

                {/* Fairy-light string with hanging polaroids */}
                <div className="relative mt-6 w-full max-w-4xl">
                    <svg
                        viewBox="0 0 1000 120"
                        preserveAspectRatio="none"
                        className="absolute inset-x-0 top-0 h-16 sm:h-20 w-full overflow-visible"
                        aria-hidden
                    >
                        <path d="M0,10 Q500,120 1000,10" fill="none" stroke="#e2bf86" strokeOpacity="0.55" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20" aria-hidden>
                        {bulbs.map((t, i) => {
                            // Point on the quadratic curve (0,10) (500,120) (1000,10), in viewBox units
                            const y = (1 - t) ** 2 * 10 + 2 * (1 - t) * t * 120 + t ** 2 * 10
                            return (
                                <span
                                    key={i}
                                    className="absolute h-2 w-2 -translate-x-1/2 rounded-full bg-champagne animate-twinkle shadow-[0_0_12px_4px_rgba(246,227,195,0.65)]"
                                    style={{ left: `${t * 100}%`, top: `${(y / 120) * 100}%`, animationDelay: `${(i % 4) * 0.6}s` }}
                                />
                            )
                        })}
                    </div>

                    <div className="relative flex flex-row items-start justify-center gap-2 sm:gap-8 pt-6 sm:pt-8">
                        {d.photos.slice(0, 3).map((photo: { source: string; caption: string }, i: number) => {
                            const { rotation, offset } = hangs[i]
                            return (
                                <motion.div
                                    key={photo.source}
                                    custom={i}
                                    variants={polaroidVariants}
                                    style={{ marginTop: offset }}
                                    className="relative"
                                >
                                    <motion.div
                                        className="origin-top"
                                        animate={{ rotate: [rotation, rotation + 2.5, rotation] }}
                                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                                        whileHover={{ rotate: 0, scale: 1.08, y: 8, zIndex: 20 }}
                                    >
                                        {/* Little clip */}
                                        <span className="absolute -top-2 left-1/2 z-10 h-5 w-2.5 -translate-x-1/2 rounded-sm bg-gradient-to-b from-gold to-[#b08a50] shadow" />
                                        <Polaroid path={photo.source} alt={photo.caption} caption={photo.caption} />
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        </Layout>
    )
}
