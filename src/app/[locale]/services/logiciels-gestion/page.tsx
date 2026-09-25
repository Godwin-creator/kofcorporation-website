import type { Metadata } from "next";
import BusinessSoftwareService from "@/components/pages/services/BusinessSoftwareService";
import {client} from "@/lib/sanity";
import {SERVICES_QUERY} from "@/lib/queries";
import type {SanityService} from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logiciels de Gestion - KofCorporation",
    description:
      "Logiciels métier sur mesure pour l'ERP, le CRM, les RH et la facturation. KofCorporation développe des solutions de gestion adaptées à vos processus.",
  };
}

export default async function BusinessSoftwarePage() {
  const services = await client.fetch<SanityService[]>(SERVICES_QUERY, {}, {next: {tags: ["services"]}}).catch(() => []);
  const service = services.find((item) => item.slug?.current === "logiciels-gestion");
  return <BusinessSoftwareService technologies={service?.stack} />;
}