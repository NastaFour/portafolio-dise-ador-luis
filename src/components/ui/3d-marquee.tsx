'use client'

/**
 * @description: 3D Marquee ultra-optimizado para el portafolio de Luis Bermúdez.
 * Ejecuta en el hilo de composición de la GPU (CSS keyframes) con pausa automática
 * cuando está fuera del viewport (IntersectionObserver) para eliminar 100% de lag.
 */
import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
}

const defaultImages = [
  '/projects/raun/raun_page_01.jpg',
  '/projects/dolores/page_1.jpg',
  '/projects/legionfit/plate_mockup.webp',
  '/projects/ironwall/post_1_ironwall.png',
  '/projects/raun/raun_page_08.jpg',
  '/projects/legionfit/fire_mockup.webp',
  '/projects/dolores/page_3.jpg',
  '/projects/ironwall/slide2.jpg',
  '/projects/raun/raun_page_04.jpg',
]

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images = defaultImages,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Pausar animación cuando la vitrina no esté en pantalla para ahorrar 100% de GPU
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Duplicar array para loop infinito continuo
  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-neutral-950/60 border border-white/10 py-6 sm:py-8 backdrop-blur-sm select-none group',
        className
      )}
    >
      {/* Máscaras de gradiente lateral para desvanecimiento suave */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

      {/* Riel 2D Horizontal Continuo */}
      <div
        style={{
          animation: isVisible ? 'marquee2D 35s linear infinite' : 'none',
          willChange: isVisible ? 'transform' : 'auto',
        }}
        className="flex gap-4 sm:gap-6 w-max group-hover:[animation-play-state:paused]"
      >
        {duplicatedImages.map((src, idx) => (
          <div
            key={`marquee-img-${idx}`}
            className="relative shrink-0 w-64 sm:w-80 md:w-96 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:border-[#C84B31]/80 hover:scale-[1.02]"
          >
            <img
              src={src}
              alt={`Lámina ${idx + 1}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee2D {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeDMarquee;
