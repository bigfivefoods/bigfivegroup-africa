import type { CaseStudyPdfId } from "./CaseStudyPdfDownload";
import { SA_CASE } from "../../lib/supplierAdvisorCase";
import { SCHOOL_ADVISOR_CASE, SCHOOL_MEAL_SAFETY_SOURCE } from "../../lib/schoolAdvisorCase";
import { NSNP, NSNP_CASE } from "../../lib/nsnp";

type Theme = {
  accent: string;
  accentSoft: string;
  accentDark: string;
  accentMid: string;
  gradientFrom: string;
  gradientVia: string;
  chipBg: string;
  chipText: string;
  chipBorder: string;
  heroTint: string;
};

const THEMES: Record<CaseStudyPdfId, Theme> = {
  "sa-dbe-kzn": {
    accent: "#0891b2",
    accentSoft: "#ecfeff",
    accentDark: "#0e7490",
    accentMid: "#155e75",
    gradientFrom: "#0c4a6e",
    gradientVia: "#0f172a",
    chipBg: "#ecfeff",
    chipText: "#155e75",
    chipBorder: "#a5f3fc",
    heroTint: "#67e8f9",
  },
  "schooladvisor-kitchen": {
    accent: "#ea580c",
    accentSoft: "#fff7ed",
    accentDark: "#c2410c",
    accentMid: "#9a3412",
    gradientFrom: "#7c2d12",
    gradientVia: "#0f172a",
    chipBg: "#fff7ed",
    chipText: "#9a3412",
    chipBorder: "#fed7aa",
    heroTint: "#fdba74",
  },
  "nsnp-foods": {
    accent: "#d97706",
    accentSoft: "#fffbeb",
    accentDark: "#b45309",
    accentMid: "#92400e",
    gradientFrom: "#451a03",
    gradientVia: "#1c1006",
    chipBg: "#fffbeb",
    chipText: "#92400e",
    chipBorder: "#fde68a",
    heroTint: "#fcd34d",
  },
};

type PdfModel = {
  id: CaseStudyPdfId;
  logoSrc: string;
  logoAlt: string;
  logoOnDarkInvert?: boolean;
  eyebrow: string;
  headline: string;
  ambition: string;
  ambitionUnit: string;
  secondaryStat?: { value: string; label: string };
  /** Short challenge (1–2 sentences) */
  challenge: string;
  /** Short response (1–2 sentences) */
  response: string;
  actors: { t: string; d: string }[];
  /** Max 4 steps for page 1 */
  howItWorks: { t: string; d: string }[];
  /** Max 4 outcomes for page 1 */
  outcomes: string[];
  whyItMatters: string;
  stats: { value: string; label: string }[];
  pillars: string[];
  note: string;
  sourceLine?: string;
  platformUrl?: string;
  footerUrl: string;
  brandLine: string;
};

