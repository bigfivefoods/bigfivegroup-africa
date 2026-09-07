/**
 * Partner contacts service — invite people to organisation workspaces.
 * Server-only.
 */

import "server-only";
import { randomUUID } from "node:crypto";
import {
  getPartnerBySlug,
  getPartnerEmailsFromRegistry,
  isPartnerAdmin,
  PARTNER_DIRECTORY_HIDDEN_SLUGS,
} from "../partners";
import {
  findActiveContactByEmail,
  listActiveContacts,
  markContactInvited,
  revokePartnerContact,
  upsertPartnerContact,
} from "./store";
import { partnerLoginUrl, sendPartnerInviteEmail } from "./invite-email";
import type { PartnerContact } from "./types";

export type { PartnerContact } from "./types";
export { partnerLoginUrl } from "./invite-email";
export { findActiveContactByEmail } from "./store";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getActiveContactSlug(email: string): Promise<string | null> {
  const c = await findActiveContactByEmail(email);
  return c?.slug ?? null;
}

export async function listContactsForAdmin(slug?: string): Promise<PartnerContact[]> {
  return listActiveContacts(slug);
}

export type AddContactInput = {
  slug: string;
  name: string;
  email: string;
  createdBy: string;
  /** If true, send invite email immediately */
  sendInvite?: boolean;
  invitedByName?: string;
};

export type AddContactResult =
  | {
      ok: true;
      contact: PartnerContact;
      invite?: Awaited<ReturnType<typeof sendPartnerInviteEmail>>;
      loginUrl: string;
    }
  | { ok: false; error: string };

export async function addPartnerContact(input: AddContactInput): Promise<AddContactResult> {
  const slug = input.slug.trim().toLowerCase();
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (!slug || !getPartnerBySlug(slug)) {
    return { ok: false, error: "Choose a valid partner organisation." };
  }
  if (
    slug === "general" ||
    slug === "big-five-group" ||
    PARTNER_DIRECTORY_HIDDEN_SLUGS.has(slug)
  ) {
    return { ok: false, error: "Invite partners to an organisation workspace, not the internal hub." };
  }
  if (!name || name.length < 2) {
    return { ok: false, error: "Enter the person’s full name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (isPartnerAdmin(email)) {
    return {
      ok: false,
      error: "That email is a portal admin and already has full access.",
    };
  }
  if (getPartnerEmailsFromRegistry().includes(email)) {
    return {
      ok: false,
      error: "That email is already mapped to an organisation in the partner registry.",
    };
  }

  const existing = await findActiveContactByEmail(email);
  if (existing && existing.slug !== slug) {
    return {
      ok: false,
      error: `This email is already invited to /partner/${existing.slug}. Revoke that access first.`,
    };
  }

  const partner = getPartnerBySlug(slug)!;
  const contact = await upsertPartnerContact({
    id: existing?.id ?? randomUUID(),
    slug,
    name,
    email,
    status: "active",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    createdBy: existing?.createdBy ?? input.createdBy,
    invitedAt: existing?.invitedAt,
    invitedBy: existing?.invitedBy,
    lastInviteId: existing?.lastInviteId,
  });

  const loginUrl = partnerLoginUrl(slug);
  if (!input.sendInvite) {
    return { ok: true, contact, loginUrl };
  }

  const invite = await sendPartnerInviteEmail({
    toName: name,
    toEmail: email,
    organisation: partner.organisation,
    partnerName: partner.name,
    slug,
    invitedByName: input.invitedByName,
  });

  if (invite.ok && invite.mode === "resend") {
    await markContactInvited(email, input.createdBy, invite.id);
  } else if (invite.ok) {
    // link_only — still mark attempted invite time for admin visibility
    await markContactInvited(email, input.createdBy);
  }

  return { ok: true, contact, invite, loginUrl };
}

export async function inviteExistingContact(opts: {
  email: string;
  invitedBy: string;
  invitedByName?: string;
}): Promise<AddContactResult> {
  const contact = await findActiveContactByEmail(opts.email);
  if (!contact) return { ok: false, error: "Contact not found or revoked." };
  const partner = getPartnerBySlug(contact.slug);
  if (!partner) return { ok: false, error: "Partner organisation missing." };

  const invite = await sendPartnerInviteEmail({
    toName: contact.name,
    toEmail: contact.email,
    organisation: partner.organisation,
    partnerName: partner.name,
    slug: contact.slug,
    invitedByName: opts.invitedByName,
  });

  if (invite.ok && invite.mode === "resend") {
    await markContactInvited(contact.email, opts.invitedBy, invite.id);
  } else if (invite.ok) {
    await markContactInvited(contact.email, opts.invitedBy);
  }

  const refreshed = (await findActiveContactByEmail(contact.email)) ?? contact;
  return {
    ok: true,
    contact: refreshed,
    invite,
    loginUrl: partnerLoginUrl(contact.slug),
  };
}

export async function revokeContact(email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const done = await revokePartnerContact(email);
  if (!done) return { ok: false, error: "Contact not found." };
  return { ok: true };
}
