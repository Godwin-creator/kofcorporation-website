import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import {client} from "@/lib/sanity";
import {SETTINGS_QUERY} from "@/lib/queries";
import type {CompanySettings} from "@/types/sanity";

export const metadata: Metadata = {
  title: "Contact - KofCorporation",
  description:
    "Parlez-nous de votre projet digital. L'équipe KofCorporation vous répond depuis Lomé, Togo.",
};

export default async function ContactRoute() {
  const settings = await client.fetch<CompanySettings | null>(SETTINGS_QUERY, {}, {next: {tags: ["settings"]}}).catch(() => null);
  return <ContactPage settings={settings} />;
}
