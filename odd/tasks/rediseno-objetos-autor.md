# Feature: Rediseño del Portafolio con Objetos de Autor y Motion 2D/3D
Branch: `feat/rediseno-objetos-autor` | Delivery: work-unit commits | Test runner: `pnpm test` (`vitest run`) & `pnpm build`

## Specs

- **S1 — Mejora con objetos tridimensionales y animaciones 2D/3D sin mencionar 3D en el texto**:
  - Verbatim: `"con todo el contexto que tenemos sobre este portafolio como lo podriamos mejorar con objetos 3d (el diseñador no quiere que se mencione nada del 3d)"`, `"no quiere que se mencione nada del 3d"`, `"animaciones 2d fachera y 3d tmb"`, `"1 dale si vez que verdaderamente  no jode y mejora todo estara mejor, 2 claro Gsap o el otro como se llamaba svga que usan para motion graphics webs tmb, puede utilizarse cualquier cosa"`.
  - Scope & Acceptance Criteria: Reemplazar la escena pesada de Spline y el marquee genérico por objetos tridimensionales de autor en React Three Fiber / Three.js + animaciones 2D cinéticas (GSAP / SVG motion graphics / Framer Motion), eliminando toda mención textual a `"3D"`, `"3d"`, `"Spline"`, `"WebGL"`, `"Cinema 4D"`, `"zBrush"` o `"tridimensional"` en el copy visible y metadatos (`index.html`, `portfolioData.ts`, `3d-hero-section-boxes.tsx`, `AboutSection.tsx`, `ContactSection.tsx`).
  - Checks: Test automatizado en Vitest que inspeccione el copy exportado y el DOM renderizado verificando 0 coincidencias de términos 3D prohibidos.

- **S2 — Paridad visual y optimización en PC y teléfono**:
  - Verbatim: `"cn toda la informaciona actual igual de optimizado tanto para pc como para telefono y que se vea igual de bonito en ambos."`
  - Scope & Acceptance Criteria: Optimizar los activos de `public/` (de ~137 MB a formatos modernos comprimidos WebP/AVIF), mantener toda la información actual del portafolio y lograr que los objetos tridimensionales y las animaciones 2D se vean con igual calidad estética y fluidez en escritorio y móvil (DPR controlado, frameloop pausado fuera de viewport, soporte `prefers-reduced-motion`).
  - Checks: `pnpm build` exitoso, verificación de peso de assets optimizados y tests de componentes en `pnpm test`.

- **S3 — Manuales y referencias PDF integrados manteniendo únicamente los avales actuales**:
  - Verbatim: `"creo que por alli esta su manual de marca y tal, no quiere que se mencione nada del 3d, y mejorar completamente el diseño pero con los que lo avalan los que puedan dar fe de vida que hace buen trabajo los que estan ahorita pq algunos que menciona en su manual prefiere no mencionarlos por lo que mantendremos el mismo"`, `"[Instagram](https://www.instagram.com/krisecuador/) ese mismo"`.
  - Scope & Acceptance Criteria: Extraer los tokens visuales, tipográficos y de composición de los PDFs en `referencia del dise;ador/` y `TODO/COPIA PAGINA  PORTAFOLIO/`, conservar exclusivamente los avales actuales (**Kriss Ecuador**, **Minerva**, **ISTER**) sin añadir nombres descartados de la hoja de vida (CreativeIn, Tecniseguros, JAE, EKS, Filmpro, Banco Pichincha, BGR, Ox Sport, ni referencias telefónicas personales), y enlazar Instagram a `https://www.instagram.com/krisecuador/`.
  - Checks: Test automatizado en Vitest verificando la presencia de los avales autorizados (`Kriss Ecuador`, `Minerva`, `ISTER`), el enlace `https://www.instagram.com/krisecuador/`, y la ausencia total de las entidades descartadas del CV.

## Tasks

