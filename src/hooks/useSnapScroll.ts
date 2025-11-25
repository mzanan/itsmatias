import { useEffect, useRef } from "react";

export const useSnapScroll = () => {
  const isScrollingRef = useRef(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const getSections = (): HTMLElement[] => {
      return Array.from(mainElement.children) as HTMLElement[];
    };

    const findCurrentSection = (): HTMLElement | null => {
      const sections = getSections();
      const scrollTop = mainElement.scrollTop;
      const viewportHeight = mainElement.clientHeight;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollTop + viewportHeight / 2 >= sectionTop && scrollTop + viewportHeight / 2 < sectionBottom) {
          return section;
        }
      }

      return sections[0] || null;
    };

    const snapToSection = (direction: "up" | "down") => {
      if (isScrollingRef.current) return;

      const sections = getSections();
      const currentSection = findCurrentSection();
      if (!currentSection) return;

      const currentIndex = sections.indexOf(currentSection);
      let targetIndex: number;

      if (direction === "down") {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else {
        targetIndex = Math.max(currentIndex - 1, 0);
      }

      if (targetIndex === currentIndex) return;

      const targetSection = sections[targetIndex];
      if (!targetSection) return;

      isScrollingRef.current = true;

      const headerHeight = 64;
      const targetPosition = targetSection.offsetTop - headerHeight;

      mainElement.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      if (timeSinceLastWheel < 50) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 5) return;

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      wheelTimeoutRef.current = setTimeout(() => {
        const direction = delta > 0 ? "down" : "up";
        snapToSection(direction);
      }, 100);
    };

    mainElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      mainElement.removeEventListener("wheel", handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);
};

