"use client";

import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("./AnimatedCursor"), {
  ssr: false,
  loading: () => null,
});

export default function AnimatedCursorLoader() {
  return <AnimatedCursor />;
}