function modelFor(id: CaseStudyPdfId): PdfModel {
  if (id === "sa-dbe-kzn") {
    return {
      id,
      logoSrc: SA_CASE.logoSrc,
      logoAlt: SA_CASE.logoAlt,
      eyebrow: SA_CASE.eyebrow,
      headline: SA_CASE.headline,
      ambition: SA_CASE.ambition,
      ambitionUnit: SA_CASE.ambitionUnit,
      secondaryStat: SA_CASE.secondaryStat,
      challenge:
        "Without a shared system, approved menus stay in circulars while kitchens and contractors improvise — so the plate drifts from policy.",
      response:
        "Big Five Connect runs SupplierAdvisor® so DBE sets approved products and menus once; ~1,800 service providers and ~6,000 KZN schools work from the same live rules, with incentives to comply.",
      actors: SA_CASE.actors.map((a) => ({
        t: a.t,
        d: a.d.length > 120 ? `${a.d.slice(0, 117)}…` : a.d,
      })),
      howItWorks: SA_CASE.howItWorks.slice(0, 4).map((s) => ({
        t: s.t,
        d: s.d.length > 110 ? `${s.d.slice(0, 107)}…` : s.d,
      })),
      outcomes: SA_CASE.outcomes.slice(0, 4),
      whyItMatters:
        "School feeding only works when the plate matches the policy. One network turns SupplierAdvisor® into a compliance and nutrition engine — not just a marketplace.",
      stats: [...SA_CASE.stats],
      pillars: [...SA_CASE.pillars],
      note: "Figures (~1,800 providers · ~6,000 KZN schools) are approximate programme-scale estimates — not a live census. Confirm scope with Big Five Connect.",
      platformUrl: SA_CASE.siteUrl,
      footerUrl: "bigfivegroup.africa/connect#case-study-sa",
      brandLine: "Big Five Connect · SupplierAdvisor®",
    };
  }
  if (id === "schooladvisor-kitchen") {
    const c = SCHOOL_ADVISOR_CASE;
    return {
      id,
      logoSrc: c.logoSrc,
      logoAlt: c.logoAlt,
      eyebrow: c.eyebrow,
      headline: c.headline,
      ambition: c.ambition,
      ambitionUnit: "pupils fed daily under NSNP (reported)",
      secondaryStat: c.secondaryStat,
      challenge:
        "News24 (Aug 2026): ~9.4M pupils eat via NSNP daily, yet only ~18% of schools in six provinces meet legal food-handling rules — kitchens prepare meals outside the safety bar the law expects.",
      response:
        "SchoolAdvisor on SupplierAdvisor® gives DBE and PEDs a live kitchen-compliance OS: certificates, SHEQ, training, inspections and CAPA — on the same fabric as approved products and menus.",
      actors: c.actors.map((a) => ({
        t: a.t,
        d: a.d.length > 115 ? `${a.d.slice(0, 112)}…` : a.d,
      })),
      howItWorks: c.howItWorks.slice(0, 4).map((s) => ({
        t: s.t,
        d: s.d.length > 105 ? `${s.d.slice(0, 102)}…` : s.d,
      })),
      outcomes: c.outcomes.slice(0, 4),
      whyItMatters:
        "Feeding millions is a nutrition win only if every plate is safe. SchoolAdvisor turns kitchen readiness into governable data for the Department of Basic Education.",
      stats: [...c.stats],
      pillars: [...c.pillars],
      note: `9.4M and 18% figures: public ${SCHOOL_MEAL_SAFETY_SOURCE.outlet} reporting (${SCHOOL_MEAL_SAFETY_SOURCE.publishedLabel}) — external context, not Big Five metrics. Confirm live configuration with Connect.`,
      sourceLine: `${SCHOOL_MEAL_SAFETY_SOURCE.outlet} · ${SCHOOL_MEAL_SAFETY_SOURCE.author}`,
      platformUrl: c.siteUrl,
      footerUrl: "bigfivegroup.africa/connect#case-study-schooladvisor",
      brandLine: "Big Five Connect · SchoolAdvisor",
    };
  }
  return {
    id,
    logoSrc: "/bigfivefoods-logo.png",
    logoAlt: "Big Five Foods",
    logoOnDarkInvert: true,
    eyebrow: NSNP_CASE.eyebrow,
    headline: NSNP_CASE.headline,
    ambition: NSNP_CASE.ambition,
    ambitionUnit: NSNP_CASE.ambitionUnit,
    challenge:
      "National school nutrition needs fortified, shelf-stable institutional formats that travel, cook at volume, and meet programme standards — without cold chain.",
    response:
      "Big Five Foods has landed the NSNP pathway with DBE: approved 5kg Enriched Porridge, Beef Soya Mince and One-Pot Chicken Biryani Mix — plan scale 2.5M children/day as delivery ramps.",
    actors: [
      { t: NSNP.departmentShort, d: "NSNP owner — institutional pathway for daily learner meals." },
      {
        t: "Big Five Foods",
        d: "NSNP-approved 5kg packs — porridge, soya and one-pot formats for school kitchens.",
      },
      {
        t: "Schools & programmes",
        d: "High-volume kitchens needing cost-efficient, fortified, shelf-stable supply.",
      },
    ],
    howItWorks: [
      { t: "Land the pathway", d: "Programme relationship with DBE under NSNP for school-channel SKUs." },
      {
        t: "Supply institutional packs",
        d: "5kg porridge, beef soya mince and one-pot chicken biryani for kitchens.",
      },
      {
        t: "Honest scale language",
        d: "2.5M children/day is plan scale — not current daily headcount.",
      },
      {
        t: "Trade with proof",
        d: "Where procurement allows, verification via SupplierAdvisor®.",
      },
    ],
    outcomes: [...NSNP_CASE.whatWeDeliver].slice(0, 4),
    whyItMatters:
      "When children eat well, they can learn. Landing NSNP builds institutional credibility for other public pathways — with Group delivery capacity attached.",
    stats: [
      { value: "2.5M", label: "Children/day plan scale" },
      { value: "3", label: "NSNP-approved 5kg SKUs" },
      { value: "DBE", label: "Programme pathway" },
      { value: "SA®", label: "Trade rails where applicable" },
    ],
    pillars: [...NSNP_CASE.pillars],
    note: "2.5M children/day is high-level delivery plan as the pathway ramps — not operational headcount. Confirm volumes in a dated partner brief.",
    platformUrl: NSNP.officialUrl,
    footerUrl: "bigfivegroup.africa/foods#case-study",
    brandLine: "Big Five Foods · NSNP",
  };
}

