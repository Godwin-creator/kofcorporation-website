import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import VideoPresentation from "@/components/sections/VideoPresentation";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";
import Services from "@/components/sections/Services";
import { fetchSettings } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { SectionSkeleton } from "@/components/ui/Skeletons";

const Stats = dynamic(() => import("@/components/sections/Stats"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Partners = dynamic(() => import("@/components/Partners"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CallToAction = dynamic(() => import("@/components/sections/CallToAction"));

export default async function Home() {
  const settings = await fetchSettings();
  return (
    <>
      <Hero settings={settings} />
      <VideoPresentation
        presentationVideoUrl={settings?.presentationVideoUrl}
        presentationVideoFileUrl={settings?.presentationVideoFileUrl}
        teamPhotoUrl={settings?.teamPhoto?.asset?._ref ? urlFor(settings.teamPhoto).width(1200).height(675).url() : undefined}
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
