import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { LeafOutline } from "@/components/icons";
import { cn } from "@/lib/cn";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Eyebrow } from "./Section";

/** Первый экран внутренних страниц */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  image,
  aside,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  image?: { src: StaticImageData; alt: string; position?: string; shape?: "leaf" | "leaf-alt" };
  aside?: ReactNode;
  className?: string;
}) {
  const hasVisual = !!image || !!aside;
  return (
    <section className={cn("relative overflow-hidden pb-14 pt-28 sm:pb-16 lg:pb-24 lg:pt-40", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[16rem] -top-[22rem] size-[46rem] rounded-full bg-mint/20 blur-[110px]" />
        <div className="absolute -left-[18rem] top-[10rem] size-[30rem] rounded-full bg-peach/35 blur-[120px]" />
        <LeafOutline className="absolute right-[4%] top-32 hidden h-56 w-auto rotate-[22deg] text-forest/10 xl:block" />
      </div>

      <div className="shell">
        <Breadcrumbs items={crumbs} className="hero-rise" />
        <div className={cn("mt-8 grid items-end gap-x-10 gap-y-12 lg:mt-12", hasVisual && "lg:grid-cols-12")}>
          <div className={cn(hasVisual ? "lg:col-span-7" : "max-w-4xl")}>
            {eyebrow && (
              <div className="hero-rise" style={{ "--i": 1 } as React.CSSProperties}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
            )}
            <h1 className={cn("hero-slide text-h1", eyebrow && "mt-5")}>
              {title}
            </h1>
            {lead && (
              <p className="hero-slide text-lead mt-6 max-w-2xl text-moss">
                {lead}
              </p>
            )}
            {children && (
              <div className="hero-rise mt-8 lg:mt-10" style={{ "--i": 4 } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <div
                className={cn(
                  "hero-photo relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden bg-mist shadow-lift lg:aspect-[4/5] lg:max-h-[34rem] xl:aspect-[5/6]",
                  image.shape === "leaf-alt" ? "leaf-alt" : "leaf",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  fetchPriority="high"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  quality={85}
                  className="parallax object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            </div>
          )}
          {aside && <div className="hero-rise lg:col-span-5" style={{ "--i": 4 } as React.CSSProperties}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
