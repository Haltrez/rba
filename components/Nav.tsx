"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { localeHref, type Dict, type Locale } from "@/lib/i18n";
import Icon from "./icons";

/* Divu pogu valodas pārslēdzis: LV | EN, aktīvā iezīmēta */
function LangSwitch({
  locale,
  ariaLabel,
  className = "",
}: {
  locale: Locale;
  ariaLabel: string;
  className?: string;
}) {
  const seg = (loc: Locale, label: string) => {
    const base =
      "rounded-full px-3 py-1.5 text-xs font-bold transition-colors";
    if (loc === locale) {
      return (
        <span aria-current="true" className={`${base} bg-ink text-white`}>
          {label}
        </span>
      );
    }
    return (
      <a
        href={localeHref(loc)}
        hrefLang={loc}
        className={`${base} text-ink-soft hover:text-ink`}
      >
        {label}
      </a>
    );
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex items-center gap-0.5 rounded-full border border-ink/12 p-0.5 ${className}`}
    >
      {seg("lv", "LV")}
      {seg("en", "EN")}
    </div>
  );
}

export default function Nav({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const navLinks = dict.nav.links;
  const observedIds = ["sakums", ...navLinks.map((l) => l.id)];

  const [active, setActive] = useState("sakums");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobilajā izvēlnē aizvēršanās animācija atceļ pārlūka smooth scroll,
     tāpēc ritinām paši: aizveram izvēlni un pēc animācijas aizritinām */
  function goToFromMenu(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setOpen(false);
    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
      history.replaceState(null, "", `#${id}`);
    }, 320);
  }

  /* Aktīvās sekcijas iezīmēšana: sekcija, kas šķērso viduslīniju */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of observedIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto max-w-5xl rounded-2xl transition-all duration-300 ${
          open
            ? "border border-white/70 bg-white/95 shadow-card backdrop-blur-xl"
            : scrolled
              ? "glass shadow-card"
              : "border border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label={dict.nav.ariaNav}
          className="flex items-center justify-between px-5 py-3"
        >
          <a
            href="#sakums"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            rba<span className="text-accent">.lv</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-accent" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-accent/10"
                        transition={{
                          type: "spring",
                          bounce: 0.22,
                          duration: 0.55,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2.5 md:flex">
            <LangSwitch locale={locale} ariaLabel={dict.nav.switchAria} />
            <a
              href="#kontakti"
              className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent"
            >
              {dict.nav.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="rounded-full p-2 text-ink transition-colors hover:bg-accent/10 md:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 pb-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => goToFromMenu(e, link.id)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-1 flex items-stretch gap-2">
                  <a
                    href="#kontakti"
                    onClick={(e) => goToFromMenu(e, "kontakti")}
                    className="flex-1 rounded-xl bg-ink px-4 py-3 text-center text-base font-semibold text-white"
                  >
                    {dict.nav.cta}
                  </a>
                  <LangSwitch
                    locale={locale}
                    ariaLabel={dict.nav.switchAria}
                    className="shrink-0"
                  />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
