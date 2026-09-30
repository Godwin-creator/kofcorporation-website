import Hero from "@/components/Hero";
import VideoPresentation from "@/components/sections/VideoPresentation";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import { fetchSettings } from "@/lib/queries";
import type { CompanySettings } from "@/types/sanity";

const ENABLE_SPLASH = false;

export default async function Home() {
  const settings = await fetchSettings();
  return (
    <>
      {ENABLE_SPLASH && <SplashScreen />}
      <Hero settings={settings} />
      <VideoPresentation
        presentationVideoUrl={settings?.presentationVideoUrl}
        presentationVideoFileUrl={settings?.presentationVideoFileUrl}
      />
      <ScrollWordReveal textKey="homeStatement" />
      <Services />
      <Stats />
      <Projects />
      <Partners />
      <Testimonials />
      <CallToAction />
    </>
  );
}
