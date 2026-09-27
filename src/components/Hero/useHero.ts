import { useEffect, useState } from "react";
import { formatClock } from "@/lib/time";

const TICK_MS = 30_000;

export const useHero = (timeZone: string) => {
  const [clock, setClock] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setClock(formatClock(new Date(), timeZone));
    update();
    const id = window.setInterval(update, TICK_MS);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return { clock };
};
