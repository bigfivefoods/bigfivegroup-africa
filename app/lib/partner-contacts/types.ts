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
};

export type PartnerContactsSnapshot = {
  version: 1;
  updatedAt: string;
  contacts: PartnerContact[];
};
