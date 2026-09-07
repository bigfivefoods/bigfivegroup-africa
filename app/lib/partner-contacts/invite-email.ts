/**
 * Partner portal invite email (Resend).
 * Server-only.
 */

import "server-only";
import { CONTACT_EMAIL } from "../contact";
import { SITE_NAME, SITE_URL } from "../site";
import { resendConfigured, sendResendEmail } from "../newsletter/email";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function partnerLoginUrl(slug: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL).replace(/\/$/, "");
  return `${base}/partner/login?from=${encodeURIComponent(`/partner/${slug}`)}`;
}

export function buildPartnerInviteEmail(opts: {
  toName: string;
  toEmail: string;
  organisation: string;
  partnerName: string;
  slug: string;
  invitedByName?: string;
}): { subject: string; text: string; html: string; loginUrl: string } {
  const loginUrl = partnerLoginUrl(opts.slug);
  const first = opts.toName.trim().split(/\s+/)[0] || "there";
  const subject = `You're invited — ${opts.partnerName} partner portal · ${SITE_NAME}`;
  const text = [
    `Hi ${first},`,
    "",
    `${opts.invitedByName || "Big Five Group"} has invited you to the private partner workspace for ${opts.organisation}.`,
    "",
    "Open your organisation portal (use this email address to sign in):",
    loginUrl,
    "",
    "This workspace is private to your organisation. You will not see other partners' materials.",
    "",
    `Questions? Reply to this email or write to ${CONTACT_EMAIL}.`,
    "",
    `— ${SITE_NAME}`,
    "Feed · Educate · Empower",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#171717;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0a0a0a;padding:28px 32px;">
            <div style="font-size:11px;letter-spacing:2px;color:#6ee7b7;font-weight:600;">${escapeHtml(SITE_NAME.toUpperCase())}</div>
            <div style="font-size:20px;font-weight:600;color:#ffffff;margin-top:8px;letter-spacing:-0.02em;">Partner portal invitation</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;">You're invited, ${escapeHtml(first)}</h1>
            <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">
              ${escapeHtml(opts.invitedByName || "Big Five Group")} has invited you to the private partner workspace for
              <strong style="color:#0a0a0a;">${escapeHtml(opts.organisation)}</strong>.
            </p>
            <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#404040;">
              Sign in with <strong style="color:#0a0a0a;">${escapeHtml(opts.toEmail)}</strong> — no password required.
              You will only see materials for your organisation.
            </p>
            <p style="margin:28px 0 8px;">
              <a href="${escapeHtml(loginUrl)}" style="display:inline-block;background:#059669;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:999px;">
                Open partner portal
              </a>
            </p>
            <p style="margin:12px 0 0;font-size:12px;color:#737373;word-break:break-all;">
              Or open: <a href="${escapeHtml(loginUrl)}" style="color:#404040;">${escapeHtml(loginUrl)}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;font-size:12px;line-height:1.5;color:#737373;">
            <p style="margin:0;">Questions? Reply to this email or write to ${escapeHtml(CONTACT_EMAIL)}.</p>
            <p style="margin:12px 0 0;">© ${new Date().getFullYear()} ${escapeHtml(SITE_NAME)} · Feed · Educate · Empower</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, text, html, loginUrl };
}

export type InviteSendResult =
  | { ok: true; mode: "resend"; id?: string; loginUrl: string }
  | { ok: true; mode: "link_only"; loginUrl: string; reason: string }
  | { ok: false; error: string; loginUrl: string };

export async function sendPartnerInviteEmail(opts: {
  toName: string;
  toEmail: string;
  organisation: string;
  partnerName: string;
  slug: string;
  invitedByName?: string;
}): Promise<InviteSendResult> {
  const built = buildPartnerInviteEmail(opts);
  if (!resendConfigured()) {
    return {
      ok: true,
      mode: "link_only",
      loginUrl: built.loginUrl,
      reason: "Resend is not configured — copy the login link and send it manually.",
    };
  }
  // Prefer verified-domain From — NEWSLETTER_FROM may be onboarding@resend.dev (dev-only).
  const from =
    process.env.PARTNER_INVITE_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Big Five Group <${CONTACT_EMAIL}>`;

  const sent = await sendResendEmail({
    to: opts.toEmail,
    from,
    replyTo: CONTACT_EMAIL,
    subject: built.subject,
    text: built.text,
    html: built.html,
    tags: [
      { name: "category", value: "partner_invite" },
      { name: "partner_slug", value: opts.slug.slice(0, 40) },
    ],
  });
  if (sent.ok) {
    return { ok: true, mode: "resend", id: sent.id, loginUrl: built.loginUrl };
  }
  return {
    ok: true,
    mode: "link_only",
    loginUrl: built.loginUrl,
    reason: `Email send failed (${sent.reason}) — copy the login link instead.`,
  };
}
