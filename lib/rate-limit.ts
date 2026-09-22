import 'server-only';

/**
 * Sliding-window rate limiter kept in process memory.
 *
 * Amplify Hosting SSR may run several instances, so this is a first line of
 * defence (bots, accidental double-submits), not a hard guarantee. Pair it
 * with the honeypot and, if abuse appears, a WAF rate rule on the CloudFront
 * distribution or a DynamoDB-backed counter.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}
