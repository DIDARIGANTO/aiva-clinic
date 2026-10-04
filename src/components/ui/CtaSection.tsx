import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import potapova from "@/assets/doctors/potapova-elona.jpg";
import { BookingButton } from "@/components/booking/BookingButton";
import { WhatsAppIcon } from "@/components/icons";
import { delay } from "@/components/ui/Section";
import { site, waLink } from "@/lib/site";

/** Блок записи по референсу: серая панель, заголовок, две кнопки связи и кнопка «Записаться», фото справа */
export function CtaSection({
  label,
  title = "Запишитесь на консультацию к нашим врачам",
  lead = "Если не знаете, к какому врачу обратиться, — поможем выбрать специалиста и удобное время.",
  service,
  whatsappText,
  image = potapova,
  imagePosition = "50% 20%",
  imageAlt = "Врач AIVA CLINIC",
  id = "zapis",
}: {
  label?: string;
  title?: ReactNode;
  lead?: string;
  service?: string;
  whatsappText?: string;
  image?: StaticImageData;
  imagePosition?: string;
  imageAlt?: string;
  id?: string;
}) {
  const wa = waLink(
    whatsappText ?? (service ? `Здравствуйте! Хочу записаться в AIVA CLINIC. Интересует: ${service}.` : undefined),
  );
  return (
    <section id={id} className="scroll-mt-24 py-10 lg:py-16" aria-labelledby={`${id}-title`}>
      <div className="shell">
        <div className="tri-bg panel relative overflow-hidden border-2 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {label && (
                <p className="section-label mb-3" data-reveal>
                  {label}
                </p>
              )}
              <h2 id={`${id}-title`} data-reveal className="text-h1 max-w-xl text-ink">
                {title}
              </h2>
              <p data-reveal style={delay(80)} className="mt-4 max-w-lg text-[1.1rem] leading-relaxed text-ink">
                {lead}
              </p>
              <p data-reveal style={delay(140)} className="mt-8 text-[0.95rem] text-ink">
                Для записи свяжитесь с клиникой напрямую
              </p>
              <div data-reveal style={delay(200)} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={site.phone.href}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-7 text-[0.93rem] font-semibold text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Позвонить {site.phone.display}
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-mint-soft px-7 text-[0.93rem] font-semibold text-brand-ink transition-colors duration-300 hover:bg-forest hover:text-white"
                >
                  <WhatsAppIcon className="size-[1.1rem]" />
                  Написать в WhatsApp
                </a>
              </div>
              <div data-reveal style={delay(260)} className="mt-8">
                <BookingButton service={service} size="lg" className="w-full px-12 text-[1.05rem] font-medium sm:w-auto">
                  Записаться
                </BookingButton>
                <p className="mt-3 text-[0.82rem] text-moss">
                  Откроется форма записи: заявка уйдёт в WhatsApp клиники, администратор подтвердит время.
                </p>
              </div>
            </div>
            <div data-reveal="scale" style={delay(160)} className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] bg-white shadow-soft">
                <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 24rem, 90vw" className="object-cover" style={{ objectPosition: imagePosition }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
