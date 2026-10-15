import type { Metadata } from "next";
import WebDevelopmentService from "@/components/pages/services/WebDevelopmentService";
import { fetchSettings } from "@/lib/queries";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/services/developpement-web", {
    fr: {
      title: "Développement web et applications",
      description:
        "Sites vitrines, plateformes web et applications métier sur mesure. KofCorporation conçoit des solutions web performantes pour votre entreprise.",
    },
    en: {
      title: "Web development and applications",
      description:
        "Custom websites, web platforms, and business applications built by KofCorporation for your organization.",
    },
  });
}

export default async function WebDevelopmentPage() {
  const settings = await fetchSettings();
  return <WebDevelopmentService technologies={settings?.stackWeb} />;
}
