import React, { useState, useEffect } from "react"
import { X } from "lucide-react"

interface PhotoMessageModalProps {
  src: string
  alt?: string
  children?: React.ReactNode
  labelLeft?: string
  labelRight?: string
  signature?: { name: string; note?: string }
  className?: string
  thumbnailClassName?: string
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
}: PhotoMessageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

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

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 250)
  }

  return (
    <>
      {/* Thumbnail trigger */}
      <button
        type="button"
        onClick={openModal}
        aria-label="Buka foto"
        className={`group relative overflow-hidden border border-white/20 shadow-lg shadow-black/20 transition-all duration-300 hover:border-[#fdf0d5]/50 hover:shadow-[#780000]/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#fdf0d5]/40 ${thumbnailClassName} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModal}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Ambient glow, echoing the envelope section's hero */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[120px]" />

          {/* Paper card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#d8c3b0]/60 bg-gradient-to-b from-[#faf3e6] to-[#f0e1c8] shadow-2xl shadow-black/50 transition-all duration-300 ${
              isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-[#d8c3b0]/60 bg-[#faf3e6]/80 backdrop-blur-sm text-[#4a3b2c] transition-all duration-300 hover:bg-[#f0e1c8] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#8c7355]/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
              {/* Photo pasted at the top like a keepsake */}
              <div className="mx-auto -rotate-1 bg-white p-2 pb-5 rounded-sm shadow-md shadow-black/20 mb-6">
                <img
                  src={src}
                  alt={alt}
                  className="w-full max-h-64 sm:max-h-72 object-cover rounded-[2px]"
                />
              </div>

              {/* Paper header, mirroring the envelope's vintage tag row */}
              {(labelLeft || labelRight) && (
                <div className="mb-5 flex items-center justify-between border-b border-[#d8c3b0]/60 pb-3 text-[10px] sm:text-[11px] font-sans tracking-widest text-[#8c7355] uppercase">
                  <span>{labelLeft}</span>
                  <span>{labelRight}</span>
                </div>
              )}

              {/* Message body — accepts any children/HTML */}
              <div className="text-left font-serif text-[#4a3b2c] text-base sm:text-lg leading-[30px] sm:leading-[32px] [&_p+p]:mt-4 [&_strong]:not-italic [&_strong]:font-semibold [&_strong]:text-[#1c140d]">
                {children}
              </div>

              {/* Signature footer, mirroring the envelope's footer */}
              {signature && (
                <div className="mt-8 border-t border-[#d8c3b0]/60 pt-4 flex items-end justify-end">
                  <div className="flex flex-col items-end">
                    <span className="font-serif italic text-base text-[#7c3a3a] font-semibold">
                      {signature.name}
                    </span>
                    {signature.note && (
                      <span className="text-xs font-serif text-[#665343] italic">
                        {signature.note}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}