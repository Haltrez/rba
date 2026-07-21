"use client";

import { useEffect } from "react";

/* Root layout iestata <html lang="lv">; angļu lapā pārliekam uz "en"
   klienta pusē, lai ekrānlasītāji un pārlūks zina pareizo valodu. */
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);
  return null;
}
