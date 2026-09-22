// Runs before `next dev`.
// Next 15 writes `next build` (webpack) and `next dev --turbopack` output into
// the same .next folder; mixing them yields a bare "Internal Server Error".
// Drop everything except .next/cache (image + fetch cache) so dev starts clean.
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const nextDir = resolve(process.cwd(), '.next');

if (existsSync(nextDir)) {
  let removed = 0;
  for (const entry of readdirSync(nextDir)) {
    if (entry === 'cache') continue;
    rmSync(resolve(nextDir, entry), { recursive: true, force: true });
    removed++;
  }
  if (removed) console.log(`[ammon] cleared ${removed} stale build artefact(s) from .next`);
}

await import('./ensure-amplify-outputs.mjs');
