/**
 * Big Five Direct × SANTACO container partnership.
 *
 * Industry context is drawn from public sources for investor/partner framing.
 * Partnership and 15,000-container figures are Group-stated programme ambitions /
 * partnership plans — not a claim that all containers are already live.
 */

/** South African National Taxi Council — national industry body */
export const SANTACO = {
  name: "South African National Taxi Council",
  shortName: "SANTACO",
  /** Official site */
  url: "https://santaco.org/",
  aboutUrl: "https://santaco.org/about-us/",
  summary:
    "SANTACO is the national representative body of South Africa’s minibus-taxi industry — formed in 2001 as the unified voice of the sector following a government-led National Taxi Task Team process.",
} as const;

/**
 * Credible industry context for why taxi ranks matter commercially.
 * Distinguish industry-reported / survey figures from Big Five claims.
 */
export const TAXI_INDUSTRY_CONTEXT = {
  stats: [
    {
      value: "Dominant mode",
      label: "Taxis lead SA public-transport trips",
      detail:
        "Statistics South Africa’s National Household Travel Survey shows minibus taxis are by far the largest public-transport mode — about 80% of public-transport trips in the 2020 survey wave (vs bus and train).",
      source: {
        label: "Stats SA · National Household Travel Survey 2020 (P0320)",
        href: "https://www.statssa.gov.za/publications/P0320/P03202020.pdf",
      },
    },
    {
      value: "~69%",
      label: "Households that used taxis (NHTS lineage)",
      detail:
        "Earlier NHTS waves and secondary analyses commonly report that a clear majority of South African households use taxis in a given month — far ahead of bus and rail for everyday mobility.",
      source: {
        label: "Stats SA NHTS series (see also cityenergy NHTS extracts)",
        href: "https://www.statssa.gov.za/?page_id=1854&PPN=P0320",
      },
    },
    {
      value: "Millions / day",
      label: "Daily taxi mobility (industry scale)",
      detail:
        "Industry and media sources frequently cite on the order of ~15 million daily taxi passenger trips. Independent fact-checking has noted that the exact national headcount is hard to pin down from published surveys — treat “millions of daily trips” as the credible order of magnitude for investor narrative, not a Big Five audited metric.",
      source: {
        label: "Africa Check · industry ridership claims (context)",
        href: "https://africacheck.org/fact-checks/reports/taxi-industry-transports-majority-south-africas-public-commuters-exact-number",
      },
    },
    {
      value: "Ranks",
      label: "Natural high-footfall retail & media nodes",
      detail:
        "Major taxi ranks and rural association stops concentrate commuters at predictable times — high-frequency contact points for food retail, surveys, marketing and education when infrastructure sits where people already move.",
      source: {
        label: "SANTACO · industry body",
        href: "https://santaco.org/",
      },
    },
  ],
  investorNote:
    "Taxi ranks give investors a physical interface to the South African population at scale: minibus taxis move the majority of public-transport users every day. Container sites at ranks and rural communities convert that footfall into food offtake, survey insight, marketing revenue and Super-Cube® / Leadership education — not a claim of exclusive reach of the entire industry.",
} as const;

/**
 * Big Five Direct partnership programme with SANTACO.
 * 15,000 containers = partnership rollout target / plan scale.
 */
export const SANTACO_PARTNERSHIP = {
  id: "direct-santaco-containers",
  eyebrow: "PARTNERSHIP · BIG FIVE DIRECT × SANTACO",
  title: "15,000 containers at taxi ranks & rural communities",
  headline: "Foods supply · Wi‑Fi · surveys · marketing · Super-Cube® education",
  partner: SANTACO,
  containers: {
    value: "15,000",
    label: "Containers · rollout plan",
    detail:
      "Big Five Direct has partnered with SANTACO to roll out 15,000 containers across major taxi ranks and rural communities — a partnership programme scale, not a claim that every unit is already live.",
  },
  purpose:
    "Supply Big Five Foods and related Group products at the last mile where commuters already gather — and instrument each site as a multi-use economic and learning node.",
  inContainer: [
    {
      t: "Food supply",
      d: "Fortified and staple Big Five Foods product for taxi-rank and rural community purchase — recurring daily demand at high-footfall nodes.",
    },
    {
      t: "Wi‑Fi · surveys",
      d: "Connectivity for passenger and community surveys — insight for programmes, partners and product-market fit.",
    },
    {
      t: "Marketing · sales revenue",
      d: "On-site marketing and retail sales — commercial revenue layered on logistics footprint.",
    },
    {
      t: "Education · Super-Cube®",
      d: "Big Five Leadership / Super-Cube® learning touchpoints — education delivered where people already move.",
    },
  ],
  investorLeverage:
    "Investors can leverage South Africa’s taxi-rank economy: taxis dominate public transport and concentrate millions of daily movements. Container nodes turn that mobility into recurring food offtake, data, media/sales and leadership education under one Direct + Foods + Leadership stack.",
  honesty: [
    "Partnership with SANTACO and 15,000-container rollout are Group-stated programme plans — phased deployment, not overnight national saturation.",
    "Industry ridership and mode-share figures are external (Stats SA / industry) — not Big Five audited passenger counts.",
    "Marketing, survey and education revenues scale with live sites, connectivity and programme design — request NDA materials for unit economics by corridor.",
  ],
} as const;
