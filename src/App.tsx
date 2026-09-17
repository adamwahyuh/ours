import Button from "./Components/Button/Button"
import Polaroid from "./Components/Photo/Polaroid"
import Title from "./Components/Texts/Title"

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#780000] to-[#C1121F] overflow-hidden gap-10 p-8">

        <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
                // Membuat garis vertikal dan horizontal setebal 1px berwarna putih
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                // Mengatur ukuran kotak-kotaknya (40px x 40px)
                backgroundSize: '60px 60px'
            }}
        />

        {/* Wrapper teks (z-10 agar berada di atas grid) */}
        <div className="z-10 flex flex-col items-center gap-4 text-center">
            <Title text="Happy Birthday" />
            <p className="text-white/90 text-lg md:text-xl tracking-wide font-light">
                Hello, I have a surprise for you
            </p>
        </div>

        {/* Wrapper button (z-10) */}
        <div className="z-10 flex flex-row gap-6">
          <Button label="Open" /> 
          <Button label="Later" no={true} />
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
  )
}

export default App