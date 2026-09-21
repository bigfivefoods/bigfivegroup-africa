/**
 * Email Craig on every successful partner-portal sign-in.
 * Server-only — never import from Client Components.
 */

import "server-only";
import { CONTACT_EMAIL } from "../contact";
import { SITE_NAME, SITE_URL } from "../site";
import { getPartnerBySlug } from "../partners";
import { resendConfigured, sendResendEmail } from "../newsletter/email";
import type { PartnerAccessRecord } from "./types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notifyInbox(): string {
  return process.env.PARTNER_LOGIN_NOTIFY_EMAIL?.trim() || CONTACT_EMAIL;
}

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL).replace(/\/$/, "");
}

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-ZA", {
      timeZone: "Africa/Johannesburg",
      dateStyle: "full",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export async function notifyPartnerLogin(opts: {
  email: string;
  slug: string;
  name?: string;
  workspacePath: string;
  isAdmin: boolean;
  access?: PartnerAccessRecord | null;
  requestedFrom?: string;
  userAgent?: string;
}): Promise<void> {
  const inbox = notifyInbox().toLowerCase();
  const email = opts.email.trim().toLowerCase();
  if (!email) return;
  // Do not mail Craig about his own admin sign-ins.
  if (email === inbox) return;
  if (!resendConfigured()) {
    console.warn("[partner-login] Resend is not configured — sign-in notify skipped.");
    return;
  }

  const partner = getPartnerBySlug(opts.slug);
  const org = partner?.organisation || partner?.name || opts.slug;
  const name = opts.access?.name || opts.name?.trim() || email.split("@")[0] || email;
  const count = opts.access?.loginCount ?? 1;
  const when = formatWhen(opts.access?.lastLoginAt || new Date().toISOString());
  const first = opts.access?.firstLoginAt ? formatWhen(opts.access.firstLoginAt) : when;
  const workspaceUrl = `${siteBase()}${opts.workspacePath.startsWith("/") ? opts.workspacePath : `/${opts.workspacePath}`}`;
  const requested =
    opts.requestedFrom && opts.requestedFrom !== opts.workspacePath ? opts.requestedFrom : "";

  const subject = `Partner portal sign-in — ${name} · ${org}`;
  const text = [
    `Someone signed in to the ${SITE_NAME} partner portal.`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${org}`,
    `Workspace: ${opts.slug} (${workspaceUrl})`,
    requested ? `Requested path: ${requested}` : null,
    opts.isAdmin ? "Role: portal admin" : "Role: organisation contact",
    `Sign-in count: ${count}`,
    `This sign-in: ${when} (SAST)`,
    `First recorded: ${first} (SAST)`,
    opts.userAgent ? `Browser: ${opts.userAgent}` : null,
    "",
    "This is an automated notice. Reply to this email to reach the person who signed in.",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.55;color:#171717;">
      <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C4923A;font-weight:700;">
        Partner portal · sign-in
      </p>
      <h1 style="margin:0 0 16px;font-size:20px;letter-spacing:-0.02em;color:#0F3D38;">
        ${escapeHtml(name)} opened ${escapeHtml(org)}
      </h1>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
        <tr><td style="padding:6px 0;color:#737373;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#0F3D38;font-weight:600;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#737373;">Organisation</td><td style="padding:6px 0;">${escapeHtml(org)}</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">Workspace</td><td style="padding:6px 0;"><a href="${escapeHtml(workspaceUrl)}" style="color:#0F3D38;">${escapeHtml(opts.slug)}</a></td></tr>
        ${
          requested
            ? `<tr><td style="padding:6px 0;color:#737373;">Requested path</td><td style="padding:6px 0;">${escapeHtml(requested)}</td></tr>`
            : ""
        }
        <tr><td style="padding:6px 0;color:#737373;">Role</td><td style="padding:6px 0;">${opts.isAdmin ? "Portal admin" : "Organisation contact"}</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">Sign-in count</td><td style="padding:6px 0;">${count}</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">This sign-in</td><td style="padding:6px 0;">${escapeHtml(when)} (SAST)</td></tr>
        <tr><td style="padding:6px 0;color:#737373;">First recorded</td><td style="padding:6px 0;">${escapeHtml(first)} (SAST)</td></tr>
      </table>
      <p style="margin:0;font-size:12px;color:#737373;">
        Automated notice from ${escapeHtml(SITE_NAME)}. Reply to this email to reach the person who signed in.
      </p>
    </div>
  `;

  const sent = await sendResendEmail({
    to: notifyInbox(),
    replyTo: email,
    subject,
    text,
    html,
    tags: [
      { name: "category", value: "partner_login" },
      { name: "partner_slug", value: opts.slug.slice(0, 40) },
    ],
  });
  if (!sent.ok) {
    console.warn("[partner-login] sign-in notify failed:", sent.reason);
  }
}
