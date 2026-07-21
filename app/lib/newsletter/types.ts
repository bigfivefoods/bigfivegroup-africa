/**
 * Newsletter domain types — Big Five Group Africa.
 * Status machine: pending → active → unsubscribed (re-subscribe reopens).
 */

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

export type SubscriberStatus = "pending" | "active" | "unsubscribed";

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name?: string;
  organisation?: string;
  status: SubscriberStatus;
  topics: NewsletterTopicId[];
  source: string;
  /** Explicit marketing consent recorded at signup (POPIA) */
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
  /** SHA-256 of preference-management token */
  prefsTokenHash?: string;
  unsubscribedAt?: string;
  /** Last IP hash for abuse review (not full IP) */
  ipHash?: string;
  /** User-Agent hash (optional abuse signal) */
  uaHash?: string;
  /** Soft tags for CRM routing */
  tags?: string[];
};

export type NewsletterEventType =
  | "newsletter.pending"
  | "newsletter.subscribed"
  | "newsletter.confirmed"
  | "newsletter.updated"
  | "newsletter.unsubscribed"
  | "newsletter.preferences";

export type NewsletterEvent = {
  id: string;
  type: NewsletterEventType;
  email: string;
  at: string;
  meta?: Record<string, string | number | boolean | null>;
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

export type NewsletterStoreSnapshot = {
  version: 2;
  updatedAt: string;
  subscribers: NewsletterSubscriber[];
  events?: NewsletterEvent[];
};
