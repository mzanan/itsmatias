"use client";

import { Pill } from "@/components/ui/Pill";
import { ReplayPill } from "./ReplayPill";
import { SocialsVideoWall } from "./SocialsVideoWall";
import { useVideoWallDemo } from "./useVideoWallDemo";

export const VideoWallDemo = () => {
  const { ref, started, run, replay, layout, setLayout, layouts, stills } = useVideoWallDemo();

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-background">
      {started && <SocialsVideoWall stills={stills} isActive layout={layout} replayKey={run} />}
      <div className="absolute bottom-2 left-2 z-20 flex gap-1.5">
        {layouts.map((option) => (
          <Pill
            key={option.id}
            size="sm"
            variant={option.id === layout ? "solid" : "ghost"}
            aria-pressed={option.id === layout}
            onClick={() => setLayout(option.id)}
          >
            {option.label}
          </Pill>
        ))}
      </div>
      <ReplayPill onClick={replay} />
    </div>
  );
};
