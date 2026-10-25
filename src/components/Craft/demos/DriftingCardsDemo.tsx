import { HERO_BOUNCE_CSS, HERO_EDGE_MASK } from "@/lib/craft/driftingCards";
import { SocialsMockCard } from "./SocialsMockCard";
import { useDriftingCardsDemo } from "./useDriftingCardsDemo";

export const DriftingCardsDemo = () => {
  const { columns, sets } = useDriftingCardsDemo();

  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden bg-background">
      <style href="craft-socials-hero-bounce" precedence="default">
        {HERO_BOUNCE_CSS}
      </style>
      <div
        className="absolute inset-0 flex justify-center gap-3 px-2"
        style={{
          maskImage: HERO_EDGE_MASK,
          WebkitMaskImage: HERO_EDGE_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        {columns.map((column) => (
          <div key={column.key} className="flex w-24 shrink-0 flex-col" style={{ animation: column.animation }}>
            {sets.map((set) => (
              <div key={set} className="flex flex-col gap-3 pb-3">
                {column.creators.map((creator) => (
                  <SocialsMockCard
                    key={creator.handle}
                    name={creator.name}
                    handle={creator.handle}
                    avatar={creator.avatar}
                    links={creator.links}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
