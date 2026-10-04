import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { delay } from "@/components/ui/Section";
import { promoDisclaimer } from "@/data/promos";
import { categoryHref, formatPrice, getCategory, serviceHref, servicesOf, type CategorySlug, type Service } from "@/data/services";

/**
 * Прайс по референсу: заголовок акции с красной биркой и блоки «название — цена»
 * в две колонки. Цены указаны только там, где они есть в материалах клиники.
 */
const blocks: { slug: CategorySlug; title: string; note?: string; onlyPages?: boolean }[] = [
  { slug: "uzi", title: "Комплексные УЗИ", onlyPages: true, note: "Продолжительность каждого комплекса — 1 час" },
  { slug: "chek-apy", title: "Чек-апы", note: "Приём врача входит в каждую программу" },
  { slug: "fizioterapiya", title: "Аппаратная физиотерапия", note: "Процедуры проводятся по показаниям после консультации специалиста" },
  { slug: "konsultacii", title: "Консультации врачей" },
  { slug: "reabilitaciya", title: "Реабилитация" },
  { slug: "procedurnyj-kabinet", title: "Процедурный кабинет", note: "Капельницы и инъекции выполняются по назначению врача" },
];

function PriceCell({ s }: { s: Service }) {
  if (s.price?.old) {
    return (
      <>
        <span className="block font-semibold text-forest">
          Цена со скидкой: {formatPrice(s.price.value)}
        </span>
        <span className="block font-light text-moss">
          Старая цена: <s>{formatPrice(s.price.old)}</s>
        </span>
      </>
    );
  }
  if (s.price) {
    return (
      <>
        <span className="block font-semibold text-forest">
          Цена: {formatPrice(s.price.value)}
          {s.price.unit ? ` / ${s.price.unit}` : ""}
        </span>
        {s.price.note && <span className="block font-light text-moss">{s.price.note}</span>}
      </>
    );
  }
  const fact = s.facts?.[0];
  return (
    <>
      {fact && (
        <span className="block font-semibold text-forest">
          {fact.label}: {fact.value}
        </span>
      )}
      <span className="block font-light text-moss">Стоимость уточняйте у администратора</span>
    </>
  );
}

export function PriceList() {
  return (
    <section id="ceny" className="scroll-mt-20 pb-10" aria-labelledby="promo-title">
      <div className="shell">
        <div data-reveal className="relative mx-auto w-fit text-center">
          <h2 id="promo-title" className="text-h2-xl text-ink">
            Специальные предложения!
          </h2>
          <span
            aria-hidden="true"
            className="absolute -right-6 -top-5 rotate-[14deg] rounded-md bg-tag px-3 py-1.5 text-[1.1rem] font-bold text-white shadow-soft sm:-right-20 sm:-top-2 sm:text-[1.5rem]"
          >
            до −32%
          </span>
        </div>
        <p data-reveal style={delay(80)} className="mx-auto mt-4 max-w-2xl text-center text-[1.05rem] text-moss">
          {promoDisclaimer}
        </p>

        {blocks.map((b, bi) => {
          const c = getCategory(b.slug)!;
          const items = servicesOf(b.slug).filter((s) => (b.onlyPages ? s.page : true));
          const rest = servicesOf(b.slug).length - items.length;
          return (
            <div key={b.slug} className="pt-16 lg:pt-24" data-reveal style={delay(Math.min(bi, 2) * 60)}>
              <h3 className="text-center text-[1.5rem] font-extrabold uppercase leading-tight text-ink sm:text-[2rem]">
                {b.title}
              </h3>
              {b.note && <p className="mx-auto mt-3 max-w-2xl text-center text-[1.1rem] font-light text-ink">{b.note}</p>}
              <ul className="mx-auto mt-10 grid max-w-5xl gap-x-16 lg:grid-cols-2">
                {items.map((s) => (
                  <li
                    key={s.slug}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 border-b border-forest/40 py-4 text-[0.95rem] leading-snug sm:text-[1rem]"
                  >
                    {s.page ? (
                      <Link href={serviceHref(s)} className="font-semibold text-ink underline-offset-4 transition-colors hover:text-forest hover:underline">
                        {s.title}
                      </Link>
                    ) : (
                      <span className="font-semibold text-ink">{s.title}</span>
                    )}
                    <span className="max-w-[15rem] text-right sm:max-w-none">
                      <PriceCell s={s} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link href={categoryHref(c)} className="group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-forest">
                  {rest > 0 ? `Ещё ${rest} исследования и подробности` : "Подробнее о направлении"}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
