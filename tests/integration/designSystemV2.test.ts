import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { FRONT_IMAGES, PRIMARY_ARCHITECTURAL_IMAGE, SECONDARY_ARCHITECTURAL_IMAGE } from '../../src/shared/media/frontImages.ts';

describe('Design System V2 — Paleta Obsidiana/Osso/Laranja, Padrões Tequs/Imagica & Fotografia Real', () => {
  it('define exatamente os tokens OKLCH + HCT da paleta industrial em global.css', () => {
    const globalCss = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');

    assert.ok(globalCss.includes('--theme-background: oklch(11% 0.008 260);'), 'Fundo Base Obsidiana Frio ausente');
    assert.ok(globalCss.includes('--theme-surface-container: oklch(14% 0.008 260);'), 'Superfície Secundária 14% ausente');
    assert.ok(globalCss.includes('--theme-outline-variant: oklch(22% 0.01 260);'), 'Borda Técnica 22% ausente');
    assert.ok(globalCss.includes('--theme-on-surface: oklch(95% 0.008 85);'), 'Texto Branco-Osso Quente 95% ausente');
    assert.ok(globalCss.includes('--theme-on-surface-variant: oklch(60% 0.01 260);'), 'Texto Secundário Cinza Técnico 60% ausente');
    assert.ok(globalCss.includes('--theme-primary: oklch(68% 0.18 45);'), 'Cor de Acento Laranja Sinalizador 68% ausente');
  });

  it('sincroniza fotografias reais de "Imagens para front" e expõe caminhos válidos com otimização AVIF e WebP', () => {
    assert.ok(FRONT_IMAGES.length >= 2, 'Deve haver pelo menos 2 imagens reais sincronizadas');
    assert.ok(PRIMARY_ARCHITECTURAL_IMAGE.startsWith('/images/front/'));
    assert.ok(SECONDARY_ARCHITECTURAL_IMAGE.startsWith('/images/front/'));

    for (const img of FRONT_IMAGES) {
      const diskPath = path.resolve('public', img.publicPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Imagem sincronizada não encontrada em disco: ${diskPath}`);

      const webpPath = path.resolve('public', img.webpPath.replace(/^\//, ''));
      const avifPath = path.resolve('public', img.avifPath.replace(/^\//, ''));
      const mobileWebpPath = path.resolve('public', img.mobileWebpPath.replace(/^\//, ''));
      const mobileAvifPath = path.resolve('public', img.mobileAvifPath.replace(/^\//, ''));

      assert.ok(fs.existsSync(webpPath), `Versão WebP não encontrada: ${webpPath}`);
      assert.ok(fs.existsSync(avifPath), `Versão AVIF não encontrada: ${avifPath}`);
      assert.ok(fs.existsSync(mobileWebpPath), `Versão Mobile WebP não encontrada: ${mobileWebpPath}`);
      assert.ok(fs.existsSync(mobileAvifPath), `Versão Mobile AVIF não encontrada: ${mobileAvifPath}`);

      // Garantia de compressão: variantes mobile devem ser extremamente leves (< 250 KB)
      const mobileAvifSize = fs.statSync(mobileAvifPath).size;
      assert.ok(
        mobileAvifSize < 250 * 1024,
        `Imagem mobile AVIF (${img.id}) excede 250KB: ${(mobileAvifSize / 1024).toFixed(1)}KB`,
      );
    }
  });

  it('remove 100% dos antigos componentes 3D wireframe e aplica os 5 padrões Tequs/Imagica', () => {
    assert.ok(!fs.existsSync(path.resolve('src/shared/3d')), 'Pasta legada src/shared/3d não deve existir');
    assert.ok(
      !fs.existsSync(path.resolve('src/features/home/components/OrbitalErpCanvas.tsx')),
      'OrbitalErpCanvas.tsx não deve existir',
    );

    const headerAstro = fs.readFileSync(path.resolve('src/features/navigation/Header.astro'), 'utf-8');
    assert.ok(headerAstro.includes('rounded-full'), 'Navbar deve usar cápsula arredondada');
    assert.ok(headerAstro.includes('navigation-glass'), 'Navbar deve usar acabamento Liquid Glass');

    const siteLayout = fs.readFileSync(path.resolve('src/layouts/SiteLayout.astro'), 'utf-8');
    assert.ok(siteLayout.includes('id="page-transition-veil"'), 'Cortina MPA anti-freeze deve estar presente');
    assert.ok(siteLayout.includes('1200'), 'Failsafe de 1200ms deve estar presente');
  });
});
