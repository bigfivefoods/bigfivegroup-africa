/**
 * Partner portal invite contacts — server-side only.
 * Maps a person (name + email) to a partner organisation slug.
 */

export type PartnerContactStatus = "active" | "revoked";

export type PartnerContact = {
  id: string;
  /** Partner organisation slug from partners.ts */
  slug: string;
  name: string;
  email: string;
  status: PartnerContactStatus;
  createdAt: string;
  createdBy: string;
  invitedAt?: string;
  invitedBy?: string;
  lastInviteId?: string;
  /** ISO timestamp of most recent successful portal sign-in */
  lastLoginAt?: string;
  /** Successful sign-in count (best-effort) */
  loginCount?: number;
};

/** Cross-org access log for system admins (includes registry emails not in invite list). */
export type PartnerAccessRecord = {
  email: string;
  /** Home / workspace slug at last login */
  slug: string;
  name: string;
  firstLoginAt: string;
  lastLoginAt: string;
  loginCount: number;
};

export type PartnerContactsSnapshot = {
  version: 1;
  updatedAt: string;
  contacts: PartnerContact[];
  /** Portal access activity for admin visibility */
  access?: PartnerAccessRecord[];
};
