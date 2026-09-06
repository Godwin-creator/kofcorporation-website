"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Mail } from "lucide-react";
import "./CallToAction.css";

export default function CallToAction() {
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
          Construisons quelque chose d&apos;utile, ensemble.
        </h2>
        <p className="call-to-action__subtitle">
          Parlons de votre projet et trouvons la solution qui fera avancer votre activité.
        </p>
        <div className="call-to-action__actions">
          <Link
            href="/contact#contact-form"
            className="call-to-action__button call-to-action__button--primary"
          >
            <CalendarCheck size={19} strokeWidth={1.9} aria-hidden="true" />
            Prendre rendez-vous
          </Link>
          <Link href="/contact" className="call-to-action__button call-to-action__button--secondary">
            <Mail size={19} strokeWidth={1.9} aria-hidden="true" />
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </section>
  );
}