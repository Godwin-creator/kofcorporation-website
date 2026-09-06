import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <main>
        <Hero />
        <Stats />
        <Partners />
      </main>
    </>
  );
}
