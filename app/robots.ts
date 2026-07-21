import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/investor", "/investor/", "/api/investor/"],
    },
    sitemap: "https://bigfivegroup.africa/sitemap.xml",
  };
}
