/**
 * Newsletter subscription domain model.
 *
 * Persistence:
 * - Local/dev: append-safe JSON file at data/newsletter-subscribers.json
 * - Production: optional NEWSLETTER_WEBHOOK_URL (CRM / Make / Zapier / ESP)
 * - Optional RESEND_API_KEY for double-opt-in confirmation emails
 *
 * Status machine: pending → active → unsubscribed (re-subscribe reopens as pending/active)
 */

import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { CONTACT_EMAIL } from "./contact";

// —— Topics ——

export const NEWSLETTER_TOPIC_OPTIONS = [
  {
    id: "programmes",
    label: "Programme updates",
    desc: "NSNP, nutrition, community and institutional delivery.",
  },
  {
    id: "partnerships",
    label: "Partnerships & procurement",
    desc: "How to work with the Group and pathway news.",
  },
  {
    id: "leadership",
    label: "Leadership · Super-Cube® & Connect",
    desc: "Capability, SupplierAdvisor® and SAM updates.",
  },
  {
    id: "milestones",
    label: "Continental Group milestones",
    desc: "Impact stories and continental progress.",
  },
] as const;

export type NewsletterTopicId = (typeof NEWSLETTER_TOPIC_OPTIONS)[number]["id"];

export const NEWSLETTER_TOPICS = NEWSLETTER_TOPIC_OPTIONS.map((t) => t.label);

export const ALL_TOPIC_IDS: NewsletterTopicId[] = NEWSLETTER_TOPIC_OPTIONS.map((t) => t.id);

// —— Domain types ——

export type SubscriberStatus = "pending" | "active" | "unsubscribed";

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name?: string;
  organisation?: string;
  status: SubscriberStatus;
  topics: NewsletterTopicId[];
  source: string;
  /** Explicit marketing consent recorded at signup */
  consent: boolean;
  consentAt: string;
  createdAt: string;
  updatedAt: string;
  /** SHA-256 of confirmation token (pending double opt-in) */
  confirmTokenHash?: string;
  confirmTokenExpiresAt?: string;
  confirmedAt?: string;
  /** SHA-256 of unsubscribe token */
  unsubTokenHash?: string;
  unsubscribedAt?: string;
  /** Last IP hash for abuse review (not full IP) */
  ipHash?: string;
};

export type NewsletterSubscribeInput = {
  email: string;
  name?: string;
  organisation?: string;
  topics?: string[];
  consent?: boolean;
  /** Honeypot — must stay empty */
  website?: string;
  source?: string;
};

export type NewsletterSubscribeResult =
  | {
      ok: true;
      status: SubscriberStatus;
      email: string;
      /** Present when double opt-in email could not be sent — client shows confirm link */
      confirmPath?: string;
      message: string;
      mode: "double_opt_in" | "single_opt_in";
    }
  | { ok: false; error: string; code?: string };

// —— Validation ——

export function isValidNewsletterEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.trim().length <= 254;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeTopics(raw: string[] | undefined): NewsletterTopicId[] {
  if (!raw?.length) return [...ALL_TOPIC_IDS];
  const allowed = new Set<string>(ALL_TOPIC_IDS);
  const picked = raw
    .map((t) => String(t).trim().toLowerCase())
    .filter((t): t is NewsletterTopicId => allowed.has(t));
  return picked.length ? [...new Set(picked)] : [...ALL_TOPIC_IDS];
}

// —— Crypto helpers ——

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

function newId(): string {
  return `sub_${randomBytes(12).toString("hex")}`;
}

function hashIp(ip: string | null | undefined): string | undefined {
  if (!ip) return undefined;
  return createHash("sha256").update(`${getSecret()}:ip:${ip}`).digest("hex").slice(0, 16);
}

// —— Store ——

const DEFAULT_DATA_FILE = path.join(process.cwd(), "data", "newsletter-subscribers.json");

