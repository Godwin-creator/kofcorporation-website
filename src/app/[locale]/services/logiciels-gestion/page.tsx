import type { Metadata } from "next";
import BusinessSoftwareService from "@/components/pages/services/BusinessSoftwareService";
import { fetchSettings } from "@/lib/queries";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/services/logiciels-gestion", {
    fr: {
      title: "Logiciels de gestion",
      description:
        "Logiciels métier sur mesure pour l'ERP, le CRM, les RH et la facturation. KofCorporation développe des solutions de gestion adaptées à vos processus.",
    },
    en: {
      title: "Business management software",
      description:
        "Custom ERP, CRM, HR, and invoicing software designed around your organization's processes.",
    },
  });
}

export default async function BusinessSoftwarePage() {
  const settings = await fetchSettings();
  return <BusinessSoftwareService technologies={settings?.stackLogiciel} />;
}
