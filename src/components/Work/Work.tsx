import { SectionHeader } from "@/components/ui/SectionHeader";
import { splitWork } from "@/lib/work";
import { WorkCard } from "./WorkCard";
import workData from "./work.json";
import type { WorkItem } from "./types";

const { lead, grid, closing } = splitWork(workData as WorkItem[]);

export const Work = () => (
  <section id="work" className="w-full snap-start px-6 md:px-10">
    <div className="mx-auto flex max-w-6xl flex-col">
      <div className="flex h-dvh flex-col gap-8 pt-24 pb-8 md:gap-10 md:pt-28 md:pb-12">
        <SectionHeader
          index="01"
          label="Selected work"
          title="Products I designed and built, live in production."
          description="Every project here is mine end to end: interface, design system, backend and deploy."
        />
        <WorkCard item={lead} fit="always" />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 pt-16 pb-24 md:grid-cols-2 md:gap-y-24 md:pb-32">
        {grid.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
        {closing.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);
