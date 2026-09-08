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

  // Dividir en 3 columnas equilibradas (3 imágenes por columna)
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        'mx-auto block h-[38rem] w-full overflow-hidden rounded-xl bg-neutral-950/60 border border-white/5 py-8 max-xl:h-[32rem] max-sm:h-[26rem]',
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="aspect-square size-[45rem] shrink-0 scale-125 max-xl:size-full max-xl:scale-105 max-sm:scale-120">
          <div
            style={{
              transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)',
              transformStyle: 'preserve-3d',
            }}
            className="relative top-0 right-[-50%] grid size-full origin-top-left grid-cols-3 gap-5 max-xl:-top-24 max-xl:right-[-40%] max-sm:top-0 max-sm:gap-2"
          >
            {chunks.map((subarray, colIndex) => {
              const isEven = colIndex % 2 === 0
              const animDuration = isEven ? '14s' : '18s'

              return (
                <div
                  key={`col-${colIndex}`}
                  style={{
                    animation: isVisible
                      ? `marqueeFloat ${animDuration} ease-in-out infinite alternate`
                      : 'none',
                    animationDirection: isEven ? 'normal' : 'reverse',
                    willChange: isVisible ? 'transform' : 'auto',
                  }}
                  className="flex flex-col items-start gap-6 max-sm:gap-3"
                >
                  {subarray.map((src, imageIndex) => (
                    <div
                      key={`img-${colIndex}-${imageIndex}-${src}`}
                      className="relative overflow-hidden rounded-xl border border-white/15 bg-neutral-900 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-editorial-accent/80"
                    >
                      <img
                        className="aspect-[4/3] h-full w-full object-cover select-none bg-neutral-900"
                        src={src}
                        draggable={false}
                        alt={`Proyecto ${imageIndex + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CSS Keyframes nativos de GPU para animación sedosa sin JavaScript */}
      <style>{`
        @keyframes marqueeFloat {
          0% {
            transform: translate3d(0, -40px, 0);
          }
          100% {
            transform: translate3d(0, 40px, 0);
          }
        }
      `}</style>
    </div>
  )
}

export default ThreeDMarquee
