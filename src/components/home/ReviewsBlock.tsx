import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import lobby2 from "@/assets/photos/lobby-2.jpg";
import { delay } from "@/components/ui/Section";
import { site } from "@/lib/site";

/**
 * Блок отзывов по референсу: фото с «плавающими» цифрами, три карточки с оценками площадок,
 * кнопка «Посмотреть все отзывы». Тексты отзывов не копируются — они читаются на самой площадке.
 */
export function ReviewsBlock() {
  return (
    <section className="section-y" aria-labelledby="reviews-title">
      <div className="shell">
        <p className="section-label text-center" data-reveal>
          Отзывы
        </p>
        <h2 id="reviews-title" data-reveal className="text-h2-main mx-auto mt-2 max-w-3xl text-center text-ink">
          Ваши отзывы — лучшая оценка нашей работы
        </h2>

        <div className="relative mx-auto mt-10 max-w-4xl lg:mt-14">
          <div data-reveal className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-mist">
            <Image src={lobby2} alt="Зона ожидания AIVA CLINIC" fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover object-[50%_72%]" />
          </div>
          <div data-reveal style={delay(150)} className="card-green absolute -left-2 top-[30%] w-[11rem] rounded-[1.25rem] px-4 py-3 text-center sm:-left-10 sm:w-[14rem] sm:px-5 sm:py-4">
            <p className="text-[2rem] font-bold leading-none text-forest sm:text-[2.6rem]">{site.rating.value}</p>
            <p className="mt-1 text-[0.8rem] leading-snug text-ink sm:text-[0.9rem]">оценка клиники в 2ГИС</p>
          </div>
          <div data-reveal style={delay(250)} className="card-green absolute -right-2 bottom-[12%] w-[11rem] rounded-[1.25rem] px-4 py-3 text-center sm:-right-10 sm:w-[14rem] sm:px-5 sm:py-4">
            <p className="text-[2rem] font-bold leading-none text-forest sm:text-[2.6rem]">{site.rating.reviews}</p>
            <p className="mt-1 text-[0.8rem] leading-snug text-ink sm:text-[0.9rem]">отзыва пациентов</p>
          </div>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-3 lg:mt-20">
          <li data-reveal className="card-green flex flex-col items-center px-6 py-8 text-center">
            <p className="text-[1.3rem] font-bold text-ink">2ГИС</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-[3rem] font-bold leading-none text-forest">{site.rating.value}</span>
              <span className="text-[1.1rem] text-ink">из 5</span>
            </p>
            <a href={site.maps.twogisReviews} target="_blank" rel="noopener noreferrer" className="mt-2 text-[0.85rem] text-ink underline underline-offset-2 hover:text-forest">
              в отзывах 2GIS
            </a>
          </li>
          <li data-reveal style={delay(100)} className="card-green flex flex-col items-center px-6 py-8 text-center">
            <p className="text-[1.3rem] font-bold text-ink">Оценки</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-[3rem] font-bold leading-none text-forest">{site.rating.ratings}</span>
            </p>
            <p className="mt-2 text-[0.85rem] text-ink">оценок пациентов в 2ГИС на {site.rating.asOf}</p>
          </li>
          <li data-reveal style={delay(200)} className="card-green flex flex-col items-center px-6 py-8 text-center">
            <p className="text-[1.3rem] font-bold text-ink">Яндекс Карты</p>
            <p className="mt-3 text-[1.05rem] font-semibold leading-snug text-forest">Станьте первым, кто оставит отзыв</p>
            <a href={site.maps.yandex} target="_blank" rel="noopener noreferrer" className="mt-2 text-[0.85rem] text-ink underline underline-offset-2 hover:text-forest">
              карточка клиники на Яндексе
            </a>
          </li>
        </ul>

        <div className="mt-12 text-center" data-reveal>
          <a
            href={site.maps.twogisReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-10 text-[1rem] font-medium text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
          >
            Посмотреть все отзывы
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
