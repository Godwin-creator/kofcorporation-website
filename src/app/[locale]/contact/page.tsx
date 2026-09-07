import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact — KofCorporation",
  description:
    "Parlez-nous de votre projet digital. L'équipe KofCorporation vous répond depuis Lomé, Togo.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
