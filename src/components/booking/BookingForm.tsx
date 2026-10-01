"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Check, PhoneCall } from "lucide-react";
import { buttonClass } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons";
import { bookingMessage, formatPhone, parseBooking, timeSlots } from "@/lib/booking";
import { basePath, site, waLink } from "@/lib/site";
import { cn } from "@/lib/cn";

export type ServiceGroup = { label: string; options: string[] };

type Props = {
  groups: ServiceGroup[];
  defaultService?: string;
  /** оформление: на светлой карточке или на тёмной секции */
  tone?: "light" | "dark";
  compact?: boolean;
};

type Status = { state: "idle" } | { state: "whatsapp"; link: string };

const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const DAYS_AHEAD = 30;
const noopSubscribe = () => () => {};
const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Ближайшие дни для выбора желаемой даты: «Сегодня, 2 октября», «Завтра…», «Сб, 4 октября» — без года */
function upcomingDays(today: string) {
  const [y, m, d] = today.split("-").map(Number);
  const dayMonth = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "UTC" });
  const withWeekday = new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const date = new Date(Date.UTC(y, m - 1, d + i));
    const label =
      i === 0
        ? `Сегодня, ${dayMonth.format(date)}`
        : i === 1
          ? `Завтра, ${dayMonth.format(date)}`
          : capitalize(withWeekday.format(date));
    return { value: date.toISOString().slice(0, 10), label };
  });
}

