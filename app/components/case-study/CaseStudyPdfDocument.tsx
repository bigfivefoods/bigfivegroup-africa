import type { CaseStudyPdfId } from "./CaseStudyPdfDownload";
import { SA_CASE } from "../../lib/supplierAdvisorCase";
import { SCHOOL_ADVISOR_CASE, SCHOOL_MEAL_SAFETY_SOURCE } from "../../lib/schoolAdvisorCase";
import { NSNP, NSNP_CASE } from "../../lib/nsnp";

type Theme = {
  accent: string;
  accentSoft: string;
  accentDark: string;
  gradientFrom: string;
  gradientVia: string;
  chipBg: string;
  chipText: string;
  chipBorder: string;
};

const THEMES: Record<CaseStudyPdfId, Theme> = {
  "sa-dbe-kzn": {
    accent: "#0e7490",
    accentSoft: "#ecfeff",
    accentDark: "#164e63",
    gradientFrom: "#0c4a6e",
    gradientVia: "#0f172a",
    chipBg: "#ecfeff",
    chipText: "#164e63",
    chipBorder: "#a5f3fc",
  },
  "schooladvisor-kitchen": {
    accent: "#c2410c",
    accentSoft: "#fff7ed",
    accentDark: "#7c2d12",
    gradientFrom: "#7c2d12",
    gradientVia: "#0f172a",
    chipBg: "#fff7ed",
    chipText: "#7c2d12",
    chipBorder: "#fed7aa",
  },
  "nsnp-foods": {
    accent: "#b45309",
    accentSoft: "#fffbeb",
    accentDark: "#78350f",
    gradientFrom: "#451a03",
    gradientVia: "#1c1006",
    chipBg: "#fffbeb",
    chipText: "#78350f",
    chipBorder: "#fde68a",
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
  lead: string;
  body: string;
  context?: string;
  solution?: string;
  actors: { t: string; d: string }[];
  howItWorks: { t: string; d: string }[];
  outcomes: string[];
  whyItMatters: string;
  stats: { value: string; label: string }[];
  pillars: string[];
  note: string;
  sourceLine?: string;
  sourceUrl?: string;
  platformUrl?: string;
  footerUrl: string;
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
      lead: SA_CASE.body,
      body: SA_CASE.context,
      actors: [...SA_CASE.actors],
      howItWorks: [...SA_CASE.howItWorks],
      outcomes: [...SA_CASE.outcomes],
      whyItMatters: SA_CASE.whyItMatters,
      stats: [...SA_CASE.stats],
      pillars: [...SA_CASE.pillars],
      note: SA_CASE.note,
      platformUrl: SA_CASE.siteUrl,
      footerUrl: "bigfivegroup.africa/connect#case-study-sa",
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
      ambitionUnit: c.ambitionUnit,
      secondaryStat: c.secondaryStat,
      lead: c.problemLead,
      body: c.problemBody,
      context: c.problemContext,
      solution: c.solutionLead,
      actors: [...c.actors],
      howItWorks: [...c.howItWorks],
      outcomes: [...c.outcomes],
      whyItMatters: c.whyItMatters,
      stats: [...c.stats],
      pillars: [...c.pillars],
      note: c.note,
      sourceLine: `${SCHOOL_MEAL_SAFETY_SOURCE.outlet} · ${SCHOOL_MEAL_SAFETY_SOURCE.author} · ${SCHOOL_MEAL_SAFETY_SOURCE.publishedLabel}`,
      sourceUrl: SCHOOL_MEAL_SAFETY_SOURCE.url,
      platformUrl: c.siteUrl,
      footerUrl: "bigfivegroup.africa/connect#case-study-schooladvisor",
    };
  }
  // nsnp-foods
  return {
    id,
    logoSrc: "/bigfivefoods-logo.png",
    logoAlt: "Big Five Foods",
    logoOnDarkInvert: true,
    eyebrow: NSNP_CASE.eyebrow,
    headline: NSNP_CASE.headline,
    ambition: NSNP_CASE.ambition,
    ambitionUnit: NSNP_CASE.ambitionUnit,
    lead: NSNP_CASE.approval,
    body: NSNP_CASE.productFocus,
    context: NSNP.summary,
    solution:
      "Big Five Foods supplies NSNP-approved institutional formats and works with Connect / SupplierAdvisor® so programme procurement can run on verified trade rails where applicable.",
    actors: [
      {
        t: NSNP.departmentShort,
        d: "National School Nutrition Programme owner — institutional pathway for daily learner meals.",
      },
      {
        t: "Big Five Foods",
        d: "NSNP-approved 5kg institutional porridges, soya and one-pot formats designed for school kitchens.",
      },
      {
        t: "Schools & programmes",
        d: "High-volume kitchens that need shelf-stable, fortified, cost-efficient packs that travel without cold chain.",
      },
    ],
    howItWorks: [
      {
        t: "Land the pathway",
        d: "Programme relationship with DBE under NSNP — institutional SKUs approved for school-channel use.",
      },
      {
        t: "Supply institutional packs",
        d: "5kg Enriched Porridge, Beef Soya Mince and One-Pot Chicken Biryani Mix for high-volume kitchens.",
      },
      {
        t: "Scale with honest language",
        d: "2.5 million children/day is plan scale as delivery ramps — not a claim of current daily headcount.",
      },
      {
        t: "Trade with proof",
        d: "Where programme procurement allows, ordering and verification via SupplierAdvisor®.",
      },
    ],
    outcomes: [...NSNP_CASE.whatWeDeliver],
    whyItMatters: NSNP_CASE.whyItMatters,
    stats: [
      { value: "2.5M", label: "Children/day plan scale" },
      { value: "3", label: "NSNP-approved 5kg SKUs" },
      { value: "DBE", label: "Programme pathway" },
      { value: "SA®", label: "Trade rails where applicable" },
    ],
    pillars: [...NSNP_CASE.pillars],
    note:
      "The 2.5 million children/day figure is a high-level delivery plan as the NSNP pathway ramps — not current daily operational headcount. Confirm live volumes and awards in a dated partner brief.",
    platformUrl: NSNP.officialUrl,
    footerUrl: "bigfivegroup.africa/foods#case-study",
  };
}

