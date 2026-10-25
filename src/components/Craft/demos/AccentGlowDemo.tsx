"use client";

import { cn } from "@/lib/utils";
import { SocialsLinkRow } from "./SocialsLinkRow";
import { useAccentGlowDemo } from "./useAccentGlowDemo";

export const AccentGlowDemo = () => {
  const { accent, setAccent, accents, links } = useAccentGlowDemo();

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)] px-4"
      style={{ ["--accent-glow" as string]: accent }}
    >
      <div className="flex w-full max-w-[16rem] flex-col gap-2">
        {links.map((link) => (
          <SocialsLinkRow
            key={link.title}
            network={link.network}
            title={link.title}
            className="h-9 rounded-2xl text-sm"
          />
        ))}
      </div>
      <div className="flex items-center gap-2.5" role="group" aria-label="Accent color">
        {accents.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.name}
            aria-pressed={option.value === accent}
            onClick={() => setAccent(option.value)}
            className={cn(
              "size-5 rounded-full transition-transform hover:scale-105",
              option.value === accent && "ring-2 ring-white/80 ring-offset-2 ring-offset-background"
            )}
            style={{ backgroundColor: option.value }}
          />
        ))}
      </div>
    </div>
  );
};
