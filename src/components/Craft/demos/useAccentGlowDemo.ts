import { useState } from "react";
import { ACCENTS } from "@/lib/craft/accentGlow";
import profile from "./socialsProfile.json";

const LINKS = [...profile.tabs[0].links, ...profile.tabs[1].links].slice(0, 3);

export const useAccentGlowDemo = () => {
  const [accent, setAccent] = useState(ACCENTS[0].value);
  return { accent, setAccent, accents: ACCENTS, links: LINKS };
};
