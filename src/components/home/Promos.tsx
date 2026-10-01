import { ButtonLink } from "@/components/Button";
import { PromoCards } from "@/components/ui/PromoCards";
import { SectionHeading, delay } from "@/components/ui/Section";

export function Promos() {
  return (
    <section className="section-y pt-0" aria-labelledby="promos-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Специальные предложения"
            title={
              <span id="promos-title">
                Обследования и процедуры <span className="accent">по особой цене</span>
              </span>
            }
          />
          <div data-reveal style={delay(160)}>
            <ButtonLink href="/akcii" variant="outline" arrow>
              Все предложения
            </ButtonLink>
          </div>
        </div>
        <PromoCards className="mt-12 lg:mt-14" />
      </div>
    </section>
  );
}
