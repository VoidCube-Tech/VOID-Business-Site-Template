import type { CSSProperties } from 'react';

export type GlassStyle = CSSProperties & Record<`--navigation-glass-${string}`, string>;

export interface GlassOptions {
  readonly blur: string;
  readonly tint: string;
  readonly backgroundTint?: string;
  readonly specularTint?: string;
  readonly saturation?: number;
  readonly brightness?: number;
  readonly edge: number;
  readonly center: number;
  readonly hoverEdge: number;
  readonly hoverCenter: number;
  readonly border: number;
  readonly hoverBorder: number;
  readonly shadow: number;
  readonly hoverShadow: number;
  readonly highlight: number;
  readonly reflection: number;
}

export function createLiquidGlassStyle(options: GlassOptions): GlassStyle {
  const backgroundTint = options.backgroundTint ?? options.tint;
  const specularTint = options.specularTint ?? 'var(--color-glass-specular)';

  const background = (edge: number, center: number) =>
    `linear-gradient(145deg, color-mix(in oklch, ${backgroundTint} ${edge}%, transparent) 0%, color-mix(in oklch, var(--color-surface) ${center}%, transparent) 55%, color-mix(in oklch, ${backgroundTint} ${edge}%, transparent) 100%)`;

  const shadow = (opacity: number) =>
    `0 16px 36px -12px color-mix(in oklch, var(--color-shadow) ${opacity}%, transparent), inset 0 1px 1px color-mix(in oklch, ${specularTint} ${options.highlight}%, transparent)`;

  return {
    WebkitBackdropFilter: `blur(${options.blur}) saturate(${options.saturation ?? 150}%) brightness(${options.brightness ?? 102}%)`,
    backdropFilter: `blur(${options.blur}) saturate(${options.saturation ?? 150}%) brightness(${options.brightness ?? 102}%)`,
    '--navigation-glass-background': background(options.edge, options.center),
    '--navigation-glass-background-hover': background(options.hoverEdge, options.hoverCenter),
    '--navigation-glass-border': `color-mix(in oklch, ${options.tint} ${options.border}%, transparent)`,
    '--navigation-glass-border-hover': `color-mix(in oklch, ${options.tint} ${options.hoverBorder}%, transparent)`,
    '--navigation-glass-shadow': shadow(options.shadow),
    '--navigation-glass-shadow-hover': shadow(options.hoverShadow),
    '--navigation-glass-reflection': `color-mix(in oklch, ${specularTint} ${options.reflection}%, transparent)`,
  };
}

export const liquidGlassHeaderStyle = createLiquidGlassStyle({
  blur: '24px',
  tint: 'var(--color-outline)',
  backgroundTint: 'var(--color-surface-container-high)',
  saturation: 160,
  brightness: 102,
  edge: 48,
  center: 36,
  hoverEdge: 58,
  hoverCenter: 44,
  border: 18,
  hoverBorder: 28,
  shadow: 28,
  hoverShadow: 36,
  highlight: 16,
  reflection: 28,
});

export const liquidGlassControlStyle = createLiquidGlassStyle({
  blur: '12px',
  tint: 'var(--color-outline)',
  backgroundTint: 'var(--color-surface-container)',
  saturation: 130,
  brightness: 101,
  edge: 50,
  center: 36,
  hoverEdge: 65,
  hoverCenter: 50,
  border: 18,
  hoverBorder: 30,
  shadow: 12,
  hoverShadow: 20,
  highlight: 14,
  reflection: 22,
});

export const liquidGlassPrimaryControlStyle = createLiquidGlassStyle({
  blur: '12px',
  tint: 'var(--color-primary)',
  backgroundTint: 'var(--color-primary-container)',
  saturation: 135,
  brightness: 102,
  edge: 65,
  center: 50,
  hoverEdge: 78,
  hoverCenter: 62,
  border: 28,
  hoverBorder: 45,
  shadow: 16,
  hoverShadow: 24,
  highlight: 20,
  reflection: 32,
});

export const liquidGlassPopupStyle = createLiquidGlassStyle({
  blur: '28px',
  tint: 'var(--color-outline)',
  backgroundTint: 'var(--color-surface-container-low)',
  saturation: 150,
  brightness: 101,
  edge: 75,
  center: 65,
  hoverEdge: 75,
  hoverCenter: 65,
  border: 20,
  hoverBorder: 24,
  shadow: 32,
  hoverShadow: 36,
  highlight: 16,
  reflection: 28,
});

export const navigationGlassControlClass = 'navigation-glass navigation-glass-control';
export const navigationGlassPanelClass = 'navigation-glass navigation-glass-panel';
