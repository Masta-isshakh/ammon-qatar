// Regenerates branded placeholder images using only Node built-ins.
//
// The site now ships real photography (see content/images.ts), so this script
// is kept only as a fallback: run `npm run assets:placeholders` if a photo has
// to be temporarily removed, then point the matching slot in content/images.ts
// at the generated file.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

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
const chunk = (t, d) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(d.length);
  const type = Buffer.from(t, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([type, d])));
  return Buffer.concat([len, type, d, crc]);
};
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const clamp01 = (v) => Math.min(1, Math.max(0, v));

function render({ w, h, from, to, glow, shield }) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  let p = 0;
  const cx = w * shield.x;
  const cy = h * shield.y;
  const r = Math.min(w, h) * shield.r;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const v = y / h;
      let c = mix(from, to, clamp01(u * 0.6 + v * 0.6));
      const gx = u - glow.x;
      const gy = v - glow.y;
      const g = Math.exp(-(gx * gx + gy * gy) * glow.k);
      c = mix(c, [201, 162, 39], g * glow.a);
      // Shield outline rings
      const dx = (x - cx) / r;
      const dy = (y - cy) / r;
      const d = Math.sqrt(dx * dx + dy * dy * 0.8);
      for (const ring of [1, 0.72, 0.46]) {
        if (Math.abs(d - ring) < 0.012) c = mix(c, [217, 184, 90], 0.35);
      }
      raw[p++] = Math.round(c[0]);
      raw[p++] = Math.round(c[1]);
      raw[p++] = Math.round(c[2]);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const NAVY = [98, 32, 46];
const DEEP = [43, 13, 21];
const IVORY = [250, 247, 240];
const specs = [
  { file: 'placeholder-wide.png', w: 1672, h: 941, from: NAVY, to: DEEP, glow: { x: 0.8, y: 0.85, k: 3.5, a: 0.45 }, shield: { x: 0.68, y: 0.5, r: 0.36 } },
  { file: 'placeholder-light.png', w: 1672, h: 941, from: IVORY, to: [231, 221, 218], glow: { x: 0.75, y: 0.25, k: 4, a: 0.25 }, shield: { x: 0.5, y: 0.5, r: 0.4 } },
];

const dir = resolve(process.cwd(), 'public/images');
mkdirSync(dir, { recursive: true });
for (const s of specs) {
  const png = render(s);
  writeFileSync(resolve(dir, s.file), png);
  console.log(`[ammon] wrote ${s.file} (${(png.length / 1024).toFixed(0)} KB)`);
}
