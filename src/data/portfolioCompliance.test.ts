// @vitest-environment node
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  PORTFOLIO_PROJECTS,
  CREATIVE_DISCIPLINES,
  PHILOSOPHY_MANIFESTO,
  DISCIPLINE_NODES,
} from './portfolioData';

const ROOT_DIR = path.resolve(__dirname, '../..');

const FORBIDDEN_3D_PATTERNS = [
  /\b3d\b/i,
  /\bspline\b/i,
  /\bwebgl\b/i,
  /cinema\s*4d/i,
  /\bzbrush\b/i,
  /tridimensional/i,
  /2d\s*[\/&]\s*3d/i,
];

const FORBIDDEN_CV_ENTITIES = [
  /creativein/i,
  /tecniseguros/i,
  /filmpro/i,
  /banco\s+pichincha/i,
  /franklin\s+puenayan/i,
  /daniel\s+hermosa/i,
  /alisson\s+g[oó]mez/i,
];

describe('Portfolio Copy & Brand Compliance (S1 & S3)', () => {
  it('excludes all 3D / Spline / Cinema4D / zBrush mentions from portfolioData structures', () => {
    const serialized = JSON.stringify({
      PORTFOLIO_PROJECTS,
      CREATIVE_DISCIPLINES,
      PHILOSOPHY_MANIFESTO,
      DISCIPLINE_NODES,
    });

    for (const pattern of FORBIDDEN_3D_PATTERNS) {
      expect(serialized).not.toMatch(pattern);
    }
  });

  it('excludes 3D mentions from index.html metadata', () => {
    const html = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
    for (const pattern of FORBIDDEN_3D_PATTERNS) {
      expect(html).not.toMatch(pattern);
    }
  });

  it('excludes visible 3D mentions from Hero, About, and Contact components', () => {
    const heroFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/ui/3d-hero-section-boxes.tsx'),
      'utf-8'
    );
    const aboutFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/AboutSection.tsx'),
      'utf-8'
    );
    const contactFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/ContactSection.tsx'),
      'utf-8'
    );

    expect(heroFile).not.toMatch(/Animación 2D & 3D/i);
    expect(heroFile).not.toMatch(/2D & 3D Animation/i);
    expect(heroFile).not.toMatch(/2D\/3D/i);
    expect(heroFile).not.toMatch(/tridimensionales/i);
    expect(contactFile).not.toMatch(/2D\/3D/i);
    expect(aboutFile).not.toMatch(/2D\/3D/i);
  });

  it('keeps authorized endorsers (Kriss Ecuador, Minerva, ISTER) and excludes discarded CV entities', () => {
    const aboutFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/AboutSection.tsx'),
      'utf-8'
    );
    const contactFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/ContactSection.tsx'),
      'utf-8'
    );
    const combined = `${aboutFile}\n${contactFile}\n${JSON.stringify(PORTFOLIO_PROJECTS)}`;

    expect(combined).toMatch(/Kriss Ecuador/);
    expect(combined).toMatch(/Minerva/);
    expect(combined).toMatch(/ISTER/);

    for (const entityPattern of FORBIDDEN_CV_ENTITIES) {
      expect(combined).not.toMatch(entityPattern);
    }
  });

  it('links Instagram to https://www.instagram.com/krisecuador/', () => {
    const contactFile = fs.readFileSync(
      path.join(ROOT_DIR, 'src/components/ContactSection.tsx'),
      'utf-8'
    );
    expect(contactFile).toContain('https://www.instagram.com/krisecuador/');
  });
});
