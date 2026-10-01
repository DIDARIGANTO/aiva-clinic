"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { Emblem } from "@/components/Logo";
import { site } from "@/lib/site";
import { BookingForm, type ServiceGroup } from "./BookingForm";

type Ctx = { open: (service?: string) => void };
const BookingContext = createContext<Ctx>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ groups, children }: { groups: ServiceGroup[]; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState("");
  const [instance, setInstance] = useState(0);

  const open = useCallback((s?: string) => {
    setService(s ?? "");
    setInstance((n) => n + 1);
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  // Блокируем прокрутку страницы, пока открыто окно записи
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.style.overflow = el.open ? "hidden" : "";
    };
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["open"] });
    return () => {
      obs.disconnect();
      document.documentElement.style.overflow = "";
    };
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="booking-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="booking-dialog m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 sm:m-auto sm:h-fit sm:max-h-[calc(100dvh-2rem)] sm:w-[min(46rem,calc(100vw-2rem))]"
      >
        <div className="relative flex h-full flex-col overflow-hidden bg-milk sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:shadow-lift">
          <div className="relative overflow-hidden bg-pine px-6 pb-7 pt-7 text-white grain sm:px-9">
            <Emblem className="pointer-events-none absolute -right-10 -top-12 size-52 text-white/8" />
            <p className="eyebrow text-sun">Запись на приём</p>
            <h2 id="booking-title" className="mt-3 text-[1.7rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[2.1rem]">
              Оставьте заявку — <span className="accent text-white">подберём время</span>
            </h2>
            <p className="mt-2.5 max-w-md text-sm text-white/70">
              {site.hours.label}, {site.hours.note}. Поможем выбрать специалиста и удобное время.
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть окно записи"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-9 sm:py-8">
            <BookingForm key={instance} groups={groups} defaultService={service} />
          </div>
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
