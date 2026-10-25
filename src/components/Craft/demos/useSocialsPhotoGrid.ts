import { useCallback, useEffect, useMemo, useState } from "react";
import { gridShape } from "@/lib/craft/gridReveal";
import { ROTATE_MS, initSlots, poolSignature, rotateSlots } from "@/lib/craft/photoWall";
import { useSocialsStageSize } from "./useSocialsStageSize";

const useRotatingSlots = (pool: string[], count: number, active: boolean) => {
  const [slots, setSlots] = useState<string[]>(() => initSlots(pool, count));
  const [signature, setSignature] = useState(() => poolSignature(pool, count));

  const nextSignature = poolSignature(pool, count);
  if (nextSignature !== signature) {
    setSignature(nextSignature);
    setSlots(initSlots(pool, count));
  }

  useEffect(() => {
    if (!active || pool.length <= count) return;
    const id = window.setInterval(() => setSlots((prev) => rotateSlots(prev, pool)), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [active, pool, count]);

  return slots;
};

type Options = {
  images: string[];
  isActive: boolean;
  rotate: boolean;
  onReady?: () => void;
};

export const useSocialsPhotoGrid = ({ images, isActive, rotate, onReady }: Options) => {
  const { ref, width, height } = useSocialsStageSize<HTMLDivElement>();
  const grid = useMemo(() => gridShape(images.length, width, height), [images.length, width, height]);

  const [animationKey, setAnimationKey] = useState(0);
  const [wasActive, setWasActive] = useState(isActive);
  if (isActive !== wasActive) {
    setWasActive(isActive);
    if (isActive) setAnimationKey((prev) => prev + 1);
  }

  const [filled, setFilled] = useState(false);
  const slots = useRotatingSlots(images, grid?.count ?? 0, filled && isActive && rotate);

  const handleReady = useCallback(() => {
    setFilled(true);
    onReady?.();
  }, [onReady]);

  return { ref, grid, slots, animationKey, handleReady };
};
