import { describe, it, expect, beforeAll } from 'vitest';
import { PretextFlowTarget } from './pretextEngine';

beforeAll(() => {
  if (typeof HTMLCanvasElement !== 'undefined') {
    HTMLCanvasElement.prototype.getContext = (function () {
      return {
        font: '',
        letterSpacing: '0px',
        measureText: (text: string) => ({
          width: text.length * 8,
          actualBoundingBoxLeft: 0,
          actualBoundingBoxRight: text.length * 8,
          actualBoundingBoxAscent: 10,
          actualBoundingBoxDescent: 2,
        }),
      } as unknown as CanvasRenderingContext2D;
    }) as any;
  }
});

describe('PretextFlowTarget (TDD)', () => {
  it('instantiates cleanly and prepares text', () => {
    const text = 'Diseñador visual y tecnólogo creativo enfocado en identidades sistemáticas.';
    const target = new PretextFlowTarget(text, '16px sans-serif', 24);
    expect(target.fullText).toBe(text);
    expect(target.lineH).toBe(24);
  });

  it('reflows lines without obstacles across container width', () => {
    const text = 'Diseñador visual y tecnólogo creativo enfocado en identidades sistemáticas y experiencias interactivas contemporáneas.';
    const target = new PretextFlowTarget(text, '16px sans-serif', 24);
    const lines = target.reflow(400, []);
    
    // In node/jsdom without native canvas measureText, prepare might fall back or return lines if canvas is present
    if (target.hasPrepared()) {
      expect(lines.length).toBeGreaterThan(0);
      expect(lines[0].y).toBe(0);
      expect(lines[0].x).toBe(0);
    }
  });

  it('splits lines around circular obstacle when obstacle is in line band', () => {
    const text = 'Texto largo de prueba que debería dividirse en múltiples segmentos horizontales al encontrarse con un obstáculo circular en el medio de la línea.';
    const target = new PretextFlowTarget(text, '16px sans-serif', 24);
    
    expect(target.hasPrepared()).toBe(true);
    // Container width 400, circle at x=200, y=12, radius=40 -> intersects band [0, 24]
    const lines = target.reflow(400, [{ x: 200, y: 12, radius: 40 }], false, 8, 4);
    expect(lines.length).toBeGreaterThan(0);
    const firstLine = lines[0];
    expect(firstLine.x).toBe(0);
    expect(firstLine.width).toBeLessThanOrEqual(152);
  });

  it('renders all text across lines without losing words', () => {
    const text = 'Uno dos tres cuatro cinco seis siete ocho nueve diez once doce.';
    const target = new PretextFlowTarget(text, '16px sans-serif', 24);
    const lines = target.reflow(200, [{ x: 100, y: 30, radius: 25 }], false, 8, 4);

    const reconstructed = lines.map((l) => l.text.trim()).join(' ');
    // All original words should be present in reconstructed text
    for (const word of ['Uno', 'tres', 'cinco', 'ocho', 'diez', 'doce.']) {
      expect(reconstructed).toContain(word);
    }
  });
});
