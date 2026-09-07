import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — KofCorporation",
  description:
    "Découvrez KofCorporation, son équipe locale basée à Lomé, sa mission et sa manière de construire des solutions digitales utiles.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
