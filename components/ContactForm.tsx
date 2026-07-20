"use client";

import { useState } from "react";
import { site } from "@/lib/data";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition-colors focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Ja Formspree ID nav norādīts (lib/data.ts), atveram e-pasta klientu */
    if (!site.formspreeId) {
      const subject = encodeURIComponent(
        `Ziņa no rba.lv: ${data.get("name") ?? ""}`,
      );
      const body = encodeURIComponent(
        `${data.get("message") ?? ""}\n\nNo: ${data.get("name") ?? ""} (${data.get("email") ?? ""})`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Vārds
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tavs vārds"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            E-pasts
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tavs@epasts.lv"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Ziņa
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Pastāsti, ko gribi uzbūvēt vai automatizēt"
          className={`${inputClass} resize-y`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-bright px-8 py-3.5 font-semibold text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "sending" ? "Sūta..." : "Nosūtīt ziņu"}
      </button>

      <p aria-live="polite" className="min-h-5 text-sm">
        {status === "ok" && (
          <span className="text-emerald-300">
            Paldies! Ziņa ir nosūtīta, atbildēšu drīzumā.
          </span>
        )}
        {status === "error" && (
          <span className="text-red-300">
            Neizdevās nosūtīt. Uzraksti man tieši: {site.email}
          </span>
        )}
      </p>
    </form>
  );
}
