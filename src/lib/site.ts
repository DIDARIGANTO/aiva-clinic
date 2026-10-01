/**
 * Единый источник контактных и юридических данных клиники.
 * Все значения взяты из материалов клиники (папка «Инфо») и карточки 2ГИС.
 * Чтобы изменить телефон, график или ссылки на всём сайте — правьте только этот файл.
 */

const WHATSAPP_NUMBER = "77472274096";

export const site = {
  name: "AIVA CLINIC",
  shortName: "AIVA",
  descriptor: "Клиника терапии, физиотерапии и реабилитации в Астане",
  /** Рабочий домен. Задаётся переменной NEXT_PUBLIC_SITE_URL при публикации. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aivaclinic.kz").replace(/\/$/, ""),

  /** Юридическое лицо — оператор персональных данных. Заполнить данными клиники перед запуском. */
  legal: {
    entity: null as string | null, // например: «ТОО "…"»
    bin: null as string | null,
    email: null as string | null,
  },

  address: {
    city: "Астана",
    district: "район Есиль",
    street: "ул. Е 669, 13",
    full: "Астана, ул. Е 669, 13",
    postalCode: "Z05P9T8",
    country: "KZ",
  },
  /** Координаты по карточке организации на картах (приблизительно, для разметки и маршрутов). */
  geo: { lat: 51.08749, lng: 71.481355 },

  /** Администрация клиники — звонки */
  phone: { display: "+7 708 733 28 81", href: "tel:+77087332881", e164: "+77087332881" },
  /** WhatsApp для записи */
  whatsapp: { display: "+7 747 227 40 96", number: WHATSAPP_NUMBER, e164: "+77472274096" },

  hours: {
    label: "Ежедневно 08:00–20:00",
    short: "08:00–20:00",
    note: "без выходных",
    opens: "08:00",
    closes: "20:00",
  },

  license: {
    number: "24026583",
    issuer: "ДКМФК МЗ РК по г. Астана",
    label: "Лицензия № 24026583, ДКМФК МЗ РК по г. Астана",
  },

  social: {
    instagram: "https://www.instagram.com/aiva.clinic_astana/",
    tiktok: "https://www.tiktok.com/@aiva.clinic",
    youtube: "https://www.youtube.com/channel/UC1EBxPu6hds8KHRhQzTv8gw",
  },

  maps: {
    twogis: "https://2gis.kz/astana/firm/70000001090259641",
    twogisReviews: "https://2gis.kz/astana/firm/70000001090259641/tab/reviews",
    twogisFirmId: "70000001090259641",
    yandex: "https://yandex.kz/maps/ru/org/aiva_clinic/132063384129/",
  },

  /** Оценка в 2ГИС — фактические данные карточки на указанную дату. Обновлять вручную. */
  rating: { source: "2ГИС", value: "4,7", ratings: 307, reviews: 173, asOf: "октябрь 2026 г." },
} as const;

/** Ссылка в WhatsApp с предзаполненным сообщением */
export function waLink(text = "Здравствуйте! Хочу записаться на приём в AIVA CLINIC.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Маршрут до клиники в популярных картах */
export const routes = {
  twogis: `https://2gis.kz/astana/directions/points/%7C${site.geo.lng}%2C${site.geo.lat}%3B${site.maps.twogisFirmId}`,
  yandex: `https://yandex.kz/maps/?rtext=~${site.geo.lat}%2C${site.geo.lng}&rtt=auto`,
  google: `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat}%2C${site.geo.lng}`,
};

export const nav = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/vrachi", label: "Врачи" },
  { href: "/o-klinike", label: "О клинике" },
  { href: "/akcii", label: "Акции" },
  { href: "/kontakty", label: "Контакты" },
] as const;

/** Подпапка, в которой размещён сайт (нужна только для демо-версии на GitHub Pages) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Демо-версия закрыта от поисковых систем, чтобы не конкурировать с будущим основным сайтом */
export const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

/** Абсолютный адрес страницы или файла из public */
export function abs(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Абсолютный адрес файла, путь к которому уже выдал сборщик (импортированные изображения) */
export function absAsset(src: string) {
  return new URL(src, site.url).href;
}
