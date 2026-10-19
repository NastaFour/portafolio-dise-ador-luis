import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { KineticText, EditorialMotionGraphicBadge } from '@/components/ui/KineticMotion2D';

function HeroAuthorSculptureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Fallback silencioso si el entorno (ej. test runner o ahorro extremo) no soporta WebGL
      return;
    }

    const isMobile = window.innerWidth < 768;
    const maxDpr = isMobile ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      100
    );
    camera.position.set(0, 0.2, isMobile ? 9.2 : 7.4);

    // Iluminación de estudio editorial (Terracota cálido + Marfil + Dorado suave)
    const ambientLight = new THREE.AmbientLight(0xf5f2eb, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xc84b31, 4.5, 18);
    rimLight.position.set(-4.5, -2.5, 3.5);
    scene.add(rimLight);

    const goldLight = new THREE.PointLight(0xd4a373, 2.8, 16);
    goldLight.position.set(4.2, -3.0, 2.5);
    scene.add(goldLight);

    // Grupo maestro con respuesta al cursor en PC y deriva armónica en teléfono
    const rootGroup = new THREE.Group();
    // En desktop desplazamos ligeramente el conjunto escultórico a la derecha para equilibrar la lectura
    rootGroup.position.set(isMobile ? 0 : 1.15, isMobile ? 0.15 : 0, 0);
    scene.add(rootGroup);

    const disposables: Array<{ dispose: () => void }> = [];
    const textureLoader = new THREE.TextureLoader();

    // 1. Anillo Ensō Escultórico Central (Terracota Shibui con bisel orgánico)
    const ensoGeo = new THREE.TorusGeometry(isMobile ? 1.65 : 1.95, 0.13, 32, 128, Math.PI * 1.82);
    const ensoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C84B31'),
      roughness: 0.32,
      metalness: 0.28,
    });
    disposables.push(ensoGeo, ensoMat);
    const ensoMesh = new THREE.Mesh(ensoGeo, ensoMat);
    ensoMesh.rotation.set(0.35, -0.25, 0.4);
    rootGroup.add(ensoMesh);

    // 2. Segundo aro arquitectónico fino en bronce/oro (Inspirado en las líneas de cruce del manual PDF)
    const innerRingGeo = new THREE.TorusGeometry(isMobile ? 2.15 : 2.55, 0.018, 16, 120);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4A373'),
      roughness: 0.25,
      metalness: 0.75,
      transparent: true,
      opacity: 0.65,
    });
    disposables.push(innerRingGeo, innerRingMat);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.set(1.1, 0.3, -0.2);
    rootGroup.add(innerRingMesh);

    // 3. Pliegos y Piezas Reales del Portafolio Orbitando el Ensō
    const orbitGroup = new THREE.Group();
    rootGroup.add(orbitGroup);

    const folioSpecs = [
      {
        img: '/projects/raun/raun_page_01.jpg',
        width: 1.15,
        height: 1.58,
        depth: 0.04,
        accent: '#C84B31',
        angle: 0.3,
        radius: isMobile ? 1.95 : 2.45,
        yOffset: 0.85,
      },
      {
        img: '/projects/dolores/page_1.jpg',
        width: 1.1,
        height: 1.5,
        depth: 0.04,
        accent: '#D4A373',
        angle: 1.85,
        radius: isMobile ? 2.0 : 2.55,
        yOffset: -0.75,
      },
      {
        img: '/projects/ironwall/parte_frontalpng.png',
        width: 1.38,
        height: 0.89,
        depth: 0.03,
        accent: '#F0AB00',
        angle: 3.45,
        radius: isMobile ? 1.9 : 2.4,
        yOffset: 0.65,
      },
      {
        img: '/projects/legionfit/plate_mockup.webp',
        width: 1.2,
        height: 1.2,
        depth: 0.05,
        accent: '#E06D2B',
        angle: 4.95,
        radius: isMobile ? 1.95 : 2.45,
        yOffset: -0.8,
      },
    ];

    const folioMeshes: THREE.Mesh[] = [];

    folioSpecs.forEach((spec) => {
      const geo = new THREE.BoxGeometry(spec.width, spec.height, spec.depth);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(spec.accent),
        roughness: 0.4,
        metalness: 0.5,
      });
      const faceMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E8E4DC'),
        roughness: 0.35,
        metalness: 0.08,
      });

      textureLoader.load(
        spec.img,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          faceMat.map = tex;
          faceMat.needsUpdate = true;
          disposables.push(tex);
        },
        undefined,
        () => {
          // Si no carga en test/offline, mantiene el color cálido editorial
        }
      );

      disposables.push(geo, edgeMat, faceMat);
      const materials = [edgeMat, edgeMat, edgeMat, edgeMat, faceMat, faceMat];
      const mesh = new THREE.Mesh(geo, materials);

      mesh.position.set(
        Math.cos(spec.angle) * spec.radius,
        spec.yOffset,
        Math.sin(spec.angle) * (spec.radius * 0.65)
      );
      mesh.rotation.set(0.12, -spec.angle * 0.35, 0.08);
      mesh.userData = { baseAngle: spec.angle, radius: spec.radius, baseY: spec.yOffset };
      orbitGroup.add(mesh);
      folioMeshes.push(mesh);
    });

    // 4. Polvo atmosférico de taller (Partículas sutiles)
    const particleCount = isMobile ? 45 : 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D4A373'),
      size: isMobile ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.55,
    });
    disposables.push(particleGeo, particleMat);
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interacción suave con puntero y soporte para prefers-reduced-motion
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.targetY = -(e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const mobileNow = window.innerWidth < 768;
      rootGroup.position.x = mobileNow ? 0 : 1.15;
      camera.position.z = mobileNow ? 9.2 : 7.4;
      camera.aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Auto-pausa con IntersectionObserver cuando el Hero no está visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!isVisible || !renderer) return;

      const t = clock.getElapsedTime();
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      if (!prefersReducedMotion) {
        ensoMesh.rotation.z = 0.4 + t * 0.14;
        ensoMesh.rotation.x = 0.35 + Math.sin(t * 0.5) * 0.12 + pointer.y * 0.18;
        ensoMesh.rotation.y = -0.25 + Math.cos(t * 0.4) * 0.12 + pointer.x * 0.22;

        innerRingMesh.rotation.y = 0.3 - t * 0.18;
        innerRingMesh.rotation.x = 1.1 + Math.sin(t * 0.35) * 0.1;

        folioMeshes.forEach((mesh, idx) => {
          const { baseAngle, radius, baseY } = mesh.userData as {
            baseAngle: number;
            radius: number;
            baseY: number;
          };
          const currentAngle = baseAngle + t * 0.16;
          mesh.position.x = Math.cos(currentAngle) * radius;
          mesh.position.z = Math.sin(currentAngle) * (radius * 0.65);
          mesh.position.y = baseY + Math.sin(t * 1.1 + idx * 1.4) * 0.14;
          mesh.rotation.y = -currentAngle * 0.45 + pointer.x * 0.2;
        });

        particles.rotation.y = t * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((d) => d.dispose());
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[100dvh] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Líneas de Cruce Arquitectónicas (Inspiradas en la Portada de portafolio_trabajo_luis.pdf) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[38%] w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="hidden sm:block absolute left-8 right-8 top-[68%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Máscara de gradiente editorial cálido para legibilidad impecable en móvil y PC */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle at 72% 45%, rgba(200, 75, 49, 0.12) 0%, transparent 55%),
            linear-gradient(to right, rgba(17, 17, 17, 0.92) 0%, rgba(17, 17, 17, 0.58) 52%, rgba(17, 17, 17, 0.78) 100%),
            linear-gradient(to bottom, rgba(17, 17, 17, 0.4) 0%, transparent 35%, rgba(17, 17, 17, 0.98) 100%)
          `,
        }}
      />
    </div>
  );
}

interface HeroContentProps {
  lang?: 'es' | 'en';
}

function HeroContent({ lang = 'es' }: HeroContentProps) {
  const pillars =
    lang === 'es'
      ? ['Claridad', 'Orden visual', 'Estética visual', 'Intención en cada detalle']
      : ['Clarity', 'Visual Order', 'Visual Aesthetics', 'Intent in Every Detail'];

  return (
    <div className="text-white px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end pt-24 pb-12 sm:py-16 gap-8 sm:gap-12">
      {/* Columna Izquierda: Retrato con Geometría de Firma PDF + Tipografía Cinética */}
      <div className="w-full lg:w-3/5 space-y-5 sm:space-y-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Contenedor Asimétrico Hoja/Pétalo del PDF Original (Pág. 2 de portafolio_trabajo_luis.pdf) */}
          <div className="relative w-24 h-28 sm:w-36 sm:h-44 overflow-hidden rounded-tl-none rounded-br-none rounded-tr-[36px] rounded-bl-[36px] sm:rounded-tr-[48px] sm:rounded-bl-[48px] border border-white/35 shadow-[0_0_45px_rgba(200,75,49,0.28)] shrink-0 pointer-events-auto group">
            <img
              src="/PERFIL.jpg"
              alt="Luis Bermúdez"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-[#C84B31]/40 pointer-events-none rounded-tr-[36px] rounded-bl-[36px] sm:rounded-tr-[48px] sm:rounded-bl-[48px]" />
          </div>

          {/* Sello Editorial "portfolio" (Pág. 1 del PDF de Luis) */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neutral-300">
                {lang === 'es'
                  ? 'PORTFOLIO // DISEÑO & PRODUCCIÓN AUDIOVISUAL'
                  : 'PORTFOLIO // DESIGN & AUDIOVISUAL PRODUCTION'}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/10 text-neutral-300"
                >
                  • {pillar}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <KineticText
            as="h1"
            text="LUIS BERMÚDEZ"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display leading-[0.98] tracking-[-0.03em] text-[#E8E4DC]"
          />

          <div className="text-[11px] sm:text-sm tracking-[0.2em] text-[#C84B31] font-semibold mt-3 sm:mt-4 uppercase flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-[#C84B31] inline-block" />
            <span>
              {lang === 'es'
                ? 'Motion Graphics / Dirección de Arte / Diseño Editorial / Producción Audiovisual'
                : 'Motion Graphics / Art Direction / Editorial Design / Audiovisual Production'}
            </span>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Manifiesto Corto del PDF (Pág. 2) & Acciones */}
      <div className="w-full lg:w-2/5 flex flex-col items-start lg:items-end lg:text-right space-y-5">
        <div className="flex items-center gap-3 self-start lg:self-end">
          <EditorialMotionGraphicBadge variant="bezier" accentColor="#C84B31" />
          <EditorialMotionGraphicBadge variant="waveform" accentColor="#D4A373" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            {lang === 'es' ? 'COMPOSICIÓN · ORDEN · DETALLE' : 'COMPOSITION · ORDER · DETAIL'}
          </span>
        </div>

        <p className="text-sm sm:text-base text-neutral-200/95 max-w-md font-sans leading-relaxed">
          {lang === 'es'
            ? 'Creo piezas visuales desde un enfoque estético, claro y moderno. Exploro diseño, composición y movimiento para desarrollar contenido que mantenga coherencia, intención y una identidad visual limpia.'
            : 'Creating visual pieces from a clear, modern aesthetic. Exploring design, composition, and motion to craft content with coherence, deliberate intent, and a clean visual identity.'}
        </p>

        <div className="flex pointer-events-auto flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a
            href="#contacto"
            className="border border-white/35 text-white font-medium py-3 px-6 sm:px-7 rounded-full transition duration-300 hover:bg-white hover:text-black text-center text-xs uppercase tracking-wider backdrop-blur-sm"
          >
            {lang === 'es' ? 'Iniciar Conversación' : 'Start Conversation'}
          </a>
          <a
            href="#proyectos"
            className="bg-[#C84B31] text-white font-semibold py-3 px-6 sm:px-7 rounded-full transition duration-300 hover:bg-[#b03f27] hover:scale-105 flex items-center justify-center text-center text-xs uppercase tracking-wider shadow-lg"
          >
            {lang === 'es' ? 'Ver Proyectos' : 'View Works'}
          </a>
        </div>
      </div>
    </div>
  );
}

interface HeroSectionProps {
  lang?: 'es' | 'en';
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang = 'es' }) => {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.pageYOffset;
          const maxScroll = 520;
          const opacity = Math.max(0, 1 - scrollPosition / maxScroll);
          if (heroContentRef.current) {
            heroContentRef.current.style.opacity = opacity.toString();
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-[#111111] overflow-hidden">
      <div className="relative h-[100dvh] min-h-[100dvh] w-full">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroAuthorSculptureCanvas />
        </div>

        <div
          ref={heroContentRef}
          className="relative z-10 w-full h-full min-h-[100dvh] flex items-center justify-center pointer-events-none"
        >
          <HeroContent lang={lang} />
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
export default HeroSection;
