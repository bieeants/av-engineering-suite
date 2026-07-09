"use client";

import { MapPin, Ruler } from "lucide-react";

import { HelpTooltip } from "@/components/shared/help-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  LED_PIXEL_PITCH_OPTIONS,
  type LedEnvironment,
} from "@/lib/led-utils";

type LedInputProps = {
  environment: LedEnvironment;
  heightMeters: number;
  pixelPitch: number;
  widthMeters: number;
  onEnvironmentChange: (value: LedEnvironment) => void;
  onHeightChange: (value: number) => void;
  onPixelPitchChange: (value: number) => void;
  onWidthChange: (value: number) => void;
};

export function LedInput({
  environment,
  heightMeters,
  onEnvironmentChange,
  onHeightChange,
  onPixelPitchChange,
  onWidthChange,
  pixelPitch,
  widthMeters,
}: LedInputProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Ruler className="size-5" />
          </div>
          <div>
            <CardTitle>LED display inputs</CardTitle>
            <CardDescription>
              Start with the target display size and environment. Cabinet layout
              is calculated instantly.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="led-pixel-pitch">
            <HelpTooltip
              label="Pixel Pitch"
              tooltip="Distance between LED pixels in millimeters. Smaller values create higher pixel density."
            />
          </Label>
          <Select
            id="led-pixel-pitch"
            onChange={(event) => onPixelPitchChange(Number(event.target.value))}
            value={String(pixelPitch)}
          >
            {LED_PIXEL_PITCH_OPTIONS.map((pitch) => (
              <option key={pitch} value={pitch}>
                P{pitch}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="led-width">Width (meters)</Label>
          <Input
            id="led-width"
            min={0.1}
            onChange={(event) => onWidthChange(Number(event.target.value))}
            step="0.1"
            type="number"
            value={widthMeters}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="led-height">Height (meters)</Label>
          <Input
            id="led-height"
            min={0.1}
            onChange={(event) => onHeightChange(Number(event.target.value))}
            step="0.1"
            type="number"
            value={heightMeters}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="led-environment">
            <span className="inline-flex items-center gap-1.5">
              Environment
              <MapPin className="size-3.5 text-muted-foreground" />
            </span>
          </Label>
          <Select
            id="led-environment"
            onChange={(event) =>
              onEnvironmentChange(event.target.value as LedEnvironment)
            }
            value={environment}
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
