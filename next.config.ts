import type { NextConfig } from "next";

/**
 * DEMO_EXPORT=1 — статическая демо-сборка для GitHub Pages (npm run build:demo):
 * без серверной части, изображения отдаются как есть, сайт живёт в подпапке (basePath).
 * Обычная сборка (npm run build) — полноценный сайт для Node.js-хостинга.
 */
const demo = process.env.DEMO_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 560, 720, 828, 1080, 1280, 1680, 2048],
    qualities: [75, 85],
    unoptimized: demo,
  },
  ...(demo
    ? { output: "export" as const, basePath, trailingSlash: true }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
