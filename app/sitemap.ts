import type { MetadataRoute } from "next";
import { events } from "@/lib/content/events";
import { updates } from "@/lib/content/updates";

const siteUrl = "http://metropolis-retro.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/events",
    "/updates",
    "/contact",
    "/membership",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const updateRoutes = updates.map((update) => ({
    url: `${siteUrl}/updates/${update.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...eventRoutes, ...updateRoutes];
}
