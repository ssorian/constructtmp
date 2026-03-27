import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import QuoteBot from "@/components/QuoteBot";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <QuoteBot />
      <Portfolio />
      <Testimonials />
      <WhyUs />
      <CtaBanner />
      <Footer />
    </main>
  );
}
