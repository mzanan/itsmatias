"use client";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Pill } from "@/components/ui/Pill";
import { TICKER_KEYFRAMES } from "@/lib/craft/odometer";
import { Ticker } from "./Ticker";
import { useOdometerDemo } from "./useOdometerDemo";

export const OdometerDemo = () => {
  const { runId, balanceLabel, tickers, delay, next } = useOdometerDemo();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-3">
      <style href="craft-ticker" precedence="default">
        {TICKER_KEYFRAMES}
      </style>
      <div
        key={runId}
        aria-hidden
        className="w-full max-w-[18rem] select-none rounded-xl border border-white/10 bg-card p-3 text-left shadow-2xl"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {balanceLabel}
          </span>
          <Ticker items={tickers.labels} delay={delay} className="text-xs tabular-nums text-muted-foreground" />
        </div>
        <Ticker
          items={tickers.balances}
          delay={delay}
          className="block text-[1.75rem] font-semibold leading-[1.05] tracking-tight tabular-nums"
        />
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <FaArrowDown className="size-2.5 -rotate-45" />
            </span>
            <span className="grid min-w-0">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">In</span>
              <Ticker items={tickers.incomes} delay={delay} className="text-xs font-semibold tabular-nums" />
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
              <FaArrowUp className="size-2.5 rotate-45" />
            </span>
            <span className="grid min-w-0">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Out</span>
              <Ticker items={tickers.expenses} delay={delay} className="text-xs font-semibold tabular-nums" />
            </span>
          </div>
        </div>
      </div>
      <Pill size="sm" variant="ghost" onClick={next}>
        Next quarter
      </Pill>
    </div>
  );
};
