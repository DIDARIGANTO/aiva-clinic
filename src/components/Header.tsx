"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { site, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

type MenuCategory = { href: string; title: string; lead: string; count: string };

const menu = [
  { href: "/o-klinike", label: "О клинике" },
  { href: "/uslugi", label: "Прайс-лист" },
  { href: "/vrachi", label: "Наши врачи" },
  { href: "/akcii", label: "Акции" },
  { href: site.maps.twogisReviews, label: "Отзывы", external: true },
  { href: "/kontakty", label: "Контакты" },
];

/**
 * Шапка по референсу dobrodent.kz: белая полоса, логотип слева, зелёный «бургер» справа.
 * Меню раскрывается на весь экран со списком разделов по центру.
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
        <div className="shell flex h-[3.75rem] items-center justify-between gap-4">
          <Link href="/" aria-label="AIVA CLINIC — на главную" className="relative z-10 text-logo">
            <Logo compact />
          </Link>
          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="relative z-10 grid size-11 place-items-center text-forest"
          >
            {open ? (
              <X className="size-7" strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <span className="grid w-7 gap-[5px]" aria-hidden="true">
                <span className="block h-[3px] rounded-full bg-forest" />
                <span className="block h-[3px] rounded-full bg-forest" />
                <span className="block h-[3px] rounded-full bg-forest" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Полноэкранное меню ── */}
      <div
        id="site-menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-white pt-[3.75rem] transition-[opacity,visibility] duration-300 ease-soft",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Основная навигация" className="shell flex flex-1 flex-col items-center justify-center py-12 text-center">
          <ul className="grid gap-5">
            {menu.map((item) => (
              <li key={item.href}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenAt(null)}
                    className="text-[1.05rem] font-medium text-forest transition-colors hover:text-forest-deep"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpenAt(null)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("text-[1.05rem] font-medium text-forest transition-colors hover:text-forest-deep", isActive(item.href) && "underline underline-offset-4")}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpenAt(null)}
                  className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.8rem] font-medium text-ink hover:border-forest hover:text-forest"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-2 text-[0.95rem] text-ink">
            <a href={site.phone.href} className="font-semibold">
              {site.phone.display}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold">
              <WhatsAppIcon className="size-4 text-forest" />
              {site.whatsapp.display}
            </a>
            <p className="text-moss">{site.hours.label}, {site.hours.note}</p>
          </div>
        </nav>
      </div>
    </>
  );
}
