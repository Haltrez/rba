import type { Metadata } from "next";
import { dictionaries, localeHref, type Locale } from "./i18n";

const siteUrl = "https://rba.lv";

/* Katras valodas metadati ar hreflang alternatīvām (SEO) */
export function buildMetadata(locale: Locale): Metadata {
  const d = dictionaries[locale].meta;
  const path = localeHref(locale);

  return {
    title: d.title,
    description: d.description,
    alternates: {
      canonical: path,
      languages: {
        "lv-LV": "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: locale === "lv" ? siteUrl : `${siteUrl}/en`,
      siteName: "rba.lv",
      locale: d.ogLocale,
      title: d.title,
      description: d.description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Roberts Būda",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: d.title,
      description: d.description,
      images: ["/og.png"],
    },
  };
}
