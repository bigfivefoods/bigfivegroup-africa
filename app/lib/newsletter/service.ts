/**
 * Newsletter subscribe / confirm / unsubscribe / preferences service.
 * Server-only — never import from Client Components (use newsletter/client).
 */

import "server-only";
import { CONTACT_EMAIL } from "../contact";
import {
  hashIp,
  hashToken,
  hashUa,
  newId,
  newToken,
  signLinkToken,
  tokensMatch,
  verifyLinkToken,
} from "./crypto";
import {
  buildConfirmEmail,
  buildWelcomeEmail,
  resendConfigured,
  sendResendEmail,
} from "./email";
import { rateLimitAllow, rateLimitKey } from "./rate-limit";
import {
  appendEvent,
  getSubscriberByEmail,
  listSubscribers,
  saveSubscriber,
  storeBackendLabel,
} from "./store";
import type {
  NewsletterSubscribeInput,
  NewsletterSubscribeResult,
  NewsletterSubscriber,
  NewsletterTopicId,
  SubscriberStatus,
} from "./types";
import {
  isBlockedEmailDomain,
  isValidNewsletterEmail,
  normalizeEmail,
  normalizeTopics,
} from "./validation";

export {
  isValidNewsletterEmail,
  normalizeEmail,
  normalizeTopics,
  isBlockedEmailDomain,
} from "./validation";

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

async function notifyWebhook(
  event: string,
  subscriber: NewsletterSubscriber
): Promise<void> {
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
        store: storeBackendLabel(),
        at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn("[newsletter] webhook failed:", err instanceof Error ? err.message : err);
  }
}

function unsubPath(email: string, rawToken: string): string {
  return `/newsletter/unsubscribe?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;
}

function prefsPath(email: string, rawToken: string): string {
  return `/newsletter/preferences?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;
}

