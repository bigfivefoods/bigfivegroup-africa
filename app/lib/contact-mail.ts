/**
 * Server-side contact enquiry delivery via Resend.
 * Falls back to mailto-only when RESEND_API_KEY is not configured.
 */

import "server-only";
import {
  CONTACT_EMAIL,
  buildMailto,
  interestLabel,
  type EnquiryPayload,
} from "./contact";
import { resendConfigured, sendResendEmail } from "./newsletter/email";

function enquiryInbox(): string {
  return (
    process.env.CONTACT_INBOX_EMAIL?.trim() ||
    process.env.NEWSLETTER_FROM_EMAIL?.match(/<([^>]+)>/)?.[1]?.trim() ||
    CONTACT_EMAIL
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactSendResult =
  | { ok: true; mode: "resend"; id?: string; message: string }
  | { ok: true; mode: "mailto"; mailto: string; message: string }
  | { ok: false; error: string };

/**
 * Deliver enquiry to Big Five inbox via Resend (preferred), or return mailto fallback.
 */
export async function deliverContactEnquiry(
  payload: EnquiryPayload
): Promise<ContactSendResult> {
  const subject = `Big Five enquiry — ${interestLabel(payload.interest)} — ${payload.name}`;
  const text = [
    "New enquiry from bigfivegroup.africa/contact",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.organisation ? `Organisation: ${payload.organisation}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Interest: ${interestLabel(payload.interest)}`,
    "",
    "Message:",
    payload.message,
    "",
    "— Reply to this email to respond to the visitor (Reply-To is set).",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.55;color:#171717;">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#059669;font-weight:600;">
        Website enquiry
      </p>
      <h1 style="margin:0 0 16px;font-size:20px;letter-spacing:-0.02em;">${escapeHtml(subject)}</h1>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
        <tr><td style="padding:6px 0;color:#737373;width:120px;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        ${
          payload.organisation
            ? `<tr><td style="padding:6px 0;color:#737373;">Organisation</td><td style="padding:6px 0;">${escapeHtml(payload.organisation)}</td></tr>`
            : ""
        }
        ${
          payload.phone
            ? `<tr><td style="padding:6px 0;color:#737373;">Phone</td><td style="padding:6px 0;">${escapeHtml(payload.phone)}</td></tr>`
            : ""
        }
        <tr><td style="padding:6px 0;color:#737373;">Interest</td><td style="padding:6px 0;">${escapeHtml(interestLabel(payload.interest))}</td></tr>
      </table>
      <div style="padding:16px;background:#fafafa;border-radius:12px;border:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
      <p style="margin:20px 0 0;font-size:12px;color:#737373;">Reply to this email to respond to the visitor.</p>
    </div>
  `;

  if (resendConfigured()) {
    const sent = await sendResendEmail({
      to: enquiryInbox(),
      replyTo: payload.email,
      subject,
      text,
      html,
      tags: [
        { name: "category", value: "contact_enquiry" },
        { name: "interest", value: String(payload.interest).slice(0, 40) },
      ],
    });
    if (sent.ok) {
      return {
        ok: true,
        mode: "resend",
        id: sent.id,
        message:
          "Thank you — your enquiry has been sent. We typically reply within 1–2 business days.",
      };
    }
    // Soft fallback if Resend fails
    console.warn("[contact] Resend failed, returning mailto fallback:", sent.reason);
    return {
      ok: true,
      mode: "mailto",
      mailto: buildMailto(payload),
      message:
        "We could not send from the site just now. Please open the email draft (or use WhatsApp) to complete your enquiry.",
    };
  }

  return {
    ok: true,
    mode: "mailto",
    mailto: buildMailto(payload),
    message:
      "Open your email app to send the enquiry (site email is not configured yet).",
  };
}
