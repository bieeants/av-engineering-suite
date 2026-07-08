import { Grid3X3, Maximize2, Monitor, PanelsTopLeft, Ruler } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LcdVideoWallResult } from "../types";
import {
  formatInches,
  formatMeters,
  formatMillimeters,
  formatResolution,
} from "../utils";

type LcdResultsPanelProps = {
  result: LcdVideoWallResult;
};

export function LcdResultsPanel({ result }: LcdResultsPanelProps) {
  const results = [
    {
      label: "Total physical width",
      value: formatMeters(result.totalWidthMm),
      detail: `${formatMillimeters(result.totalWidthMm)} / ${formatInches(
        result.totalWidthInches,
      )}`,
      icon: Ruler,
    },
    {
      label: "Total physical height",
      value: formatMeters(result.totalHeightMm),
      detail: `${formatMillimeters(result.totalHeightMm)} / ${formatInches(
        result.totalHeightInches,
      )}`,
      icon: Maximize2,
    },
    {
      label: "Overall resolution",
      value: formatResolution(
        result.overallResolutionWidth,
        result.overallResolutionHeight,
      ),
      detail: "Native tiled canvas",
      icon: Monitor,
    },
    {
      label: "Aspect ratio",
      value: result.aspectRatioLabel,
      detail: `${result.aspectRatioDifferencePercent.toFixed(
        1,
      )}% from selected source`,
      icon: PanelsTopLeft,
    },
    {
      label: "Total panel count",
      value: result.totalPanels.toLocaleString(),
      detail: `${result.horizontalPanels} horizontal x ${result.verticalPanels} vertical`,
      icon: Grid3X3,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Professional results</CardTitle>
            <CardDescription>
              Production-ready wall dimensions, resolution, aspect, and panel
              count.
            </CardDescription>
          </div>
          <div className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            {result.horizontalPanels} x {result.verticalPanels} wall
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-5">
        {results.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="rounded-md border bg-background p-4"
              key={item.label}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>
                <Icon className="size-4 text-primary" />
              </div>
              <p className="mt-3 text-xl font-semibold">{item.value}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.detail}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
