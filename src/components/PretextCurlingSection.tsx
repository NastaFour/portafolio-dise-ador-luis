import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Sparkles, ExternalLink } from 'lucide-react';
import {
  calculateNodePhysics,
  resolveCircleCollisions,
  type PhysicsNode,
} from '@/lib/pretextPhysics';
import { PretextFlowTarget } from '@/lib/pretextEngine';
import {
  DISCIPLINE_NODES,
  PHILOSOPHY_MANIFESTO,
  PORTFOLIO_PROJECTS,
  type Project,
} from '@/data/portfolioData';

interface PretextCurlingSectionProps {
  lang: 'es' | 'en';
  onSelectProject: (project: Project) => void;
}

export const PretextCurlingSection: React.FC<PretextCurlingSectionProps> = ({
  lang,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p1OverlayRef = useRef<HTMLDivElement>(null);
  const p2OverlayRef = useRef<HTMLDivElement>(null);
  const p1BaseRef = useRef<HTMLSpanElement>(null);
  const p2BaseRef = useRef<HTMLSpanElement>(null);

  const p1TargetRef = useRef<PretextFlowTarget | null>(null);
  const p2TargetRef = useRef<PretextFlowTarget | null>(null);
  const p1PoolRef = useRef<HTMLSpanElement[]>([]);
  const p2PoolRef = useRef<HTMLSpanElement[]>([]);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Estado de los nodos físicos interactivos
  const [nodes, setNodes] = useState<PhysicsNode[]>(() =>
    DISCIPLINE_NODES.map((d) => ({
      id: d.id,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: d.radius,
      restX: 0,
      restY: 0,
      isDragging: false,
    }))
  );

  // Control estricto de arrastre con física spring y momentum
  const dragTrackingRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    hasDragged: boolean;
  } | null>(null);

  const manifesto = PHILOSOPHY_MANIFESTO[lang];
  const dropcapLetter = manifesto.paragraph1[0] || 'P';
  const p1RemainingText = manifesto.paragraph1.slice(1);
  const p2FullText = manifesto.paragraph2;

  // Preparar y cachear targets de medición Pretext
  const setupPretextTargets = useCallback(() => {
    if (!p1Ref.current || !p2Ref.current) return;

    try {
      const s1 = window.getComputedStyle(p1Ref.current);
      const font1 = `${s1.fontWeight} ${s1.fontSize} ${s1.fontFamily}`;
      const lh1 = parseFloat(s1.lineHeight) || parseFloat(s1.fontSize) * 1.6;
      p1TargetRef.current = new PretextFlowTarget(p1RemainingText, font1, lh1, s1.color);

      const s2 = window.getComputedStyle(p2Ref.current);
      const font2 = `${s2.fontWeight} ${s2.fontSize} ${s2.fontFamily}`;
      const lh2 = parseFloat(s2.lineHeight) || parseFloat(s2.fontSize) * 1.6;
      p2TargetRef.current = new PretextFlowTarget(p2FullText, font2, lh2, s2.color);
    } catch (err) {
      console.warn('Error configurando Pretext targets:', err);
    }
  }, [p1RemainingText, p2FullText]);

  // Inicializar posiciones de nodos relativas al contenedor
  const initPositions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    setIsMobile(w < 768);

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const config = DISCIPLINE_NODES.find((d) => d.id === node.id);
        if (!config) return node;

        const posX = (config.initialX / 100) * w;
        const posY = (config.initialY / 100) * h;

        return {
          ...node,
          x: posX,
          y: posY,
          restX: posX,
          restY: posY,
          vx: 0,
          vy: 0,
        };
      })
    );

    setTimeout(setupPretextTargets, 60);
  }, [setupPretextTargets]);

  useEffect(() => {
    initPositions();
    window.addEventListener('resize', initPositions);
    return () => window.removeEventListener('resize', initPositions);
  }, [initPositions]);

  useEffect(() => {
    setupPretextTargets();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        setupPretextTargets();
      });
    }
  }, [lang, setupPretextTargets]);

  // Restablecer posiciones y tipografía
  const handleReset = useCallback(() => {
    setIsResetting(true);
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        x: n.restX,
        y: n.restY,
        vx: 0,
        vy: 0,
        isDragging: false,
      }))
    );

    // Ocultar overlays de Pretext y restaurar texto base
    if (p1OverlayRef.current) p1OverlayRef.current.style.display = 'none';
    if (p2OverlayRef.current) p2OverlayRef.current.style.display = 'none';
    if (p1BaseRef.current) p1BaseRef.current.style.opacity = '1';
    if (p2BaseRef.current) p2BaseRef.current.style.opacity = '1';
    if (p1Ref.current) p1Ref.current.style.minHeight = '';
    if (p2Ref.current) p2Ref.current.style.minHeight = '';

    dragTrackingRef.current = null;
    setHoveredNodeId(null);
    setTimeout(() => setIsResetting(false), 600);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  // Función interna de Reflow Pretext para un párrafo
  const executeParagraphReflow = useCallback(
    (
      pEl: HTMLElement | null,
      overlayEl: HTMLElement | null,
      baseTextEl: HTMLElement | null,
      target: PretextFlowTarget | null,
      pool: HTMLSpanElement[],
      activeNodes: PhysicsNode[],
      containerRect: DOMRect,
      hasDropcap: boolean
    ) => {
      if (!pEl || !overlayEl || !baseTextEl || !target) return;

      const pRect = pEl.getBoundingClientRect();
      const offsetLeft = pRect.left - containerRect.left;
      const offsetTop = pRect.top - containerRect.top;
      const pWidth = pRect.width;
      const pHeight = pRect.height;

      // Filtrar nodos que intersectan o están adyacentes al párrafo
      const obstacles: { x: number; y: number; radius: number }[] = [];
      for (let i = 0; i < activeNodes.length; i++) {
        const n = activeNodes[i];
        const localX = n.x - offsetLeft;
        const localY = n.y - offsetTop;
        const r = n.radius;

        // ¿El círculo solapa o está a menos de 10px del bounding box del párrafo?
        if (
          localX + r > -10 &&
          localX - r < pWidth + 10 &&
          localY + r > -10 &&
          localY - r < pHeight + 20
        ) {
          obstacles.push({ x: localX, y: localY, radius: r });
        }
      }

      if (obstacles.length > 0) {
        // Ceñido horizontal suave (hPad: 8px, vPad: 3px) "pegado al círculo"
        const lines = target.reflow(pWidth, obstacles, hasDropcap, 8, 3, 56);
        if (lines.length > 0) {
          overlayEl.style.display = 'block';
          baseTextEl.style.opacity = '0';

          const s = window.getComputedStyle(pEl);
          const color = target.color || s.color;
          const font = target.font;
          const lineH = `${target.lineH}px`;

          // Asegurar suficientes spans en el pool
          while (pool.length < lines.length) {
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.whiteSpace = 'pre';
            span.style.pointerEvents = 'none';
            span.style.willChange = 'transform';
            overlayEl.appendChild(span);
            pool.push(span);
          }

          // Posicionar cada línea de texto ceñida alrededor del contorno
          for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            const span = pool[i];
            span.textContent = l.text;
            span.style.left = `${l.x.toFixed(1)}px`;
            span.style.top = `${l.y.toFixed(1)}px`;
            span.style.font = font;
            span.style.color = color;
            span.style.lineHeight = lineH;
            span.style.display = 'block';
          }

          // Ocultar spans sobrantes
          for (let i = lines.length; i < pool.length; i++) {
            pool[i].style.display = 'none';
          }

          // Adaptar altura mínima si el texto reflowed necesita más líneas
          const totalReflowHeight = lines[lines.length - 1].y + target.lineH;
          if (totalReflowHeight > pHeight) {
            pEl.style.minHeight = `${Math.ceil(totalReflowHeight)}px`;
          }
          return;
        }
      }

      // Si no hay obstáculos cerca, volver al texto base del navegador
      if (overlayEl.style.display !== 'none') {
        overlayEl.style.display = 'none';
        baseTextEl.style.opacity = '1';
        pEl.style.minHeight = '';
        for (let i = 0; i < pool.length; i++) {
          pool[i].style.display = 'none';
        }
      }
    },
    []
  );

  // Bucle de física a 60 FPS con colisiones circulares y Pretext Line-Carving
  useEffect(() => {
    if (isMobile) return;

    let animId: number;

    const updatePhysics = () => {
      if (!containerRef.current || isResetting) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const w = containerRect.width;
      const h = containerRect.height;

      setNodes((prevNodes) => {
        // 1. Simulación de inercia y rebote en límites (con spring drag para nodos activos)
        const updated = prevNodes.map((node) => {
          const friction = hoveredNodeId === node.id ? 0.82 : 0.94;
          return calculateNodePhysics(node, w, h, friction, 0.7, 0.22);
        });

        // 2. Colisiones elásticas entre círculos para evitar solapamientos
        resolveCircleCollisions(updated);

        // 3. Pretext reflow horizontal ceñido al perímetro de los círculos
        executeParagraphReflow(
          p1Ref.current,
          p1OverlayRef.current,
          p1BaseRef.current,
          p1TargetRef.current,
          p1PoolRef.current,
          updated,
          containerRect,
          true // hasDropcap
        );

        executeParagraphReflow(
          p2Ref.current,
          p2OverlayRef.current,
          p2BaseRef.current,
          p2TargetRef.current,
          p2PoolRef.current,
          updated,
          containerRect,
          false // hasDropcap = false
        );

        return updated;
      });

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isMobile, isResetting, hoveredNodeId, executeParagraphReflow]);

  // Inicio de Arrastre con Pointer Events
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    if (isMobile) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const targetNode = nodes.find((n) => n.id === id);
    if (!targetNode || !containerRef.current) return;

    dragTrackingRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      originX: targetNode.x,
      originY: targetNode.y,
      hasDragged: false,
    };

    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              isDragging: true,
              targetX: n.x,
              targetY: n.y,
              vx: 0,
              vy: 0,
            }
          : n
      )
    );
  };

  // Movimiento de Arrastre fluido
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragTrackingRef.current || !containerRef.current) return;

    // Detectar si realmente se ha desplazado más de 5 píxeles (umbral de arrastre)
    const moveDist = Math.hypot(
      e.clientX - dragTrackingRef.current.startX,
      e.clientY - dragTrackingRef.current.startY
    );
    if (moveDist > 5) {
      dragTrackingRef.current.hasDragged = true;
    }

    const dx = e.clientX - dragTrackingRef.current.startX;
    const dy = e.clientY - dragTrackingRef.current.startY;
    const newTargetX = dragTrackingRef.current.originX + dx;
    const newTargetY = dragTrackingRef.current.originY + dy;

    // Solo actualizamos targetX y targetY; calculateNodePhysics mueve x, y suavemente vía spring en rAF
    setNodes((prev) =>
      prev.map((n) =>
        n.id === dragTrackingRef.current?.id
          ? { ...n, targetX: newTargetX, targetY: newTargetY }
          : n
      )
    );
  };

  // Fin de Arrastre con liberación de momentum
  const handlePointerUp = () => {
    if (!dragTrackingRef.current) return;
    const dragId = dragTrackingRef.current.id;

    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === dragId) {
          // Amplificar la velocidad capturada en el spring tick para un deslizamiento fluido con inercia
          return {
            ...n,
            isDragging: false,
            vx: n.vx * 1.8,
            vy: n.vy * 1.8,
          };
        }
        return n;
      })
    );

    // Mantener hasDragged durante 120ms para bloquear disparos accidentales de onClick
    setTimeout(() => {
      if (dragTrackingRef.current) {
        dragTrackingRef.current.hasDragged = false;
        dragTrackingRef.current = null;
      }
    }, 120);
  };

  // Manejador exclusivo de Clic intencional (ignora arrastres)
  const handleNodeClick = (project: Project | null | undefined) => {
    if (dragTrackingRef.current?.hasDragged) {
      return;
    }
    if (project) {
      onSelectProject(project);
    }
  };

  return (
    <section
      id="manifiesto"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#141414] border-t border-b border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C84B31] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {manifesto.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#E8E4DC] tracking-tight">
              {manifesto.title}
            </h2>
          </div>

          {/* Botón flotante de reinicio de físicas */}
          <button
            onClick={handleReset}
            title={lang === 'es' ? 'Restablecer posiciones (Esc)' : 'Reset positions (Esc)'}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs uppercase tracking-wider transition duration-300 w-fit backdrop-blur-sm shadow-lg active:scale-95"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>{lang === 'es' ? 'Restablecer' : 'Reset'}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-neutral-400">
              Esc
            </kbd>
          </button>
        </div>

        {/* Contenedor Interactivo con Físicas y Exclusión Textual Pretext */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative min-h-[20rem] md:min-h-[36rem] rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-5 sm:p-8 md:p-12 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Texto del Manifiesto Editorial con Reflow Pretext */}
          <div
            ref={textContainerRef}
            className="relative z-10 max-w-3xl space-y-6 pointer-events-none"
          >
            {/* Párrafo 1 con Letra Capital */}
            <p
              ref={p1Ref}
              className="relative text-lg sm:text-xl md:text-2xl text-neutral-200 font-display leading-relaxed"
            >
              <span className="dropcap__letter float-left text-5xl sm:text-6xl font-bold font-display text-[#C84B31] leading-none pr-3 pt-1 select-none">
                {dropcapLetter}
              </span>
              <span ref={p1BaseRef} className="select-none transition-opacity duration-150">
                {p1RemainingText}
              </span>
              <div
                ref={p1OverlayRef}
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{ display: 'none' }}
              />
            </p>

            {/* Párrafo 2 con Reflow Pretext */}
            <p
              ref={p2Ref}
              className="relative text-base sm:text-lg text-neutral-400 font-sans leading-relaxed"
            >
              <span ref={p2BaseRef} className="select-none transition-opacity duration-150">
                {p2FullText}
              </span>
              <div
                ref={p2OverlayRef}
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{ display: 'none' }}
              />
            </p>

            {/* Indicador de Interacción */}
            <div className="pt-4 text-xs tracking-wider text-neutral-500 uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C84B31]/70 animate-pulse" />
              {manifesto.hint}
            </div>
          </div>

          {/* Nodos Circulares Interactivos Flotantes con Logos y Obras Reales */}
          {!isMobile &&
            nodes.map((node) => {
              const info = DISCIPLINE_NODES.find((d) => d.id === node.id);
              if (!info) return null;

              const isHovered = hoveredNodeId === node.id;
              const isProject = info.category === 'project';
              const project = isProject
                ? PORTFOLIO_PROJECTS.find((p) => p.id === info.projectId)
                : null;

              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => handlePointerDown(node.id, e)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => handleNodeClick(project)}
                  onDoubleClick={() => {
                    if (project) onSelectProject(project);
                  }}
                  style={{
                    transform: `translate3d(${node.x - node.radius}px, ${node.y - node.radius}px, 0)`,
                    width: `${node.radius * 2}px`,
                    height: `${node.radius * 2}px`,
                    transition: isResetting
                      ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                      : 'box-shadow 0.2s ease',
                  }}
                  className={`group absolute top-0 left-0 rounded-full cursor-grab active:cursor-grabbing z-20 select-none shadow-2xl transition-transform ${
                    isHovered ? 'scale-105 z-30' : ''
                  }`}
                >
                  {/* Contenedor Circular con Imagen Real y Borde de Color */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden border-2 shadow-2xl transition-colors duration-300"
                    style={{
                      borderColor: isHovered ? '#C84B31' : `${info.color}88`,
                      boxShadow: isHovered
                        ? `0 0 25px ${info.color}66, 0 10px 30px rgba(0,0,0,0.8)`
                        : '0 8px 24px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* Imagen / Logo Real del Proyecto */}
                    <img
                      src={info.image}
                      alt={info.name[lang]}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                      draggable={false}
                    />

                    {/* Máscara de gradiente editorial para legibilidad del título */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                    {/* Titular y año del proyecto al pie del nodo */}
                    <div className="absolute bottom-2 left-0 right-0 px-2 flex flex-col items-center text-center pointer-events-none">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-tight drop-shadow line-clamp-1">
                        {info.name[lang]}
                      </span>
                      {info.year && (
                        <span className="text-[8px] sm:text-[9px] text-neutral-300 font-mono font-medium tracking-wider">
                          {info.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Micro-tooltip flotante en Hover */}
                  {isHovered && isProject && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-900/95 border border-white/20 rounded-full text-[10px] text-white whitespace-nowrap shadow-2xl backdrop-blur-md flex items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in-95">
                      <span>{lang === 'es' ? 'Clic para ver caso' : 'Click to inspect'}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#C84B31]" />
                    </div>
                  )}

                  {/* Tooltip de Luis Autor */}
                  {isHovered && !isProject && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-neutral-900/95 border border-[#C84B31]/40 rounded-full text-[10px] text-white whitespace-nowrap shadow-2xl backdrop-blur-md flex items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in-95">
                      <span>Luis Bermúdez • Autor</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Fallback de Nodos para Móvil (<768px) */}
        {isMobile && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
            {DISCIPLINE_NODES.map((d) => {
              const isProject = d.category === 'project';
              const project = isProject
                ? PORTFOLIO_PROJECTS.find((p) => p.id === d.projectId)
                : null;

              return (
                <button
                  key={d.id}
                  onClick={() => project && onSelectProject(project)}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 text-left hover:border-[#C84B31]/50 transition group min-w-0"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <img
                      src={d.image}
                      alt={d.name[lang]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-semibold text-white block group-hover:text-[#C84B31] truncate">
                      {d.name[lang]}
                    </span>
                    {d.year && (
                      <span className="text-[10px] text-neutral-400 font-mono block">
                        {d.year}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PretextCurlingSection;
