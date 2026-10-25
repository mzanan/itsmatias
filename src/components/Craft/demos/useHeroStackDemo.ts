import { useEffect, useRef, useState } from "react";
import { heroCanvasScale } from "@/lib/craft/heroStack";

export const useHeroStackDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(heroCanvasScale(el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, scale };
};
