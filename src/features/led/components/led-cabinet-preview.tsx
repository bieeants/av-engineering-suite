import type { LedCalculatorResult } from "../types";
import { formatMeters } from "../calculator";

type LedCabinetPreviewProps = {
  result: LedCalculatorResult;
};

export function LedCabinetPreview({ result }: LedCabinetPreviewProps) {
  const cabinetCount = result.horizontalCabinets * result.verticalCabinets;
  const cabinets = Array.from(
    { length: Math.min(cabinetCount, 200) },
    (_, index) => index + 1,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Cabinet layout preview</p>
          <p className="text-xs text-muted-foreground">
            {result.horizontalCabinets} x {result.verticalCabinets} LED cabinet
            matrix
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>{formatMeters(result.totalWidthMeters)} wide</p>
          <p>{formatMeters(result.totalHeightMeters)} high</p>
        </div>
      </div>
      <div className="rounded-lg border bg-background p-4">
        <div className="mx-auto flex max-h-[420px] max-w-full items-center justify-center overflow-auto rounded-md bg-muted p-3">
          <div
            aria-label={`${result.horizontalCabinets} by ${result.verticalCabinets} LED cabinet layout preview`}
            className="grid min-w-48 gap-1"
            role="img"
            style={{
              aspectRatio: `${result.totalWidthMeters} / ${result.totalHeightMeters}`,
              gridTemplateColumns: `repeat(${result.horizontalCabinets}, minmax(28px, 1fr))`,
              width: "min(100%, 640px)",
            }}
          >
            {cabinets.map((cabinetNumber) => (
              <div
                className="flex aspect-[16/9] min-h-8 items-center justify-center rounded-sm border border-primary/30 bg-card text-[10px] font-medium text-muted-foreground shadow-sm"
                key={cabinetNumber}
              >
                {cabinetNumber <= 99 ? cabinetNumber : null}
              </div>
            ))}
          </div>
        </div>
        {cabinetCount > cabinets.length ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Preview is capped at 200 cabinets for browser performance. Results
            still use the full entered layout.
          </p>
        ) : null}
      </div>
    </div>
  );
}
