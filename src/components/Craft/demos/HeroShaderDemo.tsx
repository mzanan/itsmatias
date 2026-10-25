"use client";

import { HeroShaderStage } from "./HeroShaderStage";
import { useHeroShaderDemo } from "./useHeroShaderDemo";
import { ReplayPill } from "./ReplayPill";

export const HeroShaderDemo = () => {
  const { replayKey, replay } = useHeroShaderDemo();

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <HeroShaderStage key={replayKey} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Design Engineer
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">Matias Zanan</p>
      </div>
      <ReplayPill onClick={replay} />
    </div>
  );
};
