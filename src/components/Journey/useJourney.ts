import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  indexFromProgress,
  progressFromIndex,
  resolveJourneyStops,
  stopProgressFromProgress,
  type JourneyStop,
  type RawJourneyStop,
} from "@/lib/journey";
import data from "./journey.json";

export type JourneyTrack = "life" | "work";
export type { JourneyStop } from "@/lib/journey";

const TRACKS: Record<JourneyTrack, JourneyStop[]> = {
  life: resolveJourneyStops(data.life as RawJourneyStop[]),
  work: resolveJourneyStops(data.work as RawJourneyStop[]),
};

export const useJourney = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [track, setTrack] = useState<JourneyTrack>("life");
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();

  const stops = TRACKS[track];
  const intro = data.intro[track];
  const count = stops.length;
  const active = stops[activeIndex] ?? stops[0];

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = indexFromProgress(p, count);
    setActiveIndex((current) => (current === next ? current : next));
  });

  const stopProgress = useTransform(scrollYProgress, (p) => stopProgressFromProgress(p, count));

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      const trackEl = trackRef.current;
      if (!container || !trackEl) return;
      const top = trackEl.offsetTop + progressFromIndex(index, count) * (trackEl.offsetHeight - container.clientHeight) + 1;
      container.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [count, reducedMotion],
  );

  const selectTrack = useCallback(
    (next: JourneyTrack) => {
      if (next === track) return;
      setExpanded(false);
      setTrack(next);
      setActiveIndex(0);
      containerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    },
    [track],
  );

  const open = useCallback(() => setExpanded(true), []);
  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const tabs = useMemo(
    () => [
      { id: "life" as const, label: "About me" },
      { id: "work" as const, label: "Projects" },
    ],
    [],
  );

  return {
    scrollProgress: scrollYProgress,
    containerRef,
    trackRef,
    tabs,
    track,
    selectTrack,
    stops,
    count,
    active,
    activeIndex,
    intro,
    stopProgress,
    scrollToIndex,
    expanded,
    open,
    close,
    reducedMotion: Boolean(reducedMotion),
  };
};
