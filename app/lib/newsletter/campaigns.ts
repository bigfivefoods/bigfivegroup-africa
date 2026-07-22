/**
 * Newsletter campaign drafts + send history.
 * Stored alongside subscribers: Upstash Redis → file → memory.
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { newId } from "./crypto";

export type CampaignStatus = "draft" | "sending" | "sent" | "failed";

export type NewsletterCampaign = {
  id: string;
  subject: string;
  preheader: string;
  /** Simple markdown body */
  body: string;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  sentCount?: number;
  failCount?: number;
  /** Optional brief used for Grok */
  grokBrief?: string;
  grokModel?: string;
  lastError?: string;
  /** Test send only */
  testTo?: string;
};

type CampaignStore = {
  version: 1;
  updatedAt: string;
  campaigns: NewsletterCampaign[];
};

const REDIS_KEY = "bfg:newsletter:campaigns:v1";
const DEFAULT_FILE = path.join(process.cwd(), "data", "newsletter-campaigns.json");
const memory = new Map<string, NewsletterCampaign>();

function emptyStore(): CampaignStore {
  return { version: 1, updatedAt: new Date().toISOString(), campaigns: [] };
}

function upstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

async function redisCommand(args: (string | number)[]): Promise<unknown> {
  const base = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const res = await fetch(base, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

async function loadStore(): Promise<CampaignStore> {
  if (upstashConfigured()) {
    try {
      const raw = await redisCommand(["GET", REDIS_KEY]);
      if (raw && typeof raw === "string") {
        const data = JSON.parse(raw) as CampaignStore;
        if (Array.isArray(data.campaigns)) {
          for (const c of data.campaigns) memory.set(c.id, c);
          return data;
        }
      }
    } catch (err) {
      console.warn("[campaigns] redis read:", err instanceof Error ? err.message : err);
    }
  }
  try {
    const raw = await fs.readFile(DEFAULT_FILE, "utf8");
    const data = JSON.parse(raw) as CampaignStore;
    if (Array.isArray(data.campaigns)) {
      for (const c of data.campaigns) memory.set(c.id, c);
      return data;
    }
  } catch {
    /* empty */
  }
  return emptyStore();
}

async function saveStore(store: CampaignStore): Promise<void> {
  store.updatedAt = new Date().toISOString();
  for (const c of store.campaigns) memory.set(c.id, c);

  if (upstashConfigured()) {
    try {
      await redisCommand(["SET", REDIS_KEY, JSON.stringify(store)]);
      return;
    } catch (err) {
      console.warn("[campaigns] redis write:", err instanceof Error ? err.message : err);
    }
  }
  try {
    await fs.mkdir(path.dirname(DEFAULT_FILE), { recursive: true });
    const tmp = `${DEFAULT_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(tmp, DEFAULT_FILE);
  } catch (err) {
    console.warn("[campaigns] file write:", err instanceof Error ? err.message : err);
  }
}

export async function listCampaigns(): Promise<NewsletterCampaign[]> {
  const store = await loadStore();
  return [...store.campaigns].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getCampaign(id: string): Promise<NewsletterCampaign | null> {
  const store = await loadStore();
  return store.campaigns.find((c) => c.id === id) ?? memory.get(id) ?? null;
}

export async function createCampaign(input?: {
  subject?: string;
  preheader?: string;
  body?: string;
  grokBrief?: string;
}): Promise<NewsletterCampaign> {
  const now = new Date().toISOString();
  const campaign: NewsletterCampaign = {
    id: newId("camp"),
    subject: (input?.subject ?? "").trim() || "Untitled draft",
    preheader: (input?.preheader ?? "").trim(),
    body: (input?.body ?? "").trim() || "",
    status: "draft",
    createdAt: now,
    updatedAt: now,
    grokBrief: input?.grokBrief?.trim(),
  };
  const store = await loadStore();
  store.campaigns.unshift(campaign);
  store.campaigns = store.campaigns.slice(0, 100);
  await saveStore(store);
  return campaign;
}

export async function updateCampaign(
  id: string,
  patch: Partial<
    Pick<
      NewsletterCampaign,
      | "subject"
      | "preheader"
      | "body"
      | "status"
      | "sentAt"
      | "sentCount"
      | "failCount"
      | "grokBrief"
      | "grokModel"
      | "lastError"
      | "testTo"
    >
  >
): Promise<NewsletterCampaign | null> {
  const store = await loadStore();
  const idx = store.campaigns.findIndex((c) => c.id === id);
  if (idx < 0) return null;
  const next: NewsletterCampaign = {
    ...store.campaigns[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  store.campaigns[idx] = next;
  await saveStore(store);
  return next;
}

export async function deleteCampaign(id: string): Promise<boolean> {
  const store = await loadStore();
  const before = store.campaigns.length;
  store.campaigns = store.campaigns.filter((c) => c.id !== id);
  if (store.campaigns.length === before) return false;
  memory.delete(id);
  await saveStore(store);
  return true;
}
