import Hero from "@/components/Hero";
import VideoPresentation from "@/components/sections/VideoPresentation";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import {client} from "@/lib/sanity";
import {SETTINGS_QUERY} from "@/lib/queries";
import type {CompanySettings} from "@/types/sanity";

const ENABLE_SPLASH = true;

export default async function Home() {
  const settings = await client.fetch<CompanySettings | null>(SETTINGS_QUERY, {}, {next: {tags: ["settings"]}}).catch(() => null);
  return (
    <>
      {ENABLE_SPLASH && <SplashScreen />}
      <Hero settings={settings} />
      <VideoPresentation presentationVideoUrl={settings?.presentationVideoUrl} presentationVideoFileUrl={settings?.presentationVideoFileUrl} />
      <Services />
      <Stats />
      <Projects />
      <Partners />
      <Testimonials />
      <CallToAction />
    </>
  );
}
