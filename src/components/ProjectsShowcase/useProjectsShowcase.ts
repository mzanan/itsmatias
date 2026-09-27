import { useMemo } from "react";
import { URLS } from "@/lib/urls";

type VideoMedia = {
  kind: "video";
  desktop: string;
  mobile: string;
};

type ComparisonSide = {
  src: string;
  posterDesktop: string;
  posterMobile: string;
};

type BeforeAfterMedia = {
  kind: "beforeAfter";
  before: ComparisonSide;
  after: ComparisonSide;
};

type Media = VideoMedia | BeforeAfterMedia;

type BaseProject = {
  id: string;
  title: string;
  url: string;
  media: Media;
  description: string;
  descriptionExtra?: string;
};

type ForSaleProject = BaseProject & {
  model: "sale";
  buyUrl: string;
};

type SubscriptionProject = BaseProject & {
  model: "subscription";
  subscribeUrl: string;
};

type ShowcaseProject = BaseProject & {
  model: "showcase";
};

export type Project = ForSaleProject | SubscriptionProject | ShowcaseProject;

export const useProjectsShowcase = () => {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "1",
        title: "E-commerce & Admin Panel",
        url: URLS.ecommerce,
        media: { kind: "video", desktop: "/videos/ecommerce.mp4", mobile: "/videos/ecommerce-mobile.mp4" },
        description:
          "A full ecommerce with admin panel, real-time stock, orders, and email notifications. One-click deploy to your Vercel. $990 one-time.",
        descriptionExtra:
          "Built with Next.js. Database, storage and admin login auto-provisioned, no external auth service. Connect Stripe and Resend when ready.",
        model: "sale",
        buyUrl: "/api/buy/ecommerce",
      },
      {
        id: "2",
        title: "Landing Page",
        url: URLS.landing,
        media: { kind: "video", desktop: "/videos/landing.mp4", mobile: "/videos/landing-mobile.mp4" },
        description:
          "A custom landing page with pixel-perfect design, animations, and email capture. One-click deploy to your Vercel. $49.99 one-time.",
        descriptionExtra:
          "Built with Next.js. Connect your Resend account for email capture.",
        model: "sale",
        buyUrl: "/api/buy/landing",
      },
      {
        id: "3",
        title: "Social Links",
        url: URLS.links,
        media: { kind: "video", desktop: "/videos/links.mp4", mobile: "/videos/links-mobile.mp4" },
        description:
          "A hosted social links page with custom URL, themes, and click analytics. Set up in minutes. Monthly subscription.",
        model: "subscription",
        subscribeUrl: `${URLS.links}/`,
      },
    ],
    [],
  );

  return { projects };
};