/** Screen-hidden; becomes the only content when data-print-case matches. */
export default function CaseStudyPdfDocument({ pdfId }: { pdfId: CaseStudyPdfId }) {
  const m = modelFor(pdfId);
  const theme = THEMES[pdfId];
  const rootId = `case-study-pdf-${pdfId}`;

  return (
    <div id={rootId} className="case-study-pdf-doc" data-case-pdf={pdfId} aria-hidden="true">
      {/* ════════════ PAGE 1 — Executive brief ════════════ */}
      <article className="cs-page">
        {/* Top brand bar */}
        <header
          className="cs-topbar"
          style={{
            background: `linear-gradient(105deg, ${theme.gradientFrom} 0%, ${theme.gradientVia} 70%, #000 100%)`,
          }}
        >
          <div className="cs-topbar-left">
            <div className="cs-logo-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.logoSrc}
                alt={m.logoAlt}
                className="cs-logo"
                style={m.logoOnDarkInvert ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            </div>
            <div>
              <div className="cs-eyebrow" style={{ color: theme.heroTint }}>
                {m.eyebrow}
              </div>
              <div className="cs-brand-sub">{m.brandLine}</div>
            </div>
          </div>
          <div className="cs-topbar-right">
            <div className="cs-site">bigfivegroup.africa</div>
            <div className="cs-doc-type">Partner case study · A4</div>
          </div>
        </header>

        {/* Title + hero metrics */}
        <section className="cs-hero">
          <h1 className="cs-headline">{m.headline}</h1>
          <div className="cs-hero-metrics">
            <div className="cs-metric">
              <div className="cs-metric-value" style={{ color: theme.accentDark }}>
                {m.ambition}
              </div>
              <div className="cs-metric-label">{m.ambitionUnit}</div>
            </div>
            {m.secondaryStat && (
              <div className="cs-metric cs-metric-border" style={{ borderColor: theme.chipBorder }}>
                <div className="cs-metric-value" style={{ color: theme.accentDark }}>
                  {m.secondaryStat.value}
                </div>
                <div className="cs-metric-label">{m.secondaryStat.label}</div>
              </div>
            )}
          </div>
        </section>

        {/* Stat strip */}
        <div className="cs-stat-strip">
          {m.stats.map((s) => (
            <div
              key={s.label}
              className="cs-stat"
              style={{ borderColor: theme.chipBorder, background: theme.accentSoft }}
            >
              <div className="cs-stat-v" style={{ color: theme.accentDark }}>
                {s.value}
              </div>
              <div className="cs-stat-l">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Challenge | Response */}
        <div className="cs-two-col">
          <div className="cs-panel">
            <div className="cs-kicker" style={{ color: theme.accent }}>
              The challenge
            </div>
            <p className="cs-body">{m.challenge}</p>
            {m.sourceLine && <p className="cs-source">Source: {m.sourceLine}</p>}
          </div>
          <div
            className="cs-panel cs-panel-accent"
            style={{
              borderColor: theme.chipBorder,
              background: theme.accentSoft,
            }}
          >
            <div className="cs-kicker" style={{ color: theme.accentDark }}>
              Our response
            </div>
            <p className="cs-body">{m.response}</p>
          </div>
        </div>

        {/* Actors */}
        <div className="cs-section-label" style={{ color: theme.accentDark }}>
          Who is on the network
        </div>
        <div className="cs-actors">
          {m.actors.map((a) => (
            <div key={a.t} className="cs-actor" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="cs-actor-t" style={{ color: theme.accentDark }}>
                {a.t}
              </div>
              <p className="cs-actor-d">{a.d}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="cs-section-label" style={{ color: theme.accentDark }}>
          How it works
        </div>
        <div className="cs-steps">
          {m.howItWorks.map((s, i) => (
            <div key={s.t} className="cs-step">
              <span className="cs-step-n" style={{ background: theme.accentDark }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="cs-step-t">{s.t}</div>
                <p className="cs-step-d">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why it matters + outcomes */}
        <div
          className="cs-why"
          style={{ borderColor: theme.chipBorder, background: theme.accentSoft }}
        >
          <div className="cs-kicker" style={{ color: theme.accentDark }}>
            Why it matters
          </div>
          <p className="cs-body cs-body-tight">{m.whyItMatters}</p>
          <ul className="cs-outcomes">
            {m.outcomes.map((o) => (
              <li key={o}>
                <span style={{ color: theme.accentDark }}>✓</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillars + note + footer */}
        <div className="cs-pillars">
          {m.pillars.map((p) => (
            <span
              key={p}
              className="cs-pillar"
              style={{
                background: theme.chipBg,
                color: theme.chipText,
                borderColor: theme.chipBorder,
              }}
            >
              {p}
            </span>
          ))}
        </div>

        <p className="cs-note">
          <strong>Notes.</strong> {m.note}
        </p>

        <footer
          className="cs-footer"
          style={{
            background: `linear-gradient(105deg, ${theme.gradientFrom}, ${theme.gradientVia})`,
          }}
        >
          <div>
            <div className="cs-footer-title">Continue the conversation</div>
            <div className="cs-footer-links">
              bigfivegroup.africa/contact
              {m.platformUrl ? ` · ${m.platformUrl.replace("https://", "")}` : ""}
            </div>
          </div>
          <div className="cs-footer-meta">
            <div>{m.footerUrl}</div>
            <div>Not a binding offer</div>
          </div>
        </footer>
      </article>
    </div>
  );
}

/** Inject once via layout or first case study mount — pure CSS for print isolation */
export function CaseStudyPdfStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.case-study-pdf-print-layer { display: none; }
.case-study-pdf-doc { display: none; }

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html[data-print-case-active="true"] body {
    background: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  html[data-print-case-active="true"] body > *:not(.case-study-pdf-print-layer) {
    display: none !important;
  }
  html[data-print-case-active="true"] .case-study-pdf-print-layer {
    display: block !important;
    position: static !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
  }
  html[data-print-case-active="true"] .case-study-pdf-doc {
    display: none !important;
  }
  html[data-print-case="sa-dbe-kzn"] #case-study-pdf-sa-dbe-kzn,
  html[data-print-case="schooladvisor-kitchen"] #case-study-pdf-schooladvisor-kitchen,
  html[data-print-case="nsnp-foods"] #case-study-pdf-nsnp-foods {
    display: block !important;
  }

  .cs-page {
    box-sizing: border-box;
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #fff;
    color: #171717;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    display: flex;
    flex-direction: column;
    page-break-after: auto;
    page-break-inside: avoid;
  }

  /* ── Top bar ── */
  .cs-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 9mm 11mm 8mm;
    color: #fff;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-topbar-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .cs-logo-tile {
    background: #fff;
    border-radius: 10px;
    padding: 6px 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cs-logo {
    height: 28px;
    width: auto;
    max-width: 72px;
    object-fit: contain;
    display: block;
  }
  .cs-eyebrow {
    font-size: 7.5px;
    letter-spacing: 0.14em;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.3;
  }
  .cs-brand-sub {
    font-size: 10px;
    font-weight: 600;
    margin-top: 2px;
    opacity: 0.92;
  }
  .cs-topbar-right {
    text-align: right;
    flex-shrink: 0;
  }
  .cs-site {
    font-size: 9px;
    font-weight: 600;
    opacity: 0.9;
  }
  .cs-doc-type {
    font-size: 7.5px;
    opacity: 0.55;
    margin-top: 2px;
  }

  /* ── Hero ── */
  .cs-hero {
    padding: 6mm 11mm 4mm;
  }
  .cs-headline {
    font-size: 18px;
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin: 0 0 5mm;
    color: #0a0a0a;
    max-width: 100%;
  }
  .cs-hero-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4mm;
  }
  .cs-metric-value {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .cs-metric-label {
    font-size: 8.5px;
    color: #525252;
    margin-top: 2.5px;
    line-height: 1.3;
  }
  .cs-metric-border {
    padding-left: 4mm;
    border-left: 2px solid;
  }

  /* ── Stat strip ── */
  .cs-stat-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5mm;
    padding: 0 11mm 4mm;
  }
  .cs-stat {
    border: 1px solid;
    border-radius: 8px;
    padding: 2.5mm 2mm;
    text-align: center;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-stat-v {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .cs-stat-l {
    font-size: 6.5px;
    color: #737373;
    margin-top: 1.5px;
    line-height: 1.25;
  }

  /* ── Two column challenge / response ── */
  .cs-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
    padding: 0 11mm 3.5mm;
  }
  .cs-panel {
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 9px;
    padding: 3mm 3.5mm;
    background: #fafafa;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-panel-accent {
    border-width: 1px;
  }
  .cs-kicker {
    font-size: 7px;
    letter-spacing: 0.14em;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1.5mm;
  }
  .cs-body {
    font-size: 8.5px;
    line-height: 1.4;
    color: #404040;
    margin: 0;
  }
  .cs-body-tight {
    margin-bottom: 2mm;
  }
  .cs-source {
    font-size: 6.5px;
    color: #a3a3a3;
    margin: 2mm 0 0;
    line-height: 1.3;
  }

  /* ── Section label ── */
  .cs-section-label {
    font-size: 7.5px;
    letter-spacing: 0.12em;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0 11mm;
    margin-bottom: 2mm;
  }

  /* ── Actors ── */
  .cs-actors {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5mm;
    padding: 0 11mm 3.5mm;
  }
  .cs-actor {
    border: 1px solid;
    border-radius: 8px;
    padding: 2.5mm 2.5mm;
    background: #fff;
  }
  .cs-actor-t {
    font-size: 8px;
    font-weight: 700;
    margin-bottom: 1mm;
    line-height: 1.25;
  }
  .cs-actor-d {
    font-size: 7.5px;
    line-height: 1.35;
    color: #525252;
    margin: 0;
  }

  /* ── Steps ── */
  .cs-steps {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2mm 4mm;
    padding: 0 11mm 3.5mm;
  }
  .cs-step {
    display: flex;
    gap: 2.5mm;
    align-items: flex-start;
  }
  .cs-step-n {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 999px;
    color: #fff;
    font-size: 7px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-step-t {
    font-size: 8.5px;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5mm;
  }
  .cs-step-d {
    font-size: 7.5px;
    line-height: 1.35;
    color: #525252;
    margin: 0;
  }

  /* ── Why / outcomes ── */
  .cs-why {
    margin: 0 11mm 3mm;
    border: 1px solid;
    border-radius: 9px;
    padding: 3mm 3.5mm;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-outcomes {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2mm 3mm;
  }
  .cs-outcomes li {
    display: flex;
    gap: 1.5mm;
    font-size: 7.5px;
    line-height: 1.35;
    color: #404040;
  }
  .cs-outcomes li span:first-child {
    font-weight: 700;
    flex-shrink: 0;
  }

  /* ── Pillars ── */
  .cs-pillars {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5mm;
    padding: 0 11mm 2mm;
  }
  .cs-pillar {
    font-size: 6.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 999px;
    padding: 1.2mm 2.5mm;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* ── Note ── */
  .cs-note {
    margin: 0 11mm 3mm;
    font-size: 6.5px;
    line-height: 1.4;
    color: #737373;
  }

  /* ── Footer CTA ── */
  .cs-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
    padding: 4mm 11mm;
    color: #fff;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .cs-footer-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 1mm;
  }
  .cs-footer-links {
    font-size: 7.5px;
    opacity: 0.85;
    line-height: 1.35;
  }
  .cs-footer-meta {
    text-align: right;
    font-size: 7px;
    opacity: 0.7;
    line-height: 1.4;
  }
}
`,
      }}
    />
  );
}
