"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { WhatsAppIcon } from "@/components/icons";
import { site, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Быстрые действия: на телефоне — нижняя панель (звонок, WhatsApp, запись),
 * на десктопе — закреплённая кнопка WhatsApp.
 */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside aria-label="Быстрая связь с клиникой">
      {/* мобильная панель */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-soft lg:hidden",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
        )}
        inert={!visible}
      >
        <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-white/60 bg-white/85 p-1.5 shadow-lift backdrop-blur-xl">
          <a
            href={site.phone.href}
            aria-label={`Позвонить: ${site.phone.display}`}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-mist text-forest"
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-leaf text-ink"
          >
            <WhatsAppIcon className="size-[1.4rem]" />
          </a>
          <BookingButton className="h-12 flex-1 px-4">Записаться на приём</BookingButton>
        </div>
      </div>

      {/* десктоп: WhatsApp */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className={cn(
          "group fixed bottom-7 right-7 z-30 hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-leaf pl-4 pr-4 text-ink shadow-lift transition-[transform,opacity,gap,padding] duration-500 ease-soft hover:gap-2.5 hover:pr-6 lg:inline-flex",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
        tabIndex={visible ? 0 : -1}
      >
        <WhatsAppIcon className="size-6 shrink-0" />
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-soft group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
          <span className="overflow-hidden whitespace-nowrap text-[0.95rem] font-medium">Написать в WhatsApp</span>
        </span>
      </a>
    </aside>
  );
}
