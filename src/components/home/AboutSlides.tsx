"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import ivRoom1 from "@/assets/photos/iv-room-1.jpg";
import { cn } from "@/lib/cn";

type Slide = { title: string; text: string; img: StaticImageData; alt: string; pos: string };

/** Блок «О нас» по референсу: список с зелёными треугольниками слева, фото справа меняется по клику */
const slides: Slide[] = [
  {
    title: "Терапия и диагностика",
    text: "В клинике ведут приём врач общей практики, терапевт, гастроэнтеролог, эндокринолог, травматолог-ортопед и уролог-андролог. Доступны ультразвуковые исследования органов и сосудов, комплексные УЗИ и чек-апы: базовый, печени, щитовидной железы, сосудов и суставов.",
    img: lobby1,
    alt: "Холл AIVA CLINIC",
    pos: "50% 70%",
  },
  {
    title: "Отделение физиотерапии и реабилитации",
    text: "TECAR-терапия, магнитотерапия, ударно-волновая и ультразвуковая терапия, прессотерапия и экзотерапия. Лечебная физкультура, лечебный массаж и программы восстановления подбираются с учётом состояния и возможностей пациента.",
    img: deviceRoom,
    alt: "Кабинет аппаратной физиотерапии AIVA CLINIC",
    pos: "50% 60%",
  },
  {
    title: "Процедурный кабинет",
    text: "Капельницы, внутривенные, внутримышечные и подкожные инъекции выполняются по назначению врача в удобных креслах процедурного кабинета. Стоимость процедуры и состав расходных материалов можно уточнить перед записью.",
    img: ivRoom1,
    alt: "Процедурный кабинет AIVA CLINIC",
    pos: "50% 65%",
  },
];

export function AboutSlides() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-8 lg:py-12" aria-labelledby="about-title">
      <div className="shell">
        <div className="panel px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <p className="section-label" data-reveal>
            О нас
          </p>
          <h2 id="about-title" data-reveal className="text-h2-main mt-2 max-w-3xl text-ink">
            Делаем заботу о здоровье понятной и доступной
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <ul className="grid content-start gap-6 lg:col-span-5" role="tablist" aria-label="Направления клиники">
              {slides.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group grid w-full grid-cols-[auto_1fr] gap-x-4 text-left transition-opacity duration-300",
                      active === i ? "opacity-100" : "opacity-45 hover:opacity-80",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className={cn("mt-0.5 size-6 shrink-0", active === i ? "text-forest" : "text-sage")} fill="currentColor" aria-hidden="true">
                      <path d="M5 3.5v17l15-8.5-15-8.5Z" />
                    </svg>
                    <span>
                      <span className="block text-[1.15rem] font-semibold leading-snug text-ink">{s.title}</span>
                      <span className="mt-2 block text-[0.9rem] leading-relaxed text-ink">{s.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white lg:aspect-[5/4]">
                {slides.map((s, i) => (
                  <Image
                    key={s.title}
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={cn("object-cover transition-opacity duration-700", active === i ? "opacity-100" : "opacity-0")}
                    style={{ objectPosition: s.pos }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
