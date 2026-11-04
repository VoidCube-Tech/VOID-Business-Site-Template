import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  isWithinSrgbGamut,
  parseOklchString,
  wcagContrastRatio,
} from '../../src/shared/color/contrastValidator.ts';

function extractThemeBlock(css: string, selectorMarker: string): Record<string, string> {
  const startIndex = css.indexOf(selectorMarker);
  assert.ok(startIndex !== -1, `Bloco CSS não encontrado para: ${selectorMarker}`);
  const openBrace = css.indexOf('{', startIndex);
  const closeBrace = css.indexOf('}', openBrace);
  const body = css.slice(openBrace + 1, closeBrace);

  const tokens: Record<string, string> = {};
  const regex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    tokens[match[1].trim()] = match[2].trim();
  }
  return tokens;
}

function extractInlineThemeBlock(css: string): Record<string, string> {
  const startIndex = css.indexOf('@theme inline');
  assert.ok(startIndex !== -1, 'Bloco @theme inline não encontrado em global.css');
  const openBrace = css.indexOf('{', startIndex);
  const closeBrace = css.indexOf('}', openBrace);
  const body = css.slice(openBrace + 1, closeBrace);

  const tokens: Record<string, string> = {};
  const regex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    tokens[match[1].trim()] = match[2].trim();
  }
  return tokens;
}

