import { useState, useEffect } from "react";

const SECTION_IDS = ["home", "projects", "about", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export const useHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInHero, setIsInHero] = useState(true);
    const [activeSection, setActiveSection] = useState<SectionId>("home");

    useEffect(() => {
        const mainElement = document.querySelector("main");
        if (!mainElement) return;

        const handleScroll = () => {
            const scrollTop = mainElement.scrollTop;
            setIsScrolled(scrollTop > 50);

            const heroSection = mainElement.firstElementChild;
            if (heroSection) {
                const heroHeight = heroSection.clientHeight;
                setIsInHero(scrollTop < heroHeight * 0.5);
            }
        };

        handleScroll();
        mainElement.addEventListener("scroll", handleScroll);
        return () => mainElement.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const mainElement = document.querySelector("main");
        if (!mainElement) return;

        const sections = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;

                const id = visible.target.id as SectionId;
                setActiveSection(id);

                // Keep URL hash in sync with scroll, without polluting history.
                // Home renders as `/` (no hash) so the landing URL stays clean.
                const targetHash = id === "home" ? "" : `#${id}`;
                if (window.location.hash !== targetHash) {
                    const newUrl = `${window.location.pathname}${window.location.search}${targetHash}`;
                    window.history.replaceState(null, "", newUrl);
                }
            },
            {
                root: mainElement,
                threshold: [0.4, 0.6],
            }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return { isScrolled, isInHero, activeSection };
};
