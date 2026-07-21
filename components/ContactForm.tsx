"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import type { Dict } from "@/lib/i18n";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-colors focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/30";

export default function ContactForm({ dict }: { dict: Dict }) {
  const t = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Noklusējums: formsubmit.co sūta ziņu uz site.email bez reģistrācijas
       (pirmā ziņa atsūtīs vienreizēju apstiprinājuma e-pastu).
       Ja lib/data.ts ir norādīts formspreeId, sūtām caur Formspree. */
    const endpoint = site.formspreeId
      ? `https://formspree.io/f/${site.formspreeId}`
      : `https://formsubmit.co/ajax/${site.email}`;

    data.append("_subject", t.subject);

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Medus poda lauks pret spamu, cilvēki to neredz */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            {t.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-bright px-8 py-3.5 font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? t.submitSending : t.submitIdle}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "ok" && (
          <span className="text-emerald-300">{t.success}</span>
        )}
        {status === "error" && (
          <span className="text-red-300">
            {t.errorPrefix}
            {site.email}
          </span>
        )}
      </p>
    </form>
  );
}
