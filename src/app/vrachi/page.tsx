import { BookingButton } from "@/components/booking/BookingButton";
import { CtaSection } from "@/components/ui/CtaSection";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { PageHero } from "@/components/ui/PageHero";
import { delay } from "@/components/ui/Section";
import { doctors } from "@/data/doctors";
import { pageMeta } from "@/lib/meta";
import { cn } from "@/lib/cn";

export const metadata = pageMeta({
  title: "Врачи клиники в Астане — терапевт, эндокринолог, ортопед",
  description:
    "Врачи AIVA CLINIC в Астане: терапевт, врачи общей практики, эндокринолог, травматолог-ортопед. Запись на приём онлайн, по телефону и в WhatsApp.",
  path: "/vrachi",
});

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Врачи", path: "/vrachi" }]}
        eyebrow="Команда клиники"
        title={
          <>
            Врачи <span className="accent">AIVA CLINIC</span>
          </>
        }
        lead="На приёме врач выслушает жалобы, уточнит, какие обследования и лечение уже проводились, и определит дальнейшие шаги. Если не знаете, к кому записаться, — администратор поможет выбрать специалиста."
      >
        <BookingButton size="lg" arrow>
          Записаться на приём
        </BookingButton>
      </PageHero>

      <section className="pb-20 lg:pb-32" aria-label="Список врачей">
        <div className="shell">
          <ul className="grid gap-x-6 gap-y-14 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
            {doctors.map((d, i) => (
              <li key={d.slug} data-reveal style={delay(i * 100)} className={cn(i % 2 === 1 && "lg:mt-16")}>
                <DoctorCard doctor={d} index={i} />
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-16 max-w-3xl leading-relaxed text-moss">
            В клинике также ведут приём гастроэнтеролог и уролог-андролог. Специалиста и удобное время
            подберёт администратор при записи.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
