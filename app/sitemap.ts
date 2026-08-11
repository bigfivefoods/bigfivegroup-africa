import type { MetadataRoute } from "next";
import { listStories } from "./lib/stories/store";

const BASE_URL = "https://bigfivegroup.africa";

const routes = [
  "",
  "/about",
  "/food-security",
  "/group",
  "/global",
  "/africa",
  "/agri",
  "/foods",
  "/direct",
  "/access",
  "/connect",
  "/connect/sam",
  "/impact",
  "/leadership",
  "/foundation",
  "/contact",
  "/updates",
  "/newsletter",
  "/methodology",
  "/partner-kit",
  "/brand",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : path === "/updates" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
  }));

  let storyEntries: MetadataRoute.Sitemap = [];
  try {
    const stories = await listStories({ status: "published" });
    storyEntries = stories.map((s) => ({
      url: `${BASE_URL}/updates/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    /* store unavailable at build time — static routes still fine */
  }

  return [...staticEntries, ...storyEntries];
}
