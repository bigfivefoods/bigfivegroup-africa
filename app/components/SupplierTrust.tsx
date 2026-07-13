import { ExternalLink, ShieldCheck, Activity, BadgeCheck } from "lucide-react";

const SUPPLIER_URL = "https://www.supplieradvisor.com/";

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
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 text-sm text-[#404040]">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-black">{entityName}</strong> are listed on{" "}
              <a
                href={SUPPLIER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                SupplierAdvisor®
              </a>{" "}
              as verified ethical companies — orders flow with real-time transparency.
            </span>
          </div>
          <a
            href={SUPPLIER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black shrink-0 hover:opacity-70"
          >
            Verify on SupplierAdvisor
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0a0a0a] text-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs tracking-[3px] text-emerald-400 mb-4">
              <BadgeCheck className="w-4 h-4" />
              VERIFIED · ETHICAL · ON-PLATFORM
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
              Listed on SupplierAdvisor® as verified ethical companies
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Where applicable, {entityName} operate through{" "}
              <a
                href={SUPPLIER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline underline-offset-4 hover:text-emerald-300"
              >
                www.supplieradvisor.com
              </a>
              — the same trusted network used for verified suppliers, ethical scoring, and live
              transaction visibility. Buyers, governments, and partners can see legitimacy, not
              just claims.
            </p>
          </div>
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                icon: ShieldCheck,
                title: "Verified ethical profiles",
                desc: "Company credentials and ethical standards published for counterparties to review.",
              },
              {
                icon: Activity,
                title: "Orders with real-time feedback",
                desc: "Purchase orders, fulfilment signals, and live status reduce friction and risk.",
              },
              {
                icon: BadgeCheck,
                title: "Professional, auditable commerce",
                desc: "Transparent pathways for B2B, B2G, and institutional procurement.",
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
              href={SUPPLIER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button mt-2 w-full inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-semibold"
            >
              Open SupplierAdvisor®
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
