/**
 * Lightweight analytics helpers.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN and/or NEXT_PUBLIC_GA_MEASUREMENT_ID in env.
 */

export type AnalyticsEvent =
  | "contact_submit"
  | "contact_submit_success"
  | "deck_share"
  | "deck_pdf"
  | "book_download"
  | "cta_click"
  | "sample_request";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(
  event: AnalyticsEvent | string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
    }
  } catch {
    /* ignore */
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props ?? {});
    }
  } catch {
    /* ignore */
  }
}
