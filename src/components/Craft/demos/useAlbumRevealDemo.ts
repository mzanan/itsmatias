import { useEffect, useMemo, useRef, useState } from "react";
import {
  COLUMN_COUNTS,
  TILE_VIEWPORT_MARGIN,
  buildMasonryColumns,
  columnCountFor,
  type AlbumPhoto,
} from "@/lib/craft/albumReveal";
import photos from "./albumReveal.json";

export const useAlbumRevealDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(COLUMN_COUNTS.sm);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setCols(columnCountFor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const columnLists = useMemo(() => buildMasonryColumns(photos as AlbumPhoto[], cols), [cols]);

  const replay = () => {
    scrollRef.current?.scrollTo({ top: 0 });
    setRunId((id) => id + 1);
  };

  return {
    scrollRef,
    runId,
    columnLists,
    viewport: { once: true, margin: TILE_VIEWPORT_MARGIN, root: scrollRef },
    replay,
  };
};
