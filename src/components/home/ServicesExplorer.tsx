"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ExplorerTab = {
  slug: string;
  label: string;
  href: string;
  lead: string;
  total: number;
  note?: string;
  /** готовые строки услуг (серверные компоненты) */
  rows: ReactNode;
};

/** Каталог услуг с вкладками по направлениям. Вся разметка есть в HTML — вкладки лишь переключают видимость. */
export function ServicesExplorer({ tabs }: { tabs: ExplorerTab[] }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
    refs.current[next]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative -mx-[clamp(1.15rem,0.4rem+3.4vw,3.5rem)]">
        <div
          role="tablist"
          aria-label="Направления услуг"
          onKeyDown={onKey}
          className="no-scrollbar flex gap-2 overflow-x-auto px-[clamp(1.15rem,0.4rem+3.4vw,3.5rem)] pb-1"
        >
          {tabs.map((t, i) => (
            <button
              key={t.slug}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full border px-5 text-[0.95rem] font-medium transition-[background-color,border-color,color] duration-300",
                active === i
                  ? "border-forest bg-forest text-white"
                  : "border-line bg-white text-ink hover:border-forest/40 hover:text-forest",
              )}
            >
              {t.label}
              <span
                className={cn(
                  "grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs tabular-nums transition-colors duration-300",
                  active === i ? "bg-white/18 text-white" : "bg-mist text-moss",
                )}
              >
                {t.total}
              </span>
            </button>
          ))}
        </div>
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.slug}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="tab-panel mt-8 outline-none lg:mt-10"
        >
          <div className="grid gap-x-10 gap-y-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-lead text-ink">{t.lead}</p>
                {t.note && <p className="mt-4 text-sm leading-relaxed text-moss">{t.note}</p>}
                <Link
                  href={t.href}
                  className="group/l mt-6 inline-flex items-center gap-2 font-medium text-forest"
                >
                  <span className="link-line">Всё о направлении</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="border-t border-line lg:col-span-8">{t.rows}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
