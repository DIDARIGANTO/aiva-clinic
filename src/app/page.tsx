import { AboutSlides } from "@/components/home/AboutSlides";
import { FaqBlock } from "@/components/home/FaqBlock";
import { FirstVisit } from "@/components/home/FirstVisit";
import { MainHero } from "@/components/home/MainHero";
import { PromoPanel } from "@/components/home/PromoPanel";
import { ReviewsBlock } from "@/components/home/ReviewsBlock";
import { ServiceCards } from "@/components/home/ServiceCards";
import { ServiceLinks } from "@/components/home/ServiceLinks";
import { SocialBlock } from "@/components/home/SocialBlock";
import { WelcomeBanner } from "@/components/home/WelcomeBanner";
import { CtaSection } from "@/components/ui/CtaSection";

export default function HomePage() {
  return (
    <>
      <MainHero />
      <PromoPanel />
      <AboutSlides />
      <ReviewsBlock />
      <ServiceCards />
      <FirstVisit />
      <FaqBlock />
      <CtaSection
        label="Запись на приём"
        title="Приходите на приём — разберёмся в жалобах и составим план обследования"
        lead="Врач выслушает, уточнит историю и объяснит дальнейшие шаги. Если не знаете, к какому специалисту обратиться, — поможем выбрать."
      />
      <WelcomeBanner />
      <SocialBlock />
      <ServiceLinks />
    </>
  );
}
