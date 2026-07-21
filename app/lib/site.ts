/** Canonical site URL and social share image (home hero + Group logo). */
export const SITE_URL = "https://bigfivegroup.africa";

/**
 * Default Open Graph / social preview image.
 * Composite of public/home-hero.jpg with public/bigfivegroup-logo.png (1200×630).
 * Absolute URL via metadataBase in root layout.
 */
export const SITE_OG_IMAGE = {
  url: "/og-share.jpg",
  width: 1200,
  height: 630,
  alt: "Big Five Group Africa — logo over home hero",
  type: "image/jpeg",
} as const;

export const SITE_NAME = "Big Five Group Africa";
