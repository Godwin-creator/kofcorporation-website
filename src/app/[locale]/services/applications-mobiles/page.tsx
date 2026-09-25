import type { Metadata } from "next";
import MobileApplicationsService from "@/components/pages/services/MobileApplicationsService";
import {client} from "@/lib/sanity";
import {SERVICES_QUERY} from "@/lib/queries";
import type {SanityService} from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Applications Mobiles - KofCorporation",
    description:
      "Applications Android et iOS natives et cross-platform. KofCorporation développe des applications mobiles robustes et performantes.",
  };
}

export default async function MobileApplicationsPage() {
  const services = await client.fetch<SanityService[]>(SERVICES_QUERY, {}, {next: {tags: ["services"]}}).catch(() => []);
  const service = services.find((item) => item.slug?.current === "applications-mobiles");
  return <MobileApplicationsService technologies={service?.stack} />;
}