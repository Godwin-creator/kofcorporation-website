import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { urlFor } from "@/lib/sanity";
import { fetchSettings } from "@/lib/queries";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/qui-sommes-nous", {
    fr: {
      title: "Qui sommes-nous ?",
      description:
        "Découvrez KofCorporation, son équipe locale basée à Lomé, sa mission et sa manière de construire des solutions digitales utiles.",
    },
    en: {
      title: "About us",
      description:
        "Meet KofCorporation, our Lomé-based team, our mission, and how we build useful digital solutions.",
    },
  });
}

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
