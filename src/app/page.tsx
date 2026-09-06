import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Projects />
        <Partners />
      </main>
    </>
  );
}
