"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AnimatedCursor = dynamic(() => import("./AnimatedCursor"), {
  ssr: false,
  loading: () => null,
});

export default function AnimatedCursorLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setShow(pointerQuery.matches);
    const frame = window.requestAnimationFrame(updatePointer);
    pointerQuery.addEventListener("change", updatePointer);

    return () => {
      window.cancelAnimationFrame(frame);
      pointerQuery.removeEventListener("change", updatePointer);
    };
  }, []);

  return show ? <AnimatedCursor /> : null;
}