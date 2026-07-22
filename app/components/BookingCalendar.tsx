"use client";

import { useState } from "react";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";
import type { BookingConfig } from "../lib/contact";

/**
 * Cal.com booking embed (syncs busy times from Apple Calendar / iCloud).
 * Falls back to an external link for non-Cal providers.
 */
export default function BookingCalendar({
  booking,
  variant = "card",
}: {
  booking: Extract<BookingConfig, { enabled: true }>;
  variant?: "card" | "page";
}) {
  const [loaded, setLoaded] = useState(false);
  const isCal = booking.provider === "cal.com" && Boolean(booking.calLink);

  const embedSrc = isCal
    ? `https://cal.com/${booking.calLink}?embed=true&theme=light&layout=month_view`
    : null;

  const shell =
    variant === "page"
      ? "rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden shadow-sm"
      : "rounded-2xl sm:rounded-3xl border border-black/10 bg-white overflow-hidden";

  return (
    <div className={shell}>
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3 border-b border-black/5">
        <div className="flex items-start gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-black">
              Book a briefing
            </h3>
            <p className="text-sm text-[#525252] leading-relaxed mt-0.5">
              Pick a free slot — booked times sync to Apple Calendar (iCloud). You&apos;ll get a
              confirmation email with the meeting details.
            </p>
          </div>
        </div>
      </div>

      {embedSrc ? (
        <div className="relative bg-[#fafafa] min-h-[560px] sm:min-h-[640px]">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-[#737373] gap-2 z-10 pointer-events-none">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading calendar…
            </div>
          )}
          <iframe
            src={embedSrc}
            title="Book a briefing with Big Five Group"
            className="w-full min-h-[560px] sm:min-h-[640px] border-0"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            allow="camera; microphone; fullscreen; payment"
          />
        </div>
      ) : (
        <div className="p-5 sm:p-7 space-y-4">
          <p className="text-sm text-[#525252] leading-relaxed">
            Open the booking page to choose a time that works for you.
          </p>
          <a
            href={booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-black text-white px-6 py-3.5 rounded-full text-sm font-semibold"
          >
            <Calendar className="w-4 h-4" />
            Open booking calendar
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      )}

      <div className="px-5 sm:px-7 py-3 border-t border-black/5 bg-[#fafafa] flex flex-wrap items-center justify-between gap-2">
        <a
          href={booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525252] hover:text-black"
        >
          Open in new tab
          <ExternalLink className="w-3 h-3" />
        </a>
        <span className="text-[10px] text-[#a3a3a3] tracking-wide uppercase">
          Apple Calendar · iCloud
        </span>
      </div>
    </div>
  );
}
