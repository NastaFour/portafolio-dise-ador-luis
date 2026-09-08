import React, { useEffect, useRef } from 'react';

interface JapaneseKanjiAmbientBackgroundProps {
  className?: string;
}

interface KanjiNode {
  char: string;
  romaji: string;
  meaning: string;
  x: number;
  y: number;
  z: number; // Factor de profundidad (0.2 a 1.2)
  size: number;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  vRot: number;
  vx: number;
  vy: number;
}

interface EmberParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedY: number;
  speedX: number;
}

export const JapaneseKanjiAmbientBackground: React.FC<JapaneseKanjiAmbientBackgroundProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Glifos conceptuales japoneses ligados al portafolio de Luis (Shibui, Ma, Wabi-Sabi, Raun/Prueba, Espíritu)
    const KANJI_DICTIONARY = [
      { char: '渋い', romaji: 'SHIBUI', meaning: 'Elegancia sobria' },
      { char: '間', romaji: 'MA', meaning: 'El vacío intencional' },
      { char: '侘寂', romaji: 'WABI-SABI', meaning: 'Belleza imperfecta' },
      { char: '魂', romaji: 'TAMASHII', meaning: 'Espíritu creador' },
      { char: '創造', romaji: 'SŌZŌ', meaning: 'Creación volumétrica' },
      { char: '道', romaji: 'DŌ', meaning: 'El camino del forjador' },
      { char: '形', romaji: 'KATA', meaning: 'Forma & estructura' },
      { char: '光影', romaji: 'KŌEI', meaning: 'Luz y sombra cinemática' },
    ];

    // Inicializar nodos flotantes de Kanji en espacio 2.5D
    const kanjiNodes: KanjiNode[] = KANJI_DICTIONARY.map((k, index) => {
      const z = 0.3 + Math.random() * 0.9;
      return {
        char: k.char,
        romaji: k.romaji,
        meaning: k.meaning,
        x: (index / KANJI_DICTIONARY.length) * width + (Math.random() * 80 - 40),
        y: Math.random() * height,
        z,
        size: (28 + Math.random() * 48) * z,
        opacity: 0.04 + z * 0.07,
        baseOpacity: 0.04 + z * 0.07,
        rotation: (Math.random() - 0.5) * 0.15,
        vRot: (Math.random() - 0.5) * 0.001,
        vx: (Math.random() - 0.5) * 0.25 * z,
        vy: -0.15 * z - Math.random() * 0.1,
      };
    });

    // Chispas de forja sutiles (alusivas al crisol de Raun)
    const embers: EmberParticle[] = Array.from({ length: 24 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.6,
      alpha: 0.08 + Math.random() * 0.2,
      speedY: -(0.3 + Math.random() * 0.6),
      speedX: (Math.random() - 0.5) * 0.3,
    }));

    // Interacción suave con el mouse
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let ensoAngle = 0;

    // Loop de renderizado cinemático
    const render = () => {
      // Suavizado del mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Dibujar el Círculo Zen Enso (円相) rotando lentamente en el fondo
      ensoAngle += 0.0008;
      const ensoCenterX = width * 0.85;
      const ensoCenterY = height * 0.5;
      const ensoRadius = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.translate(ensoCenterX, ensoCenterY);
      ctx.rotate(ensoAngle);
      ctx.beginPath();
      ctx.arc(0, 0, ensoRadius, 0.2, Math.PI * 1.85);
      ctx.strokeStyle = 'rgba(200, 75, 49, 0.035)';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Segundo anillo sutil exterior
      ctx.beginPath();
      ctx.arc(0, 0, ensoRadius * 1.22, 0.6, Math.PI * 1.6);
      ctx.strokeStyle = 'rgba(232, 228, 220, 0.02)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // 2. Renderizar y actualizar chispas de forja (Embers)
      embers.forEach((ember) => {
        ember.y += ember.speedY;
        ember.x += ember.speedX + Math.sin(ember.y * 0.02) * 0.2;

        if (ember.y < -10) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 75, 49, ${ember.alpha})`;
        ctx.fill();
      });

      // 3. Renderizar y actualizar caracteres Kanji en 3D Parallax
      const parallaxOffsetX = ((mouseX - width / 2) / width) * 45;
      const parallaxOffsetY = ((mouseY - height / 2) / height) * 30;

      kanjiNodes.forEach((node) => {
        // Movimiento flotante
        node.x += node.vx;
        node.y += node.vy;
        node.rotation += node.vRot;

        // Envoltura de bordes en bucle continuo
        if (node.y < -80) {
          node.y = height + 80;
          node.x = Math.random() * width;
        }
        if (node.x < -80) node.x = width + 80;
        if (node.x > width + 80) node.x = -80;

        const drawX = node.x - parallaxOffsetX * node.z;
        const drawY = node.y - parallaxOffsetY * node.z;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(node.rotation);

        // Tipografía Caligráfica Mincho / Serif
        ctx.font = `600 ${node.size}px "Cormorant Garamond", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Color bermellón Shibui con degradado de profundidad
        if (node.char === '渋い' || node.char === '魂' || node.char === '侘寂') {
          ctx.fillStyle = `rgba(200, 75, 49, ${node.opacity * 1.35})`;
        } else {
          ctx.fillStyle = `rgba(232, 228, 220, ${node.opacity})`;
        }

        ctx.fillText(node.char, 0, 0);

        // Subtítulo técnico en romaji
        ctx.font = `500 ${Math.max(9, node.size * 0.18)}px monospace`;
        ctx.fillStyle = `rgba(200, 75, 49, ${node.opacity * 0.8})`;
        ctx.fillText(`// ${node.romaji}`, 0, node.size * 0.65);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Velo de gradiente para fusionar con el fondo oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d] opacity-60 pointer-events-none" />
    </div>
  );
};

export default JapaneseKanjiAmbientBackground;
