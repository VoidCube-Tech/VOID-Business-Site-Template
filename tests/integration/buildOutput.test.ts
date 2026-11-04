import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Static Build Output & Accessibility / Design System V2 Integration', () => {
  const distDir = path.resolve('dist');

  it('gera todas as páginas HTML, imagens reais sincronizadas e endpoints Agent Discovery esperados', () => {
    const expectedFiles = [
      'index.html',
      'produtos/index.html',
      'servicos/index.html',
      'sobre/index.html',
      'contato/index.html',
      'llms.txt',
      '.well-known/ard.json',
      'ard.json',
    ];

    for (const relPath of expectedFiles) {
      const fullPath = path.join(distDir, relPath);
      assert.ok(fs.existsSync(fullPath), `Arquivo de build ausente: ${relPath}`);
    }

    const frontImagesDir = path.join(distDir, 'images/front');
    assert.ok(fs.existsSync(frontImagesDir), 'Diretório dist/images/front ausente');
    const images = fs.readdirSync(frontImagesDir);
    assert.ok(images.length >= 2, 'Pelo menos 2 fotografias reais devem estar sincronizadas em dist/images/front');

    const hasWebp = images.some((f) => f.endsWith('.webp'));
    const hasAvif = images.some((f) => f.endsWith('.avif'));
    assert.ok(hasWebp, 'Formato WebP deve estar presente no build dist/images/front');
    assert.ok(hasAvif, 'Formato AVIF deve estar presente no build dist/images/front');
  });

  it('inclui tipografia bicolor, matriz comparativa fumê, landmarks acessíveis e governança comercial na Home', () => {
    const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

    assert.ok(indexHtml.includes('id="main-content"'), 'Skip target #main-content ausente');
    assert.ok(indexHtml.includes('class="skip-link"'), 'Skip link de acessibilidade ausente');
    assert.ok(indexHtml.includes('headline-bicolor'), 'Tipografia bicolor Tequs ausente na Home');
    assert.ok(indexHtml.includes('smoked-comparison-surface'), 'Matriz comparativa em vidro fumê ausente na Home');
    assert.ok(indexHtml.includes('id="arquitetura"'), 'Seção de comparativo arquitetônico ausente');
    assert.ok(indexHtml.includes('data-commercial-placeholder="COM-04"'), 'Marcador comercial COM-04 ausente');
    assert.ok(indexHtml.includes('<picture'), 'Elemento <picture> para imagens responsivas ausente na Home');
    assert.ok(indexHtml.includes('type="image/avif"'), 'Fonte type="image/avif" ausente no HTML');
    assert.ok(indexHtml.includes('type="image/webp"'), 'Fonte type="image/webp" ausente no HTML');
  });

  it('gera manifesto JSON válido em /.well-known/ard.json', () => {
    const rawJson = fs.readFileSync(path.join(distDir, '.well-known/ard.json'), 'utf-8');
    const parsed = JSON.parse(rawJson);
    assert.equal(parsed['@context'], 'https://agenticresourcediscovery.org/ns/v1');
    assert.ok(Array.isArray(parsed.entries));
    assert.ok(parsed.entries.length >= 2);
  });
});
