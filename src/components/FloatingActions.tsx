import { WhatsAppIcon } from "@/components/icons";
import { site, waLink } from "@/lib/site";

/**
 * Закреплённая нижняя панель на телефонах — как в референсе:
 * две кнопки «Позвонить» и «Написать на WhatsApp». На десктопе кнопки живут в шапке.
 */
export function FloatingActions() {
  return (
    <aside
      aria-label="Быстрая связь с клиникой"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={site.phone.href}
          className="inline-flex h-12 items-center justify-center rounded-full bg-forest text-[0.9rem] font-semibold text-white shadow-glow"
        >
          Позвонить
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-3 text-center text-[0.82rem] font-semibold leading-tight text-white shadow-glow"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          Написать на WhatsApp
        </a>
      </div>
    </aside>
  );
}
