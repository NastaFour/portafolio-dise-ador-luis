import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface KineticTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Tipografía Cinética estilo After Effects (Split por palabra y carácter con máscara)
 * Respeta prefers-reduced-motion mediante gsap.matchMedia() y limpia con useGSAP().
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.022,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const chars = el.querySelectorAll('.kinetic-char');
        const bar = el.querySelector('.kinetic-accent-bar');

        gsap.fromTo(
          chars,
          {
            yPercent: 115,
            rotateZ: 4,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 0.85,
            stagger,
            delay,
            ease: 'power4.out',
          }
        );

        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.1, delay: delay + 0.15, ease: 'expo.out' }
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [text, delay, stagger] }
  );

  const words = text.split(' ');

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`relative ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true" className="inline">
        {words.map((word, wIdx) => (
          <span
            key={`${word}-${wIdx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.26em] last:mr-0"
          >
            {Array.from(word).map((char, cIdx) => (
              <span
                key={`${char}-${cIdx}`}
                className="kinetic-char inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
};

interface EditorialMotionGraphicBadgeProps {
  variant: 'bezier' | 'grid' | 'waveform' | 'seal';
  accentColor?: string;
}

/**
 * Emblemas vectoriales 2D animados (SVG Motion Graphics al estilo After Effects)
 */
export const EditorialMotionGraphicBadge: React.FC<EditorialMotionGraphicBadgeProps> = ({
  variant,
  accentColor = '#C84B31',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const paths = svg.querySelectorAll('.mg-draw-path');
        const nodes = svg.querySelectorAll('.mg-node');
        const orbit = svg.querySelector('.mg-orbit');

        if (paths.length > 0) {
          gsap.fromTo(
            paths,
            { strokeDasharray: 140, strokeDashoffset: 140 },
            {
              strokeDashoffset: 0,
              duration: 1.8,
              stagger: 0.18,
              ease: 'power3.inOut',
              repeat: -1,
              yoyo: true,
              repeatDelay: 0.8,
            }
          );
        }

        if (nodes.length > 0) {
          gsap.to(nodes, {
            scale: 1.25,
            transformOrigin: 'center center',
            duration: 0.9,
            stagger: 0.15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (orbit) {
          gsap.to(orbit, {
            rotation: 360,
            transformOrigin: '24px 24px',
            duration: 14,
            repeat: -1,
            ease: 'none',
          });
        }
      });

      return () => mm.revert();
    },
    { scope: svgRef, dependencies: [variant] }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 48 48"
      className="w-10 h-10 shrink-0 overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      <circle
        className="mg-orbit"
        cx="24"
        cy="24"
        r="21"
        stroke={accentColor}
        strokeWidth="1.2"
        strokeDasharray="16 28"
      />

      {variant === 'bezier' && (
        <>
          <line
            x1="10"
            y1="34"
            x2="18"
            y2="14"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1="38"
            y1="14"
            x2="30"
            y2="34"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <path
            className="mg-draw-path"
            d="M 10 34 C 18 14, 30 34, 38 14"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            className="mg-node"
            x="16"
            y="12"
            width="4"
            height="4"
            fill="#E8E4DC"
          />
          <rect
            className="mg-node"
            x="28"
            y="32"
            width="4"
            height="4"
            fill={accentColor}
          />
        </>
      )}

      {variant === 'waveform' && (
        <>
          {[14, 19, 24, 29, 34].map((x, idx) => {
            const heights = [10, 20, 26, 16, 12];
            const h = heights[idx];
            const y = 24 - h / 2;
            return (
              <line
                key={x}
                className="mg-node"
                x1={x}
                y1={y}
                x2={x}
                y2={y + h}
                stroke={idx === 2 ? accentColor : '#E8E4DC'}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            );
          })}
        </>
      )}

      {variant === 'grid' && (
        <>
          <rect
            className="mg-draw-path"
            x="13"
            y="13"
            width="22"
            height="22"
            rx="2"
            stroke="#E8E4DC"
            strokeWidth="1.4"
          />
          <path
            className="mg-draw-path"
            d="M 13 27 A 14 14 0 0 1 27 13"
            stroke={accentColor}
            strokeWidth="2"
          />
          <circle className="mg-node" cx="27" cy="27" r="2.5" fill={accentColor} />
        </>
      )}

      {variant === 'seal' && (
        <>
          <path
            className="mg-draw-path"
            d="M 24 11 C 32 11, 37 17, 36 25 C 35 32, 29 37, 22 36 C 15 35, 11 29, 13 21 C 14 16, 18 13, 22 13"
            stroke={accentColor}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle className="mg-node" cx="24" cy="24" r="3" fill="#E8E4DC" />
        </>
      )}
    </svg>
  );
};

interface EndorserBannerProps {
  lang: 'es' | 'en';
}

/**
 * Banda de Respaldo & Avales Reales (Kriss Ecuador, Minerva, ISTER)
 * Mantiene únicamente quienes dan fe de su trabajo actual, con estética editorial y motion 2D.
 */
export const EndorserCredibilityStrip: React.FC<EndorserBannerProps> = ({ lang }) => {
  const stripRef = useRef<HTMLDivElement | null>(null);

  const endorsers = [
    {
      name: 'Kriss Ecuador',
      role: {
        es: 'Producción Audiovisual, Motion Design & Contenido Digital',
        en: 'Audiovisual Production, Motion Design & Digital Content',
      },
      badge: 'waveform' as const,
      accent: '#C84B31',
      href: 'https://www.instagram.com/krisecuador/',
      verifiedLabel: { es: 'AVAL DE PRODUCCIÓN ACTIVA', en: 'ACTIVE PRODUCTION ENDORSER' },
    },
    {
      name: 'Minerva',
      role: {
        es: 'Desarrollo Visual, Animación Publicitaria & Redes Sociales',
        en: 'Visual Development, Commercial Motion & Social Media',
      },
      badge: 'bezier' as const,
      accent: '#D4A373',
      href: undefined,
      verifiedLabel: { es: 'AVAL COMERCIAL & MOTION', en: 'COMMERCIAL & MOTION ENDORSER' },
    },
    {
      name: 'ISTER — Universitario Rumiñahui',
      role: {
        es: 'Tecnólogo Universitario en Diseño Gráfico y Producción Audiovisual',
        en: 'University Technologist in Graphic Design & Audiovisual Production',
      },
      badge: 'grid' as const,
      accent: '#E06D2B',
      href: undefined,
      verifiedLabel: { es: 'RESPALDO ACADÉMICO & TITULACIÓN', en: 'ACADEMIC CREDENTIAL & THESIS' },
    },
  ];

  useGSAP(
    () => {
      const el = stripRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = el.querySelectorAll('.endorser-card');
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      });
      return () => mm.revert();
    },
    { scope: stripRef }
  );

  return (
    <div ref={stripRef} className="w-full py-10 border-y border-white/10 bg-[#111111]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#C84B31]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#C84B31] font-semibold">
              {lang === 'es'
                ? 'RESPALDO & TRAYECTORIA COMPROBADA'
                : 'VERIFIED ENDORSEMENTS & PRODUCTION TRACK RECORD'}
            </span>
          </div>
          <p className="text-xs font-sans text-neutral-400">
            {lang === 'es'
              ? 'Marcas e instituciones que avalan el rigor, el cumplimiento y la calidad visual de cada entrega.'
              : 'Brands and institutions backing the discipline, reliability, and visual craft of every delivery.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {endorsers.map((item) => {
            const inner = (
              <div className="endorser-card h-full relative p-5 sm:p-6 bg-[#171717] border border-white/10 hover:border-[#C84B31]/60 transition-all duration-300 rounded-tl-none rounded-br-none rounded-tr-[36px] rounded-bl-[36px] flex flex-col justify-between gap-4 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                      {item.verifiedLabel[lang]}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#E8E4DC] group-hover:text-[#C84B31] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <EditorialMotionGraphicBadge variant={item.badge} accentColor={item.accent} />
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {item.role[lang]}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>
                    {lang === 'es' ? 'REFERENCIA VERIFICADA' : 'VERIFIED REFERENCE'}
                  </span>
                  {item.href && (
                    <span className="text-[#C84B31] font-semibold group-hover:underline">
                      @krisecuador ↗
                    </span>
                  )}
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {inner}
              </a>
            ) : (
              <div key={item.name} className="h-full">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
