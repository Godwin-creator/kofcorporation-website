import type { Metadata } from "next";
import WebDevelopmentService from "@/components/pages/services/WebDevelopmentService";
import {client} from "@/lib/sanity";
import {SERVICES_QUERY} from "@/lib/queries";
import type {SanityService} from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Développement Web & Applications - KofCorporation",
    description:
      "Sites vitrines, plateformes web et applications métier sur mesure. KofCorporation conçoit des solutions web performantes pour votre entreprise.",
  };
}

export default async function WebDevelopmentPage() {
  const services = await client.fetch<SanityService[]>(SERVICES_QUERY, {}, {next: {tags: ["services"]}}).catch(() => []);
  const service = services.find((item) => item.slug?.current === "developpement-web");
  return <WebDevelopmentService technologies={service?.stack} />;
}