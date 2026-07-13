/**
 * Big Five Foods network data as consumed by Direct (and future pillars).
 *
 * Live path: set SUPPLIERADVISOR_API_BASE + SUPPLIERADVISOR_API_KEY to pull from
 * SupplierAdvisor® (authenticated). Until then we serve a published snapshot
 * maintained for the website — same shape as the future live payload.
 *
 * Architecture (group multi-entity):
 *   Foods workspace on SA  →  (API key / webhook)  →  this site API
 *   Direct page consumes GET /api/network/foods
 *   Foundation/Impact can reuse the same endpoint later.
 */

export type ContainerSite = {
  id: string;
  name: string;
  location: string;
  region: string;
  status: "active" | "deploying" | "planned";
  role: string;
  lat: number;
  lng: number;
  /** Meals / product units facilitated (published or live) */
  mealsServed?: number;
  lastUpdated?: string;
};

export type FoodsImpact = {
  mealsDeliveredLabel: string;
  mealsDelivered: number;
  childrenReachedLabel: string;
  childrenReached: number;
  productRanges: number;
  shelfLifeMonths: number;
  certifications: string[];
};

export type FoodsNetworkPayload = {
  source: "live" | "published";
  company: {
    name: string;
    legalName: string;
    slug: string;
    verified: boolean;
    verifiedOn?: string;
    platformUrl: string;
    /** Live containers workspace on SupplierAdvisor® (login required) */
    containersUrl: string;
    containersMapUrl: string;
    containersSettingsUrl: string;
    description: string;
  };
  impact: FoodsImpact;
  containers: ContainerSite[];
  asOf: string;
  note?: string;
};

/** Published snapshot — replace via SA API when credentials are configured */
export const PUBLISHED_FOODS_NETWORK: FoodsNetworkPayload = {
  source: "published",
  company: {
    name: "Big Five Foods",
    legalName: "Big Five Foods (Pty) Ltd",
    slug: "big-five-foods",
    verified: true,
    verifiedOn: "2026-06-16",
    platformUrl: "https://www.supplieradvisor.com/",
    containersUrl: "https://www.supplieradvisor.com/dashboard/containers",
    containersMapUrl: "https://www.supplieradvisor.com/dashboard/containers/map",
    containersSettingsUrl: "https://www.supplieradvisor.com/dashboard/containers/settings",
    description:
      "Verified on SupplierAdvisor® — fortified nutrition manufacturing and containerised distribution that Direct uses for last-mile route-to-market. Live container sites and settings are managed in the Foods workspace on SupplierAdvisor®.",
  },
  impact: {
    mealsDeliveredLabel: "Meals delivered (programme + trade)",
    mealsDelivered: 12_400_000,
    childrenReachedLabel: "Children reached",
    childrenReached: 89_000,
    productRanges: 4,
    shelfLifeMonths: 24,
    certifications: [
      "ISO 9001",
      "FSSC 22000",
      "Sedex",
      "SANHA Halaal",
      "Kosher",
      "SupplierAdvisor® verified",
    ],
  },
  containers: [
    {
      id: "cnt-kzn-pinetown",
      name: "Pinetown manufacturing & DC",
      location: "Pinetown, KwaZulu-Natal",
      region: "KwaZulu-Natal",
      status: "active",
      role: "Fortified production · primary distribution",
      lat: -29.825,
      lng: 30.87,
      mealsServed: 4_200_000,
      lastUpdated: "2026-07-01",
    },
    {
      id: "cnt-kzn-nongoma",
      name: "Nongoma community hub",
      location: "Nongoma, Zululand, KZN",
      region: "KwaZulu-Natal",
      status: "active",
      role: "Last-mile container · school & household nutrition",
      lat: -27.909,
      lng: 31.645,
      mealsServed: 1_100_000,
      lastUpdated: "2026-07-01",
    },
    {
      id: "cnt-kzn-durban",
      name: "Durban urban node",
      location: "Durban, KwaZulu-Natal",
      region: "KwaZulu-Natal",
      status: "active",
      role: "Urban institutional supply · cold-chain handoff",
      lat: -29.858,
      lng: 31.021,
      mealsServed: 2_800_000,
      lastUpdated: "2026-07-01",
    },
    {
      id: "cnt-gp-jhb",
      name: "Gauteng market corridor",
      location: "Johannesburg metro",
      region: "Gauteng",
      status: "deploying",
      role: "Route-to-market expansion · B2B buyers",
      lat: -26.204,
      lng: 28.047,
      mealsServed: 900_000,
      lastUpdated: "2026-06-15",
    },
    {
      id: "cnt-ec-pe",
      name: "Eastern Cape corridor",
      location: "Gqeberha / PE corridor",
      region: "Eastern Cape",
      status: "planned",
      role: "Coastal distribution · institutional pipeline",
      lat: -33.96,
      lng: 25.602,
      lastUpdated: "2026-05-01",
    },
  ],
  asOf: "2026-07-01",
  note: "Published network snapshot for the website. Connect live SupplierAdvisor® data with SUPPLIERADVISOR_API_BASE + SUPPLIERADVISOR_API_KEY.",
};

export async function getFoodsNetwork(): Promise<FoodsNetworkPayload> {
  const base = process.env.SUPPLIERADVISOR_API_BASE?.replace(/\/$/, "");
  const key = process.env.SUPPLIERADVISOR_API_KEY;
  const companyId = process.env.SUPPLIERADVISOR_FOODS_COMPANY_ID ?? "big-five-foods";

  if (!base || !key) {
    return PUBLISHED_FOODS_NETWORK;
  }

  try {
    // Expected SA contract (adjust when official docs are shared):
    // GET {base}/v1/companies/{id}/public-network
    // Authorization: Bearer {key}
    const res = await fetch(`${base}/v1/companies/${companyId}/public-network`, {
      headers: {
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.warn("[saFoodsNetwork] live API failed", res.status);
      return { ...PUBLISHED_FOODS_NETWORK, note: `Live API unavailable (${res.status}); showing published snapshot.` };
    }

    const data = (await res.json()) as Partial<FoodsNetworkPayload>;
    return {
      ...PUBLISHED_FOODS_NETWORK,
      ...data,
      source: "live",
      company: { ...PUBLISHED_FOODS_NETWORK.company, ...data.company },
      impact: { ...PUBLISHED_FOODS_NETWORK.impact, ...data.impact },
      containers: data.containers?.length ? data.containers : PUBLISHED_FOODS_NETWORK.containers,
      asOf: data.asOf ?? new Date().toISOString().slice(0, 10),
      note: undefined,
    };
  } catch (e) {
    console.warn("[saFoodsNetwork] live fetch error", e);
    return {
      ...PUBLISHED_FOODS_NETWORK,
      note: "Live API error; showing published snapshot.",
    };
  }
}
