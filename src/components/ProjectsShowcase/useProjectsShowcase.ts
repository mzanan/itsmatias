import { useMemo } from "react";

export type Project = {
  id: string;
  title: string;
  url: string;
  videoDesktop: string;
  videoMobile: string;
};

export const useProjectsShowcase = () => {
  const projects: Project[] = useMemo(() => [
    {
      id: "1",
      title: "E-commerce & Admin Panel",
      url: "https://ecommerce.itsmatias.com",
      videoDesktop: "/videos/ecommerce.mp4",
      videoMobile: "/videos/ecommerce-mobile.mp4",
    },
    {
      id: "2",
      title: "Landing Page",
      url: "https://landing.itsmatias.com",
      videoDesktop: "/videos/landing.mp4",
      videoMobile: "/videos/landing-mobile.mp4",
    },
    {
      id: "3",
      title: "Social Links",
      url: "https://links.itsmatias.com",
      videoDesktop: "/videos/links.mp4",
      videoMobile: "/videos/links-mobile.mp4",
    },
  ], []);

  return { projects };
};