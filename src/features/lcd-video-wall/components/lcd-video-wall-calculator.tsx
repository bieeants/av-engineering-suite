"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Ruler } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
  BEZEL_SIZES_MM,
  DEFAULT_LCD_INPUTS,
  PANEL_RESOLUTIONS,
  PANEL_SIZES,
  SOURCE_ASPECT_RATIOS,
} from "../constants";
import type { LcdVideoWallInputs } from "../types";
import {
  calculateLcdVideoWall,
  formatMeters,
  formatMillimeters,
  formatResolution,
  getAspectRatioValidation,
  getLcdValidationMessages,
  getVideoProcessorRecommendation,
  sanitizeBezelSize,
  sanitizePanelCount,
} from "../utils";
import { AspectRatioValidationCard } from "./aspect-ratio-validation-card";
import { HelpTooltip } from "./help-tooltip";
import { LcdResultsPanel } from "./lcd-results-panel";
import { PanelLayoutPreview } from "./panel-layout-preview";
import { VideoProcessorRecommendationCard } from "./video-processor-recommendation-card";

export function LcdVideoWallCalculator() {
  const [inputs, setInputs] = useState<LcdVideoWallInputs>({
    ...DEFAULT_LCD_INPUTS,
  });
  const [bezelMode, setBezelMode] = useState<string>(
    String(DEFAULT_LCD_INPUTS.bezelSizeMm),
  );

  const result = useMemo(() => calculateLcdVideoWall(inputs), [inputs]);
  const validationMessages = useMemo(
    () => getLcdValidationMessages(inputs, result),
    [inputs, result],
  );
  const aspectRatioValidation = useMemo(
    () => getAspectRatioValidation(inputs, result),
    [inputs, result],
  );
  const processorRecommendation = useMemo(
    () => getVideoProcessorRecommendation(inputs, result),
    [inputs, result],
  );

  function updateInputs(nextInputs: Partial<LcdVideoWallInputs>) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      ...nextInputs,
    }));
  }

  function handleBezelModeChange(value: string) {
    setBezelMode(value);

    if (value !== "custom") {
      updateInputs({ bezelSizeMm: sanitizeBezelSize(Number(value)) });
    }
  }

  function resetDefaults() {
    setInputs({ ...DEFAULT_LCD_INPUTS });
    setBezelMode(String(DEFAULT_LCD_INPUTS.bezelSizeMm));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)]">
      <Card className="h-fit xl:sticky xl:top-24">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Display wall inputs</CardTitle>
              <CardDescription>
                Configure the LCD panel, bezel, source aspect ratio, and tiled
                layout.
              </CardDescription>
            </div>
            <div className="rounded-md border px-2.5 py-1 text-xs font-medium text-primary">
              Live
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="panel-size">
                <HelpTooltip
                  label="Panel size"
                  tooltip="Diagonal LCD panel size. Physical width and height are derived from a 16:9 panel."
                />
              </Label>
              <Select
                id="panel-size"
                onChange={(event) =>
                  updateInputs({
                    panelSizeInches: Number(event.target.value) as
                      LcdVideoWallInputs["panelSizeInches"],
                  })
                }
                value={String(inputs.panelSizeInches)}
              >
                {PANEL_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {`${size}"`}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="panel-resolution">
                <HelpTooltip
                  label="Panel resolution"
                  tooltip="Native resolution of each LCD panel before tiling."
                />
              </Label>
              <Select
                id="panel-resolution"
                onChange={(event) => {
                  const resolution = PANEL_RESOLUTIONS.find(
                    (item) => item.label === event.target.value,
                  );

                  if (resolution) {
                    updateInputs({ panelResolution: resolution });
                  }
                }}
                value={inputs.panelResolution.label}
              >
                {PANEL_RESOLUTIONS.map((resolution) => (
                  <option key={resolution.label} value={resolution.label}>
                    {resolution.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bezel-size">
                <HelpTooltip
                  label="Bezel size"
                  tooltip="Visible panel-to-panel gap. Choose Custom for project-specific bezels."
                />
              </Label>
              <Select
                id="bezel-size"
                onChange={(event) => handleBezelModeChange(event.target.value)}
                value={bezelMode}
              >
                {BEZEL_SIZES_MM.map((bezel) => (
                  <option key={bezel.label} value={bezel.value}>
                    {bezel.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-bezel">
                <HelpTooltip
                  label="Custom bezel"
                  tooltip="Enabled only when Bezel size is set to Custom. Values are limited to 0-25 mm."
                />
              </Label>
              <Input
                disabled={bezelMode !== "custom"}
                id="custom-bezel"
                max={25}
                min={0}
                onChange={(event) =>
                  updateInputs({
                    bezelSizeMm: sanitizeBezelSize(Number(event.target.value)),
                  })
                }
                step="0.01"
                type="number"
                value={inputs.bezelSizeMm}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="horizontal-panels">
                <HelpTooltip
                  label="Horizontal panels"
                  tooltip="Number of LCD panels across the width of the wall. Limited to 1-20 for initial design sizing."
                />
              </Label>
              <Input
                id="horizontal-panels"
                max={20}
                min={1}
                onChange={(event) =>
                  updateInputs({
                    horizontalPanels: sanitizePanelCount(
                      Number(event.target.value),
                    ),
                  })
                }
                step={1}
                type="number"
                value={inputs.horizontalPanels}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vertical-panels">
                <HelpTooltip
                  label="Vertical panels"
                  tooltip="Number of LCD panels across the height of the wall. Limited to 1-20 for initial design sizing."
                />
              </Label>
              <Input
                id="vertical-panels"
                max={20}
                min={1}
                onChange={(event) =>
                  updateInputs({
                    verticalPanels: sanitizePanelCount(
                      Number(event.target.value),
                    ),
                  })
                }
                step={1}
                type="number"
                value={inputs.verticalPanels}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source-aspect-ratio">
              <HelpTooltip
                label="Source content aspect ratio"
                tooltip="Primary content canvas used to validate whether scaling, cropping, or letterboxing may be required."
              />
            </Label>
            <Select
              id="source-aspect-ratio"
              onChange={(event) => {
                const aspectRatio = SOURCE_ASPECT_RATIOS.find(
                  (item) => item.label === event.target.value,
                );

                if (aspectRatio) {
                  updateInputs({ sourceAspectRatio: aspectRatio });
                }
              }}
              value={inputs.sourceAspectRatio.label}
            >
              {SOURCE_ASPECT_RATIOS.map((aspectRatio) => (
                <option key={aspectRatio.label} value={aspectRatio.label}>
                  {aspectRatio.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Info className="size-4 text-primary" />
              Real-time configuration
            </div>
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Layout</p>
                <p className="font-medium">
                  {result.horizontalPanels} x {result.verticalPanels} panels
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total panels</p>
                <p className="font-medium">{result.totalPanels}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Approx. size</p>
                <p className="font-medium">
                  {formatMeters(result.totalWidthMm)} x{" "}
                  {formatMeters(result.totalHeightMm)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Native canvas</p>
                <p className="font-medium">
                  {formatResolution(
                    result.overallResolutionWidth,
                    result.overallResolutionHeight,
                  )}
                </p>
              </div>
            </div>
          </div>

          <Button onClick={resetDefaults} type="button" variant="outline">
            Reset defaults
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <LcdResultsPanel result={result} />
        <AspectRatioValidationCard validation={aspectRatioValidation} />

        <div className="space-y-3">
          {validationMessages.map((message) => {
            const Icon =
              message.severity === "success" ? CheckCircle2 : AlertTriangle;
            const tone =
              message.severity === "success"
                ? "border-green-500/40 bg-green-500/10"
                : message.severity === "error"
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-yellow-500/50 bg-yellow-500/10";
            const iconTone =
              message.severity === "success"
                ? "text-green-400"
                : message.severity === "error"
                  ? "text-red-400"
                  : "text-yellow-400";

            return (
              <Alert className={tone} key={message.id}>
                <div className="flex gap-3">
                  <Icon className={`mt-0.5 size-5 shrink-0 ${iconTone}`} />
                  <div>
                    <p className="font-medium">{message.title}</p>
                    <p className="mt-1 text-muted-foreground">
                      {message.description}
                    </p>
                  </div>
                </div>
              </Alert>
            );
          })}
        </div>

        <VideoProcessorRecommendationCard
          recommendation={processorRecommendation}
        />

        <Card>
          <CardContent className="p-5">
            <PanelLayoutPreview
              horizontalPanels={result.horizontalPanels}
              result={result}
              verticalPanels={result.verticalPanels}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Panel detail</CardTitle>
            <CardDescription>
              Physical panel dimensions are derived from a 16:9 active display
              area.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-md border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Ruler className="size-4" />
                <span>Single panel width</span>
              </div>
              <p className="mt-1 font-medium">
                {formatMillimeters(result.panelWidthMm)}
              </p>
            </div>
            <div className="rounded-md border bg-background p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Ruler className="size-4" />
                <span>Single panel height</span>
              </div>
              <p className="mt-1 font-medium">
                {formatMillimeters(result.panelHeightMm)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
