import Hero from "@/components/Hero";
import VideoPresentation from "@/components/sections/VideoPresentation";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <main>
        <Hero />
        <VideoPresentation />
        <Services />
        <Stats />
        <Projects />
        <Partners />
        <Testimonials />
        <CallToAction />
      </main>
    </>
  );
}
