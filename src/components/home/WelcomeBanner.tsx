import Image from "next/image";
import patientExoLie from "@/assets/photos/patient-exo-lie.jpg";

/** Широкое фото с подписью в полупрозрачной плашке (как «Станьте частью семьи…» в референсе) */
export function WelcomeBanner() {
  return (
    <section className="py-8 lg:py-12" aria-label="Добро пожаловать в AIVA CLINIC">
      <div className="shell">
        <div data-reveal className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-mist sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image src={patientExoLie} alt="Пациентка на процедуре экзотерапии в AIVA CLINIC" fill sizes="(min-width: 1024px) 75rem, 100vw" className="object-cover" />
          <p className="absolute bottom-6 left-6 max-w-xs rounded-[1rem] bg-white/70 px-5 py-4 text-[1.1rem] font-bold uppercase leading-snug text-ink backdrop-blur-sm sm:bottom-10 sm:left-10 sm:text-[1.3rem]">
            Добро пожаловать в AIVA CLINIC
          </p>
        </div>
      </div>
    </section>
  );
}
