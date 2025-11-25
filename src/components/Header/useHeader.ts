import { useState, useEffect } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export const useHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollToSection } = useScrollToSection();

    useEffect(() => {
        const mainElement = document.querySelector("main");
        if (!mainElement) return;

        const handleScroll = () => {
            setIsScrolled(mainElement.scrollTop > 50);
        };

        mainElement.addEventListener("scroll", handleScroll);
        return () => mainElement.removeEventListener("scroll", handleScroll);
    }, []);

    return { scrollToSection, isScrolled };
};

