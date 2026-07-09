import { AlertTriangle, CheckCircle2, Eye, Lightbulb, MapPin } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LedInsights } from "../types";

type LedInsightsPanelProps = {
  insights: LedInsights;
};

export function LedInsightsPanel({ insights }: LedInsightsPanelProps) {
  const AspectIcon =
    insights.aspectFeedback.severity === "success"
      ? CheckCircle2
      : AlertTriangle;
  const aspectTone =
    insights.aspectFeedback.severity === "success"
      ? "border-green-500/40 bg-green-500/10"
      : "border-yellow-500/50 bg-yellow-500/10";
  const iconTone =
    insights.aspectFeedback.severity === "success"
      ? "text-green-400"
      : "text-yellow-400";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Lightbulb className="size-5" />
          </div>
          <div>
            <CardTitle>LED insights</CardTitle>
            <CardDescription>
              Practical AV guidance for pitch, viewing distance, and content
              fit.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <MapPin className="size-4" />
              Pixel pitch guidance
            </div>
            <p className="text-lg font-semibold">{insights.pitchGuidance.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {insights.pitchGuidance.description}
            </p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Eye className="size-4" />
              Viewing distance
            </div>
            <p className="text-lg font-semibold">
              {insights.viewingDistance.label}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Rule of thumb: pixel pitch x 1.5 to 3, shown in meters.
            </p>
          </div>
        </div>
        <Alert className={aspectTone}>
          <div className="flex gap-3">
            <AspectIcon className={`mt-0.5 size-5 shrink-0 ${iconTone}`} />
            <div>
              <p className="font-medium">{insights.aspectFeedback.title}</p>
              <p className="mt-1 text-muted-foreground">
                {insights.aspectFeedback.description}
              </p>
            </div>
          </div>
        </Alert>
        <div className="rounded-md border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Engineering notes
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-6">
            {insights.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
