/**
 * Simple in-process sliding-window rate limiter.
 * Good enough for single-region Vercel + honeypot; pair with Upstash for multi-instance.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 12; // subscribe attempts per IP per hour

export function rateLimitAllow(key: string, max = MAX_HITS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b) {
    b = { hits: [] };
    buckets.set(key, b);
  }
  b.hits = b.hits.filter((t) => now - t < windowMs);
  if (b.hits.length >= max) return false;
  b.hits.push(now);
  // Bound map size
  if (buckets.size > 5_000) {
    const first = buckets.keys().next().value;
    if (first) buckets.delete(first);
  }
  return true;
}

export function rateLimitKey(ip: string | null | undefined, action: string): string {
  return `${action}:${ip || "unknown"}`;
}
