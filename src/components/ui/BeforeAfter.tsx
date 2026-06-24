"use client";

import * as React from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { GlassBadge } from "./GlassBadge";
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

export const BeforeAfter = ({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 50,
  designWidth,
  className,
}: Props) => {
  const { containerRef, pos, live, frame, onPointerDown, onPointerMove, onPointerUp, onKeyDown } =
    useBeforeAfter(initial, designWidth);

  const frameStyle: React.CSSProperties = frame
    ? {
        width: frame.width,
        height: frame.height,
        transform: `scale(${frame.scale})`,
        transformOrigin: "top left",
      }
    : { width: "100%", height: "100%" };

  const renderSide = (side: Side, clipped: boolean) => (
    <div
      className="absolute inset-0 overflow-hidden bg-black"
      style={clipped ? { clipPath: `inset(0 ${100 - pos}% 0 0)` } : undefined}
    >
      {live ? (
        <iframe
          src={side.src}
          title={side.alt}
          loading="lazy"
          sandbox={iframeSandbox}
          style={frameStyle}
          className="border-0"
        />
      ) : (
        <Image
          src={side.poster}
          alt={side.alt}
          fill
          sizes={sizes}
          className="object-cover object-top select-none"
          draggable={false}
        />
      )}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden select-none", className)}
    >
      {renderSide(after, false)}
      {renderSide(before, true)}

      <GlassBadge size="sm" className="absolute left-3 top-3 z-20 pointer-events-none">
        {beforeLabel}
      </GlassBadge>
      <GlassBadge size="sm" className="absolute right-3 top-3 z-20 pointer-events-none">
        {afterLabel}
      </GlassBadge>

      <div
        className="absolute inset-y-0 z-30 w-px -translate-x-1/2 bg-white/70 pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        style={{ left: `${pos}%` }}
        className="absolute top-1/2 z-30 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/60 bg-black/60 text-white shadow-lg backdrop-blur-md cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span className="flex items-center gap-0.5">
          <FaChevronLeft className="h-3 w-3" />
          <FaChevronRight className="h-3 w-3" />
        </span>
      </button>
    </div>
  );
};
