import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/ui/Faq";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";

/** Аккордеон вопросов — как блок «Всё, что необходимо знать…» в референсе */
export function FaqBlock() {
  return (
    <section className="pb-10 lg:pb-16" aria-labelledby="faq-title">
      <div className="shell">
        <h2 id="faq-title" data-reveal className="text-h2-main mx-auto max-w-3xl text-center text-ink">
          Всё, что нужно знать перед приёмом
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <Faq items={faq} name="home-faq" />
        </div>
      </div>
      <JsonLd data={faqSchema(faq)} />
    </section>
  );
}
