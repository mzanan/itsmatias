import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export const SectionHeader = ({
  index,
  label,
  title,
  description,
  className,
}: Props) => (
  <header className={cn("flex flex-col gap-4", className)}>
    <Eyebrow index={index}>{label}</Eyebrow>
    <h2 className="text-heading font-semibold tracking-tight text-balance">
      {title}
    </h2>
    {description && (
      <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
        {description}
      </p>
    )}
  </header>
);
