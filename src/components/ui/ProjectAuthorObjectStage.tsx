import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { type Project } from '@/data/portfolioData';

interface ProjectAuthorObjectStageProps {
  project: Project;
  lang: 'es' | 'en';
  interactive?: boolean;
}

/**
 * Escenario de Objeto de Autor por Proyecto (RAUN, Dolores Veintimilla, IronWall, LegionFit)
 * Construye el artefacto físico real de cada proyecto con iluminación de estudio,
 * auto-pausa fuera de pantalla y paridad visual entre PC y teléfono.
 */
export const ProjectAuthorObjectStage: React.FC<ProjectAuthorObjectStageProps> = ({
  project,
  lang,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const flipTargetRef = useRef(0);

  useEffect(() => {
    flipTargetRef.current = flipped ? Math.PI : 0;
  }, [flipped]);

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
      return;
    }

    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    setWebglReady(true);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.1,
      50
    );
    camera.position.set(0, 0.15, isMobile ? 5.3 : 4.7);

    // Iluminación adaptada a la paleta de cada obra
    const ambient = new THREE.AmbientLight(0xf5f2eb, 1.05);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.3);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(new THREE.Color(project.color), 3.8, 14);
    accentLight.position.set(-3.5, -2.0, 3.2);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0xd4a373, 2.2, 12);
    rimLight.position.set(3.2, -2.5, -2.0);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const disposables: Array<{ dispose: () => void }> = [];
    const loader = new THREE.TextureLoader();

    const loadTex = (url: string, onApply: (tex: THREE.Texture) => void) => {
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          disposables.push(tex);
          onApply(tex);
        },
        undefined,
        () => {}
      );
    };

    // Construcción del objeto específico según el proyecto
    if (project.id === 'raun') {
      // REVISTA RAUN: Díptico Editorial Abierto + Lomo Terracota + Aro Shibui
      const bookGroup = new THREE.Group();
      rootGroup.add(bookGroup);

      const spineGeo = new THREE.CylinderGeometry(0.055, 0.055, 2.38, 24);
      const spineMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C84B31'),
        roughness: 0.35,
        metalness: 0.3,
      });
      disposables.push(spineGeo, spineMat);
      const spine = new THREE.Mesh(spineGeo, spineMat);
      bookGroup.add(spine);

      // Cubierta izquierda (Portada Yggdrasil)
      const pageGeo = new THREE.BoxGeometry(1.68, 2.36, 0.045);
      const darkEdgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1B1B1B'),
        roughness: 0.5,
      });
      const paperEdgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E8E4DC'),
        roughness: 0.6,
      });
      const coverMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.32,
        metalness: 0.05,
      });
      const spreadMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.36,
        metalness: 0.05,
      });

      loadTex('/projects/raun/raun_page_01.jpg', (tex) => {
        coverMat.map = tex;
        coverMat.needsUpdate = true;
      });
      loadTex('/projects/raun/raun_page_04.jpg', (tex) => {
        spreadMat.map = tex;
        spreadMat.needsUpdate = true;
      });

      disposables.push(pageGeo, darkEdgeMat, paperEdgeMat, coverMat, spreadMat);

      const leftWing = new THREE.Mesh(pageGeo, [
        paperEdgeMat,
        darkEdgeMat,
        paperEdgeMat,
        paperEdgeMat,
        coverMat,
        darkEdgeMat,
      ]);
      leftWing.position.set(-0.82, 0, 0.14);
      leftWing.rotation.y = 0.22;
      bookGroup.add(leftWing);

      const rightWing = new THREE.Mesh(pageGeo, [
        paperEdgeMat,
        darkEdgeMat,
        paperEdgeMat,
        paperEdgeMat,
        spreadMat,
        darkEdgeMat,
      ]);
      rightWing.position.set(0.82, 0, 0.14);
      rightWing.rotation.y = -0.22;
      bookGroup.add(rightWing);

      // Halo caligráfico rojo (Tamashii / Espíritu)
      const haloGeo = new THREE.TorusGeometry(1.75, 0.02, 16, 100);
      const haloMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C84B31'),
        roughness: 0.3,
        metalness: 0.6,
      });
      disposables.push(haloGeo, haloMat);
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.z = -0.25;
      bookGroup.add(halo);
    } else if (project.id === 'dolores') {
      // DOLORES VEINTIMILLA: Códice Patrimonial en Capas + Ondas Sonoras Doradas del EPUB
      const codexGroup = new THREE.Group();
      rootGroup.add(codexGroup);

      const pages = [
        { url: '/projects/dolores/page_1.jpg', x: -0.45, y: 0.08, z: 0.28, rotY: 0.16 },
        { url: '/projects/dolores/page_3.jpg', x: 0.48, y: -0.06, z: 0.02, rotY: -0.18 },
        { url: '/projects/dolores/page_4.jpg', x: 0.0, y: 0.0, z: -0.26, rotY: 0.02 },
      ];

      const folioGeo = new THREE.BoxGeometry(1.62, 2.24, 0.04);
      const goldEdge = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D4A373'),
        roughness: 0.3,
        metalness: 0.65,
      });
      disposables.push(folioGeo, goldEdge);

      pages.forEach((p) => {
        const faceMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#F5EFE6'),
          roughness: 0.35,
        });
        loadTex(p.url, (tex) => {
          faceMat.map = tex;
          faceMat.needsUpdate = true;
        });
        disposables.push(faceMat);

        const mesh = new THREE.Mesh(folioGeo, [
          goldEdge,
          goldEdge,
          goldEdge,
          goldEdge,
          faceMat,
          faceMat,
        ]);
        mesh.position.set(p.x, p.y, p.z);
        mesh.rotation.y = p.rotY;
        codexGroup.add(mesh);
      });

      // Anillos concéntricos de resonancia acústica (música de piano y narración del EPUB)
      [1.55, 1.85].forEach((radius, idx) => {
        const waveGeo = new THREE.TorusGeometry(radius, 0.015, 16, 96);
        const waveMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(idx === 0 ? '#D4A373' : '#8C3B2B'),
          roughness: 0.25,
          metalness: 0.7,
        });
        disposables.push(waveGeo, waveMat);
        const wave = new THREE.Mesh(waveGeo, waveMat);
        wave.rotation.x = 0.45 + idx * 0.25;
        wave.position.z = -0.35;
        codexGroup.add(wave);
      });
    } else if (project.id === 'ironwall') {
      // IRONWALL: Tarjeta de Presentación Corporativa 85×55mm Doble Cara (Anverso + Reverso QR)
      const cardGroup = new THREE.Group();
      rootGroup.add(cardGroup);

      // Proporción exacta 85mm x 55mm -> 2.72 x 1.76
      const cardGeo = new THREE.BoxGeometry(2.72, 1.76, 0.055);
      const goldTrimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F0AB00'),
        roughness: 0.22,
        metalness: 0.82,
      });
      const frontMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.28,
        metalness: 0.15,
      });
      const backMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.28,
        metalness: 0.15,
      });

      loadTex('/projects/ironwall/parte_frontalpng.png', (tex) => {
        frontMat.map = tex;
        frontMat.needsUpdate = true;
      });
      loadTex('/projects/ironwall/parte_trasera.png', (tex) => {
        backMat.map = tex;
        backMat.needsUpdate = true;
      });

      disposables.push(cardGeo, goldTrimMat, frontMat, backMat);

      const businessCard = new THREE.Mesh(cardGeo, [
        goldTrimMat,
        goldTrimMat,
        goldTrimMat,
        goldTrimMat,
        frontMat,
        backMat,
      ]);
      businessCard.rotation.set(0.08, -0.22, 0.03);
      cardGroup.add(businessCard);

      // Marco arquitectónico exterior en oro industrial (#F0AB00)
      const frameGeo = new THREE.RingGeometry(1.62, 1.65, 64);
      const frameMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#F0AB00'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      disposables.push(frameGeo, frameMat);
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.z = -0.35;
      cardGroup.add(frame);
    } else {
      // LEGIONFIT: Disco Olímpico de 45 lb / Medalla Deportiva en Acero Fundido (#1B3B7B & #E06D2B)
      const medalGroup = new THREE.Group();
      rootGroup.add(medalGroup);

      const discGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.18, 64);
      const castIronRimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1B3B7B'),
        roughness: 0.35,
        metalness: 0.72,
      });
      const frontPlateMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.32,
        metalness: 0.35,
      });
      const backBadgeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.3,
        metalness: 0.35,
      });

      loadTex('/projects/legionfit/plate_mockup.webp', (tex) => {
        frontPlateMat.map = tex;
        frontPlateMat.needsUpdate = true;
      });
      loadTex('/projects/legionfit/logo_badge.png', (tex) => {
        backBadgeMat.map = tex;
        backBadgeMat.needsUpdate = true;
      });

      disposables.push(discGeo, castIronRimMat, frontPlateMat, backBadgeMat);

      // En CylinderGeometry: [side, top, bottom] -> rotamos X 90° para que mire a cámara
      const discMesh = new THREE.Mesh(discGeo, [castIronRimMat, frontPlateMat, backBadgeMat]);
      discMesh.rotation.x = Math.PI / 2;
      medalGroup.add(discMesh);

      // Aro de energía naranja (#E06D2B del manual de marca LegionFit)
      const ringGeo = new THREE.TorusGeometry(1.66, 0.032, 20, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E06D2B'),
        roughness: 0.25,
        metalness: 0.65,
      });
      disposables.push(ringGeo, ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      medalGroup.add(ringMesh);
    }

    // Interacción táctil y de cursor sin bloquear el scroll vertical en móvil
    const interaction = {
      isDragging: false,
      startX: 0,
      startY: 0,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      const ny = -((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
      interaction.targetRotY = nx * 0.55;
      interaction.targetRotX = ny * 0.32;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!isVisible || !renderer) return;

      const t = clock.getElapsedTime();
      interaction.rotX += (interaction.targetRotX - interaction.rotX) * 0.08;
      interaction.rotY +=
        (interaction.targetRotY + flipTargetRef.current - interaction.rotY) * 0.08;

      if (!prefersReducedMotion) {
        rootGroup.position.y = Math.sin(t * 1.35) * 0.08;
        rootGroup.rotation.y = interaction.rotY + Math.sin(t * 0.65) * 0.22;
        rootGroup.rotation.x = interaction.rotX + Math.cos(t * 0.5) * 0.06;
      } else {
        rootGroup.rotation.y = flipTargetRef.current;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      disposables.forEach((d) => d.dispose());
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [project.id, project.color]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[290px] sm:h-[380px] lg:h-[420px] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Fallback visual inmediato (y soporte sin WebGL) con la pieza real */}
      {!webglReady && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="relative z-10 max-h-[240px] sm:max-h-[340px] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Botón interactivo para voltear anverso/reverso (especialmente útil en la tarjeta de IronWall y medalla LegionFit) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setFlipped((prev) => !prev);
        }}
        className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#C84B31] text-[#E8E4DC] hover:text-white border border-white/15 text-[10px] font-mono uppercase tracking-widest transition duration-200 backdrop-blur-md shadow-lg"
      >
        {flipped
          ? lang === 'es'
            ? '↺ Ver Anverso'
            : '↺ Front Side'
          : lang === 'es'
            ? '↻ Voltear Pieza'
            : '↻ Flip Piece'}
      </button>
    </div>
  );
};
