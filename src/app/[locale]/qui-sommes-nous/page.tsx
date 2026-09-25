import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import {client, urlFor} from "@/lib/sanity";
import {SETTINGS_QUERY} from "@/lib/queries";
import type {CompanySettings} from "@/types/sanity";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? - KofCorporation",
  description:
    "Découvrez KofCorporation, son équipe locale basée à Lomé, sa mission et sa manière de construire des solutions digitales utiles.",
};

export default async function AboutRoute() {
  const settings = await client.fetch<CompanySettings | null>(SETTINGS_QUERY, {}, {next: {tags: ["settings"]}}).catch(() => null);
  const teamPhotoUrl = settings?.teamPhoto ? urlFor(settings.teamPhoto).width(1200).height(900).url() : undefined;
  return <AboutPage teamPhotoUrl={teamPhotoUrl} teamPhotoAlt={settings?.teamPhoto?.alt} />;
}
