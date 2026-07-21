import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://rba.lv",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "lv-LV": "https://rba.lv",
          en: "https://rba.lv/en",
        },
      },
    },
    {
      url: "https://rba.lv/en",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
