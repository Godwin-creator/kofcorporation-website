"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Mouse } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCursorPreference } from "@/hooks/useCursorPreference";
import SpecularButton from "@/components/ui/SpecularButton";

interface CursorToggleProps {
  specularColors: {
    textColor: string;
    baseColor: string;
  };
}

export default function CursorToggle({ specularColors }: CursorToggleProps) {
  const { isCustomCursor, toggleCursorMode } = useCursorPreference();
  const t = useTranslations("header");

  return (
    <SpecularButton
      onClick={toggleCursorMode}
      size="sm"
      radius={0}
      tint="#000000"
      tintOpacity={0}
      blur={0}
      lineColor="var(--color-accent)"
      {...specularColors}
      intensity={1}
      shineSize={44}
      shineFade={40}
      thickness={2.5}
      speed={1.2}
      followMouse
      proximity={250}
      className="header__specular-button header__icon-btn"
      aria-label={isCustomCursor ? t("cursorSystem") : t("cursorCustom")}
      title={isCustomCursor ? t("cursorSystem") : t("cursorCustom")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isCustomCursor ? (
          <motion.span
            key="custom"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex" }}
          >
            {/* Custom cursor active → icon shows the custom cursor dot+ring concept */}
            <MousePointer2 size={18} strokeWidth={1.75} />
          </motion.span>
        ) : (
          <motion.span
            key="system"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex" }}
          >
            {/* System cursor active → plain mouse icon */}
            <Mouse size={18} strokeWidth={1.75} />
          </motion.span>
        )}
      </AnimatePresence>
    </SpecularButton>
  );
}
