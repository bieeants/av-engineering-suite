import { Grid3X3, Maximize2, Monitor, PanelsTopLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatMeters,
  formatPixels,
  formatResolution,
} from "../calculator";
import type { LedCalculatorResult } from "../types";
import { LedResultCard } from "./led-result-card";

type LedResultsPanelProps = {
  result: LedCalculatorResult;
};

export function LedResultsPanel({ result }: LedResultsPanelProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>LED calculation results</CardTitle>
            <CardDescription>
              Physical dimensions, native resolution, total pixels, and aspect
              ratio update instantly.
            </CardDescription>
          </div>
          <div className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            {result.horizontalCabinets} x {result.verticalCabinets} cabinets
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
        <LedResultCard
          detail={`${formatMeters(result.totalWidthMeters)} wide x ${formatMeters(
            result.totalHeightMeters,
          )} high`}
          icon={Maximize2}
          label="Physical Size"
          value={`${formatMeters(result.totalWidthMeters)} x ${formatMeters(
            result.totalHeightMeters,
          )}`}
        />
        <LedResultCard
          detail={`${result.pixelPitchMm.toFixed(2)} mm pixel pitch`}
          icon={Monitor}
          label="Resolution"
          value={formatResolution(result.resolutionWidth, result.resolutionHeight)}
        />
        <LedResultCard
          detail={`${result.totalPixels.toLocaleString()} addressable pixels`}
          icon={Grid3X3}
          label="Total Pixels"
          value={formatPixels(result.totalPixels)}
        />
        <LedResultCard
          detail="Simplified display canvas ratio"
          icon={PanelsTopLeft}
          label="Aspect Ratio"
          value={result.aspectRatioLabel}
        />
      </CardContent>
    </Card>
  );
}
