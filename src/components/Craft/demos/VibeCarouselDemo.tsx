"use client";

import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuPlay } from "react-icons/lu";
import { Pill } from "@/components/ui/Pill";
import { EXPERIENCES } from "@/lib/craft/vibeCarousel";
import { cn } from "@/lib/utils";
import { useVibeCarouselDemo } from "./useVibeCarouselDemo";

export const VibeCarouselDemo = () => {
  const { emblaRef, selectedIdx, paused, goPrev, goNext, goTo, resume } = useVibeCarouselDemo();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div
          className="flex h-full"
          style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative h-full min-w-0 flex-[0_0_100%]">
              <Image
                src={exp.image}
                alt={exp.label}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                draggable={false}
                className="select-none object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
              <div className="pointer-events-none absolute inset-0 flex items-center px-5">
                <div className="max-w-[15rem]">
                  <p className="font-serif text-2xl leading-[1.05] tracking-tight text-white sm:text-3xl">{exp.label}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/85">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 text-white/70">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous experience"
          className="inline-flex items-center transition-colors hover:text-white"
        >
          <LuChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to ${exp.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                idx === selectedIdx ? "w-10 bg-white" : "w-1.5 bg-white/45 hover:bg-white/80",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next experience"
          className="inline-flex items-center transition-colors hover:text-white"
        >
          <LuChevronRight className="h-5 w-5" />
        </button>
      </div>

      {paused && (
        <Pill
          size="sm"
          variant="ghost"
          Icon={LuPlay}
          iconPosition="left"
          onClick={resume}
          className="absolute right-3 top-3 z-10 animate-in fade-in duration-300"
        >
          Resume autoplay
        </Pill>
      )}
    </div>
  );
};
