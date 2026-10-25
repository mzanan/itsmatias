"use client";

import { SOCIALS_ACCENT } from "@/lib/craft/accentGlow";
import { PROFILE_VIGNETTE } from "@/lib/craft/cardReveal";
import { cn } from "@/lib/utils";
import { ReplayPill } from "./ReplayPill";
import { SocialsPhotoGrid } from "./SocialsPhotoGrid";
import { SocialsProfileCard } from "./SocialsProfileCard";
import { SocialsVideoWall } from "./SocialsVideoWall";
import { useCardRevealDemo } from "./useCardRevealDemo";

export const CardRevealDemo = () => {
  const {
    ref,
    started,
    visible,
    run,
    replay,
    profile,
    tabs,
    activeTabId,
    activeIndex,
    setActiveTabId,
    links,
    scenes,
    showCard,
    revealCard,
  } = useCardRevealDemo();

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background"
      style={{ ["--accent-glow" as string]: SOCIALS_ACCENT }}
    >
      {started &&
        scenes.map((scene) => (
          <div
            key={scene.id}
            className={cn("absolute inset-0", !scene.active && "pointer-events-none invisible")}
          >
            {scene.type === "video" ? (
              <SocialsVideoWall
                stills={profile.stills}
                isActive={scene.active}
                layout="justified"
                onReady={revealCard}
                replayKey={run}
              />
            ) : (
              <SocialsPhotoGrid
                images={profile.photos}
                isActive={scene.active}
                onReady={revealCard}
                rotate={visible && scene.active}
                simulateLatency
                replayKey={run}
              />
            )}
          </div>
        ))}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: PROFILE_VIGNETTE }} />
      <SocialsProfileCard
        name={profile.name}
        bio={profile.bio}
        links={links}
        reveal={showCard}
        tabs={tabs}
        activeTabId={activeTabId}
        activeIndex={activeIndex}
        onTabChange={setActiveTabId}
      />
      <ReplayPill onClick={replay} />
    </div>
  );
};
