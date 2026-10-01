import type { SVGProps } from "react";
import {
  Activity,
  ClipboardCheck,
  FlaskConical,
  ScanLine,
  Stethoscope,
  Syringe,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/services";

type P = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c.01-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.76 2.67 4.25 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43l-.49-.01Z" />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.6 2h-3.1v13.4a2.73 2.73 0 1 1-2.73-2.74c.25 0 .5.04.73.1V9.58a5.9 5.9 0 0 0-.73-.05A5.86 5.86 0 1 0 16.6 15.4V8.56a7.3 7.3 0 0 0 4.27 1.37V6.84A4.28 4.28 0 0 1 16.6 2Z" />
    </svg>
  );
}

export function YouTubeIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

/** Декоративный лист — фрагмент мотива эмблемы */
export function LeafOutline(props: P) {
  return (
    <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M60 4C22 44 8 86 8 118c0 40 24 70 52 78 28-8 52-38 52-78 0-32-14-74-52-114Z" />
      <path d="M60 30v166M60 78 34 56M60 78l26-22M60 116 26 90M60 116l34-26M60 152 30 130M60 152l30-22" />
    </svg>
  );
}

export const serviceIcons: Record<IconName, LucideIcon> = {
  stethoscope: Stethoscope,
  scan: ScanLine,
  clipboard: ClipboardCheck,
  waves: Waves,
  syringe: Syringe,
  activity: Activity,
  flask: FlaskConical,
};
