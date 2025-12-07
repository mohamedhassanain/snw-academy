import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FormationsSection } from "@/components/FormationsSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FormationsSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
