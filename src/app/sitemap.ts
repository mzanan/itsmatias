import type { MetadataRoute } from "next";
import { URLS } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URLS.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${URLS.site}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
