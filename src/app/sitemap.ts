import type { MetadataRoute } from "next";
import { doctors } from "@/data/doctors";
import { categories, services } from "@/data/services";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: abs(path), lastModified: now, changeFrequency, priority });

  return [
    page("/", 1, "weekly"),
    page("/uslugi", 0.9, "weekly"),
    ...categories.map((c) => page(`/uslugi/${c.slug}`, 0.85)),
    ...services.filter((s) => s.page).map((s) => page(`/uslugi/${s.category}/${s.slug}`, 0.75)),
    page("/akcii", 0.8, "weekly"),
    page("/vrachi", 0.8),
    ...doctors.map((d) => page(`/vrachi/${d.slug}`, 0.7)),
    page("/o-klinike", 0.7),
    page("/kontakty", 0.8),
    page("/politika-konfidencialnosti", 0.2, "yearly"),
    page("/soglasie-na-obrabotku-dannyh", 0.2, "yearly"),
  ];
}
