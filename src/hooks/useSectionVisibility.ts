"use client";

import { useEffect, useRef, useState } from "react";

export function useSectionVisibility(sectionIds: string[], options?: IntersectionObserverInit) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map());

  useEffect(() => {
    const observers = observersRef.current;

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      if (observers.has(sectionId)) {
        observers.get(sectionId)?.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { threshold: 0.1, ...options }
      );

      observer.observe(element);
      observers.set(sectionId, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, options]);

  return activeSection;
}
