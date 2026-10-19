# ADR-001: Adopción de Three.js + React Three Fiber + Drei y GSAP para Objetos 3D de Autor y Motion 2D

## Estado
Aprobado (autorizado por el usuario el 2026-10-18)

## Contexto y Declaración del Problema
El portafolio de Luis Bermúdez utilizaba `@splinetool/react-spline` y `@splinetool/runtime` cargando una escena externa desde `prod.spline.design`, lo que ocasionaba:
1. Un bundle JavaScript superior a 2,4 MB (incluyendo motores de física, navmesh, gaussian splats y howler innecesarios).
2. Dependencia de un servidor externo y necesidad de parches frágiles en tiempo de ejecución para suprimir la marca de agua de Spline.
3. Limitaciones para crear objetos 3D propios de cada caso de estudio (Libro RAUN, Códice Dolores Veintimilla, Tarjeta de Presentación IronWall 85×55 mm de doble cara, Disco Olímpico / Medalla LegionFit de 45 lb) con control fino de iluminación, texturas reales del portafolio y rendimiento idéntico en PC y teléfono.
4. Asimismo, para lograr animaciones 2D cinéticas de nivel After Effects (revelado tipográfico por caracteres/líneas, cortinillas editoriales y trazado SVG sincronizado al scroll), se requiere un motor de líneas de tiempo determinista junto a `framer-motion`.

## Decisión Propuesta
1. **Stack 3D Declarativo**: Instalar `three`, `@types/three`, `@react-three/fiber` y `@react-three/drei`, y remover la dependencia activa de `@splinetool/react-spline` y `@splinetool/runtime`.
2. **Stack Motion 2D & SVG**: Instalar `gsap` y `@gsap/react` para secuencias de tipografía cinética, trazado vectorial SVG y timelines con limpieza automática mediante `useGSAP()` y `gsap.matchMedia()`.

## Consecuencias y Análisis de Impacto
- **Monorepo / Proyecto (`pnpm`)**: Instalación limpia mediante `pnpm` sin duplicación de paquetes React 19.
- **Rendimiento y Bundle Size**:
  - Reducción drástica del peso frente a los ~2,4 MB del runtime de Spline.
  - Carga diferida (`React.lazy` / `Suspense`), limitación de `dpr={[1, 1.5]}` en móvil y `dpr={[1, 2]}` en escritorio, y pausa automática fuera de viewport con `IntersectionObserver`.
  - Soporte nativo para `prefers-reduced-motion` y fallback visual elegante.
- **Seguridad (Licencias & CVE)**:
  - `three`, `@react-three/fiber`, `@react-three/drei`: Licencia MIT.
  - `gsap`, `@gsap/react`: Licencia estándar gratuita (Webflow/GSAP Standard License). Se utilizan únicamente plugins core abiertos o split tipográfico propio sin requerir tokens privados.
- **Mantenibilidad**: Integración declarativa con React 19 y TypeScript estricto (`unknown` / tipos explícitos de Three.js, cero `any`).

## Alternativas Consideradas
- **Mantener `@splinetool/react-spline`**: Descartado por su peso excesivo (>2,4 MB), parches de marca de agua inestables y falta de texturizado dinámico sobre los objetos propios de cada proyecto de Luis.
- **CSS 3D Transforms únicamente**: Descartado porque no ofrece iluminación física (PBR), relieve metálico (bump/roughness en el disco de LegionFit o barniz UV en la tarjeta de IronWall) ni curvatura real de pliegos editoriales.
