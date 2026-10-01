import { ButtonLink } from "@/components/Button";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { SectionHeading, delay } from "@/components/ui/Section";
import { doctors } from "@/data/doctors";
import { cn } from "@/lib/cn";

export function DoctorsSection() {
  return (
    <section className="section-y bg-mist" aria-labelledby="doctors-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Врачи"
            title={
              <span id="doctors-title">
                Специалисты, которые <span className="accent">слушают</span> и объясняют
              </span>
            }
            lead="На приёме врач выслушает жалобы и определит, какие обследования необходимы."
          />
          <div data-reveal style={delay(160)}>
            <ButtonLink href="/vrachi" variant="outline" arrow>
              Все врачи
            </ButtonLink>
          </div>
        </div>

        <ul className="no-scrollbar -mx-[clamp(1.15rem,0.4rem+3.4vw,3.5rem)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.15rem,0.4rem+3.4vw,3.5rem)] pb-2 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
          {doctors.map((d, i) => (
            <li
              key={d.slug}
              data-reveal
              style={delay(i * 100)}
              className={cn("w-[78%] shrink-0 snap-center xs:w-[62%] sm:w-[44%] lg:w-auto", i % 2 === 1 && "lg:mt-14")}
            >
              <DoctorCard doctor={d} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
