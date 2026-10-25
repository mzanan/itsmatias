import { formatDelta, isGoodDelta, type RevealPreview } from "@/lib/craft/scrollReveals";
import { cn } from "@/lib/utils";

type Props = { preview: RevealPreview };

export const ScrollRevealPreview = ({ preview }: Props) => (
  <div aria-hidden className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 shadow-2xl">
    {preview.kind === "meals" && (
      <ul className="space-y-1.5">
        {preview.items.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-2 py-1.5">
            <span className="truncate text-[10px] text-white/80">{item.name}</span>
            <span className="shrink-0 text-[9px] tabular-nums text-(--fc-brand)">{item.protein} g P</span>
          </li>
        ))}
      </ul>
    )}
    {preview.kind === "coach" && (
      <div className="space-y-1.5 text-[10px] leading-snug">
        <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-(--fc-brand) px-2 py-1.5 text-black">
          {preview.question}
        </p>
        <p className="w-fit max-w-[90%] rounded-xl rounded-bl-sm bg-white/10 px-2 py-1.5 text-white/85">
          {preview.answer}
        </p>
      </div>
    )}
    {preview.kind === "sets" && (
      <div>
        <p className="text-[10px] font-medium text-white/80">{preview.exercise}</p>
        <ul className="mt-1.5 space-y-1">
          {preview.sets.map((set) => (
            <li key={set.n} className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-[9px] tabular-nums text-white/70">
              <span className="text-white/40">Set {set.n}</span>
              <span className="ml-auto">{set.kg} kg</span>
              <span>x {set.reps}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    {preview.kind === "body" && (
      <ul className="space-y-1.5">
        {preview.rows.map((row) => (
          <li key={row.label} className="flex items-baseline gap-2 text-[10px]">
            <span className="text-white/55">{row.label}</span>
            <span className="ml-auto font-semibold tabular-nums text-white">{row.value}</span>
            <span
              className={cn(
                "w-8 text-right text-[9px] tabular-nums",
                isGoodDelta(row.delta, row.good) ? "text-(--fc-brand)" : "text-(--fc-fat)",
              )}
            >
              {formatDelta(row.delta)}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
