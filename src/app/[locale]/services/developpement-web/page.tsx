import type { Metadata } from "next";
import WebDevelopmentService from "@/components/pages/services/WebDevelopmentService";
import { fetchSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Développement Web & Applications - KofCorporation",
    description:
      "Sites vitrines, plateformes web et applications métier sur mesure. KofCorporation conçoit des solutions web performantes pour votre entreprise.",
  };
}

export default async function WebDevelopmentPage() {
  const settings = await fetchSettings();
  return <WebDevelopmentService technologies={settings?.stackWeb} />;
}
