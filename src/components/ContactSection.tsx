import React from 'react';
import { Mail, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  lang: 'es' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  return (
    <footer id="contacto" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] text-[#E8E4DC] border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C84B31] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {lang === 'es' ? 'Contacto & Colaboración' : 'Get in Touch'}
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-tight max-w-3xl">
            {lang === 'es'
              ? '¿Tienes una idea que merece trascender?'
              : 'Have a concept that deserves resonance?'}
          </h2>

          <p className="text-base sm:text-xl text-neutral-400 mt-6 max-w-2xl font-sans leading-relaxed">
            {lang === 'es'
              ? 'Trabajo junto a marcas, directores creativos y equipos para crear piezas editoriales, identidades visuales y producciones audiovisuales con rigor estético y narrativa de autor.'
              : 'I collaborate with brands, creative directors, and teams to build editorial works, visual identities, and audiovisual narratives anchored in discipline and substance.'}
          </p>
        </div>

        {/* Canales de Contacto Directos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Email */}
          <a
            href="mailto:luismiguelbermudezgarrido6@gmail.com"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C84B31] transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#C84B31]/20 border border-[#C84B31]/40 flex items-center justify-center text-[#C84B31] mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                Email
              </span>
              <span className="text-sm sm:text-base font-semibold text-white break-all">
                luismiguelbermudezgarrido6@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#C84B31] mt-4 font-medium">
              <span>{lang === 'es' ? 'Enviar correo' : 'Send message'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </a>

          {/* Teléfono / WhatsApp */}
          <a
            href="https://wa.me/593962548594"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C84B31] transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                WhatsApp / Tel
              </span>
              <span className="text-base font-semibold text-white">
                +593 96 254 8594
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-4 font-medium">
              <span>{lang === 'es' ? 'Conversar por chat' : 'Direct message'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </a>

          {/* Instagram Oficial */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C84B31] transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                Instagram
              </span>
              <span className="text-base font-semibold text-white">
                @luisbermudez.design
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-rose-400 mt-4 font-medium">
              <span>{lang === 'es' ? 'Ver proyectos en vivo' : 'View live feed'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </div>
          </a>
        </div>

        {/* Barra de Cierre / Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Luis Bermúdez. Diseño Gráfico y Producción Audiovisual.</p>
          <div className="flex items-center gap-6">
            <a href="#root" className="hover:text-neutral-300 transition">
              {lang === 'es' ? 'Volver al inicio ↑' : 'Back to top ↑'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
