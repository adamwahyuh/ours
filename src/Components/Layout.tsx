import type React from "react"
import { Link, useLocation } from "react-router-dom"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#780000] to-[#C1121F] overflow-x-hidden">
            {/* Background Grid Pattern */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Sticky Floating Navbar */}
            {location.pathname !== '/' && (
            <header className="sticky top-5 z-10 flex justify-right w-full px-4 pointer-events-none">
                <nav className="pointer-events-auto flex items-center justify-center rounded-full border border-white/20 bg-black/20 px-6 py-2 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/35 hover:bg-black/30">
                    <Link 
                        to="/" 
                        className={`flex items-center gap-2 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase transition-all duration-300 ${
                            location.pathname === '/' 
                                ? 'text-white font-semibold' 
                                : 'text-white/80 hover:text-white hover:scale-105'
                        }`}
                    >
                        <span>Home</span>
                    </Link>
                </nav>
            </header>

            )}

            {/* Main Content Wrapper */}
            <main className="">
                {children}
            </main>

            <footer>
                
            </footer>
        </div>
    )
}