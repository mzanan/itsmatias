import type { MetadataRoute } from "next";
import { URLS } from "@/lib/urls";
import { AI_CRAWLERS, PRIVATE_PATHS } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${URLS.site}/sitemap.xml`,
    host: URLS.site,
  };
}
