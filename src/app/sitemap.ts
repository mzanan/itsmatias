import type { MetadataRoute } from "next";
import type { WorkItem } from "@/components/Work/types";
import workData from "@/components/Work/work.json";
import { caseStudyUrl } from "@/lib/seo";
import { URLS } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URLS.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(workData as WorkItem[]).map((item) => ({
      url: caseStudyUrl(item.id),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${URLS.site}/templates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${URLS.site}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
