"use client";

import * as React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { GlassBadge } from "./GlassBadge";
import { PointerHandIcon } from "./PointerHandIcon";
import { useBeforeAfter } from "./useBeforeAfter";

type Side = { poster: string; src: string; alt: string };

type Props = {
  before: Side;
  after: Side;
  beforeLabel?: string;
  afterLabel?: string;
  initial?: number;
  designWidth?: number;
  className?: string;
};

const sizes = "(max-width: 768px) 100vw, 1024px";
const iframeSandbox =
  "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox";
const REVEAL_TIMEOUT_MS = 10_000;

type BeforeAfterSideProps = {
  side: Side;
  clipped: boolean;
  pos: number;
  live: boolean;
  frameStyle: React.CSSProperties;
};

const BeforeAfterSide = ({ side, clipped, pos, live, frameStyle }: BeforeAfterSideProps) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!live || loaded) return;
    const timeout = window.setTimeout(() => setLoaded(true), REVEAL_TIMEOUT_MS);
    return () => window.clearTimeout(timeout);
  }, [live, loaded]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-black"
      style={clipped ? { clipPath: `inset(0 ${100 - pos}% 0 0)` } : undefined}
    >
      {live && (
        <iframe
          src={side.src}
          title={side.alt}
          loading="lazy"
          sandbox={iframeSandbox}
          style={frameStyle}
          className="border-0"
          onLoad={() => setLoaded(true)}
        />
      )}
      <Image
        src={side.poster}
        alt={side.alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover object-top select-none transition-opacity duration-300 ease-out",
          loaded ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        draggable={false}
      />
    </div>
  );
};

export const BeforeAfter = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 50,
  designWidth,
  className,
}: Props) => {
  const { containerRef, pos, dragging, live, frame, hinting, startDrag, onKeyDown } = useBeforeAfter(
    initial,
    designWidth,
  );

  const frameStyle: React.CSSProperties = frame
    ? {
        width: frame.width,
        height: frame.height,
        transform: `scale(${frame.scale})`,
        transformOrigin: "top left",
        overscrollBehavior: "contain",
      }
    : { width: "100%", height: "100%", overscrollBehavior: "contain" };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden overscroll-contain select-none",
        className,
      )}
    >
      <BeforeAfterSide side={after} clipped={false} pos={pos} live={live} frameStyle={frameStyle} />
      <BeforeAfterSide side={before} clipped pos={pos} live={live} frameStyle={frameStyle} />

      {dragging && <div className="absolute inset-0 z-40 cursor-pointer" />}

      <GlassBadge
        tone="solid"
        size="lg"
        className={cn(
          "absolute left-3 top-14 z-20 pointer-events-none uppercase tracking-wider font-semibold shadow-lg transition-opacity duration-200",
          pos < 8 && "opacity-0",
        )}
      >
        {beforeLabel}
      </GlassBadge>
      <GlassBadge
        tone="accent"
        size="lg"
        className={cn(
          "absolute right-3 top-14 z-20 pointer-events-none uppercase tracking-wider font-semibold shadow-lg transition-opacity duration-200",
          pos > 92 && "opacity-0",
        )}
      >
        {afterLabel}
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
