"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Mail } from "lucide-react";
import "./CallToAction.css";
import { Link } from "@/i18n/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function CallToAction() {
  const t = useTranslations("cta");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={sectionRef}
      className="call-to-action" 
      aria-labelledby="call-to-action-title"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="call-to-action__inner">
        <h2 id="call-to-action-title" className="call-to-action__title">
          {t("title")}
        </h2>
        <p className="call-to-action__subtitle">
          {t("subtitle")}
        </p>
        <div className="call-to-action__actions">
          <Link
            href="/contact#contact-form"
            className="call-to-action__button call-to-action__button--primary"
          >
            <CalendarCheck size={19} strokeWidth={1.9} aria-hidden="true" />
            {t("book")}
          </Link>
          <Link href="/contact" className="call-to-action__button call-to-action__button--secondary">
            <Mail size={19} strokeWidth={1.9} aria-hidden="true" />
            {t("contact")}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}