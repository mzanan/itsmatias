"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "solid" | "accent";
type Size = "sm" | "md" | "lg";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  withDot?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
  className?: string;
};

const toneClasses: Record<Tone, string> = {
  dark: "bg-black/55 backdrop-blur-md border border-white/15 text-white/90",
  light: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
  solid: "bg-black/80 backdrop-blur-md border border-white/10 text-white",
  accent: "bg-secondary backdrop-blur-md border border-white/15 text-secondary-foreground",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1 text-sm gap-1.5",
};

export const GlassBadge = ({
  children,
  tone = "dark",
  size = "md",
  withDot = false,
  Icon,
  className,
}: Props) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tracking-wide",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
    >
      {withDot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      )}
      <span>{children}</span>
      {Icon && <Icon className="h-3 w-3 opacity-90" />}
    </span>
  );
};
