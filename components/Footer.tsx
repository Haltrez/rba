export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-8 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Roberts Būda ·{" "}
          <span className="text-slate-300">rba.lv</span>
        </p>
        <p className="text-slate-500">
          Uzbūvēts ar Next.js, Tailwind un Framer Motion
        </p>
        <a
          href="#sakums"
          className="rounded-full border border-white/10 px-4 py-2 transition-colors hover:border-sky-300/50 hover:text-sky-300"
        >
          Uz augšu ↑
        </a>
      </div>
    </footer>
  );
}
