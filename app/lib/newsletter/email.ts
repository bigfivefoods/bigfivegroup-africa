/**
 * Branded transactional email for newsletter (Resend).
 * HTML + plain text; List-Unsubscribe ready for future campaigns.
 * Server-only — never import from Client Components.
 */

import "server-only";
import { CONTACT_EMAIL } from "../contact";
import { SITE_NAME, SITE_URL } from "../site";

export type SendEmailResult = { ok: true; id?: string } | { ok: false; reason: string };

function fromAddress(): string {
  return (
    process.env.NEWSLETTER_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Big Five Group <${CONTACT_EMAIL}>`
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layoutHtml(opts: {
  preheader: string;
  title: string;
  bodyHtml: string;
  footerNote?: string;
}): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#171717;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
          <tr>
            <td style="background:#0a0a0a;padding:28px 32px;">
              <div style="font-size:11px;letter-spacing:2px;color:#6ee7b7;font-weight:600;">${escapeHtml(SITE_NAME.toUpperCase())}</div>
              <div style="font-size:20px;font-weight:600;color:#ffffff;margin-top:8px;letter-spacing:-0.02em;">Feed · Educate · Empower</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;">${escapeHtml(opts.title)}</h1>
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;font-size:12px;line-height:1.5;color:#737373;">
              ${opts.footerNote ? `<p style="margin:0 0 12px;">${opts.footerNote}</p>` : ""}
              <p style="margin:0;">© ${year} ${escapeHtml(SITE_NAME)} · KwaZulu-Natal · South Africa</p>
              <p style="margin:8px 0 0;"><a href="${SITE_URL}" style="color:#404040;">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(href: string, label: string): string {
  return `<p style="margin:28px 0 8px;">
  <a href="${escapeHtml(href)}" style="display:inline-block;background:#059669;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:999px;">
    ${escapeHtml(label)}
  </a>
</p>
<p style="margin:12px 0 0;font-size:12px;color:#737373;word-break:break-all;">
  Or open: <a href="${escapeHtml(href)}" style="color:#404040;">${escapeHtml(href)}</a>
</p>`;
}

export async function sendResendEmail(opts: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  /** Visitor address — Resend Reply-To so you can reply from your inbox */
  replyTo?: string | string[];
  headers?: Record<string, string>;
  tags?: { name: string; value: string }[];
}): Promise<SendEmailResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { ok: false, reason: "no_resend_key" };

  const to = Array.isArray(opts.to) ? opts.to : [opts.to];
  const replyTo = opts.replyTo
    ? Array.isArray(opts.replyTo)
      ? opts.replyTo
      : [opts.replyTo]
    : undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to,
        reply_to: replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
        headers: opts.headers,
        tags: opts.tags,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.warn("[newsletter] Resend error", res.status, body.slice(0, 300));
      return { ok: false, reason: `resend_${res.status}` };
    }
    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    console.warn("[newsletter] Resend failed:", err instanceof Error ? err.message : err);
    return { ok: false, reason: "resend_network" };
  }
}

export function buildConfirmEmail(opts: {
  to: string;
  name?: string;
  confirmUrl: string;
}): { subject: string; text: string; html: string } {
  const greeting = opts.name ? `Hi ${opts.name},` : "Hello,";
  const subject = `Confirm your ${SITE_NAME} newsletter subscription`;
  const text = [
    greeting,
    "",
    "Please confirm your subscription to the Big Five Group Africa newsletter.",
    "We only send occasional updates on programmes, partnerships and Group milestones.",
    "",
    `Confirm: ${opts.confirmUrl}`,
    "",
    "This link expires in 48 hours. If you did not request this, you can ignore this email.",
    "",
    `— ${SITE_NAME}`,
    "Feed · Educate · Empower",
  ].join("\n");

  const html = layoutHtml({
    preheader: "Confirm your subscription to Big Five Group Africa updates.",
    title: "Confirm your subscription",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">${escapeHtml(greeting)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">
        Thanks for joining our list. Confirm your email so we can send occasional updates on
        Feed · Educate · Empower — programmes, partnerships and continental milestones.
      </p>
      ${ctaButton(opts.confirmUrl, "Confirm subscription")}
      <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#737373;">
        This link expires in 48 hours. If you did not request this, ignore this email — you will not be subscribed.
      </p>
    `,
  });

  return { subject, text, html };
}

export function buildWelcomeEmail(opts: {
  to: string;
  name?: string;
  prefsUrl: string;
  unsubUrl: string;
}): { subject: string; text: string; html: string; headers: Record<string, string> } {
  const greeting = opts.name ? `Welcome, ${opts.name}.` : "Welcome.";
  const subject = `You're on the list — ${SITE_NAME}`;
  const text = [
    greeting,
    "",
    "You are subscribed to the Big Five Group Africa newsletter.",
    "Expect occasional updates only — no spam.",
    "",
    `Manage preferences: ${opts.prefsUrl}`,
    `Unsubscribe: ${opts.unsubUrl}`,
    "",
    `— ${SITE_NAME}`,
    SITE_URL,
  ].join("\n");

  const html = layoutHtml({
    preheader: "You are subscribed. Occasional updates only — manage preferences anytime.",
    title: "You're on the list",
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">${escapeHtml(greeting)}</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">
        Thanks for confirming. We'll share occasional updates on school nutrition, partnerships,
        leadership and continental progress — always with a clear way out.
      </p>
      <ul style="margin:16px 0;padding-left:20px;font-size:14px;line-height:1.7;color:#404040;">
        <li>Programme &amp; nutrition updates</li>
        <li>Partnership pathways</li>
        <li>Leadership · Super-Cube® &amp; Connect</li>
        <li>Continental milestones</li>
      </ul>
      ${ctaButton(opts.prefsUrl, "Manage preferences")}
      <p style="margin:20px 0 0;font-size:13px;color:#737373;">
        <a href="${escapeHtml(opts.unsubUrl)}" style="color:#525252;">Unsubscribe</a> anytime.
      </p>
    `,
    footerNote: `You received this because you confirmed your subscription at ${SITE_URL.replace(/^https?:\/\//, "")}.`,
  });

  return {
    subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${opts.unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}
