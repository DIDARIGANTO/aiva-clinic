import Link from "next/link";
import { Clock, Navigation, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MapBlock } from "@/components/MapBlock";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { categories, categoryHref } from "@/data/services";
import { nav, routes, site, waLink } from "@/lib/site";

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

/** Подвал по референсу: салатовый фон, адрес, график, телефон, кнопки и карта 2ГИС */
export function Footer() {
  return (
    <footer className="bg-forest pb-28 pt-14 text-white sm:pb-10 lg:pt-20">
      <div className="shell">
        <p className="ruled-label text-white/95">{site.address.street}</p>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="text-[2rem] font-bold uppercase leading-tight tracking-wide sm:text-[2.4rem]">
              {site.address.street}
            </p>
            <p className="mt-1 text-lg font-medium text-white/90">{site.address.city}, {site.address.district}</p>
            <ul className="mt-6 grid gap-3 text-[1.15rem]">
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

        {/* навигация и реквизиты */}
        <div className="mt-14 grid gap-10 border-t border-white/25 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="AIVA CLINIC — на главную" className="inline-block text-white">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-[0.93rem] leading-relaxed text-white/85">{site.descriptor}</p>
            <ul className="mt-5 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AIVA CLINIC в ${label}`}
                    className="grid size-10 place-items-center rounded-full border border-white/50 transition-colors duration-300 hover:bg-white hover:text-forest"
                  >
                    <Icon className="size-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Услуги" className="lg:col-span-4">
            <p className="eyebrow text-white/80">Услуги</p>
            <ul className="mt-4 grid gap-2.5 text-[0.93rem] font-medium">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} className="link-line">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Клиника" className="lg:col-span-4">
            <p className="eyebrow text-white/80">Клиника</p>
            <ul className="mt-4 grid gap-2.5 text-[0.93rem] font-medium">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.maps.twogisReviews} target="_blank" rel="noopener noreferrer" className="link-line">
                  Отзывы в 2ГИС
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/25 pt-6 text-center text-[0.78rem] uppercase tracking-[0.14em] text-white/85">
          Имеются противопоказания. Необходима консультация специалиста
        </p>
        <div className="mt-4 flex flex-col gap-3 text-[0.82rem] text-white/85 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.license.label}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/politika-konfidencialnosti" className="link-line">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/soglasie-na-obrabotku-dannyh" className="link-line">
                Согласие на обработку данных
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
