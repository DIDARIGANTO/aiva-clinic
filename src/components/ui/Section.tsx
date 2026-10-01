import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

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
    <p className={cn("eyebrow flex items-center gap-2.5", tone === "light" ? "text-white/70" : "text-forest-deep", className)}>
      <span
        className={cn("block h-2.5 w-1.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]", tone === "light" ? "bg-sun" : "bg-leaf")}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/** Задержка появления для data-reveal */
export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "forest",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "forest" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <div data-reveal className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <Tag data-reveal style={delay(80)} className={cn("text-h2", eyebrow && "mt-5", tone === "light" && "text-white")}>
        {title}
      </Tag>
      {lead && (
        <p
          data-reveal
          style={delay(160)}
          className={cn("text-lead mt-5 max-w-2xl", align === "center" && "mx-auto", tone === "light" ? "text-white/70" : "text-moss")}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
