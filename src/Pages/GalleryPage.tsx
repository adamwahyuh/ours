import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Layout from "../Components/Layout";
import EnvelopeSection from "./Section/Envelope.Gallery";
import { getContentFromSectionPage } from "./../lib/content"
import FloatingHearts from "../Components/Support/FloatingHeart";
import MusicSection from "./Section/Music.Gallery";
import PhotosGallerySection from "./Section/Photos.Gallery";
import VideoSection from "./Section/Video.Gallery";

const envelopeContent: any = getContentFromSectionPage("galleryPage", "envelopeSection").data
const musicContent: any = getContentFromSectionPage("galleryPage", "musicSection").data
const photosGalleryContent: any = getContentFromSectionPage("galleryPage", "photosGallerySection").data
const videoContent: any = getContentFromSectionPage("galleryPage", "videoSection").data

const sections = [
    { label: "Songs", node: <MusicSection data={musicContent} /> },
    { label: "Letter", node: <EnvelopeSection data={envelopeContent} /> },
    { label: "Memories", node: <PhotosGallerySection data={photosGalleryContent} /> },
    { label: "Film", node: <VideoSection data={videoContent} /> },
]

// Konfigurasi animasi slide ke atas untuk setiap section
const slideUpVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    }
} as const;

export default function GalleryPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const [active, setActive] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(Number((entry.target as HTMLElement).dataset.index))
                    }
                })
            },
            { root: containerRef.current, threshold: 0.5 }
        )
        sectionRefs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const scrollTo = (i: number) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })

    return (
        <Layout>
            <FloatingHearts />

            {/* Chapter dots */}
            <nav className="fixed right-3 sm:right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-4" aria-label="Sections">
                {sections.map((s, i) => (
                    <button
                        key={s.label}
                        onClick={() => scrollTo(i)}
                        aria-label={s.label}
                        className="group relative flex items-center justify-end"
                    >
                        <span className="pointer-events-none absolute right-7 whitespace-nowrap font-serif text-sm italic text-champagne/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {s.label}
                        </span>
                        <span
                            className={`text-sm leading-none transition-all duration-500 ${
                                active === i
                                    ? "scale-125 text-blush drop-shadow-[0_0_8px_rgba(242,184,198,0.9)]"
                                    : "text-champagne/30 group-hover:text-champagne/70"
                            }`}
                        >
                            ♥
                        </span>
                    </button>
                ))}
            </nav>

            <div
                ref={containerRef}
                className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {sections.map((s, i) => (
                    <motion.div
                        key={s.label}
                        ref={(el) => { sectionRefs.current[i] = el }}
                        data-index={i}
                        className="snap-start min-h-screen w-full flex items-center justify-center pt-12 sm:pt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={slideUpVariants}
                    >
                        {s.node}
                    </motion.div>
                ))}
            </div>
        </Layout>
    );
}
