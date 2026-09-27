"use client";

import { useActiveSlide } from "./useActiveSlide";
import { SLIDE_SELECTOR } from "@/lib/slide";
import { cn } from "@/lib/utils";

export const SlideStepper = () => {
  const { count, active } = useActiveSlide(SLIDE_SELECTOR);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-1.5 md:hidden"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cn(
            "w-1 rounded-full bg-white transition-all duration-300",
            index === active ? "h-4 opacity-80" : "h-1 opacity-25"
          )}
        />
      ))}
    </div>
  );
};
