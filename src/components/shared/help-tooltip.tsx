import { HelpCircle } from "lucide-react";

type HelpTooltipProps = {
  label: string;
  tooltip: string;
};

export function HelpTooltip({ label, tooltip }: HelpTooltipProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {label}
      <HelpCircle
        aria-label={tooltip}
        className="size-3.5 text-muted-foreground"
        role="img"
      >
        <title>{tooltip}</title>
      </HelpCircle>
    </span>
  );
}
