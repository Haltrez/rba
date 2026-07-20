import { site, socials } from "@/lib/data";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import Icon from "./icons";

export default function Contact() {
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
              Kontakti
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Uzbūvēsim kaut ko kopā
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
              Atvērts darba un projektu piedāvājumiem: AI aģenti,
              automatizācijas, produkti. Uzraksti, un atbildēšu ātri.
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
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:text-sky-300"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>

            <a
              href={site.cvUrl}
              download
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-100"
            >
              <Icon name="download" className="h-5 w-5" />
              Lejupielādēt CV
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md sm:p-8">
              <h3 className="font-display text-lg font-semibold">
                Ātrā ziņa
              </h3>
              <p className="mb-6 mt-1 text-sm text-slate-400">
                Vai vienkārši uzraksti uz e-pastu, kā tev ērtāk.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
