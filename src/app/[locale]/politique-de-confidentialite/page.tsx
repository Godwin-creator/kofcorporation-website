import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  return createLocalizedMetadata(params, "/politique-de-confidentialite", {
    fr: {
      title: "Politique de confidentialité",
      description:
        "Découvrez quelles données KofCorporation traite, pourquoi, avec quels destinataires et quels sont vos droits.",
    },
    en: {
      title: "Privacy policy",
      description:
        "Learn what data KofCorporation processes, why, with whom it is shared, and how to exercise your rights.",
    },
  });
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("legalDocuments");
  const sections: LegalDocumentSection[] = [
    {
      title: t("privacy.responsible.title"),
      paragraphs: [t("privacy.responsible.body", { name: legalInformation.denomination })],
    },
    {
      title: t("privacy.data.title"),
      paragraphs: [
        t("privacy.data.form"),
        t("privacy.data.technical"),
      ],
    },
    {
      title: t("privacy.purposes.title"),
      paragraphs: [t("privacy.purposes.body")],
    },
    {
      title: t("privacy.recipients.title"),
      paragraphs: [
        t("privacy.recipients.body", {
          websiteHost: legalInformation.hosts.website.name,
          smtpHost:
            legalInformation.hosts.smtp ??
            t("privacy.recipients.smtpUnknown"),
        }),
      ],
    },
    {
      title: t("privacy.retention.title"),
      paragraphs: [t("privacy.retention.body")],
    },
    {
      title: t("privacy.rights.title"),
      paragraphs: [
        t("privacy.rights.body"),
        t("privacy.rights.contact", { email: legalInformation.contactEmail }),
      ],
    },
    {
      title: t("privacy.storage.title"),
      paragraphs: [
        t("privacy.storage.locale"),
        t("privacy.storage.theme"),
        t("privacy.storage.pwa"),
        t("privacy.storage.recaptcha"),
        t("privacy.storage.maps"),
      ],
    },
  ];

  return <LegalDocument title={t("privacy.title")} sections={sections} />;
}
