import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { stackPhase } from "@/lib/heroStack";

const TOUCH_QUERY = "(hover: none)";
const STEP_MS = 1800;

export const useHeroStack = (count: number) => {
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useState(0);
  const isTouch = useMediaQuery(TOUCH_QUERY);
  const reducedMotion = useReducedMotion();
  const autoplay = isTouch && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [autoplay]);

  const phase = autoplay ? stackPhase(step, count) : null;

  return {
    open: phase ? phase.open : hovered,
    focus: phase ? phase.focus : null,
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
  };
};
