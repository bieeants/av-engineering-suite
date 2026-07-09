import { Grid3X3, MonitorCog, Ruler } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LedSmartRecommendation } from "../types";

type LedRecommendedSetupCardProps = {
  recommendation: LedSmartRecommendation;
};

export function LedRecommendedSetupCard({
  recommendation,
}: LedRecommendedSetupCardProps) {
  const setupItems = [
    {
      label: "Pixel Pitch",
      value: `P${recommendation.inputs.pixelPitchMm.toFixed(1)}`,
      detail: `${recommendation.inputs.pixelPitchMm.toFixed(2)} mm selected from viewing assumptions`,
      icon: MonitorCog,
    },
    {
      label: "Cabinet Size",
      value: recommendation.cabinetOption.label,
      detail: "Selected from standard cabinet options",
      icon: Ruler,
    },
    {
      label: "Cabinet Layout",
      value: `${recommendation.inputs.horizontalCabinets} x ${recommendation.inputs.verticalCabinets}`,
      detail: `${recommendation.result.totalCabinets} total cabinets`,
      icon: Grid3X3,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Setup</CardTitle>
        <CardDescription>
          Smart Mode selects pitch, cabinet format, and cabinet count from the
          target display size.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {setupItems.map((item) => {
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
