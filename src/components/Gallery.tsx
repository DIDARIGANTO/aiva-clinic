"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Photo } from "@/data/gallery";
import { cn } from "@/lib/cn";

/** Асимметричная мозаика из фотографий клиники с просмотром во весь экран */
export function Gallery({ photos, className }: { photos: Photo[]; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => {
      setIndex(null);
      document.documentElement.style.overflow = "";
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  useEffect(() => {
    if (index !== null) document.documentElement.style.overflow = "hidden";
  }, [index]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-12 xl:auto-rows-[17rem]", className)}>
        {photos.map((p, i) => (
          <li
            key={p.src.src}
            data-reveal="scale"
            style={{ "--d": `${(i % 4) * 70}ms` } as React.CSSProperties}
            className={cn(
              "relative",
              // на мобильных — ритм «широкая / две узкие»
              i % 3 === 0 || (i === photos.length - 1 && i % 3 === 1) ? "col-span-2 aspect-[16/11]" : "aspect-[4/5]",
              "lg:aspect-auto",
              p.span,
            )}
          >
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block size-full overflow-hidden rounded-[1.5rem] bg-mist sm:rounded-[1.75rem]"
              aria-label={`Открыть фото: ${p.caption}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className="img-zoom object-cover"
                style={{ objectPosition: p.position }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-pine/55 via-pine/0 to-pine/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
              <span className="absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between gap-3 text-left text-sm font-medium text-white opacity-0 transition-[opacity,transform] duration-500 ease-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {p.caption}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Просмотр фотографий клиники"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0"
      >
        {current && index !== null && (
          <div
            className="flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-4 text-white sm:px-8">
              <p className="text-sm">
                <span className="font-medium">{current.caption}</span>
                <span className="ml-3 text-white/55 tabular-nums">
                  {index + 1} / {photos.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть просмотр"
                className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={current.src.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={85}
                className="lightbox-img object-contain px-3 pb-4 sm:px-20 sm:pb-8"
              />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Предыдущее фото"
                className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Следующее фото"
                className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
