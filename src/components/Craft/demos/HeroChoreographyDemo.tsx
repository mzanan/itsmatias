"use client";

import {
  BAR_DELAY,
  ENTER_CLASS,
  HERO_CHOREOGRAPHY_CSS,
  HERO_MACROS,
  HERO_REMAINING,
  MACRO_COLOR,
  barWidth,
} from "@/lib/craft/heroChoreography";
import { cn } from "@/lib/utils";
import { useHeroChoreographyDemo } from "./useHeroChoreographyDemo";
import { ReplayPill } from "./ReplayPill";

export const HeroChoreographyDemo = () => {
  const { runId, replay, ring } = useHeroChoreographyDemo();

  return (
    <div className="fc-hero relative h-full w-full overflow-hidden">
      <style href="craft-fc-hero" precedence="default">
        {HERO_CHOREOGRAPHY_CSS}
      </style>
      <div key={runId} aria-hidden className="relative flex h-full flex-col justify-start gap-3 px-4 pb-3 pt-4 sm:justify-center sm:px-5 sm:py-3">
        <div>
          <span
            className={cn(
              "inline-flex rounded-full border border-(--fc-brand)/40 bg-(--fc-brand-soft) px-2 py-0.5 text-[9px] font-medium text-(--fc-brand)",
              "slide-in-from-bottom-2",
              ENTER_CLASS,
            )}
          >
            AI nutrition and strength coach
          </span>
          <p
            className={cn(
              "mt-2 max-w-[22rem] text-[15px] font-semibold leading-tight tracking-tight text-white sm:text-[17px]",
              "delay-(--stagger-2) slide-in-from-bottom-2",
              ENTER_CLASS,
            )}
          >
            Macro tracking with an AI coach that <span className="text-(--fc-brand)">remembers.</span>
          </p>
          <p
            className={cn(
              "mt-1 text-[10px] text-white/55 sm:text-[11px]",
              "delay-(--stagger-4) slide-in-from-bottom-2",
              ENTER_CLASS,
            )}
          >
            Log a meal in a few taps, see exactly what is left for the day.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-8 bg-[radial-gradient(60%_50%_at_50%_40%,var(--fc-brand-soft),transparent_70%)]"
          />
          <div
            className={cn(
              "relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl",
              "delay-(--stagger-8) slide-in-from-bottom-4",
              ENTER_CLASS,
            )}
          >
            <div className="relative grid shrink-0 place-items-center" style={{ width: ring.size, height: ring.size }}>
              <svg
                width={ring.size}
                height={ring.size}
                viewBox={`0 0 ${ring.size} ${ring.size}`}
                className="absolute inset-0 -rotate-90"
              >
                <circle
                  cx={ring.center}
                  cy={ring.center}
                  r={ring.r}
                  fill="none"
                  strokeWidth={ring.stroke}
                  className="stroke-(--fc-track)"
                />
                <circle
                  cx={ring.center}
                  cy={ring.center}
                  r={ring.r}
                  fill="none"
                  strokeWidth={ring.stroke}
                  strokeLinecap="round"
                  strokeDasharray={ring.c}
                  strokeDashoffset={ring.offset}
                  style={ring.style}
                  className="fc-ring-fill stroke-(--fc-brand) [--bar-delay:var(--delay-hero-data)]"
                />
              </svg>
              <div className="relative text-center leading-none">
                <p className="text-[7px] font-medium uppercase tracking-wider text-white/50">kcal left</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-white">{HERO_REMAINING}</p>
                <p className="mt-1 text-[8px] text-white/45">
                  of <span className="tabular-nums">{HERO_MACROS.kcalTarget}</span>
                </p>
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-2.5">
              {HERO_MACROS.bars.map((line, i) => (
                <div key={line.key}>
                  <div className="flex items-baseline gap-1.5">
                    <span className={cn("size-1.5 shrink-0 rounded-full", MACRO_COLOR[line.key])} />
                    <span className="text-[10px] font-medium text-white/55">{line.label}</span>
                    <span className="ml-auto whitespace-nowrap">
                      <span className="text-xs font-semibold tabular-nums text-white">{line.current}</span>
                      <span className="ml-0.5 text-[9px] text-white/40">
                        / <span className="tabular-nums">{line.target}</span> g
                      </span>
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-(--fc-well) shadow-[inset_0_1px_2px_oklch(0_0_0/0.18)]">
                    <div
                      className={cn("fc-bar-fill h-full rounded-full", MACRO_COLOR[line.key], BAR_DELAY[i])}
                      style={{ width: barWidth(line.pct) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ReplayPill onClick={replay} />
    </div>
  );
};
