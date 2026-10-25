import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GlassBadge } from "@/components/ui/GlassBadge";
import { CRAFT_KIND_LABEL } from "@/lib/craft/kinds";
import { surface } from "@/lib/surface";
import { cn } from "@/lib/utils";
import { CraftDemo } from "./CraftDemo";
import type { CraftItem } from "./types";

type Props = { item: CraftItem; projectName: string };

export const CraftCard = ({ item, projectName }: Props) => (
  <div className={cn(surface(), "flex flex-col")}>
    <CraftDemo id={item.id} />
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
        <GlassBadge tone="light" size="sm" className="shrink-0">
          {CRAFT_KIND_LABEL[item.kind]}
        </GlassBadge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.description}</p>
      <p className="font-mono text-xs text-foreground/40">{item.how}</p>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        See it in {projectName} <FaArrowUpRightFromSquare className="h-3 w-3" />
      </a>
    </div>
  </div>
);
