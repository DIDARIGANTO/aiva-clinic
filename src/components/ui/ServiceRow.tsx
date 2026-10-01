import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { formatPrice, serviceHref, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

/** Строка услуги: название, краткое описание, цена (если есть в материалах), «Подробнее» и «Записаться» */
export function ServiceRow({ service, className }: { service: Service; className?: string }) {
  const s = service;
  const duration = s.facts?.[0];
  return (
    <article
      id={s.page ? undefined : s.slug}
      className={cn(
        "group relative grid scroll-mt-28 gap-x-8 gap-y-4 border-b border-line py-6 transition-colors duration-500 sm:py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-[1.2rem] font-medium leading-snug tracking-[-0.02em] sm:text-[1.35rem]">
          {s.page ? (
            <Link href={serviceHref(s)} className="transition-colors duration-300 after:absolute after:inset-0 hover:text-forest">
              {s.title}
            </Link>
          ) : (
            s.title
          )}
        </h3>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-moss">{s.summary}</p>
        {(s.prep || duration) && (
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.85rem] text-forest">
            {duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {duration.label}: {duration.value}
              </span>
            )}
            {s.prep && <span className="text-moss">{s.prep}</span>}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-3 lg:justify-end">
        {s.price ? (
          <p className="mr-auto leading-tight lg:mr-2 lg:text-right">
            {s.price.old && (
              <s className="block text-[0.82rem] text-moss">{formatPrice(s.price.old)}</s>
            )}
            <span className="text-[1.3rem] font-medium tracking-[-0.02em] text-forest">{formatPrice(s.price.value)}</span>
            {s.price.unit && <span className="ml-1.5 text-[0.82rem] text-moss">/ {s.price.unit}</span>}
          </p>
        ) : null}
        {s.page && (
          <Link
            href={serviceHref(s)}
            aria-label={`Подробнее: ${s.title}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors duration-300 hover:border-forest hover:text-forest"
          >
            Подробнее
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        )}
        <BookingButton service={s.title} size="sm" variant="soft" aria-label={`Записаться: ${s.title}`}>
          Записаться
        </BookingButton>
      </div>
    </article>
  );
}
