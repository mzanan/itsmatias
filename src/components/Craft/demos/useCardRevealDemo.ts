import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { CARD_FALLBACK_MS } from "@/lib/craft/cardReveal";
import { activeTabIndex, addVisited, visitedScenes } from "@/lib/craft/tabReplay";
import profile from "./socialsProfile.json";

const tabs = profile.tabs;

export const useCardRevealDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, amount: 0.4 });
  const visible = useInView(ref, { amount: 0.2 });
  const [run, setRun] = useState(0);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const [everActivated, setEverActivated] = useState<Set<string>>(() => new Set([tabs[0].id]));
  if (!everActivated.has(activeTabId)) {
    setEverActivated((prev) => addVisited(prev, activeTabId));
  }

  const [showCard, setShowCard] = useState(false);
  const [cardScene, setCardScene] = useState(`${activeTabId}-${run}`);
  if (cardScene !== `${activeTabId}-${run}`) {
    setCardScene(`${activeTabId}-${run}`);
    setShowCard(false);
  }

  const revealCard = useCallback(() => setShowCard(true), []);

  useEffect(() => {
    if (!started) return;
    const id = window.setTimeout(() => setShowCard(true), CARD_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [started, activeTabId, run]);

  const activeIndex = activeTabIndex(tabs, activeTabId);

  return {
    ref,
    started,
    visible,
    run,
    replay: () => setRun((prev) => prev + 1),
    profile,
    tabs,
    activeTabId,
    activeIndex,
    setActiveTabId,
    links: tabs[activeIndex].links,
    scenes: visitedScenes(tabs, everActivated, activeTabId),
    showCard,
    revealCard,
  };
};
