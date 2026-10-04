"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import ivRoom2 from "@/assets/photos/iv-room-2.jpg";
import exoDetail from "@/assets/photos/exo-detail.jpg";
import patientSmile from "@/assets/photos/patient-smile.jpg";
import device1 from "@/assets/photos/device-1.jpg";
import { Emblem } from "@/components/Logo";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const tabs = [
  { key: "instagram", label: "Instagram", handle: "@aiva.clinic_astana", href: site.social.instagram, cta: "Посмотреть наш Instagram", Icon: InstagramIcon },
  { key: "tiktok", label: "TikTok", handle: "@aiva.clinic", href: site.social.tiktok, cta: "Посмотреть наш TikTok", Icon: TikTokIcon },
  { key: "youtube", label: "YouTube", handle: "AIVA CLINIC", href: site.social.youtube, cta: "Посмотреть наш YouTube", Icon: YouTubeIcon },
] as const;

const grid: StaticImageData[] = [lobby1, deviceRoom, ivRoom2, exoDetail, patientSmile, device1];

/** «Социальные сети» по референсу: вкладки с подчёркиванием, макет телефона и кнопка */
export function SocialBlock() {
  const [active, setActive] = useState(0);
  const t = tabs[active];
  return (
    <section className="tri-bg relative overflow-hidden section-y" aria-labelledby="social-title">
      <div className="shell">
        <p className="section-label text-center" data-reveal>
          Социальные сети
        </p>
        <h2 id="social-title" data-reveal className="text-h2-main mx-auto mt-2 max-w-3xl text-center text-ink">
          Делимся акциями, советами и новостями клиники
        </h2>

        <div role="tablist" aria-label="Социальные сети клиники" className="mx-auto mt-10 grid max-w-3xl grid-cols-3 border-b border-line">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px border-b-2 pb-4 text-[0.85rem] font-semibold uppercase tracking-wide transition-colors duration-300",
                active === i ? "border-forest text-forest" : "border-transparent text-sage hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl items-center gap-10 sm:grid-cols-2">
          {/* макет телефона с лентой клиники */}
          <div data-reveal className="mx-auto w-[15rem] rounded-[2.6rem] border-[6px] border-ink bg-white p-3 shadow-lift">
            <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-ink" aria-hidden="true" />
            <div className="flex items-center gap-3 px-1">
              <span className="grid size-12 place-items-center rounded-full bg-mint-soft text-logo">
                <Emblem className="size-8" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.8rem] font-semibold text-ink">{t.handle}</span>
                <span className="block text-[0.7rem] text-moss">{site.name} · Астана</span>
              </span>
            </div>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-lg bg-forest text-[0.72rem] font-semibold text-white"
            >
              <t.Icon className="size-3.5" />
              Подписаться
            </a>
            <ul className="mt-3 grid grid-cols-3 gap-1">
              {grid.map((img, i) => (
                <li key={i} className="relative aspect-square overflow-hidden rounded-md bg-mist">
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-ink" aria-hidden="true" />
          </div>

          <div data-reveal className="text-center sm:text-left">
            <p className="text-[1rem] leading-relaxed text-ink">
              Рассказываем о специальных предложениях, процедурах и жизни клиники. Подписывайтесь, чтобы
              не пропустить новости.
            </p>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-9 text-[1rem] font-medium text-white shadow-glow transition-colors duration-300 hover:bg-forest-deep"
            >
              <t.Icon className="size-[1.1rem]" />
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
