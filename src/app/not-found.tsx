import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { Emblem } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative grid min-h-[86svh] place-items-center overflow-hidden px-5 pb-20 pt-32 text-center">
      <Emblem className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[42rem] max-w-none -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-forest/[0.06]" />
      <div>
        <p className="font-serif text-[7rem] italic leading-none text-forest sm:text-[10rem]">404</p>
        <h1 className="text-h2 mt-4">Такой страницы нет</h1>
        <p className="text-lead mx-auto mt-5 max-w-md text-moss">
          Возможно, ссылка устарела. Перейдите на главную или посмотрите услуги клиники.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            На главную
          </ButtonLink>
          <ButtonLink href="/uslugi" variant="outline" size="lg">
            Услуги клиники
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
