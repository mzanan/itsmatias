"use client";

import { HeroStack } from "@/components/Hero/HeroStack";
import { HERO_CANVAS } from "@/lib/craft/heroStack";
import { cn } from "@/lib/utils";
import { useHeroStackDemo } from "./useHeroStackDemo";

export const HeroStackDemo = () => {
  const { ref, scale } = useHeroStackDemo();

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div
        className={cn("absolute left-0 top-0 origin-top-left", scale === 0 && "invisible")}
        style={{
          width: HERO_CANVAS.width,
          height: HERO_CANVAS.height,
          transform: `scale(${scale})`,
        }}
      >
        <HeroStack className="absolute inset-x-[140px] inset-y-[80px]" />
      </div>
    </div>
  );
};
