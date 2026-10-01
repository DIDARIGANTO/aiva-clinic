import { BookingButton } from "@/components/booking/BookingButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { PromoCards } from "@/components/ui/PromoCards";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Акции — комплексные УЗИ, чек-ап печени, экзотерапия",
  description:
    "Специальные предложения AIVA CLINIC в Астане: комплексные УЗИ от 15 000 ₸, чек-ап печени за 21 000 ₸ с приёмом врача в подарок, экзотерапия со скидкой 30% на курс.",
  path: "/akcii",
});

export default function PromosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Акции", path: "/akcii" }]}
        eyebrow="Специальные предложения"
        title={
          <>
            Обследования и процедуры <span className="accent">по особой цене</span>
          </>
        }
        lead="Комплексные УЗИ, чек-ап печени и экзотерапия. Условия и срок действия предложений уточняйте у администратора клиники."
      >
        <BookingButton size="lg" arrow>
          Записаться по акции
        </BookingButton>
      </PageHero>
      <section className="pb-20 lg:pb-28" aria-label="Список специальных предложений">
        <div className="shell">
          <PromoCards headingLevel="h2" />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
