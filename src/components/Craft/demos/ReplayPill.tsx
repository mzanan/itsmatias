"use client";

import { LuRotateCcw } from "react-icons/lu";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

type Props = { onClick: () => void; blend?: boolean };

export const ReplayPill = ({ onClick, blend = false }: Props) => (
  <div className={cn("absolute right-3 top-3 z-40", blend && "mix-blend-difference")}>
    <Pill size="sm" variant="ghost" Icon={LuRotateCcw} iconPosition="left" onClick={onClick}>
      Replay
    </Pill>
  </div>
);