type StoreFile = {
  version: 1;
  updatedAt: string;
  subscribers: NewsletterSubscriber[];
};

async function readStoreFile(filePath: string): Promise<StoreFile> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw) as StoreFile;
    if (!data?.subscribers || !Array.isArray(data.subscribers)) {
      return { version: 1, updatedAt: new Date().toISOString(), subscribers: [] };
    }
    return data;
  } catch {
    return { version: 1, updatedAt: new Date().toISOString(), subscribers: [] };
  }
}

async function writeStoreFile(filePath: string, data: StoreFile): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

/** In-process fallback when the filesystem is read-only (e.g. some serverless runs). */
const memoryStore = new Map<string, NewsletterSubscriber>();

export async function getSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
  const key = normalizeEmail(email);
  const filePath = process.env.NEWSLETTER_STORE_PATH?.trim() || DEFAULT_DATA_FILE;
  try {
    const store = await readStoreFile(filePath);
    const found = store.subscribers.find((s) => s.email === key);
    if (found) return found;
  } catch {
    /* fall through */
  }
  return memoryStore.get(key) ?? null;
}

export async function saveSubscriber(sub: NewsletterSubscriber): Promise<void> {
  memoryStore.set(sub.email, sub);
  const filePath = process.env.NEWSLETTER_STORE_PATH?.trim() || DEFAULT_DATA_FILE;
  try {
    const store = await readStoreFile(filePath);
    const idx = store.subscribers.findIndex((s) => s.email === sub.email);
    if (idx >= 0) store.subscribers[idx] = sub;
    else store.subscribers.push(sub);
    store.updatedAt = new Date().toISOString();
    await writeStoreFile(filePath, store);
  } catch (err) {
    // Serverless may be read-only — memory + webhook still capture the event
    console.warn("[newsletter] file store unavailable:", err instanceof Error ? err.message : err);
  }
}

async function notifyWebhook(event: string, subscriber: NewsletterSubscriber): Promise<void> {
  const url = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_WEBHOOK_SECRET
          ? { "X-Newsletter-Secret": process.env.NEWSLETTER_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        event,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
          organisation: subscriber.organisation,
          status: subscriber.status,
          topics: subscriber.topics,
          source: subscriber.source,
          consentAt: subscriber.consentAt,
          confirmedAt: subscriber.confirmedAt,
          unsubscribedAt: subscriber.unsubscribedAt,
        },
        at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn("[newsletter] webhook failed:", err instanceof Error ? err.message : err);
  }
}

