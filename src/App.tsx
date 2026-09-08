import { useState } from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { HeroSection } from '@/components/ui/3d-hero-section-boxes';
import { PretextCurlingSection } from '@/components/PretextCurlingSection';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { type Project } from '@/data/portfolioData';

export function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#E8E4DC] font-sans selection:bg-[#C84B31] selection:text-white relative">
      {/* Navegación Flotante con Selector de Idioma */}
      <HeaderNav lang={lang} onToggleLang={toggleLang} />

      {/* Hero 3D con Spline Interactivo */}
      <main>
        <HeroSection lang={lang} />

        {/* Sección de Exclusión Tipográfica con Físicas Líquidas (Curling / Pretext) */}
        <PretextCurlingSection
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Vitrina 3D Marquee y Casos de Estudio Estilo NexStudio */}
        <ProjectShowcase
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Sobre Mí: Formación ISTER, Herramientas y Filosofía */}
        <AboutSection lang={lang} />

        {/* Contacto & Colaboración Directa */}
        <ContactSection lang={lang} />
      </main>

      {/* Modal de Detalle de Caso de Estudio */}
      <ProjectDetailModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
