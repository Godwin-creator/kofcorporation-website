import type { Metadata } from "next";
import RealisationsPage from "@/components/pages/RealisationsPage";

export const metadata: Metadata = {
  title: "Nos réalisations — KofCorporation",
  description:
    "Découvrez les projets web, mobiles et logiciels réalisés par KofCorporation pour des ONG, entreprises et institutions.",
};

export default function RealisationsRoute() {
  return <RealisationsPage />;
}
