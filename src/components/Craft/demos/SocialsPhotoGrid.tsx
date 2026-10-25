"use client";

import { SKELETON_KEYFRAMES } from "@/lib/craft/gridReveal";
import { SocialsPhotoGridView } from "./SocialsPhotoGridView";
import { useSocialsPhotoGrid } from "./useSocialsPhotoGrid";

type Props = {
  images: string[];
  isActive: boolean;
  onReady?: () => void;
  rotate?: boolean;
  simulateLatency?: boolean;
  replayKey?: number;
};

export const SocialsPhotoGrid = ({
  images,
  isActive,
  onReady,
  rotate = false,
  simulateLatency = false,
  replayKey = 0,
}: Props) => {
  const { ref, grid, slots, animationKey, handleReady } = useSocialsPhotoGrid({
    images,
    isActive,
    rotate,
    onReady,
  });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-background">
      <style href="craft-socials-skeleton" precedence="default">
        {SKELETON_KEYFRAMES}
      </style>
      {grid && slots.length > 0 && (
        <SocialsPhotoGridView
          key={`${animationKey}-${replayKey}`}
          grid={grid}
          slots={slots}
          isActive={isActive}
          simulateLatency={simulateLatency}
          onReady={handleReady}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
};
