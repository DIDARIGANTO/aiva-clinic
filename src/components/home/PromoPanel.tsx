import Image from "next/image";
import Link from "next/link";
import patientSmile from "@/assets/photos/patient-smile.jpg";
import { formatPrice, getService } from "@/data/services";

/** Панель с зелёной рамкой (как блок про седацию в референсе): специальное предложение клиники */
export function PromoPanel() {
  const k1 = getService("uzi", "kompleks-uzi-1")!;
  return (
    <section className="py-8 lg:py-12" aria-labelledby="promo-title">
      <div className="shell">
        <div data-reveal className="card-green grid items-center gap-8 overflow-hidden p-5 sm:p-7 lg:grid-cols-12 lg:gap-10 lg:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist lg:col-span-6">
            <Image src={patientSmile} alt="Пациентка в зале экзотерапии AIVA CLINIC" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_22%]" />
          </div>
          <div className="lg:col-span-6 lg:pr-6">
            <h2 id="promo-title" className="text-[1.4rem] font-bold uppercase leading-[1.2] text-forest sm:text-[1.7rem]">
              Комплексные УЗИ по специальной цене — три исследования за один визит!
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink">
              <strong className="font-semibold">Комплекс №1</strong> — органы брюшной полости, почки и щитовидная железа:{" "}
              <strong className="font-semibold">{formatPrice(k1.price!.value)}</strong> вместо{" "}
              <s>{formatPrice(k1.price!.old!)}</s>. Продолжительность — 1 час.
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
              Также доступны комплекс №2 (почки, мочевой пузырь, предстательная железа) и комплекс №3
              (щитовидная железа, молочные железы, органы малого таза). Срок действия предложения уточняйте
              у администратора.
            </p>
            <Link
              href="/akcii"
              className="mt-7 inline-flex h-14 items-center justify-center rounded-full bg-forest px-10 text-[1rem] font-medium text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
            >
              Узнать подробнее
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
