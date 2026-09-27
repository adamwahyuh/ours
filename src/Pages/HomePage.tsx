import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Polaroid from "../Components/Photo/Polaroid"
import Title from "../Components/Texts/Title"
import Layout from "../Components/Layout"
import ButtonRunAway from "../Components/Button/ButtonRunAway"
import { Link } from "react-router-dom"
import FloatingHearts from "../Components/Support/FloatingHeart"
import { getContentFromSectionPage } from "../lib/content"
import Subtitle from "../Components/Texts/Subtitle"

const homePageContent = getContentFromSectionPage("homePage", "homeSection")
const d = homePageContent.data

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
}

const riseVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
} as const

const polaroidVariants: Variants = {
    hidden: (rotation: number) => ({
        opacity: 0,
        y: -60,
        rotate: rotation * 2.5,
        scale: 0.85,
    }),
    visible: (rotation: number) => ({
        opacity: 1,
        y: 0,
        rotate: rotation,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 14 },
    }),
}

export default function HomePage() {
    return (
        <Layout>
            <motion.div
                className="flex flex-col items-center justify-center gap-6 py-10 mt-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <FloatingHearts />

                <motion.div
                    className="z-10 flex flex-col items-center gap-4 text-center"
                    variants={riseVariants}
                >
                    <Title text={d.title} />
                    <Subtitle text={d.subtitle} />
                </motion.div>

                <motion.div
                    className="z-10 flex flex-row gap-6"
                    variants={riseVariants}
                >
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.96, y: 2 }}
                    >
                        <Link
                            to={"/happy-birthday"}
                            className="group relative inline-flex items-center gap-3 bg-[#fdf0d5] text-[#780000] font-extrabold text-lg py-3.5 px-9 rounded-full border-2 border-[#fdf0d5] shadow-[0_6px_0_#4a0000] transition-shadow duration-150 hover:shadow-[0_9px_0_#4a0000] active:shadow-none"
                        >
                            <motion.span
                                className="text-xl inline-block"
                                whileHover={{ rotate: 12, scale: 1.25 }}
                            >
                                ✨
                            </motion.span>
                            <span>Open</span>
                            <motion.span
                                className="text-xl inline-block"
                                whileHover={{ rotate: -12, scale: 1.25 }}
                            >
                                🎁
                            </motion.span>
                        </Link>
                    </motion.div>

                    <ButtonRunAway label="Later" no={true} />
                </motion.div>

                <div className="z-10 flex flex-row items-center justify-center -space-x-16 group mt-4">
                    {d.photos.slice(0, 3).map((photo: { source: string; caption: string }, i: number) => {
                        const rotations = [-8, 5, -4]
                        const rotation = rotations[i]
                        return (
                            <motion.div
                                key={photo.source}
                                custom={rotation}
                                variants={polaroidVariants}
                                whileHover={{
                                    scale: 1.08,
                                    rotate: 0,
                                    y: -12,
                                    zIndex: 50,
                                    transition: { type: "spring", stiffness: 260, damping: 18 },
                                }}
                                className="relative"
                            >
                                <Polaroid
                                    path={photo.source}
                                    alt={photo.caption}
                                    caption={photo.caption}
                                    rotation={rotation}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </Layout>
    )
}