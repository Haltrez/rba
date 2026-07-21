import Image from "next/image";
import type { Dict, ProjectText } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Icon from "./icons";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-accent-soft/60 px-3 py-1 text-xs font-medium text-accent"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({
  project,
  codeLabel,
}: {
  project: ProjectText;
  codeLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          {project.liveLabel ?? "Live"}
          <Icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      )}
      {project.codeUrl && (
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <Icon name="github" className="h-4 w-4" />
          {codeLabel}
        </a>
      )}
      {!project.liveUrl && !project.codeUrl && project.privateNote && (
        <span className="rounded-full border border-dashed border-ink/20 px-4 py-2 text-sm text-ink-soft">
          {project.privateNote}
        </span>
      )}
    </div>
  );
}

function Media({
  project,
  sizes,
}: {
  project: ProjectText;
  sizes: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/8 bg-mist">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  );
}

const cardClass =
  "group flex h-full flex-col rounded-3xl border border-ink/8 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-glow sm:p-6";

export default function Projects({ dict }: { dict: Dict }) {
  const t = dict.projects;
  const codeLabel = "Kods";
  const featured = t.items.find((p) => p.featured);
  const rest = t.items.filter((p) => !p.featured);

  return (
    <section id="projekti" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

        <div className="grid gap-6">
          {/* Izceltais projekts ar stāstu par ideju */}
          {featured && (
            <Reveal>
              <TiltCard className={cardClass}>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="flex min-w-0 flex-col gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      {t.featuredLabel}
                    </p>
                    <div className="flex items-center gap-3">
                      {featured.logo && (
                        <Image
                          src={featured.logo}
                          alt=""
                          width={44}
                          height={44}
                          className="rounded-xl shadow-card"
                        />
                      )}
                      <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                        {featured.title}
                      </h3>
                    </div>
                    <p className="leading-relaxed text-ink-soft">
                      {featured.tagline}
                    </p>

                    {/* Ideja aiz Askjury */}
                    <div className="rounded-2xl border border-accent/15 bg-accent/5 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {t.ideaEyebrow}
                      </p>
                      <p className="mt-2.5 leading-relaxed text-ink">
                        {t.ideaText}
                      </p>
                    </div>

                    <Tags tags={featured.tags} />
                    <ProjectLinks project={featured} codeLabel={codeLabel} />
                  </div>
                  <Media
                    project={featured}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
              </TiltCard>
            </Reveal>
          )}

          {/* Pārējie projekti */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08} className="h-full">
                <TiltCard className={cardClass}>
                  <Media
                    project={project}
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />
                  <div className="flex flex-1 flex-col gap-4 pt-5">
                    <div className="flex items-center gap-2.5">
                      {project.logo && (
                        <Image
                          src={project.logo}
                          alt=""
                          width={32}
                          height={32}
                          className="rounded-lg shadow-card"
                        />
                      )}
                      <h3 className="font-display text-xl font-bold text-ink">
                        {project.title}
                      </h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                      {project.tagline}
                    </p>
                    <Tags tags={project.tags} />
                    <ProjectLinks project={project} codeLabel={codeLabel} />
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
