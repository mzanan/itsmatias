import { useMemo } from "react";
import { URLS } from "@/lib/urls";

type BaseProject = {
  id: string;
  title: string;
  url: string;
  videoDesktop: string;
  videoMobile: string;
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

export type Project = ForSaleProject | SubscriptionProject;

export const useProjectsShowcase = () => {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "1",
        title: "E-commerce & Admin Panel",
        url: URLS.ecommerce,
        videoDesktop: "/videos/ecommerce.mp4",
        videoMobile: "/videos/ecommerce-mobile.mp4",
        description:
          "A full ecommerce with admin panel, real-time stock, orders, and email notifications. One-click deploy to your Vercel. $990 one-time.",
        descriptionExtra:
          "Built with Next.js. Database, storage and Vercel Blob auto-provisioned. Connect your Clerk, Stripe and Resend accounts when ready.",
        model: "sale",
        buyUrl: "/api/buy/ecommerce",
      },
      {
        id: "2",
        title: "Landing Page",
        url: URLS.landing,
        videoDesktop: "/videos/landing.mp4",
        videoMobile: "/videos/landing-mobile.mp4",
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
        videoDesktop: "/videos/links.mp4",
        videoMobile: "/videos/links-mobile.mp4",
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
