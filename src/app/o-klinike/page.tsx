import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import { BookingButton } from "@/components/booking/BookingButton";
import { ButtonLink } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { Emblem } from "@/components/Logo";
import { CtaSection } from "@/components/ui/CtaSection";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, SectionHeading, delay } from "@/components/ui/Section";
import { doctors } from "@/data/doctors";
import { gallery } from "@/data/gallery";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = pageMeta({
  title: "О клинике — терапия, физиотерапия, реабилитация в Астане",
  description:
    "AIVA CLINIC объединяет консультации врачей, диагностику, физиотерапию и восстановление. Лицензия № 24026583. Астана, ул. Е 669, 13. Ежедневно 08:00–20:00.",
  path: "/o-klinike",
});

/** Тексты раздела — из документа клиники «AIVA CLINIC — тексты для сайта. О клинике» */
const directions = [
  {
    title: "Терапия и консультации специалистов",
    href: "/uslugi/konsultacii",
    text: "В клинике ведут приём врач общей практики, терапевт, гастроэнтеролог, эндокринолог, травматолог-ортопед и уролог-андролог. Консультация помогает разобраться в жалобах и определить дальнейшие обследования и лечение по показаниям.",
  },
  {
    title: "Диагностика",
    href: "/uslugi/uzi",
    text: "В AIVA CLINIC доступны ультразвуковые исследования органов и сосудов, комплексные УЗИ и чек-апы. Программы обследования включают базовый чек-ап, обследования печени, щитовидной железы, сосудов и суставов. Подобрать необходимый объём диагностики поможет врач.",
  },
  {
    title: "Физиотерапия",
    href: "/uslugi/fizioterapiya",
    text: "В клинике представлены TECAR-терапия, магнитотерапия, ударно-волновая и ультразвуковая терапия, прессотерапия и экзотерапия. Выбор процедуры зависит от медицинских показаний, противопоказаний и задач лечения.",
  },
  {
    title: "Реабилитация",
    href: "/uslugi/reabilitaciya",
    text: "Лечебная физкультура, лечебный массаж и программы восстановления направлены на работу с движением и возвращение к повседневной активности. Содержание программы подбирается с учётом состояния и возможностей пациента.",
  },
  {
    title: "Процедурный кабинет",
    href: "/uslugi/procedurnyj-kabinet",
    text: "В процедурном кабинете выполняются капельницы, внутривенные, внутримышечные и подкожные инъекции по назначению врача. Стоимость процедуры и состав включённых расходных материалов можно уточнить перед записью.",
  },
];

