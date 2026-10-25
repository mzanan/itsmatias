import { FaChevronLeft } from "react-icons/fa6";
import { Pill } from "@/components/ui/Pill";

type Props = {
  title: string;
  description: string;
  options: string[];
  submitLabel: string;
  note: string;
  amount: string;
  onBack: () => void;
};

export const DrawerStepView = ({ title, description, options, submitLabel, note, amount, onBack }: Props) => (
  <div className="grid min-w-0 gap-3">
    <div className="flex min-w-0 items-start gap-2">
      <Pill size="sm" variant="ghost" aria-label="Back" onClick={onBack} className="px-2" Icon={FaChevronLeft} iconPosition="left" />
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold">{title}</p>
        <p className="truncate text-[11px] text-muted-foreground">{description}</p>
      </div>
    </div>

    {options.length > 0 ? (
      <div className="grid grid-cols-2 gap-1.5">
        {options.map((option) => (
          <Pill key={option} size="sm" variant="outline" onClick={onBack} className="justify-center">
            {option}
          </Pill>
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-between rounded-lg border border-white/15 bg-input px-3 py-2 text-xs">
        <span className="truncate text-muted-foreground">{note}</span>
        <span className="font-semibold tabular-nums">{amount}</span>
      </div>
    )}

    <div className="sticky bottom-0 z-10 -mx-4 flex justify-end gap-2 border-t border-white/10 bg-popover px-4 py-2">
      <Pill size="sm" variant="ghost" onClick={onBack}>
        Cancel
      </Pill>
      <Pill size="sm" variant="solid" onClick={onBack}>
        {submitLabel}
      </Pill>
    </div>
  </div>
);
