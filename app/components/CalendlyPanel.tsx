"use client";

import { useEffect, useMemo } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { track } from "../lib/analytics";

/** Turn a public Calendly link into an embed-friendly URL */
export function calendlyEmbedUrl(publicUrl: string): string {
  try {
    const u = new URL(publicUrl.trim());
    if (!u.hostname.includes("calendly.com")) return publicUrl;
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("primary_color", "111111");
    return u.toString();
  } catch {
    return publicUrl;
  }
}

/**
 * Inline Calendly booking panel for /contact.
 * Requires NEXT_PUBLIC_CALENDLY_URL (e.g. https://calendly.com/you/big-five-briefing).
 */
export default function CalendlyPanel({ url }: { url: string }) {
  const embedSrc = useMemo(() => calendlyEmbedUrl(url), [url]);

  useEffect(() => {
    // Load Calendly widget script once (enhances iframe / CSS)
    const id = "calendly-widget-js";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="p-5 sm:p-6 border-b border-black/5 bg-emerald-50/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-black">
              Book a strategic briefing
            </h3>
            <p className="text-sm text-[#525252] leading-relaxed mt-1">
              Pick a time that works — 30 minutes for Foods, Leadership, Connect or multi-pillar
              programmes. You&apos;ll get a calendar invite automatically.
            </p>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("calendly_click", { source: "contact_panel" })}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-2"
        >
          Open full-page booking
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <div
        className="calendly-inline-widget w-full min-h-[40rem] sm:min-h-[44rem]"
        data-url={embedSrc}
        style={{ minWidth: "280px", height: "700px" }}
        title="Book a Big Five Group briefing"
      />
      {/* Fallback iframe if script blocked */}
      <noscript>
        <iframe
          src={embedSrc}
          title="Calendly booking"
          className="w-full border-0"
          style={{ height: 700 }}
        />
      </noscript>
    </div>
  );
}
