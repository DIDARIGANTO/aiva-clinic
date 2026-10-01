import { ArrowUpRight, Star } from "lucide-react";
import { Emblem } from "@/components/Logo";
import { Eyebrow, delay } from "@/components/ui/Section";
import { site } from "@/lib/site";

/**
 * Отзывы. Тексты отзывов принадлежат их авторам и площадке, поэтому на сайте они не копируются
 * и не выдумываются: показываем фактическую оценку карточки 2ГИС и ведём на независимую площадку.
 */
export function Reviews() {
  return (
    <section className="section-y" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-white p-7 shadow-soft sm:p-12 lg:p-16">
          <Emblem className="pointer-events-none absolute -bottom-28 -left-24 -z-10 size-[26rem] text-forest/[0.045]" />
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>Отзывы пациентов</Eyebrow>
              </div>
              <h2 id="reviews-title" data-reveal style={delay(80)} className="text-h2 mt-5">
                Читайте отзывы там, где их <span className="accent">нельзя отредактировать</span>
              </h2>
              <p data-reveal style={delay(160)} className="text-lead mt-6 max-w-xl text-moss">
                Мы не публикуем на сайте отобранные цитаты. Все отзывы о клинике — на независимых площадках,
                в том виде, в котором их оставили пациенты.
              </p>
              <div data-reveal style={delay(240)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.maps.twogisReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-forest px-7 font-medium text-white transition-colors duration-300 hover:bg-forest-deep"
                >
                  Читать отзывы в 2ГИС
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                </a>
                <a
                  href={site.maps.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-forest/25 px-7 font-medium text-forest transition-colors duration-300 hover:border-forest"
                >
                  Клиника на Яндекс Картах
                </a>
              </div>
            </div>

            <div data-reveal="scale" style={delay(200)} className="lg:col-span-5">
              <a
                href={site.maps.twogisReviews}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Оценка клиники в 2ГИС: ${site.rating.value} из 5. Открыть отзывы`}
                className="group relative mx-auto block max-w-sm overflow-hidden rounded-[2rem] bg-forest p-8 text-white grain transition-transform duration-500 ease-soft hover:-translate-y-1.5 sm:p-10"
              >
                <p className="eyebrow text-white/65">Оценка в {site.rating.source}</p>
                <p className="mt-5 flex items-end gap-3">
                  <span className="font-serif text-[6.5rem] italic leading-[0.8] tracking-[-0.04em] sm:text-[7.5rem]">
                    {site.rating.value}
                  </span>
                  <span className="pb-2 text-white/60">из 5</span>
                </p>
                <div className="mt-6 flex gap-1 text-sun" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} className="size-5 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <ul className="mt-7 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 text-sm">
                  <li>
                    <span className="block text-[1.5rem] font-medium tracking-[-0.03em]">{site.rating.ratings}</span>
                    <span className="text-white/60">оценок</span>
                  </li>
                  <li>
                    <span className="block text-[1.5rem] font-medium tracking-[-0.03em]">{site.rating.reviews}</span>
                    <span className="text-white/60">отзыва</span>
                  </li>
                </ul>
                <p className="mt-6 text-xs text-white/45">По данным карточки клиники в 2ГИС на {site.rating.asOf}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
