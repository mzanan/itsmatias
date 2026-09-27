import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mobileSlide } from "@/lib/slide";
import { cn } from "@/lib/utils";
import { WorkCard } from "./WorkCard";
import workData from "./work.json";
import type { WorkItem } from "./types";

const [lead, ...rest] = workData as WorkItem[];

export const Work = () => (
  <section id="work" className="w-full snap-start px-6 md:px-10 md:py-32">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 md:grid-cols-2 md:gap-y-24">
      <div data-slide className={cn(mobileSlide, "max-md:gap-8 md:contents")}>
        <FadeIn className="md:col-span-2 md:-mb-4">
          <SectionHeader
            index="01"
            label="Selected work"
            title="Products I designed and built, live in production."
            description="Every project here is mine end to end: interface, design system, backend and deploy."
          />
        </FadeIn>
        <WorkCard item={lead} slide={false} />
      </div>
      {rest.map((item) => (
        <WorkCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);
