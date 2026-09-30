import type { Metadata } from "next";
import { fetchServices } from "@/lib/queries";
import type { SanityService } from "@/types/sanity";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Nos services - KofCorporation",
  description:
    "Découvrez les services KofCorporation : développement web, applications mobiles, logiciels de gestion et formations tech.",
};

export default async function ServicesRoute() {
  // Fetch Sanity stacks so the ServicesPage can override hardcoded tags
  const services = (await fetchServices()) ?? [];
  const sanityStacks: Record<string, string[]> = {};
  for (const svc of services as SanityService[]) {
    const key = svc.slug?.current;
    if (key && svc.stack?.length) {
      sanityStacks[key] = svc.stack;
    }
  }
  return <ServicesPage sanityStacks={sanityStacks} />;
}
