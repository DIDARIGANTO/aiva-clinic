import type { StaticImageData } from "next/image";
import lobby1 from "@/assets/photos/lobby-1.jpg";
import lobby2 from "@/assets/photos/lobby-2.jpg";
import ivRoom1 from "@/assets/photos/iv-room-1.jpg";
import ivRoom2 from "@/assets/photos/iv-room-2.jpg";
import deviceRoom from "@/assets/photos/device-room.jpg";
import device1 from "@/assets/photos/device-1.jpg";
import exoRoom1 from "@/assets/photos/exo-room-1.jpg";
import exoDetail from "@/assets/photos/exo-detail.jpg";
import patientExoLie from "@/assets/photos/patient-exo-lie.jpg";
import patientSmile from "@/assets/photos/patient-smile.jpg";
import patientExoSit from "@/assets/photos/patient-exo-sit.jpg";

/** Оригинальные фотографии клиники из папки «Фото». Стоковые изображения не используются. */
export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** расположение в мозаике на десктопе (12 колонок) */
  span: string;
  position?: string;
};

export const gallery: Photo[] = [
  {
    src: lobby1,
    alt: "Холл AIVA CLINIC с зоной ожидания и информационными стендами",
    caption: "Холл клиники",
    span: "lg:col-span-5 lg:row-span-2",
    position: "50% 65%",
  },
  {
    src: patientExoLie,
    alt: "Пациентка на экзостоле во время процедуры экзотерапии",
    caption: "Процедура на экзостоле",
    span: "lg:col-span-7",
  },
  {
    src: ivRoom1,
    alt: "Процедурный кабинет AIVA CLINIC: кресла и инфузионные стойки",
    caption: "Процедурный кабинет",
    span: "lg:col-span-3",
    position: "50% 70%",
  },
  {
    src: deviceRoom,
    alt: "Кабинет аппаратной физиотерапии с кушетками и аппаратами",
    caption: "Кабинет физиотерапии",
    span: "lg:col-span-4",
    position: "50% 62%",
  },
  {
    src: exoRoom1,
    alt: "Зал экзотерапии с двумя экзостолами",
    caption: "Зал экзотерапии",
    span: "lg:col-span-4",
    position: "50% 70%",
  },
  {
    src: lobby2,
    alt: "Зона ожидания AIVA CLINIC: диван, детский столик и растения",
    caption: "Зона ожидания",
    span: "lg:col-span-4",
    position: "50% 70%",
  },
  {
    src: device1,
    alt: "Аппарат экзотерапии в кабинете клиники",
    caption: "Аппарат экзотерапии",
    span: "lg:col-span-4",
    position: "50% 50%",
  },
  {
    src: patientSmile,
    alt: "Пациентка в зале экзотерапии AIVA CLINIC",
    caption: "В зале экзотерапии",
    span: "lg:col-span-3",
    position: "50% 30%",
  },
  {
    src: ivRoom2,
    alt: "Кресла для инфузионной терапии в процедурном кабинете",
    caption: "Кресла для капельниц",
    span: "lg:col-span-3",
    position: "50% 55%",
  },
  {
    src: exoDetail,
    alt: "Экзостол: подсвеченная панель с надписью «Экзотерапия»",
    caption: "Экзостол",
    span: "lg:col-span-3",
  },
  {
    src: patientExoSit,
    alt: "Пациентка сидит на экзостоле перед процедурой",
    caption: "Перед процедурой",
    span: "lg:col-span-3",
    position: "50% 35%",
  },
];
