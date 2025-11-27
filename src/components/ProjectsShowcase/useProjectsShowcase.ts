import { useMemo } from "react";

export type Project = {
    id: string;
    title: string;
    benefit: string;
    url: string;
    video: string;
    tags: string[];
};

export const useProjectsShowcase = () => {
    const projects: Project[] = useMemo(
        () => [
            {
                id: "1",
                title: "E-commerce with Custom Admin Panel",
                benefit:
                    "Boost sales with a fast, elegant and conversion-focused fashion store.",
                url: "https://ecommerce.itsmatias.com",
                video: "/videos/demo-infideli.mp4",
                tags: ["Next.js", "E-commerce", "Animations", "Responsive"],
            },
            {
                id: "2",
                title: "E-commerce Landing Page",
                benefit:
                    "A conversion-focused landing page designed to promote and drive traffic to the e-commerce store.",
                url: "https://landing.itsmatias.com",
                video: "/videos/demo-landing.mp4",
                tags: ["Next.js", "Landing Page", "Marketing", "UI/UX"],
            },
            {
                id: "3",
                title: "My Social Links",
                benefit:
                    "A modern, dynamic, and fast custom link-in-bio page to centralize all your social media links.",
                url: "https://links.itsmatias.com",
                video: "/videos/demo-links.mp4",
                tags: ["Next.js", "Social Links", "Custom Design", "Link-in-Bio"],
            },
        ],
        []
    );

    return { projects };
};

