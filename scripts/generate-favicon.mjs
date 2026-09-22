// Generates app/favicon.ico (a 32×32 PNG wrapped in an ICO container) using
// only Node built-ins: obsidian rounded square with the gold "A" monogram.
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SIZE = 32;
const OUT = resolve(process.cwd(), 'app/favicon.ico');

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
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

// Signed-distance helpers (super-sampled 4×4 for smooth edges)
const SS = 4;
const insideRoundedSquare = (x, y) => {
  const r = 7;
  const cx = Math.min(Math.max(x, r), SIZE - r);
  const cy = Math.min(Math.max(y, r), SIZE - r);
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
};
// Triangle "A" (apex top-centre) minus an inner triangle, plus a crossbar.
const inTri = (x, y, ax, ay, bx, by, cx, cy) => {
  const s = (px, py, qx, qy, rx, ry) => (qx - px) * (ry - py) - (qy - py) * (rx - px);
  const d1 = s(x, y, ax, ay, bx, by);
  const d2 = s(x, y, bx, by, cx, cy);
  const d3 = s(x, y, cx, cy, ax, ay);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
};
const insideA = (x, y) => {
  const outer = inTri(x, y, 16, 6, 26.5, 26, 5.5, 26);
  const inner = inTri(x, y, 16, 12.5, 22, 26, 10, 26);
  const bar = y >= 21 && y <= 24 && x >= 11.5 && x <= 20.5;
  return (outer && !inner) || bar;
};

const BG = [74, 22, 34];
const GOLD_TOP = [232, 211, 148];
const GOLD_BOT = [166, 133, 28];

const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
let p = 0;
for (let y = 0; y < SIZE; y++) {
  raw[p++] = 0;
  for (let x = 0; x < SIZE; x++) {
    let bgCov = 0;
    let aCov = 0;
    for (let sy = 0; sy < SS; sy++) {
      for (let sx = 0; sx < SS; sx++) {
        const px = x + (sx + 0.5) / SS;
        const py = y + (sy + 0.5) / SS;
        if (insideRoundedSquare(px, py)) {
          bgCov++;
          if (insideA(px, py)) aCov++;
        }
      }
    }
    const t = (x + y) / (2 * SIZE);
    const gold = GOLD_TOP.map((c, i) => Math.round(c + (GOLD_BOT[i] - c) * t));
    const a = aCov / (SS * SS);
    const b = bgCov / (SS * SS);
    const col = BG.map((c, i) => Math.round(c * (1 - a) + gold[i] * a));
    raw[p++] = col[0];
    raw[p++] = col[1];
    raw[p++] = col[2];
    raw[p++] = Math.round(255 * b);
  }
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8;
ihdr[9] = 6; // RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

// ICO container: header (6) + one directory entry (16) + PNG payload
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry[0] = SIZE;
entry[1] = SIZE;
entry[2] = 0;
entry[3] = 0;
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);

writeFileSync(OUT, Buffer.concat([header, entry, png]));
console.log(`[ammon] wrote ${OUT} (${png.length} bytes PNG in ICO)`);
