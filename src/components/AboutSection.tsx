import React from 'react';
import { JapaneseEmakimonoScroll } from './JapaneseEmakimonoScroll';
import { KineticText, EditorialMotionGraphicBadge } from '@/components/ui/KineticMotion2D';

interface AboutSectionProps {
  lang: 'es' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#141414] text-[#E8E4DC] border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        {/* Marca de agua monumental de fondo (estilo letra 'R' de Revista RAUN) */}
        <div className="absolute -top-12 -right-8 text-[14rem] sm:text-[22rem] font-display font-extrabold text-white/[0.02] select-none pointer-events-none leading-none z-0">
          R
        </div>

        {/* Sección Principal: Autor, Credenciales y Filosofía Shibui */}
        <div className="relative z-10 space-y-12">
          {/* Encabezado Editorial con Tipografía Cinética */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#C84B31] uppercase tracking-widest font-semibold block mb-2">
                {lang === 'es' ? '[ AUTOR & TRAYECTORIA ]' : '[ AUTHOR & TRAJECTORY ]'}
              </span>
              <KineticText
                as="h2"
                text="Luis Miguel Bermúdez Garrido"
                className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight"
              />
              <p className="text-base sm:text-xl text-neutral-400 font-display italic mt-2">
                {lang === 'es'
                  ? 'Diseñador Gráfico, Especialista en After Effects & Productor Audiovisual graduado del ISTER. Animación y diseño para Kriss Ecuador y Minerva.'
                  : 'Graphic Designer, After Effects Specialist & Audiovisual Producer from ISTER. Motion design and branding for Kriss Ecuador and Minerva.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <EditorialMotionGraphicBadge variant="seal" accentColor="#C84B31" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                <span className="block text-[#E8E4DC] font-semibold">SHIBUI, MA & RAUN</span>
                <span>{lang === 'es' ? 'CRITERIO DE AUTOR' : 'AUTHORIAL CRAFT'}</span>
              </div>
            </div>
          </div>

          {/* Composición Asimétrica: Lista de Guiones Rojos + Ensayo Tipográfico */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Columna Izquierda (5 columnas): Lista de Guiones Rojos auténtica */}
            <div className="lg:col-span-5 space-y-5 bg-[#181818] border border-white/10 p-6 sm:p-7 rounded-tl-none rounded-br-none rounded-tr-[40px] rounded-bl-[40px]">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold pb-2 border-b border-white/10">
                {lang === 'es'
                  ? 'Credenciales & Avales de Producción'
                  : 'Credentials & Production Endorsements'}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">
                    -
                  </span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Formación Académica:' : 'Academic Background:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Tecnólogo Universitario en Diseño Gráfico y Producción Audiovisual en el Instituto Tecnológico Universitario Rumiñahui (ISTER).'
                      : 'University Technologist in Graphic Design and Audiovisual Production at Rumiñahui University Institute (ISTER).'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">
                    -
                  </span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Avales & Experiencia:' : 'Endorsements & Field Work:'}
                    </strong>{' '}
                    {lang === 'es' ? (
                      <>
                        Producción en desarrollo de post para redes sociales, desarrollo visual y
                        animación para marcas que avalan su trabajo como{' '}
                        <a
                          href="https://www.instagram.com/krisecuador/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4 hover:text-[#C84B31] transition"
                        >
                          Kriss Ecuador
                        </a>{' '}
                        y{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Minerva
                        </strong>
                        .
                      </>
                    ) : (
                      <>
                        Social media post production & development, motion design and visual
                        development for brands backing his work including{' '}
                        <a
                          href="https://www.instagram.com/krisecuador/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4 hover:text-[#C84B31] transition"
                        >
                          Kriss Ecuador
                        </a>{' '}
                        and{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Minerva
                        </strong>
                        .
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">
                    -
                  </span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Especialidades Técnicas:' : 'Core Specialties:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Diseño gráfico y editorial, After Effects, motion graphics, dirección de arte, edición de video y producción audiovisual.'
                      : 'Graphic & editorial design, After Effects motion graphics, art direction, video editing & audiovisual production.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">
                    -
                  </span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Rigor Metodológico:' : 'Methodological Rigor:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Retícula modular suiza, proporción áurea, técnicas de composición y contención estética Shibui.'
                      : 'Swiss modular grids, golden proportions, composition methodology, and Shibui aesthetic restraint.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">
                    -
                  </span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Pipeline Digital:' : 'Digital Pipeline:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Flujo integral de creación en After Effects, Premiere Pro, InDesign, Illustrator, Photoshop, Lightroom y Audition.'
                      : 'Full creative pipeline across After Effects, Premiere Pro, InDesign, Illustrator, Photoshop, Lightroom & Audition.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna Derecha (7 columnas): Ensayo Tipográfico y Caja Shibui con Barra Roja */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                <p>
                  {lang === 'es' ? (
                    <>
                      Concibo el diseño no como mero adorno superficial, sino como un ejercicio de{' '}
                      <strong className="text-white font-semibold">
                        ordenación espacial y ritmo temporal
                      </strong>
                      . Mi trabajo explora cómo la armonía entre el mito, la disciplina visual y la
                      narrativa audiovisual pueden dotar a cada proyecto de carácter y
                      trascendencia.
                    </>
                  ) : (
                    <>
                      I perceive design not as superficial decoration, but as an exercise in{' '}
                      <strong className="text-white font-semibold">
                        spatial order and temporal rhythm
                      </strong>
                      . My work investigates how the dialogue between myth, visual discipline, and
                      audiovisual storytelling endows each project with enduring character.
                    </>
                  )}
                </p>
                <p>
                  {lang === 'es' ? (
                    <>
                      Inspirado en el concepto nórdico{' '}
                      <span className="text-[#C84B31] font-medium">Raun</span> (la prueba y el error
                      como crisol del forjador) y en los principios estéticos japoneses como{' '}
                      <span className="text-[#C84B31] font-medium">Wabi-Sabi, Ma y Shibui</span>,
                      desarrollo piezas donde cada elemento tiene un propósito deliberado,
                      alejándome del ruido innecesario para alcanzar la máxima pureza visual.
                    </>
                  ) : (
                    <>
                      Rooted in the Norse concept of{' '}
                      <span className="text-[#C84B31] font-medium">Raun</span> (adversity as the
                      craftsman’s crucible) and Japanese aesthetics including{' '}
                      <span className="text-[#C84B31] font-medium">Wabi-Sabi, Ma, and Shibui</span>,
                      I construct pieces where every void and mark serves an uncompromising intent.
                    </>
                  )}
                </p>
              </div>

              {/* Caja de Filosofía Shibui con Barra Roja Vertical (Pág. 4 de portafolio_trabajo_luis.pdf) */}
              <div className="border-l-2 border-[#C84B31] bg-white/[0.02] p-5 sm:p-6 rounded-r-xl space-y-2">
                <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                  {lang === 'es'
                    ? 'Shibui (渋い) — La elegancia simple'
                    : 'Shibui (渋い) — Understated Elegance'}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {lang === 'es'
                    ? 'Belleza que no necesita adornos para impactar. Es un equilibrio entre estética y funcionalidad, donde cada línea, color o forma tiene un propósito. Con el tiempo se descubren nuevas riquezas que no son evidentes a primera vista.'
                    : 'Beauty that requires no artificial ornament to command resonance. A disciplined balance between aesthetics and function, whose depth unfolds over time through quiet restraint.'}
                </p>
              </div>

              {/* Repositorio de Herramientas Estilo Ledger Arquitectónico */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  {lang === 'es'
                    ? 'SUITE TÉCNICA & FLUJO DE PRODUCCIÓN'
                    : 'TECHNICAL SUITE & PRODUCTION PIPELINE'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col gap-1">
                    <span className="text-[#C84B31] text-[10px] tracking-wider uppercase font-semibold">
                      MOTION & AUDIOVISUAL
                    </span>
                    <span className="text-white">After Effects, Premiere Pro, Audition</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col gap-1">
                    <span className="text-[#C84B31] text-[10px] tracking-wider uppercase font-semibold">
                      DISEÑO EDITORIAL & MARCA
                    </span>
                    <span className="text-white">InDesign, Illustrator, Photoshop, Lightroom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rollo Emakimono Japonés Horizontal */}
        <div className="pt-12 border-t border-white/10">
          <JapaneseEmakimonoScroll lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
