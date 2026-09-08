import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Grid, Compass, Sparkles } from 'lucide-react';

interface CreativeDisciplinesAtelierProps {
  lang: 'es' | 'en';
}

type DisciplineId = 'animacion-2d' | 'animacion-3d' | 'diseno-editorial' | 'direccion-arte';

interface DisciplineData {
  id: DisciplineId;
  number: string;
  watermark: string;
  category: { es: string; en: string };
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  bulletPoints: { es: string[]; en: string[] };
  shibuiQuote: {
    title: { es: string; en: string };
    text: { es: string; en: string };
  };
  tools: string[];
}

const DISCIPLINES: DisciplineData[] = [
  {
    id: 'animacion-2d',
    number: '01',
    watermark: '2D',
    category: {
      es: 'MOTION DESIGN & CINEMÁTICA',
      en: 'MOTION DESIGN & CINEMATICS',
    },
    title: {
      es: 'Animación 2D & Motion Graphics',
      en: '2D Animation & Motion Graphics',
    },
    subtitle: {
      es: 'Cinemática, Ritmo Temporal & Tipografía en Movimiento',
      en: 'Cinematics, Temporal Rhythm & Kinetic Typography',
    },
    bulletPoints: {
      es: [
        'Curvas de velocidad de alta precisión (Easing & Bézier interpolation)',
        'Tipografía cinética con jerarquía visual y timing publicitario',
        'Composición multicapa y transiciones fluidas en After Effects',
        'Loops continuos y micro-animaciones dinámicas para redes y web',
        'Montaje rítmico y sincronización de audio en Adobe Premiere Pro',
      ],
      en: [
        'High-precision easing curves (Bézier velocity interpolation)',
        'Kinetic typography with deliberate visual hierarchy & commercial cadence',
        'Multi-layer compositing & seamless cinematic transitions in After Effects',
        'Seamless looping narratives and dynamic micro-animations for digital media',
        'Rhythmic editorial cutting & beat-matched audio sync in Premiere Pro',
      ],
    },
    shibuiQuote: {
      title: {
        es: 'El Ritmo — Coreografía del Tiempo',
        en: 'Rhythm — Choreography of Time',
      },
      text: {
        es: 'Animar no es simplemente mover elementos gráficos; es dotarlos de gravedad, peso y memoria. Cada fotograma cobra valor por la pausa y el silencio que lo precede.',
        en: 'To animate is not merely to displace shapes; it is to endow them with gravity, cadence, and restraint. Each frame earns its power from the silence that precedes it.',
      },
    },
    tools: ['After Effects', 'Premiere Pro', 'Kinetic Type', 'Loops Publicitarios', 'Sound Sync'],
  },
  {
    id: 'animacion-3d',
    number: '02',
    watermark: '3D',
    category: {
      es: 'GEOMETRÍA ESPACIAL & WEBGL',
      en: 'SPATIAL GEOMETRY & WEBGL',
    },
    title: {
      es: 'Animación & Modelado 3D',
      en: '3D Animation & Modeling',
    },
    subtitle: {
      es: 'Composición Tridimensional, Iluminación PBR & Tiempo Real',
      en: 'Tridimensional Composition, PBR Lighting & Real-time WebGL',
    },
    bulletPoints: {
      es: [
        'Modelado volumétrico poligonal y orgánico en Cinema 4D y zBrush',
        'Esquemas de iluminación cinematográfica, sombras duras y oclusión ambiental',
        'Experiencias WebGL e interacciones en tiempo real con Spline 3D',
        'Texturizado procedural, materiales reflectantes y refracciones',
        'Animación de cámaras con simulación de lentes anamórficos',
      ],
      en: [
        'Polygonal and organic volumetric modeling in Cinema 4D and zBrush',
        'Cinematic studio lighting schemes, hard shadows, and ambient occlusion',
        'Real-time WebGL integration and interactive viewport setups via Spline 3D',
        'Procedural shading, physically-based materials, and controlled refractions',
        'Camera path animation with anamorphic optical depth simulation',
      ],
    },
    shibuiQuote: {
      title: {
        es: 'La Volumetría — La Luz sobre la Materia',
        en: 'Volumetrics — Light upon Substance',
      },
      text: {
        es: 'La tercera dimensión en el diseño no busca el artificio recargado, sino la presencia tangible. El modelado esculpe la luz para que el espacio se sienta vivo en la pantalla.',
        en: 'The third dimension is never about gratuitous embellishment, but tangible presence. 3D modeling sculpts illumination so space feels authentically alive.',
      },
    },
    tools: ['Cinema 4D', 'Spline 3D', 'zBrush', 'Lighting & Shading', 'WebGL Interactivo'],
  },
  {
    id: 'diseno-editorial',
    number: '03',
    watermark: 'RAUN',
    category: {
      es: 'ARQUITECTURA TIPOGRÁFICA & SHIBUI',
      en: 'TYPOGRAPHIC ARCHITECTURE & SHIBUI',
    },
    title: {
      es: 'Diseño Editorial & Publicaciones',
      en: 'Editorial Design & Publications',
    },
    subtitle: {
      es: 'Retículas Suizas, Jerarquía Shibui & Tipografía de Autor',
      en: 'Swiss Grids, Shibui Restraint & Authorial Typography',
    },
    bulletPoints: {
      es: [
        'Desarrollo conceptual completo y redacción de contenidos filosóficos',
        'Maquetación de libros y revistas conceptuales de alta gama (Revista RAUN)',
        'Sistemas de retícula modular, márgenes armónicos y proporciones áureas',
        'Curaduría tipográfica, ajuste óptico de interlineado y drop-caps monumentales',
        'Publicaciones interactivas multimedia en formato EPUB y PDF interactivo',
      ],
      en: [
        'Full conceptual editorial architecture and philosophical essay writing',
        'High-end publication and conceptual magazine layout (RAUN Magazine)',
        'Modular Swiss grid systems, harmonic margins, and golden-ratio spreads',
        'Typographic curation, optical leading adjustments, and custom drop-caps',
        'Rich multimedia interactive digital books (EPUB / Interactive PDF)',
      ],
    },
    shibuiQuote: {
      title: {
        es: 'Shibui — La Elegancia Simple',
        en: 'Shibui — Understated Restraint',
      },
      text: {
        es: 'Belleza que no necesita adornos para impactar. Es un equilibrio riguroso entre estética y funcionalidad, donde cada línea, color o vacío tiene un propósito inexorable.',
        en: 'Beauty that demands no superficial ornament. A rigorous equilibrium between aesthetics and utility, where every stroke, ink weight, and void has an undeniable purpose.',
      },
    },
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'EPUB Interactivo', 'Tipografía Patrimonial', 'Retícula Suiza'],
  },
  {
    id: 'direccion-arte',
    number: '04',
    watermark: 'BRAND',
    category: {
      es: 'SISTEMAS DE IDENTIDAD & GEOMETRÍA',
      en: 'IDENTITY SYSTEMS & GEOMETRY',
    },
    title: {
      es: 'Dirección de Arte & Branding',
      en: 'Art Direction & Branding',
    },
    subtitle: {
      es: 'Identidades Corporativas Rigurosas & Universos de Marca',
      en: 'Rigorous Brand Identities & Cohesive Visual Universes',
    },
    bulletPoints: {
      es: [
        'Arquitectura integral de identidad de marca (IronWall, LegionFit)',
        'Manuales de marca exhaustivos con normativas de uso y proporciones',
        'Diseño de isotipos con geometría vectorial estricta y balance óptico',
        'Curaduría cromática estratégica (Pantone, CMYK, perfiles digitales)',
        'Dirección visual para aplicaciones físicas (papelería, merchandising y empaque)',
      ],
      en: [
        'Comprehensive corporate brand identity systems (IronWall, LegionFit)',
        'Exhaustive brand style guidelines detailing usage rules and proportions',
        'Emblem and logotype design anchored in strict vector geometric balance',
        'Strategic color orchestration across Pantone, print CMYK, and digital spaces',
        'Tangible brand craftsmanship across business stationery, gear, and packaging',
      ],
    },
    shibuiQuote: {
      title: {
        es: 'La Identidad — Síntesis de Carácter',
        en: 'Identity — Synthesis of Character',
      },
      text: {
        es: 'Una identidad perdurable no sucumbe a modas pasajeras. Nace de la coherencia matemática y de una voz visual tan firme que no necesita alzar la voz para ser recordada.',
        en: 'An enduring identity never succumbs to transient fads. It emerges from geometric clarity and a visual voice so resolute it need not shout to command presence.',
      },
    },
    tools: ['Manuales de Marca', 'Geometría Vectorial', 'Papelería Corporativa', 'Campañas 360°', 'Dirección de Arte'],
  },
];

