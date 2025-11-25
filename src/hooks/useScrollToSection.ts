import { useCallback } from "react";

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    const mainElement = document.querySelector("main");

    if (element && mainElement) {
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

