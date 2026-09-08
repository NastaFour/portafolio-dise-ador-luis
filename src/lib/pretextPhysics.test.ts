import { describe, it, expect } from 'vitest';
import {
  carveTextLineSlots,
  circleIntervalForBand,
  calculateNodePhysics,
  resolveCircleCollisions,
  calculateWordDeflection,
  type TextSlot,
  type PhysicsNode
} from './pretextPhysics';

describe('Pretext Physics & Typographic Exclusion Math (TDD)', () => {
  describe('circleIntervalForBand', () => {
    it('returns null when circle does not intersect vertical band', () => {
      // Circle at cy=100, radius=30. Band between 0 and 50.
      const interval = circleIntervalForBand(100, 100, 30, 0, 50, 0, 0);
      expect(interval).toBeNull();
    });

    it('calculates accurate horizontal exclusion interval when intersecting band center', () => {
      // Circle centered at cx=200, cy=100, radius=50. Band between 90 and 110.
      const interval = circleIntervalForBand(200, 100, 50, 90, 110, 10, 0);
      expect(interval).not.toBeNull();
      // At cy=100, dx should be radius=50, plus hPad=10 -> left = 140, right = 260
      expect(interval!.left).toBeCloseTo(140, 0);
      expect(interval!.right).toBeCloseTo(260, 0);
    });
  });

  describe('carveTextLineSlots', () => {
    it('returns original base slot when no blocked intervals exist', () => {
      const base: TextSlot = { left: 0, right: 800 };
      const slots = carveTextLineSlots(base, []);
      expect(slots).toEqual([{ left: 0, right: 800 }]);
    });

    it('splits a line into two slots when a circle blocks the center', () => {
      const base: TextSlot = { left: 0, right: 800 };
      const blocked = [{ left: 300, right: 500 }];
      const slots = carveTextLineSlots(base, blocked);

      expect(slots.length).toBe(2);
      expect(slots[0]).toEqual({ left: 0, right: 300 });
      expect(slots[1]).toEqual({ left: 500, right: 800 });
    });

    it('discards slots that are narrower than the minimum readable width (20px)', () => {
      const base: TextSlot = { left: 0, right: 100 };
      // Leaves 10px on the left (0 to 10) and 40px on the right (60 to 100)
      const blocked = [{ left: 10, right: 60 }];
      const slots = carveTextLineSlots(base, blocked);

      expect(slots.length).toBe(1);
      expect(slots[0]).toEqual({ left: 60, right: 100 });
    });
  });

  describe('calculateNodePhysics', () => {
    it('applies friction and velocity decay to moving nodes', () => {
      const node: PhysicsNode = {
        id: 'test',
        x: 100,
        y: 100,
        vx: 10,
        vy: 10,
        radius: 40,
        restX: 100,
        restY: 100,
        isDragging: false,
      };

      const updated = calculateNodePhysics(node, 800, 600, 0.9);
      expect(updated.vx).toBeLessThan(10);
      expect(updated.vy).toBeLessThan(10);
      expect(updated.x).toBeGreaterThan(100);
      expect(updated.y).toBeGreaterThan(100);
    });

    it('bounces node off container boundaries', () => {
      const node: PhysicsNode = {
        id: 'test',
        x: 790,
        y: 100,
        vx: 20, // Heading out of right boundary (800)
        vy: 0,
        radius: 20,
        restX: 100,
        restY: 100,
        isDragging: false,
      };

      const updated = calculateNodePhysics(node, 800, 600, 0.9);
      // Should reverse horizontal velocity
      expect(updated.vx).toBeLessThan(0);
      expect(updated.x).toBeLessThanOrEqual(800 - node.radius);
    });

    it('springs smoothly toward target and accumulates velocity when dragging', () => {
      const node: PhysicsNode = {
        id: 'test',
        x: 100,
        y: 100,
        vx: 0,
        vy: 0,
        radius: 30,
        restX: 100,
        restY: 100,
        isDragging: true,
        targetX: 200,
        targetY: 100,
      };

      const updated = calculateNodePhysics(node, 800, 600, 0.94, 0.7, 0.2);
      // Moves toward targetX (100 + (200-100)*0.2 = 120)
      expect(updated.x).toBeCloseTo(120, 1);
      // Velocity vx = 120 - 100 = 20
      expect(updated.vx).toBeCloseTo(20, 1);
    });
  });

  describe('resolveCircleCollisions', () => {
    it('pushes overlapping circles apart', () => {
      const nodeA: PhysicsNode = {
        id: 'a',
        x: 100,
        y: 100,
        vx: 0,
        vy: 0,
        radius: 30,
        restX: 100,
        restY: 100,
        isDragging: false,
      };
      const nodeB: PhysicsNode = {
        id: 'b',
        x: 120, // Distance is 20, but minDist is 30+30 = 60
        y: 100,
        vx: 0,
        vy: 0,
        radius: 30,
        restX: 120,
        restY: 100,
        isDragging: false,
      };

      const nodes = [nodeA, nodeB];
      resolveCircleCollisions(nodes);

      const dx = nodes[1].x - nodes[0].x;
      const dy = nodes[1].y - nodes[0].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      expect(dist).toBeGreaterThanOrEqual(59.9);
    });
  });

  describe('calculateWordDeflection', () => {
    it('returns zero deflection when word is far away from all nodes', () => {
      const nodes: PhysicsNode[] = [
        {
          id: '1',
          x: 100,
          y: 100,
          vx: 0,
          vy: 0,
          radius: 30,
          restX: 100,
          restY: 100,
          isDragging: false,
        },
      ];
      // Word at (300, 300) is far outside radius 30 + margin 24
      const deflection = calculateWordDeflection(300, 300, nodes, 24);
      expect(deflection.dx).toBe(0);
      expect(deflection.dy).toBe(0);
    });

    it('calculates repulsive deflection when word is within node threshold', () => {
      const nodes: PhysicsNode[] = [
        {
          id: '1',
          x: 100,
          y: 100,
          vx: 0,
          vy: 0,
          radius: 40,
          restX: 100,
          restY: 100,
          isDragging: false,
        },
      ];
      // Word is directly to the right of node center (x=130, y=100) -> distance 30 < 40 + 20
      const deflection = calculateWordDeflection(130, 100, nodes, 20);
      expect(deflection.dx).toBeGreaterThan(0); // Pushed right
      expect(deflection.dy).toBeCloseTo(0, 1);
    });
  });
});

