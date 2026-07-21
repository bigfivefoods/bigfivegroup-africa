/**
 * Partner portal emails are primarily defined on each partner in
 * `app/lib/partners.ts` (emails[] per organisation).
 *
 * Optional extras (e.g. temporary access) can still be listed here or via
 * PARTNER_EMAILS env — they land on /partner/general until mapped to a slug.
 */
import { getPartnerEmailsFromRegistry } from "./partners";

export const PARTNER_ALLOWLIST: string[] = [
  ...getPartnerEmailsFromRegistry(),
  // Explicit full-portal admin (also in PARTNER_PORTAL_ADMINS)
  "craig@bigfivegroup.africa",
  // Ad-hoc allowlist (optional):
  // "temp@partner.org",
];
