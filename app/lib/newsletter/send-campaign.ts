/**
 * Send a campaign via Resend to active subscribers (or a single test address).
 */

import "server-only";
import { CONTACT_EMAIL } from "../contact";
import { SITE_NAME, SITE_URL } from "../site";
import { signLinkToken } from "./crypto";
import { markdownToEmailHtml, markdownToPlainText } from "./markdown";
import { getCampaign, updateCampaign, type NewsletterCampaign } from "./campaigns";
import { listSubscribers } from "./store";
import { resendConfigured, type SendEmailResult } from "./email";

function fromAddress(): string {
  return (
    process.env.NEWSLETTER_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Big Five Group <${CONTACT_EMAIL}>`
  );
}

function buildCampaignHtml(opts: {
  subject: string;
  preheader: string;
  bodyMd: string;
  unsubUrl: string;
}): string {
  const year = new Date().getFullYear();
  const bodyHtml = markdownToEmailHtml(opts.bodyMd);
  const pre = opts.preheader || opts.subject;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escape(opts.subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(pre)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0a0a0a;padding:28px 32px;">
            <div style="font-size:11px;letter-spacing:2px;color:#6ee7b7;font-weight:600;">${escape(SITE_NAME.toUpperCase())}</div>
            <div style="font-size:20px;font-weight:600;color:#ffffff;margin-top:8px;">Feed · Educate · Empower</div>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;letter-spacing:-0.02em;color:#0a0a0a;">${escape(opts.subject)}</h1>
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;font-size:12px;line-height:1.5;color:#737373;">
            <p style="margin:0 0 12px;">
              <a href="${escape(opts.unsubUrl)}" style="color:#525252;">Unsubscribe</a>
              ·
              <a href="${SITE_URL}/newsletter/preferences" style="color:#525252;">Manage preferences</a>
            </p>
            <p style="margin:0;">© ${year} ${escape(SITE_NAME)} · KwaZulu-Natal · South Africa</p>
            <p style="margin:8px 0 0;"><a href="${SITE_URL}" style="color:#404040;">bigfivegroup.africa</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendOneResend(opts: {
  to: string;
  subject: string;
  text: string;
  html: string;
  unsubUrl: string;
}): Promise<SendEmailResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { ok: false, reason: "no_resend_key" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [opts.to],
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
        headers: {
          "List-Unsubscribe": `<${opts.unsubUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        tags: [{ name: "category", value: "newsletter_campaign" }],
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.warn("[campaign send]", res.status, t.slice(0, 200));
      return { ok: false, reason: `resend_${res.status}` };
    }
    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "network" };
  }
}

function unsubUrlFor(email: string): string {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || SITE_URL;
  const token = signLinkToken({
    email,
    purpose: "unsub",
    expMs: Date.now() + 1000 * 60 * 60 * 24 * 365 * 2,
  });
  return `${origin}/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
}

export type SendCampaignResult =
  | {
      ok: true;
      campaign: NewsletterCampaign;
      sent: number;
      failed: number;
      mode: "test" | "broadcast";
    }
  | { ok: false; error: string };

/**
 * Send campaign. testEmail = only that address; otherwise all active subscribers.
 */
export async function sendCampaign(
  campaignId: string,
  opts?: { testEmail?: string }
): Promise<SendCampaignResult> {
  if (!resendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const campaign = await getCampaign(campaignId);
  if (!campaign) return { ok: false, error: "Campaign not found." };
  if (!campaign.subject.trim() || !campaign.body.trim()) {
    return { ok: false, error: "Subject and body are required." };
  }
  if (campaign.status === "sending") {
    return { ok: false, error: "Campaign is already sending." };
  }

  const testEmail = opts?.testEmail?.trim().toLowerCase();
  let recipients: string[] = [];

  if (testEmail) {
    recipients = [testEmail];
  } else {
    const active = await listSubscribers({ status: "active" });
    recipients = active.map((s) => s.email);
    if (!recipients.length) {
      return { ok: false, error: "No active subscribers to send to." };
    }
  }

  await updateCampaign(campaignId, { status: "sending", lastError: undefined });

  let sent = 0;
  let failed = 0;
  const plainBase = markdownToPlainText(campaign.body);

  // Sequential with small delay to respect Resend rate limits
  for (const to of recipients) {
    const unsubUrl = unsubUrlFor(to);
    const html = buildCampaignHtml({
      subject: campaign.subject,
      preheader: campaign.preheader,
      bodyMd: campaign.body,
      unsubUrl,
    });
    const text = [
      campaign.subject,
      "",
      plainBase,
      "",
      `Unsubscribe: ${unsubUrl}`,
      SITE_URL,
    ].join("\n");

    const result = await sendOneResend({
      to,
      subject: campaign.subject,
      text,
      html,
      unsubUrl,
    });
    if (result.ok) sent++;
    else failed++;

    // ~2 req/s soft limit
    await new Promise((r) => setTimeout(r, 350));
  }

  const finalStatus = failed > 0 && sent === 0 ? "failed" : "sent";
  const updated = await updateCampaign(campaignId, {
    status: finalStatus,
    sentAt: new Date().toISOString(),
    sentCount: sent,
    failCount: failed,
    lastError: failed ? `${failed} delivery failure(s)` : undefined,
    testTo: testEmail || undefined,
  });

  return {
    ok: true,
    campaign: updated!,
    sent,
    failed,
    mode: testEmail ? "test" : "broadcast",
  };
}

export function previewCampaignHtml(campaign: Pick<NewsletterCampaign, "subject" | "preheader" | "body">): string {
  return buildCampaignHtml({
    subject: campaign.subject || "Preview",
    preheader: campaign.preheader || "",
    bodyMd: campaign.body || "_Empty draft_",
    unsubUrl: `${SITE_URL}/newsletter/unsubscribe`,
  });
}
