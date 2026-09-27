import { useEffect } from "react";
import { offsetWithin, snapTarget } from "@/lib/scroll";

const SETTLE_MS = 140;

export const useHeroSnap = (nextId: string, threshold: number) => {
  useEffect(() => {
    const main = document.querySelector("main");
    const next = document.getElementById(nextId);
    if (!main || !next) return;

    let timer: number | undefined;
    let touching = false;

    const settle = () => {
      if (touching) return;
      const target = snapTarget(
        main.scrollTop,
        0,
        offsetWithin(next, main),
        threshold
      );
      if (target !== null) main.scrollTo({ top: target, behavior: "smooth" });
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_MS);
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      onScroll();
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    main.addEventListener("touchstart", onTouchStart, { passive: true });
    main.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.clearTimeout(timer);
      main.removeEventListener("scroll", onScroll);
      main.removeEventListener("touchstart", onTouchStart);
      main.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextId, threshold]);
};
