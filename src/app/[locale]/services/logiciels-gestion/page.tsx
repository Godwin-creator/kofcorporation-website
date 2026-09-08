import type { Metadata } from "next";
import BusinessSoftwareService from "@/components/pages/services/BusinessSoftwareService";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logiciels de Gestion — KofCorporation",
    description:
      "Logiciels métier sur mesure pour l'ERP, le CRM, les RH et la facturation. KofCorporation développe des solutions de gestion adaptées à vos processus.",
  };
}

export default function BusinessSoftwarePage() {
  return <BusinessSoftwareService />;
}