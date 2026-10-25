"use client";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { PointerHandIcon } from "@/components/ui/PointerHandIcon";
import { useBeforeAfter } from "@/components/ui/useBeforeAfter";
import { cn } from "@/lib/utils";
import comparison from "./beforeAfter.json";

const sizes = "(max-width: 768px) 100vw, 448px";

export const BeforeAfterStage = () => {
  const { containerRef, pos, dragging, hinting, startDrag, onKeyDown } = useBeforeAfter(50);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden overscroll-contain select-none"
    >
      <div className="absolute inset-0 overflow-hidden bg-black">
        <Image
          src={comparison.after.poster}
          alt={comparison.after.alt}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover object-top select-none"
        />
      </div>
      <div
        className="absolute inset-0 overflow-hidden bg-black"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={comparison.before.poster}
          alt={comparison.before.alt}
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover object-top select-none"
        />
      </div>

      {dragging && <div className="absolute inset-0 z-40 cursor-pointer" />}

      <GlassBadge
        tone="solid"
        size="sm"
        className={cn(
          "absolute bottom-3 left-3 z-20 pointer-events-none uppercase tracking-wider font-semibold shadow-lg transition-opacity duration-200",
          pos < 8 && "opacity-0"
        )}
      >
        Before
      </GlassBadge>
      <GlassBadge
        tone="accent"
        size="sm"
        className={cn(
          "absolute bottom-3 right-3 z-20 pointer-events-none uppercase tracking-wider font-semibold shadow-lg transition-opacity duration-200",
          pos > 92 && "opacity-0"
        )}
      >
        After
      </GlassBadge>

      <div
        className="absolute inset-y-0 z-30 w-px -translate-x-1/2 bg-white/70 pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {hinting &&
        [0, 1.1].map((delay) => (
          <span
            key={delay}
            aria-hidden
            style={{ left: `${pos}%`, animationDelay: `${delay}s`, animationDuration: "2.2s" }}
            className="absolute top-1/2 z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 ring-2 ring-white/70 animate-ping pointer-events-none"
          />
        ))}

      {hinting && (
        <span
          aria-hidden
          style={{ left: `${pos}%` }}
          className="absolute top-1/2 z-30 -translate-x-1/2 translate-y-6 pointer-events-none"
        >
          <PointerHandIcon
            strokeWidth={8}
            strokeLinejoin="round"
            className="h-7 w-7 fill-white stroke-black"
          />
        </span>
      )}

      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={(e) => startDrag(e.clientX)}
        onKeyDown={onKeyDown}
        style={{ left: `${pos}%` }}
        className="absolute top-1/2 z-30 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/60 bg-black/60 text-white shadow-lg backdrop-blur-md cursor-pointer touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span className="flex items-center gap-0.5">
          <FaChevronLeft className="h-3 w-3" />
          <FaChevronRight className="h-3 w-3" />
        </span>
      </button>
    </div>
  );
};
