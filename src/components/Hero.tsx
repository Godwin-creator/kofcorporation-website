import { headers } from "next/headers";
import type { CompanySettings } from "@/types/sanity";

function isMobileRequest(userAgent: string, mobileHint: string | null) {
  return (
    mobileHint === "?1" ||
    /iPhone|iPad|iPod|Android|Mobile|Windows Phone/i.test(userAgent)
  );
}

export default async function Hero({
  settings,
}: {
  settings?: CompanySettings | null;
}) {
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "";
  const mobileHint = requestHeaders.get("sec-ch-ua-mobile");

  if (isMobileRequest(userAgent, mobileHint)) {
    const { default: HeroMobile } = await import("./HeroMobile");
    return <HeroMobile settings={settings} />;
  }

  const { default: HeroDesktop } = await import("./HeroDesktop");
  return <HeroDesktop settings={settings} />;
}
