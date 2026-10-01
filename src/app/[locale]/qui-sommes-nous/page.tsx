import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { urlFor } from "@/lib/sanity";
import { fetchSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? - KofCorporation",
  description:
    "Découvrez KofCorporation, son équipe locale basée à Lomé, sa mission et sa manière de construire des solutions digitales utiles.",
};

export default async function AboutRoute() {
  const settings = await fetchSettings();
  const teamPhotoUrl = settings?.teamPhoto?.asset?._ref
    ? urlFor(settings.teamPhoto).width(1200).height(900).url()
    : undefined;
  return (
    <AboutPage
      teamPhotoUrl={teamPhotoUrl}
      teamPhotoAlt={settings?.teamPhoto?.alt}
    />
  );
}
