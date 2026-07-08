import type { PanelResolution, PanelSize, SourceAspectRatio } from "./types";

export const PANEL_SIZES: PanelSize[] = [46, 49, 55, 65];

export const PANEL_RESOLUTIONS: PanelResolution[] = [
  {
    label: "1920 x 1080",
    width: 1920,
    height: 1080,
  },
  {
    label: "3840 x 2160",
    width: 3840,
    height: 2160,
  },
];

export const BEZEL_SIZES_MM = [
  {
    label: "0.88 mm",
    value: 0.88,
  },
  {
    label: "1.7 mm",
    value: 1.7,
  },
  {
    label: "3.5 mm",
    value: 3.5,
  },
  {
    label: "Custom",
    value: "custom",
  },
] as const;

export const SOURCE_ASPECT_RATIOS: SourceAspectRatio[] = [
  {
    label: "16:9 standard content",
    value: 16 / 9,
  },
  {
    label: "21:9 ultrawide content",
    value: 21 / 9,
  },
  {
    label: "4:3 legacy content",
    value: 4 / 3,
  },
  {
    label: "1:1 square content",
    value: 1,
  },
];

export const DEFAULT_LCD_INPUTS = {
  panelSizeInches: 55,
  panelResolution: PANEL_RESOLUTIONS[0],
  bezelSizeMm: 0.88,
  horizontalPanels: 3,
  verticalPanels: 3,
  sourceAspectRatio: SOURCE_ASPECT_RATIOS[0],
} as const;
