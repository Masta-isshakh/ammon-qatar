/**
 * Converts source photographs in public/images into web-sized JPEGs.
 *
 * Photographic PNGs are enormous (1.5–2 MB each here). Even though next/image
 * re-encodes to AVIF/WebP on request, the optimiser still has to decode the
 * huge original on every cold cache, which is slow and costs CPU on the host.
 * Converting the sources once keeps everything fast.
 *
 * Usage: npm run assets:images
 *   - resizes to at most MAX_WIDTH, keeping aspect ratio
 *   - writes progressive, mozjpeg-encoded .jpg at quality 82
 *   - removes the original .png once the .jpg is written
 *
 * Logos are untouched: they live in public/logo and need transparency.
 */
import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { resolve, parse } from 'node:path';

const DIR = resolve(process.cwd(), 'public/images');
const MAX_WIDTH = 1920;
const QUALITY = 82;

const sources = readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f) && !f.endsWith('.jpg'));

if (sources.length === 0) {
  console.log('[images] nothing to optimise — all sources are already .jpg');
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of sources) {
  const src = resolve(DIR, file);
  const out = resolve(DIR, `${parse(file).name}.jpg`);
  const original = statSync(src).size;

  const info = await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);

  unlinkSync(src);
  before += original;
  after += info.size;
  console.log(
    `[images] ${file} → ${parse(out).base}  ${info.width}x${info.height}  ` +
      `${(original / 1024 / 1024).toFixed(2)}MB → ${(info.size / 1024).toFixed(0)}KB`,
  );
}

console.log(
  `[images] total ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
);
console.log('[images] remember to update the src/width/height in content/images.ts if a ratio changed');
