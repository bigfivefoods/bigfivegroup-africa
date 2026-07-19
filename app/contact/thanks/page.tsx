import Link from "next/link";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "../../lib/contact";

export const metadata = {
  title: "Thank you · Next steps",
  robots: { index: false, follow: false },
};

export default function ContactThanksPage() {
  return (
    <div className="overflow-x-clip bg-[#fafafa] min-h-[70vh] flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center w-full">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mb-6">
          <Check className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance">
          Almost there
        </h1>
        <p className="text-base sm:text-lg text-[#525252] leading-relaxed mb-8">
          If your mail app opened a draft to{" "}
          <strong className="text-black">{CONTACT_EMAIL}</strong>, press send. Include a few times
          that work for you and we&apos;ll confirm a meeting.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto mb-10">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Big%20Five%20briefing%20—%20schedule%20a%20meeting`}
            className="premium-button inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-full text-sm font-semibold"
          >
            <Mail className="w-4 h-4" />
            Email {CONTACT_EMAIL}
          </a>
          <a
            href={CONTACT_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${CONTACT_PHONE_E164}`}
            className="premium-button inline-flex items-center justify-center gap-2 border border-black/15 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold"
          >
            <Phone className="w-4 h-4" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <Link
            href="/foods#case-study"
            className="inline-flex items-center justify-center gap-1 font-medium text-black hover:underline"
          >
            NSNP school nutrition case
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/connect#case-study-sa"
            className="inline-flex items-center justify-center gap-1 font-medium text-[#525252] hover:text-black"
          >
            SupplierAdvisor® case
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1 font-medium text-[#525252] hover:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
