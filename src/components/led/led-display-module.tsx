"use client";

import { LedAdvancedTools } from "@/components/led/led-advanced-tools";
import { LedInput } from "@/components/led/led-input";
import { LedInsight } from "@/components/led/led-insight";
import { LedResult } from "@/components/led/led-result";
import { useLedCalculator } from "@/hooks/use-led-calculator";

export function LedDisplayModule() {
  const {
    result,
    state,
    commitCabinetHeight,
    commitCabinetWidth,
    commitOverrideColumns,
    commitOverrideRows,
    updateCabinetHeight,
    updateCabinetWidth,
    updateEnvironment,
    updateOverrideColumns,
    updateOverrideRows,
    updatePixelPitch,
    updateTargetHeight,
    updateTargetWidth,
  } = useLedCalculator();

  return (
    <div className="space-y-6">
      <LedInput
        environment={state.environment}
        heightMeters={state.targetHeightMeters}
        onEnvironmentChange={updateEnvironment}
        onHeightChange={updateTargetHeight}
        onPixelPitchChange={updatePixelPitch}
        onWidthChange={updateTargetWidth}
        pixelPitch={state.pixelPitch}
        widthMeters={state.targetWidthMeters}
      />
      <LedResult result={result} />
      <LedInsight result={result} />
      <LedAdvancedTools
        cabinetHeightMm={state.cabinetHeightDraft}
        cabinetWidthMm={state.cabinetWidthDraft}
        onCabinetHeightBlur={commitCabinetHeight}
        onCabinetHeightChange={updateCabinetHeight}
        onCabinetWidthBlur={commitCabinetWidth}
        onCabinetWidthChange={updateCabinetWidth}
        onOverrideColumnsBlur={commitOverrideColumns}
        onOverrideColumnsChange={updateOverrideColumns}
        onOverrideRowsBlur={commitOverrideRows}
        onOverrideRowsChange={updateOverrideRows}
        overrideColumns={state.overrideColumnsDraft}
        overrideRows={state.overrideRowsDraft}
        result={result}
      />
    </div>
  );
}
