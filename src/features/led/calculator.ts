import type {
  LedCabinetOption,
  LedCalculatorInputs,
  LedCalculatorResult,
  LedEnvironment,
  LedInsights,
  LedSmartInputs,
  LedSmartRecommendation,
} from "./types";

const MIN_PIXEL_PITCH_MM = 0.7;
const MAX_PIXEL_PITCH_MM = 25;
const MIN_CABINET_MM = 100;
const MAX_CABINET_MM = 2000;
const MAX_CABINET_AXIS_COUNT = 40;
const ASPECT_RATIO_IDEAL = 16 / 9;
const ASPECT_RATIO_CLOSE_THRESHOLD = 0.05;
const MIN_TARGET_METERS = 0.5;
const MAX_TARGET_METERS = 60;

const STANDARD_CABINET_OPTIONS: LedCabinetOption[] = [
  { label: "500 x 500 mm", widthMm: 500, heightMm: 500 },
  { label: "500 x 1000 mm", widthMm: 500, heightMm: 1000 },
  { label: "600 x 337.5 mm", widthMm: 600, heightMm: 337.5 },
];

const STANDARD_PIXEL_PITCHES = [1.2, 1.5, 1.9, 2.5, 3.9, 4.8, 6, 8, 10];

function getGreatestCommonDivisor(firstValue: number, secondValue: number) {
  let a = Math.abs(Math.round(firstValue));
  let b = Math.abs(Math.round(secondValue));

  while (b > 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a || 1;
}

export function clampNumber(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.min(maximum, Math.max(minimum, value));
}

export function sanitizePixelPitch(value: number) {
  return Number(clampNumber(value, MIN_PIXEL_PITCH_MM, MAX_PIXEL_PITCH_MM).toFixed(2));
}

export function sanitizeCabinetDimension(value: number) {
  return Number(clampNumber(value, MIN_CABINET_MM, MAX_CABINET_MM).toFixed(1));
}

export function sanitizeCabinetCount(value: number) {
  return Math.round(clampNumber(value, 1, MAX_CABINET_AXIS_COUNT));
}

export function sanitizeTargetMeters(value: number) {
  return Number(clampNumber(value, MIN_TARGET_METERS, MAX_TARGET_METERS).toFixed(2));
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

export function formatAspectRatio(value: number) {
  const commonRatios = [
    { label: "16:9", value: 16 / 9 },
    { label: "21:9", value: 21 / 9 },
    { label: "4:3", value: 4 / 3 },
    { label: "1:1", value: 1 },
    { label: "32:9", value: 32 / 9 },
  ];
  const closeMatch = commonRatios.find(
    (ratio) => Math.abs(value - ratio.value) / ratio.value < 0.02,
  );

  if (closeMatch) {
    return closeMatch.label;
  }

  const precision = 100;
  const width = Math.round(value * precision);
  const height = precision;
  const gcd = getGreatestCommonDivisor(width, height);

  return `${Math.round(width / gcd)}:${Math.round(height / gcd)}`;
}

export function calculateLedDisplay(
  inputs: LedCalculatorInputs,
): LedCalculatorResult {
  const pixelPitchMm = sanitizePixelPitch(inputs.pixelPitchMm);
  const cabinetWidthMm = sanitizeCabinetDimension(inputs.cabinetWidthMm);
  const cabinetHeightMm = sanitizeCabinetDimension(inputs.cabinetHeightMm);
  const horizontalCabinets = sanitizeCabinetCount(inputs.horizontalCabinets);
  const verticalCabinets = sanitizeCabinetCount(inputs.verticalCabinets);
  const resolutionWidth = Math.round(
    (cabinetWidthMm / pixelPitchMm) * horizontalCabinets,
  );
  const resolutionHeight = Math.round(
    (cabinetHeightMm / pixelPitchMm) * verticalCabinets,
  );
  const aspectRatio = resolutionWidth / resolutionHeight;

  return {
    pixelPitchMm,
    cabinetWidthMm,
    cabinetHeightMm,
    horizontalCabinets,
    verticalCabinets,
    totalCabinets: horizontalCabinets * verticalCabinets,
    totalWidthMeters: (cabinetWidthMm * horizontalCabinets) / 1000,
    totalHeightMeters: (cabinetHeightMm * verticalCabinets) / 1000,
    resolutionWidth,
    resolutionHeight,
    totalPixels: resolutionWidth * resolutionHeight,
    aspectRatio,
    aspectRatioLabel: formatAspectRatio(aspectRatio),
  };
}

export function getLedInsights(
  inputs: LedCalculatorInputs,
  result: LedCalculatorResult,
): LedInsights {
  const pitchGuidance =
    result.pixelPitchMm <= 2
      ? {
          title: "High-end indoor",
          description:
            "Fine pixel pitch suited for close viewing, executive spaces, broadcast, and premium indoor applications.",
        }
      : result.pixelPitchMm < 5
        ? {
            title: "Standard indoor",
            description:
              "Balanced pixel pitch for meeting rooms, retail, lobbies, and general indoor presentation walls.",
          }
        : {
            title: "Outdoor / long-distance viewing",
            description:
              "Coarser pitch is typically used where the audience views the display from farther away.",
          };
  const minimumMeters = result.pixelPitchMm * 1.5;
  const maximumMeters = result.pixelPitchMm * 3;
  const differencePercent =
    (Math.abs(result.aspectRatio - ASPECT_RATIO_IDEAL) / ASPECT_RATIO_IDEAL) *
    100;
  const isCloseToWidescreen =
    differencePercent <= ASPECT_RATIO_CLOSE_THRESHOLD * 100;

  return {
    pitchGuidance,
    viewingDistance: {
      minimumMeters,
      maximumMeters,
      label: `${formatMeters(minimumMeters)} - ${formatMeters(maximumMeters)}`,
    },
    aspectFeedback: {
      severity: isCloseToWidescreen ? "success" : "warning",
      title: isCloseToWidescreen
        ? "16:9 canvas is ideal"
        : "Scaling may be required",
      description: isCloseToWidescreen
        ? "The cabinet layout is close to a standard 16:9 content canvas."
        : `The LED canvas differs from 16:9 by ${differencePercent.toFixed(
            1,
          )}%. Confirm source scaling, cropping, or letterboxing.`,
      differencePercent,
    },
    notes: [
      `${inputs.environment === "indoor" ? "Indoor" : "Outdoor"} mode selected for recommendation context.`,
      "Resolution is estimated from cabinet dimensions divided by pixel pitch; confirm exact manufacturer cabinet pixel matrix for final submittals.",
    ],
  };
}

export function estimateViewingDistanceMeters(
  targetWidthMeters: number,
  targetHeightMeters: number,
  environment: LedEnvironment,
) {
  const diagonalMeters = Math.sqrt(targetWidthMeters ** 2 + targetHeightMeters ** 2);
  const multiplier = environment === "indoor" ? 0.9 : 1.8;
  const minimumDistance = environment === "indoor" ? 2 : 6;

  return Number(Math.max(minimumDistance, diagonalMeters * multiplier).toFixed(2));
}

export function selectPixelPitchForSmartMode(
  viewingDistanceMeters: number,
  environment: LedEnvironment,
) {
  const environmentPitches = STANDARD_PIXEL_PITCHES.filter((pitch) =>
    environment === "indoor" ? pitch <= 3.9 : pitch >= 3.9,
  );
  const desiredPitch = viewingDistanceMeters / 2.25;
  const selectedPitch = environmentPitches.reduce((bestPitch, pitch) => {
    const bestDistance = Math.abs(bestPitch - desiredPitch);
    const currentDistance = Math.abs(pitch - desiredPitch);

    return currentDistance < bestDistance ? pitch : bestPitch;
  }, environmentPitches[0]);

  return sanitizePixelPitch(selectedPitch);
}

function calculateLayoutScore(
  targetWidthMeters: number,
  targetHeightMeters: number,
  result: LedCalculatorResult,
) {
  const widthDifference = Math.abs(result.totalWidthMeters - targetWidthMeters);
  const heightDifference = Math.abs(result.totalHeightMeters - targetHeightMeters);
  const targetArea = targetWidthMeters * targetHeightMeters;
  const actualArea = result.totalWidthMeters * result.totalHeightMeters;
  const areaDifferencePercent = Math.abs(actualArea - targetArea) / targetArea;
  const aspectDifference =
    Math.abs(result.aspectRatio - targetWidthMeters / targetHeightMeters) /
    (targetWidthMeters / targetHeightMeters);

  return widthDifference + heightDifference + areaDifferencePercent + aspectDifference;
}

export function getFitQuality(
  smartInputs: LedSmartInputs,
  result: LedCalculatorResult,
) {
  const unusedWidthMeters = Math.abs(
    result.totalWidthMeters - smartInputs.targetWidthMeters,
  );
  const unusedHeightMeters = Math.abs(
    result.totalHeightMeters - smartInputs.targetHeightMeters,
  );
  const targetArea =
    smartInputs.targetWidthMeters * smartInputs.targetHeightMeters;
  const actualArea = result.totalWidthMeters * result.totalHeightMeters;
  const sizeDifferencePercent =
    (Math.abs(actualArea - targetArea) / targetArea) * 100;
  const label =
    sizeDifferencePercent <= 4
      ? "Excellent fit"
      : sizeDifferencePercent <= 10
        ? "Good fit"
        : "Minor unused space";

  return {
    label,
    description: `${formatMeters(unusedWidthMeters)} width difference and ${formatMeters(
      unusedHeightMeters,
    )} height difference from target size.`,
    unusedWidthMeters,
    unusedHeightMeters,
    sizeDifferencePercent,
  };
}

export function recommendLedSmartSetup(
  smartInputs: LedSmartInputs,
): LedSmartRecommendation {
  const targetWidthMeters = sanitizeTargetMeters(smartInputs.targetWidthMeters);
  const targetHeightMeters = sanitizeTargetMeters(smartInputs.targetHeightMeters);
  const assumedViewingDistanceMeters = estimateViewingDistanceMeters(
    targetWidthMeters,
    targetHeightMeters,
    smartInputs.environment,
  );
  const pixelPitchMm = selectPixelPitchForSmartMode(
    assumedViewingDistanceMeters,
    smartInputs.environment,
  );
  const candidates = STANDARD_CABINET_OPTIONS.map((cabinetOption) => {
    const horizontalCabinets = sanitizeCabinetCount(
      Math.round((targetWidthMeters * 1000) / cabinetOption.widthMm),
    );
    const verticalCabinets = sanitizeCabinetCount(
      Math.round((targetHeightMeters * 1000) / cabinetOption.heightMm),
    );
    const inputs: LedCalculatorInputs = {
      pixelPitchMm,
      cabinetWidthMm: cabinetOption.widthMm,
      cabinetHeightMm: cabinetOption.heightMm,
      horizontalCabinets,
      verticalCabinets,
      environment: smartInputs.environment,
    };
    const result = calculateLedDisplay(inputs);

    return {
      cabinetOption,
      inputs,
      result,
      score: calculateLayoutScore(targetWidthMeters, targetHeightMeters, result),
    };
  });
  const bestCandidate = candidates.reduce((best, candidate) =>
    candidate.score < best.score ? candidate : best,
  );
  const insights = getLedInsights(bestCandidate.inputs, bestCandidate.result);

  return {
    inputs: bestCandidate.inputs,
    result: bestCandidate.result,
    insights,
    cabinetOption: bestCandidate.cabinetOption,
    fitQuality: getFitQuality(
      {
        ...smartInputs,
        targetWidthMeters,
        targetHeightMeters,
      },
      bestCandidate.result,
    ),
    assumedViewingDistanceMeters,
  };
}
