import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Film, BookOpen, PenTool, Clapperboard, Compass } from 'lucide-react';

interface JapaneseEmakimonoScrollProps {
  lang: 'es' | 'en';
}

interface ScrollSection {
  number: string;
  kanjiNumber: string;
  kanji: string;
  kanjiMeaning: { es: string; en: string };
  hankoSeal: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  highlight: {
    label: { es: string; en: string };
    value: string;
  };
  tools: string[];
  icon: React.ElementType;
}

const EMAKI_SECTIONS: ScrollSection[] = [
  {
    number: '01',
    kanjiNumber: '巻ノ一',
    kanji: '動',
    kanjiMeaning: { es: 'MOVIMIENTO // DŌ', en: 'MOTION // DŌ' },
    hankoSeal: '動',
    title: {
      es: 'After Effects & Motion Graphics',
      en: 'After Effects & Motion Graphics',
    },
    subtitle: {
      es: 'Curvas Bézier, Coreografía de Tiempo & Kinetic Type',
      en: 'Bézier Velocity, Kinetic Typography & Timing',
    },
    description: {
      es: 'Dominio avanzado de After Effects para dotar a las marcas de dinamismo, peso y gravedad. Construcción de identidades en movimiento, transiciones fluidas sin cortes artificiales y animación tipográfica publicitaria con timing milimétrico.',
      en: 'Deep mastery of After Effects endowing brands with kinetic cadence, weight, and momentum. Crafting kinetic identities, seamless transitions, and high-impact kinetic typography with commercial precision.',
    },
    highlight: {
      label: { es: 'CLIENTES & APLICACIÓN', en: 'CLIENTS & DOMAIN' },
      value: 'Kriss Ecuador · Minerva · Intros Publicitarias & Loops',
    },
    tools: ['After Effects', 'Premiere Pro', 'Curvas Bézier', 'Kinetic Typography', 'Audio Sync'],
    icon: Film,
  },
  {
    number: '02',
    kanjiNumber: '巻ノ二',
    kanji: '書',
    kanjiMeaning: { es: 'EDITORIAL // SHO', en: 'EDITORIAL // SHO' },
    hankoSeal: '書',
    title: {
      es: 'Diseño Editorial Shibui',
      en: 'Shibui Editorial Craft',
    },
    subtitle: {
      es: 'Revista RAUN, Retícula Suiza & Proporción Áurea',
      en: 'RAUN Journal, Swiss Modular Grids & Golden Ratio',
    },
    description: {
      es: 'Diseño editorial de autor inspirado en la sobriedad japonesa Shibui y el vacío intencional (Ma). Maquetación de libros conceptuales, revistas de alta gama y publicaciones patrimoniales interactivas con armonía tipográfica y balance matemático.',
      en: 'Authorial publication craft anchored in Shibui restraint and intentional void (Ma). Typesetting conceptual journals, high-end publications, and interactive cultural editions with typographic discipline.',
    },
    highlight: {
      label: { es: 'OBRAS EMBLEMÁTICAS', en: 'BENCHMARK WORKS' },
      value: 'Revista RAUN (N° 01) · Dolores Veintimilla (EPUB & PDF)',
    },
    tools: ['Adobe InDesign', 'Retícula Suiza', 'Drop-Caps', 'Canon Van de Graaf', 'Jerarquía Shibui'],
    icon: BookOpen,
  },
  {
    number: '03',
    kanjiNumber: '巻ノ三',
    kanji: '形',
    kanjiMeaning: { es: 'IDENTIDAD // KATA', en: 'IDENTITY // KATA' },
    hankoSeal: '形',
    title: {
      es: 'Identidad Visual & Dirección de Arte',
      en: 'Brand Architecture & Art Direction',
    },
    subtitle: {
      es: 'Sistemas de Marca, Geometría Vectorial & Normativa',
      en: 'Visual Systems, Vector Geometry & Brand Standards',
    },
    description: {
      es: 'Construcción integral de identidad gráfica basada en síntesis geométrica y permanencia. Diseño de isotipos con proporción áurea, selección tipográfica jerárquica, manuales de normas exhaustivos y dirección estética multiplataforma.',
      en: 'Comprehensive brand identity architecture driven by geometric reduction and longevity. Golden-ratio mark crafting, disciplined typographic pairings, corporate guidelines, and tactile print specifications.',
    },
    highlight: {
      label: { es: 'CLIENTES & MARCAS', en: 'BRANDS & COLLABORATIONS' },
      value: 'Kriss Ecuador · Minerva · IronWall · LegionFit',
    },
    tools: ['Adobe Illustrator', 'Manuales de Marca', 'Geometría Vectorial', 'Papelería Fina', 'Dirección de Arte'],
    icon: PenTool,
  },
  {
    number: '04',
    kanjiNumber: '巻ノ四',
    kanji: '響',
    kanjiMeaning: { es: 'RESONANCIA // HIBIKI', en: 'RHYTHM // HIBIKI' },
    hankoSeal: '響',
    title: {
      es: 'Producción Audiovisual & Ritmo',
      en: 'Audiovisual Direction & Cadence',
    },
    subtitle: {
      es: 'Montaje Rítmico, Sincronización Sonora & Etalonaje',
      en: 'Rhythmic Cutting, Beat-Sync & Cinematic Grading',
    },
    description: {
      es: 'Edición cinematográfica y dirección audiovisual en Premiere Pro. El corte rítmico sincronizado al compás sonoro, corrección de color cinemática y tratamiento de imagen para campañas comerciales y piezas de marca de alto impacto.',
      en: 'Cinematic video editing and audiovisual pacing in Premiere Pro. Beat-matched editorial cutting, nuanced color grading, and visual storytelling calibrated for commercial campaigns and brand launches.',
    },
    highlight: {
      label: { es: 'PIPELINE AUDIOVISUAL', en: 'PRODUCTION PIPELINE' },
      value: 'Premiere Pro · Sincronización Musical · Etalonaje · Comercial',
    },
    tools: ['Adobe Premiere Pro', 'Corte Rítmico', 'Color Grading', 'Sound Design Sync', 'Dirección'],
    icon: Clapperboard,
  },
  {
    number: '05',
    kanjiNumber: '巻ノ末',
    kanji: '侘',
    kanjiMeaning: { es: 'FILOSOFÍA // WABI', en: 'PHILOSOPHY // WABI' },
    hankoSeal: '印',
    title: {
      es: 'La Filosofía de la Forja (Raun)',
      en: 'The Forge Philosophy (Raun)',
    },
    subtitle: {
      es: 'El Crisol Creativo, la Sobriedad & el Propósito',
      en: 'The Creative Crucible, Restraint & Intentionality',
    },
    description: {
      es: 'Cada proyecto es una prueba deliberada donde el error y la insistencia purifican la idea original. Sin artificios superficiales ni excesos decorativos: el diseño existe para ordenar el espacio y el movimiento con alma y carácter trascendente.',
      en: 'Every project is a deliberate crucible where trial and persistence refine the initial concept. Free of superfluous decoration: design exists to order space and motion with enduring character.',
    },
    highlight: {
      label: { es: 'CONFIANZA & ALIANZAS', en: 'TRUSTED BY' },
      value: 'Kriss Ecuador · Minerva · CreativeIn · ISTER',
    },
    tools: ['Shibui (Elegancia)', 'Ma (Vacío)', 'Wabi-Sabi', 'Raun (Crisol)', 'Rigor Suizo'],
    icon: Compass,
  },
];

