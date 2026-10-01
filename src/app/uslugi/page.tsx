import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { ButtonLink } from "@/components/Button";
import { serviceIcons } from "@/components/icons";
import { Emblem } from "@/components/Logo";
import { CtaSection } from "@/components/ui/CtaSection";
import { PageHero } from "@/components/ui/PageHero";
import { delay } from "@/components/ui/Section";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { toneBg } from "@/components/ui/ToneTile";
import { categories, categoryHref, servicesOf } from "@/data/services";
import { pageMeta } from "@/lib/meta";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = pageMeta({
  title: "Услуги клиники — консультации, УЗИ, чек-апы, физиотерапия",
  description:
    "Услуги AIVA CLINIC в Астане: консультации врачей, УЗИ, чек-апы, аппаратная физиотерапия, процедурный кабинет, реабилитация и анализы. Ул. Е 669, 13.",
  path: "/uslugi",
});

const PREVIEW = 5;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Услуги", path: "/uslugi" }]}
        eyebrow="Наши услуги"
        title={
          <>
            Консультации, диагностика и <span className="accent">восстановление</span>
          </>
        }
        lead="Консультации, диагностика, процедуры и восстановление в AIVA CLINIC. Выбрать подходящее направление поможет врач."
      >
        <nav aria-label="Направления услуг">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-[0.93rem] font-medium text-ink transition-colors duration-300 hover:border-forest hover:text-forest"
                >
                  {c.short}
                  <span className="text-xs text-moss tabular-nums">{servicesOf(c.slug).length || ""}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="shell pb-10">
        {categories.map((c, ci) => {
          const all = servicesOf(c.slug);
          const shown = all.slice(0, PREVIEW);
          const rest = all.length - shown.length;
          const Icon = serviceIcons[c.icon];
          return (
            <section
              key={c.slug}
              id={c.slug}
              aria-labelledby={`${c.slug}-title`}
              className="scroll-mt-24 border-t border-line py-14 lg:py-20"
            >
              <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <Link
                      href={categoryHref(c)}
                      data-reveal
                      className={cn(
                        "group relative isolate block aspect-[16/10] overflow-hidden rounded-[1.75rem]",
                        !c.image && toneBg[c.tone],
                      )}
                      aria-label={`Перейти в раздел «${c.title}»`}
                    >
                      {c.image ? (
                        <>
                          <Image
                            src={c.image}
                            alt={c.imageAlt ?? c.title}
                            fill
                            sizes="(min-width: 1024px) 30vw, 92vw"
                            className="img-zoom object-cover"
                            style={{ objectPosition: c.imagePosition }}
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-pine/50 to-transparent" aria-hidden="true" />
                        </>
                      ) : (
                        <Emblem className="absolute -bottom-14 -right-10 size-56 text-forest/[0.09] transition-transform duration-[1.6s] ease-soft group-hover:rotate-[24deg]" />
                      )}
                      <span className={cn("absolute left-5 top-5 grid size-12 place-items-center rounded-full", c.image ? "bg-white/20 text-white backdrop-blur" : "bg-white text-forest shadow-soft")}>
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className={cn("absolute bottom-5 left-5 font-serif text-[2.6rem] italic leading-none", c.image ? "text-white" : "text-forest/60")} aria-hidden="true">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                    </Link>
                    <h2 id={`${c.slug}-title`} data-reveal style={delay(80)} className="mt-7 text-[1.9rem] font-medium leading-[1.08] tracking-[-0.03em] lg:text-[2.2rem]">
                      {c.title}
                    </h2>
                    <p data-reveal style={delay(140)} className="mt-3 leading-relaxed text-moss">
                      {c.lead}
                    </p>
                    {c.note && (
                      <p data-reveal style={delay(180)} className="mt-3 text-sm text-moss">
                        {c.note}
                      </p>
                    )}
                    <div data-reveal style={delay(220)} className="mt-6">
                      <ButtonLink href={categoryHref(c)} variant="outline" arrow>
                        Подробнее о направлении
                      </ButtonLink>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 lg:pl-6">
                  {all.length > 0 ? (
                    <div className="border-t border-line" data-reveal style={delay(120)}>
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
                    </div>
                  ) : (
                    <div data-reveal style={delay(120)} className="rounded-[1.75rem] bg-white p-7 shadow-soft sm:p-9">
                      {c.intro.map((p) => (
                        <p key={p} className="mb-4 leading-relaxed text-moss last:mb-0">
                          {p}
                        </p>
                      ))}
                      <div className="mt-7 flex flex-wrap gap-3">
                        <BookingButton service={c.title}>Записаться</BookingButton>
                        <ButtonLink href="/uslugi/chek-apy" variant="outline" arrow>
                          Программы чек-ап
                        </ButtonLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        <p data-reveal className="border-t border-line pt-8 text-sm leading-relaxed text-moss">
          На сайте указаны цены на специальные предложения клиники. Стоимость остальных услуг уточняйте у
          администратора по телефону или в{" "}
          <a href={waLink("Здравствуйте! Подскажите, пожалуйста, стоимость услуг AIVA CLINIC.")} target="_blank" rel="noopener noreferrer" className="font-medium text-forest underline underline-offset-2">
            WhatsApp
          </a>
          . Имеются противопоказания, необходима консультация специалиста.
        </p>
      </div>

      <CtaSection />
    </>
  );
}
