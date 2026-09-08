import React from 'react';
import { JapaneseEmakimonoScroll } from './JapaneseEmakimonoScroll';

interface AboutSectionProps {
  lang: 'es' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#141414] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20 relative">
        {/* Marca de agua monumental de fondo (estilo letra 'R' de la imagen 3 de referencia) */}
        <div className="absolute -top-16 -left-12 text-[14rem] sm:text-[20rem] font-display font-extrabold text-white/[0.02] select-none pointer-events-none leading-none z-0">
          L
        </div>

        {/* Sección Editorial Superior: Autor, Trayectoria & Filosofía (Estructura de la Imagen 3) */}
        <div className="relative z-10 space-y-12">
          {/* Encabezado Editorial */}
          <div>
            <span className="text-xs font-mono text-[#C84B31] uppercase tracking-widest font-semibold block mb-2">
              {lang === 'es' ? '[ 01 // AUTOR & TRAYECTORIA ]' : '[ 01 // AUTHOR & TRAJECTORY ]'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
              Luis Miguel Bermúdez Garrido
            </h2>
            <p className="text-base sm:text-xl text-neutral-400 font-display italic mt-2">
              {lang === 'es'
                ? 'Diseñador Gráfico, Especialista en After Effects & Productor Audiovisual graduado del ISTER. Animación y diseño para Kriss Ecuador y Minerva.'
                : 'Graphic Designer, After Effects Specialist & Audiovisual Producer from ISTER. Motion design and branding for Kriss Ecuador and Minerva.'}
            </p>
          </div>

          {/* Composición Asimétrica Estilo Imagen 3: Lista de Guiones Rojos + Ensayo Tipográfico */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Columna Izquierda (5 columnas): Lista de Guiones Rojos auténtica */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold pb-2 border-b border-white/10">
                {lang === 'es' ? 'Credenciales & Enfoque de Producción' : 'Credentials & Production Focus'}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Formación Académica:' : 'Academic Background:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Tecnólogo Universitario en Diseño Gráfico y Producción Audiovisual (ISTER).'
                      : 'University Technologist in Graphic Design and Audiovisual Production (ISTER).'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Experiencia de Campo:' : 'Industry Experience:'}
                    </strong>{' '}
                    {lang === 'es' ? (
                      <>
                        Producción en CreativeIn y desarrollo visual y animación para marcas como{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Kriss Ecuador
                        </strong>{' '}
                        y{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Minerva
                        </strong>.
                      </>
                    ) : (
                      <>
                        Production at CreativeIn, motion design and visual development for brands including{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Kriss Ecuador
                        </strong>{' '}
                        and{' '}
                        <strong className="text-white font-semibold underline decoration-[#C84B31] underline-offset-4">
                          Minerva
                        </strong>.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Especialidades Técnicas:' : 'Core Specialties:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Diseño gráfico y editorial, After Effects, motion graphics, dirección de arte y producción audiovisual.'
                      : 'Graphic & editorial design, After Effects motion graphics, art direction & audiovisual production.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Rigor Metodológico:' : 'Methodological Rigor:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Retícula modular suiza, proporción áurea y contención estética Shibui.'
                      : 'Swiss modular grids, golden proportions, and Shibui aesthetic restraint.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C84B31] font-bold select-none text-base leading-none mt-0.5">-</span>
                  <span>
                    <strong className="text-white font-medium">
                      {lang === 'es' ? 'Pipeline Digital:' : 'Digital Pipeline:'}
                    </strong>{' '}
                    {lang === 'es'
                      ? 'Flujo integral de creación en After Effects, InDesign, Illustrator, Photoshop y Premiere Pro.'
                      : 'Full creative pipeline across After Effects, InDesign, Illustrator, Photoshop & Premiere Pro.'}
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
                      <strong className="text-white font-semibold">ordenación espacial y ritmo temporal</strong>. Mi trabajo explora cómo la armonía entre el mito, la disciplina visual y la narrativa audiovisual pueden dotar a cada proyecto de carácter y trascendencia.
                    </>
                  ) : (
                    <>
                      I perceive design not as superficial decoration, but as an exercise in{' '}
                      <strong className="text-white font-semibold">spatial order and temporal rhythm</strong>. My work investigates how the dialogue between myth, visual discipline, and audiovisual storytelling endows each project with enduring character.
                    </>
                  )}
                </p>
                <p>
                  {lang === 'es' ? (
                    <>
                      Inspirado en el concepto nórdico <span className="text-[#C84B31] font-medium">Raun</span> (la prueba y el error como crisol del forjador) y en los principios estéticos japoneses como <span className="text-[#C84B31] font-medium">Wabi-Sabi, Ma y Shibui</span>, desarrollo piezas donde cada elemento tiene un propósito deliberado, alejándome del ruido innecesario para alcanzar la máxima pureza visual.
                    </>
                  ) : (
                    <>
                      Rooted in the Norse concept of <span className="text-[#C84B31] font-medium">Raun</span> (adversity as the craftsman’s crucible) and Japanese aesthetics including <span className="text-[#C84B31] font-medium">Wabi-Sabi, Ma, and Shibui</span>, I construct pieces where every void and mark serves an uncompromising intent.
                    </>
                  )}
                </p>
              </div>

              {/* Caja de Filosofía Shibui con Barra Roja Vertical (Idéntica a la Imagen 3) */}
              <div className="border-l-2 border-[#C84B31] bg-white/[0.02] p-5 sm:p-6 rounded-r-xl space-y-2">
                <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                  {lang === 'es' ? 'Shibui — La elegancia simple' : 'Shibui — The Understated Elegance'}
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
                  {lang === 'es' ? 'SUITE TÉCNICA & HERRAMIENTAS' : 'TECHNICAL SUITE & PRODUCTION PIPELINE'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-neutral-400">01 // AFTER EFFECTS & MOTION</span>
                    <span className="text-white">After Effects · Premiere Pro · Audition</span>
                  </div>
                  <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-neutral-400">02 // DISEÑO EDITORIAL & MARCA</span>
                    <span className="text-white">InDesign · Illustrator · Photoshop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rollo Emakimono Japonés Horizontal (Reemplaza las secciones anteriores por un pergamino narrativo continuo) */}
        <div className="pt-12 border-t border-white/10">
          <JapaneseEmakimonoScroll lang={lang} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
