import Image from "next/image";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import { delay } from "@/components/ui/Section";
import { site } from "@/lib/site";

/** «Почему стоит записаться» — фото слева, список с зелёными стрелками справа */
const reasons = [
  {
    title: "Начинаем с консультации",
    text: "Важно понять, что беспокоит человека, как давно появились жалобы и какие обследования или лечение уже проводились.",
  },
  {
    title: "Всё в одной клинике",
    text: "Консультации врачей, УЗИ, анализы, физиотерапия и реабилитация — от первого приёма до программы восстановления.",
  },
  {
    title: "Подбираем помощь индивидуально",
    text: "Учитываем состояние здоровья, противопоказания и цели пациента при выборе обследований, лечения и восстановления.",
  },
  {
    title: "Объясняем дальнейшие шаги",
    text: "Пациенту важно понимать, зачем назначена процедура, как подготовиться и когда необходим повторный приём.",
  },
  {
    title: "Принимаем без выходных",
    text: `Клиника работает ежедневно с ${site.hours.opens} до ${site.hours.closes} — можно выбрать удобное время.`,
  },
  {
    title: "Лицензированная клиника",
    text: `${site.license.label}.`,
  },
];

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 16" className={`h-4 w-10 shrink-0 text-forest ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8h34M30 2l6 6-6 6" />
    </svg>
  );
}

export function Reasons() {
  return (
    <section className="section-y" aria-labelledby="reasons-title">
      <div className="shell">
        <h2 id="reasons-title" data-reveal className="text-h2 mx-auto max-w-3xl text-center text-ink">
          Почему пациенты выбирают AIVA CLINIC:
        </h2>
        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist">
            <Image
              src={lobby1}
              alt="Холл AIVA CLINIC: зона ожидания с креслами"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          <ul className="grid gap-4">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal style={delay(i * 70)} className="grid grid-cols-[auto_1fr] gap-x-4">
                <Arrow className="mt-1.5" />
                <div>
                  <h3 className="text-[1.08rem] font-semibold leading-snug text-ink">{r.title}</h3>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-ink">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
