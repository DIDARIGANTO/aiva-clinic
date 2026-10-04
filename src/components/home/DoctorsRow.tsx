import { DoctorCard } from "@/components/ui/DoctorCard";
import { delay } from "@/components/ui/Section";
import { doctors } from "@/data/doctors";
import { site } from "@/lib/site";

/** «Врачи, ответственные за ваше здоровье» — лента карточек, как в референсе */
export function DoctorsRow() {
  return (
    <section className="section-y pt-6" aria-labelledby="doctors-title">
      <div className="shell">
        <h2 id="doctors-title" data-reveal className="text-h2-xl mx-auto max-w-4xl text-center text-ink">
          Врачи, ответственные за ваше здоровье
        </h2>
        <p data-reveal style={delay(80)} className="ruled-label mt-8 text-forest">
          {site.address.street}
        </p>
      </div>
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mt-12">
        <div className="mx-auto flex gap-5">
          {doctors.map((d, i) => (
            <div key={d.slug} data-reveal style={delay(i * 90)} className="w-[17.5rem] shrink-0 snap-center sm:w-[19rem] lg:w-[17.75rem]">
              <DoctorCard doctor={d} index={i} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-[0.95rem] text-moss">
        Также ведут приём гастроэнтеролог и уролог-андролог — специалиста подберёт администратор.
      </p>
    </section>
  );
}
