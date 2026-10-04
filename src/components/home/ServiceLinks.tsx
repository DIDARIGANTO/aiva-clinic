import Link from "next/link";
import { categories, categoryHref, serviceHref, servicesOf } from "@/data/services";

/** Блок «Услуги AIVA CLINIC» перед подвалом: карточки со списками ссылок на страницы услуг */
export function ServiceLinks() {
  return (
    <section className="bg-[#f8faf3] py-12 lg:py-16" aria-labelledby="links-title">
      <div className="shell">
        <h2 id="links-title" className="text-[1.5rem] font-bold text-ink sm:text-[1.75rem]">
          Услуги AIVA CLINIC
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const items = servicesOf(c.slug).filter((s) => s.page).slice(0, 6);
            const total = servicesOf(c.slug).length;
            return (
              <li key={c.slug} className="rounded-[1.25rem] border border-line bg-white p-5">
                <Link href={categoryHref(c)} className="text-[1rem] font-bold text-ink hover:text-forest">
                  {c.title}
                </Link>
                <ul className="mt-3 grid gap-1.5 text-[0.85rem]">
                  {items.map((s) => (
                    <li key={s.slug} className="flex gap-2">
                      <span aria-hidden="true" className="text-forest">•</span>
                      <Link href={serviceHref(s)} className="text-ink underline decoration-line underline-offset-2 hover:text-forest hover:decoration-forest">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                  {(total > items.length || items.length === 0) && (
                    <li className="flex gap-2">
                      <span aria-hidden="true" className="text-forest">•</span>
                      <Link href={categoryHref(c)} className="font-semibold text-forest">
                        {items.length === 0 ? "Подробнее о направлении" : `Все услуги направления (${total})`}
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
