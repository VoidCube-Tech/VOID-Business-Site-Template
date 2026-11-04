export interface OklchColor {
  /** Lightness in [0, 1] (e.g. 0.824 for 82.4%) */
  readonly l: number;
  /** Chroma (typically [0, 0.4]) */
  readonly c: number;
  /** Hue in degrees [0, 360) */
  readonly h: number;
}

export interface RgbChannels {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export function parseOklchString(input: string): OklchColor {
  const match = input.trim().match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
  if (!match) {
    throw new Error(`Invalid oklch() string: ${input}`);
  }
  const rawL = Number(match[1]);
  const l = input.includes('%') || rawL > 1 ? rawL / 100 : rawL;
  return {
    l,
    c: Number(match[2]),
    h: Number(match[3]),
  };
}

/**
 * Converts OKLCH to linear sRGB channels (unclamped so we can detect gamut clipping).
 */
export function oklchToLinearSrgb(color: OklchColor): RgbChannels {
  const hRad = (color.h * Math.PI) / 180;
  const a = color.c * Math.cos(hRad);
  const b = color.c * Math.sin(hRad);

  const l_ = color.l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = color.l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = color.l - 0.0894841775 * a - 1.2914855480 * b;

  const lCube = l_ * l_ * l_;
  const mCube = m_ * m_ * m_;
  const sCube = s_ * s_ * s_;

  const r = +4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube;
  const g = -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube;
  const bCh = -0.0041960863 * lCube - 0.7034186147 * mCube + 1.7076147010 * sCube;

  return { r, g, b: bCh };
}

/**
 * Checks whether an OKLCH color fits inside the standard sRGB gamut (with 0.002 tolerance for rounding).
 */
export function isWithinSrgbGamut(color: OklchColor, epsilon = 0.002): boolean {
  const { r, g, b } = oklchToLinearSrgb(color);
  return (
    r >= -epsilon &&
    r <= 1 + epsilon &&
    g >= -epsilon &&
    g <= 1 + epsilon &&
    b >= -epsilon &&
    b <= 1 + epsilon
  );
}

/**
 * Computes WCAG 2.x CIE Relative Luminance (Y) from an OKLCH color.
 */
export function relativeLuminanceFromOklch(color: OklchColor): number {
  const { r, g, b } = oklchToLinearSrgb(color);
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b);
}

/**
 * Computes the WCAG 2.2 contrast ratio between two OKLCH colors (in [1, 21]).
 */
export function wcagContrastRatio(foreground: OklchColor, background: OklchColor): number {
  const y1 = relativeLuminanceFromOklch(foreground);
  const y2 = relativeLuminanceFromOklch(background);
  const lighter = Math.max(y1, y2);
  const darker = Math.min(y1, y2);
  return (lighter + 0.05) / (darker + 0.05);
}
