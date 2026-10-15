import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalDocument, {
  type LegalDocumentSection,
} from "@/components/pages/LegalDocument";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/conditions-generales", {
    fr: {
      title: "Conditions générales d’utilisation",
      description:
        "Consultez les conditions d’accès et d’utilisation du site de KofCorporation.",
    },
    en: {
      title: "Terms of use",
      description:
        "Read the terms governing access to and use of the KofCorporation website.",
    },
  });
}

export default async function TermsPage() {
  const t = await getTranslations("legalDocuments");
  const sections: LegalDocumentSection[] = [
    {
      title: t("terms.purpose.title"),
      paragraphs: [t("terms.purpose.body")],
    },
    {
      title: t("terms.access.title"),
      paragraphs: [t("terms.access.body")],
    },
    {
      title: t("terms.intellectualProperty.title"),
      paragraphs: [t("terms.intellectualProperty.body")],
    },
    {
      title: t("terms.liability.title"),
      paragraphs: [t("terms.liability.body")],
    },
    {
      title: t("terms.externalLinks.title"),
      paragraphs: [t("terms.externalLinks.body")],
    },
    {
      title: t("terms.law.title"),
      paragraphs: [t("terms.law.body")],
    },
  ];

  return <LegalDocument title={t("terms.title")} sections={sections} />;
}
