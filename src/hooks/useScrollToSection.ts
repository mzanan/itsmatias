import { useCallback } from "react";

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    if (sectionId === "hero") {
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const mainScrollTop = mainElement.scrollTop;
      const offsetPosition = elementPosition + mainScrollTop - headerHeight;

      mainElement.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
};

