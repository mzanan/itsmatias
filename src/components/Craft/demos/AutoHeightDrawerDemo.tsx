"use client";

import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";
import { DrawerStepView } from "./DrawerStepView";
import { useAutoHeightDrawerDemo } from "./useAutoHeightDrawerDemo";

export const AutoHeightDrawerDemo = () => {
  const {
    popupRef,
    contentRef,
    headerRef,
    innerRef,
    mounted,
    open,
    heightVars,
    hasStep,
    activeEntry,
    activeStep,
    activeRow,
    rows,
    expanded,
    toggleExpanded,
    copy,
    openDrawer,
    close,
    push,
    pop,
    handleKeyDown,
    handleTransitionEnd,
  } = useAutoHeightDrawerDemo();

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" onKeyDown={handleKeyDown}>
      <Pill size="sm" variant="outline" onClick={openDrawer} aria-expanded={open}>
        {copy.openLabel}
      </Pill>

      {mounted && (
        <>
          <div
            aria-hidden
            onClick={close}
            className={cn(
              "absolute inset-0 z-10 bg-black/50 backdrop-blur-xs transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
              open ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            ref={popupRef}
            role="dialog"
            aria-label={copy.title}
            tabIndex={-1}
            onTransitionEnd={handleTransitionEnd}
            style={heightVars}
            className={cn(
              "absolute inset-x-0 bottom-0 z-20 flex h-(--drawer-content-height) max-h-[calc(100%-1rem)] min-h-0 flex-col rounded-t-xl border-t border-white/10 bg-popover text-popover-foreground outline-none [--drawer-content-height:var(--drawer-height,auto)] [interpolate-size:allow-keywords] transition-[translate,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate]",
              open ? "translate-y-0" : "translate-y-[calc(100%+2px)]",
            )}
          >
            <div ref={headerRef} className={cn("shrink-0 px-4 pt-3 pb-2", hasStep && "sr-only")}>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{copy.title}</p>
            </div>
            <div
              ref={contentRef}
              className={cn("grid min-w-0 overflow-y-auto px-4", hasStep ? "pt-3 pb-0" : "pb-4")}
            >
              <div ref={innerRef} className="grid min-w-0 gap-3">
                {activeEntry && activeStep && activeRow && (
                  <div key={activeEntry.key} className="min-w-0">
                    <DrawerStepView
                      title={activeStep.title}
                      description={activeStep.description}
                      options={activeStep.options}
                      submitLabel={activeStep.submitLabel}
                      note={activeRow.note}
                      amount={activeRow.amount}
                      onBack={pop}
                    />
                  </div>
                )}
                <div className={hasStep ? "hidden" : "grid min-w-0 gap-1"}>
                  {rows.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => push(row)}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="grid min-w-0">
                        <span className="truncate text-xs font-semibold">{row.source}</span>
                        <span className="truncate text-[11px] text-muted-foreground">{row.note}</span>
                      </span>
                      <span className="shrink-0 text-xs font-semibold tabular-nums">{row.amount}</span>
                    </button>
                  ))}
                  <Pill size="sm" variant="ghost" onClick={toggleExpanded} className="mt-1 justify-self-start">
                    {expanded ? copy.lessLabel : copy.moreLabel}
                  </Pill>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
