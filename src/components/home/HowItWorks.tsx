import { LeafOutline } from "@/components/icons";
import { SectionHeading } from "@/components/ui/Section";
import { Steps } from "@/components/ui/Steps";
import type { Step } from "@/data/services";

/** Путь пациента — по описанию из материалов клиники («С чего начать», «Наш подход») */
const steps: Step[] = [
  {
    title: "Запись на приём",
    text: "Оставьте заявку на сайте, напишите в WhatsApp или позвоните. Если не знаете, к какому врачу обратиться, администратор поможет выбрать специалиста.",
  },
  {
    title: "Подтверждение записи",
    text: "Администратор свяжется с вами, согласует дату и время и подскажет, нужна ли подготовка.",
  },
  {
    title: "Посещение клиники",
    text: "Приходите к назначенному времени. Возьмите результаты предыдущих обследований и список принимаемых препаратов.",
  },
  {
    title: "Консультация и рекомендации",
    text: "Врач выслушает жалобы, определит необходимые обследования и объяснит дальнейшие шаги: лечение, процедуры и повторный приём.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-pine text-white grain section-y" aria-labelledby="how-title">
      <LeafOutline className="pointer-events-none absolute -left-6 bottom-10 -z-10 hidden h-96 w-auto -rotate-12 text-white/[0.06] lg:block" />
      <LeafOutline className="pointer-events-none absolute -right-4 top-10 -z-10 hidden h-72 w-auto rotate-[28deg] text-white/[0.06] lg:block" />
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Как проходит приём"
          title={
            <span id="how-title">
              Четыре шага — от заявки <span className="accent text-sun">до плана действий</span>
            </span>
          }
        />
        <Steps steps={steps} tone="dark" className="mt-14 lg:mt-20" />
      </div>
    </section>
  );
}
