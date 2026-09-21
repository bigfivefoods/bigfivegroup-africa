/**
 * Partner portal invite email (Resend).
 * Server-only — table-based HTML for Outlook / Gmail / Apple Mail.
 */

import "server-only";
import { CONTACT_EMAIL, CONTACT_LOCATION } from "../contact";
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

function absoluteAsset(path: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export type PartnerInviteOpts = {
  toName: string;
  toEmail: string;
  organisation: string;
  partnerName: string;
  slug: string;
  invitedByName?: string;
  /** Quiet banner for review sends — omit for live Department invitations. */
  isTest?: boolean;
};

function buildNfnspInviteEmail(opts: PartnerInviteOpts): {
  subject: string;
  text: string;
  html: string;
  loginUrl: string;
} {
  const loginUrl = partnerLoginUrl(opts.slug);
  const first = opts.toName.trim().split(/\s+/)[0] || "there";
  const invitedBy = opts.invitedByName || "Big Five Group";
  const year = new Date().getFullYear();
  const ndaLogo = absoluteAsset("/partners/department-of-agriculture-logo.png");
  const bfgLogo = absoluteAsset("/bigfivegroup-logo.jpg");
  const footerArt = absoluteAsset("/partners/nfnsp-invite-footer.jpg");
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");

  const subject = opts.isTest
    ? `[Test] You're invited — NFNSP-2 partner workspace · Department of Agriculture`
    : `You're invited — NFNSP-2 partner workspace · Department of Agriculture`;
  const preheader = `${invitedBy} opened a private NFNSP-2 workspace for the Department of Agriculture. Sign in with ${opts.toEmail} — no password.`;

  const text = [
    `Hi ${first},`,
    "",
    `${invitedBy} has opened a private partner workspace for the NFNSP Technical Working Group / Department of Agriculture.`,
    "",
    "Inside is the implementation partnership briefing for the National Food and Nutrition Security Plan 2027–2037 — official Goals, Game Changers and Enablers, the nine-pillar circuit, and the 90-day ask.",
    "",
    "Confidential. Not a government publication. Not an awarded tender.",
    "",
    "Open your workspace (sign in with this email — no password):",
    loginUrl,
    "",
    "Sign in with: " + opts.toEmail,
    "",
    "What's inside: NFNSP-2 hub · official Goals 1–3 and Enablers A–C · nine pillars as one circuit · SupplierAdvisor® farm-to-fork OS (not BAS/LOGIS) · 90-day ask.",
    "",
    `Questions? Reply to this email or write to ${CONTACT_EMAIL}.`,
    "",
    `— ${SITE_NAME}`,
    "Feed · Educate · Empower",
    CONTACT_LOCATION,
  ].join("\n");

  const testBanner = opts.isTest
    ? `
          <tr>
            <td style="background:#F7F1E6;border-bottom:1px solid #E8C07A;padding:10px 28px;text-align:center;">
              <div style="font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#C4923A;font-weight:700;">
                Test invitation · review before Department send
              </div>
            </td>
          </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 620px) {
      .email-shell { padding: 16px 10px !important; }
      .email-card { width: 100% !important; }
      .pad-x { padding-left: 22px !important; padding-right: 22px !important; }
      .hero-pad { padding: 28px 22px 26px !important; }
      .cta-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
      .nda-logo { width: 168px !important; height: auto !important; }
      .bfg-logo { width: 48px !important; height: 48px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#F7F1E6;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#F7F1E6;opacity:0;">
    ${escapeHtml(preheader)}
    &#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F1E6;">
    <tr>
      <td align="center" class="email-shell" style="padding:36px 16px;">
        <table role="presentation" class="email-card" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E5D9C4;box-shadow:0 18px 50px rgba(11,28,34,0.10);">

          <!-- Letterhead: NDA left, Group globe right -->
          <tr>
            <td style="background:#ffffff;padding:18px 28px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td valign="middle" align="left">
                    <img class="nda-logo" src="${escapeHtml(ndaLogo)}" width="210" alt="Department of Agriculture · Republic of South Africa" style="display:block;width:210px;height:auto;max-width:210px;border:0;" />
                  </td>
                  <td valign="middle" align="right" width="64">
                    <img class="bfg-logo" src="${escapeHtml(bfgLogo)}" width="56" height="56" alt="Big Five Group" style="display:block;width:56px;height:56px;border:0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:3px;line-height:3px;font-size:0;background:#C4923A;">&nbsp;</td>
          </tr>
          ${testBanner}

          <!-- Forest invitation -->
          <tr>
            <td class="hero-pad" style="background:#0F3D38;padding:34px 32px 30px;">
              <div style="font-size:10px;letter-spacing:2.2px;text-transform:uppercase;color:#E8C07A;font-weight:700;margin-bottom:14px;">
                Partner portal · Confidential · NFNSP-2
              </div>
              <h1 style="margin:0;font-size:28px;line-height:1.18;letter-spacing:-0.03em;font-weight:600;color:#ffffff;">
                You're invited, ${escapeHtml(first)}
              </h1>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.55;color:rgba(255,255,255,0.82);">
                ${escapeHtml(invitedBy)} has opened a private workspace for the
                <span style="color:#E8C07A;font-weight:600;">NFNSP Technical Working Group / Department of Agriculture</span>.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="pad-x" style="padding:30px 32px 8px;">
              <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:#404040;">
                This is the implementation partnership briefing for the
                <strong style="color:#0B1C22;">National Food and Nutrition Security Plan 2027–2037</strong>
                — official Goals, Game Changers and Enablers, the nine-pillar circuit, and the 90-day ask.
              </p>
              <p style="margin:0 0 22px;font-size:14px;line-height:1.6;color:#525252;">
                Confidential partner briefing. Not a government publication. Not an awarded tender.
              </p>

              <!-- Workspace card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F7F1E6;border:1px solid #E8C07A;border-radius:16px;margin:0 0 22px;">
                <tr>
                  <td width="5" style="background:#0F3D38;border-radius:16px 0 0 16px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:16px 18px;">
                    <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#C4923A;font-weight:700;margin-bottom:6px;">
                      Your workspace
                    </div>
                    <div style="font-size:17px;font-weight:600;letter-spacing:-0.02em;color:#0F3D38;margin-bottom:4px;">
                      Department of Agriculture
                    </div>
                    <div style="font-size:13px;line-height:1.45;color:#525252;">
                      NFNSP-2 · 2027–2037 · Feed · Educate · Empower
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Sign-in -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;">
                <tr>
                  <td style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#737373;font-weight:600;padding-bottom:8px;">
                    Sign in with this email — no password
                  </td>
                </tr>
                <tr>
                  <td style="background:#0B1C22;border-radius:12px;padding:14px 18px;">
                    <a href="mailto:${escapeHtml(opts.toEmail)}" style="font-size:15px;font-weight:600;color:#E8C07A;text-decoration:none;word-break:break-all;">
                      ${escapeHtml(opts.toEmail)}
                    </a>
                    <div style="font-size:12px;color:rgba(247,241,230,0.65);margin-top:6px;">
                      Enter this address on the login page. You will not see other partners' materials.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- What's inside -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 6px;">
                <tr>
                  <td style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#C4923A;font-weight:700;padding-bottom:12px;">
                    What's inside
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 10px;font-size:14px;line-height:1.5;color:#404040;">
                    <strong style="color:#0F3D38;">01 · Hub</strong> — sourced national figures (GHS 2024, NFNSS 2023, Poverty Trends 2025).
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 10px;font-size:14px;line-height:1.5;color:#404040;">
                    <strong style="color:#0F3D38;">02 · Plan</strong> — official Goals 1–3 and Enablers A–C, each with a named circuit and a mandate limit.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 10px;font-size:14px;line-height:1.5;color:#404040;">
                    <strong style="color:#0F3D38;">03 · Circuit</strong> — Agri, Foods, Direct, Connect, Leadership — one implementation partner, not nine vendors.
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 4px;font-size:14px;line-height:1.5;color:#404040;">
                    <strong style="color:#0F3D38;">04 · OS &amp; 90-day ask</strong> — SupplierAdvisor® as the trade layer (not BAS/LOGIS), and five asks for the next ninety days.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="pad-x" align="center" style="padding:22px 32px 10px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${escapeHtml(loginUrl)}" style="height:52px;v-text-anchor:middle;width:300px;" arcsize="50%" stroke="f" fillcolor="#C4923A">
                <w:anchorlock/>
                <center style="color:#0B1C22;font-family:sans-serif;font-size:15px;font-weight:bold;">Open the NFNSP-2 workspace</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <a class="cta-btn" href="${escapeHtml(loginUrl)}" style="display:inline-block;background:#C4923A;color:#0B1C22;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:-0.01em;padding:16px 32px;border-radius:999px;">
                Open the NFNSP-2 workspace →
              </a>
              <!--<![endif]-->
            </td>
          </tr>
          <tr>
            <td class="pad-x" style="padding:6px 32px 24px;">
              <p style="margin:0;font-size:11px;line-height:1.5;color:#a3a3a3;text-align:center;word-break:break-all;">
                Or paste this link:<br />
                <a href="${escapeHtml(loginUrl)}" style="color:#737373;text-decoration:underline;">${escapeHtml(loginUrl)}</a>
              </p>
            </td>
          </tr>

          <!-- Kente footer art (pattern only — no globe) -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="${escapeHtml(footerArt)}" width="580" alt="" style="display:block;width:100%;max-width:580px;height:72px;object-fit:cover;border:0;" />
            </td>
          </tr>
          <tr>
            <td class="pad-x" style="background:#0B1C22;padding:18px 32px 22px;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.5;color:#E8C07A;font-weight:700;letter-spacing:0.4px;">
                CONFIDENTIAL · NFNSP-2 · v3.1 · Not an awarded tender
              </p>
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:rgba(247,241,230,0.75);">
                Questions? Reply to this email or write to
                <a href="mailto:${escapeHtml(CONTACT_EMAIL)}" style="color:#E8C07A;font-weight:600;text-decoration:none;">${escapeHtml(CONTACT_EMAIL)}</a>.
              </p>
              <p style="margin:0;font-size:11px;line-height:1.5;color:rgba(247,241,230,0.5);">
                ${escapeHtml(SITE_NAME)} · Feed · Educate · Empower<br />
                © ${year} · ${escapeHtml(CONTACT_LOCATION)} ·
                <a href="${escapeHtml(SITE_URL)}" style="color:rgba(247,241,230,0.55);text-decoration:none;">${escapeHtml(siteHost)}</a>
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;margin-top:16px;">
          <tr>
            <td align="center" style="font-size:11px;line-height:1.5;color:#8a7f6a;padding:0 12px;">
              This invitation is intended for ${escapeHtml(opts.toName)} (${escapeHtml(opts.toEmail)}).
              If you received it by mistake, you can ignore it.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html, loginUrl };
}

export function buildPartnerInviteEmail(opts: PartnerInviteOpts): {
  subject: string;
  text: string;
  html: string;
  loginUrl: string;
} {
  if (opts.slug === "department-of-agriculture") {
    return buildNfnspInviteEmail(opts);
  }
  const loginUrl = partnerLoginUrl(opts.slug);
  const first = opts.toName.trim().split(/\s+/)[0] || "there";
  const invitedBy = opts.invitedByName || "Big Five Group";
  const year = new Date().getFullYear();
  const logoUrl = absoluteAsset("/bigfivegroup-logo.png");
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");

  const subject = `You're invited — ${opts.partnerName} partner portal · ${SITE_NAME}`;
  const preheader = `${invitedBy} invited you to the private ${opts.partnerName} workspace. Sign in with ${opts.toEmail} — no password.`;

  const text = [
    `Hi ${first},`,
    "",
    `${invitedBy} has invited you to the private partner workspace for ${opts.organisation}.`,
    "",
    "Open your organisation portal (sign in with this email — no password):",
    loginUrl,
    "",
    "This workspace is private to your organisation. You will not see other partners' materials.",
    "",
    `Questions? Reply to this email or write to ${CONTACT_EMAIL}.`,
    "",
    `— ${SITE_NAME}`,
    "Feed · Educate · Empower",
    CONTACT_LOCATION,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 620px) {
      .email-shell { padding: 16px 10px !important; }
      .email-card { width: 100% !important; border-radius: 18px !important; }
      .pad-x { padding-left: 22px !important; padding-right: 22px !important; }
      .hero-pad { padding: 28px 22px 24px !important; }
      .cta-btn { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#e8ebe6;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#e8ebe6;opacity:0;">
    ${escapeHtml(preheader)}
    &#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;&#847;&zwnj;
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#e8ebe6;">
    <tr>
      <td align="center" class="email-shell" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" class="email-card" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #d4d9d1;box-shadow:0 18px 50px rgba(15,23,15,0.08);">

          <!-- Hero -->
          <tr>
            <td class="hero-pad" style="background:#052e1c;background-image:linear-gradient(160deg,#052e1c 0%,#0a0a0a 55%,#111111 100%);padding:36px 36px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right:12px;">
                          <img src="${escapeHtml(logoUrl)}" width="44" height="44" alt="" style="display:block;width:44px;height:44px;border-radius:11px;border:1px solid rgba(255,255,255,0.14);" />
                        </td>
                        <td valign="middle">
                          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6ee7b7;font-weight:700;line-height:1.2;">
                            ${escapeHtml(SITE_NAME)}
                          </div>
                          <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:3px;letter-spacing:-0.01em;">
                            Feed · Educate · Empower
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;">
                    <div style="display:inline-block;font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#6ee7b7;font-weight:700;background:rgba(110,231,183,0.12);border:1px solid rgba(110,231,183,0.28);padding:7px 12px;border-radius:999px;">
                      Partner portal · Private
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;">
                    <h1 style="margin:0;font-size:28px;line-height:1.2;letter-spacing:-0.03em;font-weight:600;color:#ffffff;">
                      You're invited, ${escapeHtml(first)}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;">
                    <p style="margin:0;font-size:15px;line-height:1.55;color:rgba(255,255,255,0.72);">
                      ${escapeHtml(invitedBy)} has opened a private workspace for
                      <span style="color:#ffffff;font-weight:600;">${escapeHtml(opts.organisation)}</span>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Emerald accent strip -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background:#059669;background-image:linear-gradient(90deg,#34d399 0%,#059669 45%,#047857 100%);">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="pad-x" style="padding:32px 36px 8px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#404040;">
                Your organisation has its own secure space on
                <strong style="color:#0a0a0a;">${escapeHtml(SITE_NAME)}</strong>
                — partnership materials, decks and updates that are visible only to you.
              </p>

              <!-- Org callout -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7f4;border:1px solid #dce5dc;border-radius:16px;margin:0 0 24px;">
                <tr>
                  <td width="6" style="background:#059669;border-radius:16px 0 0 16px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:18px 20px;">
                    <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#059669;font-weight:700;margin-bottom:6px;">
                      Your workspace
                    </div>
                    <div style="font-size:18px;font-weight:600;letter-spacing:-0.02em;color:#0a0a0a;margin-bottom:4px;">
                      ${escapeHtml(opts.partnerName)}
                    </div>
                    <div style="font-size:13px;line-height:1.45;color:#525252;">
                      ${escapeHtml(opts.organisation)}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Sign-in email -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="font-size:12px;letter-spacing:0.6px;text-transform:uppercase;color:#737373;font-weight:600;padding-bottom:8px;">
                    Sign in with this email
                  </td>
                </tr>
                <tr>
                  <td style="background:#0a0a0a;border-radius:12px;padding:14px 18px;">
                    <a href="mailto:${escapeHtml(opts.toEmail)}" style="font-size:15px;font-weight:600;color:#6ee7b7;text-decoration:none;word-break:break-all;">
                      ${escapeHtml(opts.toEmail)}
                    </a>
                    <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:6px;">
                      No password required — enter this address on the login page.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Feature rows -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 8px;">
                <tr>
                  <td style="padding:0 0 14px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <div style="width:28px;height:28px;border-radius:999px;background:#ecfdf5;border:1px solid #a7f3d0;text-align:center;line-height:28px;font-size:13px;color:#047857;font-weight:700;">1</div>
                        </td>
                        <td valign="top" style="font-size:14px;line-height:1.5;color:#404040;">
                          <strong style="color:#0a0a0a;">Open the portal</strong><br />
                          Use the button below — it takes you straight to your organisation space.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 14px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <div style="width:28px;height:28px;border-radius:999px;background:#ecfdf5;border:1px solid #a7f3d0;text-align:center;line-height:28px;font-size:13px;color:#047857;font-weight:700;">2</div>
                        </td>
                        <td valign="top" style="font-size:14px;line-height:1.5;color:#404040;">
                          <strong style="color:#0a0a0a;">Enter your email</strong><br />
                          Sign in with <span style="color:#0a0a0a;">${escapeHtml(opts.toEmail)}</span> — nothing else to remember.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <div style="width:28px;height:28px;border-radius:999px;background:#ecfdf5;border:1px solid #a7f3d0;text-align:center;line-height:28px;font-size:13px;color:#047857;font-weight:700;">3</div>
                        </td>
                        <td valign="top" style="font-size:14px;line-height:1.5;color:#404040;">
                          <strong style="color:#0a0a0a;">Stay in your space</strong><br />
                          Other partners cannot open your workspace — and you will not see theirs.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="pad-x" align="center" style="padding:20px 36px 12px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${escapeHtml(loginUrl)}" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="50%" stroke="f" fillcolor="#059669">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">Open partner portal</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <a class="cta-btn" href="${escapeHtml(loginUrl)}" style="display:inline-block;background:#059669;background-image:linear-gradient(180deg,#10b981 0%,#059669 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:-0.01em;padding:16px 36px;border-radius:999px;box-shadow:0 10px 24px rgba(5,150,105,0.28);">
                Open partner portal →
              </a>
              <!--<![endif]-->
            </td>
          </tr>
          <tr>
            <td class="pad-x" style="padding:8px 36px 28px;">
              <p style="margin:0;font-size:11px;line-height:1.5;color:#a3a3a3;text-align:center;word-break:break-all;">
                Or paste this link into your browser:<br />
                <a href="${escapeHtml(loginUrl)}" style="color:#737373;text-decoration:underline;">${escapeHtml(loginUrl)}</a>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td class="pad-x" style="padding:0 36px;">
              <div style="height:1px;background:#e7ebe6;font-size:0;line-height:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="pad-x" style="padding:24px 36px 32px;">
              <p style="margin:0 0 10px;font-size:13px;line-height:1.55;color:#525252;">
                Questions? Reply to this email or write to
                <a href="mailto:${escapeHtml(CONTACT_EMAIL)}" style="color:#059669;font-weight:600;text-decoration:none;">${escapeHtml(CONTACT_EMAIL)}</a>.
              </p>
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#737373;">
                <strong style="color:#404040;">${escapeHtml(SITE_NAME)}</strong>
                · Feed · Educate · Empower
              </p>
              <p style="margin:0;font-size:11px;line-height:1.5;color:#a3a3a3;">
                © ${year} · ${escapeHtml(CONTACT_LOCATION)} ·
                <a href="${escapeHtml(SITE_URL)}" style="color:#737373;text-decoration:none;">${escapeHtml(siteHost)}</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Below-card note -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;margin-top:18px;">
          <tr>
            <td align="center" style="font-size:11px;line-height:1.5;color:#8a9186;padding:0 12px;">
              This invitation is intended for ${escapeHtml(opts.toName)} (${escapeHtml(opts.toEmail)}).
              If you received it by mistake, you can ignore it.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html, loginUrl };
}

export type InviteSendResult =
  | { ok: true; mode: "resend"; id?: string; loginUrl: string }
  | { ok: true; mode: "link_only"; loginUrl: string; reason: string }
  | { ok: false; error: string; loginUrl: string };

export async function sendPartnerInviteEmail(
  opts: PartnerInviteOpts
): Promise<InviteSendResult> {
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
