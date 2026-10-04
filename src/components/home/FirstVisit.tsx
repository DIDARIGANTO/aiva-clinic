import Image, { type StaticImageData } from "next/image";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import salambekova from "@/assets/doctors/salambekova-zhuldyz.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import { Arrow } from "@/components/icons";
import { delay } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

/** «Что будет, когда вы придёте к нам»: три шага «текст — фото» в шахматном порядке */
const steps: { title: string; text: string; img: StaticImageData; alt: string; pos: string }[] = [
  {
    title: "Знакомство",
    text: "Администратор встретит вас, подскажет кабинет и проводит в зону ожидания. Если вы ещё не выбрали врача, поможет определиться со специалистом и удобным временем.",
    img: lobby1,
    alt: "Зона ожидания AIVA CLINIC",
    pos: "50% 70%",
  },
  {
    title: "Консультация",
    text: "Врач выслушает жалобы, уточнит, как давно они появились и какие обследования или лечение уже проводились. Возьмите с собой результаты прежних обследований и список принимаемых препаратов.",
    img: salambekova,
    alt: "Главный врач AIVA CLINIC на приёме",
    pos: "50% 25%",
  },
  {
    title: "План действий",
    text: "Вы получите понятные дальнейшие шаги: обследования и лечение по показаниям, подготовку к процедурам и сроки повторного приёма. Физиотерапию и реабилитацию можно пройти здесь же.",
    img: deviceRoom,
    alt: "Кабинет физиотерапии AIVA CLINIC",
    pos: "50% 60%",
  },
];

export function FirstVisit() {
  return (
    <section className="section-y" aria-labelledby="visit-title">
      <div className="shell">
        <p className="section-label text-center" data-reveal>
          Первый приём
        </p>
        <h2 id="visit-title" data-reveal className="text-h2-main mx-auto mt-2 max-w-3xl text-center text-ink">
          Что будет, когда вы придёте к нам
        </h2>
        <ol className="mt-12 grid gap-12 lg:mt-16 lg:gap-16">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={delay(80)} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist", i % 2 === 0 ? "lg:order-2" : "lg:order-1")}>
                <Image src={s.img} alt={s.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: s.pos }} />
              </div>
              <div className={cn("lg:px-6", i % 2 === 0 ? "lg:order-1" : "lg:order-2")}>
                <h3 className="flex items-center gap-4 text-[1.25rem] font-semibold text-ink">
                  <Arrow />
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
