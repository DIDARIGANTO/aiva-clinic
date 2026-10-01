import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Emblem, Logo } from "@/components/Logo";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { categories, categoryHref } from "@/data/services";
import { nav, site, waLink } from "@/lib/site";

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine text-white grain">
      <Emblem className="pointer-events-none absolute -bottom-40 -right-32 size-[38rem] text-white/[0.045]" />

      <div className="shell relative pb-28 pt-16 sm:pt-20 lg:pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="AIVA CLINIC — на главную" className="inline-block text-white">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-white/65">
              {site.descriptor}. Консультации врачей, диагностика, физиотерапия и восстановление.
            </p>
            <ul className="mt-7 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`AIVA CLINIC в ${label}`}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/85 transition-colors duration-300 hover:border-white hover:bg-white hover:text-pine"
                  >
                    <Icon className="size-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Услуги" className="lg:col-span-3">
            <p className="eyebrow text-white/45">Услуги</p>
            <ul className="mt-5 grid gap-3 text-[0.95rem]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryHref(c)} className="link-line text-white/85 hover:text-white">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Клиника" className="lg:col-span-2">
            <p className="eyebrow text-white/45">Клиника</p>
            <ul className="mt-5 grid gap-3 text-[0.95rem]">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line text-white/85 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.maps.twogisReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-white/85 hover:text-white"
                >
                  Отзывы в 2ГИС
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-white/45">Контакты</p>
            <ul className="mt-5 grid gap-4 text-[0.95rem]">
              <li>
                <a href={site.phone.href} className="group flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden="true" />
                  <span>
                    <span className="block text-lg font-medium tracking-[-0.01em]">{site.phone.display}</span>
                    <span className="text-white/55">Администрация клиники</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-mint" />
                  <span>
                    <span className="block text-lg font-medium tracking-[-0.01em]">{site.whatsapp.display}</span>
                    <span className="text-white/55">WhatsApp для записи</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden="true" />
                <span>
                  {site.address.full}
                  <a
                    href={site.maps.twogis}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1 text-white/55 transition-colors hover:text-white"
                  >
                    Открыть в 2ГИС <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden="true" />
                <span>
                  {site.hours.label}
                  <span className="block text-white/55">{site.hours.note}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-7 text-center text-[0.8rem] uppercase tracking-[0.16em] text-white/50 sm:text-left">
          Имеются противопоказания. Необходима консультация специалиста
        </p>

        <div className="mt-6 flex flex-col gap-4 text-[0.82rem] text-white/50 lg:flex-row lg:items-center lg:justify-between lg:pr-24">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.license.label}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/politika-konfidencialnosti" className="link-line hover:text-white">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/soglasie-na-obrabotku-dannyh" className="link-line hover:text-white">
                Согласие на обработку данных
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
