import type { Metadata } from "next";
import BusinessSoftwareService from "@/components/pages/services/BusinessSoftwareService";
import { fetchSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logiciels de Gestion - KofCorporation",
    description:
      "Logiciels métier sur mesure pour l'ERP, le CRM, les RH et la facturation. KofCorporation développe des solutions de gestion adaptées à vos processus.",
  };
}

export default async function BusinessSoftwarePage() {
  const settings = await fetchSettings();
  return <BusinessSoftwareService technologies={settings?.stackLogiciel} />;
}
