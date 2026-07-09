import type { LedCalculationResult } from "@/lib/led-utils";

type LedGridProps = {
  result: LedCalculationResult;
};

export function LedGrid({ result }: LedGridProps) {
  const cabinetCount = result.columns * result.rows;
  const cabinets = Array.from({ length: Math.min(cabinetCount, 240) }, (_, i) => i + 1);

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Visual Cabinet Preview</h2>
          <p className="text-sm text-muted-foreground">
            {result.columns} columns x {result.rows} rows
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {result.totalPixels.toLocaleString()} pixels
        </p>
      </div>
      <div className="flex max-h-[420px] overflow-auto rounded-md border bg-muted p-4">
        <div
          aria-label={`${result.columns} by ${result.rows} LED cabinet preview`}
          className="grid min-w-48 gap-1"
          role="img"
          style={{
            aspectRatio: `${result.actualWidthMeters} / ${result.actualHeightMeters}`,
            gridTemplateColumns: `repeat(${result.columns}, minmax(30px, 1fr))`,
            width: "min(100%, 760px)",
          }}
        >
          {cabinets.map((cabinet) => (
            <div
              className="flex aspect-[16/9] min-h-8 items-center justify-center rounded-sm border border-primary/30 bg-background text-[10px] font-medium text-muted-foreground"
              key={cabinet}
            >
              {cabinet <= 99 ? cabinet : null}
            </div>
          ))}
        </div>
      </div>
      {cabinetCount > cabinets.length ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Preview is capped for browser performance; calculations still use the
          full cabinet layout.
        </p>
      ) : null}
    </div>
  );
}
