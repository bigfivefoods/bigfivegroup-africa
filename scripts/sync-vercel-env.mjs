#!/usr/bin/env node
/**
 * Sync env vars from .env.example / .env.vercel.secrets into the Vercel project.
 *
 * Prerequisites:
 *   1. Create a Vercel token: https://vercel.com/account/tokens
 *   2. export VERCEL_TOKEN=...
 *   3. Optionally create .env.vercel.secrets (gitignored) with secret values:
 *        RESEND_API_KEY=re_...
 *        NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...
 *
 * Usage:
 *   node scripts/sync-vercel-env.mjs
 *   npm run env:vercel
 *
 * Project: bigfivegroup-africa-8rr7 (from .vercel/project.json)
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const projectPath = resolve(root, ".vercel/project.json");
if (!existsSync(projectPath)) {
  console.error("Missing .vercel/project.json — link the project first.");
  process.exit(1);
}

const { projectId, orgId } = JSON.parse(readFileSync(projectPath, "utf8"));
const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error(`
No VERCEL_TOKEN found.

Create a token: https://vercel.com/account/tokens
Then:
  export VERCEL_TOKEN=vercel_xxxx
  npm run env:vercel
`);
  process.exit(1);
}

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

// Non-secret defaults we can set now
const defaults = {
  CONTACT_TO_EMAIL: "craig@bigfivegroup.africa",
  CONTACT_FROM_EMAIL: "Big Five Group <craig@bigfivegroup.africa>",
};

// Secrets / optional public config from local files (never commit secrets)
const secrets = {
  ...parseEnvFile(resolve(root, ".env.local")),
  ...parseEnvFile(resolve(root, ".env.vercel.secrets")),
};

const TARGETS = ["production", "preview", "development"];

// Keys we manage
const KEYS = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
  "CONTACT_WEBHOOK_URL",
  "NEXT_PUBLIC_CALENDLY_URL",
  "NEXT_PUBLIC_PLAUSIBLE_DOMAIN",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  "NEXT_PUBLIC_SAM_VIDEO_URL",
];

async function vercel(path, options = {}) {
  const url = `https://api.vercel.com${path}${path.includes("?") ? "&" : "?"}teamId=${orgId}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const err = new Error(`Vercel API ${res.status}: ${JSON.stringify(body)}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

async function listEnv() {
  const data = await vercel(`/v9/projects/${projectId}/env`);
  return data.envs || data || [];
}

async function upsertEnv(key, value, type = "encrypted") {
  if (value === undefined || value === null || String(value).trim() === "") {
    console.log(`  skip ${key} (empty)`);
    return;
  }

  const envs = await listEnv();
  const existing = envs.filter((e) => e.key === key);

  // Remove existing so we can recreate for all targets cleanly
  for (const e of existing) {
    try {
      await vercel(`/v9/projects/${projectId}/env/${e.id}`, { method: "DELETE" });
      console.log(`  removed old ${key} (${e.id})`);
    } catch (err) {
      console.warn(`  warn deleting ${key}:`, err.message);
    }
  }

  await vercel(`/v10/projects/${projectId}/env`, {
    method: "POST",
    body: JSON.stringify({
      key,
      value: String(value),
      type,
      target: TARGETS,
      // comment: "Synced by scripts/sync-vercel-env.mjs",
    }),
  });
  console.log(`  set ${key} → ${TARGETS.join(", ")} (${type})`);
}

async function main() {
  console.log(`Project ${projectId} · team ${orgId}`);
  console.log("Syncing environment variables…\n");

  const merged = { ...defaults, ...secrets };

  for (const key of KEYS) {
    const val = merged[key];
    // Public vars can be plain; secrets encrypted
    const type = key.startsWith("NEXT_PUBLIC_") ? "plain" : "encrypted";
    try {
      await upsertEnv(key, val, type);
    } catch (err) {
      console.error(`  FAIL ${key}:`, err.message);
    }
  }

  console.log("\nDone. Redeploy production for changes to take effect:");
  console.log("  vercel --prod");
  console.log("  or push an empty commit / Redeploy in the Vercel dashboard.");
  console.log("\nEmpty secrets (RESEND_API_KEY, Calendly, etc.) were skipped.");
  console.log("Add them to .env.vercel.secrets and re-run this script.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