const approach = [
  {
    title: "Начинаем с консультации",
    text: "Важно понять, что беспокоит человека, как давно появились жалобы и какие обследования или лечение уже проводились.",
  },
  {
    title: "Подбираем помощь индивидуально",
    text: "Учитываем состояние здоровья, противопоказания и цели пациента при выборе обследований, лечения и восстановления.",
  },
  {
    title: "Объясняем дальнейшие шаги",
    text: "Пациенту важно понимать, зачем назначена процедура, как подготовиться и когда необходим повторный приём.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "О клинике", path: "/o-klinike" }]}
        eyebrow="О клинике AIVA CLINIC"
        title={
          <>
            Помогаем вернуться <span className="accent">к активной жизни</span>
          </>
        }
        lead="Клиника терапии, физиотерапии и реабилитации в Астане. AIVA CLINIC объединяет консультации врачей, диагностику, физиотерапию и восстановление."
        image={{ src: lobby1, alt: "Холл AIVA CLINIC в Астане", position: "50% 65%" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingButton size="lg" arrow>
            Записаться на консультацию
          </BookingButton>
          <ButtonLink href="/uslugi" variant="outline" size="lg">
            Наши услуги
          </ButtonLink>
        </div>
      </PageHero>

      {/* ── Миссия ── */}
      <section className="pb-6" aria-label="О клинике">
        <div className="shell grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>Кто мы</Eyebrow>
            </div>
          </div>
          <div data-reveal style={delay(80)} className="grid gap-6 lg:col-span-8">
            <p className="text-[1.35rem] leading-snug tracking-[-0.015em] sm:text-[1.75rem]">
              К нам можно обратиться с жалобами на самочувствие, для обследования или подбора программы
              реабилитации.
            </p>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-moss">
              Мы стремимся сделать заботу о здоровье понятной: с чего начать, к какому специалисту обратиться
              и какие шаги необходимы дальше. Основа нашего подхода — внимание к жалобам пациента и
              индивидуальный выбор медицинской помощи.
            </p>
          </div>
        </div>
      </section>

      {/* ── Направления ── */}
      <section className="section-y" aria-labelledby="dir-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Наши направления"
            title={
              <span id="dir-title">
                От консультации врача <span className="accent">до программы восстановления</span>
              </span>
            }
          />
          <ol className="mt-12 border-t border-line lg:mt-16">
            {directions.map((d, i) => (
              <li key={d.title} data-reveal style={delay(i * 70)}>
                <Link
                  href={d.href}
                  className="group grid gap-x-10 gap-y-3 border-b border-line py-8 transition-colors duration-500 hover:bg-white lg:grid-cols-12 lg:items-start lg:px-6 lg:py-10"
                >
                  <span className="font-serif text-[1.6rem] italic text-forest/45 transition-colors duration-500 group-hover:text-forest lg:col-span-1" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="text-h3 lg:col-span-4">{d.title}</h3>
                  <p className="leading-relaxed text-moss lg:col-span-6">{d.text}</p>
                  <span className="hidden justify-self-end lg:col-span-1 lg:block" aria-hidden="true">
                    <span className="grid size-12 place-items-center rounded-full border border-line text-forest transition-[background-color,color,border-color,transform] duration-500 ease-soft group-hover:rotate-45 group-hover:border-forest group-hover:bg-forest group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Подход ── */}
      <section className="relative isolate overflow-hidden bg-pine text-white grain section-y" aria-labelledby="appr-title">
        <Emblem className="pointer-events-none absolute -right-40 -top-32 -z-10 size-[40rem] animate-spin-slow text-white/[0.05]" />
        <div className="shell">
          <SectionHeading
            tone="light"
            eyebrow="Наш подход"
            title={
              <span id="appr-title">
                Внимание к жалобам и <span className="accent text-sun">понятные шаги</span>
              </span>
            }
          />
          <ol className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
            {approach.map((a, i) => (
              <li key={a.title} data-reveal style={delay(i * 110)} className="rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
                <span className="font-serif text-[3rem] italic leading-none text-sun" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="text-h3 mt-8">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── С чего начать + лицензия ── */}
      <section className="section-y" aria-labelledby="start-title">
        <div className="shell grid gap-6 lg:grid-cols-12">
          <div data-reveal className="rounded-[2rem] bg-mint-soft p-8 sm:p-12 lg:col-span-7">
            <Eyebrow>С чего начать</Eyebrow>
            <h2 id="start-title" className="text-h2 mt-5">
              Не знаете, к какому врачу <span className="accent">обратиться?</span>
            </h2>
            <div className="mt-6 grid max-w-xl gap-4 text-[1.05rem] leading-relaxed text-moss">
              <p>Свяжитесь с администратором. Мы поможем выбрать специалиста и удобное время для консультации.</p>
              <p>
                На приём можно взять результаты предыдущих обследований и список принимаемых препаратов, чтобы
                врач мог учесть их при консультации.
              </p>
            </div>
            <div className="mt-8">
              <BookingButton arrow>Помогите выбрать врача</BookingButton>
            </div>
          </div>
          <div data-reveal style={delay(120)} className="flex flex-col rounded-[2rem] bg-white p-8 shadow-soft sm:p-12 lg:col-span-5">
            <span className="grid size-14 place-items-center rounded-full bg-forest text-white">
              <ShieldCheck className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="text-h3 mt-8">Медицинская лицензия</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-moss">
              Клиника работает на основании лицензии № {site.license.number}, выданной {site.license.issuer}.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-7 text-sm lg:mt-auto">
              <div>
                <dt className="text-moss">Номер</dt>
                <dd className="mt-1 text-[1.15rem] font-medium tracking-[-0.02em]">{site.license.number}</dd>
              </div>
              <div>
                <dt className="text-moss">График работы</dt>
                <dd className="mt-1 text-[1.15rem] font-medium tracking-[-0.02em]">{site.hours.short}, ежедневно</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Галерея ── */}
      <section id="gallery" className="scroll-mt-24 pb-20 lg:pb-28" aria-labelledby="gal-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Фотографии клиники"
            title={
              <span id="gal-title">
                Холл, кабинеты <span className="accent">и оборудование</span>
              </span>
            }
            lead="Настоящие фотографии AIVA CLINIC — так клиника выглядит изнутри."
          />
          <Gallery photos={gallery} className="mt-12 lg:mt-14" />
        </div>
      </section>

      {/* ── Врачи ── */}
      <section className="section-y bg-mist" aria-labelledby="team-title">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Команда"
              title={
                <span id="team-title">
                  Врачи <span className="accent">клиники</span>
                </span>
              }
            />
            <div data-reveal style={delay(160)}>
              <ButtonLink href="/vrachi" variant="outline" arrow>
                Все врачи
              </ButtonLink>
            </div>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d, i) => (
              <li key={d.slug} data-reveal style={delay(i * 90)} className={cn(i % 2 === 1 && "lg:mt-14")}>
                <DoctorCard doctor={d} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Запишитесь <span className="accent whitespace-nowrap text-sun">в AIVA CLINIC</span>
          </>
        }
        lead="Сделайте первый шаг к заботе о своём здоровье — запишитесь на консультацию."
      />
    </>
  );
}
