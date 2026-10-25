"use client";

import { WALL_GAP, type WallLayout, type WallStill } from "@/lib/craft/videoWall";
import { SocialsWallTile } from "./SocialsWallTile";
import { useSocialsVideoWall } from "./useSocialsVideoWall";

type Props = {
  stills: WallStill[];
  isActive: boolean;
  layout: WallLayout;
  onReady?: () => void;
  replayKey?: number;
};

export const SocialsVideoWall = ({ stills, isActive, layout, onReady, replayKey = 0 }: Props) => {
  const { ref, justified, masonry, animationKey } = useSocialsVideoWall({ stills, isActive, onReady });
  const runKey = `${layout}-${animationKey}-${replayKey}`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-background">
      {layout === "justified" ? (
        <div key={runKey} className="absolute" style={{ inset: WALL_GAP }}>
          {justified.map((tile) => (
            <SocialsWallTile
              key={tile.key}
              src={tile.src}
              index={tile.index}
              className="absolute"
              style={{
                left: tile.rect.x,
                top: tile.rect.y,
                width: tile.rect.width,
                height: tile.rect.height,
              }}
            />
          ))}
        </div>
      ) : (
        <div key={runKey} className="absolute inset-x-0 top-0 flex p-1" style={{ gap: WALL_GAP }}>
          {masonry.map((column) => (
            <div key={column.key} className="flex flex-1 flex-col" style={{ gap: WALL_GAP }}>
              {column.tiles.map((tile) => (
                <SocialsWallTile
                  key={tile.key}
                  src={tile.src}
                  index={tile.index}
                  style={{ aspectRatio: tile.aspect }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
};
