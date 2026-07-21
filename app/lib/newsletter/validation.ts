import { ALL_TOPIC_IDS, type NewsletterTopicId } from "./types";

/** Light disposable / throwaway domain block (expand via env NEWSLETTER_BLOCK_DOMAINS). */
const DEFAULT_BLOCKED_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "throwaway.email",
  "yopmail.com",
]);

export function isValidNewsletterEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.trim().length <= 254;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isBlockedEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return true;
  const extra = (process.env.NEWSLETTER_BLOCK_DOMAINS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const blocked = new Set([...DEFAULT_BLOCKED_DOMAINS, ...extra]);
  return blocked.has(domain);
}

export function normalizeTopics(raw: string[] | undefined): NewsletterTopicId[] {
  if (!raw?.length) return [...ALL_TOPIC_IDS];
  const allowed = new Set<string>(ALL_TOPIC_IDS);
  const picked = raw
    .map((t) => String(t).trim().toLowerCase())
    .filter((t): t is NewsletterTopicId => allowed.has(t));
  return picked.length ? [...new Set(picked)] : [...ALL_TOPIC_IDS];
}
