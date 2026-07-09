export type LedEnvironment = "indoor" | "outdoor";

export type LedCalculatorMode = "smart" | "advanced";

export type LedCalculatorInputs = {
  pixelPitchMm: number;
  cabinetWidthMm: number;
  cabinetHeightMm: number;
  horizontalCabinets: number;
  verticalCabinets: number;
  environment: LedEnvironment;
};

export type LedSmartInputs = {
  targetWidthMeters: number;
  targetHeightMeters: number;
  environment: LedEnvironment;
};

export type LedCabinetOption = {
  label: string;
  widthMm: number;
  heightMm: number;
};

export type LedCalculatorResult = {
  pixelPitchMm: number;
  cabinetWidthMm: number;
  cabinetHeightMm: number;
  horizontalCabinets: number;
  verticalCabinets: number;
  totalCabinets: number;
  totalWidthMeters: number;
  totalHeightMeters: number;
  resolutionWidth: number;
  resolutionHeight: number;
  totalPixels: number;
  aspectRatio: number;
  aspectRatioLabel: string;
};

export type LedPitchGuidance = {
  title: string;
  description: string;
};

export type LedViewingDistance = {
  minimumMeters: number;
  maximumMeters: number;
  label: string;
};

export type LedAspectFeedback = {
  severity: "success" | "warning";
  title: string;
  description: string;
  differencePercent: number;
};

export type LedInsights = {
  pitchGuidance: LedPitchGuidance;
  viewingDistance: LedViewingDistance;
  aspectFeedback: LedAspectFeedback;
  notes: string[];
};

export type LedSmartFitQuality = {
  label: string;
  description: string;
  unusedWidthMeters: number;
  unusedHeightMeters: number;
  sizeDifferencePercent: number;
};

export type LedSmartRecommendation = {
  inputs: LedCalculatorInputs;
  result: LedCalculatorResult;
  insights: LedInsights;
  cabinetOption: LedCabinetOption;
  fitQuality: LedSmartFitQuality;
  assumedViewingDistanceMeters: number;
};
