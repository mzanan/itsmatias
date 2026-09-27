import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  children: ReactNode;
  className?: string;
};

export const Eyebrow = ({ index, children, className }: Props) => (
  <p
    className={cn(
      "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
      className
    )}
  >
    {index && (
      <>
        <span className="text-foreground/40">{index}</span>
        <span className="mx-3 inline-block h-px w-6 bg-foreground/20 align-middle" />
      </>
    )}
    {children}
  </p>
);
