import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  lang: 'es' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  return (
    <footer id="contacto" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] text-[#E8E4DC] border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Marca de agua monumental de fondo (estilo letra 'R' de la imagen 3 de referencia) */}
        <div className="absolute -top-16 -right-12 text-[14rem] sm:text-[20rem] font-display font-extrabold text-white/[0.02] select-none pointer-events-none leading-none z-0">
          C
        </div>

        {/* Sección Editorial de Contacto (Estructura de la Imagen 3) */}
        <div className="relative z-10 space-y-12">
          {/* Encabezado Editorial */}
          <div>
            <span className="text-xs font-mono text-[#C84B31] uppercase tracking-widest font-semibold block mb-2">
              {lang === 'es' ? '[ 03 // DIÁLOGO & COLABORACIÓN ]' : '[ 03 // DIALOGUE & COLLABORATION ]'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight max-w-3xl">
              {lang === 'es'
                ? '¿Tienes una idea que merece trascender?'
                : 'Have a concept that deserves resonance?'}
            </h2>
            <p className="text-base sm:text-xl text-neutral-400 font-display italic mt-2 max-w-2xl">
              {lang === 'es'
                ? 'Trabajo junto a marcas, directores creativos y equipos para dar forma a obras con espíritu, rigor y permanencia.'
                : 'Collaborating with brands, creative directors, and studios to sculpt works of character, discipline, and endurance.'}
            </p>
          </div>

          {/* Composición Asimétrica Estilo Imagen 3: Lista de Guiones Rojos + Canales en Ledger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Columna Izquierda (5 columnas): Lista de Guiones Rojos con Modelos de Trabajo */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold pb-2 border-b border-white/10">
                {lang === 'es' ? 'Modalidades & Áreas de Intervención' : 'Engagement & Intervention Domains'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'After Effects & Motion Design:' : 'After Effects & Motion Design:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Motion graphics publicitarios, kinetic typography e intros cinemáticas (producciones para Kriss Ecuador, Minerva y más).'
                      : 'Commercial motion graphics, kinetic typography, and cinematic intros (productions for Kriss Ecuador, Minerva, and beyond).'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Dirección de Arte & Marca:' : 'Art Direction & Branding:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Sistemas de identidad visual rigurosos, geometría vectorial y manuales de normas.'
                      : 'Rigorous visual identity systems, vector geometry, and comprehensive brand manuals.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Diseño Editorial Shibui:' : 'Shibui Editorial Design:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Maquetación de libros de autor, revistas conceptuales y publicaciones interactivas.'
                      : 'High-end book design, conceptual journals, and interactive digital editions.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Producción Audiovisual:' : 'Audiovisual Production:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Dirección de fotografía, edición de video y sincronización sonora precisa.'
                      : 'Cinematography direction, precise video editing, and beat-matched audio sync.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Consultoría Creativa:' : 'Creative Consultation:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Acompañamiento conceptual desde la concepción del mito hasta el lanzamiento.'
                      : 'Conceptual guidance from narrative worldbuilding to final production release.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna Derecha (7 columnas): Caja Shibui + Canales de Contacto en Ledger Editorial */}
            <div className="lg:col-span-7 space-y-6">
              {/* Caja de Filosofía Shibui con Barra Roja Vertical (Idéntica a la Imagen 3) */}
              <div className="border-l-2 border-[#C84B31] bg-white/[0.02] p-5 sm:p-6 rounded-r-xl space-y-2">
                <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                  {lang === 'es' ? 'El Diálogo — Rigor y Transparencia' : 'The Dialogue — Rigor & Transparency'}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {lang === 'es'
                    ? 'Cada colaboración se concibe como una búsqueda compartida. La idea original se pule bajo presión y disciplina visual hasta encontrar su expresión más nítida, despojada de artificios innecesarios.'
                    : 'Each partnership is an authentic shared inquiry. The core concept is tempered through discipline and visual clarity until its purest expression emerges, free of superficial excess.'}
                </p>
              </div>

              {/* Canales Directos en Ledger Arquitectónico (Reemplazo de las tarjetas genéricas) */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  {lang === 'es' ? 'CANALES DE CONTACTO DIRECTO' : 'DIRECT COMMUNICATION CHANNELS'}
                </span>

                <div className="divide-y divide-white/10 border-y border-white/10 font-mono text-xs">
                  {/* Fila 01: Correo Electrónico */}
                  <a
                    href="mailto:luismiguelbermudezgarrido6@gmail.com"
                    className="py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] transition duration-200 group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                        01 // CORREO ELECTRÓNICO
                      </span>
                      <span className="text-white font-medium group-hover:text-[#C84B31] transition">
                        luismiguelbermudezgarrido6@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#C84B31] text-[11px] font-semibold">
                      <span>{lang === 'es' ? 'Redactar Correo' : 'Send Email'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </a>

                  {/* Fila 02: WhatsApp / Telefonía */}
                  <a
                    href="https://wa.me/593962548594"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] transition duration-200 group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                        02 // WHATSAPP / MENSAJERÍA
                      </span>
                      <span className="text-white font-medium group-hover:text-[#C84B31] transition">
                        +593 96 254 8594
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                      <span>{lang === 'es' ? 'Conversar por Chat' : 'Direct Message'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </a>

                  {/* Fila 03: Instagram */}
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.03] transition duration-200 group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                        03 // DIARIO VISUAL & REDES
                      </span>
                      <span className="text-white font-medium group-hover:text-[#C84B31] transition">
                        @luisbermudez.design
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-rose-400 text-[11px] font-semibold">
                      <span>{lang === 'es' ? 'Ver Feed en Vivo' : 'View Feed'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Indicador de Disponibilidad y Ubicación */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {lang === 'es' ? 'DISPONIBLE PARA PROYECTOS' : 'OPEN FOR SELECTED COMMISSIONS'}
                  </span>
                </div>
                <span className="text-neutral-500">QUITO, ECUADOR · REMOTO GLOBAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Cierre / Footer */}
        <div className="pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© 2026 Luis Bermúdez. Diseño Gráfico, Animación 2D/3D & Producción Audiovisual.</p>
          <div className="flex items-center gap-6">
            <a href="#root" className="hover:text-neutral-300 transition flex items-center gap-1">
              <span>{lang === 'es' ? 'Volver al inicio' : 'Back to top'}</span>
              <span>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
