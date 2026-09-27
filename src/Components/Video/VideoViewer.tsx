import { useEffect, useRef, useState } from "react"
import { Heart, Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"

interface VideoViewerProps {
    src?: string
    caption?: string
    subCaption?: string
}

export default function VideoViewer({
    src = "videos/Momemts.mp4",
    caption = "Our Moments",
    subCaption = "Every second with you, kept forever.",
}: VideoViewerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showHeart, setShowHeart] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    src = "/birthday" + src

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    const toggleFullscreen = () => {
        const container = containerRef.current
        if (!container) return

        if (!document.fullscreenElement) {
            container.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return
        video.muted = !video.muted
        setIsMuted(video.muted)
    }

    const handleDoubleClick = () => {
        setShowHeart(true)
        setTimeout(() => setShowHeart(false), 800)
    }

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#fdf0d5]/20 via-transparent to-[#fdf0d5]/10 blur-2xl rounded-[2rem] pointer-events-none" />

            <div className="relative rounded-3xl p-[3px] bg-gradient-to-br from-[#fdf0d5]/70 via-[#fdf0d5]/20 to-[#fdf0d5]/70 shadow-2xl shadow-black/40">
                <div
                    ref={containerRef}
                    className={`relative overflow-hidden bg-black group ${
                        isFullscreen
                            ? "w-screen h-screen rounded-none flex items-center justify-center"
                            : "rounded-[calc(1.5rem-2px)]"
                    }`}
                    onDoubleClick={handleDoubleClick}
                >
                    <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#fdf0d5]/70 rounded-tl-md z-20" />
                    <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#fdf0d5]/70 rounded-tr-md z-20" />
                    <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#fdf0d5]/70 rounded-bl-md z-20" />
                    <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#fdf0d5]/70 rounded-br-md z-20" />

                    <video
                        ref={videoRef}
                        className={
                            isFullscreen
                                ? "w-full h-full object-contain"
                                : "w-full aspect-video object-cover"
                        }
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={togglePlay}
                        playsInline
                    >
                        <source src={src} />
                    </video>

                    <div className="absolute top-0 left-0 right-0 px-8 pt-6 pb-10 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-10">
                        <p className="font-serif italic text-[#fdf0d5] text-lg sm:text-xl tracking-wide drop-shadow-md">
                            {caption}
                        </p>
                        <p className="text-[#fdf0d5]/70 text-[11px] sm:text-xs tracking-[0.2em] uppercase mt-1">
                            {subCaption}
                        </p>
                    </div>

                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center z-10"
                            aria-label="Play video"
                        >
                            <span className="absolute w-20 h-20 rounded-full bg-[#fdf0d5]/10 animate-ping" />
                            <span className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fdf0d5]/95 shadow-lg shadow-black/50 transition-transform duration-300 hover:scale-110">
                                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#780000] ml-1 fill-[#780000]" />
                            </span>
                        </button>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={togglePlay}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#fdf0d5]/15 backdrop-blur-sm border border-[#fdf0d5]/30 text-[#fdf0d5] transition-all hover:bg-[#fdf0d5]/25 hover:scale-105"
                        >
                            {isPlaying ? (
                                <Pause className="w-4 h-4" />
                            ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                            )}
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#fdf0d5]/15 backdrop-blur-sm border border-[#fdf0d5]/30 text-[#fdf0d5] transition-all hover:bg-[#fdf0d5]/25 hover:scale-105"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4" />
                                ) : (
                                    <Volume2 className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#fdf0d5]/15 backdrop-blur-sm border border-[#fdf0d5]/30 text-[#fdf0d5] transition-all hover:bg-[#fdf0d5]/25 hover:scale-105"
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-4 h-4" />
                                ) : (
                                    <Maximize className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {showHeart && (
                        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                            <Heart
                                className="w-24 h-24 text-[#fdf0d5] fill-[#fdf0d5] animate-[ping_0.8s_ease-out] drop-shadow-lg"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}