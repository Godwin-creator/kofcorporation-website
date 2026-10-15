import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LegalDocument, {
  type LegalDocumentSection,
} from "@/components/pages/LegalDocument";
import { legalInformation } from "@/lib/legal";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/mentions-legales", {
    fr: {
      title: "Mentions légales",
      description:
        "Consultez les informations légales de KofCorporation et accédez à sa politique de confidentialité.",
    },
    en: {
      title: "Legal notice",
      description:
        "Read KofCorporation's legal information and access its privacy policy.",
    },
  });
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("legalDocuments");
  const locale = await getLocale();
  const facts = [
    { label: t("notice.denomination"), value: legalInformation.denomination },
    { label: t("notice.registeredName"), value: legalInformation.registeredName },
    { label: t("notice.rccm"), value: legalInformation.rccm },
    { label: t("notice.nif"), value: legalInformation.nif },
    {
      label: t("notice.address"),
      value: t("notice.addressValue", legalInformation.address),
    },
    {
      label: t("notice.legalForm"),
      value: t("notice.legalFormValue", {
        form:
          locale === "en"
            ? legalInformation.legalForm.split(" (")[0]
            : legalInformation.legalForm,
      }),
    },
    {
      label: t("notice.publicationDirector"),
      value: legalInformation.publicationDirector,
    },
    { label: t("notice.phone"), value: legalInformation.phoneNumbers.join(" / ") },
    { label: t("notice.email"), value: legalInformation.contactEmail },
    { label: t("notice.corporatePurpose"), value: t("notice.corporatePurposeValue") },
  ].filter(
    (fact): fact is { label: string; value: string } =>
      typeof fact.value === "string" && fact.value.length > 0,
  );

  const sections: LegalDocumentSection[] = [
    {
      title: t("notice.publisher.title"),
      paragraphs: [
        <dl className="legal-document__facts" key="publisher-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.label === t("notice.email") ? (
                  <a href={`mailto:${fact.value}`}>{fact.value}</a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>,
      ],
    },
    {
      title: t("notice.hosting.title"),
      paragraphs: [
        t("notice.hosting.body", {
          name: legalInformation.hosts.website.name,
          address: legalInformation.hosts.website.address,
        }),
        <a
          href={legalInformation.hosts.website.website}
          key="host-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {legalInformation.hosts.website.website}
        </a>,
      ],
    },
    {
      title: t("notice.intellectualProperty.title"),
      paragraphs: [t("notice.intellectualProperty.body")],
    },
    {
      title: t("notice.personalData.title"),
      paragraphs: [
        t("notice.personalData.body"),
        <Link href="/politique-de-confidentialite" key="privacy-link">
          {t("notice.personalData.link")}
        </Link>,
      ],
    },
  ];

  return <LegalDocument title={t("notice.title")} sections={sections} />;
}
