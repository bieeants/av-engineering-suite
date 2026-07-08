export type PanelSize = 46 | 49 | 55 | 65;

export type PanelResolution = {
  label: string;
  width: number;
  height: number;
};

export type SourceAspectRatio = {
  label: string;
  value: number;
};

export type LcdVideoWallInputs = {
  panelSizeInches: PanelSize;
  panelResolution: PanelResolution;
  bezelSizeMm: number;
  horizontalPanels: number;
  verticalPanels: number;
  sourceAspectRatio: SourceAspectRatio;
};

export type LcdVideoWallResult = {
  horizontalPanels: number;
  verticalPanels: number;
  panelWidthMm: number;
  panelHeightMm: number;
  totalWidthMm: number;
  totalHeightMm: number;
  totalWidthInches: number;
  totalHeightInches: number;
  overallResolutionWidth: number;
  overallResolutionHeight: number;
  aspectRatio: number;
  aspectRatioLabel: string;
  totalPanels: number;
  hasAspectRatioMismatch: boolean;
  aspectRatioDifferencePercent: number;
};

export type ValidationSeverity = "error" | "warning" | "success";

export type AspectRatioValidation = {
  severity: ValidationSeverity;
  title: string;
  description: string;
  differencePercent: number;
};

export type LcdValidationMessage = {
  id: string;
  severity: ValidationSeverity;
  title: string;
  description: string;
};

export type VideoProcessorRecommendation = {
  processorClass: string;
  minimumInputConfiguration: string;
  minimumOutputConfiguration: string;
  canvasRequirement: string;
  notes: string[];
};
