import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'C:\\Users\\dkaua\\Pictures\\Imagens para front';
const TARGET_DIR = path.resolve(process.cwd(), 'public/images/front');
const MANIFEST_PATH = path.resolve(process.cwd(), 'src/shared/media/frontImages.ts');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function slugifyFileName(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, path.extname(fileName));
  const clean = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${clean}${ext}`;
}

async function optimizeImage(srcPath, baseName, targetDir) {
  const srcStat = fs.statSync(srcPath);
  const mtime = srcStat.mtimeMs;

  const dstJpg = path.join(targetDir, `${baseName}.jpg`);
  const dstWebp = path.join(targetDir, `${baseName}.webp`);
  const dstAvif = path.join(targetDir, `${baseName}.avif`);
  const dstMobileWebp = path.join(targetDir, `${baseName}-mobile.webp`);
  const dstMobileAvif = path.join(targetDir, `${baseName}-mobile.avif`);

  const targets = [dstJpg, dstWebp, dstAvif, dstMobileWebp, dstMobileAvif];
  const allExist = targets.every((f) => fs.existsSync(f) && fs.statSync(f).mtimeMs >= mtime);

  if (allExist) {
    return {
      jpgBytes: fs.statSync(dstJpg).size,
      webpBytes: fs.statSync(dstWebp).size,
      avifBytes: fs.statSync(dstAvif).size,
      mobileWebpBytes: fs.statSync(dstMobileWebp).size,
      mobileAvifBytes: fs.statSync(dstMobileAvif).size,
    };
  }

  // Pipeline paralelo com Sharp: Desktop 2048px + Mobile 960px
  const pipeline = sharp(srcPath).rotate(); // auto-orient based on EXIF

  await Promise.all([
    // Fallback JPEG otimizado (2048px, q=84, mozjpeg)
    pipeline
      .clone()
      .resize({ width: 2048, withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(dstJpg),

    // Desktop WebP (2048px, q=82)
    pipeline
      .clone()
      .resize({ width: 2048, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(dstWebp),

    // Desktop AVIF (2048px, q=75, effort=3)
    pipeline
      .clone()
      .resize({ width: 2048, withoutEnlargement: true })
      .avif({ quality: 75, effort: 3 })
      .toFile(dstAvif),

    // Mobile WebP (960px, q=80)
    pipeline
      .clone()
      .resize({ width: 960, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(dstMobileWebp),

    // Mobile AVIF (960px, q=72, effort=3)
    pipeline
      .clone()
      .resize({ width: 960, withoutEnlargement: true })
      .avif({ quality: 72, effort: 3 })
      .toFile(dstMobileAvif),
  ]);

  return {
    jpgBytes: fs.statSync(dstJpg).size,
    webpBytes: fs.statSync(dstWebp).size,
    avifBytes: fs.statSync(dstAvif).size,
    mobileWebpBytes: fs.statSync(dstMobileWebp).size,
    mobileAvifBytes: fs.statSync(dstMobileAvif).size,
  };
}

export async function syncFrontImages() {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

  let sourceFiles = [];
  if (fs.existsSync(SOURCE_DIR)) {
    sourceFiles = fs
      .readdirSync(SOURCE_DIR)
      .filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, 'en'));
  }

  const syncedEntries = [];

  for (const file of sourceFiles) {
    const srcPath = path.join(SOURCE_DIR, file);
    const stat = fs.statSync(srcPath);
    if (!stat.isFile()) continue;

    const targetFileName = slugifyFileName(file);
    const baseSlug = path.basename(targetFileName, path.extname(targetFileName));

    const sizes = await optimizeImage(srcPath, baseSlug, TARGET_DIR);

    syncedEntries.push({
      id: baseSlug,
      originalName: file,
      fileName: `${baseSlug}.jpg`,
      publicPath: `/images/front/${baseSlug}.jpg`,
      webpPath: `/images/front/${baseSlug}.webp`,
      avifPath: `/images/front/${baseSlug}.avif`,
      mobileWebpPath: `/images/front/${baseSlug}-mobile.webp`,
      mobileAvifPath: `/images/front/${baseSlug}-mobile.avif`,
      bytes: sizes.jpgBytes,
      webpBytes: sizes.webpBytes,
      avifBytes: sizes.avifBytes,
    });
  }

  if (syncedEntries.length === 0 && fs.existsSync(TARGET_DIR)) {
    const existingFiles = fs
      .readdirSync(TARGET_DIR)
      .filter((file) => file.endsWith('.jpg') && !file.includes('-mobile'))
      .sort((a, b) => a.localeCompare(b, 'en'));

    for (const file of existingFiles) {
      const baseSlug = path.basename(file, path.extname(file));
      const fullPath = path.join(TARGET_DIR, file);
      const stat = fs.statSync(fullPath);
      if (!stat.isFile()) continue;

      const webpFile = path.join(TARGET_DIR, `${baseSlug}.webp`);
      const avifFile = path.join(TARGET_DIR, `${baseSlug}.avif`);

      syncedEntries.push({
        id: baseSlug,
        originalName: file,
        fileName: file,
        publicPath: `/images/front/${file}`,
        webpPath: `/images/front/${baseSlug}.webp`,
        avifPath: `/images/front/${baseSlug}.avif`,
        mobileWebpPath: `/images/front/${baseSlug}-mobile.webp`,
        mobileAvifPath: `/images/front/${baseSlug}-mobile.avif`,
        bytes: stat.size,
        webpBytes: fs.existsSync(webpFile) ? fs.statSync(webpFile).size : 0,
        avifBytes: fs.existsSync(avifFile) ? fs.statSync(avifFile).size : 0,
      });
    }
  }

  const findEntryBySubstring = (sub, fallbackIdx = 0) => {
    const found = syncedEntries.find((item) => item.fileName.includes(sub));
    return found ?? syncedEntries[fallbackIdx % Math.max(1, syncedEntries.length)];
  };

  const createSet = (entry) => {
    return {
      src: entry.publicPath,
      webp: entry.webpPath,
      avif: entry.avifPath,
      mobileWebp: entry.mobileWebpPath,
      mobileAvif: entry.mobileAvifPath,
    };
  };

  const entryNightGrid = findEntryBySubstring('candid-flaneur', 0);
  const entryShadowCorridor = findEntryBySubstring('edocoledoco', 1);
  const entryMonoTowers = findEntryBySubstring('emmanuel-hernandez', 2);
  const entryOrbitalOffices = findEntryBySubstring('fatih-turan', 3);
  const entryAmberLouvers = findEntryBySubstring('marc-barcelona', 4);
  const entryArchiveTexture = findEntryBySubstring('resourceboy', 5);
  const entryModularCurve = findEntryBySubstring('sevenstormphotography', 6);
  const entryGlassCanyon = findEntryBySubstring('sudhanshu-sharma', 7);
  const entryExecutiveDesk = findEntryBySubstring('thekrm', 8);

  const tsContent = `/**
 * Auto-generated by scripts/sync-front-images.mjs
 * Source folder: C:\\Users\\dkaua\\Pictures\\Imagens para front
 */
