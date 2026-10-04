import Image from "next/image";
import { Clock } from "lucide-react";
import salambekova from "@/assets/doctors/salambekova-zhuldyz.jpg";
import { BookingButton } from "@/components/booking/BookingButton";
import { site } from "@/lib/site";

/** Первый экран по референсу: текст слева, вертикальное фото справа, рамка с цифрами внизу */
export function LandingHero() {
  return (
    <section className="tri-bg relative overflow-hidden pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="shell grid items-center gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="hero-rise inline-flex h-10 items-center rounded-full bg-forest px-5 text-[0.95rem] font-medium text-white shadow-glow">
            {site.address.city}, {site.address.street}
          </p>

          <h1 id="hero-title" className="hero-slide mt-7 text-[1.7rem] font-bold uppercase leading-[1.12] tracking-wide text-ink sm:text-[2.1rem] lg:text-[2.35rem]">
            Вернитесь к активной жизни
            <span className="mt-1 block text-forest">Терапия, физиотерапия и реабилитация</span>
          </h1>

          <p className="hero-slide mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink sm:text-[1.3rem]">
            Консультации врачей, диагностика, физиотерапия и реабилитация в Астане. Индивидуальный подход
            к вашему здоровью и восстановлению.
          </p>

          <div className="hero-rise mt-8" style={{ "--i": 2 } as React.CSSProperties}>
            <BookingButton size="lg" className="w-full px-10 text-[1.05rem] font-medium sm:w-auto">
              Записаться на приём
            </BookingButton>
          </div>

          <div className="hero-rise mt-9" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="flex items-center gap-3 text-[1.15rem] text-ink sm:text-[1.3rem]">
              <Clock className="size-7 shrink-0 text-forest" strokeWidth={1.6} aria-hidden="true" />
              принимаем ежедневно, {site.hours.note}:
            </p>
            <dl className="mt-4 inline-grid grid-cols-3 gap-x-6 rounded-[1.1rem] border-2 border-forest px-6 py-4 sm:gap-x-10 sm:px-8">
              <div className="text-center">
                <dd className="text-[1.7rem] font-bold leading-none text-forest sm:text-[2.1rem]">{site.hours.opens}</dd>
                <dt className="mt-1.5 text-[0.95rem] text-ink sm:text-[1.1rem]">открываемся</dt>
              </div>
              <div className="text-center">
                <dd className="text-[1.7rem] font-bold leading-none text-forest sm:text-[2.1rem]">{site.hours.closes}</dd>
                <dt className="mt-1.5 text-[0.95rem] text-ink sm:text-[1.1rem]">закрываемся</dt>
              </div>
              <div className="text-center">
                <dd className="text-[1.7rem] font-bold leading-none text-forest sm:text-[2.1rem]">7</dd>
                <dt className="mt-1.5 text-[0.95rem] text-ink sm:text-[1.1rem]">дней в неделю</dt>
              </div>
            </dl>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="hero-photo relative mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden rounded-[1.5rem] bg-mist shadow-soft sm:max-w-[20rem] lg:ml-auto lg:mr-6">
            <Image
              src={salambekova}
              alt="Саламбекова Жулдыз Сериковна — главный врач AIVA CLINIC"
              fill
              preload
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 640px) 20rem, 18rem"
              quality={85}
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
