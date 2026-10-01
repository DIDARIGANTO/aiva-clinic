/**
 * Специальные предложения. Источник: документ клиники «Акция Айва».
 * Срок действия в материалах не указан — на сайте выводится просьба уточнять его у администратора.
 */
export type PromoItem = { title: string; detail: string; price: number; old?: number; href?: string };

export type Promo = {
  slug: string;
  title: string;
  lead: string;
  tone: "forest" | "mint" | "peach";
  items?: PromoItem[];
  includes?: string[];
  price?: { value: number; unit: string };
  badge: string;
  bonus?: string;
  note?: string;
  href: string;
  cta: string;
};

export const promos: Promo[] = [
  {
    slug: "kompleksnye-uzi",
    title: "Комплексные УЗИ",
    lead: "Три исследования за один визит по специальной цене. Продолжительность каждого комплекса — 1 час.",
    tone: "forest",
    badge: "Специальное предложение",
    items: [
      {
        title: "Комплекс №1",
        detail: "Органы брюшной полости, почки, щитовидная железа",
        price: 18000,
        old: 22000,
        href: "/uslugi/uzi/kompleks-uzi-1",
      },
      {
        title: "Комплекс №2",
        detail: "Почки, мочевой пузырь, предстательная железа",
        price: 15000,
        old: 22000,
        href: "/uslugi/uzi/kompleks-uzi-2",
      },
      {
        title: "Комплекс №3",
        detail: "Щитовидная железа, молочные железы, органы малого таза",
        price: 20000,
        old: 26000,
        href: "/uslugi/uzi/kompleks-uzi-3",
      },
    ],
    href: "/uslugi/uzi",
    cta: "Все УЗИ",
  },
  {
    slug: "chek-ap-pecheni",
    title: "Чек-ап печени",
    lead: "Готовый комплекс: анализы крови и УЗИ органов брюшной полости. Приём врача — в подарок.",
    tone: "peach",
    badge: "Приём врача в подарок",
    includes: [
      "Общий анализ крови (ОАК)",
      "АЛТ, АСТ, ГГТП",
      "Глюкоза крови",
      "Общий холестерин",
      "УЗИ органов брюшной полости",
    ],
    price: { value: 21000, unit: "за комплекс" },
    href: "/uslugi/chek-apy/chek-ap-pecheni",
    cta: "О программе",
  },
  {
    slug: "ekzoterapiya",
    title: "Экзотерапия",
    lead: "Аппаратная процедура на экзостоле: вы просто лежите и отдыхаете — без ручного массажа и переодевания.",
    tone: "mint",
    badge: "−30% на курс от 5 процедур",
    price: { value: 6000, unit: "5 минут" },
    bonus: "При покупке курса от 5 процедур — скидка 30%",
    note: "Имеются противопоказания. Перед процедурой необходима консультация специалиста.",
    href: "/uslugi/fizioterapiya/ekzoterapiya",
    cta: "О процедуре",
  },
];

export const promoDisclaimer =
  "Срок действия и условия специальных предложений уточняйте у администратора клиники.";
