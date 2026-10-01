import type { Metadata } from "next";
import { abs, absAsset, site } from "./site";

/** Метаданные страницы: уникальные title/description, canonical и Open Graph */
export function pageMeta({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const img = image ? absAsset(image) : abs("/og.jpg");
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: abs(path) },
    openGraph: {
      type: "website",
      locale: "ru_KZ",
      siteName: site.name,
      url: abs(path),
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [{ url: img, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}
