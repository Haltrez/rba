import Image from "next/image";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import CodeCard from "./CodeCard";
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

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
        >
          Live demo
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
          Kods
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

function Media({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/8 bg-mist">
      {/* TODO: attēli dzīvo public/projects mapē, ceļus maina lib/data.ts.
          GIF failiem next/image der tāpat, tie tiks rādīti animēti. */}
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

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projekti" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projekti"
          title="No idejas līdz strādājošam produktam"
          sub="Reāli produkti un automatizācijas ar īstiem lietotājiem, ne tikai eksperimenti."
        />

        <div className="grid gap-6">
          {/* Izceltais projekts ar koda fragmentu */}
          {featured && (
            <Reveal>
              <TiltCard className={cardClass}>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="flex min-w-0 flex-col gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                      Izceltais projekts
                    </p>
                    <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="leading-relaxed text-ink-soft">
                      {featured.tagline}
                    </p>
                    <Tags tags={featured.tags} />
                    <ProjectLinks project={featured} />
                    <Media
                      project={featured}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <CodeCard />
                    <p className="text-center text-sm text-ink-soft">
                      Paneļa loģika vienkāršotā pierakstā: vairāki aģenti ar
                      lomām, kopīga apspriede, strukturēts verdikts.
                    </p>
                  </div>
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
                    <h3 className="font-display text-xl font-bold text-ink">
                      {project.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                      {project.tagline}
                    </p>
                    <Tags tags={project.tags} />
                    <ProjectLinks project={project} />
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
