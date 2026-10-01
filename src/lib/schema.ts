import { doctors, type Doctor } from "@/data/doctors";
import { categories, type Category, type QA, type Service } from "@/data/services";
import { abs, absAsset, site } from "./site";

const clinicId = `${site.url}/#clinic`;

/** Клиника: тип MedicalClinic соответствует фактическому профилю организации */
export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: site.name,
    alternateName: ["Aiva Clinic", "Айва Клиник"],
    description:
      "Клиника терапии, физиотерапии и реабилитации в Астане: консультации врачей, ультразвуковая диагностика, чек-апы, аппаратная физиотерапия, процедурный кабинет и реабилитация.",
    url: site.url,
    logo: abs("/brand/icon-512.png"),
    image: abs("/og.jpg"),
    telephone: site.phone.e164,
    currenciesAccepted: "KZT",
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Е 669, 13",
      addressLocality: site.address.city,
      addressRegion: "Астана",
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.maps.twogis,
    areaServed: { "@type": "City", name: "Астана" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone.e164,
        contactType: "customer service",
        areaServed: "KZ",
        availableLanguage: ["ru"],
      },
      {
        "@type": "ContactPoint",
        telephone: site.whatsapp.e164,
        contactType: "reservations",
        areaServed: "KZ",
        availableLanguage: ["ru"],
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.tiktok,
      site.social.youtube,
      site.maps.twogis,
      site.maps.yandex,
    ],
    medicalSpecialty: ["PrimaryCare", "Endocrine", "Gastroenterologic", "Urologic", "Musculoskeletal", "Physiotherapy"],
    availableService: categories.map((c) => ({
      "@type": "MedicalProcedure",
      name: c.title,
      url: abs(`/uslugi/${c.slug}`),
    })),
    employee: doctors.map((d) => ({ "@id": abs(`/vrachi/${d.slug}#physician`) })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Лицензия на медицинскую деятельность",
      identifier: site.license.number,
      recognizedBy: { "@type": "GovernmentOrganization", name: site.license.issuer },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "ru-KZ",
    publisher: { "@id": clinicId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function physicianSchema(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": abs(`/vrachi/${d.slug}#physician`),
    name: d.fullName,
    jobTitle: d.role,
    description: d.intro,
    url: abs(`/vrachi/${d.slug}`),
    image: absAsset(d.photo.src),
    medicalSpecialty: d.specialties,
    worksFor: { "@id": clinicId },
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Е 669, 13",
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    telephone: site.phone.e164,
  };
}

export function serviceSchema(s: Service, c: Category) {
  const url = abs(`/uslugi/${c.slug}/${s.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: s.h1 ?? s.title,
    description: s.seoDescription ?? s.summary,
    inLanguage: "ru-KZ",
    isPartOf: { "@id": `${site.url}/#website` },
    about: {
      "@type": c.slug === "uzi" || c.slug === "chek-apy" ? "MedicalTest" : c.slug === "konsultacii" ? "MedicalProcedure" : "MedicalTherapy",
      name: s.title,
      description: s.summary,
    },
    mainEntity: {
      "@type": "Service",
      name: s.h1 ?? s.title,
      description: s.summary,
      serviceType: c.title,
      provider: { "@id": clinicId },
      areaServed: { "@type": "City", name: "Астана" },
      ...(s.price
        ? {
            offers: {
              "@type": "Offer",
              price: s.price.value,
              priceCurrency: "KZT",
              availability: "https://schema.org/InStock",
              url,
            },
          }
        : {}),
    },
  };
}
