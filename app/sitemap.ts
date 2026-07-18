import type { MetadataRoute } from "next";

const BASE_URL = "https://bigfivegroup.africa";

const routes = [
  "",
  "/about",
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
  "/royal",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.8,
  }));
}
