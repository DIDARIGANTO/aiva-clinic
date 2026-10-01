import { CalendarDays, HeartPulse, Layers, ShieldCheck } from "lucide-react";
import { LeafOutline } from "@/components/icons";
import { Eyebrow, delay } from "@/components/ui/Section";
import { site } from "@/lib/site";

/** «Наш подход» и преимущества — только то, что подтверждено материалами клиники */
const principles = [
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

const facts = [
  {
    Icon: Layers,
    title: "Всё в одной клинике",
    text: "Консультации врачей, УЗИ, анализы, физиотерапия и реабилитация — от первого приёма до программы восстановления.",
  },
  {
    Icon: CalendarDays,
    title: "Без выходных",
    text: `Принимаем ${site.hours.label.toLowerCase()} — в будни и в выходные дни.`,
  },
  {
    Icon: HeartPulse,
    title: "Отделение физиотерапии и реабилитации",
    text: "TECAR-терапия, магнитотерапия, ударно-волновая терапия, экзотерапия, ЛФК и лечебный массаж.",
  },
  {
    Icon: ShieldCheck,
    title: "Лицензированная клиника",
    text: `${site.license.label}.`,
  },
];

export function Approach() {
  return (
    <section className="relative overflow-hidden bg-mist section-y" aria-labelledby="approach-title">
      <LeafOutline className="pointer-events-none absolute -right-8 top-16 hidden h-80 w-auto rotate-[18deg] text-forest/10 lg:block" />
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div data-reveal>
                <Eyebrow>Наш подход</Eyebrow>
              </div>
              <h2 id="approach-title" data-reveal style={delay(80)} className="text-h2 mt-5">
                Забота о здоровье, <span className="accent">понятная</span> на каждом шаге
              </h2>
              <p data-reveal style={delay(160)} className="text-lead mt-6 max-w-md text-moss">
                Мы стремимся сделать заботу о здоровье понятной: с чего начать, к какому специалисту
                обратиться и какие шаги необходимы дальше.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:pl-8">
            {principles.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                style={delay(i * 110)}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-forest/15 py-8 last:border-b sm:gap-x-10 sm:py-10"
              >
                <span className="font-serif text-[2.6rem] italic leading-none text-forest/35 transition-colors duration-500 group-hover:text-forest sm:text-[3.4rem]" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-h3">{p.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-moss">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-5">
          {facts.map(({ Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={delay(i * 90)}
              className="rounded-[1.75rem] bg-white p-7 shadow-soft transition-transform duration-500 ease-soft hover:-translate-y-1.5"
            >
              <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-forest">
                <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-[1.15rem] font-medium leading-snug tracking-[-0.02em]">{title}</h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-moss">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
