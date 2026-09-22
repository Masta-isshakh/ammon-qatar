// Turns the supplied logo artwork (RGB PNG on a white background) into the
// web assets the site needs, using only Node built-ins:
//
//   public/logo/ammon-qatar-logo.png       stacked lockup, transparent background
//   public/logo/ammon-qatar-logo-wide.png  horizontal lockup (mark + wordmark) for the header
//   public/logo/ammon-qatar-mark.png  the "A" mark only, transparent
//   public/logo/ammon-qatar-plate.png the mark on a white rounded plate (dark surfaces)
//   app/icon.png                      512px app icon (mark on brand navy)
//   app/favicon.ico                   32px favicon (mark on brand navy)
//
// It also prints the dominant brand colours so the palette can be matched.
import { deflateSync, inflateSync } from 'node:zlib';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const LOGO_DIR = resolve(process.cwd(), 'public/logo');
// Source artwork lives outside public/ so the multi-megabyte original is never served.
const SOURCE_DIR = resolve(process.cwd(), 'assets-source/logo');
const SOURCE = process.argv[2] ?? readdirSync(SOURCE_DIR).find((f) => /\.png$/i.test(f));
if (!SOURCE) throw new Error('No source logo PNG found in assets-source/logo');

/* ---------------------------------------------------------------- PNG I/O */
const CRC = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (b) => {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
};

function decodePng(buf) {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const depth = buf[24];
  const ctype = buf[25];
  if (depth !== 8 || (ctype !== 2 && ctype !== 6)) throw new Error(`Unsupported PNG (depth ${depth}, colour type ${ctype})`);
  const channels = ctype === 6 ? 4 : 3;
  const parts = [];
  let i = 8;
  while (i < buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString('ascii', i + 4, i + 8);
    if (type === 'IDAT') parts.push(buf.subarray(i + 8, i + 8 + len));
    if (type === 'IEND') break;
    i += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(parts));
  const stride = width * channels;
  const out = Buffer.alloc(width * height * 4, 255);
  let pos = 0;
  const prev = Buffer.alloc(stride);
  const line = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    raw.copy(line, 0, pos, pos + stride);
    pos += stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? line[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      line[x] = v & 0xff;
    }
    line.copy(prev);
    for (let x = 0; x < width; x++) {
      const s = x * channels;
      const d = (y * width + x) * 4;
      out[d] = line[s];
      out[d + 1] = line[s + 1];
      out[d + 2] = line[s + 2];
      out[d + 3] = channels === 4 ? line[s + 3] : 255;
    }
  }
  return { width, height, data: out };
}

function encodePng({ width, height, data }) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0;
    data.copy(raw, p, y * width * 4, (y + 1) * width * 4);
    p += width * 4;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------- operations */
const px = (img, x, y) => (y * img.width + x) * 4;

/** Removes a white background and un-premultiplies the colour underneath. */
function keyOutWhite(img, threshold = 246) {
  const out = Buffer.from(img.data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const min = Math.min(r, g, b);
    if (min >= threshold) {
      out[i + 3] = 0;
      continue;
    }
    const a = 255 - min;
    const base = 255 - a;
    out[i] = Math.max(0, Math.min(255, Math.round(((r - base) * 255) / a)));
    out[i + 1] = Math.max(0, Math.min(255, Math.round(((g - base) * 255) / a)));
    out[i + 2] = Math.max(0, Math.min(255, Math.round(((b - base) * 255) / a)));
    out[i + 3] = a;
  }
  return { ...img, data: out };
}

function bounds(img, alphaMin = 12) {
  let x0 = img.width;
  let y0 = img.height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      if (img.data[px(img, x, y) + 3] > alphaMin) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return { x0, y0, x1, y1 };
}

function crop(img, { x0, y0, x1, y1 }) {
  const width = x1 - x0 + 1;
  const height = y1 - y0 + 1;
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    img.data.copy(data, y * width * 4, px(img, x0, y0 + y), px(img, x0, y0 + y) + width * 4);
  }
  return { width, height, data };
}