import { withBase } from '../routing/paths.ts';

export interface ResponsiveImageSet {
  readonly src: string;
  readonly webp: string;
  readonly avif: string;
  readonly mobileWebp: string;
  readonly mobileAvif: string;
}

export interface FrontImageAsset {
  readonly id: string;
  readonly originalName: string;
  readonly fileName: string;
  readonly publicPath: string;
  readonly webpPath: string;
  readonly avifPath: string;
  readonly mobileWebpPath: string;
  readonly mobileAvifPath: string;
  readonly bytes: number;
  readonly webpBytes?: number;
  readonly avifBytes?: number;
}

const RAW_ENTRIES: readonly FrontImageAsset[] = ${JSON.stringify(syncedEntries, null, 2)} as const;

export const FRONT_IMAGES: readonly FrontImageAsset[] = RAW_ENTRIES.map((item) => ({
  ...item,
  publicPath: withBase(item.publicPath),
  webpPath: withBase(item.webpPath),
  avifPath: withBase(item.avifPath),
  mobileWebpPath: withBase(item.mobileWebpPath),
  mobileAvifPath: withBase(item.mobileAvifPath),
}));

const resolveSet = (raw: { src: string; webp: string; avif: string; mobileWebp: string; mobileAvif: string }): ResponsiveImageSet => ({
  src: withBase(raw.src),
  webp: withBase(raw.webp),
  avif: withBase(raw.avif),
  mobileWebp: withBase(raw.mobileWebp),
  mobileAvif: withBase(raw.mobileAvif),
});