export const JapaneseEmakimonoScroll: React.FC<JapaneseEmakimonoScrollProps> = ({ lang }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);
    setScrollProgress(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Cabecera del Rollo Japonés (Emakimono) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C84B31] uppercase bg-[#C84B31]/10 px-2.5 py-0.5 rounded border border-[#C84B31]/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#C84B31]" />
              {lang === 'es' ? '絵巻物 // EMAKIMONO' : '絵巻物 // HORIZONTAL SCROLL'}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
              {lang === 'es' ? '[ 02 // ROLLO DE DISCIPLINAS & ENFOQUE ]' : '[ 02 // CRAFT SCROLL & DISCIPLINES ]'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {lang === 'es'
              ? 'El Despliegue de la Obra: Diseño & After Effects'
              : 'The Unfolding Scroll: Design & After Effects'}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1.5 max-w-2xl leading-relaxed">
            {lang === 'es'
              ? 'Un recorrido horizontal continuo por los capítulos de producción: animación After Effects, dirección editorial Shibui, arquitectura de marca para Kriss Ecuador y Minerva, y cadencia audiovisual.'
              : 'A panoramic horizontal scroll across core domains: After Effects motion, Shibui editorial direction, brand architecture for Kriss Ecuador and Minerva, and cinematic cadence.'}
          </p>
        </div>

        {/* Controles de Navegación del Rollo */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline-block tracking-wider">
            {lang === 'es' ? 'DESLIZA HORIZONTALMENTE ← →' : 'SWIPE HORIZONTALLY ← →'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              title={lang === 'es' ? 'Desplazar a la izquierda' : 'Scroll left'}
              className="p-2.5 rounded-full border border-white/15 bg-neutral-900/90 text-white hover:bg-[#C84B31] hover:border-[#C84B31] disabled:opacity-30 disabled:hover:bg-neutral-900/90 disabled:hover:border-white/15 transition duration-200 shadow-lg active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Desplazar a la izquierda"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              title={lang === 'es' ? 'Desplazar a la derecha' : 'Scroll right'}
              className="p-2.5 rounded-full border border-white/15 bg-neutral-900/90 text-white hover:bg-[#C84B31] hover:border-[#C84B31] disabled:opacity-30 disabled:hover:bg-neutral-900/90 disabled:hover:border-white/15 transition duration-200 shadow-lg active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Desplazar a la derecha"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor del Rollo Japonés Horizontal con Rodillos Laterales */}
      <div className="relative group">
        {/* Rodillo Lateral Izquierdo (Eje Jiku 軸 de madera y latón) */}
        <div className="hidden lg:flex absolute -left-4 top-0 bottom-6 w-3 bg-gradient-to-r from-[#111111] via-[#222222] to-[#141414] border-y-2 border-l border-[#C84B31]/60 rounded-l-md z-20 items-center justify-center pointer-events-none shadow-2xl">
          <div className="w-1 h-12 bg-[#C84B31]/40 rounded-full" />
        </div>

        {/* Rodillo Lateral Derecho (Eje Jiku 軸 de madera y latón) */}
        <div className="hidden lg:flex absolute -right-4 top-0 bottom-6 w-3 bg-gradient-to-l from-[#111111] via-[#222222] to-[#141414] border-y-2 border-r border-[#C84B31]/60 rounded-r-md z-20 items-center justify-center pointer-events-none shadow-2xl">
          <div className="w-1 h-12 bg-[#C84B31]/40 rounded-full" />
        </div>

        {/* Carril de Desplazamiento Horizontal (Scrollway Emakimono) */}
        <div
          ref={scrollContainerRef}
          style={{
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-2 pb-6 px-1 sm:px-2 scrollbar-thin scrollbar-track-neutral-950 scrollbar-thumb-white/15 hover:scrollbar-thumb-[#C84B31]/50 focus:outline-none"
        >
          {EMAKI_SECTIONS.map((section, index) => {
            const Icon = section.icon;

            return (
              <article
                key={section.number}
                className="group/card relative flex-shrink-0 w-[88vw] sm:w-[460px] lg:w-[500px] snap-start rounded-2xl border border-white/10 bg-gradient-to-b from-[#181818] to-[#101010] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#C84B31]/70 hover:shadow-[0_12px_40px_rgba(200,75,49,0.12)]"
              >
                {/* Gran Marca de Agua Caligráfica Japonesa en el Fondo */}
                <div className="absolute -top-6 -right-4 text-8xl sm:text-9xl font-serif font-black text-white/[0.025] group-hover/card:text-[#C84B31]/[0.06] transition-colors duration-500 select-none pointer-events-none leading-none z-0">
                  {section.kanji}
                </div>

                {/* Encabezado del Panel: Capítulo Emaki + Sello Hanko Rojo */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#C84B31] tracking-wider">
                          {section.kanjiNumber}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">
                          // 0{index + 1}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          [{section.kanjiMeaning[lang]}]
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-white group-hover/card:text-[#E8E4DC] transition-colors leading-tight">
                        {section.title[lang]}
                      </h4>
                    </div>

                    {/* Sello Rojo Tradicional Japonés (落款 Hanko / Inkan) */}
                    <div
                      title="Sello de autor Luis Bermúdez"
                      className="shrink-0 w-9 h-9 rounded-md border-2 border-[#C84B31] bg-[#C84B31]/10 flex flex-col items-center justify-center text-[#C84B31] shadow-[0_0_12px_rgba(200,75,49,0.25)] group-hover/card:bg-[#C84B31]/20 transition"
                    >
                      <span className="font-serif font-bold text-xs leading-none">
                        {section.hankoSeal}
                      </span>
                      <span className="text-[7px] font-mono uppercase tracking-tighter opacity-80">
                        BERM
                      </span>
                    </div>
                  </div>

                  {/* Subtítulo de Técnica & Enfoque */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C84B31] mb-3">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-1">{section.subtitle[lang]}</span>
                  </div>

                  {/* Texto Editorial del Capítulo */}
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6 opacity-90">
                    {section.description[lang]}
                  </p>
                </div>

                {/* Pie del Panel: Clientes Destacados & Suite de Herramientas */}
                <div className="relative z-10 pt-4 border-t border-white/10 space-y-4">
                  {/* Destacado de Clientes & Alianzas Reales */}
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">
                      {section.highlight.label[lang]}
                    </span>
                    <span className="text-xs font-mono text-white font-medium block">
                      {section.highlight.value}
                    </span>
                  </div>

                  {/* Etiquetas Técnicas */}
                  <div className="flex flex-wrap gap-1.5">
                    {section.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] sm:text-[11px] font-mono text-neutral-300 group-hover/card:border-[#C84B31]/30 transition"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Barra de Progreso del Despliegue del Rollo (Estilo Cinta de Seda Roja) */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-[#C84B31] transition-all duration-150 rounded-full shadow-[0_0_8px_#C84B31]"
            style={{ width: `${Math.max(12, scrollProgress)}%` }}
          />
        </div>

        <div className="shrink-0 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31] animate-pulse" />
          <span>{lang === 'es' ? '5 CAPÍTULOS EMAKI' : '5 EMAKI CHAPTERS'}</span>
        </div>
      </div>
    </div>
  );
};

export default JapaneseEmakimonoScroll;
