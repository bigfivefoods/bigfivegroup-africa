/** Shared contact details for Big Five Group Africa */
export const CONTACT_EMAIL = "craig@bigfivegroup.africa";
export const CONTACT_PHONE_DISPLAY = "+27 (0) 82 581 4215";
export const CONTACT_PHONE_E164 = "+27825814215";
export const CONTACT_WHATSAPP = "https://wa.me/27825814215";
export const CONTACT_LOCATION = "KwaZulu-Natal · South Africa · Continent-wide";

/**
 * Public booking (Cal.com EU: cal.eu — connects to cPanel CalDAV).
 *
 * Env (either):
 *   NEXT_PUBLIC_BOOKING_URL=https://cal.eu/bigfivegroup/strategic-briefing
 *   NEXT_PUBLIC_CAL_LINK=bigfivegroup/strategic-briefing
 *   NEXT_PUBLIC_CAL_ORIGIN=https://cal.eu   (optional; default cal.eu)
 *
 * If unset, falls back to the Group Cal.eu profile so the page is never empty.
 */
const DEFAULT_CAL_ORIGIN = "https://cal.eu";
const DEFAULT_CAL_LINK = "bigfivegroup";

export type BookingConfig =
  | {
      enabled: true;
      url: string;
      calLink: string;
      origin: string;
      provider: "cal.com" | "other";
    }
  | { enabled: false };

function normalizeOrigin(hostOrUrl: string): string {
  const raw = hostOrUrl.trim().replace(/\/$/, "");
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const u = new URL(raw);
      return `${u.protocol}//${u.hostname}`;
    } catch {
      return DEFAULT_CAL_ORIGIN;
    }
  }
  return `https://${raw.replace(/^www\./, "")}`;
}

function isCalHost(host: string): boolean {
  const h = host.replace(/^www\./, "").toLowerCase();
  return (
    h === "cal.com" ||
    h === "app.cal.com" ||
    h === "cal.eu" ||
    h === "app.cal.eu"
  );
}

function publicOriginFromHost(host: string): string {
  const h = host.replace(/^www\./, "").toLowerCase();
  if (h === "cal.eu" || h === "app.cal.eu") return "https://cal.eu";
  return "https://cal.com";
}

function stripCalPath(pathOrUrl: string, originHint?: string): { calLink: string; origin: string } {
  let origin = originHint || process.env.NEXT_PUBLIC_CAL_ORIGIN?.trim() || DEFAULT_CAL_ORIGIN;
  origin = normalizeOrigin(origin);

  let s = pathOrUrl.trim().replace(/^\/+/, "");
  // Full URL pasted into CAL_LINK
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s);
      if (isCalHost(u.hostname)) {
        origin = publicOriginFromHost(u.hostname);
        s = u.pathname.replace(/^\/+/, "").replace(/\/$/, "");
      }
    } catch {
      /* keep as path */
    }
  }
  s = s
    .replace(/^(?:https?:\/\/)?(?:www\.)?(?:app\.)?cal\.(?:com|eu)\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/$/, "");
  return { calLink: s, origin: normalizeOrigin(origin) };
}

export function getBookingConfig(): BookingConfig {
  const rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";
  const rawCal = process.env.NEXT_PUBLIC_CAL_LINK?.trim() || "";
  const envOrigin = process.env.NEXT_PUBLIC_CAL_ORIGIN?.trim();

  if (rawCal) {
    const { calLink, origin } = stripCalPath(rawCal, envOrigin);
    if (!calLink) return { enabled: false };
    return {
      enabled: true,
      url: `${origin}/${calLink}`,
      calLink,
      origin,
      provider: "cal.com",
    };
  }

  if (rawUrl) {
    try {
      const u = new URL(rawUrl);
      if (isCalHost(u.hostname)) {
        const origin = publicOriginFromHost(u.hostname);
        const calLink = u.pathname.replace(/^\/+/, "").replace(/\/$/, "");
        if (calLink) {
          return {
            enabled: true,
            url: `${origin}/${calLink}`,
            calLink,
            origin,
            provider: "cal.com",
          };
        }
      }
      // Non-Cal booking page
      return {
        enabled: true,
        url: rawUrl,
        calLink: "",
        origin: "",
        provider: "other",
      };
    } catch {
      return {
        enabled: true,
        url: rawUrl,
        calLink: "",
        origin: "",
        provider: "other",
      };
    }
  }

  // Default: Group profile on Cal.com EU
  const origin = envOrigin ? normalizeOrigin(envOrigin) : DEFAULT_CAL_ORIGIN;
  return {
    enabled: true,
    url: `${origin}/${DEFAULT_CAL_LINK}`,
    calLink: DEFAULT_CAL_LINK,
    origin,
    provider: "cal.com",
  };
}

export function bookingEnabled(): boolean {
  return getBookingConfig().enabled;
}

export const ENQUIRY_INTERESTS = [
  { value: "partnership", label: "Strategic partnership" },
  { value: "foods", label: "Big Five Foods · nutrition programmes" },
  { value: "leadership", label: "Leadership · Super-Cube® programmes" },
  { value: "foundation", label: "Foundation · philanthropy" },
  { value: "connect", label: "Connect · SupplierAdvisor® · SAM" },
  { value: "government", label: "Government / public sector" },
  { value: "other", label: "Other enquiry" },
] as const;

export type EnquiryInterest = (typeof ENQUIRY_INTERESTS)[number]["value"];

export type EnquiryPayload = {
  name: string;
  email: string;
  organisation?: string;
  phone?: string;
  interest: EnquiryInterest | string;
  message: string;
  /** Honeypot — must be empty */
  website?: string;
};

export function interestLabel(value: string): string {
  return ENQUIRY_INTERESTS.find((i) => i.value === value)?.label ?? value;
}

export function buildMailto(payload: EnquiryPayload): string {
  const subject = encodeURIComponent(
    `Big Five enquiry — ${interestLabel(payload.interest)} — ${payload.name}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.organisation ? `Organisation: ${payload.organisation}` : null,
      payload.phone ? `Phone: ${payload.phone}` : null,
      `Interest: ${interestLabel(payload.interest)}`,
      "",
      "Message:",
      payload.message,
      "",
      "— Sent from bigfivegroup.africa/contact",
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function buildWhatsAppLink(payload: EnquiryPayload): string {
  const text = encodeURIComponent(
    [
      `Hello Big Five — enquiry from ${payload.name}`,
      payload.organisation ? `Org: ${payload.organisation}` : null,
      `Interest: ${interestLabel(payload.interest)}`,
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `${CONTACT_WHATSAPP}?text=${text}`;
}
