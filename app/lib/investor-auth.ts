import { INVESTOR_ALLOWLIST } from "./investor-allowlist";

export const INVESTOR_COOKIE = "bfg_investor_session";
/** Session length: 30 days */
export const INVESTOR_SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Allowed investor emails from code allowlist + env */
export function getAllowedInvestorEmails(): Set<string> {
  const fromEnv = (process.env.INVESTOR_EMAILS ?? "")
    .split(/[,;\n]+/)
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
  const fromCode = INVESTOR_ALLOWLIST.map(normalizeEmail).filter(Boolean);
  return new Set([...fromCode, ...fromEnv]);
}

export function isInvestorEmailAllowed(email: string): boolean {
  const set = getAllowedInvestorEmails();
  if (set.size === 0) return false;
  return set.has(normalizeEmail(email));
}

function getSecret(): string {
  const secret = process.env.INVESTOR_SESSION_SECRET?.trim();
  if (secret && secret.length >= 16) return secret;
  // Dev fallback only — set INVESTOR_SESSION_SECRET in production
  if (process.env.NODE_ENV !== "production") {
    return "dev-investor-session-secret-change-me";
  }
  return "";
}

export function hasInvestorAuthConfigured(): boolean {
  return getAllowedInvestorEmails().size > 0 && getSecret().length >= 16;
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

export type InvestorSession = {
  email: string;
  exp: number;
};

/** Create signed session token: payload.exp.email.signature */
export async function createInvestorToken(email: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const normalized = normalizeEmail(email);
  if (!isInvestorEmailAllowed(normalized)) return null;
  const exp = Math.floor(Date.now() / 1000) + INVESTOR_SESSION_MAX_AGE_SEC;
  const payload = base64UrlEncode(JSON.stringify({ email: normalized, exp } satisfies InvestorSession));
  const sig = await hmacSha256(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyInvestorToken(
  token: string | undefined | null
): Promise<InvestorSession | null> {
  if (!token || !token.includes(".")) return null;
  const secret = getSecret();
  if (!secret) return null;
  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  if (!payload || !sig) return null;
  const expected = await hmacSha256(payload, secret);
  if (sig.length !== expected.length) return null;
  // timing-safe compare
  let ok = 0;
  for (let i = 0; i < expected.length; i++) {
    ok |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (ok !== 0) return null;
  try {
    const data = JSON.parse(base64UrlDecode(payload)) as InvestorSession;
    if (!data?.email || !data?.exp) return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    if (!isInvestorEmailAllowed(data.email)) return null;
    return data;
  } catch {
    return null;
  }
}
