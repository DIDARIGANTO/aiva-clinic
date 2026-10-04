import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import lobby2 from "@/assets/photos/lobby-2.jpg";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import patientNeck from "@/assets/photos/patient-neck.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import ivRoom1 from "@/assets/photos/iv-room-1.jpg";
import patientExoLie from "@/assets/photos/patient-exo-lie.jpg";
import { delay } from "@/components/ui/Section";
import { categoryHref, getCategory, type CategorySlug } from "@/data/services";

/** «Наши услуги» по референсу: шесть карточек с зелёной рамкой, фото сверху, название и описание */
const cards: { slug: CategorySlug; text: string; img: StaticImageData; pos: string }[] = [
  { slug: "konsultacii", text: "Терапевт, врач общей практики, гастроэнтеролог, эндокринолог, травматолог-ортопед и уролог-андролог.", img: lobby2, pos: "50% 70%" },
  { slug: "uzi", text: "УЗИ органов брюшной полости, почек, щитовидной железы, малого таза, молочных желёз и сосудов. Комплексы за один визит.", img: patientNeck, pos: "50% 30%" },
  { slug: "chek-apy", text: "Готовые программы обследования: базовый чек-ап, печень, щитовидная железа, сосуды и суставы — с приёмом врача.", img: lobby1, pos: "50% 70%" },
  { slug: "fizioterapiya", text: "TECAR-терапия, магнитотерапия, ударно-волновая и ультразвуковая терапия, прессотерапия и экзотерапия.", img: deviceRoom, pos: "50% 60%" },
  { slug: "procedurnyj-kabinet", text: "Капельницы, внутривенные, внутримышечные и подкожные инъекции по назначению врача.", img: ivRoom1, pos: "50% 65%" },
  { slug: "reabilitaciya", text: "Лечебная физкультура, лечебный массаж и индивидуальные программы восстановления движений.", img: patientExoLie, pos: "50% 50%" },
];

export function ServiceCards() {
  return (
    <section className="section-y pt-4" aria-labelledby="services-title">
      <div className="shell">
        <p className="section-label text-center" data-reveal>
          Наши услуги
        </p>
        <h2 id="services-title" data-reveal className="text-h2-main mx-auto mt-2 max-w-3xl text-center text-ink">
          Помогаем от первого приёма до восстановления
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const c = getCategory(card.slug)!;
            return (
              <li key={card.slug} data-reveal style={delay((i % 3) * 90)}>
                <Link href={categoryHref(c)} className="card-green group flex h-full flex-col p-2.5 pb-7 transition-shadow duration-300 hover:shadow-lift">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-mist">
                    <Image src={card.img} alt={c.imageAlt ?? c.title} fill sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" className="img-zoom object-cover" style={{ objectPosition: card.pos }} />
                  </span>
                  <span className="mt-6 block px-4 text-center text-[1.15rem] font-semibold leading-snug text-ink">{c.title}</span>
                  <span className="mt-3 block px-5 text-center text-[0.88rem] leading-relaxed text-ink">{card.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 text-center" data-reveal>
          <Link href="/uslugi" className="inline-flex h-14 items-center justify-center rounded-full bg-soft-btn px-10 text-[1rem] font-semibold text-ink transition-colors duration-300 hover:bg-forest hover:text-white">
            Узнать цены
          </Link>
        </div>
      </div>
    </section>
  );
}
