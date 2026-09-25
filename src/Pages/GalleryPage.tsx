import Layout from "../Components/Layout";
import EnvelopeSection from "./Section/Envelope.Gallery";
import { getContentFromSectionPage } from "./../lib/content"
import FloatingHearts from "../Components/Support/FloatingHeart";

let envelopeContent : any = getContentFromSectionPage("galleryPage", "envelopeSection")
envelopeContent = envelopeContent.data

export default function GalleryPage() {
    console.log(envelopeContent)
    return (
        <Layout>
            <FloatingHearts />
            <EnvelopeSection data={envelopeContent} />
        </Layout>
    );
}