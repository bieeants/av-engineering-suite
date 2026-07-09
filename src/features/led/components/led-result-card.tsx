import type { LucideIcon } from "lucide-react";

type LedResultCardProps = {
  detail: string;
  icon: LucideIcon;
  label: string;
  value: string;
};

export function LedResultCard({
  detail,
  icon: Icon,
  label,
  value,
}: LedResultCardProps) {
  return (
    <div className="rounded-md border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}
