import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon, serviceIcons } from "@/components/icons";
import { CtaSection } from "@/components/ui/CtaSection";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, SectionHeading, delay } from "@/components/ui/Section";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { Steps } from "@/components/ui/Steps";
import { ToneTile } from "@/components/ui/ToneTile";
import { doctors } from "@/data/doctors";
import {
  categories,
  categoryHref,
  getCategory,
  servicesOf,
  uziGroups,
  type Category,
} from "@/data/services";
import { pageMeta } from "@/lib/meta";
import { faqSchema } from "@/lib/schema";
import { abs, site, waLink } from "@/lib/site";
import { buttonClass } from "@/components/Button";

type Params = Promise<{ category: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMeta({
    title: c.seoTitle,
    description: c.seoDescription,
    path: categoryHref(c),
    image: c.image?.src,
  });
}

function categoryDoctors(c: Category) {
  if (c.slug === "konsultacii") return doctors;
  return doctors.filter((d) => d.departments?.includes(c.slug));
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const list = servicesOf(c.slug);
  const tile =
    c.slug === "uzi"
      ? { figure: list.length, caption: "исследований и комплексов УЗИ" }
      : c.slug === "chek-apy"
        ? { figure: list.length, caption: "готовых программ обследования" }
        : undefined;
  const team = categoryDoctors(c);
  const others = categories.filter((x) => x.slug !== c.slug);
  const groups =
    c.slug === "uzi"
      ? uziGroups.map((g) => ({ title: g, items: list.filter((s) => s.group === g) }))
      : [{ title: "", items: list }];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Услуги", path: "/uslugi" },
          { name: c.short, path: categoryHref(c) },
        ]}
        eyebrow="Направление"
        title={c.title}
        lead={c.lead}
        image={c.image ? { src: c.image, alt: c.imageAlt ?? c.title, position: c.imagePosition } : undefined}
        aside={
          c.image ? undefined : (
            <ToneTile
              tone={c.tone}
              icon={c.icon}
              figure={tile?.figure}
              caption={tile?.caption}
              className="group leaf mx-auto aspect-[5/4] w-full max-w-xl lg:aspect-[4/5] lg:max-h-[30rem]"
            />
          )
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingButton service={c.title} size="lg" arrow>
            Записаться на приём
          </BookingButton>
          <a
            href={waLink(`Здравствуйте! Хочу записаться в AIVA CLINIC. Интересует: ${c.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: "whatsapp", size: "lg" })}
          >
            <WhatsAppIcon className="size-5" />
            Написать в WhatsApp
          </a>
        </div>
      </PageHero>

      {/* ── О направлении ── */}
      <section className="pb-6" aria-label="О направлении">
        <div className="shell grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>О направлении</Eyebrow>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div data-reveal style={delay(80)} className="grid gap-5">
              {c.intro.map((p, i) => (
                <p key={p} className={i === 0 ? "text-[1.3rem] leading-snug tracking-[-0.015em] sm:text-[1.6rem]" : "max-w-2xl text-[1.05rem] leading-relaxed text-moss"}>
                  {p}
                </p>
              ))}
            </div>
            {c.note && (
              <p data-reveal style={delay(160)} className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl bg-sun-soft px-5 py-4 text-[0.95rem] leading-relaxed">
                <Info className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                {c.note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Услуги направления ── */}
      {list.length > 0 && (
        <section className="section-y pb-0" aria-labelledby="list-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Услуги"
              title={
                <span id="list-title">
                  {c.slug === "konsultacii" ? (
                    <>К кому можно <span className="accent">записаться</span></>
                  ) : c.slug === "uzi" ? (
                    <>Виды <span className="accent">исследований</span></>
                  ) : c.slug === "chek-apy" ? (
                    <>Программы <span className="accent">обследований</span></>
                  ) : (
                    <>Что входит <span className="accent">в направление</span></>
                  )}
                </span>
              }
            />
            <div className="mt-10 lg:mt-14">
              {groups.map(
                (g) =>
                  g.items.length > 0 && (
                    <div key={g.title || "all"} className="grid gap-x-10 lg:grid-cols-12">
                      {g.title && (
                        <div className="pt-8 lg:col-span-4">
                          <h3 data-reveal className="font-serif text-[1.6rem] italic leading-tight text-forest lg:sticky lg:top-32">
                            {g.title}
                          </h3>
                        </div>
                      )}
                      <div className={g.title ? "mb-8 border-t border-line lg:col-span-8" : "border-t border-line lg:col-span-12"} data-reveal style={delay(80)}>
                        {g.items.map((s) => (
                          <ServiceRow key={s.slug} service={s} />
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
            <p data-reveal className="mt-8 text-sm leading-relaxed text-moss">
              Цены указаны только для специальных предложений. Стоимость остальных услуг уточняйте у
              администратора: {site.phone.display}.
            </p>
          </div>
        </section>
      )}

      {/* ── Как проходит ── */}
      <section className="section-y" aria-labelledby="process-title">
        <div className="shell">
          <div className="rounded-[2.25rem] bg-mist p-7 sm:p-12 lg:p-16">
            <SectionHeading
              eyebrow="Как это проходит"
              title={
                <span id="process-title">
                  От записи <span className="accent">до результата</span>
                </span>
              }
            />
            <Steps steps={c.process} className="mt-12 lg:mt-16" />
          </div>
        </div>
      </section>

      {/* ── Врачи ── */}
      {team.length > 0 && (
        <section className="section-y pt-0" aria-labelledby="team-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Специалисты"
              title={
                <span id="team-title">
                  {team.length > 1 ? (
                    <>Врачи <span className="accent">направления</span></>
                  ) : (
                    <>Руководитель <span className="accent">отделения</span></>
                  )}
                </span>
              }
              lead={
                c.slug === "konsultacii"
                  ? "Приём гастроэнтеролога и уролога-андролога также доступен в клинике — специалиста и время подберёт администратор."
                  : undefined
              }
            />
            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((d, i) => (
                <li key={d.slug} data-reveal style={delay(i * 90)}>
                  <DoctorCard doctor={d} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Вопросы ── */}
      <section className="section-y pt-0" aria-labelledby="cfaq-title">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>Вопросы и ответы</Eyebrow>
            </div>
            <h2 id="cfaq-title" data-reveal style={delay(80)} className="text-h2 mt-5">
              Что важно <span className="accent">знать</span>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pl-8">
            <Faq items={c.faq} name={`faq-${c.slug}`} />
          </div>
        </div>
        <JsonLd data={faqSchema(c.faq)} />
      </section>

      {/* ── Другие направления ── */}
      <section className="pb-16 lg:pb-24" aria-labelledby="others-title">
        <div className="shell">
          <h2 id="others-title" data-reveal className="text-h3">
            Другие направления
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => {
              const Icon = serviceIcons[o.icon];
              return (
                <li key={o.slug} data-reveal style={delay((i % 3) * 70)}>
                  <Link
                    href={categoryHref(o)}
                    className="group flex items-center gap-4 rounded-[1.4rem] border border-line bg-white p-4 pr-5 transition-[border-color,box-shadow] duration-300 hover:border-forest/40 hover:shadow-soft"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mist text-forest">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 font-medium leading-snug">{o.title}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-forest transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaSection service={c.title} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${abs(categoryHref(c))}#webpage`,
          url: abs(categoryHref(c)),
          name: c.title,
          description: c.seoDescription,
          inLanguage: "ru-KZ",
          isPartOf: { "@id": `${site.url}/#website` },
          about: { "@id": `${site.url}/#clinic` },
          mainEntity: {
            "@type": "ItemList",
            name: c.title,
            itemListElement: list.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              ...(s.page ? { url: abs(`/uslugi/${c.slug}/${s.slug}`) } : {}),
            })),
          },
        }}
      />
    </>
  );
}
