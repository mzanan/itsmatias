"use client";

import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useJourney } from "./useJourney";
import { JourneyNav } from "./JourneyNav";
import { JourneyProgress } from "./JourneyProgress";
import { JourneyBackdrop } from "./JourneyBackdrop";
import { JourneyStopInfo } from "./JourneyStopInfo";
import { JourneyGallery } from "./JourneyGallery";
import { JourneyExpanded } from "./JourneyExpanded";

export const Journey = () => {
  const {
    scrollProgress,
    containerRef,
    trackRef,
    tabs,
    track,
    selectTrack,
    stops,
    count,
    active,
    activeIndex,
    stopProgress,
    scrollToIndex,
    expanded,
    open,
    close,
    reducedMotion,
  } = useJourney();

  return (
    <>
      <main
        ref={containerRef}
        className={cn(
          "h-dvh w-full overflow-x-hidden bg-journey-bg font-body text-journey-fg",
          expanded ? "overflow-y-hidden" : "overflow-y-auto",
        )}
      >
        <div ref={trackRef} style={{ height: `${count * 100}dvh` }}>
          <div className="sticky top-0 h-dvh">
            <JourneyBackdrop stops={stops} activeIndex={activeIndex} scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
            <div className="relative z-10 flex h-full flex-col pt-[env(safe-area-inset-top)]">
              <JourneyNav tabs={tabs} track={track} onSelect={selectTrack} />
              <JourneyProgress stops={stops} activeIndex={activeIndex} stopProgress={stopProgress} onSelect={scrollToIndex} />
              <section className="flex min-h-0 flex-1 flex-col justify-end gap-6 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-10 lg:flex-row lg:items-end lg:gap-16 lg:pl-40 lg:pr-16 lg:pb-12">
                <JourneyStopInfo stop={active} onOpen={open} stopProgress={stopProgress} reducedMotion={reducedMotion} />
                {active.gallery && (
                  <JourneyGallery key={active.id} items={active.gallery} stopProgress={stopProgress} reducedMotion={reducedMotion} />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
      <AnimatePresence>
        {expanded && <JourneyExpanded stop={active} index={activeIndex} onClose={close} />}
      </AnimatePresence>
    </>
  );
};
