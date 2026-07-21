import type { Dict } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Icon from "./icons";

export default function Skills({ dict }: { dict: Dict }) {
  const t = dict.skills;
  return (
    <section id="prasmes" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-ink/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-glow">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-bright text-white shadow-glow">
                  <Icon name={group.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-ink/10 bg-mist px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
