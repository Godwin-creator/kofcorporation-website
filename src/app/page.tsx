import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <main>
        <Hero />
        <Partners />
      </main>
    </>
  );
}