describe('HCT → OKLCH Color System & WCAG 2.2 Perceptual Contrast', () => {
  const cssPath = path.resolve('src/styles/global.css');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  const lightTokens = extractThemeBlock(cssContent, ':root[data-theme="light"]');
  const darkTokens = extractThemeBlock(cssContent, ':root[data-theme="dark"]');

  it('garante que todos os tokens OKLCH em Light Mode e Dark Mode estão dentro do gamut sRGB sem clipping', () => {
    for (const [themeName, tokens] of [
      ['light', lightTokens],
      ['dark', darkTokens],
    ] as const) {
      for (const [name, value] of Object.entries(tokens)) {
        if (!value.startsWith('oklch(') || value.includes('/')) continue;
        const parsed = parseOklchString(value);
        assert.ok(
          isWithinSrgbGamut(parsed),
          `Token ${name} (${value}) no tema ${themeName} excede o gamut sRGB`,
        );
      }
    }
  });

  it('cumpre contraste WCAG 2.2 AAA (>= 7.0:1) para texto primário em Light Mode e Dark Mode', () => {
    for (const [themeName, tokens] of [
      ['light', lightTokens],
      ['dark', darkTokens],
    ] as const) {
      const surface = parseOklchString(tokens['--theme-surface']);
      const surfaceContainer = parseOklchString(tokens['--theme-surface-container']);
      const onSurface = parseOklchString(tokens['--theme-on-surface']);

      const ratioSurface = wcagContrastRatio(onSurface, surface);
      const ratioContainer = wcagContrastRatio(onSurface, surfaceContainer);

      assert.ok(
        ratioSurface >= 7.0,
        `[${themeName}] Contraste --theme-on-surface vs --theme-surface (${ratioSurface.toFixed(2)}:1) menor que 7.0:1`,
      );
      assert.ok(
        ratioContainer >= 7.0,
        `[${themeName}] Contraste --theme-on-surface vs --theme-surface-container (${ratioContainer.toFixed(2)}:1) menor que 7.0:1`,
      );
    }
  });

  it('cumpre contraste WCAG 2.2 AA (>= 4.5:1) para texto secundário e botões primários em ambos os temas', () => {
    for (const [themeName, tokens] of [
      ['light', lightTokens],
      ['dark', darkTokens],
    ] as const) {
      const surfaceContainer = parseOklchString(tokens['--theme-surface-container']);
      const onSurfaceVariant = parseOklchString(tokens['--theme-on-surface-variant']);
      const primary = parseOklchString(tokens['--theme-primary']);
      const onPrimary = parseOklchString(tokens['--theme-on-primary']);

      const variantRatio = wcagContrastRatio(onSurfaceVariant, surfaceContainer);
      const primaryBtnRatio = wcagContrastRatio(onPrimary, primary);

      assert.ok(
        variantRatio >= 4.5,
        `[${themeName}] --theme-on-surface-variant vs --theme-surface-container (${variantRatio.toFixed(2)}:1) < 4.5:1`,
      );
      assert.ok(
        primaryBtnRatio >= 4.5,
        `[${themeName}] --theme-on-primary vs --theme-primary (${primaryBtnRatio.toFixed(2)}:1) < 4.5:1`,
      );
    }
  });

  it('registra tokens semânticos de status (--color-success, --color-warning, --color-danger) no @theme inline e no escopo de tema', () => {
    const inlineTokens = extractInlineThemeBlock(cssContent);
    assert.equal(inlineTokens['--color-success'], 'var(--theme-success)');
    assert.equal(inlineTokens['--color-warning'], 'var(--theme-warning)');
    assert.equal(inlineTokens['--color-danger'], 'var(--theme-error)');

    for (const [themeName, tokens] of [
      ['light', lightTokens],
      ['dark', darkTokens],
    ] as const) {
      assert.ok(tokens['--theme-success'], `[${themeName}] ausente: --theme-success`);
      assert.ok(tokens['--theme-warning'], `[${themeName}] ausente: --theme-warning`);
      assert.ok(tokens['--theme-error'], `[${themeName}] ausente: --theme-error`);

      const success = parseOklchString(tokens['--theme-success']);
      const warning = parseOklchString(tokens['--theme-warning']);
      const error = parseOklchString(tokens['--theme-error']);

      assert.ok(
        isWithinSrgbGamut(success),
        `Token --theme-success (${tokens['--theme-success']}) fora do gamut sRGB no tema ${themeName}`,
      );
      assert.ok(
        isWithinSrgbGamut(warning),
        `Token --theme-warning (${tokens['--theme-warning']}) fora do gamut sRGB no tema ${themeName}`,
      );
      assert.ok(
        isWithinSrgbGamut(error),
        `Token --theme-error (${tokens['--theme-error']}) fora do gamut sRGB no tema ${themeName}`,
      );
    }
  });

  it('valida hierarquia monotônica e contraste WCAG AAA (>= 7.0:1) nos 5 níveis de elevação de cards', () => {
    const tiers = [
      '--theme-surface-container-lowest',
      '--theme-surface-container-low',
      '--theme-surface-container',
      '--theme-surface-container-high',
      '--theme-surface-container-highest',
    ];

    for (const [themeName, tokens] of [
      ['light', lightTokens],
      ['dark', darkTokens],
    ] as const) {
      for (const tier of tiers) {
        assert.ok(tokens[tier], `[${themeName}] Token de elevação ${tier} não encontrado`);
      }

      const lVals = tiers.map((t) => parseOklchString(tokens[t]).l);
      for (let i = 0; i < lVals.length - 1; i++) {
        if (themeName === 'light') {
          assert.ok(
            lVals[i] > lVals[i + 1],
            `[light] Elevação ${tiers[i]} (${lVals[i]}) deve ser maior que ${tiers[i + 1]} (${lVals[i + 1]})`,
          );
        } else {
          assert.ok(
            lVals[i] < lVals[i + 1],
            `[dark] Elevação ${tiers[i]} (${lVals[i]}) deve ser menor que ${tiers[i + 1]} (${lVals[i + 1]})`,
          );
        }
      }

      const onSurface = parseOklchString(tokens['--theme-on-surface']);
      for (const tier of tiers) {
        const surf = parseOklchString(tokens[tier]);
        const ratio = wcagContrastRatio(onSurface, surf);
        assert.ok(
          ratio >= 7.0,
          `[${themeName}] Contraste --theme-on-surface vs ${tier} (${ratio.toFixed(2)}:1) menor que 7.0:1`,
        );
      }
    }
  });
});
