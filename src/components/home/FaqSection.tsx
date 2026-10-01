import { BookingButton } from "@/components/booking/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { Faq } from "@/components/ui/Faq";
import { Eyebrow, delay } from "@/components/ui/Section";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";
import { waLink } from "@/lib/site";

export function FaqSection() {
  return (
    <section className="section-y" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div data-reveal>
              <Eyebrow>Частые вопросы</Eyebrow>
            </div>
            <h2 id="faq-title" data-reveal style={delay(80)} className="text-h2 mt-5">
              Коротко <span className="accent whitespace-nowrap">о главном</span>
            </h2>
            <p data-reveal style={delay(160)} className="mt-6 max-w-sm leading-relaxed text-moss">
              Не нашли ответ? Напишите нам — администратор ответит на вопросы и поможет выбрать специалиста.
            </p>
            <div data-reveal style={delay(240)} className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink("Здравствуйте! У меня вопрос о приёме в AIVA CLINIC.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-leaf px-6 text-[0.95rem] font-medium text-ink transition-[filter] duration-300 hover:brightness-95"
              >
                <WhatsAppIcon className="size-5" />
                Задать вопрос
              </a>
              <BookingButton variant="outline">Записаться</BookingButton>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 lg:pl-8">
          <Faq items={faq} name="home-faq" />
        </div>
      </div>
      <JsonLd data={faqSchema(faq)} />
    </section>
  );
}
