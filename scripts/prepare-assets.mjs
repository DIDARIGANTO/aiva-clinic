// Готовит исходные материалы клиники (_materials) для сайта:
// фотографии → src/assets (оптимизированные JPEG), логотип → SVG, иконки и OG-изображение → public / src/app.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = (...p) => path.join(root, "_materials", ...p);
const out = (...p) => path.join(root, ...p);

const photos = {
  "IMG_1718": "lobby-1",
  "IMG_1719": "lobby-2",
  "IMG_1724": "exo-room-1",
  "IMG_1729": "exo-room-2",
  "IMG_1735": "exo-detail",
  "IMG_1738": "iv-room-1",
  "IMG_1740": "iv-room-2",
  "IMG_1744": "device-1",
  "IMG_1747": "device-room",
  "DSC03585": "patient-back",
  "DSC03590": "patient-neck",
  "DSC03685": "patient-smile",
  "DSC03713": "patient-exo-sit",
  "DSC03717": "patient-exo-lie",
  "DSC03796": "exo-table-dark",
};

const doctors = {
  "zhuldyz-serikovna": "salambekova-zhuldyz",
  "elona-gaikovna": "potapova-elona",
  "rinat-nurgazyvich": "ahmetov-rinat",
  "atygaeva-asem": "atygaeva-asem",
};

async function photo(input, output, max = 2200) {
  await sharp(input)
    .rotate()
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(output);
  const m = await sharp(output).metadata();
  console.log(path.basename(output), `${m.width}x${m.height}`);
}

for (const [from, to] of Object.entries(photos)) {
  await photo(src("photos", `${from}.jpg`), out("src/assets/photos", `${to}.jpg`));
}
for (const [from, to] of Object.entries(doctors)) {
  await photo(src("doctors", `${from}.jpeg`), out("src/assets/doctors", `${to}.jpg`), 1600);
}

// ---------- Логотип: векторные контуры из фирменного PDF ----------
const paths = JSON.parse(await fs.readFile(src("logo", "paths.json"), "utf8"));
// В PDF знак задан «негативом»: круг-подложка и фон, из которого вырезаны линии эмблемы.
// Отбрасываем внешний контур (самый крупный) — остаются сами линии знака одним контуром.
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(+(+n).toFixed(2)));
const area = (d) => {
  const pts = [...d.matchAll(/(-?\d+\.\d+) (-?\d+\.\d+)/g)].map((m) => [+m[1], +m[2]]);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
};
const subpaths = paths[2][2].split(/(?=M)/).filter(Boolean).sort((a, b) => area(b) - area(a));
const emblem = round(subpaths.slice(1).join(""));
const wordmark = round(paths[3][2]);

const emblemBox = "111.5 25.9 141.4 141.4";
const emblemInner = () => `<path d="${emblem}" fill="currentColor" fill-rule="evenodd"/>`;

await fs.writeFile(
  out("src/assets/brand/logo-paths.ts"),
  `// Сгенерировано scripts/prepare-assets.mjs из фирменного логотипа (AIVA лого1.pdf). Не редактировать вручную.
export const EMBLEM_VIEWBOX = "${emblemBox}";
export const EMBLEM_PATH = "${emblem}";
export const WORDMARK_VIEWBOX = "109.2 163 144.7 17.2";
export const WORDMARK_PATH = "${wordmark}";
`,
);

const emblemSvg = (color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${emblemBox}" color="${color}">${emblemInner()}</svg>`;
await fs.writeFile(out("public/brand/emblem.svg"), emblemSvg("#3C7857"));
await fs.writeFile(out("public/brand/emblem-white.svg"), emblemSvg("#ffffff"));
const fullLogo = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 18 164 170" color="${color}">${emblemInner()}<path d="${wordmark}" fill="currentColor"/></svg>`;
await fs.writeFile(out("public/brand/logo.svg"), fullLogo("#3C7857"));
await fs.writeFile(out("public/brand/logo-white.svg"), fullLogo("#ffffff"));

// ---------- Иконки ----------
const iconSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="${radius}" fill="#3C7857"/>
  <svg x="26" y="26" width="148" height="148" viewBox="${emblemBox}" color="#ffffff">${emblemInner()}</svg>
</svg>`;
await fs.writeFile(out("src/app/icon.svg"), iconSvg(200, 48));
await sharp(Buffer.from(iconSvg(180, 0))).resize(180, 180).png().toFile(out("src/app/apple-icon.png"));
await sharp(Buffer.from(iconSvg(512, 0))).resize(512, 512).png().toFile(out("public/brand/icon-512.png"));
await sharp(Buffer.from(iconSvg(192, 0))).resize(192, 192).png().toFile(out("public/brand/icon-192.png"));

// ---------- Open Graph ----------
const ogBg = await sharp(out("src/assets/photos/lobby-1.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .toBuffer();
const ogOverlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#1F3B2C" stop-opacity="0.96"/><stop offset="0.58" stop-color="#2C5A41" stop-opacity="0.9"/><stop offset="1" stop-color="#3C7857" stop-opacity="0.35"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <svg x="80" y="78" width="112" height="112" viewBox="${emblemBox}" color="#ffffff">${emblemInner()}</svg>
  <svg x="214" y="116" width="300" height="36" viewBox="109.2 163 144.7 17.2" color="#ffffff" preserveAspectRatio="xMinYMid meet"><path d="${wordmark}" fill="currentColor"/></svg>
  <text x="80" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="68" font-weight="500" fill="#ffffff" letter-spacing="-1.5">Вернитесь к активной жизни</text>
  <text x="80" y="400" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="30" fill="#DDEBE2">Терапия, диагностика, физиотерапия и реабилитация</text>
  <rect x="80" y="470" width="8" height="8" rx="4" fill="#FFE666"/>
  <text x="104" y="484" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="28" fill="#ffffff">Астана, ул. Е 669, 13  ·  ежедневно 08:00–20:00</text>
</svg>`;
await sharp(ogBg).composite([{ input: Buffer.from(ogOverlay) }]).jpeg({ quality: 86, mozjpeg: true }).toFile(out("public/og.jpg"));

// превью для проверки
await sharp(Buffer.from(fullLogo("#3C7857"))).resize(600).flatten({ background: "#FAFBF8" }).png().toFile(out("_materials/preview/logo-check.png"));
console.log("done");
