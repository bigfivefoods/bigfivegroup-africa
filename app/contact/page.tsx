import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import ContactForm from "../components/ContactForm";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_WHATSAPP,
  CONTACT_LOCATION,
} from "../lib/contact";

const pathways = [
  {
    t: "Foods · nutrition",
    d: "Institutional feeding, school programmes, retail and fortified staples.",
    href: "/foods",
  },
  {
    t: "Leadership · Super-Cube®",
    d: "Cohorts and organisational development for public and private leaders.",
    href: "/leadership",
  },
  {
    t: "Foundation & Impact",
    d: "Verified philanthropy and programme delivery across the group.",
    href: "/foundation",
  },
  {
    t: "Connect · SupplierAdvisor®",
    d: "Ethical commerce, SAM, and live network infrastructure.",
    href: "/connect",
  },
];

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
              partnership.
            </p>
            <div className="relative rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0">
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

            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-[#fafafa] p-5 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-black mb-3">
                Popular pathways
              </h3>
              <ul className="space-y-3">
                {pathways.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="group flex items-start justify-between gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 hover:border-black/15 transition-colors"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-black group-hover:underline">
                          {p.t}
                        </span>
                        <span className="text-xs text-[#525252] leading-snug">{p.d}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0 text-[#a3a3a3] group-hover:text-black mt-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
