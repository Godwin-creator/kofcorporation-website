import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Nos services — KofCorporation",
  description:
    "Découvrez les services KofCorporation : développement web, applications mobiles, logiciels de gestion et formations tech.",
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
