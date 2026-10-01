import { ArrowUpRight, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { MapBlock } from "@/components/MapBlock";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, delay } from "@/components/ui/Section";
import { bookingOptions } from "@/data/services";
import { pageMeta } from "@/lib/meta";
import { site, waLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Контакты — адрес, телефон и график работы в Астане",
  description:
    "AIVA CLINIC: Астана, ул. Е 669, 13. Телефон +7 708 733 28 81, WhatsApp +7 747 227 40 96. Ежедневно 08:00–20:00, без выходных. Карта 2ГИС и маршрут до клиники.",
  path: "/kontakty",
});

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Контакты", path: "/kontakty" }]}
        eyebrow="Контакты"
        title={
          <>
            Мы рядом — <span className="accent">ежедневно</span> с 08:00 до 20:00
          </>
        }
        lead="Запишитесь на приём, задайте вопрос администратору или постройте маршрут до клиники."
        className="lg:pb-16"
      />

      <section className="pb-16 lg:pb-24" aria-label="Контактные данные">
        <div className="shell">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <li className="hero-slide flex flex-col rounded-[1.75rem] bg-white p-7 shadow-soft">
              <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-forest">
                <MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2 className="eyebrow mt-7 text-moss">Адрес</h2>
              <address className="mt-3 text-[1.3rem] font-medium not-italic leading-snug tracking-[-0.02em]">
                {site.address.city},
                <br />
                {site.address.street}
              </address>
              <p className="mt-1.5 text-sm text-moss">{site.address.district}</p>
              <a href={site.maps.twogis} target="_blank" rel="noopener noreferrer" className="group mt-auto inline-flex items-center gap-1.5 pt-6 font-medium text-forest">
                <span className="link-line">Открыть в 2ГИС</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>

            <li className="hero-slide flex flex-col rounded-[1.75rem] bg-white p-7 shadow-soft">
              <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-forest">
                <Phone className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2 className="eyebrow mt-7 text-moss">Телефон</h2>
              <a href={site.phone.href} className="mt-3 text-[1.3rem] font-medium leading-snug tracking-[-0.02em] transition-colors hover:text-forest">
                {site.phone.display}
              </a>
              <p className="mt-1.5 text-sm text-moss">Администрация клиники</p>
              <a href={site.phone.href} className="group mt-auto inline-flex items-center gap-1.5 pt-6 font-medium text-forest">
                <span className="link-line">Позвонить</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>

            <li className="hero-slide flex flex-col rounded-[1.75rem] bg-forest p-7 text-white grain">
              <span className="grid size-12 place-items-center rounded-full bg-white/15">
                <WhatsAppIcon className="size-5" />
              </span>
              <h2 className="eyebrow mt-7 text-white/60">WhatsApp для записи</h2>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-3 text-[1.3rem] font-medium leading-snug tracking-[-0.02em]">
                {site.whatsapp.display}
              </a>
              <p className="mt-1.5 text-sm text-white/65">Поможем выбрать специалиста и время</p>
              <div className="mt-auto pt-6">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-leaf px-5 font-medium text-ink transition-[filter] duration-300 hover:brightness-95">
                  Написать в WhatsApp
                </a>
              </div>
            </li>

            <li className="hero-slide flex flex-col rounded-[1.75rem] bg-white p-7 shadow-soft">
              <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-forest">
                <Clock className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2 className="eyebrow mt-7 text-moss">График работы</h2>
              <p className="mt-3 text-[1.3rem] font-medium leading-snug tracking-[-0.02em]">
                Ежедневно
                <br />
                {site.hours.short}
              </p>
              <p className="mt-1.5 text-sm text-moss">Без выходных</p>
              <ul className="mt-auto flex gap-2 pt-6">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`AIVA CLINIC в ${label}`}
                      className="grid size-11 place-items-center rounded-full border border-line text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-white"
                    >
                      <Icon className="size-[1.1rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="map-title">
        <div className="shell">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div data-reveal>
                <Eyebrow>Как добраться</Eyebrow>
              </div>
              <h2 id="map-title" data-reveal style={delay(80)} className="text-h2 mt-5">
                Клиника <span className="accent">на карте</span>
              </h2>
            </div>
            <p data-reveal style={delay(140)} className="max-w-sm text-moss">
              {site.address.full}, {site.address.district}. Вход и подробная схема проезда — в карточке
              клиники в 2ГИС.
            </p>
          </div>
          <div data-reveal style={delay(120)}>
            <MapBlock />
          </div>
        </div>
      </section>

      <section id="zapis" className="scroll-mt-24 px-3 pb-3 sm:px-5 sm:pb-5" aria-labelledby="contact-form-title">
        <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-mist sm:rounded-[3rem]">
          <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
            <div className="lg:col-span-5">
              <div data-reveal>
                <Eyebrow>Обратная связь</Eyebrow>
              </div>
              <h2 id="contact-form-title" data-reveal style={delay(80)} className="text-h2 mt-5">
                Напишите нам — <span className="accent">мы ответим</span>
              </h2>
              <p data-reveal style={delay(160)} className="text-lead mt-6 max-w-md text-moss">
                Оставьте заявку на приём или вопрос. Администратор свяжется с вами, поможет выбрать
                специалиста и удобное время.
              </p>
              <p data-reveal style={delay(240)} className="mt-10 flex max-w-md items-start gap-3 border-t border-forest/15 pt-7 text-[0.95rem] leading-relaxed text-moss">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                {site.license.label}. Данные из формы используются только для связи с вами по вопросу записи.
              </p>
            </div>
            <div data-reveal="scale" style={delay(160)} className="lg:col-span-7 lg:pl-10">
              <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-9">
                <BookingForm groups={bookingOptions()} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
