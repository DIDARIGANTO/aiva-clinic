import { NextResponse } from "next/server";
import { bookingMessage, parseBooking, type BookingResponse } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Защита от спама: ограничение частоты по IP (в памяти процесса) ── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return list.length > MAX_PER_WINDOW;
}

function json(body: BookingResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}

async function sendWebhook(payload: unknown) {
  const url = process.env.BOOKING_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  return res.ok;
}

export async function POST(request: Request) {
  // Принимаем только запросы с собственного сайта
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: "Запрос отклонён." }, 403);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return json(
      { ok: false, error: "Слишком много заявок. Попробуйте позже или напишите нам в WhatsApp." },
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Некорректный запрос." }, 400);
  }

  const parsed = parseBooking(body);
  if (!parsed.ok) {
    return json({ ok: false, error: "Проверьте правильность заполнения формы.", fields: parsed.fields }, 422);
  }

  const data = parsed.data;

  // Признаки автоматической отправки: заполнено скрытое поле или форма отправлена быстрее,
  // чем её мог бы заполнить человек. Администраторам такую заявку не передаём, но и не теряем
  // живого посетителя (например, с автозаполнением): ему предлагается отправить заявку в WhatsApp.
  if (data.hp.length > 0 || data.elapsed < 2500) {
    return json({ ok: true, delivery: "whatsapp" });
  }

  if (data.date) {
    const today = new Date(Date.now() + 5 * 3600 * 1000).toISOString().slice(0, 10); // Астана, UTC+5
    if (data.date < today) {
      return json(
        { ok: false, error: "Проверьте правильность заполнения формы.", fields: { date: "Выберите дату не раньше сегодняшней" } },
        422,
      );
    }
  }

  const text = `🌿 Заявка с сайта AIVA CLINIC\n\n${bookingMessage(data)
    .split("\n")
    .slice(2)
    .join("\n")}${data.page ? `\n\nСтраница: ${data.page}` : ""}`;

  let delivered = false;
  try {
    const results = await Promise.allSettled([
      sendTelegram(text),
      sendWebhook({
        source: "aiva-clinic-site",
        createdAt: new Date().toISOString(),
        name: data.name,
        phone: `+${data.phone}`,
        service: data.service,
        date: data.date,
        time: data.time,
        comment: data.comment,
        page: data.page,
      }),
    ]);
    delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  } catch {
    delivered = false;
  }

  // Канал доставки не настроен или недоступен — пациент отправит заявку сам через WhatsApp
  return json({ ok: true, delivery: delivered ? "sent" : "whatsapp" });
}
