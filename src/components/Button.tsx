import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "light" | "outline" | "outline-light" | "whatsapp" | "sun" | "soft";
type Size = "md" | "lg" | "sm";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white shadow-[0_10px_30px_-12px_rgb(60_120_87/0.7)] hover:bg-forest-deep active:scale-[0.98]",
  light: "bg-white text-ink shadow-soft hover:bg-mist active:scale-[0.98]",
  outline:
    "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-white active:scale-[0.98]",
  "outline-light":
    "border border-white/30 text-white hover:border-white hover:bg-white hover:text-pine active:scale-[0.98]",
  whatsapp: "bg-leaf text-ink hover:brightness-95 active:scale-[0.98]",
  sun: "bg-sun text-ink hover:brightness-95 active:scale-[0.98]",
  soft: "bg-forest/8 text-forest-deep hover:bg-forest/14 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: Size; className?: string } = {}) {
  return cn(
    "group/btn relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform,filter] duration-300 ease-soft disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Стрелка, которая «перелистывается» при наведении на кнопку */
export function BtnArrow({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-4 overflow-hidden", className)} aria-hidden="true">
      <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-soft group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
      <ArrowUpRight className="absolute inset-0 size-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-soft group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
    </span>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({ href, variant, size, arrow, children, className, ...rest }: ButtonLinkProps) {
  const cls = buttonClass({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <BtnArrow />}
    </>
  );
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
