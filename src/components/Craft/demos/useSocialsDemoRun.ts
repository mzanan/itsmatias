import { useRef, useState } from "react";
import { useInView } from "motion/react";

export const useSocialsDemoRun = () => {
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, amount: 0.4 });
  const [run, setRun] = useState(0);

  const replay = () => setRun((prev) => prev + 1);

  return { ref, started, run, replay };
};
