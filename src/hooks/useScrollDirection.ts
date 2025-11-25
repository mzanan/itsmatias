import { useState, useEffect, useRef } from "react";

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const lastY = useRef(0);

  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const updateScrollDirection = () => {
      const scrollTop = mainElement.scrollTop;
      if (scrollTop > lastY.current) {
        setScrollDirection("down");
      } else if (scrollTop < lastY.current) {
        setScrollDirection("up");
      }
      lastY.current = scrollTop;
    };

    mainElement.addEventListener("scroll", updateScrollDirection);
    return () => {
      mainElement.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  return { scrollDirection };
};

