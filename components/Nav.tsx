"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import Icon from "./icons";

const observedIds = ["sakums", ...navLinks.map((l) => l.href.slice(1))];

export default function Nav() {
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
  function goToFromMenu(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    const id = href.slice(1);
    const behavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior });
      history.replaceState(null, "", href);
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
  }, []);

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
          aria-label="Galvenā navigācija"
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
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-ink-soft hover:text-ink"
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

          <a
            href="#kontakti"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent md:inline-flex"
          >
            Sazināties
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
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
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => goToFromMenu(e, link.href)}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#kontakti"
                    onClick={(e) => goToFromMenu(e, "#kontakti")}
                    className="mt-1 block rounded-xl bg-ink px-4 py-3 text-center text-base font-semibold text-white"
                  >
                    Sazināties
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