/** Box-filter resize with alpha weighting (good enough for logo downscales). */
function resize(img, width, height) {
  const data = Buffer.alloc(width * height * 4);
  const sx = img.width / width;
  const sy = img.height / height;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const fx0 = Math.floor(x * sx);
      const fx1 = Math.max(fx0 + 1, Math.floor((x + 1) * sx));
      const fy0 = Math.floor(y * sy);
      const fy1 = Math.max(fy0 + 1, Math.floor((y + 1) * sy));
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let n = 0;
      for (let yy = fy0; yy < Math.min(fy1, img.height); yy++) {
        for (let xx = fx0; xx < Math.min(fx1, img.width); xx++) {
          const i = px(img, xx, yy);
          const al = img.data[i + 3] / 255;
          r += img.data[i] * al;
          g += img.data[i + 1] * al;
          b += img.data[i + 2] * al;
          a += img.data[i + 3];
          n++;
        }
      }
      const d = (y * width + x) * 4;
      const aAvg = a / n;
      const w = aAvg / 255 || 1;
      data[d] = Math.round(r / n / w);
      data[d + 1] = Math.round(g / n / w);
      data[d + 2] = Math.round(b / n / w);
      data[d + 3] = Math.round(aAvg);
    }
  }
  return { width, height, data };
}

/** Composites onto a solid background with optional rounded corners. */
function flatten(img, [br, bg, bb], radius = 0, pad = 0) {
  const width = img.width + pad * 2;
  const height = img.height + pad * 2;
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const d = (y * width + x) * 4;
      let outside = false;
      if (radius > 0) {
        const cx = Math.min(Math.max(x, radius), width - radius - 1);
        const cy = Math.min(Math.max(y, radius), height - radius - 1);
        outside = (x - cx) ** 2 + (y - cy) ** 2 > radius * radius;
      }
      if (outside) {
        data[d + 3] = 0;
        continue;
      }
      const sx = x - pad;
      const sy = y - pad;
      let r = br;
      let g = bg;
      let b = bb;
      if (sx >= 0 && sy >= 0 && sx < img.width && sy < img.height) {
        const i = px(img, sx, sy);
        const a = img.data[i + 3] / 255;
        r = Math.round(img.data[i] * a + br * (1 - a));
        g = Math.round(img.data[i + 1] * a + bg * (1 - a));
        b = Math.round(img.data[i + 2] * a + bb * (1 - a));
      }
      data[d] = r;
      data[d + 1] = g;
      data[d + 2] = b;
      data[d + 3] = 255;
    }
  }
  return { width, height, data };
}

/** Pads a transparent image to a square canvas, centred. */
function square(img, size, scale = 0.78) {
  const inner = Math.round(size * scale);
  const ratio = img.width / img.height;
  const w = ratio >= 1 ? inner : Math.round(inner * ratio);
  const h = ratio >= 1 ? Math.round(inner / ratio) : inner;
  const small = resize(img, w, h);
  const data = Buffer.alloc(size * size * 4);
  const ox = Math.round((size - w) / 2);
  const oy = Math.round((size - h) / 2);
  for (let y = 0; y < h; y++) {
    small.data.copy(data, ((y + oy) * size + ox) * 4, y * w * 4, (y + 1) * w * 4);
  }
  return { width: size, height: size, data };
}

function dominantColours(img) {
  const buckets = new Map();
  for (let i = 0; i < img.data.length; i += 4) {
    if (img.data[i + 3] < 200) continue;
    const r = img.data[i];
    const g = img.data[i + 1];
    const b = img.data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min < 25) continue; // skip greys
    const key = `${r >> 4},${g >> 4},${b >> 4}`;
    const e = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
    e.r += r;
    e.g += g;
    e.b += b;
    e.n++;
    buckets.set(key, e);
  }
  return [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 8)
    .map((e) => {
      const r = Math.round(e.r / e.n);
      const g = Math.round(e.g / e.n);
      const b = Math.round(e.b / e.n);
      return { hex: `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`, count: e.n };
    });
}

