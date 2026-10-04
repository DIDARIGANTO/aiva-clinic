import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { formatPrice, serviceHref, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

/** Строка услуги в стиле прайса референса: название и описание слева, цена и кнопки справа */
export function ServiceRow({ service, className }: { service: Service; className?: string }) {
  const s = service;
  const duration = s.facts?.[0];
  return (
    <article
      id={s.page ? undefined : s.slug}
      className={cn(
        "group relative grid scroll-mt-28 gap-x-8 gap-y-4 border-b border-forest/40 py-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-[1.05rem] font-semibold leading-snug text-ink sm:text-[1.1rem]">
          {s.page ? (
            <Link href={serviceHref(s)} className="transition-colors duration-300 after:absolute after:inset-0 hover:text-forest">
              {s.title}
            </Link>
          ) : (
            s.title
          )}
        </h3>
        <p className="mt-1.5 max-w-2xl text-[0.93rem] leading-relaxed text-ink">{s.summary}</p>
        {(s.prep || duration) && (
          <p className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.85rem] font-medium text-forest">
            {duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {duration.label}: {duration.value}
              </span>
            )}
            {s.prep && <span className="font-normal text-moss">{s.prep}</span>}
          </p>
        )}
        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2.5">
          {s.page && (
            <Link
              href={serviceHref(s)}
              aria-label={`Подробнее: ${s.title}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-line px-4 text-[0.82rem] font-semibold text-ink transition-colors duration-300 hover:border-forest hover:text-forest"
            >
              Подробнее
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          )}
          <BookingButton service={s.title} size="sm" variant="soft" aria-label={`Записаться: ${s.title}`}>
            Записаться
          </BookingButton>
        </div>
      </div>

      <div className="text-[0.95rem] leading-snug lg:text-right">
        {s.price ? (
          <>
            <p className="font-semibold text-forest">
              {s.price.old ? "Цена со скидкой: " : "Цена: "}
              {formatPrice(s.price.value)}
              {s.price.unit && <span className="font-normal text-moss"> / {s.price.unit}</span>}
            </p>
            {s.price.old && (
              <p className="mt-0.5 font-light text-moss">
                Старая цена: <s>{formatPrice(s.price.old)}</s>
              </p>
            )}
            {s.price.note && <p className="mt-0.5 font-light text-moss">{s.price.note}</p>}
          </>
        ) : (
          <p className="font-light text-moss">Стоимость уточняйте у администратора</p>
        )}
      </div>
    </article>
  );
}
