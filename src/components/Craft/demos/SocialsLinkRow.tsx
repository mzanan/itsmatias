import { LuChevronRight } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { SocialsNetworkIcon } from "./SocialsNetworkIcon";

type Props = { network: string; title: string; className?: string };

export const SocialsLinkRow = ({ network, title, className }: Props) => (
  <div
    className={cn(
      "group flex h-7 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-xs font-medium text-white backdrop-blur-md",
      "[transition:background-color_0.2s_ease,border-color_0.2s_ease,box-shadow_0.25s_ease]",
      "hover:[background-color:color-mix(in_oklab,var(--accent-glow)_10%,rgba(255,255,255,0.06))]",
      "hover:[border-color:color-mix(in_oklab,var(--accent-glow)_55%,transparent)]",
      "hover:[box-shadow:0_0_0_1px_color-mix(in_oklab,var(--accent-glow)_22%,transparent),0_10px_34px_-8px_color-mix(in_oklab,var(--accent-glow)_55%,transparent)]",
      className
    )}
  >
    <SocialsNetworkIcon network={network} className="size-3.5 shrink-0 text-white/75" />
    <span className="flex-1 truncate text-left">{title}</span>
    <LuChevronRight
      aria-hidden
      className="size-4 shrink-0 -translate-x-1 text-white/58 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-[color:var(--accent-glow)] group-hover:opacity-100"
    />
  </div>
);
