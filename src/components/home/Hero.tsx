import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, Clock, ShieldCheck, Star } from "lucide-react";
import lobby from "@/assets/photos/lobby-1.jpg";
import { BookingButton } from "@/components/booking/BookingButton";
import { ButtonLink } from "@/components/Button";
import { Emblem } from "@/components/Logo";
import { LeafOutline } from "@/components/icons";
import { doctors } from "@/data/doctors";
import { site } from "@/lib/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[4.5rem] lg:pt-24" aria-labelledby="hero-title">
      {/* мягкие цветовые пятна палитры */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[18rem] -top-[20rem] size-[52rem] rounded-full bg-mint/20 blur-[110px]" />
        <div className="absolute -bottom-[20rem] -left-[16rem] size-[40rem] rounded-full bg-peach/45 blur-[120px]" />
        <LeafOutline className="absolute -left-10 top-[18%] hidden h-64 w-auto -rotate-[24deg] text-forest/10 xl:block" />
      </div>

      <div className="shell grid items-center gap-x-8 gap-y-12 pb-14 pt-8 sm:pt-10 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:pb-20 lg:pt-6">
        {/* ── Текст ── */}
        <div className="relative z-10 lg:col-span-7 xl:col-span-7">
          <h1 id="hero-title">
            <span className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-forest/15 bg-white/70 py-2 pl-2.5 pr-4 text-[0.78rem] font-medium tracking-[-0.005em] text-forest backdrop-blur sm:text-[0.85rem]" style={i(0)}>
              <span className="grid size-6 place-items-center rounded-full bg-forest text-white">
                <Emblem className="size-4" />
              </span>
              Клиника терапии, физиотерапии и реабилитации в Астане
            </span>
            <span className="text-display mt-6 block sm:mt-8">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line" style={i(0)}>
                  Вернитесь
                </span>
              </span>
              <span className="-mt-[0.08em] block overflow-hidden pb-[0.14em]">
                <span className="hero-line" style={i(1)}>
                  к <span className="accent pr-[0.06em]">активной</span>
                </span>
              </span>
              <span className="-mt-[0.14em] block overflow-hidden pb-[0.12em]">
                <span className="hero-line" style={i(2)}>
                  жизни
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-slide text-lead mt-6 max-w-xl text-moss sm:mt-8">
            Консультации врачей, диагностика, физиотерапия и реабилитация в Астане. Индивидуальный подход
            к вашему здоровью и восстановлению.
          </p>

          <div className="hero-rise mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center" style={i(6)}>
            <BookingButton size="lg" arrow className="w-full sm:w-auto">
              Записаться на приём
            </BookingButton>
            <ButtonLink href="/uslugi" variant="outline" size="lg" className="w-full sm:w-auto">
              Наши услуги
            </ButtonLink>
          </div>

          {/* факты из материалов клиники */}
          <ul className="hero-rise mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-line pt-7 xs:grid-cols-3 lg:mt-16" style={i(7)}>
            <li className="flex items-start gap-3 xs:block">
              <Clock className="mt-0.5 size-5 shrink-0 text-forest xs:mb-3" strokeWidth={1.6} aria-hidden="true" />
              <p>
                <span className="block text-[0.82rem] text-moss">Ежедневно, {site.hours.note}</span>
                <span className="mt-0.5 block text-[1.05rem] font-medium tracking-[-0.02em]">{site.hours.short}</span>
              </p>
            </li>
            <li className="flex items-start gap-3 xs:block">
              <Star className="mt-0.5 size-5 shrink-0 text-forest xs:mb-3" strokeWidth={1.6} aria-hidden="true" />
              <p>
                <span className="block text-[0.82rem] text-moss">
                  Оценка в {site.rating.source}, {site.rating.ratings} оценок
                </span>
                <span className="mt-0.5 block text-[1.05rem] font-medium tracking-[-0.02em]">{site.rating.value} из 5</span>
              </p>
            </li>
            <li className="flex items-start gap-3 xs:block">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-forest xs:mb-3" strokeWidth={1.6} aria-hidden="true" />
              <p>
                <span className="block text-[0.82rem] text-moss">Медицинская лицензия</span>
                <span className="mt-0.5 block text-[1.05rem] font-medium tracking-[-0.02em]">№ {site.license.number}</span>
              </p>
            </li>
          </ul>
        </div>

        {/* ── Фотография клиники ── */}
        <div className="relative lg:col-span-5 xl:col-span-5">
          <div className="relative mx-auto max-w-[30rem] lg:mr-0 lg:max-w-none">
            <div className="hero-photo leaf relative aspect-[4/5] overflow-hidden bg-mist shadow-lift">
              <Image
                src={lobby}
                alt="Холл AIVA CLINIC: зона ожидания с креслами и информационными стендами клиники"
                fill
                preload
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 30rem, 92vw"
                quality={85}
                className="parallax object-cover object-[50%_62%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine/35 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* вращающийся знак */}
            <div className="hero-rise absolute -left-3 top-6 size-28 sm:-left-8 sm:size-36 lg:-left-14 lg:top-10" style={i(8)} aria-hidden="true">
              <div className="relative size-full rounded-full bg-white shadow-lift">
                <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow text-forest">
                  <defs>
                    <path id="hero-ring" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
                  </defs>
                  <text className="fill-current text-[13.5px] font-medium uppercase tracking-[0.34em]">
                    <textPath href="#hero-ring">Терапия • Физиотерапия • Реабилитация • Диагностика •</textPath>
                  </text>
                </svg>
                <Emblem className="absolute inset-0 m-auto size-[46%] text-forest" />
              </div>
            </div>

            {/* карточка врачей */}
            <Link
              href="/vrachi"
              className="hero-rise group absolute -bottom-6 right-3 flex items-center gap-4 rounded-[1.6rem] bg-white/95 p-3 pr-5 shadow-lift backdrop-blur transition-transform duration-500 ease-soft hover:-translate-y-1 sm:right-6 lg:-bottom-8 lg:-right-2 xl:right-8"
              style={i(9)}
            >
              <span className="flex -space-x-3">
                {doctors.map((d) => (
                  <span key={d.slug} className="relative block size-11 overflow-hidden rounded-full ring-[3px] ring-white">
                    <Image
                      src={d.photo}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                      style={{ objectPosition: d.photoPosition }}
                    />
                  </span>
                ))}
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-medium text-ink">Врачи клиники</span>
                <span className="flex items-center gap-1 text-moss">
                  Познакомиться
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
