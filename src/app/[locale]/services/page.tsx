import type { Metadata } from "next";
import { fetchSettings } from "@/lib/queries";
import { SERVICES } from "@/lib/services";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Nos services - KofCorporation",
  description:
    "Découvrez les services KofCorporation : développement web, applications mobiles, logiciels de gestion et formations tech.",
};

export default async function ServicesRoute() {
  const settings = await fetchSettings();
  const sanityStacks = Object.fromEntries(SERVICES.map((service) => [service.id, settings?.[service.stackKey] ?? []]));
  return <ServicesPage sanityStacks={sanityStacks} />;
}
