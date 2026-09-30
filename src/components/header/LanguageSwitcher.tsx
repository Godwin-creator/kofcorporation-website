"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import SpecularButton from "@/components/ui/SpecularButton";

const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

interface LanguageSwitcherProps {
  specularColors: {
    textColor: string;
    baseColor: string;
  };
}

export default function LanguageSwitcher({ specularColors }: LanguageSwitcherProps) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  /* --- Close language dropdown on outside click ------------------- */
  const closeLangDropdown = useCallback(() => setLangOpen(false), []);

  useEffect(() => {
    if (!langOpen) return;
    const handler = () => closeLangDropdown();
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen, closeLangDropdown]);

  const handleLangChange = (code: LangCode) => {
    setLangOpen(false);
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="header__lang-wrapper">
      <SpecularButton
        onClick={(e) => {
          e.stopPropagation();
          setLangOpen((prev) => !prev);
        }}
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
        speed={0.35}
        followMouse
        proximity={250}
        className="header__specular-button header__icon-btn header__lang-btn"
        aria-label={t("changeLanguage")}
        aria-expanded={langOpen}
      >
        <Globe size={18} strokeWidth={1.75} />
        <span className="header__lang-current">{locale.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`header__lang-chevron ${langOpen ? "header__lang-chevron--open" : ""}`}
        />
      </SpecularButton>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            className="header__lang-dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLangChange(lang.code)}
                className={`header__lang-option ${
                  locale === lang.code ? "header__lang-option--active" : ""
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
