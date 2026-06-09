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
  slug: "ecommerce" | "landing";
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
        descriptionExtra: "Built with Next.js, Vercel Postgres, Clerk, and Stripe.",
        model: "sale",
        slug: "ecommerce",
      },
      {
        id: "2",
        title: "Landing Page",
        url: URLS.landing,
        videoDesktop: "/videos/landing.mp4",
        videoMobile: "/videos/landing-mobile.mp4",
        description:
          "A custom landing page with pixel-perfect design, animations, and email capture. One-click deploy to your Vercel. $49.99 one-time.",
        descriptionExtra: "Built with Next.js and Resend.",
        model: "sale",
        slug: "landing",
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