/** Conjuntos de Imagens com Formatos Modernos (AVIF + WebP + Fallback JPG) */
export const PHOTO_NIGHT_GRID_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryNightGrid), null, 2)});
export const PHOTO_SHADOW_CORRIDOR_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryShadowCorridor), null, 2)});
export const PHOTO_MONO_TOWERS_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryMonoTowers), null, 2)});
export const PHOTO_ORBITAL_OFFICES_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryOrbitalOffices), null, 2)});
export const PHOTO_AMBER_LOUVERS_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryAmberLouvers), null, 2)});
export const PHOTO_ARCHIVE_TEXTURE_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryArchiveTexture), null, 2)});
export const PHOTO_MODULAR_CURVE_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryModularCurve), null, 2)});
export const PHOTO_GLASS_CANYON_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryGlassCanyon), null, 2)});
export const PHOTO_EXECUTIVE_DESK_SET: ResponsiveImageSet = resolveSet(${JSON.stringify(createSet(entryExecutiveDesk), null, 2)});

/** String fallbacks mantidos para 100% de retrocompatibilidade */
export const PHOTO_NIGHT_GRID = PHOTO_NIGHT_GRID_SET.src;
export const PHOTO_SHADOW_CORRIDOR = PHOTO_SHADOW_CORRIDOR_SET.src;
export const PHOTO_MONO_TOWERS = PHOTO_MONO_TOWERS_SET.src;
export const PHOTO_ORBITAL_OFFICES = PHOTO_ORBITAL_OFFICES_SET.src;
export const PHOTO_AMBER_LOUVERS = PHOTO_AMBER_LOUVERS_SET.src;
export const PHOTO_ARCHIVE_TEXTURE = PHOTO_ARCHIVE_TEXTURE_SET.src;
export const PHOTO_MODULAR_CURVE = PHOTO_MODULAR_CURVE_SET.src;
export const PHOTO_GLASS_CANYON = PHOTO_GLASS_CANYON_SET.src;
export const PHOTO_EXECUTIVE_DESK = PHOTO_EXECUTIVE_DESK_SET.src;

export const PRIMARY_ARCHITECTURAL_IMAGE = PHOTO_ORBITAL_OFFICES;
export const SECONDARY_ARCHITECTURAL_IMAGE = PHOTO_SHADOW_CORRIDOR;

export const CURATED_MODULE_PHOTOS: readonly string[] = [
  PHOTO_ORBITAL_OFFICES,
  PHOTO_MONO_TOWERS,
  PHOTO_MODULAR_CURVE,
  PHOTO_AMBER_LOUVERS,
  PHOTO_NIGHT_GRID,
] as const;

export const CURATED_MODULE_PHOTO_SETS: readonly ResponsiveImageSet[] = [
  PHOTO_ORBITAL_OFFICES_SET,
  PHOTO_MONO_TOWERS_SET,
  PHOTO_MODULAR_CURVE_SET,
  PHOTO_AMBER_LOUVERS_SET,
  PHOTO_NIGHT_GRID_SET,
] as const;

export function getFrontImageByIndex(index: number): string {
  if (CURATED_MODULE_PHOTOS.length === 0) {
    return PRIMARY_ARCHITECTURAL_IMAGE;
  }
  const normalized = ((index % CURATED_MODULE_PHOTOS.length) + CURATED_MODULE_PHOTOS.length) % CURATED_MODULE_PHOTOS.length;
  return CURATED_MODULE_PHOTOS[normalized];
}

export function getFrontImageSetByIndex(index: number): ResponsiveImageSet {
  const normalized = ((index % CURATED_MODULE_PHOTO_SETS.length) + CURATED_MODULE_PHOTO_SETS.length) % CURATED_MODULE_PHOTO_SETS.length;
  return CURATED_MODULE_PHOTO_SETS[normalized];
}
`;

  fs.writeFileSync(MANIFEST_PATH, tsContent, 'utf8');
  console.log(`[sync-front-images] Optimized and synced ${syncedEntries.length} image(s) to AVIF, WebP and JPG.`);
}

await syncFrontImages();