/* ------------------------------------------------------------------- run */
const src = decodePng(readFileSync(resolve(SOURCE_DIR, SOURCE)));
const keyed = keyOutWhite(src);
const full = crop(keyed, bounds(keyed));

console.log(`[logo] source ${SOURCE} ${src.width}x${src.height} → lockup ${full.width}x${full.height}`);
console.log('[logo] dominant brand colours:');
for (const c of dominantColours(full)) console.log('   ', c.hex, c.count);

// The mark is the artwork above the wordmark: detect the gap between them.
const rowHasInk = [];
for (let y = 0; y < full.height; y++) {
  let n = 0;
  for (let x = 0; x < full.width; x++) if (full.data[px(full, x, y) + 3] > 30) n++;
  rowHasInk.push(n);
}
let split = Math.round(full.height * 0.62);
for (let y = Math.round(full.height * 0.5); y < Math.round(full.height * 0.75); y++) {
  if (rowHasInk[y] === 0) {
    split = y;
    break;
  }
}
const mark = crop(full, { x0: 0, y0: 0, x1: full.width - 1, y1: split - 1 });
const markTrimmed = crop(mark, bounds(mark));
const wordmark = crop(full, { x0: 0, y0: split, x1: full.width - 1, y1: full.height - 1 });
const wordTrimmed = crop(wordmark, bounds(wordmark));

/** Places the mark to the left of the wordmark, vertically centred, for use in the header. */
function horizontalLockup(markImg, wordImg, height = 220) {
  const gap = Math.round(height * 0.14);
  const m = resize(markImg, Math.round((height * markImg.width) / markImg.height), height);
  const wordH = Math.round(height * 0.62);
  const w = resize(wordImg, Math.round((wordH * wordImg.width) / wordImg.height), wordH);
  const width = m.width + gap + w.width;
  const data = Buffer.alloc(width * height * 4);
  const put = (img, ox, oy) => {
    for (let y = 0; y < img.height; y++) {
      img.data.copy(data, ((y + oy) * width + ox) * 4, y * img.width * 4, (y + 1) * img.width * 4);
    }
  };
  put(m, 0, 0);
  put(w, m.width + gap, Math.round((height - w.height) / 2));
  return { width, height, data };
}

const NAVY = [13, 42, 92];

writeFileSync(resolve(LOGO_DIR, 'ammon-qatar-logo.png'), encodePng(resize(full, 900, Math.round((900 * full.height) / full.width))));
writeFileSync(resolve(LOGO_DIR, 'ammon-qatar-logo-wide.png'), encodePng(horizontalLockup(markTrimmed, wordTrimmed, 220)));
writeFileSync(resolve(LOGO_DIR, 'ammon-qatar-mark.png'), encodePng(resize(markTrimmed, 512, Math.round((512 * markTrimmed.height) / markTrimmed.width))));
writeFileSync(resolve(LOGO_DIR, 'ammon-qatar-plate.png'), encodePng(flatten(square(full, 320, 0.84), [255, 255, 255], 44)));
writeFileSync(resolve(process.cwd(), 'app/icon.png'), encodePng(flatten(square(markTrimmed, 512, 0.72), NAVY, 96)));

// favicon.ico: 32px PNG wrapped in an ICO container
const fav = encodePng(flatten(square(markTrimmed, 32, 0.8), NAVY, 6));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry[0] = 32;
entry[1] = 32;
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(fav.length, 8);
entry.writeUInt32LE(22, 12);
writeFileSync(resolve(process.cwd(), 'app/favicon.ico'), Buffer.concat([header, entry, fav]));

console.log('[logo] wrote ammon-qatar-logo.png, ammon-qatar-logo-wide.png, ammon-qatar-mark.png, ammon-qatar-plate.png, app/icon.png, app/favicon.ico');
