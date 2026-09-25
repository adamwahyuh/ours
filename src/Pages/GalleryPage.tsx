import Layout from "../Components/Layout";
import EnvelopeSection from "./Section/Envelope.Gallery";
import { getContentFromSectionPage } from "./../lib/content"
import FloatingHearts from "../Components/Support/FloatingHeart";
import MusicSection from "./Section/Music.Gallery";

let envelopeContent : any = getContentFromSectionPage("galleryPage", "envelopeSection")
envelopeContent = envelopeContent.data

let musicContent : any = getContentFromSectionPage("galleryPage", "musicSection")
musicContent = musicContent.data

export default function GalleryPage() {
    return (
        <Layout>
            <FloatingHearts />
            <EnvelopeSection data={envelopeContent} />
            <MusicSection data={musicContent} />
        </Layout>
    );
}