"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Icon from "./icons";

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

export default function Hero() {
  const reduce = useReducedMotion();

  /* Smalks parallax: aurora bloki seko kursoram (tikai precīziem kursoriem) */
  const [parallaxOn, setParallaxOn] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setParallaxOn(fine.matches && !reduce);
  }, [reduce]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });
  const blobX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const blobY = useTransform(sy, [-0.5, 0.5], [-18, 18]);

  function onMouseMove(e: React.MouseEvent) {
    if (!parallaxOn) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="sakums"
      onMouseMove={onMouseMove}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Animētais aurora fons */}
      <div aria-hidden className="absolute inset-0">
        <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0">
          <div className="animate-blob-a absolute -left-24 -top-32 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-accent-bright/30 to-sky-300/25 blur-3xl" />
          <div className="animate-blob-b absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-indigo-400/25 to-accent/15 blur-3xl" />
          <div className="animate-blob-c absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-sky-300/30 to-blue-200/30 blur-3xl" />
        </motion.div>
        <div className="bg-grid-fade absolute inset-0" />
      </div>

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-24 pt-36 text-center sm:pt-40"
      >
        <motion.div variants={item}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft shadow-card">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Atvērts jauniem projektiem
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Roberts Būda
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
        >
          Būvēju <span className="text-gradient">AI aģentus</span>,{" "}
          <span className="text-gradient">automatizācijas</span> un pilnus
          produktus.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft"
        >
          AI-native izstrādātājs no Latvijas. No idejas līdz strādājošam
          risinājumam: AI aģenti, biznesa procesu automatizācija, web un
          mobilās lietotnes. AI vilnī kopš paša sākuma.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#projekti"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-bright px-8 py-3.5 font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
          >
            Apskatīt projektus
            <Icon
              name="arrow-down"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="#kontakti"
            className="glass inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
          >
            Sazināties
          </a>
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
