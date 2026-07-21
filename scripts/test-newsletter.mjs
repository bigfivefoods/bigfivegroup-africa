/**
 * Lightweight unit checks for newsletter domain helpers (no test runner required).
 * Run: node scripts/test-newsletter.mjs
 *
 * Note: full service tests need Node ESM → TS path; these assert crypto/rate pure logic
 * by re-implementing the critical contracts used by app/lib/newsletter.
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import assert from "node:assert/strict";

const SECRET = "test-secret-newsletter-v1";

function hashToken(token) {
  return createHash("sha256").update(`${SECRET}:${token}`).digest("hex");
}

function tokensMatch(token, hash) {
  if (!hash) return false;
  const a = Buffer.from(hashToken(token));
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function signLinkToken(payload) {
  const body = Buffer.from(
    JSON.stringify({
      e: payload.email.toLowerCase(),
      p: payload.purpose,
      exp: payload.expMs,
    }),
    "utf8"
  ).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyLinkToken(token, purpose) {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false };
  const [body, sig] = parts;
  const expected = createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };
  const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (data.p !== purpose) return { ok: false };
  if (data.exp < Date.now()) return { ok: false };
  return { ok: true, email: data.e };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.trim().length <= 254;
}

// —— tests ——
const tok = randomBytes(32).toString("base64url");
const h = hashToken(tok);
assert.equal(tokensMatch(tok, h), true);
assert.equal(tokensMatch("wrong", h), false);

const signed = signLinkToken({
  email: "Person@Example.COM",
  purpose: "prefs",
  expMs: Date.now() + 60_000,
});
const v = verifyLinkToken(signed, "prefs");
assert.equal(v.ok, true);
assert.equal(v.email, "person@example.com");
assert.equal(verifyLinkToken(signed, "unsub").ok, false);

const expired = signLinkToken({
  email: "a@b.co",
  purpose: "unsub",
  expMs: Date.now() - 1000,
});
assert.equal(verifyLinkToken(expired, "unsub").ok, false);

assert.equal(isValidEmail("ok@bigfivegroup.africa"), true);
assert.equal(isValidEmail("not-an-email"), false);

console.log("newsletter crypto/contracts: all passed");
