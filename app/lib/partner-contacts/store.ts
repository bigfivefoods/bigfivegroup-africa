/**
 * Durable partner-contacts store with cascade:
 * 1. Upstash Redis REST when UPSTASH_* env set
 * 2. Local JSON file (dev)
 * 3. In-process memory
 *
 * Server-only — never import from Client Components.
 */

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { PartnerContact, PartnerContactsSnapshot } from "./types";

const DEFAULT_DATA_FILE = path.join(process.cwd(), "data", "partner-contacts.json");
const REDIS_KEY = "bfg:partner-contacts:v1";

let memorySnap: PartnerContactsSnapshot = emptySnapshot();

function emptySnapshot(): PartnerContactsSnapshot {
  return { version: 1, updatedAt: new Date().toISOString(), contacts: [] };
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

async function readRedis(): Promise<PartnerContactsSnapshot | null> {
  if (!upstashConfigured()) return null;
  try {
    const raw = await redisCommand(["GET", REDIS_KEY]);
    if (!raw || typeof raw !== "string") return null;
    const data = JSON.parse(raw) as PartnerContactsSnapshot;
    if (!data?.contacts || !Array.isArray(data.contacts)) return null;
    return {
      version: 1,
      updatedAt: data.updatedAt || new Date().toISOString(),
      contacts: data.contacts,
    };
  } catch (err) {
    console.warn("[partner-contacts] redis read failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

async function writeRedis(snap: PartnerContactsSnapshot): Promise<boolean> {
  if (!upstashConfigured()) return false;
  try {
    await redisCommand(["SET", REDIS_KEY, JSON.stringify(snap)]);
    return true;
  } catch (err) {
    console.warn("[partner-contacts] redis write failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function readFileStore(filePath: string): Promise<PartnerContactsSnapshot> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw) as PartnerContactsSnapshot;
    if (!data?.contacts || !Array.isArray(data.contacts)) return emptySnapshot();
    return {
      version: 1,
      updatedAt: data.updatedAt || new Date().toISOString(),
      contacts: data.contacts,
    };
  } catch {
    return emptySnapshot();
  }
}

async function writeFileStore(filePath: string, data: PartnerContactsSnapshot): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

function pickNewer(
  a: PartnerContactsSnapshot | null,
  b: PartnerContactsSnapshot | null
): PartnerContactsSnapshot {
  if (!a) return b ?? emptySnapshot();
  if (!b) return a;
  return Date.parse(a.updatedAt) >= Date.parse(b.updatedAt) ? a : b;
}

export async function loadPartnerContacts(): Promise<PartnerContactsSnapshot> {
  const filePath = process.env.PARTNER_CONTACTS_FILE?.trim() || DEFAULT_DATA_FILE;
  const redis = await readRedis();
  const file = await readFileStore(filePath);
  // Prefer durable stores over in-process memory (Next may isolate API vs RSC bundles).
  const durable = pickNewer(redis, file.contacts.length || file.updatedAt ? file : null);
  if (durable.contacts.length > 0 || redis || file.contacts.length > 0) {
    memorySnap = durable;
    return durable;
  }
  return memorySnap;
}

export async function savePartnerContacts(snap: PartnerContactsSnapshot): Promise<void> {
  const next: PartnerContactsSnapshot = {
    ...snap,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  memorySnap = next;
  // Always write file so API routes and RSC pages share state without Redis.
  const filePath = process.env.PARTNER_CONTACTS_FILE?.trim() || DEFAULT_DATA_FILE;
  await writeFileStore(filePath, next);
  await writeRedis(next);
}

export async function listActiveContacts(slug?: string): Promise<PartnerContact[]> {
  const snap = await loadPartnerContacts();
  return snap.contacts.filter(
    (c) => c.status === "active" && (!slug || c.slug === slug)
  );
}

export async function findActiveContactByEmail(
  email: string
): Promise<PartnerContact | null> {
  const n = email.trim().toLowerCase();
  if (!n) return null;
  const snap = await loadPartnerContacts();
  return (
    snap.contacts.find((c) => c.status === "active" && c.email.toLowerCase() === n) ?? null
  );
}

export async function upsertPartnerContact(
  contact: PartnerContact
): Promise<PartnerContact> {
  const snap = await loadPartnerContacts();
  const email = contact.email.trim().toLowerCase();
  const idx = snap.contacts.findIndex((c) => c.email.toLowerCase() === email);
  const nextContact: PartnerContact = { ...contact, email };
  if (idx >= 0) {
    snap.contacts[idx] = {
      ...snap.contacts[idx],
      ...nextContact,
      id: snap.contacts[idx]!.id,
      createdAt: snap.contacts[idx]!.createdAt,
      createdBy: snap.contacts[idx]!.createdBy,
    };
  } else {
    snap.contacts.push(nextContact);
  }
  await savePartnerContacts(snap);
  return idx >= 0 ? snap.contacts[idx]! : nextContact;
}

export async function revokePartnerContact(email: string): Promise<boolean> {
  const snap = await loadPartnerContacts();
  const n = email.trim().toLowerCase();
  const idx = snap.contacts.findIndex((c) => c.email.toLowerCase() === n);
  if (idx < 0) return false;
  snap.contacts[idx] = {
    ...snap.contacts[idx]!,
    status: "revoked",
  };
  await savePartnerContacts(snap);
  return true;
}

export async function markContactInvited(
  email: string,
  invitedBy: string,
  inviteId?: string
): Promise<void> {
  const snap = await loadPartnerContacts();
  const n = email.trim().toLowerCase();
  const idx = snap.contacts.findIndex((c) => c.email.toLowerCase() === n && c.status === "active");
  if (idx < 0) return;
  snap.contacts[idx] = {
    ...snap.contacts[idx]!,
    invitedAt: new Date().toISOString(),
    invitedBy,
    lastInviteId: inviteId,
  };
  await savePartnerContacts(snap);
}
