import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/urls";
import type { JourneyTrack } from "./useJourney";

type Tab = { id: JourneyTrack; label: string };

type JourneyNavProps = {
  tabs: Tab[];
  track: JourneyTrack;
  onSelect: (track: JourneyTrack) => void;
};

export const JourneyNav = ({ tabs, track, onSelect }: JourneyNavProps) => (
  <header className="flex items-start justify-between gap-6 px-5 pt-6 sm:px-10 sm:pt-8 lg:px-16 lg:pt-10">
    <div className="flex flex-col gap-1">
      <h1 className="font-display text-xl text-journey-fg sm:text-2xl">Matías Zanan</h1>
      <p className="hidden text-sm text-journey-fg/70 sm:block">
        Full-stack developer since 2020. From Buenos Aires to Southeast Asia.
      </p>
    </div>
    <nav className="flex gap-6 text-sm font-medium tracking-[0.02em] sm:gap-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelect(tab.id)}
          aria-pressed={track === tab.id}
          className={cn(
            "border-b pb-1.5 transition-colors",
            track === tab.id
              ? "border-journey-fg text-journey-fg"
              : "border-transparent text-journey-fg/55 hover:text-journey-fg/85",
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="hidden text-sm font-medium text-journey-fg underline underline-offset-[5px] transition-colors hover:text-journey-fg/70 sm:block"
    >
      Let&apos;s talk
    </a>
  </header>
);
