#!/usr/bin/env node
/**
 * Generate newsletter secrets + push newsletter/Resend env to Vercel.
 *
 * Usage:
 *   export VERCEL_TOKEN=vercel_xxxx          # https://vercel.com/account/tokens
 *   export RESEND_API_KEY=re_xxxx            # or put in .env.vercel.secrets
 *   # optional:
 *   export NEWSLETTER_FROM_EMAIL='Big Five Group <news@bigfivegroup.africa>'
 *   export UPSTASH_REDIS_REST_URL=...
 *   export UPSTASH_REDIS_REST_TOKEN=...
 *
 *   node scripts/setup-newsletter-env.mjs
 *   npm run setup:newsletter
 *
 * Writes non-secret placeholders into .env.vercel.secrets if missing,
 * generates NEWSLETTER_SECRET + NEWSLETTER_ADMIN_SECRET, then runs env sync.
 */

import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const secretsPath = resolve(root, ".env.vercel.secrets");

function parseEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function genSecret() {
  return randomBytes(32).toString("base64");
}

function ensureSecretsFile(vars) {
  const existing = parseEnvFile(secretsPath);
  const merged = { ...existing };

  for (const [k, v] of Object.entries(vars)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      merged[k] = String(v).trim();
    }
  }

  if (!merged.NEWSLETTER_SECRET) merged.NEWSLETTER_SECRET = genSecret();
  if (!merged.NEWSLETTER_ADMIN_SECRET) merged.NEWSLETTER_ADMIN_SECRET = genSecret();
  if (!merged.NEXT_PUBLIC_SITE_URL) {
    merged.NEXT_PUBLIC_SITE_URL = "https://bigfivegroup.africa";
  }
  if (!merged.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    merged.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = "bigfivegroup.africa";
  }

  const lines = [
    "# Generated / updated by scripts/setup-newsletter-env.mjs — DO NOT COMMIT",
    `# Updated: ${new Date().toISOString()}`,
    "",
    `NEXT_PUBLIC_SITE_URL=${merged.NEXT_PUBLIC_SITE_URL}`,
    `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=${merged.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ""}`,
    "",
    "# Resend",
    `RESEND_API_KEY=${merged.RESEND_API_KEY ?? ""}`,
    `NEWSLETTER_FROM_EMAIL=${merged.NEWSLETTER_FROM_EMAIL ?? "Big Five Group <news@bigfivegroup.africa>"}`,
    "",
    "# Newsletter secrets",
    `NEWSLETTER_SECRET=${merged.NEWSLETTER_SECRET}`,
    `NEWSLETTER_ADMIN_SECRET=${merged.NEWSLETTER_ADMIN_SECRET}`,
    "",
    "# Upstash (optional but recommended for durable subscribers on Vercel)",
    `UPSTASH_REDIS_REST_URL=${merged.UPSTASH_REDIS_REST_URL ?? ""}`,
    `UPSTASH_REDIS_REST_TOKEN=${merged.UPSTASH_REDIS_REST_TOKEN ?? ""}`,
    "",
    "# Optional webhook",
    `NEWSLETTER_WEBHOOK_URL=${merged.NEWSLETTER_WEBHOOK_URL ?? ""}`,
    `NEWSLETTER_WEBHOOK_SECRET=${merged.NEWSLETTER_WEBHOOK_SECRET ?? ""}`,
    "",
  ];

  // Preserve other keys already in secrets
  const written = new Set(
    lines
      .map((l) => l.split("=")[0])
      .filter((k) => k && !k.startsWith("#"))
  );
  for (const [k, v] of Object.entries(existing)) {
    if (!written.has(k)) lines.push(`${k}=${v}`);
  }

  writeFileSync(secretsPath, lines.join("\n") + "\n", "utf8");
  return merged;
}

const fromEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NEWSLETTER_FROM_EMAIL: process.env.NEWSLETTER_FROM_EMAIL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  NEWSLETTER_WEBHOOK_URL: process.env.NEWSLETTER_WEBHOOK_URL,
  NEWSLETTER_WEBHOOK_SECRET: process.env.NEWSLETTER_WEBHOOK_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

const secrets = ensureSecretsFile(fromEnv);

console.log(`
Wrote ${secretsPath}

Configured keys:
  RESEND_API_KEY:              ${secrets.RESEND_API_KEY ? "set (" + secrets.RESEND_API_KEY.slice(0, 6) + "…)" : "MISSING — set RESEND_API_KEY or edit .env.vercel.secrets"}
  NEWSLETTER_FROM_EMAIL:       ${secrets.NEWSLETTER_FROM_EMAIL || "(default recommended)"}
  NEWSLETTER_SECRET:           set
  NEWSLETTER_ADMIN_SECRET:     set
  NEXT_PUBLIC_SITE_URL:        ${secrets.NEXT_PUBLIC_SITE_URL}
  UPSTASH_REDIS_REST_URL:      ${secrets.UPSTASH_REDIS_REST_URL ? "set" : "not set (list may not persist on Vercel)"}
  UPSTASH_REDIS_REST_TOKEN:    ${secrets.UPSTASH_REDIS_REST_TOKEN ? "set" : "not set"}
`);

if (!secrets.RESEND_API_KEY) {
  console.error(`
Missing RESEND_API_KEY.

1. Resend → API Keys → Create: https://resend.com/api-keys
2. Resend → Domains → verify bigfivegroup.africa: https://resend.com/domains
3. Then:
     export RESEND_API_KEY=re_xxxx
     export NEWSLETTER_FROM_EMAIL='Big Five Group <news@bigfivegroup.africa>'
     export VERCEL_TOKEN=vercel_xxxx   # https://vercel.com/account/tokens
     npm run setup:newsletter
`);
  process.exit(1);
}

if (!process.env.VERCEL_TOKEN) {
  console.error(`
Missing VERCEL_TOKEN — cannot push env to Vercel from this environment.

Create a token: https://vercel.com/account/tokens
Then:
  export VERCEL_TOKEN=vercel_xxxx
  npm run setup:newsletter

Or paste variables manually in Vercel:
  Project → Settings → Environment Variables
  https://vercel.com/bigfivefoods-projects/bigfivegroup-africa-8rr7/settings/environment-variables

Secrets are ready in .env.vercel.secrets — do not commit that file.
`);
  process.exit(1);
}

console.log("Pushing env to Vercel via scripts/sync-vercel-env.mjs …\n");
const r = spawnSync(process.execPath, [resolve(root, "scripts/sync-vercel-env.mjs")], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
});
process.exit(r.status ?? 1);
