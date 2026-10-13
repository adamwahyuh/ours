import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Heart, X } from "lucide-react"

interface PhotoMessageModalProps {
  src: string
  alt?: string
  children?: React.ReactNode
  labelLeft?: string
  labelRight?: string
  signature?: { name: string; note?: string }
  className?: string
  thumbnailClassName?: string
  rotation?: number
}

export default function PhotoWithModal({
  src,
  alt = "",
  children,
  labelLeft,
  labelRight,
  signature,
  className = "",
  thumbnailClassName = "w-40 h-40 sm:w-48 sm:h-48",
  rotation = 0,
}: PhotoMessageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  src = "/ours" + src

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 250)
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  const openModal = () => {
    setIsOpen(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)))
  }

  return (
    <>
      {/* Polaroid thumbnail */}
      <button
        type="button"
        onClick={openModal}
        aria-label="Buka foto"
        style={{ ["--r" as string]: `${rotation}deg` }}
        className={`group relative block bg-paper p-1.5 pb-7 sm:p-2.5 sm:pb-10 rounded-[3px] shadow-[0_14px_30px_-10px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out [transform:rotate(var(--r))] hover:[transform:rotate(0deg)_scale(1.06)] hover:z-10 hover:shadow-[0_24px_50px_-12px_rgba(168,56,90,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blush ${className}`}
      >
        <div className={`relative overflow-hidden ${thumbnailClassName}`}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover sepia-[0.1] transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-wine-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <Heart className="h-8 w-8 fill-blush/70 text-paper drop-shadow-lg animate-heartbeat" />
          </div>
        </div>
        <Heart className="absolute bottom-2 right-2.5 h-3 w-3 sm:bottom-3 sm:h-4 sm:w-4 fill-rosewood/50 text-rosewood/60" />
      </button>

      {/* Modal */}
      {isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-wine-950/80 backdrop-blur-md" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rosewood/25 blur-[120px]" />

            {/* Love-note card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-gradient-to-b from-paper to-[#fbe9ec] shadow-2xl shadow-black/60 ring-1 ring-gold/40 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
              }`}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup"
                className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-petal/70 text-rosewood transition-all duration-300 hover:bg-petal hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-rosewood/40"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col px-5 pt-8 pb-6 sm:px-9 sm:pt-10 sm:pb-8">
                {/* Photo pinned like a keepsake */}
                <div className="relative mx-auto mb-7 -rotate-2 bg-white p-2 pb-6 rounded-sm shadow-lg shadow-black/25">
                  <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3 bg-blush/70" />
                  <img
                    src={src}
                    alt={alt}
                    className="w-full max-h-64 sm:max-h-72 object-cover rounded-[2px]"
                  />
                </div>

                {(labelLeft || labelRight) && (
                  <div className="mb-5 flex items-center justify-between border-b border-rosewood/20 pb-3 text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-rosewood/80 uppercase">
                    <span>{labelLeft}</span>
                    <span>{labelRight}</span>
                  </div>
                )}

                <div className="text-left font-serif text-ink text-lg sm:text-xl leading-[30px] sm:leading-[34px]">
                  {children}
                </div>

                {signature && (
                  <div className="mt-8 border-t border-rosewood/20 pt-4 flex items-end justify-end">
                    <div className="flex flex-col items-end">
                      <span className="font-windsong text-3xl text-rosewood leading-tight">
                        {signature.name}
                      </span>
                      {signature.note && (
                        <span className="text-sm font-serif text-ink/60 italic">
                          {signature.note}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
