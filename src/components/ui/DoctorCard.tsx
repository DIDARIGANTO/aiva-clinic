import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import type { Doctor } from "@/data/doctors";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Карточка врача по референсу: серая плашка, фото со скруглением, стрелки-буллиты */
export function DoctorCard({ doctor, className }: { doctor: Doctor; index?: number; className?: string }) {
  const d = doctor;
  return (
    <article className={cn("group relative flex h-full flex-col rounded-[1.5rem] bg-mist p-3 pb-6 transition-shadow duration-300 hover:shadow-lift", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-white">
        <Image
          src={d.photo}
          alt={`${d.fullName} — ${d.role.toLowerCase()}, AIVA CLINIC`}
          fill
          sizes="(min-width: 640px) 19rem, 17.5rem"
          className="img-zoom object-cover"
          style={{ objectPosition: d.photoPosition }}
        />
      </div>
      <h3 className="mt-5 px-2 text-[1.2rem] font-semibold leading-snug text-ink">
        <Link href={`/vrachi/${d.slug}`} className="transition-colors duration-300 after:absolute after:inset-0 hover:text-forest">
          {d.fullName}
        </Link>
      </h3>
      <ul className="mt-4 grid gap-2.5 px-2 text-[0.88rem] font-medium leading-snug text-ink">
        <li className="grid grid-cols-[auto_1fr] items-start gap-x-3">
          <Arrow className="mt-1 h-3 w-7" />
          {d.role}
        </li>
        {d.specialties.join(", ").toLowerCase() !== d.role.toLowerCase() && (
          <li className="grid grid-cols-[auto_1fr] items-start gap-x-3">
            <Arrow className="mt-1 h-3 w-7" />
            {d.specialties.join(", ")}
          </li>
        )}
        <li className="grid grid-cols-[auto_1fr] items-start gap-x-3">
          <Arrow className="mt-1 h-3 w-7" />
          AIVA CLINIC, {site.address.street}
        </li>
      </ul>
    </article>
  );
}
