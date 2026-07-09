import {
  Grid3X3,
  Monitor,
  PanelsTopLeft,
  Ruler,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatMeters,
  formatMillimeters,
  formatPixels,
  formatResolution,
  type LedCalculationResult,
} from "@/lib/led-utils";

type LedResultProps = {
  result: LedCalculationResult;
};

const fitStyles = {
  perfect: "border-green-500/40 bg-green-500/10 text-green-300",
  minor: "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
  poor: "border-red-500/50 bg-red-500/10 text-red-300",
};

export function LedResult({
  result,
}: LedResultProps) {
  const metrics = [
    {
      label: "Cabinet Size",
      value: `${formatMillimeters(result.cabinetWidthMm)} x ${formatMillimeters(
        result.cabinetHeightMm,
      )}`,
      detail: "Selected cabinet module",
      icon: Ruler,
    },
    {
      label: "Layout",
      value: `${result.columns} x ${result.rows}`,
      detail: "Columns x rows",
      icon: Grid3X3,
    },
    {
      label: "Physical Size",
      value: `${formatMeters(result.actualWidthMeters)} x ${formatMeters(
        result.actualHeightMeters,
      )}`,
      detail: "Actual assembled size",
      icon: PanelsTopLeft,
    },
    {
      label: "Resolution",
      value: formatResolution(result.resolutionWidth, result.resolutionHeight),
      detail: `P${result.pixelPitch} native estimate`,
      icon: Monitor,
    },
    {
      label: "Total Pixels",
      value: formatPixels(result.totalPixels),
      detail: `${result.totalPixels.toLocaleString()} total pixels`,
      icon: Grid3X3,
    },
    {
      label: "Aspect Ratio",
      value: result.aspectRatio,
      detail: "Simplified canvas ratio",
      icon: PanelsTopLeft,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Recommended LED setup</CardTitle>
            <CardDescription>
              Sales-friendly sizing summary for the selected display dimensions
              and pixel pitch.
            </CardDescription>
          </div>
          <div
            className={`rounded-md border px-3 py-1.5 text-sm font-medium ${fitStyles[result.fitStatus]}`}
          >
            {result.fitLabel}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                className="rounded-md border bg-background p-4"
                key={metric.label}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <Icon className="size-4 text-primary" />
                </div>
                <p className="mt-3 text-xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className={`rounded-md border p-4 ${fitStyles[result.fitStatus]}`}>
          <p className="text-sm font-medium">{result.fitLabel}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.fitDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
