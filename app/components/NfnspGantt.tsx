"use client";

import { NFNSP, NFNSP_OFFERING_HREF } from "../lib/nfnspPartnership";

const FOREST = "#0F3D38";
const GOLD = "#C4923A";
const GOLD_LT = "#E8C07A";
const CREAM = "#F7F1E6";
const COLS = NFNSP.gantt.columns.length;

const TONE = {
  gold: { bg: GOLD, fg: "#0B1C22" },
  forest: { bg: FOREST, fg: GOLD_LT },
  horizon: { bg: "#E8C07A", fg: FOREST },
} as const;

const OFFERING_HREF: Record<string, string> = NFNSP_OFFERING_HREF;

function OfferingLinks({ offering }: { offering: string }) {
  const parts = offering.split(" · ");
  return (
    <div className="text-[10px] tracking-[0.4px] mt-1" style={{ color: FOREST }}>
      {parts.map((name, i) => {
        const href = OFFERING_HREF[name];
        return (
          <span key={`${name}-${i}`}>
            {i > 0 ? " · " : null}
            {href ? (
              <a
                href={href}
                className="underline decoration-[#0F3D38]/35 underline-offset-2 hover:decoration-[#0F3D38]"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function NfnspGantt() {
  const G = NFNSP.gantt;

  return (
    <div>
      <div className="text-[10px] sm:text-xs tracking-[2px] font-semibold mb-2" style={{ color: GOLD }}>
        02 · PROJECT PLAN
      </div>
      <div className="h-px w-14 mb-4" style={{ backgroundColor: GOLD }} />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-3 text-balance max-w-3xl">
        {G.title}
      </h2>
      <p className="text-sm text-[#404040] leading-relaxed max-w-3xl mb-2">{G.lead}</p>
      <p className="text-sm leading-relaxed max-w-3xl mb-3" style={{ color: FOREST }}>
        {G.owner}
      </p>
      <p className="text-sm text-[#404040] leading-relaxed max-w-3xl mb-8">
        Select a stream to open that Goal, Game Changer or Enabler. Each pillar name opens the company
        that delivers it. Those sections link back to this plan.
      </p>

      <div className="rounded-2xl bg-white overflow-hidden mb-8" style={{ border: "1px solid rgba(196,146,58,0.35)" }}>
        <div className="overflow-x-auto">
          <div className="grid min-w-[40rem] grid-cols-[10.75rem_minmax(18rem,1fr)] md:min-w-[48rem] md:grid-cols-[minmax(14.5rem,0.95fr)_minmax(22rem,1.6fr)]">
            <div
              className="sticky left-0 z-10 border-r px-3 py-3 text-[10px] tracking-[1.6px] font-semibold md:px-4"
              style={{ color: GOLD, backgroundColor: CREAM, borderColor: "rgba(196,146,58,0.28)" }}
            >
              IMPACT STREAM
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))`,
                backgroundColor: CREAM,
              }}
            >
              {G.columns.map((c) => (
                <div key={c.id} className="px-1 py-3 text-center">
                  <div className="text-[11px] font-semibold" style={{ color: FOREST }}>
                    {c.label}
                  </div>
                  <div className="text-[9px] text-[#737373] leading-tight mt-0.5">{c.sub}</div>
                </div>
              ))}
            </div>

            {G.rows.map((row) => {
              const tone = TONE[row.tone];
              const left = (row.start / COLS) * 100;
              const width = ((row.end - row.start + 1) / COLS) * 100;
              const span = `${G.columns[row.start]?.label ?? ""} – ${G.columns[row.end]?.label ?? ""}`;
              return (
                <div key={row.stream} className="contents">
                  <div
                    className="sticky left-0 z-10 min-w-0 border-r border-t bg-white px-3 py-3 md:px-4"
                    style={{ borderTopColor: "rgba(15,61,56,0.08)", borderRightColor: "rgba(196,146,58,0.28)" }}
                  >
                    <a
                      href={row.href}
                      className="text-sm font-semibold text-black leading-snug underline decoration-[#C4923A]/45 underline-offset-2 hover:decoration-[#C4923A]"
                    >
                      {row.stream}
                    </a>
                    <div className="text-[11px] text-[#525252] leading-snug">{row.product}</div>
                    <OfferingLinks offering={row.offering} />
                    <a
                      href={row.href}
                      className="inline-block text-[10px] tracking-[0.6px] mt-1 underline decoration-[#C4923A]/45 underline-offset-2 hover:decoration-[#C4923A]"
                      style={{ color: GOLD }}
                    >
                      {row.goal} →
                    </a>
                    {"alsoHref" in row ? (
                      <a
                        href={row.alsoHref}
                        className="block text-[10px] tracking-[0.4px] mt-0.5 underline decoration-[#0F3D38]/35 underline-offset-2 hover:decoration-[#0F3D38]"
                        style={{ color: FOREST }}
                      >
                        {row.alsoLabel} →
                      </a>
                    ) : null}
                  </div>
                  <div className="relative mx-2 my-2 min-h-11 border-t" style={{ borderColor: "transparent" }}>
                    <div className="absolute inset-y-2 inset-x-0 rounded-full" style={{ backgroundColor: CREAM }} />
                    <div
                      className="absolute inset-y-0 pointer-events-none grid h-full w-full"
                      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}
                    >
                      {G.columns.map((c, i) => (
                        <div
                          key={c.id}
                          className="h-full"
                          style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(196,146,58,0.18)" }}
                        />
                      ))}
                    </div>
                    <a
                      href={row.href}
                      className="absolute top-3 bottom-3 rounded-full hover:brightness-110"
                      style={{
                        left: `calc(${left}% + 3px)`,
                        width: `calc(${width}% - 6px)`,
                        backgroundColor: tone.bg,
                      }}
                      aria-label={`${row.stream}, ${span}. Open ${row.goal}.`}
                      title={`${row.stream}: ${span}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 mb-6">
        {G.phases.map((p) => (
          <article
            key={p.n}
            className="rounded-2xl bg-white p-4 min-w-0 flex flex-col"
            style={{ border: "1px solid rgba(196,146,58,0.35)" }}
          >
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <div className="text-[10px] tracking-[1.8px] font-semibold" style={{ color: GOLD }}>
                PHASE {p.n}
              </div>
              <div className="text-[10px] text-[#737373] text-right leading-tight">{p.when}</div>
            </div>
            <a
              href={p.href}
              className="text-base font-semibold mb-1 underline decoration-[#0F3D38]/30 underline-offset-2 hover:decoration-[#0F3D38]"
              style={{ color: FOREST }}
            >
              {p.name}
            </a>
            <p className="text-[11px] font-semibold text-black leading-snug mb-2">{p.goal}</p>
            <p className="text-[11px] text-[#525252] leading-relaxed mb-3">{p.objective}</p>
            <div className="text-[10px] tracking-[1.4px] font-semibold mb-1" style={{ color: GOLD }}>
              DELIVERABLES
            </div>
            <ul className="space-y-1 mb-3">
              {p.deliverables.map((d) => (
                <li key={d} className="text-[11px] text-[#404040] leading-snug pl-3 relative">
                  <span className="absolute left-0 top-[0.45em] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: FOREST }} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="text-[10px] tracking-[1.4px] font-semibold mb-1" style={{ color: GOLD }}>
              BIG FIVE PRODUCTS
            </div>
            <ul className="space-y-1">
              {p.products.map((d) => (
                <li key={d} className="text-[11px] leading-snug" style={{ color: FOREST }}>
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="text-[11px] text-[#737373] leading-relaxed max-w-4xl">{G.note}</p>
    </div>
  );
}
