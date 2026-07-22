/** Shared contact details for Big Five Group Africa */
export const CONTACT_EMAIL = "craig@bigfivegroup.africa";
export const CONTACT_PHONE_DISPLAY = "+27 (0) 82 581 4215";
export const CONTACT_PHONE_E164 = "+27825814215";
export const CONTACT_WHATSAPP = "https://wa.me/27825814215";
export const CONTACT_LOCATION = "KwaZulu-Natal · South Africa · Continent-wide";

/**
 * Public booking link (Cal.com recommended — connects to your CalDAV calendar).
 * Set NEXT_PUBLIC_BOOKING_URL=https://cal.com/your-username/briefing
 * or NEXT_PUBLIC_CAL_LINK=your-username/briefing
 */
export type BookingConfig =
  | { enabled: true; url: string; calLink?: string; provider: "cal.com" | "other" }
  | { enabled: false };

export function getBookingConfig(): BookingConfig {
  const rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";
  const rawCal = process.env.NEXT_PUBLIC_CAL_LINK?.trim().replace(/^\/+/, "") || "";

  if (rawCal) {
    const calLink = rawCal.replace(/^https?:\/\/(www\.)?cal\.com\//i, "");
    return {
      enabled: true,
      url: `https://cal.com/${calLink}`,
      calLink,
      provider: "cal.com",
    };
  }

  if (!rawUrl) return { enabled: false };

  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "cal.com" || host === "app.cal.com") {
      const calLink = u.pathname.replace(/^\/+/, "").replace(/\/$/, "");
      if (calLink) {
        return {
          enabled: true,
          url: `https://cal.com/${calLink}`,
          calLink,
          provider: "cal.com",
        };
      }
    }
  } catch {
    /* treat as opaque URL */
  }

  return { enabled: true, url: rawUrl, provider: "other" };
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
