import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from '@chenglou/pretext';
import {
  circleIntervalForBand,
  carveTextLineSlots,
  type BlockedInterval,
} from './pretextPhysics';

export interface ReflowLine {
  text: string;
  x: number;
  y: number;
  width: number;
}

export class PretextFlowTarget {
  private prepared: PreparedTextWithSegments | null = null;
  public fullText: string;
  public font: string;
  public lineH: number;
  public color: string = '#E5E5E5';

  constructor(fullText: string, font: string, lineH: number, color: string = '#E5E5E5') {
    this.fullText = fullText;
    this.font = font;
    this.lineH = lineH;
    this.color = color;
    this.prepare();
  }

  public prepare(): void {
    try {
      if (typeof window !== 'undefined' || typeof OffscreenCanvas !== 'undefined') {
        this.prepared = prepareWithSegments(this.fullText, this.font, {
          whiteSpace: 'pre-wrap',
        });
      }
    } catch (e) {
      console.warn('Pretext canvas measurement not available:', e);
      this.prepared = null;
    }
  }

  public hasPrepared(): boolean {
    return this.prepared !== null;
  }

  public reflow(
    containerW: number,
    obstacles: { x: number; y: number; radius: number }[],
    hasDropcap: boolean = false,
    hPad: number = 8,
    vPad: number = 3,
    dropcapWidth: number = 60
  ): ReflowLine[] {
    if (!this.prepared) {
      this.prepare();
    }
    if (!this.prepared || containerW < 60) return [];

    const lines: ReflowLine[] = [];
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineY = 0;
    let textDone = false;
    let safety = 0;

    while (!textDone && safety < 120) {
      safety++;
      const blocked: BlockedInterval[] = [];

      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const iv = circleIntervalForBand(
          obs.x,
          obs.y,
          obs.radius,
          lineY,
          lineY + this.lineH,
          hPad,
          vPad
        );
        if (iv !== null) {
          blocked.push(iv);
        }
      }

      // Dropcap exclusion at top-left
      if (hasDropcap && lineY < this.lineH * 1.8) {
        blocked.push({ left: 0, right: dropcapWidth });
      }

      const slots = carveTextLineSlots({ left: 0, right: containerW }, blocked);
      if (slots.length === 0) {
        lineY += this.lineH;
        continue;
      }

      slots.sort((a, b) => a.left - b.left);

      for (let si = 0; si < slots.length; si++) {
        const slot = slots[si];
        const slotWidth = slot.right - slot.left;
        if (slotWidth < 20) continue;

        const layoutResult = layoutNextLine(this.prepared, cursor, slotWidth);
        if (!layoutResult) {
          textDone = true;
          break;
        }

        lines.push({
          text: layoutResult.text,
          x: slot.left,
          y: lineY,
          width: layoutResult.width,
        });

        cursor = layoutResult.end;
      }

      lineY += this.lineH;
    }

    return lines;
  }
}
