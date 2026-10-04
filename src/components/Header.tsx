"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { nav, site, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type MenuCategory = { href: string; title: string; lead: string; count: string };

/**
 * Шапка по референсу: белая полоса, логотип слева, две кнопки-«пилюли» справа
 * («Позвонить», «Написать на WhatsApp»). Между ними — текстовое меню разделов.
 */
export function Header({ categories }: { categories: MenuCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Перейти к содержанию
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
          scrolled || open ? "shadow-[0_2px_14px_rgb(0_0_0/0.08)]" : "shadow-[0_1px_0_rgb(0_0_0/0.06)]",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label="AIVA CLINIC — на главную" className="relative z-10 text-logo">
            <Logo />
          </Link>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-3.5 text-[0.86rem] font-semibold transition-colors duration-300",
                      isActive(item.href) ? "text-forest" : "text-ink hover:text-forest",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2.5 sm:flex">
            <a
              href={site.phone.href}
              className="inline-flex h-10 items-center justify-center rounded-full bg-forest px-6 text-[0.82rem] font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
            >
              Позвонить
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full bg-forest px-6 text-[0.82rem] font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
            >
              Написать на WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="relative z-10 grid size-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ── Мобильное меню ── */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-white pt-[4.5rem] transition-[opacity,visibility,transform] duration-400 ease-soft lg:hidden",
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Мобильная навигация" className="shell flex-1 pb-36 pt-4">
          <ul className="border-t border-line">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpenAt(null)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-[1.25rem] font-semibold text-ink aria-[current=page]:text-forest"
                >
                  {item.label}
                  <ArrowUpRight className="size-5 text-forest" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8 text-forest">Направления</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpenAt(null)}
                  className="inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 text-[0.95rem] text-moss">
            <a href={site.phone.href} className="flex items-center gap-3 font-semibold text-ink">
              <Phone className="size-4 text-forest" aria-hidden="true" />
              {site.phone.display}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-ink">
              <WhatsAppIcon className="size-4 text-forest" />
              {site.whatsapp.display}
            </a>
            <p>{site.hours.label}, {site.hours.note}</p>
            <p>{site.address.full}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
