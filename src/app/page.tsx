import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingSection from "@/components/TrendingSection";
import YTSection from "@/components/YTSection";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HeroB from "@/components/Herob";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* <Hero /> */}
        <HeroB />
        <TrendingSection />
        {/* <YTSection /> */}
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
