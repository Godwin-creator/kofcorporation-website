import type { Metadata } from "next";
import RealisationsPage from "@/components/pages/RealisationsPage";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/realisations", {
    fr: {
      title: "Nos réalisations",
      description:
        "Découvrez les projets web, mobiles et logiciels réalisés par KofCorporation pour des ONG, entreprises et institutions.",
    },
    en: {
      title: "Our work",
      description:
        "Explore web, mobile, and business software projects delivered by KofCorporation for NGOs, companies, and institutions.",
    },
  });
}

export default function RealisationsRoute() {
  return <RealisationsPage />;
}
