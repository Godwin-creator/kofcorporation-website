import type { Metadata } from "next";
import "./mentions-legales.css";

export const metadata: Metadata = {
  title: "Mentions légales — KofCorporation",
  description:
    "Mentions légales, conditions générales d'utilisation et politique de confidentialité de KofCorporation.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">
      <header className="legal-page__hero">
        <div className="legal-page__container">
          <p className="legal-page__eyebrow">Informations légales</p>
          <h1>Mentions légales</h1>
          <p className="legal-page__intro">
            Retrouvez les conditions d&apos;utilisation et les engagements de
            KofCorporation concernant la confidentialité de vos données.
          </p>
        </div>
      </header>

      <div className="legal-page__container legal-page__content">
        <section aria-labelledby="cgu-title">
          <h2 id="cgu-title">Conditions générales d&apos;utilisation</h2>
          <p>
            Le site KofCorporation présente les services et réalisations de
            KofCorporation, société informatique basée à Lomé, au Togo. En
            consultant ce site, vous acceptez de l&apos;utiliser conformément
            aux lois et règlements applicables.
          </p>
          <p>
            Les contenus publiés sont fournis à titre informatif et peuvent
            être modifiés sans préavis. Toute reproduction, représentation ou
            exploitation non autorisée des contenus du site est interdite.
          </p>
          <p>
            KofCorporation s&apos;efforce de maintenir des informations
            exactes et accessibles, sans garantir l&apos;absence d&apos;erreur,
            d&apos;interruption ou d&apos;indisponibilité du site.
          </p>
        </section>

        <section aria-labelledby="privacy-title">
          <h2 id="privacy-title">Politique de confidentialité</h2>
          <p>
            Les informations transmises via le formulaire de contact sont
            utilisées uniquement pour répondre à votre demande et assurer le
            suivi de nos échanges. Elles ne sont ni vendues ni cédées à des
            tiers à des fins commerciales.
          </p>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la
            suppression de vos données en écrivant à{" "}
            <a href="mailto:contact@kofcorporation.com">
              contact@kofcorporation.com
            </a>
            .
          </p>
          <p>
            Le site peut utiliser des technologies nécessaires à son
            fonctionnement et à la mesure de son audience. La navigation
            n&apos;implique pas la collecte de données sensibles.
          </p>
        </section>

        <section aria-labelledby="publisher-title">
          <h2 id="publisher-title">Éditeur du site</h2>
          <address>
            KofCorporation
            <br />
            Agoè Minamadou, à côté de ESA
            <br />
            Lomé, Togo
            <br />
            <a href="mailto:contact@kofcorporation.com">
              contact@kofcorporation.com
            </a>
          </address>
        </section>
      </div>
    </main>
  );
}