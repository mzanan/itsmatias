import { useEffect, useMemo, useState } from "react";
import {
  WALL_READY_MS,
  justifiedTiles,
  masonryColumns,
  type WallStill,
} from "@/lib/craft/videoWall";
import { useSocialsStageSize } from "./useSocialsStageSize";

type Options = {
  stills: WallStill[];
  isActive: boolean;
  onReady?: () => void;
};

export const useSocialsVideoWall = ({ stills, isActive, onReady }: Options) => {
  const { ref, width, height } = useSocialsStageSize<HTMLDivElement>();
  const justified = useMemo(() => justifiedTiles(stills, width, height), [stills, width, height]);
  const masonry = useMemo(() => masonryColumns(stills, width), [stills, width]);

  const [animationKey, setAnimationKey] = useState(0);
  const [wasActive, setWasActive] = useState(isActive);
  if (isActive !== wasActive) {
    setWasActive(isActive);
    if (isActive) setAnimationKey((prev) => prev + 1);
  }

  useEffect(() => {
    if (!isActive) return;
    const id = window.setTimeout(() => onReady?.(), WALL_READY_MS);
    return () => window.clearTimeout(id);
  }, [isActive, onReady]);

  return { ref, justified, masonry, animationKey };
};
