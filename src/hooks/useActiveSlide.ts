import { useEffect, useState } from "react";

export const useActiveSlide = (selector: string) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;

    const slides = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setCount(slides.length);
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(slides.indexOf(hit.target as HTMLElement));
      },
      { root, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [selector]);

  return { count, active };
};
