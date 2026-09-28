import Layout from "../Components/Layout";
import FloatingHearts from "../Components/Support/FloatingHeart";
import Subtitle from "../Components/Texts/Subtitle";
import Title from "../Components/Texts/Title";

export default function NotFoundPage(){
    return(
        <Layout>
            <div className="flex flex-col min-h-screen justify-center items-center text-center">
                <Title text="Page Not Found" />
                <Subtitle text="Page gone or never existed" />
                <FloatingHearts />

            </div>
        </Layout>
    )
}