- [x] **T0** | S1, S3 | route: inline | Extraer tokens y contenido de todos los PDFs (`portafolio_trabajo_luis.pdf`, `Luis_Bermudez_Hoja_de_vida.pdf`, `legionfit_editable_logo.pdf`, `tarjeta_de_presentacion.pdf`, `LIBRO DE TESIS`) en `design-artifacts/portafolio-luis/manual-y-referencias-pdf.md` y registrar `references/adrs/ADR-001-three-r3f-gsap-motion.md` | Evidence: commit `fcb9d24`
- [x] **T1** | S2 | route: inline | Optimizar imágenes pesadas de `public/` con `sharp` a WebP/AVIF manteniendo calidad visual en PC y móvil | Evidence: commit `7aacf70` (137.1 MB -> 8.6 MB)
- [x] **T2** | S1, S3 | route: inline | Limpiar todo el copy visible y metadatos de menciones al 3D, fijar Instagram a `https://www.instagram.com/krisecuador/`, blindar avales actuales (`Kriss Ecuador`, `Minerva`, `ISTER`) y añadir suite de tests en Vitest (RED/GREEN) | Evidence: commit `ca16ed8` (RED 4 failed -> GREEN 5 passed)
- [x] **T3** | S1, S2 | route: inline | Instalar `three`, `@types/three`, `gsap`, `@gsap/react` (bajo ADR-001) y construir el sistema de animación 2D cinética y SVG motion graphics | Evidence: commit `83b29f8`
- [x] **T4** | S1, S2 | route: inline | Reemplazar el Hero de Spline por escena de autor en Three.js (Ensō escultórico terracota + pliegos editoriales orbitando) + tipografía cinética 2D optimizada para PC y móvil | Evidence: commit `6645595`
- [x] **T5** | S1, S2, S3 | route: inline | Rediseñar la vitrina de proyectos (`ProjectShowcase` y `ProjectDetailModal`) con objetos 3D interactivos por caso de estudio (Libro RAUN, Códice Dolores Veintimilla, Tarjeta IronWall 85×55mm doble cara, Disco/Medalla LegionFit 45lb) | Evidence: commit `25a70dc`
- [ ] **T6** | S1, S2, S3 | route: inline | Rediseñar secciones de Avales, Sobre Mí (`AboutSection`) y Contacto (`ContactSection`) con estética editorial del PDF original de Luis, animaciones 2D/SVG y enlace oficial a `krisecuador` | Evidence: pending
- [ ] **T7** | S1, S2, S3 | route: inline | Verificación integral (`pnpm test`, `pnpm build`, auditoría de cero menciones 3D, cero avales prohibidos, paridad móvil/PC y `prefers-reduced-motion`) | Evidence: pending

## Log

- **L1 (2026-10-18)**: `"con todo el contexto que tenemos sobre este portafolio como lo podriamos mejorar con objetos 3d (el diseñador no quiere que se mencione nada del 3d) cn toda la informaciona actual igual de optimizado tanto para pc como para telefono y que se vea igual de bonito en ambos., creo que por alli esta su manual de marca y tal, no quiere que se mencione nada del 3d, y mejorar completamente el diseño pero con los que lo avalan los que puedan dar fe de vida que hace buen trabajo los que estan ahorita pq algunos que menciona en su manual prefiere no mencionarlos por lo que mantendremos el mismo"`
- **L2 (2026-10-18)**: `"animaciones 2d fachera y 3d tmb"`
- **L3 (2026-10-18)**: `"[Instagram](https://www.instagram.com/krisecuador/) ese mismo (cambiare el modelo a argon para que pueda leer los pdf un momentico para volver con opus hasta que se acabe y volver a argon)\n\n1 dale si vez que verdaderamente  no jode y mejora todo estara mejor, 2 claro Gsap o el otro como se llamaba svga que usan para motion graphics webs tmb, puede utilizarse cualquier cosa 3"`
- **L4 (2026-10-18)**: Leídos los 5 documentos PDF completos con el lector nativo multimodal (`portafolio_trabajo_luis.pdf`, `Luis_Bermudez_Hoja_de_vida.pdf`, `legionfit_editable_logo.pdf`, `tarjeta_de_presentacion.pdf`, `LIBRO DE TESIS - BERMUDEZ & MONTAÑO (10).pdf` y `portafolio_editable.pdf`) más los informes de empaquetado de Illustrator. Confirmado por qué Luis excluye las empresas de su CV (`CreativeIn`, `Tecniseguros`, `JAE`, `EKS`, `Filmpro`, `Banco Pichincha`, `BGR`, `Ox Sport`) y las menciones de `"Creación de figuras y personajes 3D (Nivel Estudiante)"`, `"Cinema 4D (Nivel Regular)"`, `"zBrush (Nivel Regular)"`. Todo queda documentado en `design-artifacts/portafolio-luis/manual-y-referencias-pdf.md` y aprobado el stack en `references/adrs/ADR-001-three-r3f-gsap-motion.md`.
