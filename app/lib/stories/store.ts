/**
 * Story store — Upstash Redis → file → memory (same cascade as newsletter).
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash, randomBytes } from "node:crypto";
import type { Story, StoryStore } from "./types";
import { seedStories } from "./seed";
import { slugify } from "./markdown-web";

const REDIS_KEY = "bfg:stories:v1";
const DEFAULT_FILE = path.join(process.cwd(), "data", "stories.json");
const memory = new Map<string, Story>();

function emptyStore(): StoryStore {
  return { version: 1, updatedAt: new Date().toISOString(), stories: [] };
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

function newStoryId(): string {
  return `story_${randomBytes(10).toString("hex")}`;
}

async function loadRaw(): Promise<StoryStore> {
  if (upstashConfigured()) {
    try {
      const raw = await redisCommand(["GET", REDIS_KEY]);
      if (raw && typeof raw === "string") {
        const data = JSON.parse(raw) as StoryStore;
        if (Array.isArray(data.stories)) {
          for (const s of data.stories) memory.set(s.id, s);
          return data;
        }
      }
    } catch (err) {
      console.warn("[stories] redis read:", err instanceof Error ? err.message : err);
    }
  }
  try {
    const raw = await fs.readFile(DEFAULT_FILE, "utf8");
    const data = JSON.parse(raw) as StoryStore;
    if (Array.isArray(data.stories)) {
      for (const s of data.stories) memory.set(s.id, s);
      return data;
    }
  } catch {
    /* empty */
  }
  return emptyStore();
}

async function saveStore(store: StoryStore): Promise<void> {
  store.updatedAt = new Date().toISOString();
  for (const s of store.stories) memory.set(s.id, s);

  if (upstashConfigured()) {
    try {
      await redisCommand(["SET", REDIS_KEY, JSON.stringify(store)]);
      return;
    } catch (err) {
      console.warn("[stories] redis write:", err instanceof Error ? err.message : err);
    }
  }
  try {
    await fs.mkdir(path.dirname(DEFAULT_FILE), { recursive: true });
    const tmp = `${DEFAULT_FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    await fs.rename(tmp, DEFAULT_FILE);
  } catch (err) {
    console.warn("[stories] file write:", err instanceof Error ? err.message : err);
  }
}

/** Ensure seed content exists once. */
export async function ensureStoriesSeeded(): Promise<StoryStore> {
  const store = await loadRaw();
  if (store.stories.length > 0) return store;
  store.stories = seedStories();
  await saveStore(store);
  return store;
}

export async function listStories(opts?: {
  status?: "draft" | "published" | "all";
}): Promise<Story[]> {
  const store = await ensureStoriesSeeded();
  let list = store.stories;
  const status = opts?.status ?? "published";
  if (status !== "all") list = list.filter((s) => s.status === status);
  return [...list].sort((a, b) => {
    const da = a.publishedAt || a.createdAt;
    const db = b.publishedAt || b.createdAt;
    return db.localeCompare(da);
  });
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const store = await ensureStoriesSeeded();
  return store.stories.find((s) => s.slug === slug) ?? null;
}

export async function getStoryById(id: string): Promise<Story | null> {
  const store = await ensureStoriesSeeded();
  return store.stories.find((s) => s.id === id) ?? memory.get(id) ?? null;
}

function uniqueSlug(store: StoryStore, base: string, excludeId?: string): string {
  let slug = slugify(base);
  let n = 0;
  while (store.stories.some((s) => s.slug === slug && s.id !== excludeId)) {
    n += 1;
    slug = `${slugify(base)}-${n}`;
  }
  return slug;
}

export async function createStory(input?: {
  title?: string;
  excerpt?: string;
  body?: string;
  tag?: string;
  coverImage?: string;
  videoUrl?: string;
  grokBrief?: string;
}): Promise<Story> {
  const store = await ensureStoriesSeeded();
  const now = new Date().toISOString();
  const title = (input?.title ?? "Untitled story").trim() || "Untitled story";
  const story: Story = {
    id: newStoryId(),
    slug: uniqueSlug(store, title),
    title,
    excerpt: (input?.excerpt ?? "").trim(),
    body: (input?.body ?? "").trim(),
    tag: (input?.tag ?? "Group").trim() || "Group",
    status: "draft",
    coverImage: input?.coverImage?.trim() || undefined,
    videoUrl: input?.videoUrl?.trim() || undefined,
    grokBrief: input?.grokBrief?.trim(),
    createdAt: now,
    updatedAt: now,
  };
  store.stories.unshift(story);
  store.stories = store.stories.slice(0, 200);
  await saveStore(store);
  return story;
}

export async function updateStory(
  id: string,
  patch: Partial<
    Pick<
      Story,
      | "title"
      | "excerpt"
      | "body"
      | "tag"
      | "status"
      | "coverImage"
      | "videoUrl"
      | "publishedAt"
      | "slug"
      | "grokBrief"
      | "grokModel"
    >
  >
): Promise<Story | null> {
  const store = await ensureStoriesSeeded();
  const idx = store.stories.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const cur = store.stories[idx];
  let slug = cur.slug;
  if (patch.title && patch.title !== cur.title && !patch.slug) {
    slug = uniqueSlug(store, patch.title, id);
  }
  if (patch.slug) slug = uniqueSlug(store, patch.slug, id);

  const next: Story = {
    ...cur,
    ...patch,
    slug,
    title: patch.title !== undefined ? String(patch.title).slice(0, 200) : cur.title,
    excerpt: patch.excerpt !== undefined ? String(patch.excerpt).slice(0, 500) : cur.excerpt,
    body: patch.body !== undefined ? String(patch.body).slice(0, 100_000) : cur.body,
    tag: patch.tag !== undefined ? String(patch.tag).slice(0, 80) : cur.tag,
    updatedAt: new Date().toISOString(),
  };

  if (patch.status === "published" && !next.publishedAt) {
    next.publishedAt = new Date().toISOString();
  }

  store.stories[idx] = next;
  await saveStore(store);
  return next;
}

export async function deleteStory(id: string): Promise<boolean> {
  const store = await ensureStoriesSeeded();
  const before = store.stories.length;
  store.stories = store.stories.filter((s) => s.id !== id);
  if (store.stories.length === before) return false;
  memory.delete(id);
  await saveStore(store);
  return true;
}

export function storyEtag(story: Story): string {
  return createHash("sha1").update(`${story.id}:${story.updatedAt}`).digest("hex").slice(0, 16);
}
