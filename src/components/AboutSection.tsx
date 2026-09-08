import React from 'react';
import { BookOpen, Wrench, Film, Sparkles, Box, Layers, Award } from 'lucide-react';
import { CREATIVE_DISCIPLINES } from '@/data/portfolioData';

interface AboutSectionProps {
  lang: 'es' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const tools = [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'Cinema 4D',
    'Spline 3D',
    'zBrush',
    'Adobe InDesign',
    'IA Generativa (Leonardo / Kling / Firefly)',
  ];

  const getDisciplineIcon = (id: string) => {
    switch (id) {
      case 'animacion-2d':
        return <Film className="w-5 h-5 text-[#C84B31]" />;
      case 'animacion-3d':
        return <Box className="w-5 h-5 text-[#C84B31]" />;
      case 'diseno-editorial':
        return <BookOpen className="w-5 h-5 text-[#C84B31]" />;
      default:
        return <Layers className="w-5 h-5 text-[#C84B31]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141414] border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Fila Principal: Bio y Credenciales */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Columna Izquierda: Bio y Perfil */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C84B31] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'es' ? 'Sobre el Creador' : 'About the Creator'}
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Luis Miguel Bermúdez Garrido
            </h2>

            <p className="text-lg text-neutral-300 font-display italic">
              {lang === 'es'
                ? 'Diseñador Gráfico, Animador 2D/3D & Productor Audiovisual graduado del Instituto Tecnológico Universitario Rumiñahui (ISTER).'
                : 'Graphic Designer, 2D/3D Animator & Audiovisual Producer from Instituto Tecnológico Universitario Rumiñahui (ISTER).'}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              <p>
                {lang === 'es'
                  ? 'Mi práctica combina la animación 2D y 3D, el motion design cinematográfico, la investigación editorial histórica y la dirección de arte para identidades corporativas, campañas digitales y producciones audiovisuales.'
                  : 'My practice unites 2D and 3D animation, cinematic motion design, historical editorial research, and comprehensive art direction across corporate branding, digital campaigns, and audiovisual media.'}
              </p>
              <p>
                {lang === 'es'
                  ? 'Concibo cada pieza como un ejercicio de armonía entre la luz, el ritmo, el movimiento y la composición espacial. Empleo herramientas tridimensionales (Cinema 4D, Spline 3D, zBrush) y animación digital para dar vida a narrativas con espíritu y rigor estético.'
                  : 'I approach every assignment as a choreography of illumination, cadence, motion, and spatial composition. Utilizing Cinema 4D, Spline 3D, zBrush, and digital animation suites, I craft stories of character and disciplined elegance.'}
              </p>
            </div>

            {/* Credenciales */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-[#C84B31] text-xs font-semibold uppercase mb-1">
                  <Award className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Formación' : 'Education'}</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Tecnólogo Universitario en Diseño Gráfico y Producción Audiovisual (ISTER)
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-[#C84B31] text-xs font-semibold uppercase mb-1">
                  <Film className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Experiencia' : 'Experience'}</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Animación, Motion Graphics & Producción en CreativeIn y Sector Corporativo (Banco Pichincha, BGR)
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Stack de Herramientas y Pilares */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-md space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#C84B31]" />
              {lang === 'es' ? 'Herramientas & Software de Producción' : 'Production Software & Tools'}
            </h3>

            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-neutral-300 hover:border-[#C84B31]/50 hover:text-white transition duration-200"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                {lang === 'es' ? 'Pilares Creativos' : 'Creative Pillars'}
              </h4>
              <ul className="text-xs text-neutral-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
                  <span>{lang === 'es' ? 'Movimiento & Dinámica Espacial' : 'Motion & Spatial Dynamics'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
                  <span>{lang === 'es' ? 'Claridad, Ritmo y Orden Visual' : 'Clarity, Rhythm & Visual Order'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
                  <span>{lang === 'es' ? 'Estética Shibui y Principio Ma' : 'Shibui Restraint & Ma Spacing'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fila Secundaria: Cuadrícula de Disciplinas & Servicios (Con foco en Animación 2D y 3D) */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C84B31] uppercase">
                {lang === 'es' ? 'Servicios & Especialidades' : 'Services & Core Disciplines'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-1">
                {lang === 'es' ? 'Campos de Creación y Dirección' : 'Creative & Technical Domains'}
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              {lang === 'es'
                ? 'Integrando animación, volumetría y diseño editorial con estándares de alta fidelidad.'
                : 'Integrating animation, volumetric design, and editorial craftsmanship.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CREATIVE_DISCIPLINES.map((disc) => (
              <div
                key={disc.id}
                className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-neutral-950/70 hover:border-[#C84B31]/60 transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#C84B31]/60 transition">
                      {getDisciplineIcon(disc.id)}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {disc.id.includes('animacion') ? 'Motion & 3D' : 'Design & Identity'}
                    </span>
                  </div>

                  <h4 className="text-xl font-display font-bold text-white group-hover:text-[#C84B31] transition duration-200">
                    {disc.title[lang]}
                  </h4>

                  <p className="text-xs text-[#C84B31] font-mono mt-1 mb-3">
                    {disc.subtitle[lang]}
                  </p>

                  <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                    {disc.description[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                  {disc.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-neutral-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
