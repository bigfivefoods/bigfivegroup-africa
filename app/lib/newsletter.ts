import { CONTACT_EMAIL } from "./contact";

export type NewsletterSubscribePayload = {
  email: string;
  name?: string;
  organisation?: string;
  /** Honeypot — must stay empty */
  website?: string;
  /** Source: footer | page | etc. */
  source?: string;
};

export function isValidNewsletterEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Builds a mailto so the subscriber confirms opt-in from their own inbox
 * (same no-third-party-mail pattern as the contact form).
 */
export function buildNewsletterMailto(payload: NewsletterSubscribePayload): string {
  const email = payload.email.trim().toLowerCase();
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
    "I consent to receive occasional updates from Big Five Group Africa about programmes, partnership opportunities and Group news. I can unsubscribe by emailing the same address.",
    "",
    "— Sent from bigfivegroup.africa/newsletter",
  ].filter(Boolean);

  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export const NEWSLETTER_TOPICS = [
  "Programme updates (NSNP, nutrition, community)",
  "Partnership and procurement pathways",
  "Leadership · Super-Cube® and Connect news",
  "Continental Group milestones",
] as const;
