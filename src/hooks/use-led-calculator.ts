"use client";

import { useMemo, useState } from "react";

import {
  DEFAULT_LED_CABINET,
  calculateLedDisplay,
  sanitizeLayoutCount,
  sanitizeMeters,
  sanitizeMillimeters,
  type LedCalculatorInput,
  type LedEnvironment,
} from "@/lib/led-utils";

type LedCalculatorState = {
  pixelPitch: number;
  targetWidthMeters: number;
  targetHeightMeters: number;
  environment: LedEnvironment;
  cabinetWidthMm: number;
  cabinetHeightMm: number;
  cabinetWidthDraft: string;
  cabinetHeightDraft: string;
  overrideColumns?: number;
  overrideRows?: number;
  overrideColumnsDraft: string;
  overrideRowsDraft: string;
};

const DEFAULT_STATE: LedCalculatorState = {
  pixelPitch: 2.5,
  targetWidthMeters: 3.6,
  targetHeightMeters: 2.0,
  environment: "indoor",
  cabinetWidthMm: DEFAULT_LED_CABINET.widthMm,
  cabinetHeightMm: DEFAULT_LED_CABINET.heightMm,
  cabinetWidthDraft: String(DEFAULT_LED_CABINET.widthMm),
  cabinetHeightDraft: String(DEFAULT_LED_CABINET.heightMm),
  overrideColumns: undefined,
  overrideRows: undefined,
  overrideColumnsDraft: "",
  overrideRowsDraft: "",
};

export function useLedCalculator() {
  const [state, setState] = useState<LedCalculatorState>(DEFAULT_STATE);
  const result = useMemo(() => {
    const calculationInput: LedCalculatorInput = {
      pixelPitch: state.pixelPitch,
      targetWidthMeters: state.targetWidthMeters,
      targetHeightMeters: state.targetHeightMeters,
      environment: state.environment,
      cabinetWidthMm: state.cabinetWidthMm,
      cabinetHeightMm: state.cabinetHeightMm,
      overrideColumns: state.overrideColumns,
      overrideRows: state.overrideRows,
    };

    return calculateLedDisplay(calculationInput);
  }, [state]);

  function updateState(nextState: Partial<LedCalculatorState>) {
    setState((currentState) => ({
      ...currentState,
      ...nextState,
    }));
  }

  function updatePixelPitch(value: number) {
    updateState({ pixelPitch: value });
  }

  function updateTargetWidth(value: number) {
    updateState({ targetWidthMeters: sanitizeMeters(value) });
  }

  function updateTargetHeight(value: number) {
    updateState({ targetHeightMeters: sanitizeMeters(value) });
  }

  function updateEnvironment(value: LedEnvironment) {
    updateState({ environment: value });
  }

  function updateCabinetWidth(value: string) {
    updateState({ cabinetWidthDraft: value });
  }

  function updateCabinetHeight(value: string) {
    updateState({ cabinetHeightDraft: value });
  }

  function updateOverrideColumns(value: string) {
    updateState({ overrideColumnsDraft: value });
  }

  function updateOverrideRows(value: string) {
    updateState({ overrideRowsDraft: value });
  }

  function commitCabinetWidth() {
    if (state.cabinetWidthDraft.trim() === "") {
      updateState({ cabinetWidthDraft: String(state.cabinetWidthMm) });
      return;
    }

    const sanitizedValue = sanitizeMillimeters(Number(state.cabinetWidthDraft));

    updateState({
      cabinetWidthMm: sanitizedValue,
      cabinetWidthDraft: String(sanitizedValue),
    });
  }

  function commitCabinetHeight() {
    if (state.cabinetHeightDraft.trim() === "") {
      updateState({ cabinetHeightDraft: String(state.cabinetHeightMm) });
      return;
    }

    const sanitizedValue = sanitizeMillimeters(Number(state.cabinetHeightDraft));

    updateState({
      cabinetHeightMm: sanitizedValue,
      cabinetHeightDraft: String(sanitizedValue),
    });
  }

  function commitOverrideColumns() {
    if (state.overrideColumnsDraft.trim() === "") {
      updateState({ overrideColumns: undefined, overrideColumnsDraft: "" });
      return;
    }

    const sanitizedValue = sanitizeLayoutCount(Number(state.overrideColumnsDraft));

    updateState({
      overrideColumns: sanitizedValue,
      overrideColumnsDraft: String(sanitizedValue),
    });
  }

  function commitOverrideRows() {
    if (state.overrideRowsDraft.trim() === "") {
      updateState({ overrideRows: undefined, overrideRowsDraft: "" });
      return;
    }

    const sanitizedValue = sanitizeLayoutCount(Number(state.overrideRowsDraft));

    updateState({
      overrideRows: sanitizedValue,
      overrideRowsDraft: String(sanitizedValue),
    });
  }

  return {
    commitCabinetHeight,
    commitCabinetWidth,
    commitOverrideColumns,
    commitOverrideRows,
    result,
    state,
    updateCabinetHeight,
    updateCabinetWidth,
    updateEnvironment,
    updateOverrideColumns,
    updateOverrideRows,
    updatePixelPitch,
    updateTargetHeight,
    updateTargetWidth,
  };
}
