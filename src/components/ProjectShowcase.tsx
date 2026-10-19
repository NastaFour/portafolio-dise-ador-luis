import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  CREATIVE_DISCIPLINES,
  type Project,
} from '@/data/portfolioData';
import { ProjectAuthorObjectStage } from '@/components/ui/ProjectAuthorObjectStage';
import {
  KineticText,
  EndorserCredibilityStrip,
  EditorialMotionGraphicBadge,
} from '@/components/ui/KineticMotion2D';

interface ProjectShowcaseProps {
  lang: 'es' | 'en';
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  lang,
  onSelectProject,
}) => {
  const badgeVariants: Array<'bezier' | 'waveform' | 'grid' | 'seal'> = [
    'bezier',
    'waveform',
    'grid',
    'seal',
  ];

  return (
    <section id="proyectos" className="bg-[#111111]">
      {/* Cinta de Avales Reales (Kriss Ecuador, Minerva, ISTER) */}
      <EndorserCredibilityStrip lang={lang} />

      <div className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        {/* Bloque de Áreas de Especialidad (Pág. 3 de portafolio_trabajo_luis.pdf) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 bg-[#171717] border border-white/10 p-6 sm:p-8 rounded-tl-none rounded-br-none rounded-tr-[48px] rounded-bl-[48px] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#C84B31] font-semibold block">
                {lang === 'es' ? 'ESTRUCTURA · LUZ · RITMO · COLOR' : 'STRUCTURE · LIGHT · RHYTHM · COLOR'}
              </span>
              <KineticText
                as="h2"
                text={lang === 'es' ? 'ÁREAS DE ESPECIALIDAD' : 'AREAS OF SPECIALTY'}
                className="text-3xl sm:text-4xl font-display font-bold text-[#E8E4DC] tracking-tight"
              />
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-l-2 border-[#C84B31] pl-4">
              {lang === 'es'
                ? 'Para mí, el diseño y lo audiovisual son formas de ordenar el mundo visual. Trabajo desde la estructura: luz, ritmo, color y composición, perfeccionando cada proceso sin perder la esencia humana del trabajo creativo.'
                : 'To me, design and audiovisual craft are ways of ordering the visual world. I work from structure: light, rhythm, color, and composition, refining every process while preserving the human essence of creative work.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10">
                After Effects
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10">
                Premiere Pro
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10">
                Illustrator
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10">
                InDesign
              </span>
              <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10">
                Photoshop
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CREATIVE_DISCIPLINES.map((disc, idx) => (
              <div
                key={disc.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#161616] border border-white/10 hover:border-[#C84B31]/50 transition duration-300 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#E8E4DC]">
                      {disc.title[lang]}
                    </h3>
                    <EditorialMotionGraphicBadge
                      variant={badgeVariants[idx % badgeVariants.length]}
                      accentColor="#C84B31"
                    />
                  </div>
                  <p className="text-xs font-display italic text-[#C84B31]">
                    {disc.subtitle[lang]}
                  </p>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-1">
                    {disc.description[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {disc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cabecera de Casos de Estudio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C84B31] uppercase mb-2 block">
              {lang === 'es' ? 'OBRAS SELECCIONADAS & ARCHIVO' : 'SELECTED WORKS & ARCHIVE'}
            </span>
            <KineticText
              as="h2"
              text={lang === 'es' ? 'Casos de Estudio & Proyectos' : 'Case Studies & Works'}
              className="text-3xl sm:text-5xl font-display font-bold text-[#E8E4DC]"
            />
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-sans">
            {lang === 'es'
              ? 'Cada pieza responde al movimiento del cursor o al tacto. Voltea o explora cada objeto para ver sus detalles de edición e identidad.'
              : 'Each piece responds to pointer or touch. Flip or inspect each object to explore its editorial and brand details.'}
          </p>
        </div>

        {/* Lista de Proyectos con Escenario Interactivo + Láminas Reales */}
        <div className="space-y-16">
          {PORTFOLIO_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-tr-[44px] rounded-bl-[44px] border border-white/10 bg-neutral-950/75 p-5 sm:p-8 lg:p-10 transition duration-500 hover:border-[#C84B31]/60 hover:bg-neutral-900/50 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Info del Proyecto */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 sm:space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                      <span
                        className="uppercase tracking-wider font-semibold"
                        style={{ color: project.color }}
                      >
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-[#C84B31] transition duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm font-display italic text-neutral-400 mt-1">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-neutral-300 font-sans mt-4 leading-relaxed">
                      {project.description[lang]}
                    </p>
                  </div>

                  {/* Scope tags */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-2">
                      <Layers className="w-3 h-3 text-[#C84B31]" />
                      <span>
                        {lang === 'es'
                          ? 'Lo que trabajé en este proyecto'
                          : 'Project Scope & Craft'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.scope.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mini tira de láminas reales del proyecto */}
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1">
                    {project.images.slice(0, 4).map((img, i) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-white/15 hover:border-[#C84B31] shrink-0 transition"
                        title={`${project.title} — ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Botón CTA */}
                  <div>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-xs uppercase tracking-wider font-medium hover:bg-[#C84B31] hover:border-[#C84B31] transition duration-300 shadow-md group/btn"
                    >
                      <span>{lang === 'es' ? 'Explorar Caso Completo' : 'Explore Full Case Study'}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition duration-200" />
                    </button>
                  </div>
                </div>

                {/* Escenario Interactivo del Objeto de Autor */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="lg:col-span-7 rounded-tr-[36px] rounded-bl-[36px] overflow-hidden border border-white/10 bg-neutral-950/95 shadow-2xl cursor-pointer group/card hover:border-[#C84B31]/60 transition duration-500 relative min-h-[290px] sm:min-h-[380px] flex flex-col justify-between"
                >
                  {/* Resplandor ambiental desenfocado que respeta la paleta de la obra */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-15 blur-3xl scale-110 pointer-events-none transition duration-700 group-hover/card:opacity-25"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                  />

                  <ProjectAuthorObjectStage project={project} lang={lang} />

                  {/* Barra inferior interactiva */}
                  <div className="relative z-20 bg-black/75 border-t border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      {lang === 'es'
                        ? 'Mueve para inspeccionar · Clic para abrir pliegos'
                        : 'Move to inspect · Click to open plates'}
                    </span>
                    <span className="text-[#C84B31] font-semibold">
                      {project.images.length} {lang === 'es' ? 'LÁMINAS' : 'PLATES'} ↗
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
