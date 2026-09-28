import Layout from "../Components/Layout";
import EnvelopeSection from "./Section/Envelope.Gallery";
import { getContentFromSectionPage } from "./../lib/content"
import FloatingHearts from "../Components/Support/FloatingHeart";
import MusicSection from "./Section/Music.Gallery";
import PhotosGallerySection from "./Section/Photos.Gallery";
import { motion } from "framer-motion"; // Import framer-motion
import VideoSection from "./Section/Video.Gallery";

let envelopeContent: any = getContentFromSectionPage("galleryPage", "envelopeSection")
envelopeContent = envelopeContent.data

let musicContent: any = getContentFromSectionPage("galleryPage", "musicSection")
musicContent = musicContent.data

let photosGalleryContent: any = getContentFromSectionPage("galleryPage", "photosGallerySection")
photosGalleryContent = photosGalleryContent.data

let videoContent: any = getContentFromSectionPage("galleryPage", "videoSection")
videoContent = videoContent.data

export default function GalleryPage() {
    // Konfigurasi animasi slide ke atas untuk setiap section
    const slideUpVariants = {
        hidden: { opacity: 0, y: 75 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    } as const;

    return (
        <Layout>
            <FloatingHearts />
            
            <div className="h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
                
                <motion.div 
                    className="snap-start min-h-screen w-full flex items-center justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={slideUpVariants}
                >
                    <MusicSection data={musicContent} />
                </motion.div>

                <motion.div 
                    className="snap-start min-h-screen w-full flex items-center justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={slideUpVariants}
                >
                    <EnvelopeSection data={envelopeContent} />
                </motion.div>


                <motion.div 
                    className="snap-start min-h-screen w-full flex items-center justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={slideUpVariants}
                >
                    <PhotosGallerySection data={photosGalleryContent} />
                </motion.div>

                <motion.div 
                    className="snap-start min-h-screen w-full flex items-center justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={slideUpVariants}
                >
                    <VideoSection data={videoContent} />
                </motion.div>
            </div>
        </Layout>
    );
}