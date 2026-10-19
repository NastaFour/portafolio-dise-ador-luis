import React from 'react';
import { Languages } from 'lucide-react';

interface HeaderNavProps {
  lang: 'es' | 'en';
  onToggleLang: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ lang, onToggleLang }) => {
  const navLinks = [
    { href: '#manifiesto', label: lang === 'es' ? 'Manifiesto' : 'Manifesto' },
    { href: '#proyectos', label: lang === 'es' ? 'Proyectos' : 'Works' },
    { href: '#about', label: lang === 'es' ? 'Sobre Mí' : 'About' },
    { href: '#contacto', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-2.5 sm:py-4 pointer-events-none transition duration-300">
      <div className="max-w-6xl mx-auto pointer-events-auto rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 bg-neutral-950/90 border border-white/15 backdrop-blur-xl shadow-2xl">
        {/* Fila Principal: Marca, Navegación Desktop y Acciones */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand con Foto Circular Real de Luis Bermúdez */}
          <a
            href="#root"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            aria-label="Luis Bermúdez inicio"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/30 group-hover:border-[#C84B31] transition duration-300 shadow-md shrink-0">
              <img
                src="/PERFIL.jpg"
                alt="Luis Bermúdez"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-neutral-100 font-sans truncate max-w-[120px] sm:max-w-none">
              Luis Bermúdez
            </span>
          </a>

          {/* Links de navegación en PC / Tablet */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider text-neutral-300 font-medium">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-[#C84B31] transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Acciones: Selector de Idioma & CTA (visibles tanto en PC como en celular) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Selector de idioma ES / EN */}
            <button
              type="button"
              onClick={onToggleLang}
              title={lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-[11px] sm:text-xs uppercase tracking-wider transition"
            >
              <Languages className="w-3.5 h-3.5 text-[#C84B31] shrink-0" />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>

            {/* CTA directo */}
            <a
              href="#contacto"
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black hover:bg-[#C84B31] hover:text-white text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition duration-300 shadow-sm whitespace-nowrap"
            >
              {lang === 'es' ? 'Hablemos' : "Let's Talk"}
            </a>
          </div>
        </div>

        {/* Barra de Botones de Navegación para Celular (Siempre visible en móvil) */}
        <nav
          aria-label="Navegación móvil"
          className="flex md:hidden items-center justify-between gap-1.5 pt-2 mt-2 border-t border-white/10"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-1 text-center py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-[#C84B31] active:bg-[#C84B31] border border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-200 hover:text-white transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
