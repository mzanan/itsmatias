import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  delay: string;
  className?: string;
};

export const Ticker = ({ items, delay, className }: Props) => (
  <span className={cn("inline-block h-[1lh] overflow-hidden", className)}>
    <span
      className="flex animate-[craft-ticker_6s_ease-in-out_infinite] flex-col motion-reduce:animate-none"
      style={{ animationDelay: delay }}
    >
      {items.map((item) => (
        <span key={item} className="h-[1lh]">
          {item}
        </span>
      ))}
    </span>
  </span>
);
