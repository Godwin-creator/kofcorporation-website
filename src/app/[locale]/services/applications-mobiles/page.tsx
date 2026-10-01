import type { Metadata } from "next";
import MobileApplicationsService from "@/components/pages/services/MobileApplicationsService";
import { fetchSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Applications Mobiles - KofCorporation",
    description:
      "Applications Android et iOS natives et cross-platform. KofCorporation développe des applications mobiles robustes et performantes.",
  };
}

export default async function MobileApplicationsPage() {
  const settings = await fetchSettings();
  return <MobileApplicationsService technologies={settings?.stackMobile} />;
}
