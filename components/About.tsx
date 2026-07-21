import type { Dict } from "@/lib/i18n";
import Reveal from "./Reveal";
import Icon from "./icons";

export default function About({ dict }: { dict: Dict }) {
  const t = dict.about;
  return (
    <section id="par-mani" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {t.heading}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
            {/* TODO: ja gribi šeit savu foto, ieliec failu public/me.jpg un
                pievieno <Image> komponenti virs teksta vai faktu kartītē */}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-ink/8 bg-white p-7 shadow-card sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">
                {t.quickFacts}
              </h3>
              <ul className="mt-6 space-y-5">
                {t.facts.map((fact) => (
                  <li key={fact.label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={fact.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{fact.label}</p>
                      <p className="text-sm text-ink-soft">{fact.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl bg-gradient-to-r from-accent to-accent-bright p-5 text-white">
                <p className="font-display text-base font-semibold leading-snug">
                  {t.callout}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
