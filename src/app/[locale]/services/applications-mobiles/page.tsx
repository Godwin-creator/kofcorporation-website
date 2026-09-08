import type { Metadata } from "next";
import MobileApplicationsService from "@/components/pages/services/MobileApplicationsService";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Applications Mobiles — KofCorporation",
    description:
      "Applications Android et iOS natives et cross-platform. KofCorporation développe des applications mobiles robustes et performantes.",
  };
}

export default function MobileApplicationsPage() {
  return <MobileApplicationsService />;
}