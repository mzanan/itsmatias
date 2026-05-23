import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://itsmatias.com/sitemap.xml",
    host: "https://itsmatias.com",
  };
}
