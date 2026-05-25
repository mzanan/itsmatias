import { useMemo } from "react";

type BaseProject = {
  id: string;
  title: string;
  url: string;
  videoDesktop: string;
  videoMobile: string;
};

type ForSaleProject = BaseProject & {
  model: "sale";
  buyUrl: string;
  deployUrl: string;
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
      model: "sale",
      buyUrl: "https://buy.polar.sh/polar_cl_CLikmCFG83HCAfDWdK9ILx6zps8Wg3MaWGCQB3fru2o",
      deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/mzanan/template-ecommerce",
    },
    {
      id: "2",
      title: "Landing Page",
      url: "https://landing.itsmatias.com",
      videoDesktop: "/videos/landing.mp4",
      videoMobile: "/videos/landing-mobile.mp4",
      model: "sale",
      buyUrl: "https://buy.polar.sh/polar_cl_EoJiL7xT64MDONqC8clZ4OjLVGFcdUfoRHrvo3XY3Oh",
      deployUrl: "https://vercel.com/new/clone?repository-url=https://github.com/mzanan/template-landing",
    },
    {
      id: "3",
      title: "Social Links",
      url: "https://links.itsmatias.com",
      videoDesktop: "/videos/links.mp4",
      videoMobile: "/videos/links-mobile.mp4",
      model: "subscription",
      subscribeUrl: "https://links.itsmatias.com/#pricing",
    },
  ], []);

  return { projects };
};