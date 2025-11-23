import { useMemo } from "react";

export type Project = {
  id: string;
  title: string;
  benefit: string;
  url: string;
  video: string;
  tags: string[];
};

export const useProjects = () => {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "1",
        title: "Demo Project E-commerce",
        benefit:
          "Boost sales with a fast, elegant and conversion-focused fashion store.",
        url: "https://ecommerce-six-peach-14.vercel.app/",
        video:
          "/videos/demo-infideli.mp4",
        tags: ["Next.js", "E-commerce", "Animations", "Responsive"],
      },
      {
        id: "2",
        title: "E-commerce Landing",
        benefit:
          "Get more customers with a professional landing built to convert visitors into clients.",
        url: "https://ecommerce-landing-kappa.vercel.app/",
        video:
          "/videos/demo-landing.mp4",
        tags: ["Next.js", "Landing Page", "Marketing", "UI/UX"],
      },
      {
        id: "3",
        title: "Personal Portfolio",
        benefit:
          "Stand out as a developer with a dynamic portfolio, analytics, and live integrations.",
        url: "https://mzanan.vercel.app/",
        video:
          "https://assets.mixkit.co/videos/preview/mixkit-mobile-app-scroll-on-smartphone-3558-large.mp4",
        tags: ["Next.js", "Portfolio", "Social Integration", "Analytics"],
      },
    ],
    []
  );

  return { projects };
};

