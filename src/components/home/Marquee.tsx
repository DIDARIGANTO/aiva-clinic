import { Emblem } from "@/components/Logo";

const items = [
  "Консультации врачей",
  "УЗИ-диагностика",
  "Чек-апы",
  "Физиотерапия",
  "Реабилитация",
  "Процедурный кабинет",
];

/** Бегущая строка направлений — декоративный акцент, дублирует навигацию ниже */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, idx) => (
        <li key={t} className="flex items-center">
          <span className={idx % 2 ? "accent px-6 text-[clamp(1.6rem,3.4vw,3rem)] sm:px-9" : "px-6 text-[clamp(1.5rem,3.1vw,2.75rem)] font-medium tracking-[-0.03em] text-ink sm:px-9"}>
            {t}
          </span>
          <Emblem className="size-6 text-leaf sm:size-8" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden border-y border-line bg-white/60 py-5 sm:py-7" role="presentation">
      <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
        {row(true)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-milk to-transparent sm:w-32" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-milk to-transparent sm:w-32" aria-hidden="true" />
    </div>
  );
}
