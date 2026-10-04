import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LogoSprite } from "@/components/Logo";
import { RevealObserver } from "@/components/RevealObserver";
import { bookingOptions, categories, categoryHref, servicesOf } from "@/data/services";
import { clinicSchema, websiteSchema } from "@/lib/schema";
import { abs, noindex, site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AIVA CLINIC — клиника терапии, физиотерапии и реабилитации в Астане",
    template: "%s | AIVA CLINIC",
  },
  description:
    "AIVA CLINIC в Астане: консультации врачей, УЗИ, чек-апы, физиотерапия и реабилитация. Ежедневно 08:00–20:00, ул. Е 669, 13. Запись онлайн, по телефону и в WhatsApp.",
  applicationName: site.name,
  keywords: [
    "AIVA CLINIC",
    "Айва Клиник",
    "клиника Астана",
    "медицинский центр Астана",
    "терапевт Астана",
    "УЗИ Астана",
    "чек-ап Астана",
    "физиотерапия Астана",
    "реабилитация Астана",
    "экзотерапия Астана",
  ],
  alternates: { canonical: abs("/") },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: site.name,
    url: abs("/"),
    title: "AIVA CLINIC — клиника терапии, физиотерапии и реабилитации в Астане",
    description:
      "Консультации врачей, диагностика, физиотерапия и реабилитация в Астане. Ежедневно 08:00–20:00, ул. Е 669, 13.",
    images: [{ url: abs("/og.jpg"), width: 1200, height: 630, alt: "AIVA CLINIC — Вернитесь к активной жизни" }],
  },
  twitter: { card: "summary_large_image", images: [abs("/og.jpg")] },
  robots: noindex
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  other: { "geo.region": "KZ-AST", "geo.placename": "Астана", ICBM: `${site.geo.lat}, ${site.geo.lng}` },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const count = (n: number, [one, few, many]: [string, string, string]) => {
  const m10 = n % 10;
  const m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many;
  return `${n} ${word}`;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menu = categories.map((c) => {
    const n = servicesOf(c.slug).length;
    const label =
      c.slug === "konsultacii"
        ? count(n, ["специалист", "специалиста", "специалистов"])
        : c.slug === "uzi"
          ? count(n, ["исследование", "исследования", "исследований"])
          : c.slug === "chek-apy"
            ? count(n, ["программа", "программы", "программ"])
            : c.slug === "analizy"
              ? "В составе чек-апов"
              : count(n, ["процедура", "процедуры", "процедур"]);
    return { href: categoryHref(c), title: c.title, lead: c.lead, count: label };
  });

  return (
    <html lang="ru" className={montserrat.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Класс .js включает анимации появления только при работающем JavaScript */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LogoSprite />
        <BookingProvider groups={bookingOptions()}>
          <Header categories={menu} />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </BookingProvider>
        <RevealObserver />
        <JsonLd data={[clinicSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
