import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Clock, Info, Phone, UserRound } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { buttonClass } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { CtaSection } from "@/components/ui/CtaSection";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, delay } from "@/components/ui/Section";
import { ToneTile } from "@/components/ui/ToneTile";
import { doctors, getDoctor } from "@/data/doctors";
import {
  categoryHref,
  formatPrice,
  getCategory,
  getService,
  serviceHref,
  serviceImage,
  services,
  servicesOf,
} from "@/data/services";
import { pageMeta } from "@/lib/meta";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { site, waLink } from "@/lib/site";

type Params = Promise<{ category: string; service: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return services.filter((s) => s.page).map((s) => ({ category: s.category, service: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category, service } = await params;
  const s = getService(category, service);
  if (!s) return {};
  return pageMeta({
    title: s.seoTitle ?? `${s.title} в Астане`,
    description: s.seoDescription ?? s.summary,
    path: serviceHref(s),
    image: serviceImage(s)?.src.src,
    absoluteTitle: s.seoTitleAbsolute,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { category, service } = await params;
  const c = getCategory(category);
  const s = getService(category, service);
  if (!c || !s || !s.page) notFound();

  const img = serviceImage(s);
  const title = s.h1 ?? s.title;
  const team = (s.doctors ?? []).map(getDoctor).filter((d) => !!d);
  const head = !team.length ? doctors.find((d) => d.departments?.includes(c.slug)) : undefined;
  const related = servicesOf(c.slug)
    .filter((x) => x.page && x.slug !== s.slug)
    .slice(0, 3);
  const wa = waLink(`Здравствуйте! Хочу записаться в AIVA CLINIC. Интересует: ${s.title}.`);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Услуги", path: "/uslugi" },
          { name: c.short, path: categoryHref(c) },
          { name: s.title, path: serviceHref(s) },
        ]}
        eyebrow={c.title}
        title={title}
        lead={s.summary}
        image={img ? { src: img.src, alt: img.alt, position: img.position } : undefined}
        aside={
          img ? undefined : (
            <ToneTile
              tone={c.tone}
              icon={c.icon}
              figure={s.includes?.length}
              caption={
                s.includes
                  ? c.slug === "uzi"
                    ? "исследования за один визит"
                    : "позиций в программе, включая приём врача"
                  : undefined
              }
              className="group leaf mx-auto aspect-[5/4] w-full max-w-xl lg:aspect-[4/5] lg:max-h-[30rem]"
            />
          )
        }
      >
        {(s.facts || s.price) && (
          <ul className="mb-8 flex flex-wrap gap-2.5">
            {s.price && (
              <li className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-[0.93rem] font-medium text-white">
                {formatPrice(s.price.value)}
                {s.price.unit && <span className="font-normal text-white/90">/ {s.price.unit}</span>}
              </li>
            )}
            {s.facts?.map((f) => (
              <li key={f.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[0.93rem]">
                <Clock className="size-4 text-forest" aria-hidden="true" />
                <span className="text-moss">{f.label}:</span>
                <span className="font-medium">{f.value}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingButton service={s.title} size="lg" arrow>
            Записаться
          </BookingButton>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp", size: "lg" })}>
            <WhatsAppIcon className="size-5" />
            Написать в WhatsApp
          </a>
        </div>
      </PageHero>

      <div className="shell grid gap-x-12 gap-y-14 border-t border-line pb-20 pt-12 lg:grid-cols-12 lg:pb-28 lg:pt-16">
        {/* ── Основной текст ── */}
        <div className="lg:col-span-7">
          <section aria-labelledby="about-service">
            <div data-reveal>
              <Eyebrow>Об услуге</Eyebrow>
            </div>
            <h2 id="about-service" className="sr-only">
              Об услуге
            </h2>
            <div data-reveal style={delay(80)} className="mt-6 grid gap-5">
              {(s.about ?? [s.summary]).map((p, i) => (
                <p key={p} className={i === 0 ? "text-[1.3rem] leading-snug tracking-[-0.015em] sm:text-[1.55rem]" : "text-[1.05rem] leading-relaxed text-moss"}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          {s.includes && (
            <section className="mt-14" aria-labelledby="includes-title">
              <h2 id="includes-title" data-reveal className="text-h3">
                Что входит
              </h2>
              <ul data-reveal style={delay(80)} className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-start gap-3 border-b border-line py-4">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint-soft text-forest">
                      <Check className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-14" aria-labelledby="process-title">
            <h2 id="process-title" data-reveal className="text-h3">
              Как проходит
            </h2>
            <ol className="mt-6">
              {c.process.map((st, i) => (
                <li key={st.title} data-reveal style={delay(i * 80)} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-6 first:border-t">
                  <span className="grid size-10 place-items-center rounded-full bg-forest font-serif italic text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-[1.12rem] font-medium tracking-[-0.015em]">{st.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-moss">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14" aria-labelledby="prep-title">
            <h2 id="prep-title" data-reveal className="text-h3">
              Подготовка и важная информация
            </h2>
            <div data-reveal style={delay(80)} className="mt-6 grid gap-3">
              <p className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 leading-relaxed shadow-soft">
                <Info className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                {s.prep ??
                  (c.slug === "konsultacii"
                    ? "Возьмите на приём результаты предыдущих обследований и список принимаемых препаратов."
                    : "Нужна ли подготовка, администратор сообщит при записи.")}
              </p>
              {(c.note || c.slug === "reabilitaciya") && (
                <p className="flex items-start gap-3 rounded-2xl bg-sun-soft px-5 py-4 leading-relaxed">
                  <Info className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                  {c.note ?? "Имеются противопоказания. Необходима консультация специалиста."}
                </p>
              )}
              <p className="px-1 text-sm leading-relaxed text-moss">
                Информация на странице носит справочный характер и не заменяет консультацию врача. Показания
                и противопоказания определяет специалист на приёме.
              </p>
            </div>
          </section>
        </div>

        {/* ── Боковая карточка ── */}
        <aside className="lg:col-span-5 lg:pl-6" aria-label="Запись и стоимость">
          <div className="grid gap-5 lg:sticky lg:top-28">
            <div data-reveal className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-8">
              <p className="eyebrow text-moss">Стоимость</p>
              {s.price ? (
                <>
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
                    <span className="text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-forest">
                      {formatPrice(s.price.value)}
                    </span>
                    {s.price.old && <s className="text-lg text-moss">{formatPrice(s.price.old)}</s>}
                    {s.price.unit && <span className="text-moss">/ {s.price.unit}</span>}
                  </p>
                  {s.price.note && (
                    <p className="mt-3 inline-flex rounded-full bg-sun px-3.5 py-1.5 text-[0.82rem] font-semibold">{s.price.note}</p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-moss">
                    Срок действия специального предложения уточняйте у администратора.
                  </p>
                </>
              ) : (
                <p className="mt-4 text-[1.15rem] leading-snug tracking-[-0.01em]">
                  Актуальную стоимость уточняйте у администратора — по телефону или в WhatsApp.
                </p>
              )}

              <div className="mt-7 grid gap-2.5">
                <BookingButton service={s.title} size="lg" className="w-full">
                  Записаться на приём
                </BookingButton>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp", size: "lg", className: "w-full" })}>
                  <WhatsAppIcon className="size-5" />
                  WhatsApp
                </a>
              </div>

              <ul className="mt-7 grid gap-3 border-t border-line pt-6 text-[0.95rem]">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-forest" aria-hidden="true" />
                  <a href={site.phone.href} className="font-medium">
                    {site.phone.display}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-moss">
                  <Clock className="size-4 text-forest" aria-hidden="true" />
                  {site.hours.label}, {site.hours.note}
                </li>
              </ul>
            </div>

            {/* специалист */}
            <div data-reveal style={delay(100)} className="rounded-[2rem] bg-mist p-7 sm:p-8">
              <p className="eyebrow text-moss">{team.length > 1 ? "Приём ведут" : team.length === 1 ? "Приём ведёт" : head ? "Отделением руководит" : "Специалист"}</p>
              {team.length || head ? (
                <ul className="mt-5 grid gap-4">
                  {(team.length ? team : [head!]).map((d) => (
                    <li key={d.slug}>
                      <Link href={`/vrachi/${d.slug}`} className="group flex items-center gap-4">
                        <span className="relative block size-16 shrink-0 overflow-hidden rounded-full bg-white">
                          <Image src={d.photo} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: d.photoPosition }} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium leading-snug transition-colors duration-300 group-hover:text-forest">{d.fullName}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-moss">{d.role}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-forest transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 flex items-start gap-3 leading-relaxed">
                  <UserRound className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                  Специалиста и удобное время подберёт администратор при записи.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* ── Вопросы ── */}
      <section className="section-y bg-mist" aria-labelledby="sfaq-title">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>Вопросы и ответы</Eyebrow>
            </div>
            <h2 id="sfaq-title" data-reveal style={delay(80)} className="text-h2 mt-5">
              Частые <span className="accent">вопросы</span>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pl-8">
            <Faq items={c.faq} name={`faq-${s.slug}`} />
          </div>
        </div>
      </section>

      {/* ── Похожие услуги ── */}
      {related.length > 0 && (
        <section className="section-y" aria-labelledby="related-title">
          <div className="shell">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" data-reveal className="text-h2">
                Похожие <span className="accent">услуги</span>
              </h2>
              <Link href={categoryHref(c)} data-reveal className="group hidden items-center gap-2 font-medium text-forest sm:inline-flex">
                <span className="link-line">Все услуги направления</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {related.map((r, i) => (
                <li key={r.slug} data-reveal style={delay(i * 90)}>
                  <Link
                    href={serviceHref(r)}
                    className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-7 transition-[border-color,box-shadow,transform] duration-500 ease-soft hover:-translate-y-1 hover:border-forest/30 hover:shadow-lift"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-[1.3rem] font-medium leading-tight tracking-[-0.025em]">{r.title}</span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-forest transition-[background-color,color,transform] duration-500 ease-soft group-hover:rotate-45 group-hover:bg-forest group-hover:text-white" aria-hidden="true">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </span>
                    <span className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-moss">{r.summary}</span>
                    {r.price && (
                      <span className="mt-auto pt-6 text-lg font-medium text-forest">{formatPrice(r.price.value)}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection service={s.title} />
      <JsonLd data={[serviceSchema(s, c), faqSchema(c.faq)]} />
    </>
  );
}
