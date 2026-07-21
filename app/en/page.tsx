import type { Metadata } from "next";
import Site from "@/components/Site";
import SetHtmlLang from "@/components/SetHtmlLang";
import { dictionaries } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function HomeEn() {
  return (
    <>
      <SetHtmlLang lang="en" />
      <Site dict={dictionaries.en} locale="en" />
    </>
  );
}
