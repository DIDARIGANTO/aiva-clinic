/**
 * Заявка на приём: общая логика для формы (клиент) и обработчика /api/booking (сервер).
 * Проверка данных написана без сторонних библиотек, чтобы одна и та же функция
 * работала в браузере и на сервере и не увеличивала объём JavaScript на страницах.
 */

/** Временные интервалы, которые пациент может выбрать как «желаемое время». Клиника работает 08:00–20:00. */
export const timeSlots = [
  "08:00–10:00",
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00",
  "18:00–20:00",
] as const;

export type BookingData = {
  name: string;
  /** 11 цифр, начинается с 7 */
  phone: string;
  service: string;
  date: string;
  time: string;
  comment: string;
  consent: true;
  /** страница, с которой отправлена заявка */
  page: string;
  /** ловушка для ботов: поле скрыто от людей и должно остаться пустым */
  hp: string;
  /** время в мс от открытия формы до отправки */
  elapsed: number;
};

export type BookingResult =
  | { ok: true; data: BookingData }
  | { ok: false; fields: Record<string, string> };

export type BookingResponse =
  | { ok: true; delivery: "sent" | "whatsapp" }
  | { ok: false; error: string; fields?: Record<string, string> };

export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits.length === 10) digits = `7${digits}`;
  return digits;
}

/** Маска казахстанского номера: +7 (7xx) xxx-xx-xx */
export function formatPhone(input: string) {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("8")) d = `7${d.slice(1)}`;
  if (!d.startsWith("7")) d = `7${d}`;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += ` ${p.slice(3, 6)}`;
  if (p.length > 6) out += `-${p.slice(6, 8)}`;
  if (p.length > 8) out += `-${p.slice(8, 10)}`;
  return out;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max + 1) : "");

/** Проверяет и нормализует данные заявки. На вход может прийти что угодно. */
export function parseBooking(raw: unknown): BookingResult {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const fields: Record<string, string> = {};

  const name = str(r.name, 80);
  if (name.length < 2) fields.name = "Укажите имя";
  else if (name.length > 80) fields.name = "Слишком длинное имя";
  else if (!/^[\p{L}\s.'-]+$/u.test(name)) fields.name = "Имя может содержать только буквы";

  const phone = normalizePhone(str(r.phone, 40));
  if (!/^7\d{10}$/.test(phone)) fields.phone = "Укажите номер в формате +7 (7xx) xxx-xx-xx";

  const service = str(r.service, 160);
  if (service.length > 160) fields.service = "Слишком длинное название услуги";

  const date = str(r.date, 10);
  if (date !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(date)) fields.date = "Некорректная дата";

  const time = str(r.time, 20);
  if (time !== "" && !(timeSlots as readonly string[]).includes(time)) fields.time = "Некорректное время";

  const comment = str(r.comment, 600);
  if (comment.length > 600) fields.comment = "Слишком длинный комментарий";

  if (r.consent !== true) fields.consent = "Необходимо согласие на обработку персональных данных";

  if (Object.keys(fields).length) return { ok: false, fields };

  const elapsed = typeof r.elapsed === "number" && Number.isFinite(r.elapsed) ? Math.max(0, Math.round(r.elapsed)) : 0;

  return {
    ok: true,
    data: {
      name,
      phone,
      service,
      date,
      time,
      comment,
      consent: true,
      page: str(r.page, 200).slice(0, 200),
      hp: str(r.hp, 200),
      elapsed,
    },
  };
}

export function formatDateRu(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

/** Текст заявки — для WhatsApp и уведомления администраторам */
export function bookingMessage(d: Pick<BookingData, "name" | "phone" | "service" | "date" | "time" | "comment">) {
  const phone = `+${d.phone.slice(0, 1)} ${d.phone.slice(1, 4)} ${d.phone.slice(4, 7)} ${d.phone.slice(7, 9)} ${d.phone.slice(9, 11)}`;
  const when = [formatDateRu(d.date), d.time].filter(Boolean).join(", ");
  const details = [
    `Имя: ${d.name}`,
    `Телефон: ${phone}`,
    d.service && `Услуга: ${d.service}`,
    when && `Желаемое время: ${when}`,
    d.comment && `Комментарий: ${d.comment}`,
  ].filter(Boolean);
  return ["Здравствуйте! Хочу записаться на приём в AIVA CLINIC.", "", ...details].join("\n");
}
