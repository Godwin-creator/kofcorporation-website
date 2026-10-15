import type { Metadata } from "next";
import { fetchSettings } from "@/lib/queries";
import { SERVICES } from "@/lib/services";
import ServicesPage from "@/components/pages/ServicesPage";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/services", {
    fr: {
      title: "Nos services",
      description:
        "Découvrez les services KofCorporation : développement web, applications mobiles, logiciels de gestion et formations tech.",
    },
    en: {
      title: "Our services",
      description:
        "Explore KofCorporation's web development, mobile application, business software, and technology training services.",
    },
  });
}

export default async function ServicesRoute() {
  const settings = await fetchSettings();
  const sanityStacks = Object.fromEntries(SERVICES.map((service) => [service.id, settings?.[service.stackKey] ?? []]));
  return <ServicesPage sanityStacks={sanityStacks} />;
}
