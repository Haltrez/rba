import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import JuryDemo from "./JuryDemo";

export default function JurySection({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const t = dict.jury;
  return (
    <section id="demo" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
        <Reveal delay={0.1}>
          <JuryDemo dict={dict} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
