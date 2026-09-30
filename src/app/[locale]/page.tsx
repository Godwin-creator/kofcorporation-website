import { Suspense } from "react";
import Hero from "@/components/Hero";
import VideoPresentation from "@/components/sections/VideoPresentation";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";
import Partners from "@/components/Partners";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import { fetchSettings } from "@/lib/queries";
import type { CompanySettings } from "@/types/sanity";
import { SectionSkeleton } from "@/components/ui/Skeletons";

export default async function Home() {
  const settings = await fetchSettings();
  return (
    <>
      <Hero settings={settings} />
      <VideoPresentation
        presentationVideoUrl={settings?.presentationVideoUrl}
        presentationVideoFileUrl={settings?.presentationVideoFileUrl}
      />
      <ScrollWordReveal textKey="homeStatement" />
      <Services />
      <Suspense fallback={<SectionSkeleton type="stats" />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<SectionSkeleton type="cards" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton type="partners" />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<SectionSkeleton type="cards" />}>
        <Testimonials />
      </Suspense>
      <CallToAction />
    </>
  );
}
