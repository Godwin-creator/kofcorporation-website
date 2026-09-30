"use client";

import "./Skeletons.css";

export function SectionSkeleton({ type = "cards" }: { type?: "cards" | "stats" | "partners" }) {
  return (
    <section className="skeleton-section" aria-hidden="true">
      <div className="skeleton-pulse skeleton-header" />
      {type === "cards" && (
        <div className="skeleton-grid-3">
          <div className="skeleton-pulse skeleton-card" />
          <div className="skeleton-pulse skeleton-card" />
          <div className="skeleton-pulse skeleton-card" />
        </div>
      )}
      {type === "stats" && (
        <div className="skeleton-grid-4">
          <div className="skeleton-pulse skeleton-stat" />
          <div className="skeleton-pulse skeleton-stat" />
          <div className="skeleton-pulse skeleton-stat" />
          <div className="skeleton-pulse skeleton-stat" />
        </div>
      )}
      {type === "partners" && (
        <div className="skeleton-grid-4" style={{ height: "6rem", gap: "1rem" }}>
          <div className="skeleton-pulse" style={{ height: "100%", width: "100%" }} />
          <div className="skeleton-pulse" style={{ height: "100%", width: "100%" }} />
          <div className="skeleton-pulse" style={{ height: "100%", width: "100%" }} />
          <div className="skeleton-pulse" style={{ height: "100%", width: "100%" }} />
        </div>
      )}
    </section>
  );
}