function confirmPath(email: string, rawToken: string): string {
  return `/newsletter/confirm?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;
}

async function sendWelcome(sub: NewsletterSubscriber, origin: string, unsubRaw: string, prefsRaw: string) {
  const mail = buildWelcomeEmail({
    to: sub.email,
    name: sub.name,
    prefsUrl: `${origin}${prefsPath(sub.email, prefsRaw)}`,
    unsubUrl: `${origin}${unsubPath(sub.email, unsubRaw)}`,
  });
  await sendResendEmail({
    to: sub.email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    headers: mail.headers,
    tags: [
      { name: "category", value: "newsletter_welcome" },
      { name: "source", value: (sub.source || "website").slice(0, 40) },
    ],
  });
}

/**
 * Subscribe (or re-subscribe) an address.
 * - With RESEND_API_KEY: double opt-in (pending until confirm link).
 * - Without: single opt-in after explicit consent checkbox (POPIA consent recorded).
 */
export async function subscribeNewsletter(
  input: NewsletterSubscribeInput,
  opts?: { ip?: string | null; userAgent?: string | null; requestUrl?: string }
): Promise<NewsletterSubscribeResult> {
  // Honeypot — pretend success
  if (input.website && String(input.website).trim() !== "") {
    return {
      ok: true,
      status: "active",
      email: "ok@example.com",
      message: "Subscribed.",
      mode: "single_opt_in",
    };
  }

  if (!rateLimitAllow(rateLimitKey(opts?.ip, "subscribe"))) {
    return {
      ok: false,
      error: "Too many attempts from this network. Please try again later.",
      code: "rate_limited",
    };
  }

  const email = normalizeEmail(input.email ?? "");
  if (!isValidNewsletterEmail(email)) {
    return { ok: false, error: "Please enter a valid email address.", code: "invalid_email" };
  }
  if (isBlockedEmailDomain(email)) {
    return {
      ok: false,
      error: "Please use a permanent email address.",
      code: "blocked_domain",
    };
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
  const useDoubleOptIn = resendConfigured();
  const origin = siteOrigin(opts?.requestUrl);

  const confirmToken = newToken();
  const unsubToken = newToken();
  const prefsToken = newToken();

  if (existing?.status === "active") {
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
      prefsTokenHash: existing.prefsTokenHash || hashToken(prefsToken),
      ipHash: hashIp(opts?.ip) ?? existing.ipHash,
      uaHash: hashUa(opts?.userAgent) ?? existing.uaHash,
    };
    await saveSubscriber(updated);
    await appendEvent("newsletter.updated", email, { source });
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
    id: existing?.id ?? newId("sub"),
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
    uaHash: hashUa(opts?.userAgent),
    unsubTokenHash: hashToken(unsubToken),
    prefsTokenHash: hashToken(prefsToken),
  };

  if (useDoubleOptIn) {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();
    const pending: NewsletterSubscriber = {
      ...base,
      status: "pending",
      confirmTokenHash: hashToken(confirmToken),
      confirmTokenExpiresAt: expires,
      confirmedAt: undefined,
      unsubscribedAt: undefined,
    };
    await saveSubscriber(pending);
    await appendEvent("newsletter.pending", email, { source });
    await notifyWebhook("newsletter.pending", pending);

    const path = confirmPath(email, confirmToken);
    const confirmUrl = `${origin}${path}`;
    // Also support API GET redirect for email clients
    const apiConfirmUrl = `${origin}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}&email=${encodeURIComponent(email)}`;
    const mail = buildConfirmEmail({ to: email, name, confirmUrl: apiConfirmUrl });
    const emailed = await sendResendEmail({
      to: email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      tags: [{ name: "category", value: "newsletter_confirm" }],
    });

    return {
      ok: true,
      status: "pending",
      email,
      confirmPath: emailed.ok ? undefined : path,
      message: emailed.ok
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
  await appendEvent("newsletter.subscribed", email, { source, mode: "single_opt_in" });
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
  token: string,
  opts?: { requestUrl?: string }
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
  const unsubToken = newToken();
  const prefsToken = newToken();
  const active: NewsletterSubscriber = {
    ...sub,
    status: "active",
    confirmedAt: now,
    updatedAt: now,
    confirmTokenHash: undefined,
    confirmTokenExpiresAt: undefined,
    unsubscribedAt: undefined,
    unsubTokenHash: sub.unsubTokenHash || hashToken(unsubToken),
    prefsTokenHash: sub.prefsTokenHash || hashToken(prefsToken),
  };
  await saveSubscriber(active);
  await appendEvent("newsletter.confirmed", email);
  await notifyWebhook("newsletter.confirmed", active);

  const origin = siteOrigin(opts?.requestUrl);
  // Prefer store tokens: we need raw tokens for links — mint signed long-lived prefs/unsub
  const prefsSigned = signLinkToken({
    email,
    purpose: "prefs",
    expMs: Date.now() + 1000 * 60 * 60 * 24 * 365,
  });
  const unsubSigned = signLinkToken({
    email,
    purpose: "unsub",
    expMs: Date.now() + 1000 * 60 * 60 * 24 * 365 * 2,
  });
  await sendWelcome(active, origin, unsubSigned, prefsSigned);

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

  // Signed link without email in body of form
  if (token && !email) {
    const verified = verifyLinkToken(token, "unsub");
    if (verified.ok) {
      return unsubscribeNewsletter(verified.email, token);
    }
  }

  if (!isValidNewsletterEmail(email)) {
    return { ok: false, error: "Please enter a valid email address.", code: "invalid_email" };
  }

  const sub = await getSubscriberByEmail(email);
  if (!sub) {
    return {
      ok: true,
      status: "unsubscribed",
      email,
      message: "If that address was subscribed, it has been removed.",
      mode: "single_opt_in",
    };
  }

  // Accept hashed unsub token OR signed link token
  if (token) {
    const signed = verifyLinkToken(token, "unsub");
    const hashOk = tokensMatch(token, sub.unsubTokenHash);
    const signedOk = signed.ok && signed.email === email;
    if (!hashOk && !signedOk) {
      // Allow email-only unsub from web form (POPIA right to object) without token
      // when no token was required — if token was provided and invalid, reject
      if (token.length > 20) {
        return { ok: false, error: "Invalid unsubscribe link.", code: "invalid_token" };
      }
    }
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
  await appendEvent("newsletter.unsubscribed", email);
  await notifyWebhook("newsletter.unsubscribed", updated);

  return {
    ok: true,
    status: "unsubscribed",
    email,
    message: "You have been unsubscribed. You can re-subscribe anytime.",
    mode: "single_opt_in",
  };
}

export async function getPreferences(
  emailRaw: string,
  token: string
): Promise<
  | { ok: true; email: string; topics: NewsletterTopicId[]; status: SubscriberStatus; name?: string }
  | { ok: false; error: string; code?: string }
> {
  const email = normalizeEmail(emailRaw);
  if (!token) return { ok: false, error: "Missing preferences token.", code: "invalid_token" };

  const signed = verifyLinkToken(token, "prefs");
  const sub = await getSubscriberByEmail(signed.ok ? signed.email : email);
  if (!sub) return { ok: false, error: "Subscription not found.", code: "not_found" };

  const hashOk = tokensMatch(token, sub.prefsTokenHash);
  const signedOk = signed.ok && signed.email === sub.email;
  if (!hashOk && !signedOk) {
    return { ok: false, error: "Invalid or expired preferences link.", code: "invalid_token" };
  }

  return {
    ok: true,
    email: sub.email,
    topics: sub.topics,
    status: sub.status,
    name: sub.name,
  };
}

export async function updatePreferences(
  emailRaw: string,
  token: string,
  topicsRaw: string[]
): Promise<NewsletterSubscribeResult> {
  const prefs = await getPreferences(emailRaw, token);
  if (!prefs.ok) return prefs;

  if (prefs.status === "unsubscribed") {
    return {
      ok: false,
      error: "This address is unsubscribed. Subscribe again from the newsletter page.",
      code: "unsubscribed",
    };
  }

  const topics = normalizeTopics(topicsRaw);
  const sub = await getSubscriberByEmail(prefs.email);
  if (!sub) return { ok: false, error: "Subscription not found.", code: "not_found" };

  const now = new Date().toISOString();
  const updated: NewsletterSubscriber = {
    ...sub,
    topics,
    updatedAt: now,
    // If they were pending and manage prefs after confirm path, keep status
  };
  await saveSubscriber(updated);
  await appendEvent("newsletter.preferences", prefs.email, { topics: topics.join(",") });
  await notifyWebhook("newsletter.preferences", updated);

  return {
    ok: true,
    status: updated.status,
    email: prefs.email,
    message: "Your topic preferences have been saved.",
    mode: "single_opt_in",
  };
}

export async function exportSubscribersForAdmin(secret: string): Promise<
  | { ok: true; subscribers: NewsletterSubscriber[]; backend: string }
  | { ok: false; error: string }
> {
  const expected = process.env.NEWSLETTER_ADMIN_SECRET?.trim();
  if (!expected || expected.length < 16) {
    return { ok: false, error: "Admin export is not configured." };
  }
  if (secret !== expected) {
    return { ok: false, error: "Unauthorized." };
  }
  const subscribers = await listSubscribers();
  // Strip token hashes from export for safer CRM handoff (status-facing fields only)
  const safe = subscribers.map((s) => ({
    ...s,
    confirmTokenHash: undefined,
    unsubTokenHash: undefined,
    prefsTokenHash: undefined,
    ipHash: undefined,
    uaHash: undefined,
  }));
  return { ok: true, subscribers: safe, backend: storeBackendLabel() };
}

/** @deprecated Kept for backwards compatibility */
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