export function BookingForm({ groups, defaultService = "", tone = "light", compact = false }: Props) {
  const uid = useId();
  const pathname = usePathname();
  const openedAt = useRef(0);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  // «Сегодня» берётся из браузера посетителя: страницы собираются заранее, и дата сборки устарела бы
  const today = useSyncExternalStore(noopSubscribe, todayIso, () => null);
  const days = useMemo(() => (today ? upcomingDays(today) : []), [today]);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const known = useMemo(() => groups.some((g) => g.options.includes(service)), [groups, service]);
  const dark = tone === "dark";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      consent: fd.get("consent") === "on",
      hp: String(fd.get("hp") ?? ""),
      page: pathname,
      elapsed: Date.now() - openedAt.current,
    };

    const parsed = parseBooking(payload);
    if (!parsed.ok) {
      setErrors(parsed.fields);
      const first = Object.keys(parsed.fields)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    const link = waLink(bookingMessage(parsed.data));

    // WhatsApp открывается сразу, в момент нажатия: если сначала ждать ответа сервера,
    // браузер посчитает новое окно всплывающим и заблокирует его.
    const win = window.open(link, "_blank");
    if (win) win.opener = null;
    else window.location.href = link;

    // Параллельно заявка уходит на сервер: если настроен Telegram или веб-хук,
    // администраторы получат её, даже если посетитель не отправит сообщение в WhatsApp.
    void fetch(`${basePath}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});

    setStatus({ state: "whatsapp", link });
  }

  /* ── Экран после перехода в WhatsApp ── */
  if (status.state === "whatsapp") {
    return (
      <div className="flex flex-col items-start gap-5 py-2" role="status" aria-live="polite">
        <span
          className={cn(
            "grid size-14 place-items-center rounded-full",
            dark ? "bg-white/12 text-sun" : "bg-mint-soft text-forest",
          )}
        >
          <Check className="size-6" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-h3">Открыли WhatsApp</h3>
          <p className={cn("mt-2 max-w-md", dark ? "text-white/75" : "text-moss")}>
            Сообщение с вашей заявкой уже набрано — отправьте его, и администратор подтвердит дату и время
            приёма.
          </p>
        </div>
        <a
          href={status.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass({ variant: "whatsapp", size: "lg", className: "w-full sm:w-auto" })}
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp не открылся? Нажмите сюда
        </a>
        <p className={cn("text-sm", dark ? "text-white/60" : "text-moss")}>
          Срочный вопрос? Позвоните:{" "}
          <a href={site.phone.href} className="link-line font-medium text-current">
            {site.phone.display}
          </a>
        </p>
        <button
          type="button"
          onClick={() => {
            openedAt.current = Date.now();
            setStatus({ state: "idle" });
          }}
          className={cn("link-line text-sm font-medium", dark ? "text-white" : "text-forest")}
        >
          Заполнить форму ещё раз
        </button>
      </div>
    );
  }

  const field = cn(
    "peer h-13 w-full rounded-2xl border px-4 text-[0.98rem] outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent",
    dark
      ? "border-white/18 bg-white/8 text-white focus:border-white/60 focus:bg-white/12"
      : "border-line bg-white text-ink focus:border-forest focus:shadow-[0_0_0_4px_rgb(60_120_87/0.1)]",
  );
  const label = cn(
    "pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-[0.98rem] transition-all duration-300 ease-soft",
    "peer-focus:top-3 peer-focus:text-[0.68rem] peer-focus:tracking-wide peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:tracking-wide",
    dark ? "text-white/65" : "text-moss",
  );
  const staticLabel = cn(
    "pointer-events-none absolute left-4 top-3 -translate-y-1/2 text-[0.68rem] tracking-wide",
    dark ? "text-white/65" : "text-moss",
  );
  const errCls = cn("mt-1.5 text-xs", dark ? "text-peach" : "text-[#b3402e]");

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5" aria-describedby={`${uid}-note`}>
      <div className={cn("grid gap-3.5", !compact && "sm:grid-cols-2")}>
        <div>
          <div className="relative">
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Имя"
              required
              maxLength={80}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              className={cn(field, "pt-4")}
            />
            <label htmlFor={`${uid}-name`} className={label}>
              Ваше имя
            </label>
          </div>
          {errors.name && (
            <p id={`${uid}-name-err`} className={errCls}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <div className="relative">
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value ? formatPhone(e.target.value) : "")}
              onFocus={() => !phone && setPhone("+7")}
              onBlur={() => phone === "+7" && setPhone("")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
              className={cn(field, "pt-4")}
            />
            <label htmlFor={`${uid}-phone`} className={label}>
              Телефон
            </label>
          </div>
          {errors.phone && (
            <p id={`${uid}-phone-err`} className={errCls}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <select
          id={`${uid}-service`}
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={cn(field, "appearance-none pt-4 pr-10", dark && "[&>*]:text-ink")}
        >
          <option value="">Не знаю — помогите выбрать</option>
          {!known && service && <option value={service}>{service}</option>}
          {groups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <label htmlFor={`${uid}-service`} className={staticLabel}>
          Услуга или врач
        </label>
        <svg
          className={cn("pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2", dark ? "text-white/70" : "text-moss")}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <div className="relative">
            <select
              id={`${uid}-date`}
              name="date"
              defaultValue=""
              aria-invalid={!!errors.date}
              className={cn(field, "appearance-none truncate pt-4 pr-9", dark && "[&>*]:text-ink")}
            >
              <option value="">Любая</option>
              {days.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <label htmlFor={`${uid}-date`} className={staticLabel}>
              Желаемая дата
            </label>
          <svg
            className={cn("pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2", dark ? "text-white/70" : "text-moss")}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </div>
          {errors.date && <p className={errCls}>{errors.date}</p>}
        </div>
        <div className="relative">
          <select
            id={`${uid}-time`}
            name="time"
            defaultValue=""
            className={cn(field, "appearance-none pt-4 pr-9", dark && "[&>*]:text-ink")}
          >
            <option value="">Любое</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <label htmlFor={`${uid}-time`} className={staticLabel}>
            Желаемое время
          </label>
          <svg
            className={cn("pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2", dark ? "text-white/70" : "text-moss")}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {!compact && (
        <div className="relative">
          <textarea
            id={`${uid}-comment`}
            name="comment"
            rows={2}
            maxLength={600}
            placeholder="Комментарий"
            className={cn(field, "h-auto min-h-22 resize-none pb-3 pt-6")}
          />
          <label
            htmlFor={`${uid}-comment`}
            className={cn(
              "pointer-events-none absolute left-4 top-4 text-[0.98rem] transition-all duration-300 ease-soft",
              "peer-focus:top-2 peer-focus:text-[0.68rem] peer-focus:tracking-wide peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:tracking-wide",
              dark ? "text-white/65" : "text-moss",
            )}
          >
            Комментарий — по желанию
          </label>
        </div>
      )}

      {/* Ловушка для ботов: скрыта от людей и вспомогательных технологий */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Не заполняйте это поле
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="group/c flex cursor-pointer items-start gap-3 text-[0.82rem] leading-snug">
          <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={!!errors.consent}
              className={cn(
                "peer size-5 cursor-pointer appearance-none rounded-md border transition-colors duration-200",
                dark
                  ? "border-white/40 bg-white/8 checked:border-sun checked:bg-sun"
                  : "border-sage/60 bg-white checked:border-forest checked:bg-forest",
              )}
            />
            <Check
              className={cn(
                "pointer-events-none absolute size-3.5 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100",
                dark ? "text-ink" : "text-white",
              )}
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>
          <span className={dark ? "text-white/75" : "text-moss"}>
            Даю{" "}
            <Link
              href="/soglasie-na-obrabotku-dannyh"
              target="_blank"
              className={cn("underline underline-offset-2", dark ? "text-white" : "text-forest")}
            >
              согласие на обработку персональных данных
            </Link>{" "}
            и принимаю{" "}
            <Link
              href="/politika-konfidencialnosti"
              target="_blank"
              className={cn("underline underline-offset-2", dark ? "text-white" : "text-forest")}
            >
              политику конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent}</p>}
      </div>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className={buttonClass({ variant: dark ? "sun" : "primary", size: "lg", className: "w-full sm:w-auto" })}
        >
          Записаться на приём
        </button>
        <a
          href={site.phone.href}
          className={cn("inline-flex items-center justify-center gap-2 text-sm font-medium", dark ? "text-white/85" : "text-forest")}
        >
          <PhoneCall className="size-4" aria-hidden="true" />
          {site.phone.display}
        </a>
      </div>

      <p id={`${uid}-note`} className={cn("text-xs leading-relaxed", dark ? "text-white/55" : "text-moss")}>
        После нажатия откроется WhatsApp с готовым сообщением — останется его отправить. Дату и время
        подтвердит администратор. График работы — {site.hours.label.toLowerCase()}.
      </p>
    </form>
  );
}
