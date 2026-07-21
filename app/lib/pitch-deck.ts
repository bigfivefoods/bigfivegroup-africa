/**
 * Lean investor pitch deck content — high-signal, first-principles framing.
 * Numbers remain management-reported / illustrative unless stated under NDA.
 */

export const PITCH_DATA_ROOM = [
  "Financial model with sensitivities (USD)",
  "Pipeline list with stages & convert assumptions",
  "NSNP / institutional programme documentation",
  "SANTACO partnership materials & container pilot plan",
  "Holdco / IP / opco legal structure memo (counsel)",
  "Org chart, named team bios, board terms",
  "Sample monthly management pack",
] as const;

export const PITCH_FIRST_PRINCIPLES = {
  problem:
    "Africa’s food and institutional systems fail at the intersection of cost, nutrition, last-mile and proof — not for lack of need.",
  physics: [
    {
      k: "Need",
      v: "307M people in Africa faced hunger (2024) · child undernutrition remains structural (SOFI / UNICEF).",
    },
    {
      k: "Economics",
      v: "Fortified food that is ~50% cheaper than wholesale/retail and still carries ~45% GP can win public menus without charity pricing.",
    },
    {
      k: "Distribution",
      v: "Taxis dominate SA public transport (Stats SA NHTS). Ranks are high-frequency nodes for food + data + education.",
    },
    {
      k: "Trust",
      v: "Governments and DFIs buy delivery + audit trails — not slide-deck ambition alone.",
    },
  ],
  answer:
    "One holding company. Integrated rails: make fortified food, put it where people already move, verify trade, open public pathways, deliver with PMO discipline.",
} as const;

export const PITCH_MACHINE = [
  {
    slug: "foods",
    name: "Foods",
    line: "Wedge. Recurring fortified volume · ~45% GP · ~50% cheaper vs wholesale/retail · NSNP plan 2.5m/day.",
  },
  {
    slug: "direct",
    name: "Direct",
    line: "Last mile. SANTACO 15k container plan at ranks/rural — food + Wi‑Fi + marketing + Super-Cube®.",
  },
  {
    slug: "connect",
    name: "Connect",
    line: "Nervous system. SupplierAdvisor® verified trade OS — seats × ARPU + proof.",
  },
  {
    slug: "impact",
    name: "Impact",
    line: "PMO + health channel. DG of Health pathway into SA DoH and African health systems.",
  },
  {
    slug: "access",
    name: "Access",
    line: "Capital pathways. Tenders / CSI / DFI with Group delivery attached.",
  },
  {
    slug: "holdco",
    name: "Holdco",
    line: "Seychelles holdco · IP · end-market opcos (Kenya template). Investor owns the system.",
  },
] as const;
