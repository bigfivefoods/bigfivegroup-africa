/**
 * Big Five Group Africa — world-class newsletter system (server entry).
 *
 * Client Components must import from `./client` (or `app/lib/newsletter/client`)
 * so Node-only modules (fs, store, Resend) never enter the browser bundle.
 *
 * Features:
 * - POPIA consent + double opt-in (Resend) or single opt-in with recorded consent
 * - Durable store: Upstash Redis → file → memory cascade
 * - Topic preferences + preference centre
 * - Branded HTML confirm + welcome emails
 * - Rate limiting, honeypot, disposable-domain block
 * - Webhook fan-out for CRM / ESP
 * - Admin export (NEWSLETTER_ADMIN_SECRET)
 * - On-site composer + Grok drafts + Resend broadcast
 */

import "server-only";

export {
  NEWSLETTER_TOPIC_OPTIONS,
  NEWSLETTER_TOPICS,
  ALL_TOPIC_IDS,
  type NewsletterTopicId,
  type SubscriberStatus,
  type NewsletterSubscriber,
  type NewsletterSubscribeInput,
  type NewsletterSubscribeResult,
  type NewsletterEvent,
  type NewsletterEventType,
  type NewsletterStoreSnapshot,
} from "./types";

export {
  isValidNewsletterEmail,
  normalizeEmail,
  normalizeTopics,
  isBlockedEmailDomain,
  subscribeNewsletter,
  confirmNewsletterSubscription,
  unsubscribeNewsletter,
  getPreferences,
  updatePreferences,
  exportSubscribersForAdmin,
  buildNewsletterMailto,
  type NewsletterSubscribePayload,
} from "./service";

export { getSubscriberByEmail, listSubscribers, storeBackendLabel } from "./store";
export { resendConfigured } from "./email";
export { hashToken, newToken, tokensMatch } from "./crypto";
export {
  listCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  type NewsletterCampaign,
  type CampaignStatus,
} from "./campaigns";
export { sendCampaign, previewCampaignHtml } from "./send-campaign";
export { draftNewsletterWithGrok, xaiConfigured } from "./xai";

/** Prefer `newsletter/client` in Client Components to avoid pulling Node-only store. */
