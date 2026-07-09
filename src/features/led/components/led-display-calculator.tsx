"use client";

import { ChevronDown, Grid3X3, RotateCcw, Settings2, Wand2 } from "lucide-react";

import { HelpTooltip } from "@/components/shared/help-tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLedCalculator } from "../hooks";
import type { LedCalculatorMode, LedEnvironment } from "../types";
import { LedCabinetPreview } from "./led-cabinet-preview";
import { LedInsightsPanel } from "./led-insights-panel";
import { LedRecommendedSetupCard } from "./led-recommended-setup-card";
import { LedResultsPanel } from "./led-results-panel";

const modeOptions: Array<{
  description: string;
  icon: typeof Wand2;
  label: string;
  value: LedCalculatorMode;
}> = [
  {
    description: "Target size in, recommended pitch and cabinets out.",
    icon: Wand2,
    label: "Smart",
    value: "smart",
  },
  {
    description: "Direct cabinet dimensions and cabinet counts.",
    icon: Settings2,
    label: "Advanced",
    value: "advanced",
  },
];

export function LedDisplayCalculator() {
  const {
    activeInsights,
    activeResult,
    advancedDrafts,
    commitCabinetHeightDraft,
    commitCabinetWidthDraft,
    commitHorizontalCabinetsDraft,
    commitTargetHeightDraft,
    commitTargetWidthDraft,
    commitVerticalCabinetsDraft,
    inputs,
    mode,
    resetDefaults,
    setMode,
    smartDrafts,
    smartInputs,
    smartRecommendation,
    updateCabinetHeightDraft,
    updateCabinetWidthDraft,
    updateHorizontalCabinetsDraft,
    updateInputs,
    updatePixelPitch,
    updateSmartInputs,
    updateTargetHeightDraft,
    updateTargetWidthDraft,
    updateVerticalCabinetsDraft,
  } = useLedCalculator();

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)]">
      <Card className="h-fit xl:sticky xl:top-24">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>LED display inputs</CardTitle>
              <CardDescription>
                Choose Smart Mode for target sizing or Advanced Mode for direct
                cabinet planning.
              </CardDescription>
            </div>
            <div className="rounded-md border px-2.5 py-1 text-xs font-medium text-primary">
              Live
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2 rounded-lg border bg-muted/30 p-1 sm:grid-cols-2">
            {modeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = option.value === mode;

              return (
                <button
                  className={cn(
                    "rounded-md px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                  )}
                  key={option.value}
                  onClick={() => setMode(option.value)}
                  type="button"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Icon className="size-4 text-primary" />
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>

          {mode === "smart" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="target-width">
                    <HelpTooltip
                      label="Target Width"
                      tooltip="Desired finished LED display width in meters. Smart Mode finds the closest standard cabinet layout."
                    />
                  </Label>
                  <Input
                    id="target-width"
                    min={0.5}
                    onBlur={commitTargetWidthDraft}
                    onChange={(event) =>
                      updateTargetWidthDraft(event.target.value)
                    }
                    step="0.1"
                    type="number"
                    value={smartDrafts.targetWidthMeters}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-height">
                    <HelpTooltip
                      label="Target Height"
                      tooltip="Desired finished LED display height in meters. Values are kept editable while typing and validated on blur."
                    />
                  </Label>
                  <Input
                    id="target-height"
                    min={0.5}
                    onBlur={commitTargetHeightDraft}
                    onChange={(event) =>
                      updateTargetHeightDraft(event.target.value)
                    }
                    step="0.1"
                    type="number"
                    value={smartDrafts.targetHeightMeters}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smart-environment">Environment</Label>
                <Select
                  id="smart-environment"
                  onChange={(event) =>
                    updateSmartInputs({
                      environment: event.target.value as LedEnvironment,
                    })
                  }
                  value={smartInputs.environment}
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pixel-pitch">
                    <HelpTooltip
                      label="Pixel Pitch"
                      tooltip="Distance in millimeters between LED pixels. Smaller pitch supports closer viewing and higher resolution."
                    />
                  </Label>
                  <Input
                    id="pixel-pitch"
                    max={25}
                    min={0.7}
                    onChange={(event) =>
                      updatePixelPitch(Number(event.target.value))
                    }
                    step="0.1"
                    type="number"
                    value={inputs.pixelPitchMm}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select
                    id="environment"
                    onChange={(event) =>
                      updateInputs({
                        environment: event.target.value as LedEnvironment,
                      })
                    }
                    value={inputs.environment}
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </Select>
                </div>
              </div>

              <Collapsible>
                <div className="rounded-lg border">
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 p-4 text-left">
                    <span className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Grid3X3 className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">
                          Cabinet planner
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          Tune dimensions and cabinet matrix.
                        </span>
                      </span>
                    </span>
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-0 border-t p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cabinet-width">
                          <HelpTooltip
                            label="Cabinet Width"
                            tooltip="Physical width of one LED cabinet in millimeters."
                          />
                        </Label>
                        <Input
                          id="cabinet-width"
                          onBlur={commitCabinetWidthDraft}
                          onChange={(event) =>
                            updateCabinetWidthDraft(event.target.value)
                          }
                          step="0.5"
                          type="number"
                          value={advancedDrafts.cabinetWidthMm}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cabinet-height">
                          <HelpTooltip
                            label="Cabinet Height"
                            tooltip="Physical height of one LED cabinet in millimeters."
                          />
                        </Label>
                        <Input
                          id="cabinet-height"
                          onBlur={commitCabinetHeightDraft}
                          onChange={(event) =>
                            updateCabinetHeightDraft(event.target.value)
                          }
                          step="0.5"
                          type="number"
                          value={advancedDrafts.cabinetHeightMm}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horizontal-cabinets">
                          Horizontal cabinets
                        </Label>
                        <Input
                          id="horizontal-cabinets"
                          onBlur={commitHorizontalCabinetsDraft}
                          onChange={(event) =>
                            updateHorizontalCabinetsDraft(event.target.value)
                          }
                          step={1}
                          type="number"
                          value={advancedDrafts.horizontalCabinets}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vertical-cabinets">
                          Vertical cabinets
                        </Label>
                        <Input
                          id="vertical-cabinets"
                          onBlur={commitVerticalCabinetsDraft}
                          onChange={(event) =>
                            updateVerticalCabinetsDraft(event.target.value)
                          }
                          step={1}
                          type="number"
                          value={advancedDrafts.verticalCabinets}
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </>
          )}

          <div className="rounded-lg border bg-muted/40 p-4">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              {mode === "smart" ? (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Target size
                    </p>
                    <p className="font-medium">
                      {smartInputs.targetWidthMeters.toFixed(2)} x{" "}
                      {smartInputs.targetHeightMeters.toFixed(2)} m
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Cabinet format
                    </p>
                    <p className="font-medium">
                      {smartRecommendation.cabinetOption.label}
                    </p>
                  </div>
                </>
              ) : null}
              <div>
                <p className="text-xs text-muted-foreground">Cabinet matrix</p>
                <p className="font-medium">
                  {activeResult.horizontalCabinets} x{" "}
                  {activeResult.verticalCabinets}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total cabinets</p>
                <p className="font-medium">{activeResult.totalCabinets}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Viewing range</p>
                <p className="font-medium">
                  {activeInsights.viewingDistance.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pitch class</p>
                <p className="font-medium">
                  {activeInsights.pitchGuidance.title}
                </p>
              </div>
            </div>
          </div>

          <Button onClick={resetDefaults} type="button" variant="outline">
            <RotateCcw />
            Reset defaults
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {mode === "smart" ? (
          <LedRecommendedSetupCard recommendation={smartRecommendation} />
        ) : null}
        <LedResultsPanel result={activeResult} />
        <LedInsightsPanel insights={activeInsights} />
        <Card>
          <CardContent className="p-5">
            <LedCabinetPreview result={activeResult} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
