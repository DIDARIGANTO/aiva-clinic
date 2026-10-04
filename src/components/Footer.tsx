import Link from "next/link";
import { ArrowRight, Clock, Navigation, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MapBlock } from "@/components/MapBlock";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { categories, categoryHref } from "@/data/services";
import { routes, site, waLink } from "@/lib/site";

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

const mapLinks = [
  { label: "2ГИС", short: "2", href: site.maps.twogis, color: "bg-forest" },
  { label: "Яндекс Карты", short: "Я", href: site.maps.yandex, color: "bg-[#e5473b]" },
  { label: "Google Карты", short: "G", href: routes.google, color: "bg-[#4285f4]" },
];

/**
 * Подвал по референсу: салатовый блок с адресом и картой, белая полоса «Наша клиника на картах»
 * и тёмно-серый низ с навигацией.
 */
export function Footer() {
  return (
    <footer className="pb-24 sm:pb-0">
      {/* салатовый блок */}
      <div className="bg-forest pt-10 text-white lg:pt-14">
        <div className="shell">
          <p className="ruled-label text-white/95">{site.address.street}</p>
          <div className="grid items-center gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <p className="text-[2rem] font-bold uppercase leading-tight tracking-wide sm:text-[2.4rem]">
                {site.address.street}
              </p>
              <p className="mt-1 text-lg text-white/90">
                {site.address.city}, {site.address.district}
              </p>
              <ul className="mt-6 grid gap-3 text-[1.1rem]">
                <li className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  с {site.hours.opens} до {site.hours.closes} {site.hours.note}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                  <a href={site.phone.href}>{site.phone.display}</a>
                </li>
              </ul>
              <div className="mt-7 grid max-w-xs gap-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full border-2 border-white/80 px-6 text-[0.95rem] font-semibold transition-colors duration-300 hover:bg-white hover:text-forest"
                >
                  <WhatsAppIcon className="size-[1.15rem]" />
                  Написать в WhatsApp
                </a>
                <a
                  href={routes.twogis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full border-2 border-white/80 px-6 text-[0.95rem] font-semibold transition-colors duration-300 hover:bg-white hover:text-forest"
                >
                  <Navigation className="size-[1.1rem]" strokeWidth={1.8} aria-hidden="true" />
                  Проложить маршрут в 2GIS
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <MapBlock compact />
            </div>
          </div>
        </div>
      </div>

      {/* клиника на картах */}
      <div className="bg-white py-8">
        <div className="shell">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[1.25rem] font-bold text-ink sm:text-[1.5rem]">Наша клиника на картах</h2>
            <Link href="/kontakty" className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-forest">
              Адреса и контакты <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 rounded-[1.25rem] border border-line bg-white p-5 shadow-soft">
            <p className="text-[0.95rem] font-bold text-ink">{site.address.full}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {mapLinks.map((m) => (
                <li key={m.label}>
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-ink hover:text-forest">
                    <span className={`grid size-5 place-items-center rounded-full text-[0.65rem] font-bold text-white ${m.color}`} aria-hidden="true">
                      {m.short}
                    </span>
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* тёмно-серый низ */}
      <div className="bg-footer py-12 text-footer-text lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="AIVA CLINIC — на главную" className="inline-block text-white">
              <Logo />
            </Link>
            <p className="mt-3 text-[0.75rem] uppercase tracking-[0.12em]">{site.descriptor}</p>
            <ul className="mt-5 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AIVA CLINIC в ${label}`}
                    className="grid size-9 place-items-center rounded-full bg-footer-text/40 text-white transition-colors duration-300 hover:bg-forest"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.8rem] leading-relaxed">
              © {new Date().getFullYear()} {site.name}. Все права защищены.
              <br />
              {site.license.label}
            </p>
          </div>
          <nav aria-label="Основное" className="lg:col-span-2">
            <p className="text-[0.9rem] font-semibold">Основное</p>
            <ul className="mt-3 grid gap-2 text-[0.85rem] text-white/90">
              <li><Link href="/" className="hover:text-white">Главная</Link></li>
              <li><Link href="/o-klinike" className="hover:text-white">О клинике</Link></li>
              <li><Link href="/akcii" className="hover:text-white">Акции</Link></li>
              <li><Link href="/uslugi" className="hover:text-white">Прайс-лист</Link></li>
            </ul>
          </nav>
          <nav aria-label="Клиника" className="lg:col-span-2">
            <p className="text-[0.9rem] font-semibold">Клиника</p>
            <ul className="mt-3 grid gap-2 text-[0.85rem] text-white/90">
              <li><Link href="/vrachi" className="hover:text-white">Наши врачи</Link></li>
              <li><a href={site.maps.twogisReviews} target="_blank" rel="noopener noreferrer" className="hover:text-white">Отзывы о клинике</a></li>
              <li><Link href="/kontakty" className="hover:text-white">Контакты</Link></li>
              <li><Link href="/politika-konfidencialnosti" className="hover:text-white">Политика конфиденциальности</Link></li>
              <li><Link href="/soglasie-na-obrabotku-dannyh" className="hover:text-white">Согласие на обработку данных</Link></li>
            </ul>
          </nav>
          <nav aria-label="Услуги" className="lg:col-span-4">
            <p className="text-[0.9rem] font-semibold">Услуги</p>
            <ul className="mt-3 grid gap-2 text-[0.85rem] text-white/90 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} className="hover:text-white">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="shell mt-10 text-[0.72rem] uppercase tracking-[0.14em]">Имеются противопоказания. Необходима консультация специалиста</p>
      </div>
    </footer>
  );
}
