"use client";

import { ChevronDown, Cpu, Grid3X3, Settings2, Zap } from "lucide-react";

import { LedGrid } from "@/components/led/led-grid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  formatMeters,
  formatMillimeters,
  type LedCalculationResult,
} from "@/lib/led-utils";

type LedAdvancedToolsProps = {
  cabinetHeightMm: string;
  cabinetWidthMm: string;
  overrideColumns: string;
  overrideRows: string;
  result: LedCalculationResult;
  onCabinetHeightBlur: () => void;
  onCabinetHeightChange: (value: string) => void;
  onCabinetWidthBlur: () => void;
  onCabinetWidthChange: (value: string) => void;
  onOverrideColumnsBlur: () => void;
  onOverrideColumnsChange: (value: string) => void;
  onOverrideRowsBlur: () => void;
  onOverrideRowsChange: (value: string) => void;
};

export function LedAdvancedTools({
  cabinetHeightMm,
  cabinetWidthMm,
  onCabinetHeightBlur,
  onCabinetHeightChange,
  onCabinetWidthBlur,
  onCabinetWidthChange,
  onOverrideColumnsBlur,
  onOverrideColumnsChange,
  onOverrideRowsBlur,
  onOverrideRowsChange,
  overrideColumns,
  overrideRows,
  result,
}: LedAdvancedToolsProps) {
  return (
    <Collapsible>
      <Card>
        <CollapsibleTrigger className="w-full rounded-lg text-left">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Settings2 className="size-5" />
              </div>
              <div>
                <CardTitle>Advanced Tools</CardTitle>
                <CardDescription>
                  Cabinet planning and deeper engineering tools.
                </CardDescription>
              </div>
            </div>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-0">
          <CardContent className="space-y-5 border-t p-5">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Grid3X3 className="size-5" />
                  </div>
                  <div>
                    <CardTitle>Cabinet Planner</CardTitle>
                    <CardDescription>
                      Fine tune cabinet dimensions, layout override, and grid
                      preview.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="cabinet-width">Cabinet Width (mm)</Label>
                    <Input
                      id="cabinet-width"
                      onBlur={onCabinetWidthBlur}
                      onChange={(event) =>
                        onCabinetWidthChange(event.target.value)
                      }
                      step="0.5"
                      type="number"
                      value={cabinetWidthMm}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cabinet-height">Cabinet Height (mm)</Label>
                    <Input
                      id="cabinet-height"
                      onBlur={onCabinetHeightBlur}
                      onChange={(event) =>
                        onCabinetHeightChange(event.target.value)
                      }
                      step="0.5"
                      type="number"
                      value={cabinetHeightMm}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="override-columns">Override columns</Label>
                    <Input
                      id="override-columns"
                      onBlur={onOverrideColumnsBlur}
                      onChange={(event) =>
                        onOverrideColumnsChange(event.target.value)
                      }
                      placeholder="Auto"
                      step={1}
                      type="number"
                      value={overrideColumns}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="override-rows">Override rows</Label>
                    <Input
                      id="override-rows"
                      onBlur={onOverrideRowsBlur}
                      onChange={(event) =>
                        onOverrideRowsChange(event.target.value)
                      }
                      placeholder="Auto"
                      step={1}
                      type="number"
                      value={overrideRows}
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-md border bg-background p-4">
                    <p className="text-xs text-muted-foreground">
                      Cabinet size
                    </p>
                    <p className="mt-1 font-medium">
                      {formatMillimeters(result.cabinetWidthMm)} x{" "}
                      {formatMillimeters(result.cabinetHeightMm)}
                    </p>
                  </div>
                  <div className="rounded-md border bg-background p-4">
                    <p className="text-xs text-muted-foreground">
                      Cabinet layout
                    </p>
                    <p className="mt-1 font-medium">
                      {result.columns} x {result.rows}
                    </p>
                  </div>
                  <div className="rounded-md border bg-background p-4">
                    <p className="text-xs text-muted-foreground">
                      Actual size
                    </p>
                    <p className="mt-1 font-medium">
                      {formatMeters(result.actualWidthMeters)} x{" "}
                      {formatMeters(result.actualHeightMeters)}
                    </p>
                  </div>
                </div>
                <LedGrid result={result} />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base">
                    Processor Calculator
                  </CardTitle>
                  <Cpu className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base">Power Calculator</CardTitle>
                  <Zap className="size-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Coming soon</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
