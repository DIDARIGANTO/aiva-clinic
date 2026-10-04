import { Advantages } from "@/components/home/Advantages";
import { DoctorsRow } from "@/components/home/DoctorsRow";
import { LandingHero } from "@/components/home/LandingHero";
import { PriceList } from "@/components/home/PriceList";
import { Reasons } from "@/components/home/Reasons";
import { CtaSection } from "@/components/ui/CtaSection";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <Reasons />
      <PriceList />
      <Advantages />
      <DoctorsRow />
      <CtaSection />
    </>
  );
}
