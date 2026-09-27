import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { fetchSettings } from "@/lib/queries";
import type { CompanySettings } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Contact - KofCorporation",
  description:
    "Parlez-nous de votre projet digital. L'équipe KofCorporation vous répond depuis Lomé, Togo.",
};

export default async function ContactRoute() {
  const settings = await fetchSettings();
  return <ContactPage settings={settings} />;
}
