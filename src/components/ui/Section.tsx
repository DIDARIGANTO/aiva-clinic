import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Небольшая зелёная подпись над заголовком */
export function Eyebrow({
  children,
  className,
  tone = "forest",
}: {
  children: ReactNode;
  className?: string;
  tone?: "forest" | "light";
}) {
  return (
    <p className={cn("eyebrow", tone === "light" ? "text-white/85" : "text-forest", className)}>{children}</p>
  );
}

/** Задержка появления для data-reveal */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

/** Заголовок секции в стиле референса: заглавные, жирные, по центру */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "forest",
  size = "md",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "forest" | "light";
  size?: "md" | "xl";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto text-center" : "", "max-w-4xl", className)}>
      {eyebrow && (
        <div data-reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag
        data-reveal
        style={delay(80)}
        className={cn(size === "xl" ? "text-h2-xl" : "text-h2", eyebrow && "mt-4", tone === "light" ? "text-white" : "text-ink")}
      >
        {title}
      </Tag>
      {lead && (
        <p
          data-reveal
          style={delay(160)}
          className={cn("text-lead mt-5 max-w-2xl", align === "center" && "mx-auto", tone === "light" ? "text-white/85" : "text-moss")}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
