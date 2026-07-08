import { Cable, Cpu, Layers3, Server } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VideoProcessorRecommendation } from "../types";

type VideoProcessorRecommendationCardProps = {
  recommendation: VideoProcessorRecommendation;
};

export function VideoProcessorRecommendationCard({
  recommendation,
}: VideoProcessorRecommendationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Cpu className="size-5" />
          </div>
          <div>
            <CardTitle>Video Processor Recommendation</CardTitle>
            <CardDescription>
              Minimum signal processing profile based on the selected wall
              layout.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border bg-background p-4">
          <p className="text-xs text-muted-foreground">Recommended class</p>
          <p className="mt-1 text-lg font-semibold">
            {recommendation.processorClass}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Cable className="size-4" />
              Minimum inputs
            </div>
            <p className="text-sm font-medium">
              {recommendation.minimumInputConfiguration}
            </p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Layers3 className="size-4" />
              Minimum outputs
            </div>
            <p className="text-sm font-medium">
              {recommendation.minimumOutputConfiguration}
            </p>
          </div>
          <div className="rounded-md border bg-background p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Server className="size-4" />
              Canvas
            </div>
            <p className="text-sm font-medium">
              {recommendation.canvasRequirement}
            </p>
          </div>
        </div>
        <div className="rounded-md border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Engineering notes
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-6">
            {recommendation.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
