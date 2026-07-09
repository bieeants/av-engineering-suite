import { Eye, Lightbulb } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatViewingDistance,
  type LedCalculationResult,
} from "@/lib/led-utils";

type LedInsightProps = {
  result: LedCalculationResult;
};

export function LedInsight({ result }: LedInsightProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Pixel Pitch Guidance</CardTitle>
          <Lightbulb className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            Standard indoor - balanced pixel pitch for meeting rooms, retail,
            lobbies, and general display use.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Viewing Distance</CardTitle>
          <Eye className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {formatViewingDistance(result)}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Based on P{result.pixelPitch}: pixel pitch x 1.5 to 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
