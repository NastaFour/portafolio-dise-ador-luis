import React, { useEffect, useState } from 'react';
import { X, Sparkles, Calendar, Layers, Maximize2 } from 'lucide-react';
import { type Project } from '@/data/portfolioData';

interface ProjectDetailModalProps {
  project: Project | null;
  lang: 'es' | 'en';
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  lang,
  onClose,
}) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) {
          setZoomedImage(null);
        } else {
          onClose();
        }
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, zoomedImage]);

  if (!project) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 text-[#E8E4DC]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de Cierre */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header del Caso */}
          <div className="mb-8 pr-12">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C84B31] font-semibold mb-2">
              <span>{project.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mt-2 font-display italic">
              {project.subtitle}
            </p>
          </div>

          {/* Imagen Principal Completa (Sin Recorte, 100% Legible) */}
          <div
            onClick={() => setZoomedImage(project.thumbnail)}
            className="group relative w-full flex items-center justify-center rounded-xl overflow-hidden border border-white/10 mb-8 bg-neutral-950/90 p-4 sm:p-6 cursor-zoom-in shadow-2xl transition hover:border-[#C84B31]/60"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 text-xs text-white backdrop-blur-md opacity-80 group-hover:opacity-100 transition flex items-center gap-1.5 pointer-events-none">
              <Maximize2 className="w-3.5 h-3.5 text-[#C84B31]" />
              <span>{lang === 'es' ? 'Clic para ver en HD' : 'Click to zoom HD'}</span>
            </div>
          </div>

          {/* Descripción y Scope */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C84B31]" />
                {lang === 'es' ? 'Concepto & Narrativa' : 'Concept & Narrative'}
              </h3>
              <p className="text-neutral-300 leading-relaxed font-sans text-sm sm:text-base">
                {project.description[lang]}
              </p>

              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {lang === 'es' ? 'Aspectos Clave Desarrollados' : 'Key Elements Executed'}
                </h4>
                <ul className="space-y-1.5 text-sm text-neutral-300">
                  {project.details[lang].map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C84B31] font-bold">―</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-wider text-neutral-300 uppercase mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C84B31]" />
                {lang === 'es' ? 'Alcance / Servicios' : 'Scope / Services'}
              </h3>
              <ul className="space-y-2">
                {project.scope.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-neutral-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Galería de Piezas Adicionales (Completas y sin recorte) */}
          {project.images.length > 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {lang === 'es' ? 'Piezas & Aplicaciones' : 'Pieces & Applications'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setZoomedImage(img)}
                    className="group relative flex items-center justify-center p-3 rounded-xl border border-white/10 bg-neutral-950/80 min-h-[220px] max-h-[380px] overflow-hidden cursor-zoom-in hover:border-[#C84B31]/60 transition duration-300 shadow-md"
                  >
                    <img
                      src={img}
                      alt={`${project.title} detalle ${idx + 1}`}
                      className="max-h-[340px] w-auto max-w-full object-contain rounded transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/75 border border-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C84B31]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Zoom HD a Pantalla Completa */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-200 border border-white/20 shadow-2xl z-20 cursor-pointer"
            aria-label="Cerrar vista grande"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-h-[92vh] max-w-[92vw] flex items-center justify-center pointer-events-auto">
            <img
              src={zoomedImage}
              alt="Vista ampliada HD"
              className="max-h-[92vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};
