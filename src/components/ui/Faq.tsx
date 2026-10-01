import { Plus } from "lucide-react";
import type { QA } from "@/data/services";
import { cn } from "@/lib/cn";
import { delay } from "./Section";

/** Аккордеон на нативных <details>: работает без JavaScript, доступен с клавиатуры */
export function Faq({ items, className, name = "faq" }: { items: QA[]; className?: string; name?: string }) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          name={name}
          className="faq-item group border-b border-line"
          data-reveal
          style={delay(Math.min(i, 6) * 50)}
        >
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-forest sm:py-7">
            <span className="flex items-baseline gap-4 sm:gap-6">
              <span className="font-serif text-sm italic text-moss tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.08rem] font-medium leading-snug tracking-[-0.015em] sm:text-[1.25rem]">{item.q}</h3>
            </span>
            <span
              className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-line text-forest transition-[transform,background-color,color,border-color] duration-500 ease-soft group-open:rotate-45 group-open:border-forest group-open:bg-forest group-open:text-white"
              aria-hidden="true"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="pb-7 pl-[2.1rem] pr-12 sm:pl-[2.6rem] sm:pr-20">
            <p className="max-w-2xl leading-relaxed text-moss">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
