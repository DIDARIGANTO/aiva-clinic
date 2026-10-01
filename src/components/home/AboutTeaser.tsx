import Image from "next/image";
import lobby2 from "@/assets/photos/lobby-2.jpg";
import ivRoom2 from "@/assets/photos/iv-room-2.jpg";
import exoDetail from "@/assets/photos/exo-detail.jpg";
import { ButtonLink } from "@/components/Button";
import { Emblem } from "@/components/Logo";
import { Eyebrow, delay } from "@/components/ui/Section";

export function AboutTeaser() {
  return (
    <section className="section-y overflow-hidden" aria-labelledby="about-title">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* коллаж из фотографий клиники */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[34rem] pb-16 pr-10 sm:pb-24 sm:pr-24 lg:mx-0">
            <div data-reveal="clip">
              <div className="leaf-alt relative aspect-[4/5] overflow-hidden bg-mist shadow-lift">
                <Image
                  src={lobby2}
                  alt="Зона ожидания AIVA CLINIC: диван, растения и детский столик"
                  fill
                  sizes="(min-width: 1024px) 36vw, 80vw"
                  className="parallax object-cover object-[50%_65%]"
                />
              </div>
            </div>
            <div
              data-reveal
              style={delay(200)}
              className="absolute bottom-0 right-0 aspect-[4/5] w-[46%] overflow-hidden rounded-[1.75rem] border-[6px] border-milk bg-mist shadow-lift"
            >
              <Image
                src={ivRoom2}
                alt="Кресла для инфузионной терапии в процедурном кабинете"
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="object-cover"
              />
            </div>
            <div
              data-reveal
              style={delay(320)}
              className="absolute -left-3 bottom-8 hidden aspect-square w-[26%] overflow-hidden rounded-full border-[6px] border-milk bg-mist shadow-lift sm:block"
            >
              <Image
                src={exoDetail}
                alt="Экзостол с надписью «Экзотерапия»"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <Emblem className="absolute -right-4 -top-10 -z-10 size-40 animate-spin-slow text-leaf/25 sm:size-56" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-10">
          <div data-reveal>
            <Eyebrow>О клинике</Eyebrow>
          </div>
          <h2 id="about-title" data-reveal style={delay(80)} className="text-h2 mt-5">
            Помогаем вернуться <span className="accent">к активной жизни</span>
          </h2>
          <div data-reveal style={delay(160)} className="mt-7 grid gap-5 text-[1.05rem] leading-relaxed text-moss">
            <p>
              AIVA CLINIC объединяет консультации врачей, диагностику, физиотерапию и восстановление. К нам
              можно обратиться с жалобами на самочувствие, для обследования или подбора программы
              реабилитации.
            </p>
            <p>
              Основа нашего подхода — внимание к жалобам пациента и индивидуальный выбор медицинской помощи.
            </p>
          </div>

          <ul data-reveal style={delay(240)} className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {[
              ["6", "врачебных специальностей"],
              ["26", "видов УЗИ и комплексов"],
              ["5", "программ чек-ап"],
            ].map(([n, label]) => (
              <li key={label}>
                <span className="block font-serif text-[2.6rem] italic leading-none text-forest sm:text-[3.4rem]">{n}</span>
                <span className="mt-2 block text-[0.85rem] leading-snug text-moss sm:text-[0.93rem]">{label}</span>
              </li>
            ))}
          </ul>

          <div data-reveal style={delay(320)} className="mt-10">
            <ButtonLink href="/o-klinike" variant="outline" arrow>
              Подробнее о клинике
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
