import type { StaticImageData } from "next/image";
import salambekova from "@/assets/doctors/salambekova-zhuldyz.jpg";
import potapova from "@/assets/doctors/potapova-elona.jpg";
import ahmetov from "@/assets/doctors/ahmetov-rinat.jpg";
import atygaeva from "@/assets/doctors/atygaeva-asem.jpg";

/**
 * Врачи клиники. Источник: документ «Врачи и опыт работы» и фотографии из папки «Врач».
 * Образование, стаж, категории и сертификаты клиника пока не предоставила —
 * поля education / experience / certificates оставлены пустыми и на сайте не выводятся.
 */
export type Doctor = {
  slug: string;
  fullName: string;
  /** Фамилия + имя — для карточек */
  shortName: string;
  /** Имя и отчество — обращение */
  givenName: string;
  role: string;
  specialties: string[];
  /** Краткое описание из подтверждённых данных о должности и направлениях приёма */
  intro: string;
  /** slug-и услуг (консультаций), которые ведёт врач */
  services: string[];
  /** slug-и направлений, за которые отвечает врач */
  departments?: string[];
  photo: StaticImageData;
  photoPosition: string;
  seoTitle: string;
  education?: string[];
  experience?: string;
  certificates?: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "salambekova-zhuldyz",
    fullName: "Саламбекова Жулдыз Сериковна",
    shortName: "Жулдыз Саламбекова",
    givenName: "Жулдыз Сериковна",
    role: "Главный врач",
    specialties: ["Терапевт"],
    intro:
      "Главный врач AIVA CLINIC, ведёт приём как терапевт: консультирует при жалобах на общее самочувствие и по вопросам хронических заболеваний, определяет необходимость обследований и дальнейшего лечения.",
    services: ["terapevt"],
    photo: salambekova,
    seoTitle: "Саламбекова Жулдыз Сериковна — терапевт, главный врач",
    photoPosition: "50% 22%",
  },
  {
    slug: "potapova-elona",
    fullName: "Потапова Элона Гайковна",
    shortName: "Элона Потапова",
    givenName: "Элона Гайковна",
    role: "Заведующий отделением физиотерапии и реабилитации",
    specialties: ["Травматолог-ортопед", "Нейрохирург"],
    intro:
      "Заведует отделением физиотерапии и реабилитации AIVA CLINIC. Как травматолог-ортопед консультирует при болях в суставах, последствиях травм и ограничении движений, определяет план обследования, лечения и восстановления.",
    services: ["travmatolog-ortoped"],
    departments: ["fizioterapiya", "reabilitaciya"],
    photo: potapova,
    seoTitle: "Потапова Элона Гайковна — травматолог-ортопед в Астане",
    photoPosition: "50% 20%",
  },
  {
    slug: "ahmetov-rinat",
    fullName: "Ахметов Ринат Нургазыевич",
    shortName: "Ринат Ахметов",
    givenName: "Ринат Нургазыевич",
    role: "Врач общей практики",
    specialties: ["Врач общей практики"],
    intro:
      "Врач общей практики. Принимает при первичном обращении с разными жалобами на здоровье и при необходимости направляет к профильному специалисту.",
    services: ["vrach-obshchej-praktiki"],
    photo: ahmetov,
    seoTitle: "Ахметов Ринат Нургазыевич — врач общей практики в Астане",
    photoPosition: "50% 24%",
  },
  {
    slug: "atygaeva-asem",
    fullName: "Атыгаева Асем Максатовна",
    shortName: "Асем Атыгаева",
    givenName: "Асем Максатовна",
    role: "Врач общей практики, эндокринолог",
    specialties: ["Врач общей практики", "Эндокринолог"],
    intro:
      "Врач общей практики и эндокринолог. Консультирует по заболеваниям щитовидной железы, нарушениям углеводного обмена и другим эндокринным состояниям, а также ведёт первичный приём.",
    services: ["endokrinolog", "vrach-obshchej-praktiki"],
    photo: atygaeva,
    seoTitle: "Атыгаева Асем Максатовна — эндокринолог в Астане",
    photoPosition: "50% 22%",
  },
];

export function getDoctor(slug: string) {
  return doctors.find((d) => d.slug === slug);
}
