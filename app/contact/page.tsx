import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import ContactForm from "../components/ContactForm";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_WHATSAPP,
  CONTACT_LOCATION,
} from "../lib/contact";

export default function ContactPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa]">
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-transparent to-amber-950/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
          <div className="text-[10px] sm:text-xs tracking-[2px] sm:tracking-[3px] text-emerald-400/90 mb-4 font-medium">
            PARTNER WITH US · BOOK A BRIEFING
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] text-balance max-w-3xl mb-4 sm:mb-5">
            Tell us the outcome.
            <br />
            <span className="text-white/70">We&apos;ll map the pillars.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Governments, enterprises, DFIs, retailers, schools and partners — one enquiry for Foods,
            Leadership, Foundation, Connect, or a full-group strategic conversation.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-black mb-2">
              Send an enquiry
            </h2>
            <p className="text-sm sm:text-base text-[#525252] mb-6 sm:mb-8 leading-relaxed">
              Share a little context so we can prepare the right briefing — product, programme, or
              partnership. We typically reply within 1–2 business days.
            </p>
            <div className="relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0">
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-black mb-2">
                How we confirm a briefing
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed mb-4">
                Send the form with your organisation, what you need, and a few times that work for
                you. We&apos;ll reply and lock a slot — typically within 1–2 business days.
              </p>
              <ul className="text-sm text-[#404040] space-y-2.5">
                <li className="flex gap-2">
                  <span className="text-emerald-700 font-semibold shrink-0">1.</span>
                  <span>
                    Use the form — it goes straight to the Group inbox (same address as the footer).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-700 font-semibold shrink-0">2.</span>
                  <span>Mention preferred days or times in your message (timezone helps).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-700 font-semibold shrink-0">3.</span>
                  <span>Prefer a faster loop? WhatsApp or phone from the channels below.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-black mb-4">
                Direct channels
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-start gap-3 text-[#404040] hover:text-black transition-colors"
                  >
                    <Mail className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                    <span>
                      <span className="block font-semibold text-black">Email</span>
                      <span className="break-all">{CONTACT_EMAIL}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_PHONE_E164}`}
                    className="flex items-start gap-3 text-[#404040] hover:text-black transition-colors"
                  >
                    <Phone className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                    <span>
                      <span className="block font-semibold text-black">Phone</span>
                      {CONTACT_PHONE_DISPLAY}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-[#404040] hover:text-black transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                    <span>
                      <span className="block font-semibold text-black">WhatsApp</span>
                      Message the team
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[#404040]">
                  <MapPin className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                  <span>
                    <span className="block font-semibold text-black">Base</span>
                    {CONTACT_LOCATION}
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
