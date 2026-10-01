import type { ReactNode } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { Emblem } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { Eyebrow, delay } from "@/components/ui/Section";
import { bookingOptions } from "@/data/services";
import { site, waLink } from "@/lib/site";

/** Заключительный блок записи: звонок, WhatsApp и форма */
export function CtaSection({
  title,
  lead,
  service,
  whatsappText,
  id = "zapis",
}: {
  title?: ReactNode;
  lead?: string;
  service?: string;
  /** собственный текст сообщения в WhatsApp */
  whatsappText?: string;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-3 pb-3 sm:px-5 sm:pb-5" aria-labelledby={`${id}-title`}>
      <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-forest text-white grain sm:rounded-[3rem]">
        <Emblem className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[44rem] animate-spin-slow text-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 size-[36rem] rounded-full bg-mint/25 blur-[110px]" aria-hidden="true" />

        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
          <div className="lg:col-span-6">
            <div data-reveal>
              <Eyebrow tone="light">Запись на приём</Eyebrow>
            </div>
            <h2 id={`${id}-title`} data-reveal style={delay(80)} className="text-h1 mt-6">
              {title ?? (
                <>
                  Сделайте первый шаг к заботе <span className="accent whitespace-nowrap text-sun">о своём здоровье</span>
                </>
              )}
            </h2>
            <p data-reveal style={delay(160)} className="text-lead mt-6 max-w-lg text-white/75">
              {lead ??
                "Запишитесь на консультацию. Если не знаете, к какому врачу обратиться, — мы поможем выбрать специалиста и удобное время."}
            </p>

            <div data-reveal style={delay(240)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phone.href}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-7 font-medium text-forest transition-colors duration-300 hover:bg-sun hover:text-ink"
              >
                <Phone className="size-[1.1rem]" aria-hidden="true" />
                Позвонить
              </a>
              <a
                href={waLink(
                  whatsappText ??
                    (service ? `Здравствуйте! Хочу записаться в AIVA CLINIC. Интересует: ${service}.` : undefined),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-leaf px-7 font-medium text-ink transition-[filter] duration-300 hover:brightness-95"
              >
                <WhatsAppIcon className="size-5" />
                Записаться в WhatsApp
              </a>
            </div>

            <ul data-reveal style={delay(320)} className="mt-12 grid gap-5 border-t border-white/15 pt-8 text-[0.95rem] sm:grid-cols-3">
              <li>
                <Phone className="size-4 text-sun" aria-hidden="true" />
                <a href={site.phone.href} className="mt-3 block font-medium">
                  {site.phone.display}
                </a>
                <span className="text-white/60">Администрация</span>
              </li>
              <li>
                <MapPin className="size-4 text-sun" aria-hidden="true" />
                <a href={site.maps.twogis} target="_blank" rel="noopener noreferrer" className="mt-3 block font-medium">
                  {site.address.street}
                </a>
                <span className="text-white/60">{site.address.city}</span>
              </li>
              <li>
                <Clock className="size-4 text-sun" aria-hidden="true" />
                <span className="mt-3 block font-medium">{site.hours.short}</span>
                <span className="text-white/60">Ежедневно, {site.hours.note}</span>
              </li>
            </ul>
          </div>

          <div data-reveal="scale" style={delay(200)} className="lg:col-span-6 lg:pl-8 xl:col-span-5 xl:col-start-8 xl:pl-0">
            <div className="rounded-[2rem] bg-milk p-6 text-ink shadow-lift sm:p-9">
              <h3 className="text-[1.5rem] font-medium tracking-[-0.03em]">Оставьте заявку</h3>
              <p className="mb-6 mt-1.5 text-[0.93rem] text-moss">Администратор свяжется с вами и подтвердит время.</p>
              <BookingForm groups={bookingOptions()} defaultService={service} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
