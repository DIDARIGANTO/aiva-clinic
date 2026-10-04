import Image from "next/image";
import Link from "next/link";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import { BookingButton } from "@/components/booking/BookingButton";

/** Первый экран главной по референсу: заголовок, подзаголовок, две кнопки, большое фото справа */
export function MainHero() {
  return (
    <section className="tri-bg relative overflow-hidden pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="shell grid items-center gap-8 pb-10 pt-6 lg:min-h-[50rem] lg:grid-cols-12 lg:gap-0 lg:pb-16 lg:pt-0">
        <div className="relative z-10 lg:col-span-5 lg:pr-8">
          <h1 id="hero-title" className="hero-slide max-w-[24rem] text-[2rem] font-bold uppercase leading-[1.12] tracking-wide text-ink sm:text-[2.4rem] lg:text-[2.5rem]">
            Клиника терапии и&nbsp;реабилитации в Астане
          </h1>
          <p className="hero-slide mt-5 max-w-md text-[1.15rem] leading-snug text-ink sm:text-[1.3rem]">
            Консультации врачей, УЗИ, физиотерапия и восстановление — ежедневно с 08:00 до 20:00
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--i": 2 } as React.CSSProperties}>
            <BookingButton size="lg" className="h-16 px-8 text-[1.05rem] font-medium shadow-glow">
              Записаться на приём
            </BookingButton>
            <Link
              href="/uslugi"
              className="inline-flex h-16 items-center justify-center rounded-full bg-soft-btn px-8 text-[1.05rem] font-semibold text-ink transition-colors duration-300 hover:bg-forest hover:text-white"
            >
              Узнать цены
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="hero-photo relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist shadow-soft lg:aspect-[16/11]">
            <Image
              src={lobby1}
              alt="Холл AIVA CLINIC: зона ожидания с креслами и информационными стендами"
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={85}
              className="object-cover object-[50%_72%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
