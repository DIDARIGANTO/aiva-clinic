import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import lobby2 from "@/assets/photos/lobby-2.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import ivRoom1 from "@/assets/photos/iv-room-1.jpg";
import patientNeck from "@/assets/photos/patient-neck.jpg";
import { serviceIcons } from "@/components/icons";
import { Emblem } from "@/components/Logo";
import { SectionHeading, delay } from "@/components/ui/Section";
import { toneBg } from "@/components/ui/ToneTile";
import { categoryHref, getCategory, servicesOf, type CategorySlug, type Tone } from "@/data/services";
import { cn } from "@/lib/cn";

type Card = {
  slug: CategorySlug;
  meta: string;
  span: string;
  photo?: { src: StaticImageData; alt: string; position?: string };
  tone?: Tone;
  list?: string[];
  figure?: string;
};

const cards: Card[] = [
  {
    slug: "konsultacii",
    meta: "6 специалистов",
    span: "lg:col-span-7 lg:min-h-[30rem]",
    photo: { src: lobby2, alt: "Зона ожидания AIVA CLINIC", position: "50% 72%" },
    list: ["Терапевт", "Врач общей практики", "Гастроэнтеролог", "Эндокринолог", "Травматолог-ортопед", "Уролог-андролог"],
  },
  { slug: "uzi", meta: "исследований и комплексов УЗИ", span: "lg:col-span-5 lg:min-h-[30rem]", tone: "peach", figure: "26" },
  { slug: "chek-apy", meta: "готовых программ обследования", span: "lg:col-span-4 lg:min-h-[24rem]", tone: "sun", figure: "5" },
  {
    slug: "fizioterapiya",
    meta: "9 процедур",
    span: "lg:col-span-8 lg:min-h-[24rem]",
    photo: { src: deviceRoom, alt: "Кабинет аппаратной физиотерапии AIVA CLINIC", position: "50% 58%" },
    list: ["TECAR-терапия", "Магнитотерапия", "УВТ", "Прессотерапия", "Экзотерапия"],
  },
  {
    slug: "reabilitaciya",
    meta: "ЛФК, массаж, программы",
    span: "lg:col-span-4 lg:min-h-[26rem]",
    photo: { src: patientNeck, alt: "Пациентка с напряжением в шее", position: "50% 28%" },
  },
  {
    slug: "procedurnyj-kabinet",
    meta: "Капельницы и инъекции",
    span: "lg:col-span-5 lg:min-h-[26rem]",
    photo: { src: ivRoom1, alt: "Процедурный кабинет AIVA CLINIC", position: "50% 70%" },
  },
  { slug: "analizy", meta: "В составе чек-апов", span: "lg:col-span-3 lg:min-h-[26rem]", tone: "mint" },
];

export function Directions() {
  return (
    <section className="section-y" aria-labelledby="directions-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Направления"
            title={
              <span id="directions-title">
                Врачи, диагностика и восстановление — <span className="accent">в одной клинике</span>
              </span>
            }
          />
          <p data-reveal style={delay(160)} className="text-lead max-w-md text-moss lg:pb-2">
            В AIVA CLINIC доступны консультации специалистов, УЗИ, анализы и восстановительные процедуры.
            Выбрать подходящее направление поможет врач.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {cards.map((card, i) => {
            const c = getCategory(card.slug)!;
            const Icon = serviceIcons[c.icon];
            const count = servicesOf(card.slug).length;
            return (
              <li
                key={card.slug}
                data-reveal
                style={delay((i % 3) * 90)}
                className={cn("min-h-[19rem]", i === 0 && "sm:col-span-2", card.span)}
              >
                <Link
                  href={categoryHref(c)}
                  className={cn(
                    "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-6 transition-shadow duration-500 hover:shadow-lift sm:p-8",
                    card.photo ? "bg-pine text-white" : cn(toneBg[card.tone!], "text-ink"),
                  )}
                >
                  {card.photo ? (
                    <>
                      <Image
                        src={card.photo.src}
                        alt={card.photo.alt}
                        fill
                        sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw"
                        className="img-zoom -z-10 object-cover"
                        style={{ objectPosition: card.photo.position }}
                      />
                      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-pine via-pine/45 to-pine/10" aria-hidden="true" />
                    </>
                  ) : (
                    <Emblem className="absolute -bottom-16 -right-14 -z-10 size-64 text-forest/[0.08] transition-transform duration-[1.6s] ease-soft group-hover:rotate-[24deg]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full",
                        card.photo ? "bg-white/15 text-white backdrop-blur" : "bg-white text-forest shadow-soft",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full transition-[background-color,color,transform] duration-500 ease-soft group-hover:rotate-45",
                        card.photo
                          ? "bg-white/15 text-white backdrop-blur group-hover:bg-sun group-hover:text-ink"
                          : "bg-forest/8 text-forest group-hover:bg-forest group-hover:text-white",
                      )}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <div className="mt-14">
                    {card.figure && (
                      <span className="mb-4 block font-serif text-[5.5rem] italic leading-[0.8] tracking-[-0.03em] text-forest sm:text-[7rem]" aria-hidden="true">
                        {card.figure}
                      </span>
                    )}
                    <p className={cn("text-sm", card.photo ? "text-white/70" : "text-moss")}>
                      {card.meta}
                      <span className="sr-only">, услуг в разделе: {count}</span>
                    </p>
                    <h3 className="mt-2 text-[1.6rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[1.9rem]">
                      {c.title}
                    </h3>
                    {card.list ? (
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Что входит">
                        {card.list.map((t) => (
                          <li key={t} className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.8rem] backdrop-blur">
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={cn("mt-3 max-w-sm text-[0.95rem] leading-relaxed", card.photo ? "text-white/75" : "text-moss")}>
                        {c.lead}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
