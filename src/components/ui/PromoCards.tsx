import Link from "next/link";
import { ArrowUpRight, Check, Gift } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { Emblem } from "@/components/Logo";
import { promoDisclaimer, promos, type Promo } from "@/data/promos";
import { formatPrice } from "@/data/services";
import { cn } from "@/lib/cn";
import { delay } from "./Section";

const tones: Record<Promo["tone"], { card: string; muted: string; badge: string; line: string; dark: boolean }> = {
  forest: {
    card: "bg-forest text-white grain",
    muted: "text-white/70",
    badge: "bg-sun text-ink",
    line: "border-white/18",
    dark: true,
  },
  peach: {
    card: "bg-peach-soft text-ink",
    muted: "text-moss",
    badge: "bg-white text-forest-deep",
    line: "border-ink/10",
    dark: false,
  },
  mint: {
    card: "bg-mint-soft text-ink",
    muted: "text-moss",
    badge: "bg-white text-forest-deep",
    line: "border-ink/10",
    dark: false,
  },
};

function PromoCard({ promo, index, as: Heading }: { promo: Promo; index: number; as: "h2" | "h3" }) {
  const t = tones[promo.tone];
  return (
    <article
      id={promo.slug}
      data-reveal
      style={delay(index * 110)}
      className={cn(
        "group relative isolate flex scroll-mt-28 flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9",
        t.card,
        promo.tone === "forest" ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6",
      )}
    >
      <Emblem
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 -z-10 size-64 transition-transform duration-[1.8s] ease-soft group-hover:rotate-[30deg]",
          t.dark ? "text-white/[0.07]" : "text-forest/[0.07]",
        )}
      />
      <p className={cn("inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold", t.badge)}>
        {promo.slug === "chek-ap-pecheni" && <Gift className="size-3.5" aria-hidden="true" />}
        {promo.badge}
      </p>
      <Heading className="mt-6 text-[1.9rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[2.4rem]">{promo.title}</Heading>
      <p className={cn("mt-3 max-w-md leading-relaxed", t.muted)}>{promo.lead}</p>

      {promo.items && (
        <ul className={cn("mt-8 flex flex-1 flex-col border-t", t.line)}>
          {promo.items.map((it) => (
            <li key={it.title} className={cn("flex flex-1 border-b", t.line)}>
              <Link
                href={it.href ?? promo.href}
                className="group/i grid w-full grid-cols-[1fr_auto] items-center gap-x-5 gap-y-1 py-5"
              >
                <span>
                  <span className="flex items-center gap-2 text-[1.1rem] font-medium tracking-[-0.02em]">
                    {it.title}
                    <ArrowUpRight className="size-4 opacity-0 transition-[opacity,transform] duration-300 group-hover/i:translate-x-0.5 group-hover/i:opacity-100" aria-hidden="true" />
                  </span>
                  <span className={cn("mt-1 block text-[0.9rem] leading-snug", t.muted)}>{it.detail}</span>
                </span>
                <span className="text-right leading-tight">
                  {it.old && <s className={cn("block text-[0.85rem]", t.muted)}>{formatPrice(it.old)}</s>}
                  <span className="text-[1.45rem] font-medium tracking-[-0.03em] text-sun">{formatPrice(it.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {promo.includes && (
        <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
          {promo.includes.map((x) => (
            <li key={x} className="flex items-start gap-2.5 text-[0.93rem]">
              <Check className="mt-0.5 size-4 shrink-0 text-forest" strokeWidth={2.2} aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
      )}

      {promo.bonus && <p className="mt-6 text-[0.95rem] font-medium text-forest-deep">{promo.bonus}</p>}
      {promo.note && <p className={cn("mt-3 text-[0.82rem] leading-relaxed", t.muted)}>{promo.note}</p>}

      <div className={cn("flex flex-wrap items-end justify-between gap-5 pt-9", !promo.items && "mt-auto")}>
        {promo.price ? (
          <p className="leading-none">
            <span className="text-[2.3rem] font-medium tracking-[-0.04em] text-forest sm:text-[2.7rem]">
              {formatPrice(promo.price.value)}
            </span>
            <span className={cn("ml-2 text-sm", t.muted)}>/ {promo.price.unit}</span>
          </p>
        ) : (
          <p className={cn("max-w-[15rem] text-sm leading-snug", t.muted)}>Продолжительность каждого комплекса — 1 час</p>
        )}
        <div className="flex items-center gap-2">
          <Link
            href={promo.href}
            className={cn(
              "inline-flex h-12 items-center rounded-full border px-5 text-[0.93rem] font-medium transition-colors duration-300",
              t.dark
                ? "border-white/30 text-white hover:bg-white hover:text-forest"
                : "border-forest/30 text-forest-deep hover:border-forest",
            )}
          >
            {promo.cta}
          </Link>
          <BookingButton service={promo.title} variant={t.dark ? "sun" : "primary"}>
            Записаться
          </BookingButton>
        </div>
      </div>
    </article>
  );
}

export function PromoCards({ className, headingLevel = "h3" }: { className?: string; headingLevel?: "h2" | "h3" }) {
  return (
    <div className={className}>
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        {promos.map((p, i) => (
          <PromoCard key={p.slug} promo={p} index={i} as={headingLevel} />
        ))}
      </div>
      <p data-reveal className="mt-6 text-sm text-moss">
        {promoDisclaimer}
      </p>
    </div>
  );
}
