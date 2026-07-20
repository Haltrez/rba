import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.22em] ${
          dark ? "text-sky-300" : "text-accent"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-lg ${dark ? "text-slate-300" : "text-ink-soft"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