/** Screen-hidden; becomes the only content when data-print-case matches. */
export default function CaseStudyPdfDocument({ pdfId }: { pdfId: CaseStudyPdfId }) {
  const m = modelFor(pdfId);
  const theme = THEMES[pdfId];
  const rootId = `case-study-pdf-${pdfId}`;

  return (
    <div
      id={rootId}
      className="case-study-pdf-doc"
      data-case-pdf={pdfId}
      aria-hidden="true"
    >
      {/* —— Page 1: Cover —— */}
      <article className="case-study-pdf-page case-study-pdf-cover">
        <div
          className="case-study-pdf-cover-hero"
          style={{
            background: `linear-gradient(135deg, ${theme.gradientFrom} 0%, ${theme.gradientVia} 55%, #000 100%)`,
          }}
        >
          <div className="case-study-pdf-logo-tile">
            {/* eslint-disable-next-line @next/next/no-img-element -- print clone reliability */}
            <img
              src={m.logoSrc}
              alt={m.logoAlt}
              className="case-study-pdf-logo"
              style={m.logoOnDarkInvert ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </div>
          <p className="case-study-pdf-eyebrow" style={{ color: "#fde68a" }}>
            {m.eyebrow}
          </p>
          <h1 className="case-study-pdf-headline">{m.headline}</h1>
          <div className="case-study-pdf-hero-stats">
            <div>
              <div className="case-study-pdf-ambition">{m.ambition}</div>
              <div className="case-study-pdf-ambition-unit">{m.ambitionUnit}</div>
            </div>
            {m.secondaryStat && (
              <div className="case-study-pdf-secondary-stat">
                <div className="case-study-pdf-ambition case-study-pdf-ambition-sm">
                  {m.secondaryStat.value}
                </div>
                <div className="case-study-pdf-ambition-unit">{m.secondaryStat.label}</div>
              </div>
            )}
          </div>
          <p className="case-study-pdf-lead-light">{m.lead}</p>
        </div>
        <div className="case-study-pdf-cover-body">
          <div className="case-study-pdf-stat-grid">
            {m.stats.map((s) => (
              <div key={s.label} className="case-study-pdf-stat-tile">
                <div className="case-study-pdf-stat-value" style={{ color: theme.accentDark }}>
                  {s.value}
                </div>
                <div className="case-study-pdf-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          {m.sourceLine && (
            <p className="case-study-pdf-source">
              <strong>Context source:</strong> {m.sourceLine}
              {m.sourceUrl ? ` · ${m.sourceUrl}` : ""}
            </p>
          )}
          <div className="case-study-pdf-footer-bar">
            <span>Big Five Group Africa · Confidential partner brief</span>
            <span>{m.footerUrl}</span>
          </div>
        </div>
      </article>

      {/* —— Page 2: Challenge & response —— */}
      <article className="case-study-pdf-page">
        <header className="case-study-pdf-page-header">
          <span className="case-study-pdf-page-kicker" style={{ color: theme.accent }}>
            Challenge & response
          </span>
          <h2 className="case-study-pdf-page-title">The problem we design against</h2>
        </header>
        <p className="case-study-pdf-prose">{m.body}</p>
        {m.context && <p className="case-study-pdf-prose muted">{m.context}</p>}
        {m.solution && (
          <div
            className="case-study-pdf-callout"
            style={{
              borderColor: theme.chipBorder,
              background: theme.accentSoft,
            }}
          >
            <div className="case-study-pdf-callout-label" style={{ color: theme.accentDark }}>
              Platform response
            </div>
            <p>{m.solution}</p>
          </div>
        )}
        <h3 className="case-study-pdf-h3">Who is on the network</h3>
        <div className="case-study-pdf-actor-grid">
          {m.actors.map((a) => (
            <div
              key={a.t}
              className="case-study-pdf-actor"
              style={{ borderColor: theme.chipBorder, background: theme.accentSoft }}
            >
              <div className="case-study-pdf-actor-title" style={{ color: theme.accentDark }}>
                {a.t}
              </div>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
        <div className="case-study-pdf-footer-bar">
          <span>{m.eyebrow}</span>
          <span>Page 2</span>
        </div>
      </article>

      {/* —— Page 3: How it works —— */}
      <article className="case-study-pdf-page">
        <header className="case-study-pdf-page-header">
          <span className="case-study-pdf-page-kicker" style={{ color: theme.accent }}>
            Operating model
          </span>
          <h2 className="case-study-pdf-page-title">How it works</h2>
        </header>
        <ol className="case-study-pdf-steps">
          {m.howItWorks.map((step, i) => (
            <li key={step.t} className="case-study-pdf-step">
              <span
                className="case-study-pdf-step-n"
                style={{ background: theme.accent, color: "#fff" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="case-study-pdf-step-t">{step.t}</div>
                <p>{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="case-study-pdf-footer-bar">
          <span>{m.platformUrl?.replace("https://", "") ?? "bigfivegroup.africa"}</span>
          <span>Page 3</span>
        </div>
      </article>

      {/* —— Page 4: Outcomes & notes —— */}
      <article className="case-study-pdf-page">
        <header className="case-study-pdf-page-header">
          <span className="case-study-pdf-page-kicker" style={{ color: theme.accent }}>
            Outcomes
          </span>
          <h2 className="case-study-pdf-page-title">Why it matters</h2>
        </header>
        <p className="case-study-pdf-prose">{m.whyItMatters}</p>
        <ul className="case-study-pdf-outcomes">
          {m.outcomes.map((o) => (
            <li key={o}>
              <span className="case-study-pdf-check" style={{ color: theme.accent }}>
                ✓
              </span>
              {o}
            </li>
          ))}
        </ul>
        <div className="case-study-pdf-pillars">
          {m.pillars.map((p) => (
            <span
              key={p}
              className="case-study-pdf-pillar"
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
        <div className="case-study-pdf-disclaimer">
          <strong>Notes & methodology.</strong> {m.note}
        </div>
        <div
          className="case-study-pdf-cta-band"
          style={{
            background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientVia})`,
          }}
        >
          <div>
            <div className="case-study-pdf-cta-title">Continue the conversation</div>
            <p>
              bigfivegroup.africa/contact · {m.platformUrl?.replace("https://", "")} ·{" "}
              {m.footerUrl}
            </p>
          </div>
          <div className="case-study-pdf-cta-brand">Big Five Group · Connect</div>
        </div>
        <div className="case-study-pdf-footer-bar">
          <span>Not a binding offer · Confirm live scope in a dated partner brief</span>
          <span>Page 4</span>
        </div>
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
.case-study-pdf-print-layer {
  display: none;
}
.case-study-pdf-doc {
  display: none;
}
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
  .case-study-pdf-page {
    box-sizing: border-box;
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    padding: 14mm 16mm 12mm;
    margin: 0 auto;
    page-break-after: always;
    break-after: page;
    page-break-inside: avoid;
    overflow: hidden;
    background: #fff;
    color: #171717;
    font-family: Inter, system-ui, sans-serif;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    display: flex;
    flex-direction: column;
  }
  .case-study-pdf-page:last-child {
    page-break-after: auto;
    break-after: auto;
  }
  .case-study-pdf-cover {
    padding: 0 !important;
  }
  .case-study-pdf-cover-hero {
    padding: 16mm 16mm 12mm;
    color: #fff;
    min-height: 168mm;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .case-study-pdf-logo-tile {
    display: inline-flex;
    background: #fff;
    border-radius: 14px;
    padding: 10px 14px;
    margin-bottom: 14px;
  }
  .case-study-pdf-logo {
    height: 44px;
    width: auto;
    object-fit: contain;
    display: block;
  }
  .case-study-pdf-eyebrow {
    font-size: 9px;
    letter-spacing: 0.18em;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 0 10px;
    opacity: 0.95;
  }
  .case-study-pdf-headline {
    font-size: 26px;
    line-height: 1.12;
    font-weight: 600;
    letter-spacing: -0.03em;
    margin: 0 0 18px;
    max-width: 95%;
  }
  .case-study-pdf-hero-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 16px;
  }
  .case-study-pdf-ambition {
    font-size: 42px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .case-study-pdf-ambition-sm {
    font-size: 32px;
  }
  .case-study-pdf-ambition-unit {
    margin-top: 6px;
    font-size: 12px;
    opacity: 0.85;
    line-height: 1.35;
  }
  .case-study-pdf-lead-light {
    font-size: 12px;
    line-height: 1.5;
    opacity: 0.88;
    max-width: 95%;
    margin: 0;
  }
  .case-study-pdf-cover-body {
    padding: 12mm 16mm 10mm;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .case-study-pdf-stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }
  .case-study-pdf-stat-tile {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 12px;
    background: #fafafa;
    padding: 10px 12px;
    text-align: center;
  }
  .case-study-pdf-stat-value {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .case-study-pdf-stat-label {
    font-size: 9px;
    color: #737373;
    margin-top: 3px;
    line-height: 1.3;
  }
  .case-study-pdf-source {
    font-size: 9px;
    color: #525252;
    line-height: 1.4;
    margin: 0 0 10px;
  }
  .case-study-pdf-page-header {
    margin-bottom: 10px;
  }
  .case-study-pdf-page-kicker {
    font-size: 9px;
    letter-spacing: 0.16em;
    font-weight: 700;
    text-transform: uppercase;
  }
  .case-study-pdf-page-title {
    font-size: 22px;
    letter-spacing: -0.03em;
    font-weight: 600;
    margin: 4px 0 0;
  }
  .case-study-pdf-prose {
    font-size: 11.5px;
    line-height: 1.55;
    color: #404040;
    margin: 0 0 10px;
  }
  .case-study-pdf-prose.muted {
    color: #525252;
  }
  .case-study-pdf-callout {
    border: 1px solid;
    border-radius: 12px;
    padding: 12px 14px;
    margin: 4px 0 14px;
    font-size: 11.5px;
    line-height: 1.5;
    color: #404040;
  }
  .case-study-pdf-callout-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .case-study-pdf-h3 {
    font-size: 13px;
    font-weight: 600;
    margin: 6px 0 8px;
  }
  .case-study-pdf-actor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin-bottom: auto;
  }
  .case-study-pdf-actor {
    border: 1px solid;
    border-radius: 12px;
    padding: 10px;
  }
  .case-study-pdf-actor-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .case-study-pdf-actor p {
    font-size: 9.5px;
    line-height: 1.4;
    color: #404040;
    margin: 0;
  }
  .case-study-pdf-steps {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
  }
  .case-study-pdf-step {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: flex-start;
  }
  .case-study-pdf-step-n {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .case-study-pdf-step-t {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  .case-study-pdf-step p {
    font-size: 11px;
    line-height: 1.45;
    color: #525252;
    margin: 0;
  }
  .case-study-pdf-outcomes {
    list-style: none;
    margin: 0 0 14px;
    padding: 0;
  }
  .case-study-pdf-outcomes li {
    display: flex;
    gap: 8px;
    font-size: 11.5px;
    line-height: 1.45;
    color: #404040;
    margin-bottom: 8px;
  }
  .case-study-pdf-check {
    font-weight: 700;
    flex-shrink: 0;
  }
  .case-study-pdf-pillars {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  .case-study-pdf-pillar {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid;
    border-radius: 999px;
    padding: 4px 10px;
  }
  .case-study-pdf-disclaimer {
    border: 1px solid rgba(0,0,0,0.08);
    background: #fafafa;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 9px;
    line-height: 1.45;
    color: #525252;
    margin-bottom: 12px;
  }
  .case-study-pdf-cta-band {
    border-radius: 14px;
    padding: 14px 16px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;
    margin-bottom: 10px;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .case-study-pdf-cta-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .case-study-pdf-cta-band p {
    font-size: 9.5px;
    opacity: 0.85;
    margin: 0;
    line-height: 1.4;
  }
  .case-study-pdf-cta-brand {
    font-size: 10px;
    font-weight: 600;
    opacity: 0.9;
    white-space: nowrap;
  }
  .case-study-pdf-footer-bar {
    margin-top: auto;
    padding-top: 8px;
    border-top: 1px solid rgba(0,0,0,0.08);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 8.5px;
    color: #a3a3a3;
  }
  .case-study-pdf-cover .case-study-pdf-footer-bar {
    border-top-color: rgba(0,0,0,0.08);
  }
}
`,
      }}
    />
  );
}
