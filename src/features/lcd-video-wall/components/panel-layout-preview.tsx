import type { LcdVideoWallResult } from "../types";
import { formatMeters } from "../utils";

type PanelLayoutPreviewProps = {
  horizontalPanels: number;
  verticalPanels: number;
  result: LcdVideoWallResult;
};

export function PanelLayoutPreview({
  horizontalPanels,
  result,
  verticalPanels,
}: PanelLayoutPreviewProps) {
  const safeHorizontalPanels = Math.max(1, Math.round(horizontalPanels));
  const safeVerticalPanels = Math.max(1, Math.round(verticalPanels));
  const panelCount = safeHorizontalPanels * safeVerticalPanels;
  const panels = Array.from({ length: Math.min(panelCount, 144) }, (_, index) =>
    index + 1,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Panel layout preview</p>
          <p className="text-xs text-muted-foreground">
            {safeHorizontalPanels} x {safeVerticalPanels} tiled LCD matrix
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>{formatMeters(result.totalWidthMm)} wide</p>
          <p>{formatMeters(result.totalHeightMm)} high</p>
        </div>
      </div>
      <div className="rounded-lg border bg-background p-4">
        <div className="mx-auto flex max-h-[420px] max-w-full items-center justify-center overflow-auto rounded-md bg-muted p-3">
          <div
            aria-label={`${safeHorizontalPanels} by ${safeVerticalPanels} panel layout preview`}
            className="grid min-w-48 gap-1"
            role="img"
            style={{
              aspectRatio: `${result.totalWidthMm} / ${result.totalHeightMm}`,
              gridTemplateColumns: `repeat(${safeHorizontalPanels}, minmax(28px, 1fr))`,
              width: "min(100%, 620px)",
            }}
          >
            {panels.map((panelNumber) => (
              <div
                className="flex aspect-video min-h-8 items-center justify-center rounded-sm border border-primary/30 bg-card text-[10px] font-medium text-muted-foreground shadow-sm"
                key={panelNumber}
              >
                {panelNumber <= 99 ? panelNumber : null}
              </div>
            ))}
          </div>
        </div>
        {panelCount > panels.length ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Preview is capped at 144 panels for browser performance. Results
            still use the full entered layout.
          </p>
        ) : null}
      </div>
    </div>
  );
}
