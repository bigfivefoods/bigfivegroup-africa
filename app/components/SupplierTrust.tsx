import { ExternalLink, ShieldCheck, Activity, BadgeCheck } from "lucide-react";
import { sa, SA_URL, SA_ONBOARDING } from "../lib/saCopy";

export default function SupplierTrust({
  entityName = "Big Five companies",
  compact = false,
}: {
  entityName?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="border-y border-black/10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-[#404040] min-w-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            <span className="min-w-0">
              <strong className="text-black">{entityName}</strong> run on{" "}
              <a
                href={SA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                {sa.brand}
              </a>{" "}
              — the supply-chain OS for verified trade. {sa.oneLiner}
            </span>
          </div>
          <a
            href={SA_ONBOARDING}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-black shrink-0 hover:opacity-70 self-start sm:self-auto"
          >
            {sa.ctaTrial}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0a0a0a] text-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-emerald-400 mb-4">
              <BadgeCheck className="w-4 h-4" />
              {sa.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
              {sa.trustTitle}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-4">
              {sa.trustBody} Where applicable, {entityName} operate through{" "}
              <a
                href={SA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline underline-offset-4 hover:text-emerald-300"
              >
                www.supplieradvisor.com
              </a>
              .
            </p>
            <p className="text-white/50 text-sm">{sa.pricingNote}</p>
          </div>
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                icon: ShieldCheck,
                title: "Verified companies",
                desc: "CIPC-style verification and certificate metadata so counterparties know who they are trading with on the network.",
              },
              {
                icon: Activity,
                title: "Supplier ratings & OTIFEF",
                desc: "Score every delivery On-Time, In-Full, Error-Free — peer ratings and RIAD risk that follow the trading edge.",
              },
              {
                icon: BadgeCheck,
                title: "SHEQ that operators use",
                desc: "ISO 45001-style incidents and ISO 9001-style NCR/CAPA — wired to the same inventory that runs the business.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <item.icon className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-sm text-white/60 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
            <a
              href={SA_ONBOARDING}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button mt-2 w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-semibold"
            >
              {sa.ctaTrial}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
