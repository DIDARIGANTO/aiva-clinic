"use client";

import type { ReactNode } from "react";
import { BtnArrow, buttonClass, type ButtonVariant } from "@/components/Button";
import { useBooking } from "./BookingProvider";

type Props = {
  service?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  children?: ReactNode;
  /** без оформления кнопки — для текстовых ссылок */
  bare?: boolean;
  "aria-label"?: string;
};

export function BookingButton({
  service,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children = "Записаться на приём",
  bare = false,
  ...rest
}: Props) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open(service)}
      className={bare ? className : buttonClass({ variant, size, className })}
      {...rest}
    >
      {children}
      {arrow && <BtnArrow />}
    </button>
  );
}
