import React from 'react';
import { Languages } from 'lucide-react';

interface HeaderNavProps {
  lang: 'es' | 'en';
  onToggleLang: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ lang, onToggleLang }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none transition duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto rounded-full px-5 py-2.5 bg-neutral-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
        {/* Brand con Foto Circular Real de Luis Bermúdez */}
        <a
          href="#root"
          className="flex items-center gap-3 group"
          aria-label="Luis Bermúdez inicio"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/30 group-hover:border-[#C84B31] transition duration-300 shadow-md">
            <img
              src="/PERFIL.jpg"
              alt="Luis Bermúdez"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-200 hidden sm:inline-block font-sans">
            Luis Bermúdez
          </span>
        </a>

        {/* Links de navegación */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider text-neutral-300 font-medium">
          <a
            href="#manifiesto"
            className="hover:text-white transition hover:text-[#C84B31]"
          >
            {lang === 'es' ? 'Manifiesto' : 'Manifesto'}
          </a>
          <a
            href="#proyectos"
            className="hover:text-white transition hover:text-[#C84B31]"
          >
            {lang === 'es' ? 'Proyectos' : 'Works'}
          </a>
          <a
            href="#about"
            className="hover:text-white transition hover:text-[#C84B31]"
          >
            {lang === 'es' ? 'Sobre Mí' : 'About'}
          </a>
          <a
            href="#contacto"
            className="hover:text-white transition hover:text-[#C84B31]"
          >
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </a>
        </nav>

        {/* Acciones: Selector de Idioma & CTA */}
        <div className="flex items-center gap-3">
          {/* Selector de idioma ES / EN */}
          <button
            onClick={onToggleLang}
            title={lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition"
          >
            <Languages className="w-3.5 h-3.5 text-[#C84B31]" />
            <span className="font-semibold">{lang.toUpperCase()}</span>
          </button>

          {/* CTA directo */}
          <a
            href="#contacto"
            className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-[#C84B31] hover:text-white text-xs uppercase tracking-wider font-semibold transition duration-300 shadow-sm"
          >
            {lang === 'es' ? 'Hablemos' : "Let's Talk"}
          </a>
        </div>
      </div>
    </header>
  );
};