async function sendResendConfirmEmail(opts: {
  to: string;
  name?: string;
  confirmUrl: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  const from = process.env.NEWSLETTER_FROM_EMAIL?.trim() || CONTACT_EMAIL;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: "Confirm your Big Five Group Africa newsletter subscription",
        text: [
          opts.name ? `Hi ${opts.name},` : "Hello,",
          "",
          "Please confirm your subscription to the Big Five Group Africa newsletter.",
          "",
          `Confirm: ${opts.confirmUrl}`,
          "",
          "If you did not request this, you can ignore this email.",
          "",
          "— Big Five Group Africa",
          "Feed · Educate · Empower",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.warn("[newsletter] Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[newsletter] Resend failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

function siteOrigin(requestUrl?: string): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  if (env) return env.replace(/\/$/, "");
  if (requestUrl) {
    try {
      return new URL(requestUrl).origin;
    } catch {
      /* fall through */
    }
  }
  return "https://bigfivegroup.africa";
}

/**
 * Subscribe (or re-subscribe) an address.
 * - With RESEND_API_KEY: double opt-in (pending until confirm link).
 * - Without: single opt-in after explicit consent checkbox (POPIA consent recorded).
 */
export async function subscribeNewsletter(
  input: NewsletterSubscribeInput,
  opts?: { ip?: string | null; requestUrl?: string }
): Promise<NewsletterSubscribeResult> {
  if (input.website && String(input.website).trim() !== "") {
    // Honeypot — pretend success
    return {
      ok: true,
      status: "active",
      email: "ok@example.com",
      message: "Subscribed.",
      mode: "single_opt_in",
    };
  }

  const email = normalizeEmail(input.email ?? "");
  if (!isValidNewsletterEmail(email)) {
    return { ok: false, error: "Please enter a valid email address.", code: "invalid_email" };
  }

  const name = (input.name ?? "").trim().slice(0, 120) || undefined;
  const organisation = (input.organisation ?? "").trim().slice(0, 160) || undefined;
  const source = (input.source ?? "website").trim().slice(0, 80) || "website";
  const topics = normalizeTopics(input.topics);
  const consent = Boolean(input.consent);

  if (!consent) {
    return {
      ok: false,
      error: "Please confirm you agree to receive the newsletter.",
      code: "consent_required",
    };
  }

  const now = new Date().toISOString();
  const existing = await getSubscriberByEmail(email);
  const useDoubleOptIn = Boolean(process.env.RESEND_API_KEY?.trim());

  const confirmToken = newToken();
  const unsubToken = newToken();

  if (existing?.status === "active") {
    // Update prefs on already-active subscriber
    const updated: NewsletterSubscriber = {
      ...existing,
      name: name ?? existing.name,
      organisation: organisation ?? existing.organisation,
      topics,
      source,
      consent: true,
      consentAt: existing.consentAt || now,
      updatedAt: now,
      unsubTokenHash: existing.unsubTokenHash || hashToken(unsubToken),
    };
    await saveSubscriber(updated);
    await notifyWebhook("newsletter.updated", updated);
    return {
      ok: true,
      status: "active",
      email,
      message: "You are already subscribed. Your preferences have been updated.",
      mode: useDoubleOptIn ? "double_opt_in" : "single_opt_in",
    };
  }

  const base: Omit<NewsletterSubscriber, "status"> = {
    id: existing?.id ?? newId(),
    email,
    name,
    organisation,
    topics,
    source,
    consent: true,
    consentAt: now,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    ipHash: hashIp(opts?.ip),
    unsubTokenHash: hashToken(unsubToken),
  };

  if (useDoubleOptIn) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(); // 48h
    const pending: NewsletterSubscriber = {
      ...base,
      status: "pending",
      confirmTokenHash: hashToken(confirmToken),
      confirmTokenExpiresAt: expires,
      confirmedAt: undefined,
      unsubscribedAt: undefined,
    };
    await saveSubscriber(pending);
    await notifyWebhook("newsletter.pending", pending);

    const origin = siteOrigin(opts?.requestUrl);
    const confirmPath = `/newsletter/confirm?token=${encodeURIComponent(confirmToken)}&email=${encodeURIComponent(email)}`;
    const confirmUrl = `${origin}${confirmPath}`;
    const emailed = await sendResendConfirmEmail({ to: email, name, confirmUrl });

    return {
      ok: true,
      status: "pending",
      email,
      confirmPath: emailed ? undefined : confirmPath,
      message: emailed
        ? "Check your inbox for a confirmation link to complete your subscription."
        : "Almost done — confirm your subscription with the button below.",
      mode: "double_opt_in",
    };
  }

  // Single opt-in with recorded consent (no ESP configured)
  const active: NewsletterSubscriber = {
    ...base,
    status: "active",
    confirmedAt: now,
    confirmTokenHash: undefined,
    confirmTokenExpiresAt: undefined,
    unsubscribedAt: undefined,
  };
  await saveSubscriber(active);
  await notifyWebhook("newsletter.subscribed", active);

  return {
    ok: true,
    status: "active",
    email,
    message: "You are subscribed. Welcome — occasional updates only, no spam.",
    mode: "single_opt_in",
  };
}

export async function confirmNewsletterSubscription(
  emailRaw: string,
  token: string
): Promise<NewsletterSubscribeResult> {
  const email = normalizeEmail(emailRaw);
  if (!isValidNewsletterEmail(email) || !token) {
    return { ok: false, error: "Invalid confirmation link.", code: "invalid_token" };
  }

  const sub = await getSubscriberByEmail(email);
  if (!sub) {
    return { ok: false, error: "Subscription not found. Please subscribe again.", code: "not_found" };
  }

  if (sub.status === "active") {
    return {
      ok: true,
      status: "active",
      email,
      message: "Your subscription is already confirmed.",
      mode: "double_opt_in",
    };
  }

  if (!tokensMatch(token, sub.confirmTokenHash)) {
    return { ok: false, error: "This confirmation link is invalid.", code: "invalid_token" };
  }

  if (sub.confirmTokenExpiresAt && new Date(sub.confirmTokenExpiresAt).getTime() < Date.now()) {
    return {
      ok: false,
      error: "This confirmation link has expired. Please subscribe again.",
      code: "expired",
    };
  }

  const now = new Date().toISOString();
  const active: NewsletterSubscriber = {
    ...sub,
    status: "active",
    confirmedAt: now,
    updatedAt: now,
    confirmTokenHash: undefined,
    confirmTokenExpiresAt: undefined,
    unsubscribedAt: undefined,
  };
  await saveSubscriber(active);
  await notifyWebhook("newsletter.confirmed", active);

  return {
    ok: true,
    status: "active",
    email,
    message: "Subscription confirmed. You are on the list.",
    mode: "double_opt_in",
  };
}

export async function unsubscribeNewsletter(
  emailRaw: string,
  token?: string
): Promise<NewsletterSubscribeResult> {
  const email = normalizeEmail(emailRaw);
  if (!isValidNewsletterEmail(email)) {
    return { ok: false, error: "Please enter a valid email address.", code: "invalid_email" };
  }

  const sub = await getSubscriberByEmail(email);
  if (!sub) {
    // Do not reveal whether the address was on the list
    return {
      ok: true,
      status: "unsubscribed",
      email,
      message: "If that address was subscribed, it has been removed.",
      mode: "single_opt_in",
    };
  }

  if (token && sub.unsubTokenHash && !tokensMatch(token, sub.unsubTokenHash)) {
    return { ok: false, error: "Invalid unsubscribe link.", code: "invalid_token" };
  }

  const now = new Date().toISOString();
  const updated: NewsletterSubscriber = {
    ...sub,
    status: "unsubscribed",
    unsubscribedAt: now,
    updatedAt: now,
    confirmTokenHash: undefined,
    confirmTokenExpiresAt: undefined,
  };
  await saveSubscriber(updated);
  await notifyWebhook("newsletter.unsubscribed", updated);

  return {
    ok: true,
    status: "unsubscribed",
    email,
    message: "You have been unsubscribed. You can re-subscribe anytime.",
    mode: "single_opt_in",
  };
}

/** @deprecated Kept for backwards compatibility — prefer subscribeNewsletter */
export type NewsletterSubscribePayload = NewsletterSubscribeInput;

/** @deprecated mailto path no longer primary */
export function buildNewsletterMailto(payload: NewsletterSubscribeInput): string {
  const email = normalizeEmail(payload.email);
  const name = (payload.name ?? "").trim();
  const organisation = (payload.organisation ?? "").trim();
  const source = (payload.source ?? "website").trim();
  const subject = encodeURIComponent("Newsletter subscription — Big Five Group Africa");
  const lines = [
    "Please add me to the Big Five Group Africa newsletter.",
    "",
    `Email: ${email}`,
    name ? `Name: ${name}` : null,
    organisation ? `Organisation: ${organisation}` : null,
    `Source: ${source}`,
    `Date: ${new Date().toISOString()}`,
    "",
    "I consent to receive occasional updates from Big Five Group Africa.",
  ].filter(Boolean);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
}
