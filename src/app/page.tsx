import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Partners />
      </main>
    </>
  );
}
