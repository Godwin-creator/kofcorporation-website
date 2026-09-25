"use client";

import { type FormEvent, useEffect, useState } from "react";
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
import type { ContactForm } from "@/types/contact";
import {useLocale} from "next-intl";
import type {CompanySettings} from "@/types/sanity";

type ContactField = "fullName" | "email" | "subject" | "message";
type FormErrors = Partial<Record<ContactField, string>>;

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage({settings}: {settings?: CompanySettings | null}) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const phones = settings?.phone?.length ? settings.phone : ["+228 70 44 16 36", "+228 93 55 47 40"];
  const email = settings?.email || "contact@kofcorporation.com";
  const address = settings?.address || t("address");
  const openingHours = (locale === "en" ? settings?.openingHoursEn : settings?.openingHours) || t("hours");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const validateForm = (values: ContactForm): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Veuillez renseigner votre nom.";
    } else if (values.fullName.trim().length < 2) {
      nextErrors.fullName = "Le nom doit contenir au moins 2 caractères.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Veuillez renseigner votre e-mail.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "L’adresse e-mail est invalide.";
    }

    if (!values.subject || values.subject === "Choisir un sujet" || values.subject === "chooseSubject") {
      nextErrors.subject = "Veuillez choisir un sujet.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Veuillez écrire votre message.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Le message doit contenir au moins 10 caractères.";
    }

    return nextErrors;
  };

  const handleFieldChange =
    (field: ContactField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setError("");
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("");
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) {
      setError("Le service anti-spam n’est pas disponible pour le moment.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise<void>((resolve) => {
        window.grecaptcha.ready(resolve);
      });

      const token = await window.grecaptcha.execute(siteKey, { action: "contact" });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          recaptchaToken: token,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "Une erreur est survenue lors de l’envoi."
        );
      }

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Une erreur est survenue lors de l’envoi du formulaire."
      );
    } finally {
      setIsLoading(false);
    }
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
          <p>{t("intro")}</p>
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
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <label className={errors.fullName ? "contact-form__field contact-form__field--error" : "contact-form__field"}>
                    {t("name")}
                    <input
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleFieldChange("fullName")}
                      placeholder={t("namePlaceholder")}
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && <span className="contact-form__field-error">{errors.fullName}</span>}
                  </label>

                  <label className={errors.email ? "contact-form__field contact-form__field--error" : "contact-form__field"}>
                    Email
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFieldChange("email")}
                      placeholder="votre@email.com"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <span className="contact-form__field-error">{errors.email}</span>}
                  </label>
                </div>

                <label className={errors.subject ? "contact-form__field contact-form__field--error" : "contact-form__field"}>
                  {t("subject")}
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleFieldChange("subject")}
                    aria-invalid={Boolean(errors.subject)}
                  >
                    <option value="">{t("chooseSubject")}</option>
                    <option value="web">{t("web")}</option>
                    <option value="mobile">{t("mobile")}</option>
                    <option value="software">{t("software")}</option>
                    <option value="training">{t("training")}</option>
                    <option value="other">{t("other")}</option>
                  </select>
                  {errors.subject && <span className="contact-form__field-error">{errors.subject}</span>}
                </label>

                <label className={errors.message ? "contact-form__field contact-form__field--error" : "contact-form__field"}>
                  {t("message")}
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleFieldChange("message")}
                    placeholder={t("messagePlaceholder")}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && <span className="contact-form__field-error">{errors.message}</span>}
                </label>

                <button className="contact-form__submit" type="submit" disabled={isLoading}>
                  {isLoading ? "Envoi en cours..." : t("send")}
                  {!isLoading && <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />}
                </button>

                {error && (
                  <p className="contact-form__error" role="alert">
                    {error}
                  </p>
                )}

                <p className="contact-form__note">{t("privacy")}</p>
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
                  <span>{address}</span>
                </li>
                <li>
                  <Phone size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>
                    {phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>)}
                  </span>
                </li>
                <li>
                  <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li>
                  <Clock3 size={20} strokeWidth={1.7} aria-hidden="true" />
                  <span>{openingHours}</span>
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
