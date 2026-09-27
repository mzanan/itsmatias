import { useEffect, useMemo } from "react";
import { preload } from "react-dom";
import { runAfterLoadWhenIdle } from "@/lib/idle";

export const useHero = (
  wavesRef: React.RefObject<HTMLDivElement | null>,
  lcpPoster: string,
) => {
  preload(lcpPoster, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const container = wavesRef.current;
    if (!container) return;

    let cancelled = false;
    let unmount: (() => void) | undefined;

    const cancelIdle = runAfterLoadWhenIdle(async () => {
      const { mountHeroWaves } = await import("@/lib/heroWaves");
      if (!cancelled) unmount = mountHeroWaves(container);
    });

    return () => {
      cancelled = true;
      cancelIdle();
      unmount?.();
    };
  }, [wavesRef]);

  const scrollIndicatorVariants = useMemo(
    () => ({
      animate: { y: [0, 10, 0] },
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
    }),
    []
  );

  return { scrollIndicatorVariants };
};
