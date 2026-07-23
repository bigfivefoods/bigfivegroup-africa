/** Canonical site URL and social share image (home hero + Group logo). */
export const SITE_URL = "https://bigfivegroup.africa";

/**
 * Default Open Graph / Twitter / social preview image — always the Group mark
 * over the home hero (public/og-share.jpg, 1200×630).
 * Use this for every page; never page-specific heroes for link previews.
 */
export const SITE_OG_IMAGE = {
  url: "/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Big Five Group Africa — logo over home hero",
  type: "image/jpeg",
} as const;

export const SITE_NAME = "Big Five Group Africa";

/** Spread into page metadata so every share uses the Group logo card. */
export function siteSocialImages(): {
  openGraph: { images: [typeof SITE_OG_IMAGE] };
  twitter: { card: "summary_large_image"; images: [string] };
} {
  return {
    openGraph: { images: [SITE_OG_IMAGE] },
    twitter: {
      card: "summary_large_image",
      images: [SITE_OG_IMAGE.url],
    },
  };
}
