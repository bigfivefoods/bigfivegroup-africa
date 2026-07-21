import { PARTNER_ALLOWLIST } from "./partner-allowlist";

export const PARTNER_COOKIE = "bfg_partner_session";
/** Session length: 30 days */
export const PARTNER_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Allowed partner emails from code allowlist + env */
export function getAllowedPartnerEmails(): Set<string> {
  const fromEnv = (process.env.PARTNER_EMAILS ?? "")
    .split(/[,;\n]+/)
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
  const fromCode = PARTNER_ALLOWLIST.map(normalizeEmail).filter(Boolean);
  return new Set([...fromCode, ...fromEnv]);
}

export function isPartnerEmailAllowed(email: string): boolean {
  const set = getAllowedPartnerEmails();
  if (set.size === 0) return false;
  return set.has(normalizeEmail(email));
}

/**
 * Session signing secret.
 * Prefer PARTNER_SESSION_SECRET on Vercel; falls back to investor secret then built-in.
 */
function getSecret(): string {
  const partner = process.env.PARTNER_SESSION_SECRET?.trim();
  if (partner && partner.length >= 16) return partner;
  const shared = process.env.INVESTOR_SESSION_SECRET?.trim();
  if (shared && shared.length >= 16) return `partner:${shared}`;
  return "bfg-partner-session-v1-continental-partnerships-2026";
}

export function hasPartnerAuthConfigured(): boolean {
  return getAllowedPartnerEmails().size > 0 && getSecret().length >= 16;
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bufferToBase64Url(sig);
}

function bufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  const b64 =
    typeof btoa !== "undefined"
      ? btoa(binary)
      : Buffer.from(bytes).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncode(str: string): string {
  const b64 =
    typeof btoa !== "undefined"
      ? btoa(unescape(encodeURIComponent(str)))
      : Buffer.from(str, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof atob !== "undefined") {
    return decodeURIComponent(escape(atob(b64)));
  }
  return Buffer.from(b64, "base64").toString("utf8");
}

export type PartnerSession = {
  email: string;
  exp: number;
};

export async function createPartnerToken(email: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const normalized = normalizeEmail(email);
  if (!isPartnerEmailAllowed(normalized)) return null;
  const exp = Math.floor(Date.now() / 1000) + PARTNER_SESSION_MAX_AGE_SEC;
  const payload = base64UrlEncode(
    JSON.stringify({ email: normalized, exp } satisfies PartnerSession)
  );
  const sig = await hmacSha256(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyPartnerToken(
  token: string | undefined | null
): Promise<PartnerSession | null> {
  if (!token || !token.includes(".")) return null;
  const secret = getSecret();
  if (!secret) return null;
  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  if (!payload || !sig) return null;
  const expected = await hmacSha256(payload, secret);
  if (sig.length !== expected.length) return null;
  let ok = 0;
  for (let i = 0; i < expected.length; i++) {
    ok |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (ok !== 0) return null;
  try {
    const data = JSON.parse(base64UrlDecode(payload)) as PartnerSession;
    if (!data?.email || !data?.exp) return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    if (!isPartnerEmailAllowed(data.email)) return null;
    return data;
  } catch {
    return null;
  }
}
