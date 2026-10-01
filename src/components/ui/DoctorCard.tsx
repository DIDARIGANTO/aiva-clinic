import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { cn } from "@/lib/cn";

export function DoctorCard({ doctor, index = 0, className }: { doctor: Doctor; index?: number; className?: string }) {
  const d = doctor;
  return (
    <article className={cn("group relative", className)}>
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-mist",
          index % 2 === 0 ? "leaf-sm" : "leaf-sm-alt",
        )}
      >
        <Image
          src={d.photo}
          alt={`${d.fullName} — ${d.role.toLowerCase()}, AIVA CLINIC`}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 86vw"
          className="img-zoom object-cover"
          style={{ objectPosition: d.photoPosition }}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-pine/55 via-transparent to-transparent opacity-70" aria-hidden="true" />
        <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
          {d.specialties.map((s) => (
            <li key={s} className="rounded-full bg-white/90 px-3 py-1.5 text-[0.78rem] font-medium text-forest backdrop-blur">
              {s}
            </li>
          ))}
        </ul>
        <span
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-forest opacity-0 shadow-soft transition-[opacity,transform] duration-500 ease-soft group-hover:rotate-45 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-[1.3rem] font-medium leading-tight tracking-[-0.025em]">
          <Link href={`/vrachi/${d.slug}`} className="transition-colors duration-300 after:absolute after:inset-0 hover:text-forest">
            {d.fullName}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.93rem] leading-snug text-moss">{d.role}</p>
      </div>
    </article>
  );
}
