"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { craftDemos } from "./craftDemos";

export const useCraftDemo = (id: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { once: true, margin: "300px 0px" });
  const Demo = isNear ? craftDemos[id] : undefined;

  return { ref, Demo };
};
