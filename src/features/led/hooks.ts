"use client";

import { useMemo, useState } from "react";

import {
  calculateLedDisplay,
  getLedInsights,
  recommendLedSmartSetup,
  sanitizeCabinetCount,
  sanitizeCabinetDimension,
  sanitizePixelPitch,
  sanitizeTargetMeters,
} from "./calculator";
import type {
  LedCalculatorInputs,
  LedCalculatorMode,
  LedSmartInputs,
} from "./types";

export const DEFAULT_LED_INPUTS: LedCalculatorInputs = {
  pixelPitchMm: 2.5,
  cabinetWidthMm: 600,
  cabinetHeightMm: 337.5,
  horizontalCabinets: 3,
  verticalCabinets: 3,
  environment: "indoor",
};

export const DEFAULT_LED_SMART_INPUTS: LedSmartInputs = {
  targetWidthMeters: 3.6,
  targetHeightMeters: 2.0,
  environment: "indoor",
};

export function useLedCalculator() {
  const [mode, setMode] = useState<LedCalculatorMode>("smart");
  const [inputs, setInputs] = useState<LedCalculatorInputs>({
    ...DEFAULT_LED_INPUTS,
  });
  const [advancedDrafts, setAdvancedDrafts] = useState({
    cabinetWidthMm: String(DEFAULT_LED_INPUTS.cabinetWidthMm),
    cabinetHeightMm: String(DEFAULT_LED_INPUTS.cabinetHeightMm),
    horizontalCabinets: String(DEFAULT_LED_INPUTS.horizontalCabinets),
    verticalCabinets: String(DEFAULT_LED_INPUTS.verticalCabinets),
  });
  const [smartInputs, setSmartInputs] = useState<LedSmartInputs>({
    ...DEFAULT_LED_SMART_INPUTS,
  });
  const [smartDrafts, setSmartDrafts] = useState({
    targetWidthMeters: String(DEFAULT_LED_SMART_INPUTS.targetWidthMeters),
    targetHeightMeters: String(DEFAULT_LED_SMART_INPUTS.targetHeightMeters),
  });
  const result = useMemo(() => calculateLedDisplay(inputs), [inputs]);
  const insights = useMemo(() => getLedInsights(inputs, result), [inputs, result]);
  const smartRecommendation = useMemo(
    () => recommendLedSmartSetup(smartInputs),
    [smartInputs],
  );
  const activeResult =
    mode === "smart" ? smartRecommendation.result : result;
  const activeInsights =
    mode === "smart" ? smartRecommendation.insights : insights;

  function updateInputs(nextInputs: Partial<LedCalculatorInputs>) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      ...nextInputs,
    }));
  }

  function updateSmartInputs(nextInputs: Partial<LedSmartInputs>) {
    setSmartInputs((currentInputs) => ({
      ...currentInputs,
      ...nextInputs,
    }));
  }

  function updateTargetWidth(value: number) {
    updateSmartInputs({ targetWidthMeters: sanitizeTargetMeters(value) });
  }

  function updateTargetHeight(value: number) {
    updateSmartInputs({ targetHeightMeters: sanitizeTargetMeters(value) });
  }

  function updateTargetWidthDraft(value: string) {
    setSmartDrafts((currentDrafts) => ({
      ...currentDrafts,
      targetWidthMeters: value,
    }));
  }

  function updateTargetHeightDraft(value: string) {
    setSmartDrafts((currentDrafts) => ({
      ...currentDrafts,
      targetHeightMeters: value,
    }));
  }

  function commitTargetWidthDraft() {
    if (smartDrafts.targetWidthMeters.trim() === "") {
      setSmartDrafts((currentDrafts) => ({
        ...currentDrafts,
        targetWidthMeters: String(smartInputs.targetWidthMeters),
      }));
      return;
    }

    const sanitizedValue = sanitizeTargetMeters(
      Number(smartDrafts.targetWidthMeters),
    );

    updateSmartInputs({ targetWidthMeters: sanitizedValue });
    setSmartDrafts((currentDrafts) => ({
      ...currentDrafts,
      targetWidthMeters: String(sanitizedValue),
    }));
  }

  function commitTargetHeightDraft() {
    if (smartDrafts.targetHeightMeters.trim() === "") {
      setSmartDrafts((currentDrafts) => ({
        ...currentDrafts,
        targetHeightMeters: String(smartInputs.targetHeightMeters),
      }));
      return;
    }

    const sanitizedValue = sanitizeTargetMeters(
      Number(smartDrafts.targetHeightMeters),
    );

    updateSmartInputs({ targetHeightMeters: sanitizedValue });
    setSmartDrafts((currentDrafts) => ({
      ...currentDrafts,
      targetHeightMeters: String(sanitizedValue),
    }));
  }

  function updatePixelPitch(value: number) {
    updateInputs({ pixelPitchMm: sanitizePixelPitch(value) });
  }

  function updateCabinetWidth(value: number) {
    updateInputs({ cabinetWidthMm: sanitizeCabinetDimension(value) });
  }

  function updateCabinetHeight(value: number) {
    updateInputs({ cabinetHeightMm: sanitizeCabinetDimension(value) });
  }

  function updateHorizontalCabinets(value: number) {
    updateInputs({ horizontalCabinets: sanitizeCabinetCount(value) });
  }

  function updateVerticalCabinets(value: number) {
    updateInputs({ verticalCabinets: sanitizeCabinetCount(value) });
  }

  function updateCabinetWidthDraft(value: string) {
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      cabinetWidthMm: value,
    }));
  }

  function updateCabinetHeightDraft(value: string) {
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      cabinetHeightMm: value,
    }));
  }

  function updateHorizontalCabinetsDraft(value: string) {
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      horizontalCabinets: value,
    }));
  }

  function updateVerticalCabinetsDraft(value: string) {
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      verticalCabinets: value,
    }));
  }

  function commitCabinetWidthDraft() {
    if (advancedDrafts.cabinetWidthMm.trim() === "") {
      setAdvancedDrafts((currentDrafts) => ({
        ...currentDrafts,
        cabinetWidthMm: String(inputs.cabinetWidthMm),
      }));
      return;
    }

    const sanitizedValue = sanitizeCabinetDimension(
      Number(advancedDrafts.cabinetWidthMm),
    );

    updateInputs({ cabinetWidthMm: sanitizedValue });
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      cabinetWidthMm: String(sanitizedValue),
    }));
  }

  function commitCabinetHeightDraft() {
    if (advancedDrafts.cabinetHeightMm.trim() === "") {
      setAdvancedDrafts((currentDrafts) => ({
        ...currentDrafts,
        cabinetHeightMm: String(inputs.cabinetHeightMm),
      }));
      return;
    }

    const sanitizedValue = sanitizeCabinetDimension(
      Number(advancedDrafts.cabinetHeightMm),
    );

    updateInputs({ cabinetHeightMm: sanitizedValue });
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      cabinetHeightMm: String(sanitizedValue),
    }));
  }

  function commitHorizontalCabinetsDraft() {
    if (advancedDrafts.horizontalCabinets.trim() === "") {
      setAdvancedDrafts((currentDrafts) => ({
        ...currentDrafts,
        horizontalCabinets: String(inputs.horizontalCabinets),
      }));
      return;
    }

    const sanitizedValue = sanitizeCabinetCount(
      Number(advancedDrafts.horizontalCabinets),
    );

    updateInputs({ horizontalCabinets: sanitizedValue });
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      horizontalCabinets: String(sanitizedValue),
    }));
  }

  function commitVerticalCabinetsDraft() {
    if (advancedDrafts.verticalCabinets.trim() === "") {
      setAdvancedDrafts((currentDrafts) => ({
        ...currentDrafts,
        verticalCabinets: String(inputs.verticalCabinets),
      }));
      return;
    }

    const sanitizedValue = sanitizeCabinetCount(
      Number(advancedDrafts.verticalCabinets),
    );

    updateInputs({ verticalCabinets: sanitizedValue });
    setAdvancedDrafts((currentDrafts) => ({
      ...currentDrafts,
      verticalCabinets: String(sanitizedValue),
    }));
  }

  function resetDefaults() {
    if (mode === "smart") {
      setSmartInputs({ ...DEFAULT_LED_SMART_INPUTS });
      setSmartDrafts({
        targetWidthMeters: String(DEFAULT_LED_SMART_INPUTS.targetWidthMeters),
        targetHeightMeters: String(DEFAULT_LED_SMART_INPUTS.targetHeightMeters),
      });
    } else {
      setInputs({ ...DEFAULT_LED_INPUTS });
      setAdvancedDrafts({
        cabinetWidthMm: String(DEFAULT_LED_INPUTS.cabinetWidthMm),
        cabinetHeightMm: String(DEFAULT_LED_INPUTS.cabinetHeightMm),
        horizontalCabinets: String(DEFAULT_LED_INPUTS.horizontalCabinets),
        verticalCabinets: String(DEFAULT_LED_INPUTS.verticalCabinets),
      });
    }
  }

  return {
    activeInsights,
    activeResult,
    advancedDrafts,
    commitTargetHeightDraft,
    commitTargetWidthDraft,
    commitCabinetHeightDraft,
    commitCabinetWidthDraft,
    commitHorizontalCabinetsDraft,
    commitVerticalCabinetsDraft,
    inputs,
    insights,
    mode,
    resetDefaults,
    result,
    setMode,
    smartDrafts,
    smartInputs,
    smartRecommendation,
    updateCabinetHeight,
    updateCabinetHeightDraft,
    updateCabinetWidth,
    updateCabinetWidthDraft,
    updateHorizontalCabinets,
    updateHorizontalCabinetsDraft,
    updateInputs,
    updatePixelPitch,
    updateSmartInputs,
    updateTargetHeightDraft,
    updateTargetHeight,
    updateTargetWidthDraft,
    updateTargetWidth,
    updateVerticalCabinetsDraft,
    updateVerticalCabinets,
  };
}
