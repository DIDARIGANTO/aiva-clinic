import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { SectionHeading, delay } from "@/components/ui/Section";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { categories, categoryHref, servicesOf } from "@/data/services";
import { ServicesExplorer, type ExplorerTab } from "./ServicesExplorer";

const PREVIEW = 6;

export function ServicesSection() {
  const tabs: ExplorerTab[] = categories
    .filter((c) => c.slug !== "analizy")
    .map((c) => {
      const all = servicesOf(c.slug);
      const shown = all.slice(0, PREVIEW);
      const rest = all.length - shown.length;
      return {
        slug: c.slug,
        label: c.short,
        href: categoryHref(c),
        lead: c.lead,
        note: c.note,
        total: all.length,
        rows: (
          <>
            {shown.map((s) => (
              <ServiceRow key={s.slug} service={s} />
            ))}
            {rest > 0 && (
              <Link
                href={categoryHref(c)}
                className="group flex items-center justify-between gap-4 border-b border-line py-6 text-[1.05rem] font-medium text-forest"
              >
                <span className="link-line">Показать ещё {rest} — все услуги направления</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            )}
          </>
        ),
      };
    });

  return (
    <section className="section-y" aria-labelledby="services-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Услуги"
            title={
              <span id="services-title">
                Найдите нужную услугу — или <span className="accent">спросите нас</span>
              </span>
            }
            lead="Консультации, диагностика, процедуры и восстановление. Не знаете, с чего начать? Напишите нам — поможем выбрать специалиста и удобное время."
          />
          <div data-reveal style={delay(200)}>
            <ButtonLink href="/uslugi" variant="outline" arrow>
              Все услуги
            </ButtonLink>
          </div>
        </div>
        <div className="mt-10 lg:mt-14" data-reveal style={delay(120)}>
          <ServicesExplorer tabs={tabs} />
        </div>
      </div>
    </section>
  );
}
