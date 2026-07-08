import type {
  AspectRatioValidation,
  LcdValidationMessage,
  LcdVideoWallInputs,
  LcdVideoWallResult,
  VideoProcessorRecommendation,
} from "./types";

const MM_PER_INCH = 25.4;
const WIDESCREEN_WIDTH_RATIO = 16;
const WIDESCREEN_HEIGHT_RATIO = 9;
const ASPECT_RATIO_CLOSE_THRESHOLD = 0.03;
const ASPECT_RATIO_ERROR_THRESHOLD = 0.15;
const LARGE_LAYOUT_PANEL_COUNT = 25;
const MAX_RECOMMENDED_AXIS_PANELS = 12;
const MAX_PANEL_AXIS_INPUT = 20;
const MAX_CUSTOM_BEZEL_MM = 25;
const UHD_PIXEL_COUNT = 3840 * 2160;
const EIGHT_K_PIXEL_COUNT = 7680 * 4320;
const COMMON_ASPECT_RATIOS = [
  { label: "16:9", value: 16 / 9 },
  { label: "21:9", value: 21 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "32:9", value: 32 / 9 },
];

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

export function calculatePanelDimensions(panelSizeInches: number) {
  const diagonalMm = panelSizeInches * MM_PER_INCH;
  const diagonalRatio = Math.sqrt(
    WIDESCREEN_WIDTH_RATIO ** 2 + WIDESCREEN_HEIGHT_RATIO ** 2,
  );

  return {
    widthMm: diagonalMm * (WIDESCREEN_WIDTH_RATIO / diagonalRatio),
    heightMm: diagonalMm * (WIDESCREEN_HEIGHT_RATIO / diagonalRatio),
  };
}

