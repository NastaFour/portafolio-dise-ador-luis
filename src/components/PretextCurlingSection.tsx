import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Sparkles, ExternalLink } from 'lucide-react';
import {
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

  const hoveredNodeIdRef = useRef<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Nodos de física gestionados vía Ref para 60 FPS bloqueados sin reconciliación de React en rAF
  const nodesRef = useRef<PhysicsNode[]>(
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
      isResetting: false,
    }))
  );
  const nodeDomRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Estado reactivo solo para el montaje inicial y recálculo por resize
  const [nodes, setNodes] = useState<PhysicsNode[]>(() => nodesRef.current);

  // Control estricto de arrastre con física spring, momentum y soporte táctil móvil
  const dragTrackingRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
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

  // Cache de dimensiones geométricas para erradicar el layout thrashing (cero getBoundingClientRect en rAF)
  const cachedLayoutRef = useRef<{
    w: number;
    h: number;
    p1OffsetLeft: number;
    p1OffsetTop: number;
    p1Width: number;
    p1Height: number;
    p2OffsetLeft: number;
    p2OffsetTop: number;
    p2Width: number;
    p2Height: number;
    valid: boolean;
  }>({
    w: 0,
    h: 0,
    p1OffsetLeft: 0,
    p1OffsetTop: 0,
    p1Width: 0,
    p1Height: 0,
    p2OffsetLeft: 0,
    p2OffsetTop: 0,
    p2Width: 0,
    p2Height: 0,
    valid: false,
  });

  const lastReflowPositionsRef = useRef<Array<{ x: number; y: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  const hasInitializedRef = useRef(false);
  const lastContainerWidthRef = useRef(0);
  const lastContainerHeightRef = useRef(0);
  const lastWindowWidthRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  const updateCachedLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    if (cRect.width < 60 || cRect.height < 60) return;

    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    const p1Rect = p1 ? p1.getBoundingClientRect() : null;
    const p2Rect = p2 ? p2.getBoundingClientRect() : null;

    cachedLayoutRef.current = {
      w: cRect.width,
      h: cRect.height,
      p1OffsetLeft: p1Rect ? p1Rect.left - cRect.left : 0,
      p1OffsetTop: p1Rect ? p1Rect.top - cRect.top : 0,
      p1Width: p1Rect ? p1Rect.width : 0,
      p1Height: p1Rect ? p1Rect.height : 0,
      p2OffsetLeft: p2Rect ? p2Rect.left - cRect.left : 0,
      p2OffsetTop: p2Rect ? p2Rect.top - cRect.top : 0,
      p2Width: p2Rect ? p2Rect.width : 0,
      p2Height: p2Rect ? p2Rect.height : 0,
      valid: true,
    };
  }, []);

  // Inicializar o adaptar posiciones de nodos relativas al contenedor.
  // En un redimensionamiento real (giro de móvil o resize de ventana), escala proporcionalmente
  // en lugar de reiniciar bruscamente a las posiciones de reposo originales.
  const initOrUpdatePositions = useCallback((isResize = false) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (w < 60 || h < 60) return;

    const prevW = lastContainerWidthRef.current || w;
    const prevH = lastContainerHeightRef.current || h;
    lastContainerWidthRef.current = w;
    lastContainerHeightRef.current = h;

    const isSmall = w < 640;
    // Escalar el radio de los nodos para que en móvil encajen con elegancia y proporción
    const radiusScale = isSmall ? Math.max(0.62, Math.min(0.85, w / 480)) : 1;

    // Si ya fueron inicializados y esto es un resize real (ancho cambió):
    // Preservar la posición actual de los nodos escalándolos proporcionalmente, sin tirones bruscos.
    if (hasInitializedRef.current && isResize) {
      const scaleX = prevW > 0 ? w / prevW : 1;
      const scaleY = prevH > 0 ? h / prevH : 1;

      const updatedNodes: PhysicsNode[] = nodesRef.current.map((node) => {
        const config = DISCIPLINE_NODES.find((d) => d.id === node.id);
        const scaledRadius = config ? Math.round(config.radius * radiusScale) : node.radius;

        let initXPercent = config ? config.initialX : 50;
        let initYPercent = config ? config.initialY : 50;

        if (isSmall && config) {
          switch (config.id) {
            case 'node-profile':
              initXPercent = 80;
              initYPercent = 14;
              break;
            case 'node-raun':
              initXPercent = 20;
              initYPercent = 34;
              break;
            case 'node-dolores':
              initXPercent = 80;
              initYPercent = 52;
              break;
            case 'node-ironwall':
              initXPercent = 20;
              initYPercent = 70;
              break;
            case 'node-legion':
              initXPercent = 80;
              initYPercent = 88;
              break;
          }
        }

        const newRestX = Math.max(
          scaledRadius + 6,
          Math.min(w - scaledRadius - 6, (initXPercent / 100) * w)
        );
        const newRestY = Math.max(
          scaledRadius + 6,
          Math.min(h - scaledRadius - 6, (initYPercent / 100) * h)
        );

        // Si el usuario está arrastrando este nodo, no interrumpir
        if (node.isDragging) {
          return {
            ...node,
            radius: scaledRadius,
            restX: newRestX,
            restY: newRestY,
          };
        }

        // Si el nodo está flotando, escalar su posición actual al nuevo tamaño de pantalla
        const newX = Math.max(
          scaledRadius + 6,
          Math.min(w - scaledRadius - 6, node.x * scaleX)
        );
        const newY = Math.max(
          scaledRadius + 6,
          Math.min(h - scaledRadius - 6, node.y * scaleY)
        );

        return {
          ...node,
          radius: scaledRadius,
          x: newX,
          y: newY,
          restX: newRestX,
          restY: newRestY,
          targetX: newX,
          targetY: newY,
        };
      });

      nodesRef.current = updatedNodes;
      setNodes(updatedNodes);

      for (let i = 0; i < updatedNodes.length; i++) {
        const n = updatedNodes[i];
        const el = nodeDomRefs.current[n.id];
        if (el) {
          el.style.transform = `translate3d(${(n.x - n.radius).toFixed(2)}px, ${(n.y - n.radius).toFixed(2)}px, 0)`;
        }
      }

      updateCachedLayout();
      return;
    }

    // Primera inicialización al montar el componente
    hasInitializedRef.current = true;
    const updatedNodes: PhysicsNode[] = nodesRef.current.map((node) => {
      const config = DISCIPLINE_NODES.find((d) => d.id === node.id);
      if (!config) return node;

      let initXPercent = config.initialX;
      let initYPercent = config.initialY;

      if (isSmall) {
        switch (config.id) {
          case 'node-profile':
            initXPercent = 80;
            initYPercent = 14;
            break;
          case 'node-raun':
            initXPercent = 20;
            initYPercent = 34;
            break;
          case 'node-dolores':
            initXPercent = 80;
            initYPercent = 52;
            break;
          case 'node-ironwall':
            initXPercent = 20;
            initYPercent = 70;
            break;
          case 'node-legion':
            initXPercent = 80;
            initYPercent = 88;
            break;
        }
      }

      const scaledRadius = Math.round(config.radius * radiusScale);
      const posX = Math.max(
        scaledRadius + 6,
        Math.min(w - scaledRadius - 6, (initXPercent / 100) * w)
      );
      const posY = Math.max(
        scaledRadius + 6,
        Math.min(h - scaledRadius - 6, (initYPercent / 100) * h)
      );

      return {
        ...node,
        radius: scaledRadius,
        x: posX,
        y: posY,
        restX: posX,
        restY: posY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        isDragging: false,
        isResetting: false,
      };
    });

    nodesRef.current = updatedNodes;
    setNodes(updatedNodes);

    // Posicionamiento inmediato directo en el DOM para evitar saltos o retrasos
    for (let i = 0; i < updatedNodes.length; i++) {
      const n = updatedNodes[i];
      const el = nodeDomRefs.current[n.id];
      if (el) {
        el.style.transform = `translate3d(${(n.x - n.radius).toFixed(2)}px, ${(n.y - n.radius).toFixed(2)}px, 0)`;
      }
    }

    updateCachedLayout();
    setTimeout(() => {
      setupPretextTargets();
      updateCachedLayout();
    }, 60);
  }, [setupPretextTargets, updateCachedLayout]);

  useEffect(() => {
    initOrUpdatePositions(false);
    lastWindowWidthRef.current = typeof window !== 'undefined' ? window.innerWidth : 0;

    const container = containerRef.current;
    let ro: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.round(entry.contentRect.width);
          const h = Math.round(entry.contentRect.height);
          if (w < 60 || h < 60) continue;

          // Ignorar cambios exclusivos de altura (generados por reflow de texto o barra móvil).
          // Solo adaptar posiciones si el ANCHO cambió significativamente (>= 6px).
          if (Math.abs(w - lastContainerWidthRef.current) >= 6) {
            initOrUpdatePositions(true);
          } else if (Math.abs(h - lastContainerHeightRef.current) >= 6) {
            // El texto se expandió o contrajo: solo actualizar dimensiones de colisión,
            // NUNCA reiniciar ni teletransportar los nodos.
            lastContainerHeightRef.current = h;
            updateCachedLayout();
          }
        }
      });
      ro.observe(container);
    }

    const handleWindowResize = () => {
      const winW = window.innerWidth;
      // En móvil, hacer scroll oculta/muestra la barra de direcciones y dispara resize en window,
      // pero window.innerWidth se mantiene idéntico. Filtramos esto para jamás reiniciar las físicas al hacer scroll.
      if (Math.abs(winW - lastWindowWidthRef.current) < 6) {
        return;
      }
      lastWindowWidthRef.current = winW;
      initOrUpdatePositions(true);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [initOrUpdatePositions, updateCachedLayout]);

  useEffect(() => {
    setupPretextTargets();
    updateCachedLayout();
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        setupPretextTargets();
        updateCachedLayout();
      });
    }
  }, [lang, setupPretextTargets, updateCachedLayout]);

  // Restablecer posiciones suavemente con física de retorno activa (nunca congela las físicas)
  const handleReset = useCallback(() => {
    setIsResetting(true);

    const currentNodes = nodesRef.current;
    for (let i = 0; i < currentNodes.length; i++) {
      const n = currentNodes[i];
      n.isDragging = false;
      n.isResetting = true;
      n.targetX = n.restX;
      n.targetY = n.restY;
    }

    dragTrackingRef.current = null;
    setHoveredNodeId(null);
    hoveredNodeIdRef.current = null;

    setTimeout(() => {
      setIsResetting(false);
    }, 800);
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

  // Control de visibilidad en viewport para pausar 100% el loop de físicas al hacer scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      isVisibleRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        setIsVisible(visible);
        if (visible) {
          updateCachedLayout();
        }
      },
      { rootMargin: '150px 0px 150px 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [updateCachedLayout]);

  // Función interna de Reflow Pretext ultra-optimizada (cero getBoundingClientRect ni getComputedStyle en el loop)
  const executeParagraphReflow = useCallback(
    (
      pEl: HTMLElement | null,
      overlayEl: HTMLElement | null,
      baseTextEl: HTMLElement | null,
      target: PretextFlowTarget | null,
      pool: HTMLSpanElement[],
      activeNodes: PhysicsNode[],
      offsetLeft: number,
      offsetTop: number,
      pWidth: number,
      pHeight: number,
      containerWidth: number,
      hasDropcap: boolean
    ) => {
      if (!pEl || !overlayEl || !baseTextEl || !target || pWidth < 50) return;

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
        const isSmall = containerWidth < 640;
        const hPad = isSmall ? 6 : 8;
        const vPad = isSmall ? 2 : 3;
        const dropcapW = isSmall ? 40 : 56;
        const minSlotWidth = isSmall ? Math.max(65, pWidth * 0.22) : 35;

        // Ceñido horizontal suave con padding y ancho de slot calibrado para móviles
        const lines = target.reflow(pWidth, obstacles, hasDropcap, hPad, vPad, dropcapW, minSlotWidth);
        if (lines.length > 0) {
          overlayEl.style.display = 'block';
          baseTextEl.style.opacity = '0';

          const color = target.color;
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
            const nextMin = `${Math.ceil(totalReflowHeight)}px`;
            if (pEl.style.minHeight !== nextMin) {
              pEl.style.minHeight = nextMin;
            }
          }
          return;
        }
      }

      // Si no hay obstáculos cerca, volver al texto base del navegador
      if (overlayEl.style.display !== 'none') {
        overlayEl.style.display = 'none';
        baseTextEl.style.opacity = '1';
        if (pEl.style.minHeight !== '') {
          pEl.style.minHeight = '';
        }
        for (let i = 0; i < pool.length; i++) {
          pool[i].style.display = 'none';
        }
      }
    },
    []
  );

  // Bucle de física a 60 FPS con colisiones circulares, retorno elástico y Pretext Line-Carving
  // Ultra-optimizado: solo se ejecuta cuando está visible y dirty-checking para evitar recalcular texto estático
  useEffect(() => {
    if (!isVisible) return;
    let animId: number;

    const updatePhysics = () => {
      if (!isVisibleRef.current) return;
      animId = requestAnimationFrame(updatePhysics);

      const layout = cachedLayoutRef.current;
      const w = layout.w;
      const h = layout.h;
      if (w < 60 || h < 60) return;

      const currentNodes = nodesRef.current;

      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];

        if (node.isDragging) {
          node.isResetting = false;
          const targetX = node.targetX ?? node.x;
          const targetY = node.targetY ?? node.y;
          const prevX = node.x;
          const prevY = node.y;

          // Seguimiento elástico inmediato al dedo/puntero
          node.x += (targetX - node.x) * 0.28;
          node.y += (targetY - node.y) * 0.28;
          node.vx = node.x - prevX;
          node.vy = node.y - prevY;

          // Delimitar dentro del contenedor
          const r = node.radius;
          node.x = Math.max(r + 4, Math.min(w - r - 4, node.x));
          node.y = Math.max(r + 4, Math.min(h - r - 4, node.y));
        } else if (node.isResetting) {
          // Retorno suave tipo resorte a su posición original (sin congelar físicas)
          const dx = node.restX - node.x;
          const dy = node.restY - node.y;
          node.vx = dx * 0.12;
          node.vy = dy * 0.12;
          node.x += node.vx;
          node.y += node.vy;

          if (Math.abs(dx) < 1.0 && Math.abs(dy) < 1.0) {
            node.x = node.restX;
            node.y = node.restY;
            // Preservar vida orgánica con deriva sutil al llegar
            node.vx = (Math.random() - 0.5) * 0.4;
            node.vy = (Math.random() - 0.5) * 0.4;
            node.isResetting = false;
          }
        } else {
          // Inercia, fricción y rebote en límites
          const friction = hoveredNodeIdRef.current === node.id ? 0.88 : 0.95;
          node.vx *= friction;
          node.vy *= friction;

          // Deriva sutil para mantener los círculos flotando orgánicamente
          if (Math.abs(node.vx) < 0.04 && Math.abs(node.vy) < 0.04) {
            node.vx += (Math.random() - 0.5) * 0.06;
            node.vy += (Math.random() - 0.5) * 0.06;
          }

          node.x += node.vx;
          node.y += node.vy;

          const r = node.radius;
          const bounce = 0.7;
          if (node.x - r < 4) {
            node.x = r + 4;
            node.vx = -node.vx * bounce;
          } else if (node.x + r > w - 4) {
            node.x = w - r - 4;
            node.vx = -node.vx * bounce;
          }

          if (node.y - r < 4) {
            node.y = r + 4;
            node.vy = -node.vy * bounce;
          } else if (node.y + r > h - 4) {
            node.y = h - r - 4;
            node.vy = -node.vy * bounce;
          }
        }
      }

      // Colisiones elásticas entre círculos para evitar solapamientos
      resolveCircleCollisions(currentNodes);

      // Actualización directa del DOM transform en 60 FPS sin reconciliación de React
      for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[i];
        const el = nodeDomRefs.current[node.id];
        if (el) {
          el.style.transform = `translate3d(${(node.x - node.radius).toFixed(2)}px, ${(node.y - node.radius).toFixed(2)}px, 0)`;
        }
      }

      // Dirty checking para reflow tipográfico: solo reflow cuando los nodos se hayan desplazado perceptiblemente
      let shouldReflow = false;
      const lastPositions = lastReflowPositionsRef.current;
      if (lastPositions.length !== currentNodes.length) {
        shouldReflow = true;
      } else {
        for (let i = 0; i < currentNodes.length; i++) {
          const n = currentNodes[i];
          if (n.isDragging || n.isResetting) {
            shouldReflow = true;
            break;
          }
          const prev = lastPositions[i];
          if (Math.abs(n.x - prev.x) > 0.6 || Math.abs(n.y - prev.y) > 0.6) {
            shouldReflow = true;
            break;
          }
        }
      }

      if (shouldReflow && layout.valid) {
        lastReflowPositionsRef.current = currentNodes.map((n) => ({ x: n.x, y: n.y }));

        // Pretext reflow horizontal ceñido al contorno con dimensiones cacheadas
        executeParagraphReflow(
          p1Ref.current,
          p1OverlayRef.current,
          p1BaseRef.current,
          p1TargetRef.current,
          p1PoolRef.current,
          currentNodes,
          layout.p1OffsetLeft,
          layout.p1OffsetTop,
          layout.p1Width,
          layout.p1Height,
          layout.w,
          true // hasDropcap
        );

        executeParagraphReflow(
          p2Ref.current,
          p2OverlayRef.current,
          p2BaseRef.current,
          p2TargetRef.current,
          p2PoolRef.current,
          currentNodes,
          layout.p2OffsetLeft,
          layout.p2OffsetTop,
          layout.p2Width,
          layout.p2Height,
          layout.w,
          false // hasDropcap = false
        );
      }
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, executeParagraphReflow]);

  // Inicio de Arrastre con Pointer Events (Touch móvil y Ratón unificados)
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Safe ignore
    }

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const node = nodesRef.current.find((n) => n.id === id);
    if (!node) return;

    dragTrackingRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: px - node.x,
      offsetY: py - node.y,
      hasDragged: false,
    };

    node.isDragging = true;
    node.isResetting = false;
    node.targetX = node.x;
    node.targetY = node.y;
    node.vx = 0;
    node.vy = 0;
  };

  // Movimiento de Arrastre fluido
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragTrackingRef.current || !containerRef.current) return;

    const moveDist = Math.hypot(
      e.clientX - dragTrackingRef.current.startX,
      e.clientY - dragTrackingRef.current.startY
    );
    if (moveDist > 4) {
      dragTrackingRef.current.hasDragged = true;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const node = nodesRef.current.find((n) => n.id === dragTrackingRef.current?.id);
    if (node && node.isDragging) {
      const r = node.radius;
      const w = rect.width;
      const h = rect.height;
      node.targetX = Math.max(r + 4, Math.min(w - r - 4, px - dragTrackingRef.current.offsetX));
      node.targetY = Math.max(r + 4, Math.min(h - r - 4, py - dragTrackingRef.current.offsetY));
    }
  };

  // Fin de Arrastre con liberación de momentum
  const handlePointerUp = (e?: React.PointerEvent) => {
    if (e) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe ignore
      }
    }
    if (!dragTrackingRef.current) return;
    const dragId = dragTrackingRef.current.id;
    const node = nodesRef.current.find((n) => n.id === dragId);
    if (node) {
      node.isDragging = false;
      // Amplificar la velocidad capturada en el spring tick para un deslizamiento fluido con inercia
      node.vx = node.vx * 1.6;
      node.vy = node.vy * 1.6;
    }

    // Mantener hasDragged durante 120ms para bloquear disparos accidentales de onClick
    setTimeout(() => {
      if (dragTrackingRef.current) {
        dragTrackingRef.current.hasDragged = false;
        dragTrackingRef.current = null;
      }
    }, 120);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    handlePointerUp(e);
  };

  const handleHoverChange = (id: string | null) => {
    setHoveredNodeId(id);
    hoveredNodeIdRef.current = id;
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
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: 'pan-y' }}
          className="relative min-h-[38rem] sm:min-h-[36rem] md:min-h-[36rem] rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-4 sm:p-8 md:p-12 backdrop-blur-xl overflow-hidden shadow-2xl select-none"
        >
          {/* Texto del Manifiesto Editorial con Reflow Pretext */}
          <div
            ref={textContainerRef}
            className="relative z-10 max-w-3xl space-y-5 sm:space-y-6 pointer-events-none"
          >
            {/* Párrafo 1 con Letra Capital */}
            <p
              ref={p1Ref}
              className="relative text-base sm:text-xl md:text-2xl text-neutral-200 font-display leading-relaxed"
            >
              <span className="dropcap__letter float-left text-4xl sm:text-6xl font-bold font-display text-[#C84B31] leading-none pr-2.5 sm:pr-3 pt-1 select-none">
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
              className="relative text-sm sm:text-lg text-neutral-400 font-sans leading-relaxed"
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
            <div className="pt-3 sm:pt-4 text-xs tracking-wider text-neutral-500 uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C84B31]/70 animate-pulse" />
              {manifesto.hint}
            </div>
          </div>

          {/* Nodos Circulares Interactivos Flotantes (Visibles e Interactivos en Móvil y Desktop) */}
          {nodes.map((node) => {
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
                ref={(el) => {
                  nodeDomRefs.current[node.id] = el;
                }}
                onPointerDown={(e) => handlePointerDown(node.id, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onMouseEnter={() => handleHoverChange(node.id)}
                onMouseLeave={() => handleHoverChange(null)}
                onClick={() => handleNodeClick(project)}
                onDoubleClick={() => {
                  if (project) onSelectProject(project);
                }}
                style={{
                  touchAction: 'none',
                  transform: `translate3d(${node.x - node.radius}px, ${node.y - node.radius}px, 0)`,
                  width: `${node.radius * 2}px`,
                  height: `${node.radius * 2}px`,
                  transition: 'box-shadow 0.2s ease',
                }}
                className={`group absolute top-0 left-0 rounded-full cursor-grab active:cursor-grabbing z-20 select-none shadow-2xl ${
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
                  <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 px-1 sm:px-2 flex flex-col items-center text-center pointer-events-none">
                    <span className="text-[9px] sm:text-[11px] font-bold text-white tracking-tight drop-shadow line-clamp-1">
                      {info.name[lang]}
                    </span>
                    {info.year && (
                      <span className="text-[7px] sm:text-[9px] text-neutral-300 font-mono font-medium tracking-wider">
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
      </div>
    </section>
  );
};

export default PretextCurlingSection;
