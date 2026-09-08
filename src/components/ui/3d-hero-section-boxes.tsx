import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

// Neutralización a nivel de runtime WebGL de Spline:
// 1. Eliminar 'SplineWatermark' del mapa de imágenes decodificadas antes de que el pipeline configure la textura.
if (typeof window !== 'undefined' && Application?.prototype) {
  try {
    Object.defineProperty(Application.prototype, '_data', {
      get() {
        return (this as any).__realSplineData;
      },
      set(val: any) {
        if (val?.shared?.images?.SplineWatermark) {
          delete val.shared.images.SplineWatermark;
        }
        (this as any).__realSplineData = val;
      },
      configurable: true,
    });

    const originalStart = Application.prototype.start;
    Application.prototype.start = async function (data: any, options: any) {
      const result = await originalStart.call(this, data, options);
      try {
        const app = this as any;
        if (app._renderer?.pipeline) {
          const p = app._renderer.pipeline;
          if (p.logoOverlayPass) {
            p.logoOverlayPass.enabled = false;
            Object.defineProperty(p.logoOverlayPass, 'enabled', {
              get: () => false,
              set: () => {},
              configurable: true,
            });
          }
          if (p.effectComposer?.passes) {
            const idx = p.effectComposer.passes.indexOf(p.logoOverlayPass);
            if (idx !== -1) {
              p.effectComposer.passes.splice(idx, 1);
            }
          }
          p.setWatermark = () => {};
          p.updateRenderToScreen?.();
        }
        const watermarkObj = app.findObjectByName?.('SplineWatermark');
        if (watermarkObj) {
          watermarkObj.visible = false;
          if (watermarkObj.scale) {
            watermarkObj.scale.x = 0;
            watermarkObj.scale.y = 0;
            watermarkObj.scale.z = 0;
          }
        }
      } catch (e) {
        // Ignorar fallbacks silenciosos
      }
      return result;
    };
  } catch (e) {
    console.warn('Spline runtime patch failed:', e);
  }
}

function HeroSplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<any>(null);

  const handleSplineLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    try {
      const isMobile =
        typeof window !== 'undefined' &&
        (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));

      // OPTIMIZACIÓN MÓVIL 1: Reducir pixelRatio a 1 (evita renderizar a resolución 3x retina innecesaria)
      // Esto disminuye en más del 70% la carga de cálculo de shaders en la GPU del teléfono.
      if (isMobile && splineApp?._renderer) {
        splineApp._renderer.setPixelRatio?.(1);
        if (splineApp._renderer.setSize && splineApp._canvas) {
          splineApp._renderer.setSize(
            splineApp._canvas.clientWidth,
            splineApp._canvas.clientHeight,
            false
          );
        }
      }

      // OPTIMIZACIÓN MÓVIL 2: En teléfonos, anular interacción en canvas para scroll nativo sin raycasting
      if (isMobile && splineApp?._canvas) {
        splineApp._canvas.style.pointerEvents = 'none';
        splineApp._canvas.style.touchAction = 'pan-y';
      }

      if (splineApp?._renderer?.pipeline) {
        const p = splineApp._renderer.pipeline;
        if (p.logoOverlayPass) {
          p.logoOverlayPass.enabled = false;
          Object.defineProperty(p.logoOverlayPass, 'enabled', {
            get: () => false,
            set: () => {},
            configurable: true,
          });
        }
        if (p.effectComposer?.passes) {
          const idx = p.effectComposer.passes.indexOf(p.logoOverlayPass);
          if (idx !== -1) {
            p.effectComposer.passes.splice(idx, 1);
          }
        }
        p.setWatermark = () => {};
        p.updateRenderToScreen?.();
      }
      const watermarkObj = splineApp.findObjectByName?.('SplineWatermark');
      if (watermarkObj) {
        watermarkObj.visible = false;
        if (watermarkObj.scale) {
          watermarkObj.scale.x = 0;
          watermarkObj.scale.y = 0;
          watermarkObj.scale.z = 0;
        }
      }
    } catch (err) {
      console.warn('Spline onLoad watermark suppression:', err);
    }
  };

  // OPTIMIZACIÓN MÓVIL 3: Pausar Spline cuando el Hero no esté visible en pantalla
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const app = splineAppRef.current;
        if (!app) return;
        if (!entry.isIntersecting) {
          try {
            app.stop?.();
          } catch {}
        } else {
          try {
            app.play?.();
          } catch {}
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const purgeWatermark = () => {
      // 1. Quitar enlaces y logos de Spline en el DOM estándar
      const elements = document.querySelectorAll(
        'a[href*="spline.design"], #spline, [class*="spline-watermark"], .spline-watermark, #spline-watermark, [aria-label*="Spline"], #logo'
      );
      elements.forEach((el) => el.remove());

      // 2. Revisar shadow roots de Web Components (spline-viewer)
      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach((v) => {
        if (v.shadowRoot) {
          const shadowEls = v.shadowRoot.querySelectorAll('a, #logo, [class*="watermark"]');
          shadowEls.forEach((el) => el.remove());
        }
      });
    };

    purgeWatermark();
    const interval = setInterval(purgeWatermark, 100);
    const observer = new MutationObserver(purgeWatermark);
    observer.observe(document.body, { childList: true, subtree: true });

    const timer = setTimeout(() => {
      clearInterval(interval);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] pointer-events-auto overflow-hidden spline-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      <Spline
        onLoad={handleSplineLoad}
        style={{
          width: '100%',
          height: '100dvh',
          pointerEvents: 'auto',
        }}
        scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
      />
      {/* Máscara de gradiente editorial cálido */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          background: `
            linear-gradient(to right, rgba(17, 17, 17, 0.9) 0%, rgba(17, 17, 17, 0.4) 40%, rgba(17, 17, 17, 0.4) 60%, rgba(17, 17, 17, 0.9) 100%),
            linear-gradient(to bottom, transparent 60%, rgba(17, 17, 17, 1) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Degradado inferior envolvente hacia el fondo de la página */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent pointer-events-none z-20"
      />

      {/* Tapa física opaca infalible en la esquina inferior derecha */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-72 h-24 pointer-events-none z-30"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, #111111 65%, rgba(17, 17, 17, 0.95) 85%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-52 h-16 bg-[#111111] pointer-events-none z-30"
      />
    </div>
  );
}

interface HeroContentProps {
  lang?: 'es' | 'en';
}

function HeroContent({ lang = 'es' }: HeroContentProps) {
  return (
    <div className="text-white px-4 sm:px-8 max-w-6xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center pt-24 pb-12 sm:py-16 gap-6 sm:gap-8">
      {/* Columna Izquierda con Foto y Nombre */}
      <div className="w-full lg:w-3/5">
        {/* Foto Perfil de Luis Bermúdez (Proporcional en móviles y desktop) */}
        <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#C84B31] shadow-[0_0_40px_rgba(200,75,49,0.35)] mb-4 sm:mb-8 transition-transform duration-500 hover:scale-105">
          <img
            src="/PERFIL.jpg"
            alt="Luis Bermúdez"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold font-display leading-[1.08] tracking-tight text-[#E8E4DC]">
          Luis Bermúdez
        </h1>

        <div className="text-[11px] sm:text-sm tracking-widest text-[#C84B31] font-semibold mt-3 sm:mt-4 uppercase">
          {lang === 'es'
            ? 'Animación 2D & 3D / Motion Graphics / Dirección de Arte / Editorial'
            : '2D & 3D Animation / Motion Graphics / Art Direction / Editorial'}
        </div>
      </div>

      {/* Columna Derecha: Manifiesto Corto & Acciones */}
      <div className="w-full lg:w-2/5 flex flex-col items-start lg:items-end lg:text-right">
        <p className="text-sm sm:text-lg text-neutral-300 opacity-90 mb-6 sm:mb-8 max-w-md font-sans leading-relaxed">
          {lang === 'es'
            ? 'Creando animaciones 2D/3D, piezas tridimensionales y narrativas visuales desde el orden, la mitología y la estética contemporánea.'
            : 'Crafting 2D/3D animations, volumetric forms, and visual narratives rooted in order, mythology, and contemporary aesthetics.'}
        </p>

        <div className="flex pointer-events-auto flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <a
            href="#contacto"
            className="border border-white/40 text-white font-medium py-3 px-6 sm:px-7 rounded-full transition duration-300 hover:bg-white hover:text-black text-center text-xs uppercase tracking-wider backdrop-blur-sm"
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
          const maxScroll = 450;
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
      {/* Contenedor Spline 3D de Altura Completa con soporte viewport dinámico */}
      <div className="relative h-[100dvh] min-h-[100dvh] w-full">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        <div
          ref={heroContentRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minHeight: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <HeroContent lang={lang} />
        </div>
      </div>
    </div>
  );
};

export { HeroSection };
export default HeroSection;