// Instrumento 01: Kinetic Timeline & Keyframe Sequencer
function KineticTimelineInstrument({ lang }: { lang: 'es' | 'en' }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Interpolación de estiramiento cinético basado en la posición del playhead
  const scaleX = 1 + Math.sin((progress / 100) * Math.PI * 4) * 0.15;
  const scaleY = 1 - Math.sin((progress / 100) * Math.PI * 4) * 0.1;
  const opacity = 0.8 + Math.cos((progress / 100) * Math.PI * 2) * 0.2;

  const currentSeconds = ((progress / 100) * 3).toFixed(2);

  return (
    <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 sm:p-6 font-mono text-xs select-none relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
      {/* Barra superior estilo monitor de After Effects */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C84B31] animate-pulse" />
          <span className="text-[#E8E4DC] font-semibold tracking-wider">
            {lang === 'es' ? 'MONITOR DE TIEMPO' : 'MOTION PLAYHEAD'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
          <span>00:00:0{currentSeconds}</span>
          <span className="text-white/40">|</span>
          <span className="text-[#C84B31]">60 FPS</span>
        </div>
      </div>

      {/* Escenario de Animación Tipográfica Cinética */}
      <div className="my-6 py-6 flex flex-col items-center justify-center relative bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden">
        <div
          style={{
            transform: `scale(${scaleX}, ${scaleY})`,
            opacity,
            transition: 'transform 0.05s ease-out',
          }}
          className="text-center font-display"
        >
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-widest text-[#E8E4DC] uppercase">
            R I T M O
          </span>
          <div className="text-[10px] tracking-[0.3em] text-[#C84B31] font-mono mt-1">
            EASING // CUBIC-BÉZIER(0.16, 1, 0.3, 1)
          </div>
        </div>

        {/* Indicador de curvas bézier en segundo plano */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" preserveAspectRatio="none">
          <path
            d="M 0,80 Q 80,10 160,80 T 320,80 T 480,80"
            fill="none"
            stroke="#C84B31"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Pistas de Secuenciador de Keyframes */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[10px] text-neutral-400">
          <span className="text-[#C84B31] font-semibold">TRACK 01 // KINETIC TYPE</span>
          <span>KEYFRAMES: 04</span>
        </div>

        {/* Línea de tiempo con Playhead deslizante */}
        <div className="relative h-6 bg-neutral-900/80 rounded border border-white/10 px-2 flex items-center">
          {/* Marcas de tiempo */}
          <div className="absolute inset-0 flex justify-between px-3 items-center opacity-20 pointer-events-none">
            <span className="w-px h-3 bg-white" />
            <span className="w-px h-2 bg-white" />
            <span className="w-px h-2 bg-white" />
            <span className="w-px h-3 bg-white" />
            <span className="w-px h-2 bg-white" />
            <span className="w-px h-2 bg-white" />
            <span className="w-px h-3 bg-white" />
          </div>

          {/* Rombos de Keyframe de After Effects */}
          <div className="absolute left-[15%] w-2.5 h-2.5 bg-[#C84B31] rotate-45 transform -translate-x-1/2" />
          <div className="absolute left-[45%] w-2.5 h-2.5 bg-[#C84B31] rotate-45 transform -translate-x-1/2" />
          <div className="absolute left-[80%] w-2.5 h-2.5 bg-[#C84B31] rotate-45 transform -translate-x-1/2" />

          {/* Cabezal de reproducción (Playhead) */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_#ffffff] z-10 transition-all duration-75"
            style={{ left: `${progress}%` }}
          >
            <div className="w-2 h-2 bg-white transform rotate-45 -translate-x-0.75 -translate-y-1" />
          </div>
        </div>

        {/* Controles de reproducción interactiva */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#C84B31] transition text-[11px]"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#C84B31]" />}
            <span>{isPlaying ? (lang === 'es' ? 'Pausar' : 'Pause') : (lang === 'es' ? 'Reproducir' : 'Play')}</span>
          </button>

          <span className="text-[10px] text-neutral-500">
            {lang === 'es' ? 'Interactivo 60fps' : 'Interactive 60fps'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Instrumento 02: Interactive 3D Wireframe Viewport
function Interactive3DViewport({ lang }: { lang: 'es' | 'en' }) {
  const [rotation, setRotation] = useState({ x: 20, y: 35 });
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoRotate) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.8) % 360,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsAutoRotate(false);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: Math.max(-60, Math.min(60, -y * 0.3)),
      y: Math.max(-180, Math.min(180, x * 0.4)),
    });
  };

  const handleMouseLeave = () => {
    setIsAutoRotate(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 sm:p-6 font-mono text-xs select-none relative overflow-hidden flex flex-col justify-between h-full min-h-[300px] cursor-grab active:cursor-grabbing"
    >
      {/* Cabecera del visor 3D */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C84B31]" />
          <span className="text-[#E8E4DC] font-semibold tracking-wider">
            {lang === 'es' ? 'VIEWPORT 3D PERSPECTIVA' : '3D PERSPECTIVE VIEWPORT'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <span>X: {rotation.x.toFixed(0)}°</span>
          <span>Y: {rotation.y.toFixed(0)}°</span>
          <span className="text-[#C84B31]">PBR WIRE</span>
        </div>
      </div>

      {/* Escenario de render 3D interactivo con CSS 3D Transforms */}
      <div className="my-6 py-12 flex items-center justify-center relative perspective-[800px]">
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isAutoRotate ? 'none' : 'transform 0.1s ease-out',
          }}
          className="relative w-24 h-24 sm:w-28 sm:h-28"
        >
          {/* Caras del cubo volumétrico con estética wireframe */}
          <div className="absolute inset-0 border border-[#C84B31]/80 bg-[#C84B31]/5 transform translate-z-[48px] sm:translate-z-[56px] flex items-center justify-center">
            <span className="text-[9px] text-[#C84B31] font-mono">FRONT</span>
          </div>
          <div className="absolute inset-0 border border-white/30 bg-white/[0.02] transform -translate-z-[48px] sm:-translate-z-[56px] rotate-y-180 flex items-center justify-center">
            <span className="text-[9px] text-neutral-400 font-mono">BACK</span>
          </div>
          <div className="absolute inset-0 border border-[#C84B31]/40 bg-[#C84B31]/5 transform rotate-y-90 translate-z-[48px] sm:translate-z-[56px] flex items-center justify-center">
            <span className="text-[9px] text-[#C84B31] font-mono">RIGHT</span>
          </div>
          <div className="absolute inset-0 border border-white/20 bg-white/[0.02] transform -rotate-y-90 translate-z-[48px] sm:translate-z-[56px] flex items-center justify-center">
            <span className="text-[9px] text-neutral-400 font-mono">LEFT</span>
          </div>
          <div className="absolute inset-0 border border-white/40 bg-white/[0.03] transform rotate-x-90 translate-z-[48px] sm:translate-z-[56px] flex items-center justify-center">
            <span className="text-[9px] text-white/50 font-mono">TOP</span>
          </div>
          <div className="absolute inset-0 border border-[#C84B31]/30 bg-[#C84B31]/5 transform -rotate-x-90 translate-z-[48px] sm:translate-z-[56px] flex items-center justify-center">
            <span className="text-[9px] text-[#C84B31] font-mono">BASE</span>
          </div>

          {/* Vértices destacados en las esquinas */}
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#C84B31] shadow-[0_0_6px_#C84B31]" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[#C84B31] shadow-[0_0_6px_#C84B31]" />
        </div>

        {/* Ejes cartesianos en la esquina inferior izquierda */}
        <div className="absolute bottom-2 left-2 text-[9px] text-neutral-500 font-mono space-y-0.5">
          <div className="text-red-400">■ EJE X [ROJO]</div>
          <div className="text-emerald-400">■ EJE Y [VERDE]</div>
          <div className="text-blue-400">■ EJE Z [AZUL]</div>
        </div>
      </div>

      {/* Barra de pie con interacción */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-neutral-400">
        <span>{lang === 'es' ? 'Arrastra para rotar la cámara' : 'Hover / drag to rotate camera'}</span>
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className="flex items-center gap-1 text-[#C84B31] hover:underline"
        >
          <RotateCw className="w-3 h-3" />
          <span>{isAutoRotate ? (lang === 'es' ? 'Órbita auto' : 'Auto orbit') : (lang === 'es' ? 'Manual' : 'Manual')}</span>
        </button>
      </div>
    </div>
  );
}

// Instrumento 03: Swiss Grid & Typographic Specimen
function SwissGridSpecimen({ lang }: { lang: 'es' | 'en' }) {
  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 sm:p-6 font-mono text-xs select-none relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
      {/* Cabecera del espécimen editorial */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C84B31]" />
          <span className="text-[#E8E4DC] font-semibold tracking-wider">
            {lang === 'es' ? 'ESPÉCIMEN EDITORIAL SUIZO' : 'SWISS EDITORIAL SPECIMEN'}
          </span>
        </div>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#C84B31] transition text-[10px]"
        >
          <Grid className="w-3 h-3 text-[#C84B31]" />
          <span>{showGrid ? (lang === 'es' ? 'Retícula: ON' : 'Grid: ON') : (lang === 'es' ? 'Retícula: OFF' : 'Grid: OFF')}</span>
        </button>
      </div>

      {/* Maqueta Editorial con Drop-Cap Monumental 'R' (Estilo Revista RAUN) */}
      <div className="my-4 p-5 sm:p-6 bg-[#161616] border border-white/10 rounded-lg relative overflow-hidden font-serif">
        {/* Retícula Suiza superpuesta en líneas tenues */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 gap-2 p-4 pointer-events-none opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-full border-x border-[#C84B31] bg-[#C84B31]/5" />
            ))}
          </div>
        )}

        <div className="relative z-10 space-y-3">
          <div className="flex items-start gap-3">
            {/* Letra Capitular (Drop-Cap) estilo RAUN */}
            <span className="font-display text-5xl sm:text-6xl font-bold leading-none text-[#C84B31] select-none">
              R
            </span>
            <div className="space-y-1">
              <div className="text-[10px] font-mono tracking-widest text-[#C84B31] uppercase">
                {lang === 'es' ? 'REVISTA RAUN // N° 01' : 'RAUN JOURNAL // ISSUE 01'}
              </div>
              <h5 className="font-display font-bold text-base sm:text-lg text-white leading-tight">
                {lang === 'es' ? 'El Mito Nórdico y el Acto Creativo' : 'Norse Mythology & The Creative Act'}
              </h5>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans font-normal opacity-90 line-clamp-3">
            {lang === 'es'
              ? 'La prueba como experiencia necesaria para crecer. Cada error revela una enseñanza; el diseñador forja sus ideas tal como los antiguos artesanos templaban el hierro con fuego y golpes medidos.'
              : 'Trial as an indispensable crucible for mastery. Each flaw reveals guidance; the designer tempers form just as ancient metalsmiths refined iron with fire and deliberate hammer strikes.'}
          </p>
        </div>

        {/* Marcadores de cota de proporción áurea */}
        {showGrid && (
          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-[#C84B31] opacity-75">
            MODULAR RATIO: 1:1.618 (φ)
          </div>
        )}
      </div>

      {/* Especificaciones técnicas de la maqueta */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[10px] text-neutral-400">
        <span>TIPOGRAFÍA: CORMORANT GARAMOND & GEIST</span>
        <span className="text-[#C84B31]">CANON DE VAN DE GRAAF</span>
      </div>
    </div>
  );
}

// Instrumento 04: Vector Geometry & Brand Compass
function VectorGeometryInstrument({ lang }: { lang: 'es' | 'en' }) {
  const [showGuides, setShowGuides] = useState(true);

  return (
    <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 sm:p-6 font-mono text-xs select-none relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
      {/* Cabecera del sistema vectorial */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C84B31]" />
          <span className="text-[#E8E4DC] font-semibold tracking-wider">
            {lang === 'es' ? 'GEOMETRÍA DE MARCA' : 'BRAND VECTOR GEOMETRY'}
          </span>
        </div>
        <button
          onClick={() => setShowGuides(!showGuides)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#C84B31] transition text-[10px]"
        >
          <Compass className="w-3 h-3 text-[#C84B31]" />
          <span>{showGuides ? (lang === 'es' ? 'Guías: ON' : 'Guides: ON') : (lang === 'es' ? 'Guías: OFF' : 'Guides: OFF')}</span>
        </button>
      </div>

      {/* Isotipo geométrico con líneas vectoriales de construcción */}
      <div className="my-4 py-6 flex items-center justify-center relative bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden">
        <svg className="w-36 h-36 sm:w-44 sm:h-44" viewBox="0 0 200 200">
          {/* Círculos de construcción áurea y tangentes */}
          {showGuides && (
            <g stroke="#C84B31" strokeWidth="0.75" strokeDasharray="3 3" fill="none" opacity="0.45">
              <circle cx="100" cy="100" r="80" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="25" />
              {/* Diagonales a 45 grados */}
              <line x1="20" y1="20" x2="180" y2="180" />
              <line x1="20" y1="180" x2="180" y2="20" />
              <line x1="100" y1="10" x2="100" y2="190" />
              <line x1="10" y1="100" x2="190" y2="100" />
            </g>
          )}

          {/* Isotipo vectorial sólido de precisión (Marca emblemática de Luis) */}
          <polygon
            points="100,30 160,70 160,130 100,170 40,130 40,70"
            fill="none"
            stroke="#E8E4DC"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon
            points="100,55 140,80 140,120 100,145 60,120 60,80"
            fill="#C84B31"
            fillOpacity="0.2"
            stroke="#C84B31"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="100" r="6" fill="#C84B31" />
        </svg>

        {/* Punto focal de equilibrio óptico */}
        {showGuides && (
          <div className="absolute top-2 right-2 text-[9px] font-mono text-[#C84B31]">
            OP_CENTER: (100, 100)
          </div>
        )}
      </div>

      {/* Muestras cromáticas de la marca */}
      <div className="space-y-2 pt-2 border-t border-white/10">
        <div className="text-[10px] text-neutral-400 font-semibold">
          {lang === 'es' ? 'SISTEMA CROMÁTICO DE IDENTIDAD' : 'CHROMATIC IDENTITY MATRIX'}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="space-y-1">
            <div className="h-4 rounded bg-[#C84B31] border border-white/10" />
            <span className="text-[9px] text-neutral-400">#C84B31</span>
          </div>
          <div className="space-y-1">
            <div className="h-4 rounded bg-[#141414] border border-white/20" />
            <span className="text-[9px] text-neutral-400">#141414</span>
          </div>
          <div className="space-y-1">
            <div className="h-4 rounded bg-[#E8E4DC] border border-white/10" />
            <span className="text-[9px] text-neutral-400">#E8E4DC</span>
          </div>
          <div className="space-y-1">
            <div className="h-4 rounded bg-[#3A506B] border border-white/10" />
            <span className="text-[9px] text-neutral-400">#3A506B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CreativeDisciplinesAtelier: React.FC<CreativeDisciplinesAtelierProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<DisciplineId>('animacion-2d');

  const currentDiscipline = DISCIPLINES.find((d) => d.id === activeTab) || DISCIPLINES[0];

  const renderInstrument = (id: DisciplineId) => {
    switch (id) {
      case 'animacion-2d':
        return <KineticTimelineInstrument lang={lang} />;
      case 'animacion-3d':
        return <Interactive3DViewport lang={lang} />;
      case 'diseno-editorial':
        return <SwissGridSpecimen lang={lang} />;
      case 'direccion-arte':
        return <VectorGeometryInstrument lang={lang} />;
    }
  };

  return (
    <div className="space-y-10">
      {/* Cabecera Editorial y Subtítulo de Autor */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#C84B31] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {lang === 'es' ? 'Atelier de Creación & Habilidades' : 'Creative Atelier & Core Disciplines'}
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mt-1">
            {lang === 'es' ? 'Campos de Creación y Dirección' : 'Domains of Creation & Direction'}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-sans leading-relaxed">
          {lang === 'es'
            ? 'Una práctica multidisciplinaria donde la animación 2D y 3D convergen con el rigor editorial y la arquitectura de marca.'
            : 'A multidisciplinary craft uniting 2D/3D kinetic animation with Swiss editorial rigor and brand architecture.'}
        </p>
      </div>

      {/* Navegador de Pestañas Arquitectónicas (01, 02, 03, 04) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {DISCIPLINES.map((disc) => {
          const isActive = disc.id === activeTab;
          return (
            <button
              key={disc.id}
              onClick={() => setActiveTab(disc.id)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition duration-300 relative group overflow-hidden ${
                isActive
                  ? 'border-[#C84B31] bg-white/[0.04] shadow-[0_0_25px_rgba(200,75,49,0.15)]'
                  : 'border-white/10 bg-neutral-950/60 hover:border-white/25 hover:bg-white/[0.02]'
              }`}
            >
              {/* Barra superior de acento activo */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C84B31]" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#C84B31]' : 'text-neutral-500'}`}>
                  {disc.number} //
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  {disc.id.includes('animacion') ? 'MOTION' : 'DESIGN'}
                </span>
              </div>

              <div className={`text-xs sm:text-sm font-display font-semibold transition ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                {disc.title[lang]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Panel Central del Atelier: Asimetría Editorial + Instrumento Visual Interactivo */}
      <div className="relative rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 overflow-hidden">
        {/* Marca de agua tipográfica monumental en el fondo (como la 'R' de la imagen 2) */}
        <div className="absolute -top-12 -right-8 text-8xl sm:text-9xl lg:text-[14rem] font-display font-extrabold text-white/[0.03] select-none pointer-events-none leading-none">
          {currentDiscipline.watermark}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* Columna Izquierda: Información de Autor, Lista de Guiones Rojos y Caja Shibui */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-[#C84B31] uppercase tracking-widest font-semibold">
                {currentDiscipline.category[lang]}
              </span>

              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mt-1 leading-tight">
                {currentDiscipline.title[lang]}
              </h4>

              <p className="text-xs sm:text-sm text-[#C84B31] font-mono mt-1">
                {currentDiscipline.subtitle[lang]}
              </p>
            </div>

            {/* Lista con Guiones Rojos auténticos (fiel al estilo original de la Imagen 2) */}
            <div className="space-y-2.5 pt-2">
              <h5 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                {lang === 'es' ? 'Alcance & Capacidades Técnicas' : 'Scope & Technical Capabilities'}
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {currentDiscipline.bulletPoints[lang].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Caja de Filosofía Shibui con Barra Roja Vertical (fiel a la Imagen 2) */}
            <div className="border-l-2 border-[#C84B31] bg-white/[0.02] p-4 sm:p-5 rounded-r-xl space-y-1.5">
              <h6 className="text-xs sm:text-sm font-display font-bold text-white">
                {currentDiscipline.shibuiQuote.title[lang]}
              </h6>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed italic">
                {currentDiscipline.shibuiQuote.text[lang]}
              </p>
            </div>

            {/* Herramientas de Producción como Placas Técnicas */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                {lang === 'es' ? 'SUITE DE PRODUCCIÓN' : 'PRODUCTION SUITE'}
              </span>
              <div className="flex flex-wrap gap-2">
                {currentDiscipline.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Instrumento Visual Interactivo en Tiempo Real */}
          <div className="lg:col-span-5 h-full">
            {renderInstrument(currentDiscipline.id)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeDisciplinesAtelier;
