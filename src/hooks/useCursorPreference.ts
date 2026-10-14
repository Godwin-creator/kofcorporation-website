"use client";

import { useEffect, useState, useCallback } from "react";

export type CursorMode = "custom" | "system";

const STORAGE_KEY = "cursor-mode";
const DEFAULT_MODE: CursorMode = "custom";

/** Applique le mode curseur sur le <html> et persiste dans localStorage */
export function applyCursorMode(mode: CursorMode) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-cursor-mode", mode);
  localStorage.setItem(STORAGE_KEY, mode);
}

/** Lit la préférence depuis le DOM (positionné par le script inline anti-flash)
 *  puis localStorage, puis retourne la valeur par défaut. */
export function getInitialCursorMode(): CursorMode {
  if (typeof window === "undefined") return DEFAULT_MODE;

  // Priorité 1 : attribut posé par le script inline avant le premier paint
  const dom = document.documentElement.getAttribute("data-cursor-mode");
  if (dom === "custom" || dom === "system") return dom;

  // Priorité 2 : localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "custom" || stored === "system") return stored as CursorMode;

  return DEFAULT_MODE;
}

/**
 * Hook de gestion du mode curseur pour KofCorporation.
 *
 * @returns `cursorMode`      – 'custom' | 'system'
 * @returns `toggleCursorMode` – bascule et persiste la préférence
 * @returns `isCustomCursor`  – raccourci booléen
 */
export function useCursorPreference(): {
  cursorMode: CursorMode;
  toggleCursorMode: () => void;
  isCustomCursor: boolean;
} {
  const [cursorMode, setCursorMode] = useState<CursorMode>(DEFAULT_MODE);

  useEffect(() => {
    const initial = getInitialCursorMode();
    applyCursorMode(initial);
    setCursorMode(initial);
  }, []);

  const toggleCursorMode = useCallback(() => {
    const next: CursorMode = cursorMode === "custom" ? "system" : "custom";
    setCursorMode(next);
    applyCursorMode(next);
  }, [cursorMode]);

  return {
    cursorMode,
    toggleCursorMode,
    isCustomCursor: cursorMode === "custom",
  };
}
