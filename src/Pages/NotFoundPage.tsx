import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Devider from "../Components/Devider/Devider";
import FloatingHearts from "../Components/Support/FloatingHeart";
import Subtitle from "../Components/Texts/Subtitle";
import Title from "../Components/Texts/Title";

export default function NotFoundPage(){
    return(
        <Layout>
            <FloatingHearts />
            <div className="relative z-10 flex flex-col min-h-screen justify-center items-center text-center gap-2 px-4">
                <Title text="Page Not Found" />
                <Devider variant="sparkle" className="!py-3" />
                <Subtitle text="Page gone or never existed" />
                <Link
                    to="/"
                    className="mt-6 rounded-full border border-champagne/40 px-7 py-2.5 font-serif italic text-champagne/90 transition-colors hover:border-champagne/80 hover:text-champagne"
                >
                    Home
                </Link>
            </div>
        </Layout>
    )
}
