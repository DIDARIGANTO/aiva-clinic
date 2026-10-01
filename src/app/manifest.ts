import type { MetadataRoute } from "next";
import { basePath, site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.descriptor}`,
    short_name: site.name,
    description: "Консультации врачей, диагностика, физиотерапия и реабилитация в Астане.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#FAFBF8",
    theme_color: "#3C7857",
    lang: "ru",
    icons: [
      { src: `${basePath}/brand/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basePath}/brand/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
