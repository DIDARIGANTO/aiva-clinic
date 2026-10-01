import { EMBLEM_PATH, EMBLEM_VIEWBOX, WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/assets/brand/logo-paths";
import { cn } from "@/lib/cn";

/**
 * Фирменный знак AIVA CLINIC. Контуры взяты из оригинального векторного логотипа.
 * Спрайт подключается один раз в корневом layout, дальше знак используется через <use>.
 */
export function LogoSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <path id="aiva-emblem" d={EMBLEM_PATH} fill="currentColor" fillRule="evenodd" />
        <path id="aiva-wordmark" d={WORDMARK_PATH} fill="currentColor" />
      </defs>
    </svg>
  );
}

export function Emblem({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={cn("block", className)}
      viewBox={EMBLEM_VIEWBOX}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#aiva-emblem" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg className={cn("block", className)} viewBox={WORDMARK_VIEWBOX} aria-hidden="true" focusable="false">
      <use href="#aiva-wordmark" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Emblem className={compact ? "size-8" : "size-9 sm:size-10"} />
      <Wordmark className={compact ? "h-3 w-auto" : "h-[0.8rem] w-auto sm:h-[0.9rem]"} />
      <span className="sr-only">AIVA CLINIC</span>
    </span>
  );
}
