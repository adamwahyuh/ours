import Polaroid from "../Components/Photo/Polaroid"
import Title from "../Components/Texts/Title"
import Layout from "../Components/Layout"
import ButtonRunAway from "../Components/Button/ButtonRunAway"
import { Link } from "react-router-dom"
import FloatingHearts from "../Components/Support/FloatingHeart"

export default function HomePage (){
    return(
        <Layout>
            <div className="flex flex-col items-center justify-center gap-6 py-10">

                <FloatingHearts />
                
                <div className="z-10 flex flex-col items-center gap-4 text-center">
                    <Title text="Happy Birthday" />
                    <p className="text-white/90 text-lg md:text-xl tracking-wide font-light">
                        Hello, I have a surprise for you
                    </p>
                </div>

                {/* Wrapper button (z-10) */}
                <div className="z-11 flex flex-row gap-6">
                    <Link
                        to={"/happy-birthday"}
                        className="group relative inline-flex items-center gap-3 bg-[#fdf0d5] text-[#780000] font-extrabold text-lg py-3.5 px-9 rounded-full border-2 border-[#fdf0d5] shadow-[0_6px_0_#4a0000] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_9px_0_#4a0000] hover:bg-white active:translate-y-1.5 active:shadow-none"
                    >
                        <span className="text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">✨</span>
                        <span>Open</span>
                        <span className="text-xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125">🎁</span>
                    </Link>
                    
                    <ButtonRunAway label="Later" no={true} />
                </div>

                {/* Tumpukan Polaroid (z-10) */}
                <div className="z-10 flex flex-row items-center justify-center -space-x-16 group mt-4">
                    <Polaroid 
                        path="/images/beach.jpg" 
                        alt="Beach photo" 
                        caption="Beach"
                        rotation={-8} 
                    />
                    
                    <Polaroid 
                        path="/images/ragunan.jpg" 
                        alt="Ragunan photo" 
                        caption="Ragunan"
                        rotation={5} 
                    />
                    
                    <Polaroid 
                        path="/images/spiderman.jpg" 
                        alt="Spiderman photo" 
                        caption="Spiderman"
                        rotation={-4} 
                    />
                </div>
            </div>
        </Layout>
    )
}