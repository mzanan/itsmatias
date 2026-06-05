import type { MetadataRoute } from "next";
import { URLS } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${URLS.site}/sitemap.xml`,
    host: URLS.site,
  };
}
