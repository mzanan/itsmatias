import { useMemo } from "react";

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
  const projects: Project[] = useMemo(() => [
    {
      id: "1",
      title: "E-commerce & Admin Panel",
      url: "https://ecommerce.itsmatias.com",
      videoDesktop: "/videos/ecommerce.mp4",
      videoMobile: "/videos/ecommerce-mobile.mp4",
      description: "A full ecommerce with admin panel, real-time stock, orders, and email notifications. One-click deploy to your Vercel. $990 one-time.",
      descriptionExtra: "Built with Next.js, Vercel Postgres, Clerk, and Stripe.",
      model: "sale",
      buyUrl: "https://buy.polar.sh/polar_cl_CLikmCFG83HCAfDWdK9ILx6zps8Wg3MaWGCQB3fru2o",
    },
    {
      id: "2",
      title: "Landing Page",
      url: "https://landing.itsmatias.com",
      videoDesktop: "/videos/landing.mp4",
      videoMobile: "/videos/landing-mobile.mp4",
      description: "A custom landing page with pixel-perfect design, animations, and email capture. One-click deploy to your Vercel. $49.99 one-time.",
      descriptionExtra: "Built with Next.js and Resend.",
      model: "sale",
      buyUrl: "https://buy.polar.sh/polar_cl_EoJiL7xT64MDONqC8clZ4OjLVGFcdUfoRHrvo3XY3Oh",
    },
    {
      id: "3",
      title: "Social Links",
      url: "https://links.itsmatias.com",
      videoDesktop: "/videos/links.mp4",
      videoMobile: "/videos/links-mobile.mp4",
      description: "A hosted social links page with custom URL, themes, and click analytics. Set up in minutes. Monthly subscription.",
      model: "subscription",
      subscribeUrl: "https://links.itsmatias.com/#pricing",
    },
  ], []);

  return { projects };
};