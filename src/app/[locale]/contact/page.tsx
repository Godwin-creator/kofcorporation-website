import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { fetchSettings } from "@/lib/queries";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/contact", {
    fr: {
      title: "Contact",
      description:
        "Parlez-nous de votre projet digital. L'équipe KofCorporation vous répond depuis Lomé, Togo.",
    },
    en: {
      title: "Contact",
      description:
        "Tell us about your digital project. The KofCorporation team will get back to you from Lomé, Togo.",
    },
  });
}

export default async function ContactRoute() {
  const settings = await fetchSettings();
  return <ContactPage settings={settings} />;
}
