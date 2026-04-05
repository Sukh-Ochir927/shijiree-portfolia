import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { GallerySection } from "@/components/GallerySection";
import { LogoBar } from "@/components/LogoBar";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <GallerySection />
        {/* <LogoBar /> */}
        {/* <TestimonialSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
