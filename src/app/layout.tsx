import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KofCorporation — Entreprise Informatique à Lomé, Togo",
  description: "Site web institutionnel de KofCorporation, entreprise informatique basée à Lomé, Togo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
