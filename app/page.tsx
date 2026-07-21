import type { Metadata } from "next";
import Site from "@/components/Site";
import { dictionaries } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("lv");

export default function Home() {
  return <Site dict={dictionaries.lv} locale="lv" />;
}
