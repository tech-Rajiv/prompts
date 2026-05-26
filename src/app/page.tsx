import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingSection from "@/components/TrendingSection";
import YTSection from "@/components/YTSection";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
