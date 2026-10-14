/**
 * Per-key sliding-window limiter, in memory.
 *
 * Best effort: each server instance keeps its own window, so on a multi-instance
 * deploy the real ceiling is `limit × instances`. Enough to stop a form being
 * hammered into a mail cannon; swap for Upstash/Redis if that ever matters.
 */

const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterS: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfterS: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
  }

  return { ok: true, retryAfterS: 0 };
}
