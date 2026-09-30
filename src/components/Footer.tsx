import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import "./Footer.css";
import { Link } from "@/i18n/navigation";
import { fetchSettings } from "@/lib/queries";
import type {CompanySettings} from "@/types/sanity";

const currentYear = new Date().getFullYear();

/* ── Social network SVG icons ───────────────────────── */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
  ),
};

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  twitter: "X (Twitter)",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

/* ── Default fallback URLs (used when CMS is empty) ── */
const DEFAULT_SOCIAL: Record<string, string> = {
  facebook: "https://www.facebook.com/KofCorporation/",
  twitter: "https://twitter.com/CoporationKof",
  instagram: "https://www.instagram.com/kofcorporation.tg/",
  linkedin: "https://www.linkedin.com/company/kofcorporation",
};

const DEFAULT_MAPS_URL = "https://maps.app.goo.gl/srEiWn6anmGeb7du6";

export default async function Footer() {
  const t = await getTranslations("footer");
  const settings = await fetchSettings();
  const phones = settings?.phone?.length ? settings.phone : ["+228 70 44 16 36", "+228 93 55 47 40"];
  const email = settings?.email || "contact@kofcorporation.com";
  const address = settings?.address || t("address");
  const mapsUrl = settings?.mapsUrl || DEFAULT_MAPS_URL;

  // Merge CMS social links with defaults – only show networks that have a URL
  const socialEntries = Object.entries({
    ...DEFAULT_SOCIAL,
    ...(settings?.socialLinks
      ? Object.fromEntries(
          Object.entries(settings.socialLinks).filter(([, v]) => v)
        )
      : {}),
  }).filter(([key]) => key in SOCIAL_ICONS);

  return (
    <footer className="footer">
      <span className="footer__bg-text" aria-hidden="true">KOFCORPORATION</span>
      <div className="footer__top">
        <div className="footer__inner">
          
          {/* Brand & Intro */}
          <div className="footer__col footer__brand">
            <Link href="/" className="footer__logo" aria-label={t("homeAria")}>
              <Image
                src="/images/logo.svg"
                alt={t("logoAlt")}
                width={32}
                height={32}
                className="footer__logo-img"
              />
              <span className="footer__logo-text">KofCorporation</span>
            </Link>
            <p className="footer__desc">
              {t("description")}
            </p>
            <div className="footer__socials">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  className="footer__social-link"
                  aria-label={SOCIAL_LABELS[key] ?? key}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - Services */}
          <div className="footer__col">
            <h3 className="footer__title">{t("expertise")}</h3>
            <ul className="footer__list">
              <li>
                <Link href="/services/developpement-web" className="footer__link">
                  {t("web")}
                </Link>
              </li>
              <li>
                <Link href="/services/applications-mobiles" className="footer__link">
                  {t("mobile")}
                </Link>
              </li>
              <li>
                <Link href="/services/logiciels-gestion" className="footer__link">
                  {t("management")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://academy.kofcorporation.com/"
                  className="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("training")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation - Entreprise */}
          <div className="footer__col">
            <h3 className="footer__title">{t("company")}</h3>
            <ul className="footer__list">
              <li>
                <Link href="/qui-sommes-nous" className="footer__link">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="footer__link">
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link href="/contact#contact-form" className="footer__link">
                  {t("meeting")}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="footer__link">
                  {t("legal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__col footer__contact">
            <h3 className="footer__title">{t("contact")}</h3>
            <ul className="footer__list footer__list--contact">
              <li>
                <MapPin size={18} className="footer__icon" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link footer__location-link"
                >
                  {address}
                </a>
              </li>
              <li>
                <Phone size={18} className="footer__icon" />
                <div className="footer__phones">
                  {phones.map((phone, index) => <span key={phone}><a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>{index < phones.length - 1 && <span> / </span>}</span>)}
                </div>
              </li>
              <li>
                <Mail size={18} className="footer__icon" />
                <a href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__inner footer__inner--bottom">
          <p className="footer__copy">
            © {currentYear} KofCorporation. {t("copyright")}
          </p>
          <div className="footer__bottom-links">
             <Link href="/mentions-legales">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
