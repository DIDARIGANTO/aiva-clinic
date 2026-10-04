import Image, { type StaticImageData } from "next/image";
import salambekova from "@/assets/doctors/salambekova-zhuldyz.jpg";
import device1 from "@/assets/photos/device-1.jpg";
import ivRoom2 from "@/assets/photos/iv-room-2.jpg";
import { delay } from "@/components/ui/Section";

/** «Преимущества лечения в нашей клинике» — три круга с фотографиями */
const items: { title: string; text: string; img: StaticImageData; pos: string; alt: string }[] = [
  {
    title: "Команда врачей",
    text: "Терапевт, врачи общей практики, эндокринолог и травматолог-ортопед — консультации и обследования в одной клинике.",
    img: salambekova,
    pos: "50% 18%",
    alt: "Главный врач AIVA CLINIC",
  },
  {
    title: "Современное оборудование",
    text: "TECAR-терапия, магнитотерапия, ударно-волновая терапия, прессотерапия и экзотерапия в отделении физиотерапии.",
    img: device1,
    pos: "50% 45%",
    alt: "Аппарат экзотерапии в кабинете клиники",
  },
  {
    title: "Комфортный процедурный кабинет",
    text: "Капельницы и инъекции по назначению врача — в удобных креслах процедурного кабинета.",
    img: ivRoom2,
    pos: "50% 55%",
    alt: "Кресла для инфузионной терапии",
  },
];

export function Advantages() {
  return (
    <section className="section-y" aria-labelledby="adv-title">
      <div className="shell">
        <h2 id="adv-title" data-reveal className="text-h2-xl mx-auto max-w-3xl text-center text-ink">
          Преимущества лечения в нашей клинике
        </h2>
        <ul className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-20">
          {items.map((it, i) => (
            <li key={it.title} data-reveal style={delay(i * 110)} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="relative size-40">
                <span className="absolute inset-0 rounded-full bg-forest" aria-hidden="true" />
                <span className="absolute -right-3 -top-3 block size-36 overflow-hidden rounded-full border-4 border-white shadow-lift">
                  <Image src={it.img} alt={it.alt} fill sizes="144px" className="object-cover" style={{ objectPosition: it.pos }} />
                </span>
              </div>
              <h3 className="mt-7 text-[1.25rem] font-semibold text-ink">{it.title}</h3>
              <p className="mt-2.5 max-w-xs text-[0.9rem] leading-relaxed text-ink">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