export function formatAspectRatio(value: number) {
  const closeMatch = COMMON_ASPECT_RATIOS.find(
    (ratio) => calculateAspectRatioDifference(value, ratio.value) < 0.02,
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

export function calculateAspectRatioDifference(
  displayAspectRatio: number,
  sourceAspectRatio: number,
) {
  return Math.abs(displayAspectRatio - sourceAspectRatio) / sourceAspectRatio;
}

export function sanitizePanelCount(value: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(MAX_PANEL_AXIS_INPUT, Math.max(1, Math.round(value)));
}

export function sanitizeBezelSize(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(MAX_CUSTOM_BEZEL_MM, Math.max(0, value));
}

export function calculateLcdVideoWall(
  inputs: LcdVideoWallInputs,
): LcdVideoWallResult {
  const panelDimensions = calculatePanelDimensions(inputs.panelSizeInches);
  const horizontalPanels = sanitizePanelCount(inputs.horizontalPanels);
  const verticalPanels = sanitizePanelCount(inputs.verticalPanels);
  const bezelSizeMm = sanitizeBezelSize(inputs.bezelSizeMm);

  const totalWidthMm =
    panelDimensions.widthMm * horizontalPanels +
    bezelSizeMm * Math.max(0, horizontalPanels - 1);
  const totalHeightMm =
    panelDimensions.heightMm * verticalPanels +
    bezelSizeMm * Math.max(0, verticalPanels - 1);
  const aspectRatio = totalWidthMm / totalHeightMm;
  const aspectRatioDifferencePercent =
    calculateAspectRatioDifference(
      aspectRatio,
      inputs.sourceAspectRatio.value,
    ) * 100;

  return {
    horizontalPanels,
    verticalPanels,
    panelWidthMm: panelDimensions.widthMm,
    panelHeightMm: panelDimensions.heightMm,
    totalWidthMm,
    totalHeightMm,
    totalWidthInches: totalWidthMm / MM_PER_INCH,
    totalHeightInches: totalHeightMm / MM_PER_INCH,
    overallResolutionWidth:
      inputs.panelResolution.width * horizontalPanels,
    overallResolutionHeight:
      inputs.panelResolution.height * verticalPanels,
    aspectRatio,
    aspectRatioLabel: formatAspectRatio(aspectRatio),
    totalPanels: horizontalPanels * verticalPanels,
    hasAspectRatioMismatch:
      aspectRatioDifferencePercent > ASPECT_RATIO_CLOSE_THRESHOLD * 100,
    aspectRatioDifferencePercent,
  };
}

export function getAspectRatioValidation(
  inputs: LcdVideoWallInputs,
  result: LcdVideoWallResult,
): AspectRatioValidation {
  if (result.aspectRatioDifferencePercent <= ASPECT_RATIO_CLOSE_THRESHOLD * 100) {
    return {
      severity: "success",
      title: "Aspect ratios are aligned",
      description: `${result.aspectRatioLabel} display output is close to ${inputs.sourceAspectRatio.label}.`,
      differencePercent: result.aspectRatioDifferencePercent,
    };
  }

  if (result.aspectRatioDifferencePercent <= ASPECT_RATIO_ERROR_THRESHOLD * 100) {
    return {
      severity: "warning",
      title: "Scaling is likely required",
      description: `Display aspect ratio differs from source content by ${result.aspectRatioDifferencePercent.toFixed(
        1,
      )}%. Content may need scaling or letterboxing.`,
      differencePercent: result.aspectRatioDifferencePercent,
    };
  }

  return {
    severity: "error",
    title: "Significant aspect ratio mismatch",
    description: `Display aspect ratio differs from source content by ${result.aspectRatioDifferencePercent.toFixed(
      1,
    )}%. Confirm the content canvas before quoting hardware.`,
    differencePercent: result.aspectRatioDifferencePercent,
  };
}

export function getVideoProcessorRecommendation(
  inputs: LcdVideoWallInputs,
  result: LcdVideoWallResult,
): VideoProcessorRecommendation {
  const totalPixels =
    result.overallResolutionWidth * result.overallResolutionHeight;
  const uhdInputEquivalent = Math.ceil(totalPixels / UHD_PIXEL_COUNT);
  const outputLabel = `${result.totalPanels} synchronized outputs (${result.horizontalPanels} x ${result.verticalPanels})`;
  const minimumInputConfiguration =
    totalPixels <= UHD_PIXEL_COUNT
      ? "1 x 4K60 input"
      : totalPixels <= EIGHT_K_PIXEL_COUNT
        ? "1 x 8K input or 4 x 4K60 inputs"
        : `${uhdInputEquivalent} x 4K60 inputs or equivalent stitched canvas`;
  const processorClass =
    result.totalPanels <= 4
      ? "Compact video wall processor"
      : result.totalPanels <= 16
        ? "Mid-scale multi-output processor"
        : "Modular matrix video wall processor";

  return {
    processorClass,
    minimumInputConfiguration,
    minimumOutputConfiguration: outputLabel,
    canvasRequirement: `${formatResolution(
      result.overallResolutionWidth,
      result.overallResolutionHeight,
    )} processing canvas`,
    notes: [
      `Use at least one output per LCD panel for native ${inputs.panelResolution.label} mapping.`,
      "Confirm HDCP, refresh rate, input connector type, and content source count during product selection.",
    ],
  };
}

export function getLcdValidationMessages(
  inputs: LcdVideoWallInputs,
  result: LcdVideoWallResult,
): LcdValidationMessage[] {
  const messages: LcdValidationMessage[] = [];

  if (inputs.horizontalPanels < 1 || inputs.verticalPanels < 1) {
    messages.push({
      id: "minimum-layout",
      severity: "error",
      title: "Layout must contain at least one panel per axis",
      description:
        "Enter a horizontal and vertical panel count of 1 or higher.",
    });
  }

  if (inputs.bezelSizeMm < 0) {
    messages.push({
      id: "negative-bezel",
      severity: "error",
      title: "Bezel size cannot be negative",
      description:
        "Use 0 mm for seamless or direct-view style planning, or enter a positive bezel value.",
    });
  }

  if (
    inputs.horizontalPanels > MAX_RECOMMENDED_AXIS_PANELS ||
    inputs.verticalPanels > MAX_RECOMMENDED_AXIS_PANELS
  ) {
    messages.push({
      id: "large-axis",
      severity: "warning",
      title: "Very large panel axis",
      description:
        "Confirm mounting structure, service access, and video processing capacity for large display walls.",
    });
  }

  if (result.totalPanels >= LARGE_LAYOUT_PANEL_COUNT) {
    messages.push({
      id: "large-panel-count",
      severity: "warning",
      title: "High panel count",
      description:
        "Large panel counts usually need more detailed power, weight, mounting, and processor checks.",
    });
  }

  if (messages.length === 0) {
    messages.push({
      id: "valid-layout",
      severity: "success",
      title: "Layout looks ready for initial review",
      description:
        "The entered layout is valid and the display aspect ratio is close to the selected source content.",
    });
  }

  return messages;
}

export function formatMillimeters(value: number) {
  return `${Math.round(value).toLocaleString()} mm`;
}

export function formatInches(value: number) {
  return `${value.toFixed(1)} in`;
}

export function formatResolution(width: number, height: number) {
  return `${width.toLocaleString()} x ${height.toLocaleString()}`;
}

export function formatMeters(valueMm: number) {
  return `${(valueMm / 1000).toFixed(2)} m`;
}
