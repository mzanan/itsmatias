"use client";

import { AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";
import { useJourney } from "./useJourney";
import { JourneyNav } from "./JourneyNav";
import { JourneyPath } from "./JourneyPath";
import { JourneyCard } from "./JourneyCard";
import { JourneyExpanded } from "./JourneyExpanded";

export const Journey = () => {
  const {
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
    pathReach,
    scrollToIndex,
    expanded,
    open,
    close,
    reducedMotion,
  } = useJourney();

  return (
    <LayoutGroup>
      <main
        ref={containerRef}
        className={cn(
          "h-dvh w-full overflow-x-hidden bg-journey-bg font-body text-journey-fg",
          expanded ? "overflow-y-hidden" : "overflow-y-auto",
        )}
      >
        <div ref={trackRef} style={{ height: `${count * 100}dvh` }}>
          <div className="sticky top-0 flex h-dvh flex-col">
            <JourneyNav tabs={tabs} track={track} onSelect={selectTrack} />
            <section className="flex min-h-0 flex-1 items-center gap-6 px-5 pb-6 pt-6 sm:gap-10 sm:px-10 lg:gap-24 lg:px-16 lg:pb-14 lg:pt-12">
              <JourneyPath
                stops={stops}
                activeIndex={activeIndex}
                pathReach={pathReach}
                onSelect={scrollToIndex}
                reducedMotion={reducedMotion}
              />
              <div className="hidden w-72 shrink-0 flex-col gap-3.5 lg:flex">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-journey-muted">{intro.label}</span>
                <p className="font-display text-3xl leading-tight text-journey-fg">{intro.headline}</p>
                <p className="text-base leading-relaxed text-journey-muted">{intro.hint}</p>
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <JourneyCard stop={active} onOpen={open} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <AnimatePresence>
        {expanded && <JourneyExpanded stop={active} index={activeIndex} onClose={close} />}
      </AnimatePresence>
    </LayoutGroup>
  );
};
