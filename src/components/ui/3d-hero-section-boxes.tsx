import React from 'react';
import { ArrowDown, Sparkles, FolderOpen, Mail } from 'lucide-react';

interface HeroSectionProps {
  lang?: 'es' | 'en';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang = 'es' }) => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center bg-[#111111] overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Fondo de atmósfera editorial profunda con gradiente radial */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(200, 75, 49, 0.08) 0%, rgba(20, 20, 20, 0.6) 45%, #111111 85%)',
        }}
      />

      {/* Marca de agua monumental tipográfica en 2D (Monograma L // B de fondo) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="text-[18rem] sm:text-[26rem] lg:text-[34rem] font-display font-extrabold text-white/[0.015] leading-none -translate-x-12">
          L
        </span>
        <span className="text-[18rem] sm:text-[26rem] lg:text-[34rem] font-display font-extrabold text-white/[0.015] leading-none translate-x-12">
          B
        </span>
      </div>

      {/* Retícula editorial sutil (Crosshairs en las esquinas del lienzo) */}
      <div
        aria-hidden="true"
        className="absolute top-28 left-8 text-neutral-600/40 text-xs font-mono select-none pointer-events-none hidden sm:block"
      >
        + 00° 13' S / 78° 30' W
      </div>
      <div
        aria-hidden="true"
        className="absolute top-28 right-8 text-neutral-600/40 text-xs font-mono select-none pointer-events-none hidden sm:block"
      >
        ISTER // EDITORIAL
      </div>

      {/* Contenedor Principal */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col justify-center">
        {/* Badge superior de especialidad */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit mb-8 sm:mb-10">
          <span className="w-2 h-2 rounded-full bg-[#C84B31] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase">
            {lang === 'es'
              ? 'Diseño Gráfico · After Effects · Dirección de Arte'
              : 'Graphic Design · After Effects · Art Direction'}
          </span>
        </div>

        {/* Composición Principal en Grilla Asimétrica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Columna Izquierda: Retrato Auténtico & Nombre Monumental */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Foto de Perfil de Luis Bermúdez con Anillo Editorial */}
              <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#C84B31] ring-4 ring-[#C84B31]/20 shadow-[0_0_35px_rgba(200,75,49,0.3)] group">
                <img
                  src="/PERFIL.jpg"
                  alt="Luis Bermúdez"
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Títulos y Firma */}
              <div>
                <span className="text-xs font-mono text-[#C84B31] tracking-widest uppercase font-semibold block mb-1">
                  {lang === 'es' ? 'Portafolio de Autor' : 'Author Portfolio'}
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#E8E4DC] tracking-tight leading-[1.05]">
                  Luis Bermúdez
                </h1>
                <p className="text-sm sm:text-lg text-neutral-400 font-display italic mt-1.5">
                  {lang === 'es'
                    ? 'Tecnólogo Universitario en Diseño Gráfico & Producción Audiovisual'
                    : 'University Technologist in Graphic Design & Audiovisual Production'}
                </p>
              </div>
            </div>

            {/* Disciplinas en Ledger Suizo */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                lang === 'es' ? 'After Effects' : 'After Effects',
                lang === 'es' ? 'Diseño Editorial Shibui' : 'Shibui Editorial',
                lang === 'es' ? 'Identidad de Marca' : 'Brand Identity',
                lang === 'es' ? 'Producción Audiovisual' : 'Audiovisual Production',
                lang === 'es' ? 'Retícula Suiza' : 'Swiss Grid Systems',
              ].map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-white/[0.04] border border-white/5 text-neutral-300"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Manifiesto Síntesis & Botones de Acción */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {lang === 'es'
                ? 'Concibo el diseño como un ejercicio de ordenación espacial y ritmo temporal. Forjo narrativas visuales, identidades corporativas y piezas cinemáticas basadas en la disciplina del mito nórdico Raun y la sobria elegancia japonesa Shibui.'
                : 'I perceive design as an exercise in spatial structure and temporal rhythm. Crafting visual identities, cinematic motion pieces, and high-end publications rooted in the rigor of Norse Raun and Japanese Shibui restraint.'}
            </p>

            {/* Bloque de Acciones */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#proyectos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C84B31] text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#b03f27] hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#C84B31]/20"
              >
                <FolderOpen className="w-4 h-4" />
                <span>{lang === 'es' ? 'Explorar Proyectos' : 'Explore Works'}</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-neutral-200 font-medium text-xs uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-95 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{lang === 'es' ? 'Iniciar Diálogo' : 'Get in Touch'}</span>
              </a>
            </div>

            {/* Resumen de Trayectoria */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{lang === 'es' ? 'Graduado ISTER · Quito' : 'ISTER Graduate · Quito'}</span>
              <span className="text-[#C84B31]">2024 — 2026</span>
            </div>
          </div>
        </div>

        {/* Indicador inferior de scroll */}
        <div className="pt-12 sm:pt-16 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C84B31]" />
            {lang === 'es' ? 'Manifiesto interactivo a continuación' : 'Interactive manifesto below'}
          </span>
          <a
            href="#manifiesto"
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <span>{lang === 'es' ? 'Desplazar' : 'Scroll down'}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
