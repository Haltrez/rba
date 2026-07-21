import { site, socials } from "@/lib/data";
import type { Dict } from "@/lib/i18n";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import Icon from "./icons";

export default function Contact({ dict }: { dict: Dict }) {
  const t = dict.contact;
  return (
    <section
      id="kontakti"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      {/* Zilie mirdzumi tumšajā fonā */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob-a absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-accent/25 blur-3xl" />
        <div className="animate-blob-b absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {t.heading}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
              {t.intro}
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-3 text-lg font-medium transition-colors hover:text-sky-300"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-sky-300/50">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-3 text-lg font-medium transition-colors hover:text-sky-300"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-sky-300/50">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  {site.phone}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:text-sky-300"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md sm:p-8">
              <h3 className="font-display text-lg font-semibold">
                {t.formTitle}
              </h3>
              <p className="mb-6 mt-1 text-sm text-slate-400">{t.formSub}</p>
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
