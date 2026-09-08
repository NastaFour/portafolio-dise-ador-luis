/**
 * Pretext Physics & Typographic Exclusion Math
 * Motor matemático de cálculo de colisiones e intervalos de exclusión tipográfica para reflow a 60 FPS.
 */

export interface TextSlot {
  left: number;
  right: number;
}

export interface BlockedInterval {
  left: number;
  right: number;
}

export interface PhysicsNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  restX: number;
  restY: number;
  isDragging: boolean;
  targetX?: number;
  targetY?: number;
}

/**
 * Calcula el intervalo horizontal bloqueado por un círculo para una banda vertical dada [bandTop, bandBottom]
 */
export function circleIntervalForBand(
  cx: number,
  cy: number,
  r: number,
  bandTop: number,
  bandBottom: number,
  hPad: number = 14,
  vPad: number = 6
): BlockedInterval | null {
  const top = bandTop - vPad;
  const bottom = bandBottom + vPad;

  // Si el círculo no intersecta verticalmente con la banda
  if (top >= cy + r || bottom <= cy - r) {
    return null;
  }

  const minDy = cy >= top && cy <= bottom ? 0 : cy < top ? top - cy : cy - bottom;
  if (minDy >= r) {
    return null;
  }

  const maxDx = Math.sqrt(r * r - minDy * minDy);
  return {
    left: cx - maxDx - hPad,
    right: cx + maxDx + hPad,
  };
}

/**
 * Divide un slot base de texto horizontal en sub-slots legibles esquivando las regiones bloqueadas.
 */
export function carveTextLineSlots(
  base: TextSlot,
  blocked: BlockedInterval[],
  minSlotWidth: number = 20
): TextSlot[] {
  let slots: TextSlot[] = [base];

  for (let bi = 0; bi < blocked.length; bi++) {
    const iv = blocked[bi];
    const next: TextSlot[] = [];

    for (let si = 0; si < slots.length; si++) {
      const s = slots[si];
      if (iv.right <= s.left || iv.left >= s.right) {
        next.push(s);
        continue;
      }
      if (iv.left > s.left) {
        next.push({ left: s.left, right: iv.left });
      }
      if (iv.right < s.right) {
        next.push({ left: iv.right, right: s.right });
      }
    }
    slots = next;
  }

  return slots.filter((s) => s.right - s.left >= minSlotWidth);
}

/**
 * Resuelve colisiones elásticas entre círculos (nodos) para que no se traslapen ni se atraviesen.
 */
export function resolveCircleCollisions(nodes: PhysicsNode[]): void {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = a.radius + b.radius;

      if (dist < minDist && dist > 0) {
        const overlap = minDist - dist;
        const nx = dx / dist;
        const ny = dy / dist;

        const massA = a.isDragging ? 1000 : 1;
        const massB = b.isDragging ? 1000 : 1;
        const totalMass = massA + massB;

        if (!a.isDragging) {
          a.x -= nx * overlap * (massB / totalMass);
          a.y -= ny * overlap * (massB / totalMass);
          a.vx -= nx * 0.8;
          a.vy -= ny * 0.8;
        }
        if (!b.isDragging) {
          b.x += nx * overlap * (massA / totalMass);
          b.y += ny * overlap * (massA / totalMass);
          b.vx += nx * 0.8;
          b.vy += ny * 0.8;
        }
      }
    }
  }
}

/**
 * Simula la física de inercia, fricción y rebote elástico contra los bordes de la pantalla.
 */
export function calculateNodePhysics(
  node: PhysicsNode,
  containerWidth: number,
  containerHeight: number,
  friction: number = 0.94,
  bounce: number = 0.7,
  springK: number = 0.22
): PhysicsNode {
  if (node.isDragging) {
    const targetX = node.targetX ?? node.x;
    const targetY = node.targetY ?? node.y;
    const prevX = node.x;
    const prevY = node.y;
    const x = node.x + (targetX - node.x) * springK;
    const y = node.y + (targetY - node.y) * springK;
    const vx = x - prevX;
    const vy = y - prevY;
    return {
      ...node,
      x,
      y,
      vx,
      vy,
    };
  }

  let vx = node.vx * friction;
  let vy = node.vy * friction;

  // Umbral mínimo para detener micro-vibraciones
  if (Math.abs(vx) < 0.04) vx = 0;
  if (Math.abs(vy) < 0.04) vy = 0;

  let x = node.x + vx;
  let y = node.y + vy;

  const r = node.radius;

  // Rebote horizontal
  if (x - r < 0) {
    x = r;
    vx = -vx * bounce;
  } else if (x + r > containerWidth) {
    x = containerWidth - r;
    vx = -vx * bounce;
  }

  // Rebote vertical
  if (y - r < 0) {
    y = r;
    vy = -vy * bounce;
  } else if (y + r > containerHeight) {
    y = containerHeight - r;
    vy = -vy * bounce;
  }

  return {
    ...node,
    x,
    y,
    vx,
    vy,
  };
}

/**
 * Calcula el vector de deflexión elástica para una palabra o letra
 * en función de la cercanía con los nodos circulares flotantes.
 */
export function calculateWordDeflection(
  wordX: number,
  wordY: number,
  nodes: PhysicsNode[],
  margin: number = 24,
  maxPush: number = 40
): { dx: number; dy: number } {
  let totalDx = 0;
  let totalDy = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const dx = wordX - node.x;
    const dy = wordY - node.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = node.radius + margin;

    if (dist < threshold && threshold > 0) {
      const overlap = threshold - dist;
      const safeDist = dist === 0 ? 0.001 : dist;
      const nx = dx / safeDist;
      const ny = dy / safeDist;

      const push = Math.min(maxPush, overlap);
      totalDx += nx * push;
      totalDy += ny * push;
    }
  }

  return { dx: totalDx, dy: totalDy };
}
