import { LuChevronsDown } from "react-icons/lu";
import { REVEAL_SECTIONS, SCROLL_REVEALS_CSS } from "@/lib/craft/scrollReveals";
import { cn } from "@/lib/utils";
import { ScrollRevealPreview } from "./ScrollRevealPreview";

export const ScrollRevealsDemo = () => (
  <div className="fc-reveal-scope relative h-full w-full">
    <style href="craft-fc-reveal" precedence="default">
      {SCROLL_REVEALS_CSS}
    </style>
    <div className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">Scroll inside this card</p>
        <LuChevronsDown className="h-4 w-4 animate-bounce text-white/45 motion-reduce:animate-none" />
      </div>
      {REVEAL_SECTIONS.map((section, i) => (
        <section key={section.eyebrow} className="grid grid-cols-2 items-center gap-3 px-4 py-6 sm:gap-4 sm:px-5">
          <div className={cn("fc-reveal", i % 2 === 1 && "order-2")}>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-(--fc-brand)">{section.eyebrow}</p>
            <h4 className="mt-1 text-sm font-semibold leading-tight tracking-tight text-white sm:text-base">
              {section.title}
            </h4>
            <p className="mt-1.5 text-[10px] leading-snug text-white/55 sm:text-[11px]">{section.body}</p>
          </div>
          <div className={cn("fc-reveal-late", i % 2 === 1 && "order-1")}>
            <ScrollRevealPreview preview={section.preview} />
          </div>
        </section>
      ))}
      <div className="h-16" />
    </div>
  </div>
);
