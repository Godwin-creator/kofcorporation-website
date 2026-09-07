"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CalendarCheck, Mail } from "lucide-react";
import "./CallToAction.css";
import { Link } from "@/i18n/navigation";

export default function CallToAction() {
  const t = useTranslations("cta");
  return (
    <section className="call-to-action" aria-labelledby="call-to-action-title">
      <motion.div
        className="call-to-action__inner"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      </motion.div>
    </section>
  );
}