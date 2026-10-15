import type { Metadata } from "next";
import MobileApplicationsService from "@/components/pages/services/MobileApplicationsService";
import { fetchSettings } from "@/lib/queries";
import { createLocalizedMetadata } from "@/lib/metadata";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return createLocalizedMetadata(params, "/services/applications-mobiles", {
    fr: {
      title: "Applications mobiles",
      description:
        "Applications Android et iOS natives et cross-platform. KofCorporation développe des applications mobiles robustes et performantes.",
    },
    en: {
      title: "Mobile applications",
      description:
        "KofCorporation builds robust native and cross-platform Android and iOS applications for your business.",
    },
  });
}

export default async function MobileApplicationsPage() {
  const settings = await fetchSettings();
  return <MobileApplicationsService technologies={settings?.stackMobile} />;
}
