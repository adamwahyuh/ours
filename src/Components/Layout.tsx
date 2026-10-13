import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Heart } from "lucide-react"

interface LayoutProps {
    children: React.ReactNode
}

// Soft out-of-focus lights, like candles across a dim room
const bokeh = [
    { top: "8%", left: "12%", size: 220, color: "bg-rosewood/25", delay: "0s" },
    { top: "18%", left: "82%", size: 280, color: "bg-gold/15", delay: "1.5s" },
    { top: "62%", left: "6%", size: 260, color: "bg-gold/10", delay: "3s" },
    { top: "78%", left: "70%", size: 320, color: "bg-rosewood/20", delay: "2s" },
    { top: "45%", left: "50%", size: 520, color: "bg-wine-700/40", delay: "0.5s" },
]

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    return (
        <div className="grain relative min-h-screen w-full flex flex-col items-center overflow-x-hidden bg-wine-950 text-cream">
            {/* Velvet base */}
            <div
                className="pointer-events-none fixed inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, #6d1630 0%, transparent 70%)," +
                        "radial-gradient(ellipse 70% 50% at 50% 100%, #4a0f20 0%, transparent 75%)," +
                        "linear-gradient(180deg, #2e0914 0%, #1f060d 100%)",
                }}
            />

            {/* Bokeh glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                {bokeh.map((b, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full blur-[90px] animate-glow-breathe ${b.color}`}
                        style={{ top: b.top, left: b.left, width: b.size, height: b.size, animationDelay: b.delay }}
                    />
                ))}
            </div>

            {/* Vignette */}
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,2,5,0.75)_100%)]" />

            {location.pathname !== "/" && (
                <header className="fixed top-5 left-5 z-40">
                    <nav className="flex items-center rounded-full border border-gold/30 bg-wine-950/40 px-5 py-2 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-500 hover:border-gold/60 hover:bg-wine-900/60">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-champagne/80 transition-colors duration-300 hover:text-champagne"
                        >
                            <Heart className="w-3.5 h-3.5 fill-blush/40 text-blush transition-transform duration-300 group-hover:scale-125" />
                            <span>Home</span>
                        </Link>
                    </nav>
                </header>
            )}

            <main className="relative z-10 w-full flex flex-col items-center">
                {children}
            </main>
        </div>
    )
}
