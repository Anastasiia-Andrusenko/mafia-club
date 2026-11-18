import type { NextApiRequest, NextApiResponse } from "next";
import { SITE_URL } from "@/constants/site";

/**
 * Lightweight, dependency-free protections shared by the public API routes.
 *
 * NOTE: the rate limiter is in-memory, i.e. per serverless instance. It blunts
 * naive floods and accidental double-posts but is not a global quota - put a
 * WAF / Vercel Firewall rule in front for anything stronger.
 */

const firstValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Best-effort client IP (Vercel / proxies set x-forwarded-for). */
export const getClientIp = (req: NextApiRequest): string => {
  const forwarded = firstValue(req.headers["x-forwarded-for"]);
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    firstValue(req.headers["x-real-ip"]) ||
    req.socket?.remoteAddress ||
    "unknown"
  );
};

const siteHosts = (): string[] => {
  try {
    const host = new URL(SITE_URL).host;
    const bare = host.replace(/^www\./, "");
    return [bare, `www.${bare}`];
  } catch {
    return [];
  }
};

/**
 * Same-origin check for state-changing requests. Browsers always send Origin
 * (or at least Referer) on fetch() POSTs; the host must match the host the
 * request was addressed to (so localhost, previews and production all work)
 * or the canonical site host. Requests without either header are rejected.
 */
export const isSameOrigin = (req: NextApiRequest): boolean => {
  const source =
    firstValue(req.headers.origin) || firstValue(req.headers.referer);
  if (!source) return false;

  let sourceHost: string;
  try {
    sourceHost = new URL(source).host;
  } catch {
    return false;
  }

  const requestHost = firstValue(req.headers.host);
  return sourceHost === requestHost || siteHosts().includes(sourceHost);
};

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

/** Fixed-window limiter. Returns true when the request is allowed. */
export const rateLimit = (
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): boolean => {
  if (buckets.size > MAX_BUCKETS) {
    buckets.forEach((b, k) => {
      if (b.resetAt <= now) buckets.delete(k);
    });
    // Still too large (sustained flood from many IPs): start over.
    if (buckets.size > MAX_BUCKETS) buckets.clear();
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
};

/** Test helper. */
export const resetRateLimits = () => buckets.clear();

/** Sends a generic JSON error (never include raw upstream/DB errors). */
export const sendError = (
  res: NextApiResponse,
  status: number,
  message: string,
) => res.status(status).json({ message });

/**
 * Returns the parsed JSON body as a plain object, or null when the request
 * is not a JSON object (arrays, strings, null, missing body...).
 */
export const getJsonObject = (
  req: NextApiRequest,
): Record<string, unknown> | null => {
  const type = firstValue(req.headers["content-type"]) || "";
  if (!type.toLowerCase().startsWith("application/json")) return null;
  const body: unknown = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  return body as Record<string, unknown>;
};

/** True when `obj` has no keys outside `allowed`. */
export const hasOnlyKeys = (
  obj: Record<string, unknown>,
  allowed: readonly string[],
): boolean => Object.keys(obj).every((key) => allowed.includes(key));
