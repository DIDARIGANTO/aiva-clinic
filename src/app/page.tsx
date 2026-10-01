import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Approach } from "@/components/home/Approach";
import { Directions } from "@/components/home/Directions";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { GallerySection } from "@/components/home/GallerySection";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Marquee } from "@/components/home/Marquee";
import { Promos } from "@/components/home/Promos";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CtaSection } from "@/components/ui/CtaSection";
import { Reviews } from "@/components/ui/Reviews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Directions />
      <Approach />
      <ServicesSection />
      <Promos />
      <AboutTeaser />
      <DoctorsSection />
      <GallerySection />
      <Reviews />
      <HowItWorks />
      <FaqSection />
      <CtaSection />
    </>
  );
}
