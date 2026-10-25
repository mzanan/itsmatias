"use client";

import { diagonalClipPath, pathLabel, SPLIT_TRANSITION } from "@/lib/craft/splitScreen";
import { cn } from "@/lib/utils";
import { AnimatedWord } from "./AnimatedWord";
import { ReplayPill } from "./ReplayPill";
import { splitScreenFontVariables } from "./splitScreenFonts";
import { useSplitScreenDemo } from "./useSplitScreenDemo";

export const SplitScreenDemo = () => {
  const {
    whiteSideRef,
    topPosition,
    bottomPosition,
    arrivedType,
    selectDay,
    selectNight,
    reset,
    dayHandlers,
    nightHandlers,
  } = useSplitScreenDemo();

  return (
    <div className={cn("relative h-full w-full overflow-hidden", splitScreenFontVariables)}>
      <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex flex-col items-center gap-1 px-4 text-center text-white mix-blend-difference">
        <p className="text-sm font-medium">Choose your path</p>
        <p className="text-xs opacity-70">
          {arrivedType ? `${pathLabel(arrivedType)} selected` : "Hover, then click a side"}
        </p>
      </div>

      <div
        ref={whiteSideRef}
        className="absolute inset-0 z-10 flex cursor-pointer items-center overflow-hidden bg-white"
        style={{
          clipPath: diagonalClipPath(topPosition, bottomPosition),
          transition: SPLIT_TRANSITION,
        }}
        {...dayHandlers}
      >
        <div className="ml-[16%]">
          <AnimatedWord
            word="Day"
            onClick={selectDay}
            className="font-(family-name:--font-split-display) text-4xl font-medium text-gray-800"
            hoverColor="silver"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 z-0 flex cursor-pointer items-center justify-end overflow-hidden bg-black"
        {...nightHandlers}
      >
        <div className="mr-[16%]">
          <AnimatedWord
            word="Night"
            onClick={selectNight}
            className="font-(family-name:--font-split-script) text-4xl font-medium italic text-white"
            hoverColor="red"
          />
        </div>
      </div>

      {arrivedType && <ReplayPill onClick={reset} blend />}
    </div>
  );
};
