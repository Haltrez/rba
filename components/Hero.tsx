"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Icon from "./icons";
import type { Dict } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.65, 0.32, 1] as const },
  },
};

/* Gaismas plankuma izmērs (puse no 35rem = 560px) kursora centrēšanai */
const SPOT_HALF = 280;

export default function Hero({ dict }: { dict: Dict }) {
  const t = dict.hero;
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Fona kustība ar peli: tikai precīziem kursoriem un bez reduced-motion */
  const [fxOn, setFxOn] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFxOn(fine.matches && !reduce);
  }, [reduce]);

  /* Normalizēta kursora pozīcija (-0.5 .. 0.5) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  /* Katram slānim savs dziļums un virziens, tas rada telpiskuma sajūtu */
  const blobAX = useTransform(sx, [-0.5, 0.5], [-60, 60]);
  const blobAY = useTransform(sy, [-0.5, 0.5], [-40, 40]);
  const blobBX = useTransform(sx, [-0.5, 0.5], [85, -85]);
  const blobBY = useTransform(sy, [-0.5, 0.5], [55, -55]);
  const blobCX = useTransform(sx, [-0.5, 0.5], [-110, 110]);
  const blobCY = useTransform(sy, [-0.5, 0.5], [65, -65]);
  const gridX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const gridY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const contentX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const contentY = useTransform(sy, [-0.5, 0.5], [6, -6]);

  /* Kursoram sekojošs gaismas plankums */
  const spotX = useMotionValue(-9999);
  const spotY = useMotionValue(-9999);
  const sSpotX = useSpring(spotX, { stiffness: 140, damping: 24 });
  const sSpotY = useSpring(spotY, { stiffness: 140, damping: 24 });

  function onMouseMove(e: React.MouseEvent) {
    if (!fxOn) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
    const r = sectionRef.current?.getBoundingClientRect();
    if (r) {
      spotX.set(e.clientX - r.left - SPOT_HALF);
      spotY.set(e.clientY - r.top - SPOT_HALF);
    }
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
    spotX.set(-9999);
    spotY.set(-9999);
  }

  return (
    <section
      id="sakums"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Animētais aurora fons ar peles parallaksu slāņos */}
      <div aria-hidden className="absolute inset-0">
        <motion.div style={{ x: blobAX, y: blobAY }} className="absolute inset-0">
          <div className="animate-blob-a absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-accent-bright/30 to-sky-300/25 blur-3xl" />
        </motion.div>
        <motion.div style={{ x: blobBX, y: blobBY }} className="absolute inset-0">
          <div className="animate-blob-b absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-indigo-400/25 to-accent/15 blur-3xl" />
        </motion.div>
        <motion.div style={{ x: blobCX, y: blobCY }} className="absolute inset-0">
          <div className="animate-blob-c absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-sky-300/30 to-blue-200/30 blur-3xl" />
        </motion.div>
        {fxOn && (
          <motion.div
            style={{
              x: sSpotX,
              y: sSpotY,
              background:
                "radial-gradient(circle, rgb(59 130 246 / 0.16), transparent 62%)",
            }}
            className="pointer-events-none absolute left-0 top-0 h-[35rem] w-[35rem] rounded-full"
          />
        )}
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="bg-grid-fade absolute -inset-6"
        />
      </div>

      {/* Saturs ar smalku pretkustību dziļumam */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative mx-auto w-full max-w-4xl"
      >
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex flex-col items-center px-5 pb-24 pt-36 text-center sm:pt-40"
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft shadow-card">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {t.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
          >
            {t.taglinePre}
            <span className="text-gradient">{t.taglineWord1}</span>
            {t.taglineMid}
            <span className="text-gradient">{t.taglineWord2}</span>
            {t.taglinePost}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            {t.sub}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#projekti"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-bright px-8 py-3.5 font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.ctaProjects}
              <Icon
                name="arrow-down"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#kontakti"
              className="glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
            >
              {t.ctaContact}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ritināšanas norāde */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink/15 p-1.5">
          <div className="animate-scroll-dot h-2 w-1 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
