"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getInitialCursorMode,
  applyCursorMode,
  syncCursorModeFromStorage,
} from "@/hooks/useCursorPreference";

const AnimatedCursor = dynamic(() => import("./AnimatedCursor"), {
  ssr: false,
  loading: () => null,
});

export default function AnimatedCursorLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Guard 1: touch devices → never show custom cursor
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Guard 2: reduced-motion → skip custom cursor
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const isPointerFine = pointerQuery.matches;
      const isReducedMotion = motionQuery.matches;
      const mode = getInitialCursorMode();

      const shouldShow = isPointerFine && !isReducedMotion && mode === "custom";
      setShow(shouldShow);
    };

    // Apply the stored mode on the <html> element (anti-flash sync)
    applyCursorMode(getInitialCursorMode());

    const frame = window.requestAnimationFrame(evaluate);
    pointerQuery.addEventListener("change", evaluate);
    motionQuery.addEventListener("change", evaluate);

    // Listen for storage changes (other tabs) and local custom event (same tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "cursor-mode" && e.key !== null) return;
      syncCursorModeFromStorage(e.newValue);
      evaluate();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("kof:cursor-mode", evaluate);

    return () => {
      window.cancelAnimationFrame(frame);
      pointerQuery.removeEventListener("change", evaluate);
      motionQuery.removeEventListener("change", evaluate);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kof:cursor-mode", evaluate);
    };
  }, []);

  return show ? <AnimatedCursor /> : null;
}