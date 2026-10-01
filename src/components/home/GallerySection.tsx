import { ButtonLink } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { SectionHeading, delay } from "@/components/ui/Section";
import { gallery } from "@/data/gallery";

export function GallerySection() {
  return (
    <section className="section-y" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Клиника изнутри"
            title={
              <span id="gallery-title">
                Пространство, где <span className="accent">спокойно</span>
              </span>
            }
            lead="Настоящие фотографии AIVA CLINIC: холл, кабинеты и оборудование."
          />
          <div data-reveal style={delay(160)}>
            <ButtonLink href="/o-klinike#gallery" variant="outline" arrow>
              Все фотографии
            </ButtonLink>
          </div>
        </div>
        <Gallery photos={gallery.slice(0, 7)} className="mt-12 lg:mt-14" />
      </div>
    </section>
  );
}
