export type LedEnvironment = "indoor" | "outdoor";

export type LedFitStatus = "perfect" | "minor" | "poor";

export type LedCalculatorInput = {
  pixelPitch: number;
  targetWidthMeters: number;
  targetHeightMeters: number;
  environment: LedEnvironment;
  cabinetWidthMm: number;
  cabinetHeightMm: number;
  overrideColumns?: number;
  overrideRows?: number;
};

export type LedCalculationResult = {
  pixelPitch: number;
  environment: LedEnvironment;
  cabinetWidthMm: number;
  cabinetHeightMm: number;
  columns: number;
  rows: number;
  targetWidthMeters: number;
  targetHeightMeters: number;
  actualWidthMeters: number;
  actualHeightMeters: number;
  resolutionWidth: number;
  resolutionHeight: number;
  totalPixels: number;
  aspectRatio: string;
  fitStatus: LedFitStatus;
  fitLabel: string;
  fitDescription: string;
  viewingDistanceMinMeters: number;
  viewingDistanceMaxMeters: number;
};

export const LED_PIXEL_PITCH_OPTIONS = [1.2, 1.5, 1.8, 2.5, 3.9, 4.8] as const;

export const DEFAULT_LED_CABINET = {
  widthMm: 600,
  heightMm: 337.5,
};

const MIN_TARGET_METERS = 0.1;
const MAX_TARGET_METERS = 100;
const MIN_CABINET_MM = 100;
const MAX_CABINET_MM = 3000;
const MAX_LAYOUT_COUNT = 200;

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function greatestCommonDivisor(first: number, second: number) {
  let a = Math.abs(Math.round(first));
  let b = Math.abs(Math.round(second));

  while (b > 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a || 1;
}

export function sanitizeMeters(value: number) {
  return Number(clamp(value, MIN_TARGET_METERS, MAX_TARGET_METERS).toFixed(2));
}

export function sanitizeMillimeters(value: number) {
  return Number(clamp(value, MIN_CABINET_MM, MAX_CABINET_MM).toFixed(1));
}

export function sanitizeLayoutCount(value: number) {
  return Math.round(clamp(value, 1, MAX_LAYOUT_COUNT));
}

export function sanitizeOptionalLayoutCount(value: number | undefined) {
  if (value === undefined || !Number.isFinite(value)) {
    return undefined;
  }

  return sanitizeLayoutCount(value);
}

export function simplifyAspectRatio(width: number, height: number) {
  const divisor = greatestCommonDivisor(width, height);

  return `${Math.round(width / divisor)}:${Math.round(height / divisor)}`;
}

export function getLedFitStatus(
  actualWidthMm: number,
  actualHeightMm: number,
  targetWidthMm: number,
  targetHeightMm: number,
) {
  const widthDiff = Math.abs(actualWidthMm - targetWidthMm) / targetWidthMm;
  const heightDiff = Math.abs(actualHeightMm - targetHeightMm) / targetHeightMm;

  if (widthDiff < 0.02 && heightDiff < 0.02) {
    return {
      fitStatus: "perfect" as const,
      fitLabel: "Perfect Fit",
      fitDescription: "Both dimensions are within 2% of the requested size.",
    };
  }

  if (widthDiff < 0.1 && heightDiff < 0.1) {
    return {
      fitStatus: "minor" as const,
      fitLabel: "Minor Gap",
      fitDescription: "The cabinet layout is within 10% of the requested size.",
    };
  }

  return {
    fitStatus: "poor" as const,
    fitLabel: "Poor Fit",
    fitDescription:
      "The selected cabinet size or override layout differs significantly from the requested size.",
  };
}

export function calculateLedDisplay(
  input: LedCalculatorInput,
): LedCalculationResult {
  const pixelPitch = clamp(input.pixelPitch, 0.1, 25);
  const targetWidthMeters = sanitizeMeters(input.targetWidthMeters);
  const targetHeightMeters = sanitizeMeters(input.targetHeightMeters);
  const cabinetWidthMm = sanitizeMillimeters(input.cabinetWidthMm);
  const cabinetHeightMm = sanitizeMillimeters(input.cabinetHeightMm);
  const targetWidthMm = targetWidthMeters * 1000;
  const targetHeightMm = targetHeightMeters * 1000;
  const columns =
    sanitizeOptionalLayoutCount(input.overrideColumns) ??
    Math.max(1, Math.floor(targetWidthMm / cabinetWidthMm));
  const rows =
    sanitizeOptionalLayoutCount(input.overrideRows) ??
    Math.max(1, Math.floor(targetHeightMm / cabinetHeightMm));
  const actualWidthMm = columns * cabinetWidthMm;
  const actualHeightMm = rows * cabinetHeightMm;
  const resolutionWidth = Math.round(actualWidthMm / pixelPitch);
  const resolutionHeight = Math.round(actualHeightMm / pixelPitch);
  const fit = getLedFitStatus(
    actualWidthMm,
    actualHeightMm,
    targetWidthMm,
    targetHeightMm,
  );

  return {
    pixelPitch,
    environment: input.environment,
    cabinetWidthMm,
    cabinetHeightMm,
    columns,
    rows,
    targetWidthMeters,
    targetHeightMeters,
    actualWidthMeters: actualWidthMm / 1000,
    actualHeightMeters: actualHeightMm / 1000,
    resolutionWidth,
    resolutionHeight,
    totalPixels: resolutionWidth * resolutionHeight,
    aspectRatio: simplifyAspectRatio(resolutionWidth, resolutionHeight),
    viewingDistanceMinMeters: pixelPitch * 1.5,
    viewingDistanceMaxMeters: pixelPitch * 3,
    ...fit,
  };
}

export function formatMeters(value: number) {
  return `${value.toFixed(2)} m`;
}

export function formatMillimeters(value: number) {
  return `${Number(value.toFixed(1)).toLocaleString()} mm`;
}

export function formatResolution(width: number, height: number) {
  return `${width.toLocaleString()} x ${height.toLocaleString()}`;
}

export function formatPixels(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)} MP`;
  }

  return `${value.toLocaleString()} px`;
}

export function formatViewingDistance(result: LedCalculationResult) {
  return `${formatMeters(result.viewingDistanceMinMeters)} - ${formatMeters(
    result.viewingDistanceMaxMeters,
  )}`;
}
