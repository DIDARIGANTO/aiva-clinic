"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { routes, site } from "@/lib/site";

const widgetSrc = `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
  JSON.stringify({
    pos: { lat: site.geo.lat, lon: site.geo.lng, zoom: 16 },
    opt: { city: "astana" },
    org: site.maps.twogisFirmId,
  }),
)}`;

/** Интерактивная карта 2ГИС. Виджет подгружается только когда блок приближается к области просмотра. */
export function MapBlock({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative isolate overflow-hidden rounded-[1.5rem] bg-mist shadow-soft">
      <div className={compact ? "relative aspect-[4/3] sm:aspect-[16/9]" : "relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]"}>
        {/* подложка до загрузки карты */}
        <div className="absolute inset-0 -z-10 grid place-items-center text-center">
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-forest text-white">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-4 font-medium">{site.address.full}</p>
            <p className="text-sm text-moss">Загружаем карту…</p>
          </div>
        </div>
        {show && (
          <iframe
            src={widgetSrc}
            title={`AIVA CLINIC на карте 2ГИС: ${site.address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
            allow="geolocation"
          />
        )}
      </div>

      {!compact && (
      <div className="flex flex-col gap-4 border-t border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="flex items-center gap-3 font-medium">
          <Navigation className="size-5 text-forest" aria-hidden="true" />
          Построить маршрут
        </p>
        <ul className="flex flex-wrap gap-2">
          {[
            ["2ГИС", routes.twogis],
            ["Яндекс Карты", routes.yandex],
            ["Google Maps", routes.google],
          ].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border-2 border-forest px-5 text-[0.9rem] font-semibold text-forest transition-colors duration-300 hover:bg-forest hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}
