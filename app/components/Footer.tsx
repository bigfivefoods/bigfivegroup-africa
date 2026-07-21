import Link from "next/link";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const sectionTitleClass =
  "text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase text-[#737373] mb-4 sm:mb-5";

const groupLabelClass =
  "text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a3a3a3] mb-2";

const linkClass =
  "block text-sm text-[#404040] hover:text-black transition-colors leading-snug";

const exploreLinks = [
  { href: "/group", label: "The Group" },
  { href: "/africa", label: "Africa" },
  { href: "/global", label: "Global" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Pillars grouped by mission */
const pillarGroups: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Feed",
    links: [
      { href: "/foods", label: "Foods" },
      { href: "/agri", label: "Agri" },
    ],
  },
  {
    label: "Educate",
    links: [{ href: "/leadership", label: "Leadership" }],
  },
  {
    label: "Empower",
    links: [
      { href: "/connect", label: "Connect" },
      { href: "/foundation", label: "Foundation" },
      { href: "/direct", label: "Direct" },
      { href: "/access", label: "Access" },
      { href: "/impact", label: "Impact" },
      { href: "/royal", label: "Royal" },
      { href: "/global", label: "Global" },
    ],
  },
];

/** Resources grouped for scanability */
const resourceGroups: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Stay informed",
    links: [
      { href: "/updates", label: "Updates" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    label: "Toolkits",
    links: [
      { href: "/brand", label: "Brand kit" },
      { href: "/partner-kit", label: "Partner kit" },
      { href: "/methodology", label: "Methodology" },
    ],
  },
  {
    label: "Private access",
    links: [
      { href: "/partner", label: "Partner portal" },
      { href: "/investor", label: "Investor portal" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "/connect", label: "Connect · SAM" },
      { href: "/connect#case-study-sa", label: "SupplierAdvisor®" },
    ],
  },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function FooterNav({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className={sectionTitleClass}>{title}</div>
      {children}
    </div>
  );
}

function GroupedNav({
  groups,
  ariaLabel,
}: {
  groups: { label: string; links: { href: string; label: string }[] }[];
  ariaLabel: string;
}) {
  return (
    <nav className="space-y-4 sm:space-y-5" aria-label={ariaLabel}>
      {groups.map((group) => (
        <div key={group.label}>
          <div className={groupLabelClass}>{group.label}</div>
          <ul className="space-y-1.5 sm:space-y-2 border-l border-black/[0.08] pl-3">
            {group.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-black">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pb-12">
        {/* Brand band */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12 pb-12 sm:pb-14 border-b border-black/10">
          <div className="min-w-0 max-w-xl">
            <div className="font-semibold text-xl sm:text-2xl md:text-3xl tracking-tighter mb-3">
              BIG FIVE GROUP
            </div>
            <p className="text-base sm:text-lg font-light tracking-tight mb-2">
              One Group. Ten Pillars. Infinite African Impact.
            </p>
            <p className="text-[#525252] text-sm">
              Regenerative. Sovereign. On-Chain. On-Purpose.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-full hover:bg-[#111] transition-colors w-fit"
            >
              Book a briefing
            </Link>
            <a
              href="https://www.supplieradvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:opacity-70 transition-opacity"
            >
              SupplierAdvisor®
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 2/3 site map · 1/3 contact + newsletter */}
        <div className="pt-12 sm:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left ~2/3 — Explore · Pillars · Resources · Legal */}
          <div className="lg:col-span-8 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-10 sm:gap-y-12">
              <FooterNav title="Explore">
                <nav className="flex flex-col gap-2 sm:gap-2.5" aria-label="Explore">
                  {exploreLinks.map((l) => (
                    <Link key={l.href} href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </FooterNav>

              <FooterNav title="The 10 Pillars">
                <GroupedNav groups={pillarGroups} ariaLabel="Pillars by mission" />
              </FooterNav>

              <FooterNav title="Resources">
                <GroupedNav groups={resourceGroups} ariaLabel="Resources" />
              </FooterNav>

              <FooterNav title="Legal">
                <nav className="flex flex-col gap-2 sm:gap-2.5" aria-label="Legal">
                  {legalLinks.map((l) => (
                    <Link key={l.href} href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </FooterNav>
            </div>
          </div>

          {/* Right ~1/3 — Contact + newsletter */}
          <div className="lg:col-span-4 min-w-0 lg:border-l lg:border-black/10 lg:pl-10 xl:pl-12">
            <div className="space-y-8 sm:space-y-10">
              <div>
                <div className={sectionTitleClass}>Contact us</div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-2 -mt-1">
                  Talk to the Group
                </h2>
                <p className="text-sm text-[#525252] leading-relaxed mb-4">
                  Briefings, partnerships and programme enquiries — KwaZulu-Natal HQ, continent-wide.
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a
                      href="mailto:craig@bigfivegroup.africa"
                      className="flex items-start gap-2.5 text-[#404040] hover:text-black transition-colors min-w-0"
                    >
                      <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="break-all">craig@bigfivegroup.africa</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+27825814215"
                      className="flex items-center gap-2.5 text-[#404040] hover:text-black transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      +27 (0) 82 581 4215
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/27825814215"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-[#404040] hover:text-black transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      WhatsApp
                    </a>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-[#737373] leading-relaxed">
                  KwaZulu-Natal · South Africa · Nairobi · Kenya · Continent-wide
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-full hover:bg-[#111] transition-colors w-full sm:w-auto"
                >
                  Contact form
                </Link>
              </div>

              <div className="pt-8 border-t border-black/10">
                <div className={sectionTitleClass}>Newsletter</div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-black mb-2 -mt-1">
                  Get Group updates
                </h2>
                <p className="text-sm text-[#525252] leading-relaxed mb-4">
                  Occasional news on programmes, partnerships and continental milestones.{" "}
                  <Link
                    href="/newsletter"
                    className="font-semibold text-black underline underline-offset-2"
                  >
                    Learn more
                  </Link>
                </p>
                <NewsletterForm variant="footer" source="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-5 sm:py-6 text-center text-xs text-[#525252] px-4 sm:px-6">
        © {new Date().getFullYear()} BIG FIVE GROUP (PTY) LTD · ALL RIGHTS RESERVED
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> · </span>
        PROUDLY AFRICAN · ON-CHAIN · SUPER-CUBE®
      </div>
    </footer>
  );
}
