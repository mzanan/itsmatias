import { useState, type CSSProperties } from "react";
import { HERO_KCAL_PCT, ringGeometry } from "@/lib/craft/heroChoreography";

const RING_SIZE = 84;
const RING_STROKE = 8;

export const useHeroChoreographyDemo = () => {
  const [runId, setRunId] = useState(0);
  const geometry = ringGeometry(RING_SIZE, RING_STROKE, HERO_KCAL_PCT);

  return {
    runId,
    replay: () => setRunId((id) => id + 1),
    ring: {
      size: RING_SIZE,
      stroke: RING_STROKE,
      ...geometry,
      style: { "--ring-c": geometry.c } as CSSProperties,
    },
  };
};
