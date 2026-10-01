"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { Logo } from "@/components/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { nav, site, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type MenuCategory = { href: string; title: string; lead: string; count: string };

export function Header({ categories }: { categories: MenuCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // меню «привязано» к странице, на которой его открыли: при переходе оно закрывается само
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (next: boolean) => setOpenAt(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-forest px-5 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Перейти к содержанию
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open
            ? "bg-milk/85 shadow-[0_1px_0_rgb(32_41_35/0.07)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between gap-6 transition-[height] duration-500 ease-soft",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-24",
          )}
        >
          <Link href="/" aria-label="AIVA CLINIC — на главную" className="relative z-10 text-forest">
            <Logo />
          </Link>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                const hasMenu = item.href === "/uslugi";
                return (
                  <li key={item.href} className={cn("relative", hasMenu && "group/menu")}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center gap-1 rounded-full px-4 text-[0.95rem] transition-colors duration-300",
                        active ? "text-forest" : "text-ink/80 hover:text-forest",
                      )}
                    >
                      {item.label}
                      {hasMenu && (
                        <ChevronDown
                          className="size-3.5 transition-transform duration-300 group-hover/menu:rotate-180 group-focus-within/menu:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                      {active && (
                        <span className="absolute inset-x-4 -bottom-0.5 h-px bg-forest" aria-hidden="true" />
                      )}
                    </Link>

                    {hasMenu && (
                      <div className="invisible absolute left-1/2 top-full w-[44rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-soft group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100">
                        <div className="grid grid-cols-2 gap-1 rounded-[1.75rem] border border-line bg-white p-3 shadow-lift">
                          {categories.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="group/item flex items-start justify-between gap-3 rounded-2xl p-4 transition-colors duration-300 hover:bg-mist"
                            >
                              <span>
                                <span className="block font-medium text-ink">{c.title}</span>
                                <span className="mt-1 block text-sm leading-snug text-moss">{c.count}</span>
                              </span>
                              <ArrowUpRight
                                className="mt-0.5 size-4 shrink-0 text-forest opacity-0 transition-all duration-300 group-hover/item:opacity-100"
                                aria-hidden="true"
                              />
                            </Link>
                          ))}
                          <Link
                            href="/uslugi"
                            className="flex items-center justify-between gap-3 rounded-2xl bg-forest p-4 font-medium text-white transition-colors duration-300 hover:bg-forest-deep"
                          >
                            Все услуги клиники
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-forest xl:inline-flex"
            >
              <Phone className="size-4 text-forest" aria-hidden="true" />
              {site.phone.display}
            </a>
            <div className="hidden sm:block lg:ml-2">
              <BookingButton size="sm" className="h-11 px-5">
                Записаться
              </BookingButton>
            </div>
            <a
              href={site.phone.href}
              aria-label={`Позвонить: ${site.phone.display}`}
              className="grid size-11 place-items-center rounded-full bg-white text-forest shadow-soft sm:hidden"
            >
              <Phone className="size-[1.15rem]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="relative z-10 grid size-11 place-items-center rounded-full bg-forest text-white lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Мобильное меню ── */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-milk pt-[4.5rem] transition-[opacity,visibility,transform] duration-500 ease-soft lg:hidden",
          open ? "visible opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <nav aria-label="Мобильная навигация" className="shell flex-1 pb-8 pt-4">
          <ul className="border-t border-line">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className="border-b border-line transition-[opacity,transform] duration-700 ease-soft"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpenAt(null)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-[1.7rem] font-medium tracking-[-0.03em] text-ink aria-[current=page]:text-forest"
                >
                  {item.label}
                  <ArrowUpRight className="size-5 text-forest" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8 text-moss">Направления</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpenAt(null)}
                  className="inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-sm text-ink"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 text-[0.95rem] text-moss">
            <p className="flex items-center gap-3">
              <Clock className="size-4 text-forest" aria-hidden="true" />
              {site.hours.label}, {site.hours.note}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-forest" aria-hidden="true" />
              {site.address.full}
            </p>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <InstagramIcon className="size-4 text-forest" />
              Instagram клиники
            </a>
          </div>
        </nav>

        <div className="shell sticky bottom-0 grid grid-cols-2 gap-2.5 border-t border-line bg-milk/95 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-leaf font-medium text-ink"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
          <BookingButton className="h-13 w-full">Записаться</BookingButton>
        </div>
      </div>
    </>
  );
}
