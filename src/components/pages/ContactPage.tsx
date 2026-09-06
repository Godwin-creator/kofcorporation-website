"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import "./ContactPage.css";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <motion.section
        className="contact-page__hero"
        aria-labelledby="contact-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="contact-page__hero-inner">
          <p className="contact-page__eyebrow">{t("eyebrow")}</p>
          <h1 id="contact-title">
            <span className="contact-page__hero-title-line">{t("headline")}</span>
            <br />
            <span className="contact-page__hero-title-line contact-page__hero-title-highlight">
              {t("headlineHighlight")}
            </span>
          </h1>
          <p>
            {t("intro")}
          </p>
        </div>
      </motion.section>

      <section
        id="contact-form"
        className="contact-page__content"
        aria-labelledby="contact-form-title"
      >
        <div className="contact-page__container contact-page__grid">
          <motion.div
            className="contact-page__form-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="contact-page__eyebrow">{t("project")}</p>
            <h2 id="contact-form-title">{t("formTitle")}</h2>
            {submitted ? (
              <div className="contact-page__success" role="status">
                <Send size={22} strokeWidth={1.8} aria-hidden="true" />
                <h3>{t("successTitle")}</h3>
                <p>{t("successDescription")}</p>
                <button type="button" onClick={() => setSubmitted(false)}>
                  {t("another")}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <label>
                    {t("name")}
                    <input name="name" type="text" placeholder={t("namePlaceholder")} required />
                  </label>
                  <label>
                    {t("email")}
                    <input name="email" type="email" placeholder={t("emailPlaceholder")} required />
                  </label>
                </div>
                <label>
                  {t("subject")}
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>
                      {t("chooseSubject")}
                    </option>
                    <option value="web">{t("web")}</option>
                    <option value="mobile">{t("mobile")}</option>
                    <option value="software">{t("software")}</option>
                    <option value="training">{t("training")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                </label>
                <label>
                  {t("message")}
                  <textarea
                    name="message"
                    rows={6}
                    placeholder={t("messagePlaceholder")}
                    required
                  />
                </label>
                <button className="contact-form__submit" type="submit">
                  {t("send")}
                  <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p className="contact-form__note">
                  {t("privacy")}
                </p>
              </form>
            )}
          </motion.div>

          <aside className="contact-page__aside" aria-label={t("formAside")}>
            <div className="contact-page__details">
              <p className="contact-page__eyebrow">{t("details")}</p>
              <h2>{t("detailsTitle")}</h2>
              <ul>
                <li>
                  <MapPin size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>{t("address")}</span>
                </li>
                <li>
                  <Phone size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    <a href="tel:+22870441636">+228 70 44 16 36</a>
                    <a href="tel:+22893554740">+228 93 55 47 40</a>
                  </span>
                </li>
                <li>
                  <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                  <a href="mailto:contact@kofcorporation.com">
                    contact@kofcorporation.com
                  </a>
                </li>
                <li>
                  <Clock3 size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>{t("hours")}</span>
                </li>
              </ul>
            </div>

            <div className="contact-page__map">
              <iframe
                title={t("map")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1200!2d1.1903082352326708!3d6.222112510720469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1021599db15d7109%3A0xd3dd99c055cdec10!2sKofCorporation!5e1!3m2!1sen!2stg!4v1788719337955!5m2!1sen!2stg"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
