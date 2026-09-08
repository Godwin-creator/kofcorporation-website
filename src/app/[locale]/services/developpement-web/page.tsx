import type { Metadata } from "next";
import WebDevelopmentService from "@/components/pages/services/WebDevelopmentService";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Développement Web & Applications — KofCorporation",
    description:
      "Sites vitrines, plateformes web et applications métier sur mesure. KofCorporation conçoit des solutions web performantes pour votre entreprise.",
  };
}

export default function WebDevelopmentPage() {
  return <WebDevelopmentService />;
}