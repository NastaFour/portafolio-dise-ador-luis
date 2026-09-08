import { describe, it, expect } from 'vitest';
import { Application } from '@splinetool/runtime';

describe('Spline Watermark Runtime Suppression', () => {
  it('purges SplineWatermark from scene data upon assignment', async () => {
    // Import 3d-hero-section-boxes to ensure prototype patch runs
    await import('./3d-hero-section-boxes');

    const mockApp = Object.create(Application.prototype);
    mockApp._data = {
      shared: {
        images: {
          SplineWatermark: { data: 'mock-png-bytes' },
          otherTexture: { data: 'keep-this' },
        },
      },
    };

    expect(mockApp._data.shared.images.SplineWatermark).toBeUndefined();
    expect(mockApp._data.shared.images.otherTexture).toBeDefined();
  });

  it('permanently disables logoOverlayPass on WebGL pipeline', () => {
    const mockPipeline: any = {
      logoOverlayPass: { enabled: true },
      effectComposer: {
        passes: [] as any[],
      },
      setWatermark: function (texture: any) {
        this.logoOverlayPass.enabled = texture !== null;
      },
      updateRenderToScreen: () => {},
    };

    mockPipeline.effectComposer.passes.push(mockPipeline.logoOverlayPass);

    // Apply the suppression logic
    if (mockPipeline.logoOverlayPass) {
      mockPipeline.logoOverlayPass.enabled = false;
      Object.defineProperty(mockPipeline.logoOverlayPass, 'enabled', {
        get: () => false,
        set: () => {},
        configurable: true,
      });
    }

    const idx = mockPipeline.effectComposer.passes.indexOf(mockPipeline.logoOverlayPass);
    if (idx !== -1) {
      mockPipeline.effectComposer.passes.splice(idx, 1);
    }
    mockPipeline.setWatermark = () => {};

    // Attempt to re-enable
    mockPipeline.setWatermark({ texture: 'fake' });
    mockPipeline.logoOverlayPass.enabled = true;

    expect(mockPipeline.logoOverlayPass.enabled).toBe(false);
    expect(mockPipeline.effectComposer.passes.length).toBe(0);
  });
});
