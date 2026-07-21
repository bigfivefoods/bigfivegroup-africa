import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";

function getSecret(): string {
  const s =
    process.env.NEWSLETTER_SECRET?.trim() ||
    process.env.PARTNER_SESSION_SECRET?.trim() ||
    process.env.INVESTOR_SESSION_SECRET?.trim() ||
    "bfg-newsletter-v1-feed-educate-empower-2026";
  return s;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(`${getSecret()}:${token}`).digest("hex");
}

export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export function tokensMatch(token: string, hash: string | undefined): boolean {
  if (!hash) return false;
  const a = Buffer.from(hashToken(token));
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function newId(prefix = "sub"): string {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

export function hashIp(ip: string | null | undefined): string | undefined {
  if (!ip) return undefined;
  return createHash("sha256").update(`${getSecret()}:ip:${ip}`).digest("hex").slice(0, 16);
}

export function hashUa(ua: string | null | undefined): string | undefined {
  if (!ua) return undefined;
  return createHash("sha256").update(`${getSecret()}:ua:${ua.slice(0, 200)}`).digest("hex").slice(0, 16);
}

/**
 * Signed preference / one-click link token (stateless verify + store lookup).
 * Format: base64url(payload).sig
 */
export function signLinkToken(payload: {
  email: string;
  purpose: "prefs" | "unsub" | "confirm";
  expMs: number;
  /** opaque id so rotated secrets still can match store hashes */
  tid?: string;
}): string {
  const body = Buffer.from(
    JSON.stringify({
      e: payload.email.toLowerCase(),
      p: payload.purpose,
      exp: payload.expMs,
      tid: payload.tid,
    }),
    "utf8"
  ).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyLinkToken(
  token: string,
  purpose: "prefs" | "unsub" | "confirm"
): { ok: true; email: string; tid?: string } | { ok: false; error: string } {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, error: "Invalid link." };
  const [body, sig] = parts;
  const expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, error: "Invalid or tampered link." };
    }
  } catch {
    return { ok: false, error: "Invalid link." };
  }
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      e?: string;
      p?: string;
      exp?: number;
      tid?: string;
    };
    if (data.p !== purpose) return { ok: false, error: "Wrong link type." };
    if (!data.e || typeof data.exp !== "number") return { ok: false, error: "Invalid link payload." };
    if (data.exp < Date.now()) return { ok: false, error: "This link has expired." };
    return { ok: true, email: data.e.toLowerCase(), tid: data.tid };
  } catch {
    return { ok: false, error: "Invalid link." };
  }
}
