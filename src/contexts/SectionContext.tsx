"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SectionContextType {
  activeSection: string | null;
  setActiveSection: (id: string) => void;
}

const SectionContext = createContext<SectionContextType>({
  activeSection: null,
  setActiveSection: () => {},
});

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  return useContext(SectionContext);
}
