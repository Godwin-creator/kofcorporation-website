import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Mentions légales — KofCorporation",
  description:
    "Mentions légales, conditions générales d'utilisation et politique de confidentialité de KofCorporation.",
};

const sectionTitleStyle = {
  margin: "0 0 1rem",
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  fontWeight: 600,
  letterSpacing: "-0.03em",
  lineHeight: 1.2,
};

export default async function MentionsLegalesPage() {
  const t = await getTranslations("pages");

  return (
    <div style={{ color: "var(--color-text)" }}>
      <header
        style={{
          padding: "7rem 1.5rem 5rem",
          backgroundColor: "var(--color-surface-alt)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.75rem, 8vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
            }}
          >
            {t("legal")}
          </h1>
          <p
            style={{
              margin: "1.5rem 0 0",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
            }}
          >
            Dernière mise à jour : Septembre 2026
          </p>
        </div>
      </header>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "5rem 1.5rem 6rem",
          fontFamily: "var(--font-body)",
          lineHeight: 1.8,
        }}
      >
        <section aria-labelledby="publisher-title" style={{ marginBottom: "4rem" }}>
          <h2 id="publisher-title" style={sectionTitleStyle}>Éditeur du site</h2>
          <dl style={{ margin: 0, color: "var(--color-text-muted)" }}>
            <div><dt>Dénomination</dt><dd>KofCorporation</dd></div>
            <div><dt>Directeur de publication</dt><dd>Omar Farouk KOUGBADA</dd></div>
            <div><dt>Adresse</dt><dd>Agoè Minamadou, à côté de ESA, Lomé, Togo</dd></div>
            <div><dt>Téléphone</dt><dd>+228 70 44 16 36 / +228 93 55 47 40</dd></div>
            <div><dt>Email</dt><dd><a href="mailto:contact@kofcorporation.com">contact@kofcorporation.com</a></dd></div>
            <div><dt>Forme juridique</dt><dd>[À compléter]</dd></div>
          </dl>
        </section>

        <section aria-labelledby="hosting-title" style={{ marginBottom: "4rem" }}>
          <h2 id="hosting-title" style={sectionTitleStyle}>Hébergement</h2>
          <p>Hébergeur : Vercel Inc.</p>
          <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
          <p>Site : <a href="https://vercel.com">vercel.com</a></p>
        </section>

        <section aria-labelledby="intellectual-property-title" style={{ marginBottom: "4rem" }}>
          <h2 id="intellectual-property-title" style={sectionTitleStyle}>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site est protégé par les lois
            relatives à la propriété intellectuelle. Toute reproduction,
            représentation ou utilisation est interdite sans autorisation
            écrite préalable.
          </p>
        </section>

        <section aria-labelledby="personal-data-title" style={{ marginBottom: "4rem" }}>
          <h2 id="personal-data-title" style={sectionTitleStyle}>Données personnelles</h2>
          <p>Le formulaire de contact collecte : nom, email, message.</p>
          <p>Finalité : répondre aux demandes de contact uniquement.</p>
          <p>Durée de conservation : 12 mois maximum.</p>
          <p>
            Droit d&apos;accès/suppression :{" "}
            <a href="mailto:contact@kofcorporation.com">contact@kofcorporation.com</a>
          </p>
          <p>
            Aucun cookie traceur ou analytics tiers n&apos;est actuellement
            utilisé sur ce site.
          </p>
        </section>

        <section aria-labelledby="cookies-title" style={{ marginBottom: "4rem" }}>
          <h2 id="cookies-title" style={sectionTitleStyle}>Cookies</h2>
          <p>
            Un seul cookie technique : localStorage &quot;theme&quot;
            (préférence clair/sombre). Pas de cookie publicitaire ni analytique.
          </p>
        </section>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title" style={sectionTitleStyle}>Contact</h2>
          <p>
            Pour toute question :{" "}
            <a href="mailto:contact@kofcorporation.com">contact@kofcorporation.com</a>
          </p>
        </section>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "4rem",
            color: "var(--color-accent)",
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}