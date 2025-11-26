import { useState, useEffect } from "react";

export const useHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInHero, setIsInHero] = useState(true);

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

    return { isScrolled, isInHero };
};

