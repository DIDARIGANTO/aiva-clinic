import { serviceIcons } from "@/components/icons";
import { Emblem } from "@/components/Logo";
import type { IconName, Tone } from "@/data/services";
import { cn } from "@/lib/cn";

export const toneBg: Record<Tone, string> = {
  mint: "bg-mint-soft",
  peach: "bg-peach-soft",
  sun: "bg-sun-soft",
  forest: "bg-forest",
  leaf: "bg-[#e9f4e0]",
};

/**
 * Фирменная плитка-иллюстрация для направлений, у которых нет собственных фотографий:
 * вместо случайных стоковых изображений — цвет палитры, знак клиники и иконка.
 */
export function ToneTile({
  tone,
  icon,
  className,
  iconClassName,
  figure,
  caption,
}: {
  tone: Tone;
  icon: IconName;
  className?: string;
  iconClassName?: string;
  /** крупная цифра и подпись — факт из материалов клиники */
  figure?: string | number;
  caption?: string;
}) {
  const Icon = serviceIcons[icon];
  const dark = tone === "forest";
  return (
    <div className={cn("relative isolate overflow-hidden", toneBg[tone], className)} aria-hidden={figure === undefined ? true : undefined}>
      <Emblem
        className={cn(
          "absolute -bottom-[22%] -right-[18%] aspect-square w-[78%] transition-transform duration-[1.6s] ease-soft group-hover:rotate-[20deg]",
          dark ? "text-white/10" : "text-forest/[0.09]",
        )}
      />
      <span
        className={cn(
          "absolute left-[9%] top-[10%] grid aspect-square w-[22%] min-w-12 max-w-20 place-items-center rounded-full",
          dark ? "bg-white/12 text-white" : "bg-white text-forest shadow-soft",
          iconClassName,
        )}
      >
        <Icon className="size-[46%]" strokeWidth={1.5} />
      </span>
      {figure !== undefined && (
        <p className="absolute bottom-[9%] left-[9%] right-[9%]">
          <span className={cn("block font-serif text-[clamp(4.5rem,11vw,8.5rem)] italic leading-[0.85] tracking-[-0.03em]", dark ? "text-white" : "text-forest")}>
            {figure}
          </span>
          {caption && (
            <span className={cn("mt-3 block max-w-[14rem] text-[0.95rem] leading-snug", dark ? "text-white/70" : "text-moss")}>{caption}</span>
          )}
        </p>
      )}
    </div>
  );
}
