import type { Step } from "@/data/services";
import { cn } from "@/lib/cn";
import { delay } from "./Section";

/** Этапы — пронумерованная лента с соединительной линией */
export function Steps({ steps, tone = "light", className }: { steps: Step[]; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const cols =
    steps.length >= 4 ? "lg:grid-cols-4" : steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <ol className={cn("relative grid gap-0 lg:gap-8", cols, className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          data-reveal
          style={delay(i * 110)}
          className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-9 last:pb-0 lg:block lg:pb-0"
        >
          {/* вертикальная линия на мобильных */}
          {i < steps.length - 1 && (
            <span
              className={cn("absolute left-6 top-12 bottom-0 w-px lg:hidden", dark ? "bg-white/15" : "bg-line")}
              aria-hidden="true"
            />
          )}
          <div className="relative flex items-center lg:mb-7">
            <span
              className={cn(
                "relative z-10 grid size-12 shrink-0 place-items-center rounded-full font-serif text-lg italic",
                dark ? "bg-sun text-ink" : "bg-forest text-white",
              )}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "ml-4 hidden h-px flex-1 lg:block",
                  dark ? "bg-gradient-to-r from-white/30 to-white/5" : "bg-gradient-to-r from-forest/35 to-forest/5",
                )}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="pt-2 lg:pr-6 lg:pt-0">
            <h3 className={cn("text-[1.2rem] font-medium tracking-[-0.02em] lg:text-[1.35rem]", dark && "text-white")}>
              {s.title}
            </h3>
            <p className={cn("mt-2.5 leading-relaxed", dark ? "text-white/65" : "text-moss")}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
