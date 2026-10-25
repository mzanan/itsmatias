import { useState } from "react";
import type { WallLayout } from "@/lib/craft/videoWall";
import profile from "./socialsProfile.json";
import { useSocialsDemoRun } from "./useSocialsDemoRun";

const LAYOUTS: { id: WallLayout; label: string }[] = [
  { id: "justified", label: "Justified" },
  { id: "masonry", label: "Masonry" },
];

export const useVideoWallDemo = () => {
  const demo = useSocialsDemoRun();
  const [layout, setLayout] = useState<WallLayout>("justified");
  return { ...demo, layout, setLayout, layouts: LAYOUTS, stills: profile.stills };
};
