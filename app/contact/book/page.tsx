import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingCalendar from "../../components/BookingCalendar";
import { getBookingConfig } from "../../lib/contact";

export const metadata = {
  title: "Book a briefing",
  description:
    "Schedule a strategic briefing with Big Five Group Africa — times sync via CalDAV to our team calendar.",
  alternates: { canonical: "/contact/book" },
};

export default function BookBriefingPage() {
  const booking = getBookingConfig();

  return (
    <div className="overflow-x-clip bg-[#fafafa] min-h-[70vh]">
      <section className="bg-[#0a0a0a] text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs text-white/55 hover:text-white mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Contact
          </Link>
          <div className="text-[10px] sm:text-xs tracking-[3px] text-emerald-400 mb-3">
            BOOK A BRIEFING · CALDAV
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-balance mb-3">
            Choose a time
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-xl leading-relaxed">
            Select a free slot for a strategic conversation. Your booking blocks the calendar so we
            don&apos;t double-book.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {booking.enabled ? (
          <BookingCalendar booking={booking} variant="page" />
        ) : (
          <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-black mb-2">Booking link not configured yet</h2>
            <p className="text-sm text-[#525252] leading-relaxed mb-4">
              Set <code className="text-xs bg-black/5 px-1 rounded">NEXT_PUBLIC_BOOKING_URL</code>{" "}
              or <code className="text-xs bg-black/5 px-1 rounded">NEXT_PUBLIC_CAL_LINK</code> in
              Vercel after connecting your CalDAV calendar in Cal.com. Until then, use the contact
              form or WhatsApp.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to contact
            </Link>
          </div>
        )}

        <p className="text-xs text-[#737373] mt-6 leading-relaxed">
          Prefer to write first?{" "}
          <Link href="/contact" className="underline underline-offset-2 text-black">
            Send an enquiry
          </Link>{" "}
          and we&apos;ll follow up.
        </p>
      </section>
    </div>
  );
}
