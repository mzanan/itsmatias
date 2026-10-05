import { CONTACT_EMAIL, URLS } from "@/lib/urls";

export const SITE_NAME = "itsmatias";
export const SITE_TITLE = "Matias Zanan: Design Engineer";
export const SITE_DESCRIPTION =
  "Design engineer. I design and build interfaces end to end: design tokens, motion and the production code behind them.";
export const PERSON_NAME = "Matias Zanan";

export const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export const PRIVATE_PATHS = ["/api/"];

export const NO_INDEX = { index: false, follow: false };

const PERSON_ID = `${URLS.site}/#person`;

const TEMPLATES = [
  {
    name: "E-commerce & Admin Panel",
    description:
      "A full Next.js ecommerce with admin panel, real-time stock, orders and email notifications. One-click deploy to your Vercel.",
    price: "990",
    url: URLS.ecommerce,
  },
  {
    name: "Landing Page",
    description:
      "A custom Next.js landing page with animations and email capture. One-click deploy to your Vercel.",
    price: "49.99",
    url: URLS.landing,
  },
];

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON_NAME,
      url: URLS.site,
      image: `${URLS.site}/opengraph-image`,
      email: CONTACT_EMAIL,
      jobTitle: "Design Engineer",
      description: SITE_DESCRIPTION,
      knowsAbout: [
        "Design engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Design systems",
        "Web animation",
        "WebGL shaders",
        "Web performance",
      ],
      sameAs: [
        "https://linkedin.com/in/matiaszanan",
        "https://wa.me/5491157567049",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${URLS.site}/#website`,
      url: URLS.site,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": PERSON_ID },
      inLanguage: "en",
      dateModified: new Date().toISOString(),
    },
  ],
};

export const templatesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Next.js website templates",
  itemListElement: TEMPLATES.map((template, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: template.name,
      description: template.description,
      url: template.url,
      brand: { "@id": PERSON_ID },
      offers: {
        "@type": "Offer",
        price: template.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${URLS.site}/templates`,
      },
    },
  })),
};

type CaseStudyPage = {
  id: string;
  title: string;
  summary: string;
  url: string;
  stack: string[];
};

export const caseStudyUrl = (id: string) => `${URLS.site}/work/${id}`;

export const caseStudyJsonLd = (page: CaseStudyPage) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${caseStudyUrl(page.id)}#case-study`,
  name: `${page.title} case study`,
  headline: page.title,
  description: page.summary,
  url: caseStudyUrl(page.id),
  author: { "@id": PERSON_ID },
  inLanguage: "en",
  keywords: page.stack.join(", "),
  about: {
    "@type": "WebApplication",
    name: page.title,
    url: page.url,
    applicationCategory: "WebApplication",
  },
});
