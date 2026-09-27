import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "./WorkCard";
import workData from "./work.json";
import type { WorkItem } from "./types";

const items = workData as WorkItem[];

export const Work = () => (
  <section id="work" className="w-full snap-start px-6 py-24 md:px-10 md:py-32">
    <div className="mx-auto flex max-w-6xl flex-col gap-14 md:gap-20">
      <FadeIn>
        <SectionHeader
          index="01"
          label="Selected work"
          title="Products I designed and built, live in production."
          description="Every project here is mine end to end: interface, design system, backend and deploy."
        />
      </FadeIn>
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {items.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);
