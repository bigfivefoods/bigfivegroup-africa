/**
 * Durable subscriber store with cascade:
 * 1. Upstash Redis REST (production on Vercel) when UPSTASH_* env set
 * 2. Local JSON file (dev / persistent disk)
 * 3. In-process memory (same instance only)
 */

import { promises as fs } from "fs";
import path from "path";
import type { NewsletterEvent, NewsletterStoreSnapshot, NewsletterSubscriber } from "./types";
import { newId } from "./crypto";

const DEFAULT_DATA_FILE = path.join(process.cwd(), "data", "newsletter-subscribers.json");
const REDIS_KEY = "bfg:newsletter:v2";

const memoryStore = new Map<string, NewsletterSubscriber>();
const memoryEvents: NewsletterEvent[] = [];

function emptySnapshot(): NewsletterStoreSnapshot {
  return { version: 2, updatedAt: new Date().toISOString(), subscribers: [], events: [] };
}

function upstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

async function redisCommand(args: (string | number)[]): Promise<unknown> {
  const base = process.env.UPSTASH_REDIS_REST_URL!.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const res = await fetch(`${base}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upstash ${res.status}: ${text.slice(0, 200)}`);
  }
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

async function readRedis(): Promise<NewsletterStoreSnapshot | null> {
  if (!upstashConfigured()) return null;
  try {
    const raw = await redisCommand(["GET", REDIS_KEY]);
    if (!raw || typeof raw !== "string") return null;
    const data = JSON.parse(raw) as NewsletterStoreSnapshot;
    if (!data?.subscribers || !Array.isArray(data.subscribers)) return null;
    return {
      version: 2,
      updatedAt: data.updatedAt || new Date().toISOString(),
      subscribers: data.subscribers,
      events: Array.isArray(data.events) ? data.events.slice(-500) : [],
    };
  } catch (err) {
    console.warn("[newsletter] redis read failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

async function writeRedis(snap: NewsletterStoreSnapshot): Promise<boolean> {
  if (!upstashConfigured()) return false;
  try {
    await redisCommand(["SET", REDIS_KEY, JSON.stringify(snap)]);
    return true;
  } catch (err) {
    console.warn("[newsletter] redis write failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function readFileStore(filePath: string): Promise<NewsletterStoreSnapshot> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw) as NewsletterStoreSnapshot & { version?: number };
    if (!data?.subscribers || !Array.isArray(data.subscribers)) return emptySnapshot();
    return {
      version: 2,
      updatedAt: data.updatedAt || new Date().toISOString(),
      subscribers: data.subscribers,
      events: Array.isArray(data.events) ? data.events : [],
    };
  } catch {
    return emptySnapshot();
  }
}

async function writeFileStore(filePath: string, data: NewsletterStoreSnapshot): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

function mergeMemory(snap: NewsletterStoreSnapshot): NewsletterStoreSnapshot {
  const byEmail = new Map(snap.subscribers.map((s) => [s.email, s]));
  for (const [email, sub] of memoryStore) {
    const existing = byEmail.get(email);
    if (!existing || new Date(sub.updatedAt) >= new Date(existing.updatedAt)) {
      byEmail.set(email, sub);
    }
  }
  return {
    version: 2,
    updatedAt: new Date().toISOString(),
    subscribers: Array.from(byEmail.values()),
    events: [...(snap.events ?? []), ...memoryEvents].slice(-500),
  };
}

export async function loadSnapshot(): Promise<NewsletterStoreSnapshot> {
  const redis = await readRedis();
  if (redis) return mergeMemory(redis);

  const filePath = process.env.NEWSLETTER_STORE_PATH?.trim() || DEFAULT_DATA_FILE;
  const file = await readFileStore(filePath);
  return mergeMemory(file);
}

export async function persistSnapshot(snap: NewsletterStoreSnapshot): Promise<void> {
  // Always update memory
  for (const s of snap.subscribers) memoryStore.set(s.email, s);

  const redisOk = await writeRedis(snap);
  if (redisOk) return;

  const filePath = process.env.NEWSLETTER_STORE_PATH?.trim() || DEFAULT_DATA_FILE;
  try {
    await writeFileStore(filePath, snap);
  } catch (err) {
    console.warn("[newsletter] file store unavailable:", err instanceof Error ? err.message : err);
  }
}

export async function getSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
  const key = email.trim().toLowerCase();
  const mem = memoryStore.get(key);
  const snap = await loadSnapshot();
  const found = snap.subscribers.find((s) => s.email === key);
  if (mem && found) {
    return new Date(mem.updatedAt) >= new Date(found.updatedAt) ? mem : found;
  }
  return found ?? mem ?? null;
}

export async function saveSubscriber(sub: NewsletterSubscriber): Promise<void> {
  memoryStore.set(sub.email, sub);
  const snap = await loadSnapshot();
  const idx = snap.subscribers.findIndex((s) => s.email === sub.email);
  if (idx >= 0) snap.subscribers[idx] = sub;
  else snap.subscribers.push(sub);
  snap.updatedAt = new Date().toISOString();
  await persistSnapshot(snap);
}

export async function appendEvent(
  type: NewsletterEvent["type"],
  email: string,
  meta?: NewsletterEvent["meta"]
): Promise<void> {
  const event: NewsletterEvent = {
    id: newId("evt"),
    type,
    email,
    at: new Date().toISOString(),
    meta,
  };
  memoryEvents.push(event);
  if (memoryEvents.length > 200) memoryEvents.shift();

  try {
    const snap = await loadSnapshot();
    snap.events = [...(snap.events ?? []), event].slice(-500);
    snap.updatedAt = new Date().toISOString();
    await persistSnapshot(snap);
  } catch {
    /* non-fatal */
  }
}

export async function listSubscribers(filter?: {
  status?: NewsletterSubscriber["status"];
}): Promise<NewsletterSubscriber[]> {
  const snap = await loadSnapshot();
  let list = snap.subscribers;
  if (filter?.status) list = list.filter((s) => s.status === filter.status);
  return list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function storeBackendLabel(): string {
  if (upstashConfigured()) return "upstash";
  return "file+memory";
}
