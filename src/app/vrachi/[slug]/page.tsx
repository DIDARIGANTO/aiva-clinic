import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { buttonClass } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaSection } from "@/components/ui/CtaSection";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { Eyebrow, delay } from "@/components/ui/Section";
import { doctors, getDoctor } from "@/data/doctors";
import { categoryHref, getCategory, serviceHref, services } from "@/data/services";
import { pageMeta } from "@/lib/meta";
import { physicianSchema } from "@/lib/schema";
import { site, waLink } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) return {};
  return pageMeta({
    title: d.seoTitle,
    description: `${d.fullName} — ${d.specialties.join(", ").toLowerCase()} в AIVA CLINIC, Астана. ${d.role}. Запись на приём онлайн и в WhatsApp.`,
    path: `/vrachi/${d.slug}`,
    image: d.photo.src,
  });
}

export default async function DoctorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const d = getDoctor(slug);
  if (!d) notFound();

  const consults = d.services
    .map((s) => services.find((x) => x.slug === s && x.category === "konsultacii"))
    .filter((x) => !!x);
  const departments = (d.departments ?? []).map((s) => getCategory(s)).filter((x) => !!x);
  const others = doctors.filter((x) => x.slug !== d.slug);
  const bookingLabel = `Приём: ${d.fullName}`;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-[16rem] -top-[22rem] size-[46rem] rounded-full bg-mint/20 blur-[110px]" />
          <div className="absolute -left-[18rem] top-[14rem] size-[30rem] rounded-full bg-peach/35 blur-[120px]" />
        </div>
        <div className="shell">
          <Breadcrumbs
            className="hero-rise"
            items={[
              { name: "Врачи", path: "/vrachi" },
              { name: d.shortName, path: `/vrachi/${d.slug}` },
            ]}
          />
          <div className="mt-8 grid items-center gap-x-12 gap-y-12 lg:mt-12 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="hero-rise" style={{ "--i": 1 } as React.CSSProperties}>
                <Eyebrow>{d.role}</Eyebrow>
              </div>
              <h1 className="hero-slide text-h1 mt-5">
                {d.fullName.split(" ")[0]}{" "}
                <span className="accent">{d.fullName.split(" ").slice(1).join(" ")}</span>
              </h1>
              <ul className="hero-rise mt-7 flex flex-wrap gap-2" style={{ "--i": 3 } as React.CSSProperties} aria-label="Специализация">
                {d.specialties.map((s) => (
                  <li key={s} className="rounded-full border border-forest/20 bg-white px-4 py-2 text-[0.93rem] font-medium text-forest">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="hero-slide text-lead mt-7 max-w-2xl text-moss">
                {d.intro}
              </p>
              <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--i": 5 } as React.CSSProperties}>
                <BookingButton service={bookingLabel} size="lg" arrow>
                  Записаться к врачу
                </BookingButton>
                <a
                  href={waLink(`Здравствуйте! Хочу записаться на приём в AIVA CLINIC. Врач: ${d.fullName}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: "whatsapp", size: "lg" })}
                >
                  <WhatsAppIcon className="size-5" />
                  Написать в WhatsApp
                </a>
              </div>
              <ul className="hero-rise mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 text-[0.95rem] text-moss" style={{ "--i": 6 } as React.CSSProperties}>
                <li className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-forest" aria-hidden="true" />
                  {site.address.full}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="size-4 text-forest" aria-hidden="true" />
                  Клиника работает {site.hours.label.toLowerCase()}
                </li>
              </ul>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="hero-photo leaf relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-mist shadow-lift lg:max-w-none">
                <Image
                  src={d.photo}
                  alt={`${d.fullName} — ${d.role.toLowerCase()}, AIVA CLINIC`}
                  fill
                  preload
                  fetchPriority="high"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: d.photoPosition }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="doc-services">
        <div className="shell grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow>Приём</Eyebrow>
            </div>
            <h2 id="doc-services" data-reveal style={delay(80)} className="text-h2 mt-5">
              С чем можно <span className="accent">обратиться</span>
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pl-8">
            <ul className="border-t border-line">
              {consults.map((s, i) => (
                <li key={s.slug} data-reveal style={delay(i * 80)}>
                  <Link href={serviceHref(s)} className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-line py-7">
                    <span>
                      <span className="text-[1.3rem] font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-forest">
                        {s.h1 ?? s.title}
                      </span>
                      <span className="mt-2 block max-w-2xl leading-relaxed text-moss">{s.summary}</span>
                    </span>
                    <span className="grid size-12 place-items-center rounded-full border border-line text-forest transition-[background-color,color,border-color,transform] duration-500 ease-soft group-hover:rotate-45 group-hover:border-forest group-hover:bg-forest group-hover:text-white" aria-hidden="true">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                </li>
              ))}
              {departments.map((c, i) => (
                <li key={c.slug} data-reveal style={delay((consults.length + i) * 80)}>
                  <Link href={categoryHref(c)} className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-line py-7">
                    <span>
                      <span className="text-[1.3rem] font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-forest">
                        {c.title}
                      </span>
                      <span className="mt-2 block max-w-2xl leading-relaxed text-moss">
                        Направление отделения, которым руководит врач. {c.lead}
                      </span>
                    </span>
                    <span className="grid size-12 place-items-center rounded-full border border-line text-forest transition-[background-color,color,border-color,transform] duration-500 ease-soft group-hover:rotate-45 group-hover:border-forest group-hover:bg-forest group-hover:text-white" aria-hidden="true">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-moss">
              На приём возьмите результаты предыдущих обследований и список принимаемых препаратов — врач
              учтёт их при консультации.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-mist" aria-labelledby="other-doctors">
        <div className="shell">
          <h2 id="other-doctors" data-reveal className="text-h2">
            Другие <span className="accent">врачи клиники</span>
          </h2>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <li key={o.slug} data-reveal style={delay(i * 90)}>
                <DoctorCard doctor={o} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        service={bookingLabel}
        whatsappText={`Здравствуйте! Хочу записаться на приём в AIVA CLINIC. Врач: ${d.fullName}.`}
        title={
          <>
            Запишитесь на приём <span className="accent whitespace-nowrap text-sun">к врачу</span>
          </>
        }
        lead={`${d.givenName} ведёт приём в AIVA CLINIC. Оставьте заявку — администратор подберёт удобное время.`}
      />
      <JsonLd data={physicianSchema(d)} />
    </>
  );
}
