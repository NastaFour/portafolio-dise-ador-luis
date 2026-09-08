import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { PORTFOLIO_PROJECTS, type Project } from '@/data/portfolioData';

interface ProjectShowcaseProps {
  lang: 'es' | 'en';
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  lang,
  onSelectProject,
}) => {
  // Selección curada de 9 láminas de alto impacto (3 por columna) para rendimiento a 60 FPS estables
  const marqueeImages = [
    '/projects/raun/raun_page_01.jpg',
    '/projects/dolores/page_1.jpg',
    '/projects/legionfit/plate_mockup.webp',
    '/projects/ironwall/post_1_ironwall.png',
    '/projects/raun/raun_page_08.jpg',
    '/projects/legionfit/fire_mockup.webp',
    '/projects/dolores/page_3.jpg',
    '/projects/ironwall/slide2.jpg',
    '/projects/raun/raun_page_04.jpg',
  ];

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C84B31] uppercase mb-2 block">
              {lang === 'es' ? 'Selección de Trabajos' : 'Selected Works'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#E8E4DC]">
              {lang === 'es' ? 'Casos de Estudio & Proyectos' : 'Case Studies & Works'}
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-sans">
            {lang === 'es'
              ? 'Un recorrido por dirección editorial, rescate histórico, identidad visual y piezas audiovisuales.'
              : 'An exploration across editorial direction, cultural heritage, visual branding, and motion design.'}
          </p>
        </div>

        {/* 3D Marquee Isométrico */}
        <div className="mb-20">
          <ThreeDMarquee images={marqueeImages} />
        </div>

        {/* Lista de Proyectos Estilo NexStudio */}
        <div className="space-y-16">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="group relative rounded-2xl border border-white/10 bg-neutral-950/60 p-4 sm:p-8 lg:p-10 transition duration-500 hover:border-[#C84B31]/60 hover:bg-neutral-900/50 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Info del Proyecto */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 sm:space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                      <span>0{index + 1} / 0{PORTFOLIO_PROJECTS.length}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-[#C84B31] transition duration-300">
                      {project.title}
                    </h3>

                    <p className="text-sm font-display italic text-neutral-400 mt-1">
                      {project.subtitle}
                    </p>

                    <p className="text-sm text-neutral-300 font-sans mt-4 line-clamp-3 leading-relaxed">
                      {project.description[lang]}
                    </p>
                  </div>

                  {/* Scope tags */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 uppercase tracking-wider mb-2">
                      <Layers className="w-3 h-3 text-[#C84B31]" />
                      <span>{lang === 'es' ? 'Servicios' : 'Scope'}</span>
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

                  {/* Botón CTA */}
                  <div>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-xs uppercase tracking-wider font-medium hover:bg-[#C84B31] hover:border-[#C84B31] transition duration-300 shadow-md group/btn"
                    >
                      <span>{lang === 'es' ? 'Explorar Caso' : 'View Case Study'}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition duration-200" />
                    </button>
                  </div>
                </div>

                {/* Previsualización Visual de la Obra (Limpia, Sin barra superior, 100% visible) */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950/90 shadow-2xl cursor-pointer group/card hover:border-[#C84B31]/60 transition duration-500 relative min-h-[250px] sm:min-h-[400px] flex items-center justify-center p-3 sm:p-6"
                >
                  {/* Resplandor ambiental desenfocado que respeta la paleta de la obra */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110 pointer-events-none transition duration-700 group-hover/card:opacity-30 group-hover/card:scale-125"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                  {/* Imagen completa sin recortes: Revista RAUN muestra íntegramente su título superior */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="relative z-10 max-h-[250px] sm:max-h-[400px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition duration-500 group-hover/card:scale-[1.03] select-none"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Overlay interactivo en hover */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition duration-300 flex items-end justify-between p-6 pointer-events-none">
                    <span className="text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C84B31] animate-pulse" />
                      {lang === 'es' ? 'Clic para ver caso de estudio' : 'Click to inspect case study'}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      {project.category}
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
